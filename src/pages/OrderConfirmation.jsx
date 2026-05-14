import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Package, Truck, MapPin, Clock,
  ShoppingBag, ArrowRight, Home, Phone, CreditCard
} from 'lucide-react';

const STEPS = [
  { label: 'Order Placed', icon: CheckCircle2, done: true },
  { label: 'Confirmed', icon: Package, done: true },
  { label: 'Shipped', icon: Truck, done: false },
  { label: 'Out for Delivery', icon: MapPin, done: false },
  { label: 'Delivered', icon: Home, done: false },
];

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!order) {
      navigate('/');
      return;
    }
  }, [order, navigate]);

  if (!order) return null;

  const deliveryDate = new Date(order.estimatedDelivery || Date.now() + 5 * 86400000);
  const deliveryStr = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  const paymentLabel = {
    cod: 'Cash on Delivery',
    upi: 'UPI Payment',
    card: 'Card Payment',
    wallet: 'Wallet Payment'
  }[order.paymentMethod] || 'Online Payment';

  return (
    <div className="bg-[#f1f3f6] min-h-screen pt-28 pb-16 font-body text-text-main">
      <div className="max-w-4xl mx-auto px-4 space-y-4">

        {/* ── Success Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-sm shadow-sm overflow-hidden"
        >
          <div className="bg-[#26a541] px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0"
              >
                <CheckCircle2 className="w-8 h-8 text-[#26a541]" />
              </motion.div>
              <div>
                <h1 className="text-white text-xl font-bold">Order Confirmed!</h1>
                <p className="text-white/80 text-sm mt-0.5">
                  Your order <span className="font-bold text-white">{order.orderId}</span> has been placed successfully.
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/70 text-xs">Estimated Delivery</p>
              <p className="text-white font-bold text-lg">{deliveryStr}</p>
            </div>
          </div>

          {/* Order Tracking Steps */}
          <div className="px-8 py-6">
            <div className="flex items-center justify-between relative">
              {/* progress line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 z-0" />
              <div className="absolute top-4 left-0 w-[20%] h-0.5 bg-[#26a541] z-0" />
              {STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 z-10 w-1/5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${step.done ? 'bg-[#26a541]' : 'bg-gray-200'}`}>
                    <step.icon className={`w-4 h-4 ${step.done ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-[10px] font-bold text-center uppercase tracking-wide ${step.done ? 'text-[#26a541]' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ── Items ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 bg-white rounded-sm shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="font-bold text-primary">Items Ordered</h2>
              <span className="text-xs text-text-dim">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="divide-y divide-black/5">
              {order.items?.map((item, i) => (
                <div key={i} className="p-6 flex gap-4 items-center">
                  <div className="w-16 h-16 border border-black/5 p-1 rounded shrink-0 bg-surface">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" onError={e => e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100'} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-primary text-sm">{item.name}</p>
                    <p className="text-xs text-text-dim">Seller: {item.sellerName || 'KrishiMitra Farmer'}</p>
                    <p className="text-xs text-text-dim mt-0.5">Qty: {item.quantity} {item.unit}</p>
                  </div>
                  <p className="font-bold text-primary text-base">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column ── */}
          <div className="space-y-4">
            {/* Payment Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-sm shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-black/5">
                <h3 className="text-sm font-bold text-text-dim uppercase tracking-wider">Payment Summary</h3>
              </div>
              <div className="p-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-dim">Subtotal</span>
                  <span>₹{order.subtotal?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">Delivery</span>
                  <span className={order.deliveryCharge === 0 ? 'text-[#26a541] font-bold' : ''}>
                    {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-dashed border-black/10 pt-3 mt-3">
                  <span>Total Paid</span>
                  <span>₹{order.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <CreditCard className="w-4 h-4 text-text-dim" />
                  <span className="text-xs text-text-dim">{paymentLabel}</span>
                </div>
              </div>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-sm shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-black/5">
                <h3 className="text-sm font-bold text-text-dim uppercase tracking-wider">Delivery Address</h3>
              </div>
              <div className="p-5 space-y-1 text-sm">
                <p className="font-bold text-primary">{order.shippingAddress?.name}</p>
                <p className="text-text-dim text-xs leading-relaxed">
                  {order.shippingAddress?.address}, {order.shippingAddress?.locality}
                  <br />{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-text-dim">
                  <Phone className="w-3 h-3" />
                  <span>{order.shippingAddress?.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/customer/dashboard"
            className="flex items-center justify-center gap-2 bg-[#fb641b] text-white px-10 py-3.5 rounded-sm font-bold uppercase text-sm shadow-lg hover:bg-[#e65a16] transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            View My Orders
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 border border-primary text-primary px-10 py-3.5 rounded-sm font-bold uppercase text-sm hover:bg-surface transition-all"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
