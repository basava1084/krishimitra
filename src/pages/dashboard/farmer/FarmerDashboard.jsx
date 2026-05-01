import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Sprout,
  Users,
  IndianRupee,
  Package,
  AlertTriangle,
  Star,
  Zap
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../context/OrderContext';
import { useProducts } from '../../../context/ProductContext';
import Table from '../../../components/Table';
import AddProductForm from '../../../components/AddProductForm';
import { X } from 'lucide-react';

const FarmerDashboard = () => {
  const { currentUser } = useAuth();
  const { getFarmerOrders, updateOrderStatus } = useOrders();
  const { products } = useProducts();
  const [showAddModal, setShowAddModal] = useState(false);

  const myOrders = useMemo(() => getFarmerOrders(currentUser?.id), [currentUser, getFarmerOrders]);
  const myProducts = useMemo(() => products.filter(p => p.createdBy === currentUser?.id), [currentUser, products]);

  // Insight Logic
  const totalSales = useMemo(() => myOrders.reduce((acc, o) => acc + o.totalAmount, 0), [myOrders]);
  
  const topSellingProduct = useMemo(() => {
    if (myOrders.length === 0) return null;
    const counts = {};
    myOrders.forEach(o => {
      o.items.forEach(item => {
        if (item.farmerId === currentUser.id) {
          counts[item.name] = (counts[item.name] || 0) + item.quantity;
        }
      });
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? sorted[0][0] : 'N/A';
  }, [myOrders, currentUser.id]);

  const lowStockAlerts = useMemo(() => myProducts.filter(p => p.stock < 20), [myProducts]);

  const stats = [
    { label: "Total Revenue", value: `₹${totalSales}`, icon: IndianRupee, color: "text-green-600", bg: "bg-green-50" },
    { label: "Top Product", value: topSellingProduct || 'No Sales', icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Low Stock Items", value: lowStockAlerts.length, icon: AlertTriangle, color: lowStockAlerts.length > 0 ? "text-red-600" : "text-gray-400", bg: lowStockAlerts.length > 0 ? "bg-red-50" : "bg-gray-50" },
    { label: "Active Listings", value: myProducts.length, icon: Sprout, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const handleStatusUpdate = (orderId, currentStatus) => {
    const nextStatusMap = {
      'placed': 'accepted',
      'accepted': 'packed',
      'packed': 'out_for_delivery',
      'out_for_delivery': 'delivered'
    };
    const nextStatus = nextStatusMap[currentStatus];
    if (nextStatus) updateOrderStatus(orderId, nextStatus);
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 rounded-3xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary">
                    <Sprout className="w-10 h-10" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Business Insights Dashboard</p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Welcome back, {currentUser?.name}</h1>
                    <p className="text-sm text-gray-500 font-medium">Managing <span className="text-gray-900 font-bold">{currentUser?.farmDetails?.location}</span> • {currentUser?.farmDetails?.experience} Years Experience</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <Link to="/farmer/products" className="btn-secondary h-12 px-8 rounded-xl shadow-sm uppercase text-xs font-black tracking-widest">Manage Inventory</Link>
                 <button 
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary h-12 px-8 rounded-xl shadow-lg shadow-primary/20 uppercase text-xs font-black tracking-widest flex items-center gap-2"
                 >
                    <Zap className="w-4 h-4" /> Quick Add Harvest
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Real-time Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((s, i) => (
             <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:border-primary/20 transition-all hover:shadow-md">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}>
                   <s.icon className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</h3>
                   <p className="text-xl font-black text-gray-900 tracking-tight truncate max-w-[120px]">{s.value}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
              <Table 
                title="Incoming Order Fulfillment" 
                headers={['Order ID', 'Summary', 'Total', 'Status', 'Action']}
              >
                {myOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-6 font-black text-gray-900 uppercase tracking-tighter">{order.id}</td>
                    <td className="px-6 py-6">
                      <p className="text-xs text-gray-500 font-bold truncate max-w-[200px] italic">
                         {order.items.filter(i => i.farmerId === currentUser.id).map(i => `${i.name}`).join(', ')}
                      </p>
                    </td>
                    <td className="px-6 py-6 font-black text-gray-900 tracking-tighter">₹{order.totalAmount}</td>
                    <td className="px-6 py-6">
                       <span className={`badge ${
                         order.status === 'delivered' ? 'bg-green-100 text-green-700 border-green-200' : 
                         order.status === 'placed' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                         'bg-blue-100 text-blue-700 border-blue-200'
                       }`}>
                          {order.status}
                       </span>
                    </td>
                    <td className="px-6 py-6">
                       {order.status !== 'delivered' && (
                         <button 
                          onClick={() => handleStatusUpdate(order.id, order.status)}
                          className="text-[10px] font-black text-primary uppercase border border-primary/20 px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-all shadow-sm"
                         >
                            Ship Next
                         </button>
                       )}
                    </td>
                  </tr>
                ))}
                {myOrders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center text-gray-300 italic font-bold">Waiting for your first harvest order.</td>
                  </tr>
                )}
              </Table>
           </div>

           <div className="space-y-8">
              {/* Critical Alerts Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
                 <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Inventory Health</h3>
                    <AlertTriangle className={`w-4 h-4 ${lowStockAlerts.length > 0 ? 'text-red-500 animate-pulse' : 'text-gray-200'}`} />
                 </div>
                 <div className="space-y-4">
                    {myProducts.map(p => (
                       <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-primary/10 transition-all">
                          <div>
                             <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{p.name}</p>
                             <p className={`text-[10px] font-black uppercase tracking-widest ${p.stock < 20 ? 'text-red-500' : 'text-gray-400'}`}>
                                {p.stock} {p.unit} in hand
                             </p>
                          </div>
                          {p.stock < 20 && (
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          )}
                       </div>
                    ))}
                 </div>
                 {lowStockAlerts.length > 0 && (
                   <button className="w-full py-3 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                      Update Low Stock Items
                   </button>
                 )}
              </div>

              {/* Performance Stats */}
              <div className="bg-primary p-8 rounded-2xl text-white space-y-6 shadow-xl shadow-primary/20 relative overflow-hidden">
                 <div className="relative z-10 space-y-2">
                    <p className="text-[10px] font-black text-primary-100 uppercase tracking-widest">Global Visibility</p>
                    <div className="flex items-center gap-2">
                       <Star className="w-6 h-6 fill-white text-white" />
                       <span className="text-4xl font-black tracking-tighter">4.9</span>
                    </div>
                    <p className="text-xs font-medium text-primary-100 leading-relaxed">
                       You are among the <span className="font-bold text-white">Top 5%</span> of producers in your region. Keep up the fresh harvest!
                    </p>
                 </div>
                 <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
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
                    <h2 className="text-xl font-black uppercase tracking-tight">New Harvest Listing</h2>
                    <p className="text-xs text-primary-100 font-bold uppercase tracking-widest opacity-80">Add your fresh products to the marketplace</p>
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

export default FarmerDashboard;
