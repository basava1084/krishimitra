import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Clock,
  ChevronRight,
  User
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { getFreshness } from '../utils/freshness';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => {
    return products.find(p => p.id === id);
  }, [id, products]);

  const freshness = useMemo(() => product ? getFreshness(product.harvestDate) : null, [product]);

  const sameSellerProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.createdBy === product.createdBy && p.id !== product.id).slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
         <h2 className="text-2xl font-black text-gray-900 uppercase">Product not found</h2>
         <button onClick={() => navigate('/products')} className="btn-secondary mt-6">Back to Marketplace</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > product.stock) return alert('Insufficient stock available');
    addToCart(product, quantity);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-6">
             <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm relative group">
                <img 
                  src={product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {freshness && (
                  <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-xl backdrop-blur-md ${freshness.color}`}>
                     <Clock className="w-3 h-3 inline-block mr-1.5 -mt-0.5" /> {freshness.label}
                  </div>
                )}
             </div>
          </div>

          <div className="flex flex-col">
             <div className="space-y-6 mb-10">
                <div className="flex items-center gap-3">
                   <span className="badge bg-primary/10 text-primary">{product.category}</span>
                   <div className="h-3 w-px bg-gray-200"></div>
                   <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {product.location}
                   </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight uppercase">{product.name}</h1>
                
                <div className="flex items-center gap-8">
                   <div className="flex items-center gap-1.5">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900 ml-1">4.8</span>
                   </div>
                   <div className="h-4 w-px bg-gray-200"></div>
                   <div className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Seller
                   </div>
                </div>

                <div className="pt-4 flex items-baseline gap-3">
                   <span className="text-5xl font-black text-gray-900 tracking-tighter">₹{product.price}</span>
                   <span className="text-gray-400 text-xl font-bold uppercase tracking-tight">/ {product.unit || 'kg'}</span>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${product.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">
                         {product.stock > 0 ? `${product.stock} ${product.unit || 'kg'} available` : 'Out of stock'}
                      </span>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-2xl border-2 border-primary/5 space-y-8 mb-12 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-14">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-6 hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-900 disabled:opacity-30"
                        disabled={product.stock === 0}
                      >
                         <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-black text-gray-900 text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-6 hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-900 disabled:opacity-30"
                        disabled={product.stock === 0}
                      >
                         <Plus className="w-4 h-4" />
                      </button>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Estimation</p>
                      <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{product.price * quantity}</p>
                   </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full btn-primary py-5 rounded-2xl text-base shadow-xl shadow-primary/20 disabled:opacity-50 uppercase tracking-widest font-black"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Basket
                </button>
             </div>

             <div className="pt-10 border-t border-gray-100">
                <div className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary/20 hover:bg-primary/5 transition-all group">
                   <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-gray-50 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-300" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Listed By</p>
                      <h4 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors uppercase tracking-tight">{product.sellerName}</h4>
                      <p className="text-xs font-bold text-gray-500 mt-0.5 flex items-center gap-1 uppercase tracking-widest">
                         Role: {product.createdByRole}
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {sameSellerProducts.length > 0 && (
           <div className="mt-32 pt-20 border-t border-gray-100">
              <div className="flex items-end justify-between mb-12">
                 <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">More from {product.sellerName}</h2>
                    <p className="text-gray-500 mt-1 font-medium italic">Other fresh harvests from this seller</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {sameSellerProducts.map(p => (
                   <ProductCard key={p.id} {...p} />
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
