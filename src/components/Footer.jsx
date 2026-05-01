import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Share2, MessageCircle, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="text-primary w-6 h-6" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Krishi<span className="text-primary">Market</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering farmers by connecting them directly with consumers for fresh, natural, and fair-priced produce.
            </p>
            <div className="flex gap-4">
              <Share2 className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <MessageCircle className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Globe className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="label-text mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Vegetables" className="hover:text-primary transition-colors">Vegetables</Link></li>
              <li><Link to="/products?category=Fruits" className="hover:text-primary transition-colors">Fruits</Link></li>
              <li><Link to="/products?category=Grains" className="hover:text-primary transition-colors">Grains & Pulses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label-text mb-6">For Farmers</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/farmer/register" className="hover:text-primary transition-colors">Join the Marketplace</Link></li>
              <li><Link to="/farmer/login" className="hover:text-primary transition-colors">Farmer Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Farming Guidelines</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Seller Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label-text mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +91 80 2345 6789</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> support@krishimarket.com</li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span>123, Green Lane, Agri Park, Bangalore, KA - 560001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Krishi Market. Built for sustainable agriculture.
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
