import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  ShieldCheck, 
  TrendingUp, 
  ChevronRight, 
  ArrowRight, 
  Users, 
  Zap, 
  Globe,
  Leaf,
  Sparkles,
  ShoppingBag,
  Heart,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  const categories = [
    { id: 1, name: 'Grains & Cereals', icon: Sprout, count: '120+ Items', color: 'bg-emerald-50', image: '/images/cat_grains.png', slug: 'grains' },
    { id: 2, name: 'Organic Dairy', icon: Zap, count: '80+ Items', color: 'bg-amber-50', image: '/images/cat_dairy.png', slug: 'dairy' },
    { id: 3, name: 'Fresh Vegetables', icon: Leaf, count: '200+ Items', color: 'bg-green-50', image: '/images/cat_yields.png', slug: 'vegetables' },
    { id: 4, name: 'Farm Community', icon: Users, count: 'Join Us', color: 'bg-blue-50', image: '/images/cat_community.png', slug: 'community' },
  ];

  const features = [
    { icon: ShieldCheck, title: 'Certified Organic', desc: '100% verified organic standards' },
    { icon: Globe, title: 'Direct Sourcing', desc: 'Direct from farmers to your table' },
    { icon: Award, title: 'Premium Quality', desc: 'Handpicked excellence in every batch' },
    { icon: ShoppingBag, title: 'Secure Trade', desc: 'Transparent and safe transactions' },
  ];

  return (
    <div className="bg-white min-h-screen font-body selection:bg-primary/5 text-text-main">
      
      {/* Hero Section - Standard Professional */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Quality You Can Trust</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight text-primary">
              The Finest <span className="text-accent italic font-normal">Organic</span> <br />
              Produce from Local Farms
            </h1>
            
            <p className="text-base text-text-dim max-w-lg leading-relaxed">
              Experience the true taste of nature. We connect you directly with local farmers to bring fresh, sustainably grown produce straight to your doorstep.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link to="/products" className="btn-premium flex items-center gap-2 px-8 py-4">
                <span>SHOP NOW</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-2 px-6">
                OUR STORY <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black/5">
              {[
                { label: 'Active Farmers', value: '1.2k+' },
                { label: 'Organic Products', value: '2.5k+' },
                { label: 'Happy Customers', value: '10k+' }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-display font-bold text-primary">{stat.value}</p>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest font-bold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square group">
              <img 
                src="/images/hero_premium_agri.png" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Premium Farm" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-black/5 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest">Certified</p>
              </div>
              <p className="text-[10px] text-text-dim leading-relaxed">
                Every product is hand-verified for 100% organic standards.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar - Trust Signals */}
      <section className="py-12 border-y border-black/[0.03] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary tracking-tight">{feature.title}</h3>
                  <p className="text-[11px] text-text-dim mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-4 mb-16">
            <p className="text-[11px] font-black text-accent uppercase tracking-[0.5em]">Explore the Fields</p>
            <h2 className="text-4xl font-display font-bold text-primary uppercase tracking-tight">Our Main <span className="text-accent italic font-normal">Collections</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} {...cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Arrivals */}
      <section className="py-24 bg-surface/50 border-y border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <p className="text-[11px] font-black text-primary-light uppercase tracking-[0.5em]">Fresh from Farm</p>
              <h2 className="text-4xl font-display font-bold text-primary uppercase tracking-tight">Recent <span className="text-accent italic font-normal">Arrivals</span></h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] hover:text-accent transition-all">
              SEE ALL PRODUCTS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Professional Banner */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[2.5rem] bg-primary overflow-hidden p-12 md:p-24 group shadow-2xl">
            <div className="absolute inset-0 bg-[url('/images/hero_premium_agri.png')] bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-[10s]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter leading-[1.1]">
                Join our community <br />
                of <span className="text-accent italic font-normal">Organic Enthusiasts</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                Whether you're a farmer looking to grow your business or a consumer seeking the freshest produce, KrishiMitra is your home for organic excellence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/register" className="bg-white text-primary px-10 py-4 rounded-xl font-display font-bold text-[10px] tracking-[0.3em] hover:bg-accent hover:text-white transition-all shadow-xl">
                  START FOR FREE
                </Link>
                <Link to="/about" className="border border-white/20 text-white px-10 py-4 rounded-xl font-display font-bold text-[10px] tracking-[0.3em] hover:bg-white/10 transition-all">
                  LEARN MORE
                </Link>
              </div>
            </div>

            <div className="absolute top-1/2 right-24 -translate-y-1/2 hidden xl:block pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="w-96 h-96 border-2 border-white/10 rounded-full flex items-center justify-center">
                  <Leaf className="w-24 h-24 text-accent" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

