import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Truck, ShieldCheck, MapPin, Phone, User,
  Lock, CheckCircle2, Globe, Wallet, Smartphone, Package,
  ChevronRight, ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const INDIA_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu & Kashmir','Ladakh','Puducherry'
];

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [errors, setErrors] = useState({});

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
  });

  const deliveryCharge = cartTotal > 500 ? 0 : 40;
  const discount = 0;
  const totalAmount = cartTotal + deliveryCharge - discount;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateAddress = () => {
    const req = ['name', 'phone', 'pincode', 'address', 'city', 'state'];
    const newErrors = {};
    req.forEach(f => { if (!formData[f]) newErrors[f] = 'Required'; });
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit number';
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateAddress()) setActiveStep(4);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      setProcessingStage('Securing your payment...');
      await new Promise(r => setTimeout(r, 1000));

      setProcessingStage('Confirming with farmers...');
      await new Promise(r => setTimeout(r, 900));

      setProcessingStage('Generating your order...');
      await new Promise(r => setTimeout(r, 700));

      // Save order to MongoDB Atlas
      const savedOrder = await placeOrder({
        customerId: currentUser?._id || currentUser?.id,
        customerName: currentUser?.name,
        customerEmail: currentUser?.email,
        items: cart.map(item => ({
          productId: item._id || item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit || 'kg',
          sellerName: item.sellerName,
          farmerId: item.farmerId
        })),
        shippingAddress: formData,
        paymentMethod: selectedPayment,
        subtotal: cartTotal,
        deliveryCharge,
        discount,
        totalAmount
      });

      clearCart();

      navigate('/order-confirmation', { state: { order: savedOrder } });
    } catch (err) {
      console.error('Order failed:', err);
      setIsProcessing(false);
      setProcessingStage('');
    }
  };

  // ── Processing Overlay ──
  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-[500] bg-white flex flex-col items-center justify-center gap-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#fb641b]/20 border-t-[#fb641b] rounded-full"
        />
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-primary">Processing your order</h2>
          <p className="text-text-dim text-sm animate-pulse">{processingStage}</p>
        </div>
        <div className="flex gap-6 text-xs text-text-dim font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#26a541]" /> 100% Secure</span>
          <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-[#26a541]" /> Encrypted</span>
        </div>
      </div>
    );
  }

  const StepHeader = ({ num, title, subtitle, isActive, isCompleted, onEdit }) => (
    <div className={`px-6 py-4 flex items-center justify-between border-b border-black/5 ${isActive ? 'bg-primary' : 'bg-white'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${isActive ? 'bg-white text-primary' : isCompleted ? 'bg-transparent' : 'bg-surface text-primary'}`}>
          {isCompleted && !isActive ? <CheckCircle2 className="w-5 h-5 text-[#26a541]" /> : num}
        </div>
        <div>
          <h3 className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : isCompleted ? 'text-primary' : 'text-text-dim'}`}>{title}</h3>
          {isCompleted && !isActive && subtitle && (
            <p className="text-xs text-primary mt-0.5 font-medium">{subtitle}</p>
          )}
        </div>
      </div>
      {isCompleted && !isActive && (
        <button onClick={onEdit} className="px-4 py-1.5 border border-[#2874f0] text-[#2874f0] rounded text-[10px] font-bold uppercase hover:bg-blue-50 transition-all">
          CHANGE
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#f1f3f6] min-h-screen pt-28 pb-16 font-body text-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-dim mb-4">
          <Link to="/cart" className="hover:text-primary flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Cart</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary font-bold">Checkout</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left: Steps ── */}
          <div className="flex-1 space-y-3">

            {/* STEP 1: Login */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <StepHeader
                num="1" title="Login"
                subtitle={`${currentUser?.name} | ${currentUser?.phone || currentUser?.email}`}
                isCompleted={true} isActive={activeStep === 1}
                onEdit={() => setActiveStep(1)}
              />
              <AnimatePresence>
                {activeStep === 1 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-6 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-primary">{currentUser?.name}</p>
                        <p className="text-xs text-text-dim">{currentUser?.email}</p>
                      </div>
                      <button onClick={() => setActiveStep(2)} className="bg-[#fb641b] text-white px-8 py-2.5 rounded-sm text-xs font-bold uppercase shadow-md hover:bg-[#e65a16] transition-all">
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 2: Delivery Address */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <StepHeader
                num="2" title="Delivery Address"
                subtitle={formData.address ? `${formData.name}, ${formData.address.slice(0, 35)}...` : ''}
                isCompleted={activeStep > 2} isActive={activeStep === 2}
                onEdit={() => setActiveStep(2)}
              />
              <AnimatePresence>
                {activeStep === 2 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="p-8 bg-[#fafafa]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        {[
                          { name: 'name', placeholder: 'Full Name', type: 'text', col: 1 },
                          { name: 'phone', placeholder: '10-digit mobile number', type: 'tel', col: 1 },
                          { name: 'pincode', placeholder: 'Pincode', type: 'text', col: 1 },
                          { name: 'locality', placeholder: 'Locality / Town', type: 'text', col: 1 },
                        ].map(field => (
                          <div key={field.name} className="space-y-1">
                            <input
                              type={field.type}
                              name={field.name}
                              placeholder={field.placeholder}
                              className={`w-full bg-white border ${errors[field.name] ? 'border-red-400' : 'border-black/15'} px-4 py-3 text-sm focus:outline-none focus:border-[#2874f0] transition-colors`}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                            />
                            {errors[field.name] && <p className="text-red-500 text-[10px] pl-1">{errors[field.name]}</p>}
                          </div>
                        ))}

                        <div className="md:col-span-2 space-y-1">
                          <textarea
                            name="address"
                            placeholder="Address (House No., Building, Street, Area)"
                            className={`w-full bg-white border ${errors.address ? 'border-red-400' : 'border-black/15'} px-4 py-3 text-sm focus:outline-none focus:border-[#2874f0] h-24 resize-none transition-colors`}
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                          {errors.address && <p className="text-red-500 text-[10px] pl-1">{errors.address}</p>}
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text" name="city" placeholder="City / District / Town"
                            className={`w-full bg-white border ${errors.city ? 'border-red-400' : 'border-black/15'} px-4 py-3 text-sm focus:outline-none focus:border-[#2874f0] transition-colors`}
                            value={formData.city} onChange={handleInputChange}
                          />
                          {errors.city && <p className="text-red-500 text-[10px] pl-1">{errors.city}</p>}
                        </div>

                        <div className="space-y-1">
                          <select
                            name="state"
                            className={`w-full bg-white border ${errors.state ? 'border-red-400' : 'border-black/15'} px-4 py-3 text-sm focus:outline-none focus:border-[#2874f0] transition-colors`}
                            value={formData.state} onChange={handleInputChange}
                          >
                            <option value="">-- Select State --</option>
                            {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {errors.state && <p className="text-red-500 text-[10px] pl-1">{errors.state}</p>}
                        </div>

                        <div>
                          <input
                            type="text" name="landmark" placeholder="Landmark (Optional)"
                            className="w-full bg-white border border-black/15 px-4 py-3 text-sm focus:outline-none focus:border-[#2874f0] transition-colors"
                            value={formData.landmark} onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <input
                            type="tel" name="alternatePhone" placeholder="Alternate Phone (Optional)"
                            className="w-full bg-white border border-black/15 px-4 py-3 text-sm focus:outline-none focus:border-[#2874f0] transition-colors"
                            value={formData.alternatePhone} onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button
                          type="button"
                          onClick={handleProceedToPayment}
                          className="bg-[#fb641b] text-white px-12 py-3.5 rounded-sm font-bold uppercase shadow-lg hover:bg-[#e65a16] transition-all text-sm"
                        >
                          Save and Deliver Here
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/cart')}
                          className="px-6 py-3.5 text-[#2874f0] font-bold uppercase text-sm hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 3: Order Summary */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <StepHeader
                num="3" title="Order Summary"
                subtitle={`${cart.length} Item${cart.length !== 1 ? 's' : ''}`}
                isCompleted={activeStep > 3} isActive={activeStep === 3}
                onEdit={() => setActiveStep(3)}
              />
              <AnimatePresence>
                {activeStep === 3 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="divide-y divide-black/5">
                      {cart.map((item, i) => (
                        <div key={i} className="p-6 flex gap-4 items-center hover:bg-surface/10 transition-colors">
                          <div className="w-20 h-20 border border-black/5 p-1 shrink-0 bg-white">
                            <img src={item.image} className="w-full h-full object-contain" alt={item.name}
                              onError={e => e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100'}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-primary leading-tight">{item.name}</h4>
                            <p className="text-xs text-text-dim mt-0.5">Seller: {item.sellerName || 'KrishiMitra Farmer'}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-base font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                              <span className="text-xs text-text-dim">Qty: {item.quantity} {item.unit}</span>
                            </div>
                          </div>
                          <div className="text-right text-xs text-[#26a541] font-bold shrink-0">
                            <Truck className="w-4 h-4 inline-block mr-1" />
                            {cartTotal > 500 ? 'Free Delivery' : '₹40 delivery'}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-5 bg-white border-t border-black/5 flex justify-between items-center">
                      <p className="text-xs text-text-dim">
                        Confirmation will be sent to <span className="font-bold text-primary">{currentUser?.email}</span>
                      </p>
                      <button
                        onClick={() => setActiveStep(4)}
                        className="bg-[#fb641b] text-white px-10 py-3 rounded-sm font-bold uppercase shadow-md hover:bg-[#e65a16] transition-all text-sm"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 4: Payment */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <StepHeader
                num="4" title="Payment Options"
                isCompleted={activeStep > 4} isActive={activeStep === 4}
              />
              <AnimatePresence>
                {activeStep === 4 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="p-6 space-y-3">
                      {[
                        {
                          id: 'upi', label: 'UPI', sublabel: 'PhonePe, Google Pay, Paytm, BHIM', icon: Smartphone,
                          extra: selectedPayment === 'upi' && (
                            <div className="mt-4 flex gap-3 max-w-sm">
                              <input
                                type="text"
                                placeholder="Enter UPI ID (e.g. name@upi)"
                                className="flex-1 border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:border-[#2874f0]"
                                value={upiId}
                                onChange={e => setUpiId(e.target.value)}
                              />
                              <button
                                onClick={handlePlaceOrder}
                                className="bg-[#fb641b] text-white px-6 py-2.5 rounded-sm font-bold text-sm uppercase shadow-md hover:bg-[#e65a16] transition-all whitespace-nowrap"
                              >
                                Pay ₹{totalAmount.toLocaleString('en-IN')}
                              </button>
                            </div>
                          )
                        },
                        {
                          id: 'card', label: 'Credit / Debit / ATM Card', sublabel: 'Visa, Mastercard, RuPay', icon: CreditCard,
                          extra: selectedPayment === 'card' && (
                            <div className="mt-4 space-y-3 max-w-sm">
                              <input type="text" placeholder="Card Number" maxLength={19}
                                className="w-full border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:border-[#2874f0]"
                                value={cardData.number}
                                onChange={e => setCardData({ ...cardData, number: e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim() })}
                              />
                              <input type="text" placeholder="Name on Card"
                                className="w-full border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:border-[#2874f0]"
                                value={cardData.name}
                                onChange={e => setCardData({ ...cardData, name: e.target.value })}
                              />
                              <div className="flex gap-3">
                                <input type="text" placeholder="MM / YY" maxLength={5}
                                  className="flex-1 border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:border-[#2874f0]"
                                  value={cardData.expiry}
                                  onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                                />
                                <input type="password" placeholder="CVV" maxLength={4}
                                  className="w-24 border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:border-[#2874f0]"
                                  value={cardData.cvv}
                                  onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                                />
                              </div>
                              <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-bold uppercase shadow-md hover:bg-[#e65a16] transition-all"
                              >
                                Pay ₹{totalAmount.toLocaleString('en-IN')}
                              </button>
                            </div>
                          )
                        },
                        {
                          id: 'wallet', label: 'Wallets', sublabel: 'Paytm, MobiKwik, Amazon Pay', icon: Wallet,
                          extra: selectedPayment === 'wallet' && (
                            <div className="mt-4">
                              <button onClick={handlePlaceOrder} className="bg-[#fb641b] text-white px-10 py-3 rounded-sm font-bold uppercase shadow-md hover:bg-[#e65a16] transition-all text-sm">
                                Pay ₹{totalAmount.toLocaleString('en-IN')}
                              </button>
                            </div>
                          )
                        },
                        {
                          id: 'cod', label: 'Cash on Delivery', sublabel: 'Pay when your order arrives', icon: Package,
                          extra: selectedPayment === 'cod' && (
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center gap-2 text-xs text-text-dim bg-amber-50 border border-amber-200 px-4 py-3 rounded">
                                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                                <span>Please keep exact change ready. Our delivery partner cannot provide change for large bills.</span>
                              </div>
                              <button
                                onClick={handlePlaceOrder}
                                className="bg-[#fb641b] text-white px-10 py-3 rounded-sm font-bold uppercase shadow-md hover:bg-[#e65a16] transition-all text-sm"
                              >
                                Place Order · ₹{totalAmount.toLocaleString('en-IN')}
                              </button>
                            </div>
                          )
                        },
                      ].map(method => (
                        <label
                          key={method.id}
                          className={`block p-5 border rounded cursor-pointer transition-all ${selectedPayment === method.id ? 'border-[#2874f0] bg-blue-50/30' : 'border-black/10 hover:border-black/20 bg-white'}`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio" name="payment"
                              className="w-4 h-4 accent-[#2874f0]"
                              checked={selectedPayment === method.id}
                              onChange={() => setSelectedPayment(method.id)}
                            />
                            <method.icon className={`w-5 h-5 ${selectedPayment === method.id ? 'text-[#2874f0]' : 'text-text-dim'}`} />
                            <div>
                              <p className="text-sm font-bold text-primary">{method.label}</p>
                              <p className="text-xs text-text-dim">{method.sublabel}</p>
                            </div>
                          </div>
                          {method.extra}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right: Price Summary (sticky) ── */}
          <div className="w-full lg:w-[360px] space-y-3">
            <div className="bg-white shadow-sm rounded-sm overflow-hidden sticky top-28">
              <div className="px-6 py-4 border-b border-black/5">
                <h3 className="text-sm font-bold text-text-dim uppercase tracking-wider">Price Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-dim">Price ({cart.length} items)</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-dim">Discount</span>
                  <span className="text-[#26a541] font-bold">- ₹{discount}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-dashed border-black/10 pb-4">
                  <span className="text-text-dim">Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? 'text-[#26a541] font-bold' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-b border-dashed border-black/10 pb-4">
                  <span>Total Payable</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                {deliveryCharge === 0 && (
                  <p className="text-[#26a541] text-sm font-bold">
                    🎉 You get FREE delivery on this order!
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 px-6 pb-5 text-text-dim">
                <ShieldCheck className="w-6 h-6 opacity-30 shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-wide opacity-50 leading-tight">
                  Safe &amp; Secure Payments. Easy Returns. 100% Authentic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
