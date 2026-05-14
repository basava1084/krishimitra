import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Info, Search, Filter, Layers, Zap } from 'lucide-react';

const SmartMap = () => {
  const [activeFarm, setActiveFarm] = useState(null);

  const FARMS = [
    { id: 1, name: "Kumar Organic Estate", type: "Vegetables", lat: 20, lng: 30, rating: 4.8, distance: "2.4 km" },
    { id: 2, name: "Suresh's Mango Grove", type: "Fruits", lat: 50, lng: 70, rating: 5.0, distance: "5.1 km" },
    { id: 3, name: "Amrita's Bio-Farm", type: "Dairy", lat: 80, lng: 40, rating: 4.9, distance: "3.8 km" },
  ];

  return (
    <div className="bg-background rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden h-[600px] relative flex flex-col md:flex-row group">
      {/* Sidebar - Map Controls */}
      <div className="w-full md:w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col gap-8 relative z-20 shadow-inner">
         <div className="space-y-2">
            <h3 className="text-xl font-serif font-black text-white uppercase tracking-widest text-glow">Farm Finder</h3>
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] drop-shadow-[0_0_2px_currentColor]">3 active nodes found</p>
         </div>

         <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 drop-shadow-[0_0_2px_currentColor]" />
            <input 
               type="text" 
               placeholder="Search sector..." 
               className="w-full bg-white/5 border border-white/10 focus:border-accent/50 rounded-2xl py-3 pl-11 pr-4 text-xs font-black text-white placeholder:text-white/20 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(227,178,124,0.1)] focus:outline-none"
            />
         </div>

         <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pr-2">
            {FARMS.map(farm => (
              <motion.div 
                key={farm.id}
                whileHover={{ x: 5 }}
                onClick={() => setActiveFarm(farm)}
                className={`p-5 rounded-[1.5rem] border cursor-pointer transition-all duration-300 ${activeFarm?.id === farm.id ? 'bg-accent/20 border-accent shadow-[0_0_20px_rgba(227,178,124,0.2)] text-white' : 'bg-white/5 border-white/10 hover:border-accent/40 hover:bg-white/10'}`}
              >
                 <div className="flex justify-between items-start mb-2">
                    <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${activeFarm?.id === farm.id ? 'text-accent drop-shadow-[0_0_2px_currentColor]' : 'text-white/50'}`}>{farm.type}</p>
                    <div className="flex items-center gap-1 text-white/40">
                       <MapPin className="w-3 h-3 text-accent" />
                       <span className="text-[9px] font-black tracking-widest text-white/70">{farm.distance}</span>
                    </div>
                 </div>
                 <h4 className="font-serif font-black uppercase tracking-wide text-white leading-tight mb-3 text-glow">{farm.name}</h4>
                 <div className="flex items-center gap-2">
                    <div className="flex text-accent drop-shadow-[0_0_2px_currentColor]">
                       {[...Array(5)].map((_, i) => <Zap key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'opacity-20'}`} />)}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Verified</span>
                 </div>
              </motion.div>
            ))}
         </div>

         <button className="w-full py-4 bg-accent text-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(227,178,124,0.2)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all active:scale-95">
            Live Route Planning
         </button>
      </div>

      {/* Futuristic Map Canvas */}
      <div className="flex-1 relative bg-background overflow-hidden">
         {/* Grid Lines */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,178,124,0.05)_0%,transparent_60%)]"></div>
         
         {/* Simulated Map Markers */}
         {FARMS.map(farm => (
           <motion.div
             key={farm.id}
             style={{ top: `${farm.lat}%`, left: `${farm.lng}%` }}
             animate={{ scale: activeFarm?.id === farm.id ? [1, 1.2, 1] : 1 }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
             onClick={() => setActiveFarm(farm)}
           >
              <div className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${activeFarm?.id === farm.id ? 'bg-accent/40 border-accent shadow-[0_0_30px_rgba(227,178,124,0.5)]' : 'bg-white/10 hover:bg-accent/20'}`}>
                 <MapPin className={`w-5 h-5 ${activeFarm?.id === farm.id ? 'text-white drop-shadow-[0_0_5px_currentColor]' : 'text-white/60'}`} />
              </div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/90 backdrop-blur-xl px-4 py-2 rounded-xl text-[9px] font-black text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] text-glow">
                 {farm.name}
              </div>
           </motion.div>
         ))}

         {/* Radar Effect */}
         <motion.div 
           animate={{ scale: [1, 4], opacity: [0.5, 0] }}
           transition={{ repeat: Infinity, duration: 4, ease: "easeOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-accent/20 rounded-full shadow-[0_0_30px_rgba(227,178,124,0.1)]"
         />

         {/* Map UI Overlays */}
         <div className="absolute bottom-10 right-10 flex flex-col gap-4 z-20">
            <div className="bg-white/5 backdrop-blur-xl p-3 rounded-[1.5rem] border border-white/10 flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
               <button className="p-3 bg-white/5 border border-transparent rounded-xl text-white/50 hover:bg-accent/20 hover:text-accent hover:border-accent/30 transition-all duration-300"><Layers className="w-5 h-5 drop-shadow-[0_0_2px_currentColor]" /></button>
               <button className="p-3 bg-white/5 border border-transparent rounded-xl text-white/50 hover:bg-accent/20 hover:text-accent hover:border-accent/30 transition-all duration-300"><Navigation className="w-5 h-5 drop-shadow-[0_0_2px_currentColor]" /></button>
               <button className="p-3 bg-white/5 border border-transparent rounded-xl text-white/50 hover:bg-accent/20 hover:text-accent hover:border-accent/30 transition-all duration-300"><Info className="w-5 h-5 drop-shadow-[0_0_2px_currentColor]" /></button>
            </div>
         </div>

         <div className="absolute top-10 left-10 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_5px_currentColor]"></div>
            <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em]">Satellite Sync: <span className="text-accent drop-shadow-[0_0_2px_currentColor]">98.4% Accuracy</span></p>
         </div>
      </div>
    </div>
  );
};

export default SmartMap;
