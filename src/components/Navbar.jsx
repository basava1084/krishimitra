import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Leaf, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="text-primary w-6 h-6" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Krishi<span className="text-primary">Market</span>
            </span>
          </Link>

          {/* Search - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search fresh harvest..."
                className="w-full bg-gray-50 border border-gray-200 rounded-md py-1.5 pl-9 pr-4 text-sm focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Shop</Link>
            <Link to="/farmers" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Farmers</Link>
            
            <div className="h-4 w-px bg-gray-200"></div>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={currentUser.role === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard'} 
                  className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>{currentUser.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Login</Link>
                <Link to="/register" state={{ defaultRole: 'farmer' }} className="bg-primary text-white text-xs font-black px-4 py-2 rounded shadow-md hover:bg-primary-700 transition-all">Sell Produce</Link>
              </div>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-600">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 text-gray-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-6 px-4 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-md py-3 pl-10 pr-4 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex flex-col gap-5">
            <Link to="/products" className="text-base font-bold text-gray-800" onClick={() => setIsMenuOpen(false)}>All Products</Link>
            <Link to="/farmers" className="text-base font-bold text-gray-800" onClick={() => setIsMenuOpen(false)}>Farmers</Link>
            <hr className="border-gray-50" />
            {isAuthenticated ? (
              <>
                <Link 
                  to={currentUser.role === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard'} 
                  className="text-base font-bold text-primary flex items-center gap-2" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" /> My Dashboard ({currentUser.name})
                </Link>
                <button onClick={handleLogout} className="text-left text-base font-bold text-red-500 flex items-center gap-2">
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-base font-bold text-gray-800" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                <Link to="/register" state={{ defaultRole: 'farmer' }} className="btn-primary py-3" onClick={() => setIsMenuOpen(false)}>Join as Farmer</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
