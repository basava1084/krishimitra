import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sprout, Star, ChevronRight, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Farmers = () => {
  const { users } = useAuth();
  
  const farmers = useMemo(() => {
    return users.filter(u => u.role === 'farmer');
  }, [users]);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">Discover Our Farmers</h1>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">Meet the hardworking people behind your fresh harvest. Support local agriculture by buying directly from verified producers.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmers.map((farmer) => (
            <Link 
              key={farmer.id} 
              to={`/farmers/${farmer.id}`}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
                  alt={farmer.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 flex items-center gap-1.5 shadow-sm">
                   <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                   <span className="text-[10px] font-black text-gray-900">4.9</span>
                </div>
              </div>
              
              <div className="p-8 space-y-6 flex-grow flex flex-col">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{farmer.farmDetails?.farmingType || 'Organic'} Producer</p>
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors uppercase tracking-tight">{farmer.name}</h3>
                 </div>
                 
                 <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-gray-400" />
                       <span className="text-xs font-bold text-gray-600">{farmer.farmDetails?.location || 'Local Farm'}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                       <Sprout className="w-4 h-4 text-primary" />
                       <span className="text-xs font-bold text-gray-600">Verified</span>
                    </div>
                 </div>

                 <div className="pt-4 mt-auto">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-primary">
                       <span>View Profile</span>
                       <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
              </div>
            </Link>
          ))}
        </div>

        {farmers.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
             <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No farmers registered yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmers;
