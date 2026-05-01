import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Farmers from '../pages/Farmers';
import FarmerProfile from '../pages/FarmerProfile';

// Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboards
import CustomerDashboard from '../pages/dashboard/customer/CustomerDashboard';
import FarmerDashboard from '../pages/dashboard/farmer/FarmerDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/farmers" element={<Farmers />} />
      <Route path="/farmers/:id" element={<FarmerProfile />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/checkout" element={<ProtectedRoute role="customer"><Checkout /></ProtectedRoute>} />
      <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
      <Route path="/farmer/dashboard" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
