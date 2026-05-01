import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  MapPin, 
  Heart, 
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Star,
  Search,
  Sprout,
  RefreshCw,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../context/OrderContext';
import { useCart } from '../../../context/CartContext';
import Table from '../../../components/Table';
import AddProductForm from '../../../components/AddProductForm';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const { getCustomerOrders } = useOrders();
  const { reorderItems } = useCart();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const myOrders = useMemo(() => getCustomerOrders(currentUser?.id), [currentUser, getCustomerOrders]);
  const activeOrder = useMemo(() => myOrders.find(o => o.status !== 'delivered'), [myOrders]);
  const totalSpent = useMemo(() => myOrders.reduce((acc, o) => acc + o.totalAmount, 0), [myOrders]);

  const handleReorder = (order) => {
    reorderItems(order.items);
    navigate('/cart');
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 overflow-hidden relative shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="space-y-6 text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`} alt={currentUser?.name} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-primary uppercase tracking-widest">Premium Agri Member</p>
                       <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase">Hello, {currentUser?.name.split(' ')[0]}!</h1>
                    </div>
                 </div>
                 <p className="text-gray-500 font-medium max-w-md mx-auto md:mx-0 leading-relaxed">
                   Currently tracking <span className="text-primary font-black underline decoration-primary/20 decoration-4 underline-offset-4">{myOrders.length} local harvest orders</span>.
                 </p>
                 <div className="flex gap-4 justify-center md:justify-start pt-2">
                    <Link to="/products" className="btn-primary py-4 px-10 rounded-xl shadow-xl shadow-primary/20 text-sm font-black uppercase tracking-widest">
                       Explore Harvest <Search className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="btn-secondary py-4 px-10 rounded-xl shadow-sm text-sm font-black uppercase tracking-widest flex items-center gap-2"
                    >
                       List Item <Plus className="w-4 h-4" />
                    </button>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
                 <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center space-y-2 group hover:bg-white transition-all hover:shadow-xl">
                    <p className="text-4xl font-black text-gray-900 tracking-tighter">{myOrders.filter(o => o.status !== 'delivered').length}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Orders</p>
                 </div>
                 <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center space-y-2 group hover:bg-white transition-all hover:shadow-xl">
                    <p className="text-4xl font-black text-gray-900 tracking-tighter">₹{totalSpent}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Impact</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-12">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden p-10 space-y-12">
                 <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Real-time Harvest Tracker</h3>
                    {activeOrder && <span className="text-[10px] font-black text-primary bg-primary/10 px-4 py-1.5 rounded-full uppercase tracking-widest">Order #{activeOrder.id}</span>}
                 </div>
                 
                 {activeOrder ? (
                   <div className="relative pt-6">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-50 -translate-y-1/2 -z-10 rounded-full"></div>
                      <div className={`absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 -z-10 rounded-full shadow-sm transition-all duration-1000 ${
                        activeOrder.status === 'placed' ? 'w-1/4' : 
                        activeOrder.status === 'accepted' ? 'w-1/2' :
                        activeOrder.status === 'packed' ? 'w-2/3' :
                        activeOrder.status === 'out_for_delivery' ? 'w-[90%]' : 'w-full'
                      }`}></div>
                      
                      <div className="flex justify-between relative z-10">
                        {[
                          { label: 'Placed', icon: CheckCircle2, active: true },
                          { label: 'Accepted', icon: Sprout, active: ['accepted', 'packed', 'out_for_delivery', 'delivered'].includes(activeOrder.status) },
                          { label: 'En Route', icon: Truck, active: ['out_for_delivery', 'delivered'].includes(activeOrder.status) },
                          { label: 'Delivered', icon: Package, active: activeOrder.status === 'delivered' }
                        ].map((step, i) => (
                          <div key={i} className="flex flex-col items-center gap-4">
                             <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${step.active ? 'bg-primary border-primary shadow-xl shadow-primary/30 text-white scale-110' : 'bg-white border-gray-50 text-gray-200 shadow-inner'}`}>
                                <step.icon className="w-6 h-6" />
                             </div>
                             <span className={`text-[10px] font-black uppercase tracking-tighter ${step.active ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                 ) : (
                   <div className="py-20 text-center space-y-6">
                      <ShoppingBag className="w-16 h-16 text-gray-100 mx-auto" />
                      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No active orders to track.</p>
                      <Link to="/products" className="text-sm font-black text-primary hover:underline underline-offset-8 uppercase">Start shopping fresh harvest</Link>
                   </div>
                 )}
              </div>

              <Table 
                title="Your Harvest History" 
                headers={['Order ID', 'Date', 'Amount', 'Status', 'Actions']}
              >
                {myOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-6 font-black text-gray-900 uppercase tracking-tighter">{o.id}</td>
                    <td className="px-6 py-6 text-gray-500 font-bold text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-6 font-black text-gray-900 tracking-tighter">₹{o.totalAmount}</td>
                    <td className="px-6 py-6">
                       <span className={`badge ${o.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {o.status}
                       </span>
                    </td>
                    <td className="px-6 py-6">
                       <button 
                        onClick={() => handleReorder(o)}
                        className="flex items-center gap-2 text-[10px] font-black text-primary uppercase border border-primary/20 px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-all shadow-sm"
                       >
                          <RefreshCw className="w-3 h-3" /> Reorder
                       </button>
                    </td>
                  </tr>
                ))}
                {myOrders.length === 0 && (
                   <tr>
                     <td colSpan="5" className="px-6 py-16 text-center text-gray-300 italic font-bold">You haven't supported any farmers yet.</td>
                   </tr>
                )}
              </Table>
           </div>

           <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-8">
                 <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">Personal Fresh Tools</h3>
                 <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-gray-50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
                       <div className="flex items-center gap-4">
                          <MapPin className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                          <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 uppercase tracking-tight">Saved Addresses</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary" />
                    </button>
                    <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-gray-50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
                       <div className="flex items-center gap-4">
                          <Heart className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                          <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 uppercase tracking-tight">Favorite Farms</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
           <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">List Your Product</h2>
                    <p className="text-xs text-primary-100 font-bold uppercase tracking-widest opacity-80">Sell directly to other community members</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-10 max-h-[80vh] overflow-y-auto">
                 <AddProductForm onSuccess={() => setShowAddModal(false)} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
