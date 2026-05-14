import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
   ArrowLeft,
   ShoppingCart,
   MapPin,
   Star,
   ShieldCheck,
   Plus,
   Minus,
   ChevronRight,
   Zap,
   TrendingUp,
   Heart,
   Share2,
   Truck,
   RotateCcw,
   CheckCircle2
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { products } = useProducts();
   const { addToCart } = useCart();
   const [quantity, setQuantity] = useState(1);
   const [activeTab, setActiveTab] = useState('description');

   const product = useMemo(() => {
      return products.find(p => p.id === id || p._id === id);
   }, [id, products]);

   const relatedProducts = useMemo(() => {
      if (!product) return [];
      return products
         .filter(p => p.category === product.category && (p.id !== product.id && p._id !== product._id))
         .slice(0, 4);
   }, [product, products]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   if (!product) {
      return (
         <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 pt-32">
            <div className="text-center space-y-6">
               <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto text-primary/10">
                  <Package className="w-10 h-10" />
               </div>
               <h2 className="text-2xl font-display font-bold text-primary uppercase">Product Not Found</h2>
               <button onClick={() => navigate('/products')} className="btn-premium px-8 py-3">BACK TO MARKETPLACE</button>
            </div>
         </div>
      );
   }

   const handleAddToCart = () => {
      addToCart(product, quantity);
   };

   const handleBuyNow = () => {
      addToCart(product, quantity);
      navigate('/checkout');
   };

   return (
      <div className="bg-white min-h-screen pb-20 pt-32 font-body text-text-main">
         <div className="max-w-7xl mx-auto px-6">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-text-dim uppercase tracking-widest mb-10">
               <Link to="/" className="hover:text-primary transition-colors">Home</Link>
               <span className="opacity-30">/</span>
               <Link to="/products" className="hover:text-primary transition-colors">Marketplace</Link>
               <span className="opacity-30">/</span>
               <span className="text-primary">{product.name}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
               
               {/* Left: Image Gallery */}
               <div className="space-y-6">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="aspect-square rounded-[2.5rem] overflow-hidden bg-surface border border-black/5 relative group shadow-xl"
                  >
                     <img
                        src={product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                     <button className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-text-dim hover:text-red-500 transition-all shadow-lg">
                        <Heart className="w-5 h-5" />
                     </button>
                  </motion.div>
                  
                  {/* Small Info Cards */}
                  <div className="grid grid-cols-3 gap-4">
                     {[
                        { icon: Truck, label: 'Free Delivery', desc: 'Orders over ₹500' },
                        { icon: RotateCcw, label: 'Easy Returns', desc: '7 Day Return' },
                        { icon: ShieldCheck, label: '100% Organic', desc: 'Certified Farm' },
                     ].map((item, i) => (
                        <div key={i} className="p-4 bg-surface rounded-2xl border border-black/5 text-center space-y-2">
                           <item.icon className="w-5 h-5 text-primary mx-auto" />
                           <div>
                              <p className="text-[10px] font-bold text-primary uppercase tracking-tight">{item.label}</p>
                              <p className="text-[8px] text-text-dim uppercase tracking-widest">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Product Info */}
               <div className="space-y-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                           <CheckCircle2 className="w-3 h-3" /> IN STOCK
                        </span>
                        <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">{product.category}</span>
                     </div>
                     
                     <h1 className="text-4xl md:text-5xl font-display font-bold text-primary uppercase tracking-tight leading-tight">
                        {product.name}
                     </h1>

                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                           <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                 <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                              ))}
                           </div>
                           <span className="text-sm font-bold text-primary">4.9</span>
                        </div>
                        <div className="w-px h-4 bg-black/10"></div>
                        <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">128 Reviews</span>
                     </div>

                     <div className="flex items-baseline gap-3 pt-4">
                        <span className="text-5xl font-display font-bold text-primary tracking-tight">₹{product.price}</span>
                        <span className="text-text-dim text-lg font-medium">/ {product.unit || 'kg'}</span>
                     </div>
                  </div>

                  <p className="text-sm text-text-dim leading-relaxed max-w-xl">
                     Sourced directly from certified organic farms, our {product.name} is grown with traditional methods ensuring maximum nutrition and natural flavor. No synthetic pesticides or chemicals used.
                  </p>

                  {/* Quantity & Actions */}
                  <div className="space-y-6 pt-6 border-t border-black/5">
                     <div className="flex items-center gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Quantity</label>
                           <div className="flex items-center bg-surface rounded-xl p-1 border border-black/5 w-32 h-14">
                              <button
                                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                 className="flex-1 flex items-center justify-center text-primary hover:text-accent transition-colors"
                              >
                                 <Minus className="w-4 h-4" />
                              </button>
                              <span className="flex-1 text-center font-display font-bold text-primary text-xl">{quantity}</span>
                              <button
                                 onClick={() => setQuantity(quantity + 1)}
                                 className="flex-1 flex items-center justify-center text-primary hover:text-accent transition-colors"
                              >
                                 <Plus className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                        <div className="flex-1 space-y-2">
                           <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Total Price</label>
                           <p className="text-3xl font-display font-bold text-primary h-14 flex items-center">₹{product.price * quantity}</p>
                        </div>
                     </div>

                     <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button
                           onClick={handleAddToCart}
                           className="flex-1 btn-premium py-5 text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl"
                        >
                           <ShoppingCart className="w-5 h-5" /> ADD TO CART
                        </button>
                        <button
                           onClick={handleBuyNow}
                           className="flex-1 bg-accent text-white py-5 rounded-xl font-display font-bold text-[10px] tracking-[0.2em] hover:bg-primary transition-all shadow-xl uppercase"
                        >
                           Buy Now
                        </button>
                     </div>
                  </div>

                  {/* Seller Info */}
                  <div className="p-6 bg-surface rounded-3xl border border-black/5 flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.sellerName || 'Farmer'}`} className="w-full h-full object-cover" alt="Farmer" />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-bold text-accent uppercase tracking-widest">Verified Seller</p>
                        <h4 className="text-xl font-display font-bold text-primary uppercase tracking-tight">{product.sellerName || 'Local Farmer'}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-text-dim uppercase tracking-widest mt-1">
                           <MapPin className="w-3 h-3" /> Karnataka, India
                        </div>
                     </div>
                     <Link to={`/farmers/${product.farmerId}`} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:text-accent shadow-sm border border-black/5 transition-all">
                        <ChevronRight className="w-5 h-5" />
                     </Link>
                  </div>

               </div>
            </div>

            {/* Recommendations Section */}
            {relatedProducts.length > 0 && (
               <div className="mt-32 pt-20 border-t border-black/5">
                  <div className="flex items-end justify-between mb-12">
                     <div className="space-y-4">
                        <p className="text-[11px] font-black text-accent uppercase tracking-[0.5em]">Based on your interest</p>
                        <h2 className="text-4xl font-display font-bold text-primary uppercase tracking-tight">Similar <span className="text-accent italic font-normal">Products</span></h2>
                     </div>
                     <Link to="/products" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-accent transition-all flex items-center gap-2">
                        VIEW ALL MARKETPLACE <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {relatedProducts.map((p, i) => (
                        <ProductCard key={p.id || p._id} product={p} index={i} />
                     ))}
                  </div>
               </div>
            )}

         </div>
      </div>
   );
};

export default ProductDetails;
