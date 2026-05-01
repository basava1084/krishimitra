import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Truck, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();
  const navigate = useNavigate();

  // Grouping logic by Farmer
  const groupedCart = useMemo(() => {
    return cart.reduce((acc, item) => {
      const farmerId = item.farmerId || 'unknown';
      if (!acc[farmerId]) {
        acc[farmerId] = {
          farmerId,
          farmerName: item.farmerName || 'Local Farmer',
          items: []
        };
      }
      acc[farmerId].items.push(item);
      return acc;
    }, {});
  }, [cart]);

  if (cartCount === 0) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-8 border border-gray-100">
           <ShoppingBag className="w-10 h-10 text-gray-200" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2 uppercase">Your basket is empty</h2>
        <p className="text-gray-500 font-medium mb-10 text-center max-w-md leading-relaxed">It looks like you haven't added any fresh produce yet. Our farmers are ready with today's harvest!</p>
        <Link to="/products" className="btn-primary py-4 px-10 rounded-full shadow-xl shadow-primary/20 text-base uppercase font-black">
           Explore Today's Harvest <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-12 uppercase border-b-4 border-primary w-fit pb-2">Checkout Basket</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {Object.values(groupedCart).map((group) => (
               <div key={group.farmerId} className="space-y-4">
                  {/* Farmer Header */}
                  <div className="flex items-center gap-3 px-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <User className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Harvest Grouped By</p>
                        <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">{group.farmerName}</h3>
                     </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                     <div className="divide-y divide-gray-100">
                        {group.items.map((item) => (
                          <div key={item.id} className="p-8 flex flex-col sm:flex-row items-center gap-8 group hover:bg-gray-50 transition-colors">
                             <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 shadow-sm">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                             </div>
                             
                             <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate uppercase tracking-tight">{item.name}</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">₹{item.price} / {item.unit}</p>
                             </div>

                             <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm h-12">
                                <button onClick={() => updateQuantity(item.id, -1)} className="px-4 hover:bg-gray-50 text-gray-400 transition-colors">
                                   <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-10 text-center font-black text-gray-900 text-sm">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="px-4 hover:bg-gray-50 text-gray-400 transition-colors">
                                   <Plus className="w-3.5 h-3.5" />
                                </button>
                             </div>

                             <div className="w-28 text-right">
                                <p className="text-xl font-black text-gray-900 tracking-tight">₹{item.price * item.quantity}</p>
                             </div>

                             <button onClick={() => removeFromCart(item.id)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                                <Trash2 className="w-5 h-5" />
                             </button>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
            
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors py-2 uppercase tracking-widest">
               <ArrowLeft className="w-4 h-4" /> Continue Supporting Local Farmers
            </Link>
          </div>

          <div className="space-y-6">
             <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-8 sticky top-28">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">Grand Summary</h3>
                
                <div className="space-y-4">
                   <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                      <span>Subtotal ({cartCount} items)</span>
                      <span className="text-gray-900 font-black">₹{subtotal}</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                      <span>Delivery Fee</span>
                      <span className="text-green-600 font-black tracking-tighter">FREE</span>
                   </div>
                   <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                      <span className="text-base font-black text-gray-900 uppercase tracking-widest">Total Pay</span>
                      <span className="text-3xl font-black text-primary tracking-tighter">₹{subtotal}</span>
                   </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-100">
                   <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed tracking-wider">
                         Delivery within <span className="text-gray-900 font-black">24 Hours</span> directly from farms
                      </p>
                   </div>
                   <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed tracking-wider">
                         Payment protected by our <span className="text-gray-900 font-black">Freshness Guarantee</span>
                      </p>
                   </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary py-5 rounded-2xl text-base shadow-xl shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-widest font-black"
                >
                  Proceed to Payment <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
