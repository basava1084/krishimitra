import React from 'react';
import { motion } from 'framer-motion';
import { Play, User, Sparkles } from 'lucide-react';

const STORIES = [
  { id: 1, name: 'Rajesh K.', avatar: '/images/farmer-rajesh.png', status: 'live' },
  { id: 2, name: 'Suresh P.', avatar: '/images/farmer-suresh.png', status: 'harvest' },
  { id: 3, name: 'Amrita D.', avatar: '/images/farmer-amrita.png', status: 'organic' },
  { id: 4, name: 'Harpreet S.', avatar: '/images/farmer-harpreet.png', status: 'new' },
  { id: 5, name: 'Vikram R.', avatar: '', status: 'live' },
];

const FarmStories = () => {
  return (
    <div className="py-12 bg-white/40 backdrop-blur-3xl border-y border-black/[0.03] mb-16 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10 overflow-x-auto no-scrollbar pb-4 pt-2">
          {/* Add Story Button */}
          <div className="flex flex-col items-center gap-4 shrink-0 group cursor-pointer">
            <div className="w-24 h-24 rounded-[2.5rem] border-2 border-dashed border-primary/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-700 shadow-sm relative">
              <div className="w-20 h-20 rounded-[2.2rem] bg-white border border-black/[0.03] flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-700">
                <Play className="w-7 h-7 text-primary/30 group-hover:text-accent fill-current transition-colors" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary shadow-lg border-2 border-white group-hover:rotate-12 transition-transform">
                 <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors">Post Vector</span>
          </div>

          {STORIES.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-4 shrink-0 cursor-pointer"
            >
              <div className={`w-24 h-24 rounded-[2.5rem] p-[3px] transition-all duration-1000 ${story.status === 'live' ? 'bg-gradient-to-tr from-accent via-primary-light to-accent shadow-[0_10px_25px_rgba(233,196,106,0.3)] animate-spin-slow' : 'bg-black/[0.05]'}`}>
                <div className="w-full h-full rounded-[2.5rem] bg-white p-1.5">
                  <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-surface flex items-center justify-center border border-black/[0.03] shadow-inner relative group/avatar">
                    {story.avatar ? (
                      <img src={story.avatar} alt={story.name} className="w-full h-full object-cover transition-all duration-1000 group-hover/avatar:scale-110" />
                    ) : (
                      <User className="w-10 h-10 text-primary/10" />
                    )}
                    {story.status === 'live' && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent rounded-full shadow-lg border border-white">
                         <span className="text-[7px] font-black text-primary uppercase tracking-widest">LIVE</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-dim group-hover:text-primary transition-colors">{story.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmStories;
