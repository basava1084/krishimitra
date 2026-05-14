import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  MapPin,
  ChevronRight,
  Settings,
  LogOut,
  Star,
  ShieldCheck,
  Bell,
  Search,
  LayoutDashboard,
  User,
  MessageCircle,
  X,
  CreditCard,
  Package,
  Truck,
  RotateCcw,
  Trash2,
  Mail,
  Phone,
  Camera
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../context/OrderContext';

const CustomerDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { orders, cancelOrder } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#f1f3f6] min-h-screen flex font-body text-text-main pt-24">
      
      {/* Standard Flipkart-style Sidebar */}
      <aside className="w-72 flex flex-col fixed h-screen z-[90] pt-28 px-4">
        <div className="bg-white shadow-sm rounded-sm overflow-hidden mb-4 p-4 flex items-center gap-4">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`} className="w-12 h-12 rounded-full bg-surface" alt="Avatar" />
          <div>
            <p className="text-[10px] text-text-dim uppercase tracking-widest font-bold">Hello,</p>
            <p className="text-sm font-bold text-primary truncate max-w-[120px]">{currentUser?.name}</p>
          </div>
        </div>

        <nav className="bg-white shadow-sm rounded-sm overflow-hidden py-2">
           <div className="px-6 py-4 border-b border-black/5 flex items-center gap-4 text-primary opacity-40">
              <User className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Account Settings</span>
           </div>
           
           <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-12 py-3.5 transition-all duration-300 group ${
                    activeTab === item.id 
                      ? 'bg-blue-50/50 text-primary font-bold' 
                      : 'text-text-dim hover:bg-surface hover:text-primary'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-primary' : 'text-primary/40'}`} />
                  <span className="text-[11px] uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
           </div>

           <div className="border-t border-black/5 mt-2 py-2">
              <button
                onClick={logout}
                className="w-full flex items-center gap-4 px-12 py-3.5 text-red-500 hover:bg-red-50 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Logout</span>
              </button>
           </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-8 pt-28">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                {/* Order Search & Filter */}
                <div className="bg-white p-4 shadow-sm rounded-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-2/3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
                    <input 
                      type="text" 
                      placeholder="Search your orders here" 
                      className="w-full bg-white border border-black/10 px-12 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <button className="bg-primary text-white px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-md">Search</button>
                </div>

                <div className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="bg-white p-6 shadow-sm rounded-sm border border-black/5 flex flex-col md:flex-row gap-6 relative group">
                         {/* Product Info */}
                         <div className="flex gap-6 flex-1">
                            <div className="w-20 h-20 bg-surface rounded p-1 shrink-0">
                               <img src={order.items?.[0]?.image || '/images/default-product.png'} className="w-full h-full object-contain" alt="" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-sm font-bold text-primary">{order.items?.[0]?.name || 'KrishiMitra Product'}</h4>
                               <p className="text-[10px] text-text-dim uppercase tracking-widest">Seller: {order.items?.[0]?.sellerName || 'Verified Farmer'}</p>
                               <div className="flex items-center gap-2 mt-4">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                  <span className="text-xs font-bold">Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                               </div>
                            </div>
                         </div>

                         {/* Price */}
                         <div className="md:w-32">
                            <p className="text-sm font-bold text-primary">₹{order.total}</p>
                         </div>

                         {/* Status & Actions */}
                         <div className="md:w-64 space-y-4">
                            <div className="flex items-center gap-1">
                               <Star className="w-4 h-4 text-blue-600" />
                               <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">Rate & Review Product</span>
                            </div>
                            <button 
                              onClick={() => cancelOrder(order.id)}
                              className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 px-3 py-1.5 rounded transition-all"
                            >
                               <Trash2 className="w-3.5 h-3.5" /> Cancel Order
                            </button>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white py-20 text-center space-y-6 shadow-sm rounded-sm">
                      <ShoppingBag className="w-16 h-16 text-primary/10 mx-auto" />
                      <p className="text-sm text-text-dim">You have no orders. Start exploring!</p>
                      <Link to="/products" className="inline-block bg-primary text-white px-12 py-3 rounded-sm font-bold uppercase shadow-md">Marketplace</Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 shadow-sm rounded-sm border border-black/5">
                       <h3 className="text-xl font-display font-bold text-primary uppercase tracking-tight mb-6">Recent Activity</h3>
                       <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-surface/50 rounded-xl">
                             <Truck className="w-5 h-5 text-primary" />
                             <div>
                                <p className="text-xs font-bold">Orders are being processed</p>
                                <p className="text-[10px] text-text-dim uppercase tracking-widest">Checking inventory status</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white p-6 shadow-sm rounded-sm border border-black/5">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Loyalty Points</h4>
                    <div className="text-3xl font-display font-bold text-primary">1,240</div>
                    <p className="text-[10px] text-text-dim uppercase tracking-widest mt-1">Available to redeem</p>
                 </div>
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white shadow-sm rounded-sm overflow-hidden">
                 <div className="px-8 py-6 border-b border-black/5">
                    <h2 className="text-lg font-bold text-primary uppercase">My Wishlist (0)</h2>
                 </div>
                 <div className="py-20 text-center space-y-6">
                    <Heart className="w-16 h-16 text-primary/10 mx-auto" />
                    <p className="text-sm text-text-dim">Your wishlist is empty!</p>
                 </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white shadow-sm rounded-sm overflow-hidden">
                 <div className="px-8 py-6 border-b border-black/5">
                    <h2 className="text-lg font-bold text-primary uppercase">Personal Information</h2>
                 </div>
                 <div className="p-8 space-y-10">
                    <div className="flex items-center gap-8">
                       <div className="relative group">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`} className="w-32 h-32 rounded-2xl bg-surface border border-black/5" alt="" />
                          <button className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                             <Camera className="w-6 h-6" />
                          </button>
                       </div>
                       <div className="space-y-4 flex-1">
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-text-dim uppercase">First Name</label>
                                <input type="text" className="w-full bg-surface border border-black/5 p-3 rounded text-sm" defaultValue={currentUser?.name?.split(' ')[0]} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-text-dim uppercase">Last Name</label>
                                <input type="text" className="w-full bg-surface border border-black/5 p-3 rounded text-sm" defaultValue={currentUser?.name?.split(' ')[1] || ''} />
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-dim uppercase">Email Address</label>
                          <input type="email" className="w-full bg-surface border border-black/5 p-3 rounded text-sm" defaultValue={currentUser?.email} disabled />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-dim uppercase">Mobile Number</label>
                          <input type="tel" className="w-full bg-surface border border-black/5 p-3 rounded text-sm" defaultValue="+91 7411278970" />
                       </div>
                    </div>
                    <button className="bg-primary text-white px-12 py-3 rounded-sm font-bold uppercase tracking-widest text-[10px] shadow-lg">Save Profile</button>
                 </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white shadow-sm rounded-sm overflow-hidden">
                 <div className="px-8 py-6 border-b border-black/5">
                    <h2 className="text-lg font-bold text-primary uppercase">Account Settings</h2>
                 </div>
                 <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
                       <div>
                          <p className="text-sm font-bold">Email Notifications</p>
                          <p className="text-xs text-text-dim">Receive updates about your orders</p>
                       </div>
                       <div className="w-12 h-6 bg-primary rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
                       <div>
                          <p className="text-sm font-bold">SMS Alerts</p>
                          <p className="text-xs text-text-dim">Get real-time tracking via SMS</p>
                       </div>
                       <div className="w-12 h-6 bg-black/10 rounded-full relative">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
