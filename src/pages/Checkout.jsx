import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ShoppingBag,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { reduceStock } = useProducts();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: '',
    zip: '',
    paymentMethod: 'cod'
  });

  const handlePlaceOrder = () => {
    // 1. Create the order object according to global model
    const orderItems = cart.map(item => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      farmerId: item.farmerId || 'F-101' // Fallback for consistency
    }));

    const orderData = {
      customerId: currentUser.id,
      items: orderItems,
      totalAmount: subtotal,
      deliveryAddress: `${formData.address}, ${formData.city} - ${formData.zip}`,
      deliverySlot: 'Morning (8 AM - 12 PM)',
    };

    // 2. Place order in context
    placeOrder(orderData);

    // 3. Reduce stock for each product
    cart.forEach(item => {
      reduceStock(item.id, item.quantity);
    });

    setIsSuccess(true);
    
    setTimeout(() => {
      clearCart();
      navigate('/customer/dashboard');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center py-20 px-4 animate-in fade-in duration-500">
         <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 mb-10 scale-110">
            <CheckCircle2 className="w-12 h-12 text-white animate-pulse" />
         </div>
         <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">Harvest Ordered!</h2>
         <p className="text-gray-500 font-medium mb-10 text-center max-w-sm leading-relaxed">Thank you, {currentUser?.name}. Your order has been placed and stock has been reserved.</p>
         <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-6 py-3 rounded-full">
            <Truck className="w-4 h-4 animate-bounce" /> Shipping to Your Location
         </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Basket
        </button>

        <div className="grid lg:grid-cols-3 gap-16">
           <div className="lg:col-span-2 space-y-12">
              <div className="flex justify-between relative">
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10"></div>
                 <div className={`absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-500 ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`}></div>
                 {[
                   { s: 1, l: 'Shipping', icon: MapPin },
                   { s: 2, l: 'Payment', icon: CreditCard },
                   { s: 3, l: 'Review', icon: ShoppingBag }
                 ].map((item) => (
                   <div key={item.s} className="flex flex-col items-center gap-3 bg-background px-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step >= item.s ? 'bg-primary text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-300'}`}>
                         <item.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${step >= item.s ? 'text-gray-900' : 'text-gray-300'}`}>{item.l}</span>
                   </div>
                 ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
                 {step === 1 && (
                    <div className="space-y-8">
                       <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Delivery Details</h2>
                       <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5 sm:col-span-2">
                             <label className="label-text">Full Name</label>
                             <input type="text" className="input-field" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                             <label className="label-text">Delivery Address</label>
                             <textarea className="input-field h-24" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                          </div>
                          <div className="space-y-1.5">
                             <label className="label-text">City</label>
                             <input type="text" className="input-field" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                          </div>
                          <div className="space-y-1.5">
                             <label className="label-text">ZIP Code</label>
                             <input type="text" className="input-field" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
                          </div>
                       </div>
                       <button onClick={() => setStep(2)} className="btn-primary w-full py-5 rounded-xl uppercase tracking-widest font-black">
                          Continue to Payment <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                 )}

                 {step === 2 && (
                    <div className="space-y-10">
                       <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Payment Method</h2>
                       <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                                <Truck className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="font-black text-gray-900 uppercase text-sm tracking-tight">Cash on Delivery</p>
                                <p className="text-xs text-gray-500 font-medium">Safe & contactless delivery payment</p>
                             </div>
                          </div>
                          <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                             <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-5 rounded-xl uppercase tracking-widest">Back</button>
                          <button onClick={() => setStep(3)} className="btn-primary flex-[2] py-5 rounded-xl uppercase tracking-widest">Review Order</button>
                       </div>
                    </div>
                 )}

                 {step === 3 && (
                    <div className="space-y-10">
                       <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Final Review</h2>
                       <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                          <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                             <MapPin className="text-primary w-5 h-5" />
                             <p className="text-sm font-bold text-gray-700">{formData.address}, {formData.city}</p>
                          </div>
                          <div className="flex items-center gap-4">
                             <ShieldCheck className="text-primary w-5 h-5" />
                             <p className="text-sm font-bold text-gray-700">Guaranteed Fresh Delivery within 24h</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <button onClick={() => setStep(2)} className="btn-secondary flex-1 py-5 rounded-xl uppercase tracking-widest">Back</button>
                          <button onClick={handlePlaceOrder} className="btn-primary flex-[2] py-5 rounded-xl uppercase tracking-widest font-black">
                             Place Order Now
                          </button>
                       </div>
                    </div>
                 )}
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-8 sticky top-28">
                 <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">Order Breakdown</h3>
                 <div className="max-h-[300px] overflow-y-auto space-y-6">
                    {cart.map((item) => (
                       <div key={item.id} className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.quantity} {item.unit} x ₹{item.price}</p>
                          </div>
                          <p className="font-black text-gray-900 text-sm">₹{item.price * item.quantity}</p>
                       </div>
                    ))}
                 </div>
                 <div className="pt-8 border-t border-gray-50 flex justify-between items-end">
                    <span className="text-base font-black text-gray-900 uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-primary tracking-tighter">₹{subtotal}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
