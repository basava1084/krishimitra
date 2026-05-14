import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:5000/api/v1';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('km_user_session_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [farmers, setFarmers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('km_user_session_v1', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('km_user_session_v1');
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/farmers`, { withCredentials: true });
      if (res.data.success) setFarmers(res.data.data);
    } catch (error) {
      // Silently fail — farmers will just be empty
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.data.success && res.data.user) {
        setCurrentUser(res.data.user);
        await fetchFarmers(); // Refresh the list of farmers
        return res.data.user;
      } else {
        throw new Error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      // Extract the clearest possible error message
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Check your connection and try again.';
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password, role) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.data.success && res.data.user) {
        const user = res.data.user;
        if (role && user.role !== role) {
          throw new Error(`This account is registered as a "${user.role}". Please select the correct role.`);
        }
        setCurrentUser(user);
        return user;
      } else {
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please check your credentials.';
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    } catch {
      // Ignore logout errors
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('km_user_session_v1');
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      farmers,
      fetchFarmers,
      register,
      login,
      logout,
      isAuthenticated: !!currentUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
