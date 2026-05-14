import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Sprout, 
  Star, 
  ArrowLeft, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Quote,
  Leaf,
  Navigation,
  CheckCircle2,
  X,
  Zap,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useChat } from '../context/ChatContext';
import ProductCard from '../components/ProductCard';

const FarmerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { farmers } = useAuth();
  const { products } = useProducts();
  const [showChat, setShowChat] = useState(false);

  const farmer = useMemo(() => {
    return farmers.find(u => u._id === id);
  }, [id, farmers]);

  const farmerProducts = useMemo(() => {
    return products.filter(p => p.farmerId === id);
  }, [id, products]);

  const { initiateChat } = useChat();

  const handleOpenNexus = async () => {
    await initiateChat(farmer._id);
    navigate('/chat');
  };

  if (!farmer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-8"
        >
          <Zap className="w-20 h-20 text-primary-light/20 mx-auto" />
          <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tight">FARMER NOT FOUND</h2>
          <button onClick={() => navigate('/farmers')} className="btn-premium px-12 py-6 text-[10px]">BACK TO FARMERS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-40 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-primary/10 rounded-full blur-[200px] -translate-y-1/2 opacity-30 pointer-events-none"></div>
      
      {/* Cinematic Hero */}
      <div className="relative pt-40 pb-60 px-6 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => navigate('/farmers')}
            className="flex items-center gap-4 text-[10px] font-bold text-white/20 hover:text-primary-light transition-all mb-20 uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> BACK TO DIRECTORY
          </button>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-20">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-72 h-72 rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl shrink-0 group relative bg-surface"
            >
              <img
                src={farmer.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`}
                alt={farmer.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-primary-light border border-primary-light/30">
                 <ShieldCheck className="w-6 h-6" />
              </div>
            </motion.div>

            <div className="flex-1 space-y-12 text-center lg:text-left">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <span className="px-6 py-2 bg-white/[0.03] border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                    CERTIFIED FARMER: <span className="text-primary-light">{farmer.farmDetails?.farmingType || 'Natural'}</span>
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-primary-light uppercase tracking-[0.4em] bg-primary/10 px-6 py-2 rounded-full border border-primary-light/20">
                    <Award className="w-4 h-4" /> VERIFIED TOP RATED
                  </div>
                </div>
                
                <h1 className="text-6xl md:text-9xl font-display font-bold text-white uppercase tracking-tighter leading-[0.85]">{farmer.name}</h1>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-12">
                  <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                    <MapPin className="w-5 h-5 text-primary-light" /> {farmer.farmDetails?.location || farmer.location}
                  </p>
                  <div className="h-6 w-px bg-white/5 hidden sm:block"></div>
                  <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                    <Calendar className="w-5 h-5 text-primary-light" /> {farmer.experience || '12'} YEARS EXPERIENCE
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <button 
                  onClick={handleOpenNexus}
                  className="btn-premium h-20 px-12 text-[10px] flex items-center gap-4"
                >
                  <MessageCircle className="w-6 h-6" /> START CHAT
                </button>
                <div className="flex gap-4">
                  <button className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-white transition-all">
                    <Phone className="w-6 h-6" />
                  </button>
                  <button className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Leaf className="absolute -right-20 -bottom-20 w-[600px] h-[600px] text-primary/5 rotate-45 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 space-y-40">
        {/* Manifest Section */}
        <div className="grid lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 p-16 rounded-[4rem] bg-surface/50 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
              <Quote className="absolute top-12 right-12 w-32 h-32 text-white/[0.02]" />
              
              <div className="space-y-12 relative z-10">
                 <h3 className="text-[10px] font-bold text-primary-light uppercase tracking-[0.5em]">Farmer's Philosophy</h3>
                 <p className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-tight italic">
                    "{farmer.farmDetails?.description || "Nature doesn't rush, yet everything is accomplished. I bring that same patience to every seed I sow."}"
                 </p>
                 
                 <div className="grid sm:grid-cols-3 gap-12 pt-12 border-t border-white/5">
                    <div className="space-y-4">
                       <p className="text-6xl font-display font-bold text-white tracking-tighter">0.0%</p>
                       <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">CHEMICAL RESIDUE</p>
                    </div>
                    <div className="space-y-4">
                       <p className="text-6xl font-display font-bold text-white tracking-tighter">{farmer.farmDetails?.farmSize || '15AC'}</p>
                       <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">ACTIVE FARM AREA</p>
                    </div>
                    <div className="space-y-4">
                       <p className="text-6xl font-display font-bold text-white tracking-tighter">100%</p>
                       <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">CERTIFIED ORGANIC</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 p-16 rounded-[4rem] bg-surface/50 border border-white/5 shadow-2xl space-y-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
              
              <div className="space-y-4 relative z-10">
                 <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">COMMUNITY STANDING</h3>
                 <p className="text-[10px] font-bold text-primary-light uppercase tracking-[0.4em]">RATING: 98.4</p>
              </div>
              
              <div className="space-y-12 relative z-10">
                 {[
                   { label: 'Quality Consistency', val: '99%' },
                   { label: 'Community Trust', val: '4.9/5' },
                   { label: 'Delivery Speed', val: '24h' }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-5">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.3em]">
                         <span className="text-white/20">{stat.label}</span>
                         <span className="text-primary-light">{stat.val}</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                         <div className="h-full bg-primary w-[90%] rounded-full shadow-lg shadow-primary/20"></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Inventory Manifest */}
        <div className="space-y-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/5 pb-16">
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-primary-light uppercase tracking-[0.5em]">Node Inventory</p>
              <h2 className="text-6xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter">CURRENT <span className="text-primary-light italic font-normal">YIELDS</span></h2>
            </div>
            <button className="px-10 py-5 bg-white/[0.03] border border-white/5 text-white/40 rounded-2xl text-[9px] font-bold uppercase tracking-[0.5em] hover:text-white transition-all">LATEST HARVEST</button>
          </div>

          {farmerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {farmerProducts.map((p, i) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                   <ProductCard {...p} farmer={farmer.name} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-60 text-center rounded-[5rem] border-2 border-dashed border-white/5 bg-white/[0.01]">
              <Sprout className="w-24 h-24 text-white/5 mx-auto mb-10 animate-pulse" />
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Waiting for the next harvest moon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
