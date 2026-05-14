import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Heart,
  Share2,
  ExternalLink
} from 'lucide-react';

import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/farmer') || location.pathname.startsWith('/customer') || location.pathname.startsWith('/chat');

  if (isDashboard) return null;

  return (
    <footer className="bg-background relative overflow-hidden pt-16 pb-8 border-t border-black/[0.03] font-body selection:bg-primary/5">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-primary tracking-tight uppercase">
                  KRISHI<span className="text-accent italic ml-0.5">MITRA</span>
                </span>
                <span className="text-[7px] font-bold text-text-dim uppercase tracking-[0.6em] mt-1.5 opacity-60">Agriculture Ecosystem</span>
              </div>
            </Link>

            <p className="text-sm text-text-dim/70 leading-relaxed max-w-md font-medium tracking-wide">
              Connecting farmers directly with consumers for fresh, organic produce.
            </p>

            <div className="flex items-center gap-6">
              {[Globe, MessageCircle, Share2, ExternalLink].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-primary/40 hover:text-primary hover:shadow-xl transition-all duration-500 shadow-sm"
                >
                  <Icon className="w-4.5 h-4.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] border-l-2 border-accent pl-4">Quick Links</h4>
            <ul className="space-y-2 ml-4">
              {[
                { name: 'Marketplace', path: '/products' },
                { name: 'Farmers', path: '/farmers' },
                { name: 'Plant Doctor', path: '/plant-doctor' },
                { name: 'About Us', path: '/about' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[11px] font-bold text-text-dim/60 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] border-l-2 border-accent pl-4">Contact Us</h4>
            <div className="space-y-3 ml-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-text-dim/70 uppercase tracking-widest">basavarajhg8970@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-text-dim/70 uppercase tracking-widest">7411278970</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[9px] font-black text-text-dim/40 uppercase tracking-[0.4em]">
            <p>© 2026 KRISHIMITRA. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-8">
              <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
