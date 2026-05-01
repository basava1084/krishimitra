import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Star, Clock, UserCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getFreshness } from '../utils/freshness';

const ProductCard = ({ id, name, price, unit, image, sellerName, createdByRole, location, organic, rating, harvestDate, farmerId }) => {
  const { addToCart } = useCart();
  const freshness = getFreshness(harvestDate);

  return (
    <div className="card group hover:border-primary/30 transition-all flex flex-col h-full relative">
      <Link to={`/product/${id}`} className="relative aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-100 block">
        <img 
          src={image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${freshness.color} shadow-sm backdrop-blur-[2px]`}>
           {freshness.label}
        </div>

        {organic && (
          <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
            Organic
          </span>
        )}
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">
            <Link to={`/product/${id}`}>{name}</Link>
          </h3>
          <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5 font-medium">
            <MapPin className="w-3 h-3 text-primary" />
            {location}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5">
             <div className={`w-1.5 h-1.5 rounded-full ${createdByRole === 'farmer' ? 'bg-primary' : 'bg-blue-500'}`}></div>
             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                {sellerName} <span className="text-gray-300 font-medium">({createdByRole})</span>
             </span>
          </div>
          <div className="h-2 w-px bg-gray-200"></div>
          <div className="flex items-center gap-0.5">
             <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
             <span className="text-[10px] font-bold text-gray-600">{rating || '4.5'}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-base font-black text-gray-900 tracking-tighter">₹{price}</span>
            <span className="text-gray-400 text-[10px] font-bold ml-1 uppercase">/ {unit || 'kg'}</span>
          </div>
          <button 
            onClick={() => addToCart({ id, name, price, unit: unit || 'kg', image, farmerId: farmerId || 'U-001', sellerName })}
            className="p-2 bg-gray-50 text-gray-400 rounded-md border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90"
            title="Add to Basket"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
