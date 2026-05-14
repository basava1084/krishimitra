import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const CategoryCard = ({ name, image, count, slug }) => {
  return (
    <Link
      to={`/products?category=${slug}`}
      className="group relative h-80 rounded-[3rem] overflow-hidden border border-white bg-surface transition-all duration-700 shadow-organic hover:shadow-2xl hover:-translate-y-2 block"
    >
      <motion.img
        src={image}
        alt={name}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-1000"></div>

      {/* Content */}
      <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-accent uppercase tracking-[0.4em]">{count} Yields</p>
          <h4 className="text-primary font-display font-bold text-3xl tracking-tight uppercase leading-none">{name}</h4>
        </div>
        
        <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.03] flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white group-hover:shadow-xl transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
           <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
