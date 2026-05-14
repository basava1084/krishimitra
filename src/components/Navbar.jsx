import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Leaf,
  LogOut,
  Zap,
  Bell,
  Mic,
  Navigation,
  Sparkles,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Navbar is now persistent across all routes for consistent navigation
  const isDashboard = location.pathname.startsWith('/farmer') || location.pathname.startsWith('/customer') || location.pathname.startsWith('/chat');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 py-4 ${scrolled ? 'py-2' : 'py-6'
        }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-700 border border-white/40 ${scrolled
            ? 'bg-white/80 backdrop-blur-3xl shadow-[0_15px_35px_rgba(0,0,0,0.04)] border-white'
            : 'bg-transparent border-transparent'
          }`}
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-16">

            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <motion.div
                whileHover={{ rotate: 90, scale: 1.05 }}
                className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500"
              >
                <Leaf className="w-5 h-5" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-display font-bold text-primary tracking-tight leading-none uppercase">
                  KRISHI<span className="text-accent italic ml-0.5 font-normal">MITRA</span>
                </span>
                <span className="text-[6px] font-black text-text-dim uppercase tracking-[0.6em] mt-1 opacity-40">Luxury Ecosystem</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-black/5 p-1 rounded-xl border border-black/[0.03]">
              {[
                { label: 'Market', path: '/products' },
                { label: 'Network', path: '/farmers' },
                { label: 'Insights', path: '/agri-insights', icon: Zap },
                { label: 'Chat', path: '/chat', icon: MessageCircle },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative px-6 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 overflow-hidden group ${location.pathname === link.path ? 'text-white' : 'text-text-main/60 hover:text-text-main'
                    }`}
                >
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-active-light"
                      className="absolute inset-0 bg-primary shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {link.icon && <link.icon className={`w-3 h-3 ${location.pathname === link.path ? 'text-accent' : 'text-primary/40'}`} />}
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3 relative z-10">
              <button
                onClick={() => navigate('/products')}
                className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center text-text-main/30 hover:text-primary hover:bg-white hover:shadow-md transition-all duration-500"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                to="/cart"
                className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center text-text-main/30 hover:text-primary hover:bg-white hover:shadow-md transition-all duration-500 relative group"
              >
                <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-primary text-[8px] font-black flex items-center justify-center rounded-md shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="w-px h-5 bg-black/5 mx-1"></div>

              {isAuthenticated ? (
                <Link
                  to={currentUser.role === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard'}
                  className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 bg-white border border-black/[0.03] rounded-xl shadow-sm hover:shadow-md transition-all duration-500 group"
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden border border-black/5">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <span className="text-[9px] font-bold text-text-main uppercase tracking-widest">{currentUser.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-primary text-white rounded-xl text-[9px] font-bold uppercase tracking-[0.3em] shadow-md hover:shadow-xl transition-all duration-500"
                >
                  Enter Portal
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <Link to="/cart" className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center text-text-main/30 relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-primary text-[8px] rounded-md flex items-center justify-center font-bold">{cartCount}</span>}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-xl bg-black/[0.03] text-text-main flex items-center justify-center"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="fixed inset-x-6 top-24 z-[110] bg-white/95 backdrop-blur-2xl rounded-2xl p-8 lg:hidden border border-white shadow-2xl"
          >
            <div className="grid gap-4">
              {[
                { label: 'Marketplace', path: '/products', icon: ShoppingCart },
                { label: 'Network', path: '/farmers', icon: User },
                { label: 'Insights', path: '/agri-insights', icon: Zap },
                { label: 'Chat', path: '/chat', icon: MessageCircle },
              ].map(link => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-black/[0.02] hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="text-base font-display font-bold text-text-main tracking-tight uppercase">{link.label}</span>
                </Link>
              ))}
              <div className="h-px bg-black/5 my-2"></div>
              {isAuthenticated ? (
                <Link to="/customer/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-primary text-white rounded-xl text-center font-bold uppercase tracking-[0.2em] shadow-lg">My Dashboard</Link>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-primary text-white rounded-xl text-center font-bold uppercase tracking-[0.2em] shadow-lg">Join Nexus</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
