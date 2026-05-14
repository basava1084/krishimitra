import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  ShoppingBag,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Standard Flipkart-style calculation
  const deliveryCharges = cartTotal > 500 ? 0 : 40;
  const totalAmount = cartTotal + deliveryCharges;

  return (
    <div className="bg-[#f1f3f6] min-h-screen pt-32 pb-24 font-body text-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1 space-y-4">
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white">
                  <h2 className="text-lg font-bold text-primary">My Cart ({cart.length})</h2>
                  <div className="flex items-center gap-2 text-sm text-text-dim">
                     <MapPin className="w-4 h-4" />
                     <span>Deliver to: <span className="font-bold text-primary">Karnataka - 560001</span></span>
                  </div>
               </div>

               {cart.length > 0 ? (
                 <div className="divide-y divide-black/5">
                   {cart.map((item) => (
                     <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-surface/10 transition-colors">
                        {/* Product Image & Quantity Controls */}
                        <div className="flex flex-col items-center gap-4 shrink-0">
                           <div className="w-28 h-28 border border-black/5 rounded p-1">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                           </div>
                           <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-primary hover:bg-surface transition-all"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <div className="w-10 h-7 border border-black/10 flex items-center justify-center text-sm font-bold">
                                {item.quantity}
                              </div>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-primary hover:bg-surface transition-all"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                           </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-2">
                           <h3 className="text-lg font-medium text-primary leading-tight line-clamp-1">{item.name}</h3>
                           <p className="text-xs text-text-dim">Seller: <span className="text-primary font-medium">{item.sellerName || 'Local Farmer'}</span></p>
                           <div className="flex items-center gap-3 pt-2">
                              <span className="text-lg font-bold text-primary">₹{item.price * item.quantity}</span>
                              <span className="text-xs text-emerald-600 font-bold">2 Offers Applied</span>
                           </div>
                           
                           <div className="flex items-center gap-6 pt-4">
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-sm font-bold text-primary hover:text-red-500 uppercase tracking-wide transition-colors"
                              >
                                Remove
                              </button>
                              <button className="text-sm font-bold text-primary hover:text-accent uppercase tracking-wide transition-colors">
                                Save for Later
                              </button>
                           </div>
                        </div>

                        {/* Delivery Promise */}
                        <div className="text-sm text-text-dim sm:w-48">
                           Delivery by Sat, May 15 | <span className="text-emerald-600">Free</span>
                        </div>
                     </div>
                   ))}

                   {/* Place Order Button Container */}
                   <div className="p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sticky bottom-0 z-10 flex justify-end">
                      <button 
                        onClick={() => isAuthenticated ? navigate('/checkout') : navigate('/login', { state: { from: '/checkout' } })}
                        className="bg-[#fb641b] text-white px-16 py-4 rounded-sm font-bold uppercase shadow-lg hover:bg-[#e65a16] transition-all"
                      >
                        Place Order
                      </button>
                   </div>
                 </div>
               ) : (
                 <div className="py-20 text-center space-y-6">
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/empty-cart_ee6143.png" alt="Empty Cart" className="w-48 mx-auto" />
                    <div className="space-y-2">
                       <h3 className="text-xl font-medium">Your cart is empty!</h3>
                       <p className="text-sm text-text-dim">Add items to it now.</p>
                    </div>
                    <Link to="/products" className="inline-block bg-primary text-white px-12 py-3 rounded-sm font-bold uppercase shadow-md">Shop Now</Link>
                 </div>
               )}
            </div>
          </div>

          {/* Right Column: Price Details */}
          {cart.length > 0 && (
            <div className="w-full lg:w-[380px] space-y-4">
               <div className="bg-white shadow-sm rounded-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-black/5">
                     <h3 className="text-sm font-bold text-text-dim uppercase tracking-wider">Price Details</h3>
                  </div>
                  <div className="p-6 space-y-5">
                     <div className="flex justify-between items-center text-base">
                        <span>Price ({cart.length} items)</span>
                        <span>₹{cartTotal}</span>
                     </div>
                     <div className="flex justify-between items-center text-base">
                        <span>Discount</span>
                        <span className="text-emerald-600">- ₹0</span>
                     </div>
                     <div className="flex justify-between items-center text-base border-b border-dashed border-black/10 pb-5">
                        <span>Delivery Charges</span>
                        <span className={deliveryCharges === 0 ? 'text-emerald-600' : ''}>
                           {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                        </span>
                     </div>
                     <div className="flex justify-between items-center text-lg font-bold border-b border-dashed border-black/10 pb-5">
                        <span>Total Amount</span>
                        <span>₹{totalAmount}</span>
                     </div>
                     <p className="text-emerald-600 text-sm font-bold">
                        You will save ₹0 on this order
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-3 text-text-dim px-2">
                  <ShieldCheck className="w-8 h-8 opacity-40" />
                  <p className="text-xs font-bold leading-tight uppercase tracking-wider opacity-60">
                     Safe and Secure Payments. Easy returns. 100% Authentic products.
                  </p>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Cart;

