import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  Package,
  TrendingUp,
  Users,
  Plus,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Bell,
  Search,
  ChevronRight,
  MapPin,
  Clock,
  ShieldCheck,
  Edit2,
  Trash2,
  Eye,
  LogOut,
  MessageCircle,
  X,
  PieChart as PieChartIcon,
  DollarSign,
  ArrowUpRight,
  CreditCard,
  User,
  Camera
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useProducts } from '../../../context/ProductContext';
import { useOrders } from '../../../context/OrderContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate, Link } from 'react-router-dom';
import AddProductForm from '../../../components/AddProductForm';

const FarmerDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { products, deleteProduct } = useProducts();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentUserId = currentUser?.id || currentUser?._id;
  const farmerProducts = (products || []).filter(p => (p.farmerId === currentUserId || p.createdBy === currentUserId));
  
  const filteredProducts = farmerProducts.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const farmerOrders = (orders || []).filter(o => o.items.some(item => item.farmerId === currentUserId));

  const stats = [
    { label: 'Total Sales', value: '₹42,850', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'My Products', value: farmerProducts.length, change: 'Active', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Orders', value: farmerOrders.length, change: 'New', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Quality Rating', value: '4.9', change: '98%', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const chartData = [
    { name: 'Mon', sales: 4000, orders: 12 },
    { name: 'Tue', sales: 3000, orders: 10 },
    { name: 'Wed', sales: 5000, orders: 18 },
    { name: 'Thu', sales: 2780, orders: 8 },
    { name: 'Fri', sales: 1890, orders: 6 },
    { name: 'Sat', sales: 2390, orders: 9 },
    { name: 'Sun', sales: 3490, orders: 14 },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex font-body text-text-main pt-24">
      
      {/* Standard Management Sidebar */}
      <aside className="w-72 bg-white border-r border-black/5 flex flex-col fixed h-screen z-[90] pt-28">
        <div className="p-8 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-primary uppercase tracking-tight">Farmer <span className="text-accent italic font-normal text-sm">Portal</span></h2>
              <p className="text-[10px] text-text-dim uppercase tracking-widest font-bold opacity-40">KrishiMitra Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-4">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'inventory', label: 'My Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'chat', label: 'Community', icon: MessageCircle },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.id === 'chat' ? navigate('/chat') : setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/10' 
                  : 'text-text-dim hover:bg-surface hover:text-primary'
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-primary/40'}`} />
              <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-black/5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-12">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-primary uppercase tracking-tight">
                      Welcome, <span className="text-accent italic font-normal">{currentUser?.name?.split(' ')[0]}</span>
                    </h1>
                    <p className="text-sm text-text-dim mt-1">Here's your farm's performance overview.</p>
                  </div>
                  <button onClick={() => setShowAddForm(true)} className="btn-premium flex items-center gap-2 px-8 py-3.5 shadow-xl">
                    <Plus className="w-4 h-4" /> <span className="text-[10px] tracking-widest">ADD NEW PRODUCT</span>
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.change}</span>
                      </div>
                      <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
                      <p className="text-2xl font-display font-bold text-primary tracking-tight">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">Revenue Analysis</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorSalesFarmer" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1a2f23" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#1a2f23" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000005" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                          <Tooltip />
                          <Area type="monotone" dataKey="sales" stroke="#1a2f23" fillOpacity={1} fill="url(#colorSalesFarmer)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Order Status</h3>
                    <div className="flex items-center justify-center h-48">
                       <PieChartIcon className="w-32 h-32 text-primary/10" />
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-xs">
                          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Delivered</span>
                          <span className="font-bold">85%</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Processing</span>
                          <span className="font-bold">10%</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Cancelled</span>
                          <span className="font-bold">5%</span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inventory' && (
              <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold text-primary uppercase">My Inventory</h2>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
                       <input 
                         type="text" 
                         placeholder="Filter inventory..." 
                         className="bg-white border border-black/5 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                       />
                    </div>
                 </div>
                 <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                    <table className="w-full">
                       <thead>
                          <tr className="bg-[#fcfcfc] border-b border-black/5">
                             <th className="px-8 py-5 text-left text-[10px] font-bold text-text-dim uppercase tracking-widest">Product</th>
                             <th className="px-8 py-5 text-left text-[10px] font-bold text-text-dim uppercase tracking-widest">Price</th>
                             <th className="px-8 py-5 text-left text-[10px] font-bold text-text-dim uppercase tracking-widest">Stock</th>
                             <th className="px-8 py-5 text-right text-[10px] font-bold text-text-dim uppercase tracking-widest">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-black/5">
                          {filteredProducts.map(product => (
                             <tr key={product.id || product._id} className="hover:bg-surface/30 transition-colors">
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-4">
                                      <img src={product.image} className="w-12 h-12 rounded-lg object-cover border border-black/5" />
                                      <div>
                                         <p className="text-sm font-bold text-primary">{product.name}</p>
                                         <p className="text-[10px] text-text-dim uppercase">{product.category}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-8 py-6 font-bold text-primary">₹{product.price}</td>
                                <td className="px-8 py-6">
                                   <span className="text-sm">{product.stock} {product.unit}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <div className="flex items-center justify-end gap-3">
                                      <button className="p-2 text-text-dim hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                                      <button 
                                        onClick={() => deleteProduct(product.id || product._id)}
                                        className="p-2 text-red-400 hover:text-red-600 transition-colors bg-red-50 rounded-lg"
                                        title="Delete Product"
                                      >
                                         <Trash2 className="w-4 h-4" />
                                      </button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-black/5">
                    <h3 className="text-xl font-display font-bold text-primary uppercase">Incoming Orders</h3>
                 </div>
                 <div className="py-20 text-center space-y-6">
                    <ShoppingBag className="w-16 h-16 text-primary/10 mx-auto" />
                    <p className="text-sm text-text-dim">No pending orders at the moment.</p>
                 </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
               <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">Daily Orders</h3>
                        <div className="h-64">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={chartData}>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000005" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} dy={10} />
                                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                 <Tooltip />
                                 <Bar dataKey="orders" fill="#c5a059" radius={[4, 4, 0, 0]} />
                              </BarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                     <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-center items-center text-center space-y-4">
                        <TrendingUp className="w-16 h-16 text-accent animate-bounce" />
                        <h4 className="text-xl font-display font-bold text-primary uppercase">Growth Trend</h4>
                        <p className="text-sm text-text-dim">Your farm is performing 24% better than last month!</p>
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white shadow-sm rounded-2xl overflow-hidden border border-black/5">
                 <div className="px-8 py-6 border-b border-black/5 bg-surface/30">
                    <h2 className="text-lg font-bold text-primary uppercase">Farmer Profile</h2>
                 </div>
                 <div className="p-8 space-y-10">
                    <div className="flex items-center gap-8">
                       <div className="relative group">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`} className="w-32 h-32 rounded-2xl bg-surface border border-black/5" alt="" />
                          <button className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                             <Camera className="w-6 h-6" />
                          </button>
                       </div>
                       <div className="space-y-1">
                          <h3 className="text-2xl font-display font-bold text-primary uppercase">{currentUser?.name}</h3>
                          <p className="text-sm text-text-dim">Verified Farmer since 2024</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Farm Name</label>
                          <input type="text" className="w-full bg-surface border border-black/5 p-4 rounded-xl text-sm" placeholder="e.g. Green Valley Farms" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Contact Number</label>
                          <input type="tel" className="w-full bg-surface border border-black/5 p-4 rounded-xl text-sm" defaultValue="+91 7411278970" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Farm Location</label>
                          <input type="text" className="w-full bg-surface border border-black/5 p-4 rounded-xl text-sm" defaultValue="Mandya, Karnataka" />
                       </div>
                    </div>
                    <button className="btn-premium px-12 py-4 shadow-lg shadow-primary/10">Save Settings</button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Standard Modal for Add Product */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-3xl border border-black/5 shadow-2xl p-10 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-primary uppercase">Add New Product</h2>
                  <p className="text-sm text-text-dim">List your fresh harvest in the marketplace.</p>
                </div>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-surface rounded-full transition-colors">
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto no-scrollbar pr-2">
                <AddProductForm onSuccess={() => {
                   setShowAddForm(false);
                   setActiveTab('inventory');
                }} onClose={() => setShowAddForm(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmerDashboard;
