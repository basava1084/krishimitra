import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ShieldCheck, MapPin, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-text-dim hover:text-red-500 hover:bg-white transition-all shadow-sm">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4">
          <div className="px-3 py-1 bg-primary/90 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-3 h-3 text-accent" /> 
            {product.category || 'Organic'}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <Link to={`/products/${product.id}`} className="block">
              <h3 className="text-lg font-display font-bold text-primary tracking-tight leading-tight hover:text-accent transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-accent/10 rounded text-accent">
              <Star className="w-3 h-3 fill-accent" />
              <span className="text-[10px] font-bold">4.9</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-medium">
            <MapPin className="w-3 h-3 opacity-50" /> 
            <span>Local Farm, Karnataka</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-text-dim uppercase tracking-widest opacity-50">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-display font-bold text-primary">₹{product.price}</span>
              <span className="text-[10px] text-text-dim font-medium">/ unit</span>
            </div>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-accent transition-all duration-300 shadow-lg shadow-primary/10 active:scale-90"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-2 border-t border-black/5">
          <Link 
            to={`/products/${product.id}`} 
            className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2 hover:text-accent transition-all group/link"
          >
            View Details 
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
