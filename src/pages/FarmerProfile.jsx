import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Sprout, Star, ArrowLeft, ShieldCheck, Mail, Phone, MessageCircle, Calendar, Quote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const FarmerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useAuth();
  const { products } = useProducts();

  const farmer = useMemo(() => {
    return users.find(u => u.id === id);
  }, [id, users]);

  const farmerProducts = useMemo(() => {
    return products.filter(p => p.farmerId === id);
  }, [id, products]);

  if (!farmer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black text-gray-900 uppercase">Farmer not found</h2>
        <button onClick={() => navigate('/farmers')} className="btn-secondary">Back to Farmers</button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 overflow-hidden relative shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <button 
            onClick={() => navigate('/farmers')} 
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Discover
          </button>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl shrink-0">
               <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`} 
                alt={farmer.name} 
                className="w-full h-full object-cover bg-primary/5"
               />
            </div>
            
            <div className="flex-1 space-y-8 text-center lg:text-left">
               <div className="space-y-3">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="badge bg-primary/10 text-primary">{farmer.farmDetails?.farmingType || 'Organic'} Partner</span>
                    <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">
                       <ShieldCheck className="w-3.5 h-3.5" /> Verified Harvest
                    </div>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight uppercase">{farmer.name}</h1>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                     <p className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <MapPin className="w-4 h-4 text-primary" /> {farmer.farmDetails?.location || 'Local Farm, India'}
                     </p>
                     <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                     <p className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <Calendar className="w-4 h-4 text-primary" /> {farmer.farmDetails?.experience || '5'}+ Years Experience
                     </p>
                  </div>
               </div>

               {/* Transparency Card Section */}
               <div className="bg-primary/5 border border-primary/10 p-8 rounded-2xl relative max-w-3xl">
                  <Quote className="absolute top-4 right-6 w-10 h-10 text-primary opacity-10" />
                  <p className="text-sm font-medium text-gray-600 italic leading-relaxed relative z-10">
                     "{farmer.farmDetails?.description || "I believe in providing fresh, chemical-free produce directly from my farm to your kitchen. Every harvest is handled with care and traditional wisdom."}"
                  </p>
               </div>

               <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="btn-primary h-14 px-10 rounded-xl shadow-xl shadow-primary/20 text-sm font-black uppercase tracking-widest">
                     <MessageCircle className="w-5 h-5" /> Chat with Farmer
                  </button>
                  <div className="flex gap-2">
                     <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors cursor-pointer shadow-sm">
                        <Mail className="w-5 h-5" />
                     </div>
                     <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors cursor-pointer shadow-sm">
                        <Phone className="w-5 h-5" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 w-full lg:w-48">
               <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-1 shadow-sm">
                  <p className="text-3xl font-black text-gray-900 tracking-tighter">{farmerProducts.length}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Listings</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-1 shadow-sm">
                  <div className="flex items-center justify-center gap-1 text-yellow-500">
                     <Star className="w-4 h-4 fill-current" />
                     <p className="text-3xl font-black text-gray-900 tracking-tighter">4.9</p>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Community Score</p>
               </div>
            </div>
          </div>
        </div>
        <Sprout className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5 text-primary rotate-12" />
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Current Farm Harvest</h2>
            <p className="text-gray-500 mt-2 font-medium italic">Hand-picked fresh items from {farmer.name.split(' ')[0]}'s fields</p>
          </div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
             Showing {farmerProducts.length} Items
          </div>
        </div>

        {farmerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {farmerProducts.map((p) => (
              <ProductCard key={p.id} {...p} farmer={farmer.name} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
             <Sprout className="w-16 h-16 text-gray-100 mx-auto mb-6" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No harvests listed currently.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;
