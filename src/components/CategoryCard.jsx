import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CategoryCard = ({ name, image, count, slug }) => {
  return (
    <Link 
      to={`/products?category=${slug}`}
      className="group relative h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:border-primary/50"
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-primary/70 transition-colors duration-500"></div>
      
      {/* Content */}
      <div className="absolute bottom-5 left-5 right-5">
        <h4 className="text-white font-bold text-lg mb-0.5 tracking-tight">{name}</h4>
        <div className="flex items-center justify-between">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{count} items harvest</p>
          <ChevronRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
