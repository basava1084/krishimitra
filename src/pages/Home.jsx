import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Users, Sprout } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

// Category Images
import VegCatImg from '../assets/images/vegetables-category.png';
import FruitCatImg from '../assets/images/fruits-category.png';
import DairyCatImg from '../assets/images/dairy-category.png';
import GrainCatImg from '../assets/images/grains-category.png';
import FarmerHeroImg from '../assets/images/farmer-hero.png';

const categories = [
  { name: 'Vegetables', slug: 'Vegetables', count: 120, image: VegCatImg },
  { name: 'Fruits', slug: 'Fruits', count: 85, image: FruitCatImg },
  { name: 'Dairy', slug: 'Dairy', count: 45, image: DairyCatImg },
  { name: 'Grains', slug: 'Grains', count: 60, image: GrainCatImg },
];

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left duration-700">
              <span className="inline-block bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Connecting Farmers Directly to You
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                Fresh From <br /> 
                <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-4">Local Fields</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Skip the middleman. Access 100% natural, seasonal produce harvested by verified local farmers and delivered within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products" className="btn-primary py-4 px-10 text-base shadow-xl shadow-primary/20">
                  Shop Today's Harvest <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/register" state={{ defaultRole: 'farmer' }} className="btn-secondary py-4 px-10 text-base shadow-sm">
                  Join as a Farmer
                </Link>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={FarmerHeroImg} alt="Farmer with fresh harvest" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Browse Categories</h2>
            <p className="text-gray-500 mt-1 font-medium">Naturally grown local produce</p>
          </div>
          <Link to="/products" className="text-sm font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Harvest */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Today's Featured Harvest</h2>
          <p className="text-gray-500 mt-1 font-medium">Handpicked items at peak freshness</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center space-y-6">
               <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 tracking-tight">Verified Farmers</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Every farmer on our platform is physically verified for quality and sustainable practices.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center space-y-6">
               <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 tracking-tight">Direct Farm-to-Door</h3>
               <p className="text-gray-500 text-sm leading-relaxed">No warehouses. Your order is picked from the farm and delivered directly to your kitchen.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center space-y-6">
               <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 tracking-tight">Fair Price Promise</h3>
               <p className="text-gray-500 text-sm leading-relaxed">By eliminating middlemen, we ensure farmers earn more while you pay less for better quality.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
