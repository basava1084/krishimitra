import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_FARMERS } from '../data/initialData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('km_user_v2');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('km_users_v2');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  useEffect(() => {
    localStorage.setItem('km_user_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('km_users_v2', JSON.stringify(users));
  }, [users]);

  const register = (userData) => {
    const exists = users.find(u => u.email === userData.email);
    if (exists) throw new Error('Email already exists');
    
    const newUser = { 
      ...userData, 
      id: userData.role === 'farmer' ? 'F-' + Date.now() : 'C-' + Date.now() 
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const login = (email, password, role) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    if (user.role !== role) throw new Error(`Incorrect role. Registered as ${user.role}.`);
    
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, register, login, logout, isAuthenticated: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
