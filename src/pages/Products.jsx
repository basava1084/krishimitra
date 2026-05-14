import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  LayoutGrid, 
  List,
  Star,
  CheckCircle2,
  X
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(2000);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'grains', name: 'Grains & Cereals' },
    { id: 'dairy', name: 'Organic Dairy' },
    { id: 'vegetables', name: 'Fresh Vegetables' },
    { id: 'fruits', name: 'Seasonal Fruits' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category.toLowerCase().includes(activeCategory.toLowerCase());
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = p.price <= priceRange;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // Default newest
      });
  }, [products, activeCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-body selection:bg-primary/5 text-text-main">
      
      {/* Header Section */}
      <section className="bg-surface py-12 border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-text-dim uppercase tracking-widest">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-primary">Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tight">
              Our <span className="text-accent italic font-normal">Marketplace</span>
            </h1>
            <p className="text-sm text-text-dim max-w-xl">
              Browse our collection of fresh, organic produce sourced directly from verified local farms.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 space-y-10">
            {/* Search */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Search</h4>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Find produce..."
                  className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Categories</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/10' 
                        : 'text-text-dim hover:bg-surface hover:text-primary'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {activeCategory === cat.id && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Max Price</h4>
                <span className="text-xs font-bold text-primary">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-primary h-1.5 bg-surface rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text-dim font-bold uppercase tracking-widest">
                <span>₹0</span>
                <span>₹5000</span>
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Min Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2].map((star) => (
                  <button key={star} className="flex items-center gap-2 text-sm text-text-dim hover:text-primary transition-colors">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < star ? 'fill-accent text-accent' : 'text-black/10'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold">& Up</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 bg-surface/50 p-4 rounded-2xl border border-black/[0.03]">
              <p className="text-xs font-bold text-text-dim uppercase tracking-widest">
                Showing <span className="text-primary">{filteredProducts.length}</span> Products
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-black/5">
                  <button className="p-1.5 rounded bg-surface text-primary"><LayoutGrid className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded text-text-dim hover:bg-surface transition-colors"><List className="w-4 h-4" /></button>
                </div>
                
                <select 
                  className="bg-white border border-black/5 rounded-lg px-4 py-2 text-xs font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary/5 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">NEWEST ARRIVALS</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                  <option value="rating">TOP RATED</option>
                </select>

                <button 
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden p-2 bg-primary text-white rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-32 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center text-primary/10">
                  <Search className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-primary">No results found</h3>
                  <p className="text-sm text-text-dim">Try adjusting your filters or search query.</p>
                </div>
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); setPriceRange(5000); }} 
                  className="btn-premium px-8 py-3 uppercase text-[10px] tracking-widest"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-xs bg-white h-full p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-display font-bold text-primary uppercase">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-surface rounded-full transition-colors">
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>
              
              {/* Mobile version of sidebar filters would go here */}
              <div className="space-y-10">
                {/* Simplified for brevity - same content as sidebar */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setShowFilters(false); }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                          activeCategory === cat.id 
                            ? 'bg-primary border-primary text-white shadow-lg' 
                            : 'border-black/5 text-text-dim hover:border-primary/20'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs font-bold text-primary">
                    <span>Up to ₹{priceRange}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest shadow-lg mt-8"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Products;
