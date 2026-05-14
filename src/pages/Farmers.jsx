import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Star, MessageCircle, ChevronRight, Sparkles, Globe, Heart, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { Link, useNavigate } from 'react-router-dom';

const Farmers = () => {
  const { farmers, currentUser, isLoading } = useAuth();
  const currentUserId = currentUser?.id || currentUser?._id;

  // Synchronize local data with the community
  const allFarmers = [...(farmers || [])];
  if (currentUser?.role === 'farmer' && !allFarmers.some(f => (f.id || f._id) === currentUserId)) {
    allFarmers.unshift(currentUser);
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 relative overflow-hidden font-body selection:bg-primary/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 opacity-40 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Standard Sizes */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 border-b border-black/[0.03] pb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/60 backdrop-blur-2xl rounded-full border border-white shadow-md">
               <ShieldCheck className="w-3.5 h-3.5 text-accent" />
               <span className="text-[9px] font-bold text-primary uppercase tracking-[0.5em]">Verified Community v2.8 — ACTIVE</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-primary uppercase tracking-tighter leading-[0.9]">
               Local <span className="text-accent italic font-normal">Farmers</span> <br />
               <span className="text-primary-light">Verified Producers</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
             <div className="relative group min-w-[300px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/30 group-focus-within:text-primary transition-colors" />
                <input type="text" className="input-premium pl-12" placeholder="Search directory..." />
             </div>
             <div className="flex bg-white/40 backdrop-blur-2xl p-1.5 rounded-xl border border-white shadow-sm">
                <div className="px-6 py-2 bg-primary text-white rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-lg">Verified</div>
                <div className="px-6 py-2 text-text-dim/40 text-[9px] font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Top Rated</div>
             </div>
          </motion.div>
        </div>

        {/* Guardian Grid - Standardized Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {isLoading ? (
             <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-6">
                <Sparkles className="w-10 h-10 text-accent animate-spin" />
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Loading Directory...</p>
             </div>
          ) : allFarmers.length > 0 ? (
            allFarmers.map((farmer, i) => (
              <motion.div
                key={farmer.id || farmer._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {/* ... existing card content ... */}
                <div className="card-premium !p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden hover:shadow-2xl transition-all duration-700">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-black/5 shadow-xl group-hover:scale-105 transition-transform duration-700">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`} alt={farmer.name} className="w-full h-full object-cover bg-surface" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center border-2 border-white shadow-xl group-hover:rotate-12 transition-transform">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                         <h3 className="text-2xl font-display font-bold text-primary uppercase tracking-tight">{farmer.name}</h3>
                         <div className="flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 bg-accent/10 rounded-lg">
                            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                            <span className="text-[11px] font-black text-primary">{farmer.rating || '5.0'}</span>
                         </div>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-text-dim/60 text-[9px] font-bold uppercase tracking-widest">
                        <MapPin className="w-3.5 h-3.5 text-accent" /> {farmer.location || 'Verified Location'}
                      </div>
                    </div>

                    <p className="text-sm text-text-dim/70 leading-relaxed font-medium">
                      {farmer.bio || farmer.farmDetails?.description || 'Authentic Guardian synchronizing high-fidelity organic yields with the Bio-Nexus.'}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                       <div className="px-4 py-1.5 bg-surface border border-black/[0.03] rounded-lg text-[9px] font-black text-primary uppercase tracking-widest">
                          {farmer.specialty || farmer.farmDetails?.farmingType || 'Organic Specialty'}
                       </div>
                       <div className="text-[9px] font-black text-text-dim/40 uppercase tracking-widest">
                          {farmer.nodes || '12'} Active Nodes
                       </div>
                    </div>

                    <div className="pt-4 flex items-center justify-center sm:justify-start gap-6 border-t border-black/[0.03]">
                       <Link 
                         to={(farmer.id || farmer._id) === currentUserId ? '#' : `/chat/${farmer.id || farmer._id}`}
                         className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] group/link ${
                           (farmer.id || farmer._id) === currentUserId ? 'text-text-dim/20 cursor-not-allowed' : 'text-primary hover:text-accent transition-colors'
                         }`}
                       >
                          <MessageCircle className="w-4 h-4 group-hover/link:scale-110 transition-all" /> Synchronize
                       </Link>
                       <Link to={`/farmers/${farmer.id || farmer._id}`} className="flex items-center gap-2 text-[10px] font-black text-text-dim/40 hover:text-primary transition-colors uppercase tracking-[0.3em] group/link">
                          <Globe className="w-4 h-4 group-hover/link:scale-110 transition-all" /> View Node
                       </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-8">
               <div className="w-24 h-24 rounded-[2rem] bg-white border border-black/5 flex items-center justify-center text-primary/10 shadow-sm relative group overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                  <Globe className="w-10 h-10 relative z-10" />
               </div>
               <div className="space-y-3">
                  <h3 className="text-2xl font-display font-bold text-primary uppercase tracking-tight">Ecosystem Pulse: Silent</h3>
                  <p className="text-[10px] font-black text-text-dim/40 uppercase tracking-[0.4em] max-w-md leading-loose">
                    The neural Guardian network is currently initializing. <br /> Be the first to synchronize your legacy with the nexus.
                  </p>
               </div>
               <Link to="/register" className="btn-premium px-10 py-4 text-[10px] tracking-[0.4em]">INITIALIZE GUARDIAN NODE</Link>
            </div>
          )}
        </div>

        {/* Global Stats - Standard Look */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 p-10 rounded-[2.5rem] bg-white border border-white shadow-organic flex flex-col md:flex-row items-center justify-between gap-10"
        >
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-inner">
                 <Globe className="w-7 h-7" />
              </div>
              <div>
                 <h4 className="text-xl font-display font-bold text-primary uppercase tracking-tight">Global Network Coverage</h4>
                 <p className="text-[10px] font-black text-text-dim/40 uppercase tracking-[0.4em] mt-1">Expanding across 180+ localized nodes</p>
              </div>
           </div>
           <div className="flex items-center gap-10">
              <div className="text-center">
                 <p className="text-3xl font-display font-bold text-primary tracking-tighter">1,240+</p>
                 <p className="text-[8px] font-black text-accent uppercase tracking-widest">Active Guardians</p>
              </div>
              <div className="w-px h-10 bg-black/[0.03]"></div>
              <div className="text-center">
                 <p className="text-3xl font-display font-bold text-primary tracking-tighter">98.4%</p>
                 <p className="text-[8px] font-black text-accent uppercase tracking-widest">Protocol Success</p>
              </div>
           </div>
           <button className="btn-premium px-10 py-4 text-[10px] tracking-[0.4em]">JOIN GUARDIAN NETWORK</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Farmers;
