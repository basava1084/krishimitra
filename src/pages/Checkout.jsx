import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  MapPin, 
  Phone, 
  User,
  Lock,
  CheckCircle2,
  ChevronDown,
  Globe,
  Wallet,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2); // Start at Delivery Address since logged in
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
    paymentMethod: 'upi'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = {
        items: cart,
        total: cartTotal,
        shippingDetails: formData,
        status: 'Confirmed',
        orderDate: new Date().toISOString()
      };
      
      placeOrder(order);
      clearCart();
      navigate('/customer/dashboard');
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const deliveryCharges = cartTotal > 500 ? 0 : 40;
  const totalAmount = cartTotal + deliveryCharges;

  const StepHeader = ({ num, title, subtitle, isActive, isCompleted, onEdit }) => (
    <div className={`p-4 flex items-center justify-between border-b border-black/5 ${isActive ? 'bg-primary text-white' : 'bg-white'}`}>
       <div className="flex items-center gap-4">
          <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${isActive ? 'bg-white text-primary' : 'bg-surface text-primary'}`}>
             {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : num}
          </div>
          <div>
             <h3 className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-text-dim'}`}>{title}</h3>
             {isCompleted && !isActive && <p className="text-xs font-medium text-primary mt-0.5">{subtitle}</p>}
          </div>
       </div>
       {!isActive && isCompleted && (
         <button onClick={onEdit} className="px-4 py-2 border border-black/10 rounded text-[10px] font-bold text-primary uppercase hover:bg-surface transition-all">
            Change
         </button>
       )}
    </div>
  );

  return (
    <div className="bg-[#f1f3f6] min-h-screen pt-32 pb-24 font-body text-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Stepped Checkout */}
          <div className="flex-1 space-y-4">
            
            {/* Step 1: Login */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
               <StepHeader 
                  num="1" 
                  title="Login" 
                  subtitle={`${currentUser?.name} | ${currentUser?.phone || '+91 7411278970'}`} 
                  isCompleted={true} 
                  isActive={activeStep === 1}
                  onEdit={() => setActiveStep(1)}
               />
               <AnimatePresence>
                  {activeStep === 1 && (
                     <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="p-6">
                        <div className="flex justify-between items-center">
                           <div>
                              <p className="text-sm font-bold text-primary">{currentUser?.name}</p>
                              <p className="text-xs text-text-dim">{currentUser?.email}</p>
                           </div>
                           <button onClick={() => setActiveStep(2)} className="bg-[#fb641b] text-white px-8 py-2.5 rounded-sm text-xs font-bold uppercase shadow-md">Continue Checkout</button>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
               <StepHeader 
                  num="2" 
                  title="Delivery Address" 
                  subtitle={formData.address ? `${formData.name}, ${formData.address.slice(0, 30)}...` : ''}
                  isCompleted={activeStep > 2} 
                  isActive={activeStep === 2}
                  onEdit={() => setActiveStep(2)}
               />
               <AnimatePresence>
                  {activeStep === 2 && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-surface/30">
                        <form className="space-y-6 max-w-2xl">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input type="text" name="name" placeholder="Name" className="bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" value={formData.name} onChange={handleInputChange} />
                              <input type="text" name="phone" placeholder="10-digit mobile number" className="bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" value={formData.phone} onChange={handleInputChange} />
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input type="text" name="pincode" placeholder="Pincode" className="bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" value={formData.pincode} onChange={handleInputChange} />
                              <input type="text" name="locality" placeholder="Locality" className="bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" value={formData.locality} onChange={handleInputChange} />
                           </div>
                           <textarea name="address" placeholder="Address (Area and Street)" className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-24 resize-none" value={formData.address} onChange={handleInputChange}></textarea>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input type="text" name="city" placeholder="City/District/Town" className="bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" value={formData.city} onChange={handleInputChange} />
                              <select name="state" className="bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" value={formData.state} onChange={handleInputChange}>
                                 <option value="">--Select State--</option>
                                 <option value="Karnataka">Karnataka</option>
                                 <option value="Maharashtra">Maharashtra</option>
                              </select>
                           </div>
                           <button 
                             type="button"
                             onClick={() => setActiveStep(3)}
                             className="bg-[#fb641b] text-white px-12 py-4 rounded-sm font-bold uppercase shadow-lg hover:bg-[#e65a16] transition-all"
                           >
                             Save and Deliver Here
                           </button>
                        </form>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Step 3: Order Summary */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
               <StepHeader 
                  num="3" 
                  title="Order Summary" 
                  subtitle={`${cart.length} Item${cart.length > 1 ? 's' : ''}`}
                  isCompleted={activeStep > 3} 
                  isActive={activeStep === 3}
                  onEdit={() => setActiveStep(3)}
               />
               <AnimatePresence>
                  {activeStep === 3 && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-0">
                        {cart.map(item => (
                           <div key={item.id} className="p-6 flex gap-6 border-b border-black/5 hover:bg-surface/10 transition-colors">
                              <div className="w-20 h-20 border border-black/5 p-1 shrink-0 bg-white">
                                 <img src={item.image} className="w-full h-full object-contain" />
                              </div>
                              <div className="space-y-1">
                                 <h4 className="text-sm font-bold text-primary">{item.name}</h4>
                                 <p className="text-xs text-text-dim">Seller: {item.sellerName || 'Local Farmer'}</p>
                                 <p className="text-base font-bold text-primary mt-2">₹{item.price * item.quantity}</p>
                              </div>
                           </div>
                        ))}
                        <div className="p-6 flex items-center justify-between bg-white sticky bottom-0 border-t border-black/5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                           <p className="text-xs font-bold text-text-dim">Order confirmation email will be sent to <span className="text-primary">{currentUser?.email}</span></p>
                           <button onClick={() => setActiveStep(4)} className="bg-[#fb641b] text-white px-12 py-3 rounded-sm font-bold uppercase shadow-md">Continue</button>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Step 4: Payment Options */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
               <StepHeader 
                  num="4" 
                  title="Payment Options" 
                  isCompleted={activeStep > 4} 
                  isActive={activeStep === 4}
               />
               <AnimatePresence>
                  {activeStep === 4 && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-6">
                        {[
                           { id: 'upi', label: 'UPI (PhonePe, Google Pay, BHIM)', icon: Globe },
                           { id: 'wallet', label: 'Wallets', icon: Wallet },
                           { id: 'card', label: 'Credit / Debit / ATM Card', icon: CreditCard },
                           { id: 'cod', label: 'Cash on Delivery', icon: Smartphone },
                        ].map((method) => (
                           <label key={method.id} className="flex items-start gap-4 p-4 border border-black/5 rounded cursor-pointer hover:bg-surface/30 transition-all group">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                className="mt-1.5 w-4 h-4 accent-primary" 
                                checked={formData.paymentMethod === method.id}
                                onChange={() => setFormData({...formData, paymentMethod: method.id})}
                              />
                              <div className="flex-1">
                                 <div className="flex items-center gap-3">
                                    <method.icon className="w-5 h-5 text-text-dim group-hover:text-primary" />
                                    <span className="text-sm font-bold text-primary">{method.label}</span>
                                 </div>
                                 {formData.paymentMethod === method.id && method.id === 'card' && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-6 space-y-4 max-w-sm">
                                       <input type="text" placeholder="Card Number" className="w-full border border-black/10 p-3 text-sm focus:outline-none" />
                                       <div className="grid grid-cols-2 gap-4">
                                          <input type="text" placeholder="MM/YY" className="border border-black/10 p-3 text-sm focus:outline-none" />
                                          <input type="password" placeholder="CVV" className="border border-black/10 p-3 text-sm focus:outline-none" />
                                       </div>
                                       <button onClick={handleCheckout} className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-bold uppercase shadow-md">Pay ₹{totalAmount}</button>
                                    </motion.div>
                                 )}
                                 {formData.paymentMethod === method.id && method.id !== 'card' && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-4">
                                       <button onClick={handleCheckout} className="bg-[#fb641b] text-white px-12 py-3 rounded-sm font-bold uppercase shadow-md">
                                          {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
                                       </button>
                                    </motion.div>
                                 )}
                              </div>
                           </label>
                        ))}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Price Details */}
          <div className="w-full lg:w-[380px] space-y-4">
               <div className="bg-white shadow-sm rounded-sm overflow-hidden sticky top-32">
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
                        <span>Total Payable</span>
                        <span>₹{totalAmount}</span>
                     </div>
                     <p className="text-emerald-600 text-sm font-bold">
                        Your total saving on this order is ₹0
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-3 text-text-dim px-2">
                  <ShieldCheck className="w-8 h-8 opacity-40" />
                  <p className="text-xs font-bold leading-tight uppercase tracking-wider opacity-60">
                     Safe and Secure Payments. 100% Authentic products.
                  </p>
               </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
