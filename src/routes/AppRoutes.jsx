import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import Farmers from '../pages/Farmers';
import FarmerProfile from '../pages/FarmerProfile';
import AgriInsights from '../pages/AgriInsights';
import ChatPage from '../pages/ChatPage';

// Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboards
import CustomerDashboard from '../pages/dashboard/customer/CustomerDashboard';
import FarmerDashboard from '../pages/dashboard/farmer/FarmerDashboard';

// Page Transition Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
        <Route path="/products/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/farmers" element={<PageWrapper><Farmers /></PageWrapper>} />
        <Route path="/farmers/:id" element={<PageWrapper><FarmerProfile /></PageWrapper>} />
        <Route path="/agri-insights" element={<PageWrapper><AgriInsights /></PageWrapper>} />
        <Route path="/chat" element={<ProtectedRoute><PageWrapper><ChatPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/chat/:recipientId" element={<ProtectedRoute><PageWrapper><ChatPage /></PageWrapper></ProtectedRoute>} />

        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

        <Route path="/checkout" element={<ProtectedRoute><PageWrapper><Checkout /></PageWrapper></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><PageWrapper><OrderConfirmation /></PageWrapper></ProtectedRoute>} />
        <Route path="/customer/dashboard" element={<ProtectedRoute><PageWrapper><CustomerDashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/farmer/dashboard" element={<ProtectedRoute role="farmer"><PageWrapper><FarmerDashboard /></PageWrapper></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
