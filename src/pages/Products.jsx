import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ChevronDown, SlidersHorizontal, LayoutGrid, List, MapPin } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Others'];
const MOCK_USER_LOCATION = 'Kolar, KA'; // Mock location for sorting logic

const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('local'); // Default to local-first

  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const organicOnly = searchParams.get('organic') === 'true';

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchOrganic = !organicOnly || p.farmingType === 'Organic';
      return matchCat && matchSearch && matchOrganic && p.stock > 0;
    });

    // Sorting Logic
    if (sortBy === 'local') {
      result.sort((a, b) => {
        const aLocal = a.location.includes(MOCK_USER_LOCATION);
        const bLocal = b.location.includes(MOCK_USER_LOCATION);
        if (aLocal && !bLocal) return -1;
        if (!aLocal && bLocal) return 1;
        return 0;
      });
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, searchQuery, organicOnly, sortBy]);

  const updateFilters = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...current, ...newParams });
  };

  const clearFilters = () => {
    setSearchParams({});
    setSortBy('local');
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          <aside className="hidden lg:block w-64 space-y-10">
             <div>
                <h3 className="label-text mb-6 border-b border-gray-100 pb-2">Categories</h3>
                <div className="space-y-2">
                   {categories.map(cat => (
                     <button 
                      key={cat}
                      onClick={() => updateFilters({ category: cat })}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                     >
                        {cat}
                     </button>
                   ))}
                </div>
             </div>

             <div>
                <h3 className="label-text mb-6 border-b border-gray-100 pb-2">Farming Method</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative">
                      <input 
                        type="checkbox" 
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-primary checked:border-primary transition-all"
                        checked={organicOnly}
                        onChange={(e) => updateFilters({ organic: e.target.checked })}
                      />
                      <svg className="absolute top-1 left-1 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                   </div>
                   <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">100% Organic Only</span>
                </label>
             </div>

             <div className="pt-6 border-t border-gray-100">
                <button onClick={clearFilters} className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1 hover:underline">
                   <X className="w-3 h-3" /> Reset Marketplace
                </button>
             </div>
          </aside>

          <main className="flex-1 space-y-8">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div>
                      <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Local Marketplace</h1>
                      <div className="flex items-center gap-2 text-xs font-bold text-primary mt-1">
                         <MapPin className="w-3 h-3" /> Showing results near {MOCK_USER_LOCATION}
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <div className="relative flex-1 md:w-72">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                         <input 
                          type="text" 
                          placeholder="Search for tomatoes, milk..." 
                          className="input-field pl-10"
                          value={searchQuery}
                          onChange={(e) => updateFilters({ search: e.target.value })}
                         />
                      </div>
                      <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2.5 bg-gray-50 text-gray-600 rounded-lg border border-gray-200">
                         <SlidersHorizontal className="w-5 h-5" />
                      </button>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <div className="flex gap-2">
                      <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
                         <LayoutGrid className="w-5 h-5" />
                      </button>
                      <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
                         <List className="w-5 h-5" />
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort By:</span>
                      <select 
                        className="bg-transparent text-xs font-black uppercase text-gray-900 border-none focus:ring-0 cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                         <option value="local">Proximity (Local First)</option>
                         <option value="price-low">Price: Low to High</option>
                         <option value="price-high">Price: High to Low</option>
                      </select>
                   </div>
                </div>
             </div>

             {filteredProducts.length > 0 ? (
               <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} {...p} farmer={p.farmerName} />
                  ))}
               </div>
             ) : (
               <div className="py-24 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                  <Search className="w-12 h-12 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">No harvest found</h3>
                  <button onClick={clearFilters} className="btn-secondary mx-auto mt-8">Reset Filters</button>
               </div>
             )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
