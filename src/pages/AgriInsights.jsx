import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  ArrowUpRight, 
  Search, 
  Filter, 
  ChevronRight,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowRight,
  Clock,
  Info,
  MapPin,
  Activity,
  Truck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const AgriInsights = () => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const tickerData = [
    { name: 'Wheat', price: '2,450', change: '+1.2%', trend: 'up' },
    { name: 'Basmati Rice', price: '4,800', change: '-0.5%', trend: 'down' },
    { name: 'Cotton', price: '7,200', change: '+2.4%', trend: 'up' },
    { name: 'Soybean', price: '5,100', change: '+0.8%', trend: 'up' },
    { name: 'Mustard', price: '6,400', change: '-1.1%', trend: 'down' },
    { name: 'Onion', price: '1,800', change: '+15.2%', trend: 'up' },
  ];

  const mandiPrices = [
    { market: 'Azadpur Mandi, Delhi', price: '2,460', volume: '120 MT', trend: 'stable' },
    { market: 'Vashi Mandi, Mumbai', price: '2,445', volume: '85 MT', trend: 'up' },
    { market: 'Koyambedu, Chennai', price: '2,475', volume: '45 MT', trend: 'up' },
    { market: 'Yeshwanthpur, Bangalore', price: '2,440', volume: '60 MT', trend: 'down' },
    { market: 'Kolkata Central Mandi', price: '2,485', volume: '30 MT', trend: 'stable' },
  ];

  const chartData = [
    { date: '01 May', price: 2380 },
    { date: '02 May', price: 2395 },
    { date: '03 May', price: 2410 },
    { date: '04 May', price: 2405 },
    { date: '05 May', price: 2420 },
    { date: '06 May', price: 2435 },
    { date: '07 May', price: 2430 },
    { date: '08 May', price: 2445 },
    { date: '09 May', price: 2450 },
    { date: '10 May', price: 2448 },
    { date: '11 May', price: 2455 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-44 pb-24 font-body text-text-main">
      
      {/* Live Ticker Bar */}
      <div className="fixed top-24 left-0 right-0 z-40 bg-[#1a2f23] text-white shadow-2xl h-12 flex items-center border-b border-accent/20">
        <div className="flex animate-marquee whitespace-nowrap items-center">
           {[...tickerData, ...tickerData].map((item, i) => (
             <div key={i} className="flex items-center gap-6 px-10 border-r border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{item.name}</span>
                <span className="text-sm font-bold font-display text-white">₹{item.price}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                   {item.change} {item.trend === 'up' ? '▲' : '▼'}
                </span>
             </div>
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-black/5 pb-12">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
                 <Globe className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
                 <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Global Market Intelligence Portal</span>
              </div>
              <h1 className="text-6xl font-display font-bold text-primary uppercase tracking-tighter leading-none">
                 Agri <span className="text-accent italic font-normal">Insights</span>
              </h1>
              <div className="flex items-center gap-4 text-xs text-text-dim">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    <span className="font-bold text-primary text-[10px] tracking-widest">LIVE MARKET FEED</span>
                 </div>
                 <span className="opacity-30">|</span>
                 <span className="font-medium tracking-tight">Synchronized: {lastUpdate.toLocaleTimeString()}</span>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-xl shadow-lg border border-black/5 flex">
                 {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(t => (
                   <button key={t} className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${t === 'Daily' ? 'bg-primary text-white shadow-xl' : 'text-text-dim hover:text-primary hover:bg-surface'}`}>
                      {t}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
           
           {/* Left: Market Charts */}
           <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all duration-700 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10"></div>
                 <div className="flex items-center justify-between mb-12 relative z-10">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center text-primary shadow-inner border border-black/5">
                          <BarChart3 className="w-8 h-8" />
                       </div>
                       <div>
                          <h3 className="text-3xl font-display font-bold text-primary uppercase tracking-tight">{selectedCrop} Trading Trend</h3>
                          <p className="text-[10px] text-text-dim font-bold uppercase tracking-widest mt-1">Real-time National Exchange Data</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-4xl font-display font-bold text-primary tracking-tighter">₹2,455.00</p>
                       <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest flex items-center justify-end gap-2">
                          <TrendingUp className="w-4 h-4" /> +₹45.00 (1.8%)
                       </p>
                    </div>
                 </div>

                 <div className="h-96 w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1a2f23" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#1a2f23" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af', fontWeight: 600}} dy={15} />
                          <YAxis domain={['dataMin - 100', 'dataMax + 100']} axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af', fontWeight: 600}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', padding: '15px' }}
                            itemStyle={{ fontSize: '13px', fontWeight: 'bold', color: '#1a2f23' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#1a2f23" 
                            fillOpacity={1} 
                            fill="url(#colorPrice)" 
                            strokeWidth={4}
                            animationDuration={2000}
                          />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Mandi Rates Table */}
              <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden">
                 <div className="p-10 border-b border-black/5 flex items-center justify-between bg-surface/20">
                    <div className="flex items-center gap-5">
                       <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                          <MapPin className="w-5 h-5" />
                       </div>
                       <h3 className="text-xl font-display font-bold text-primary uppercase tracking-tight">Regional Mandi Benchmarks</h3>
                    </div>
                    <button className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] border-b border-primary/20 hover:border-primary transition-all pb-1">
                       Full Regional Report
                    </button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full">
                       <thead>
                          <tr className="bg-[#fafafa]">
                             <th className="px-10 py-6 text-left text-[10px] font-black text-text-dim/60 uppercase tracking-[0.2em]">Market Identity</th>
                             <th className="px-10 py-6 text-left text-[10px] font-black text-text-dim/60 uppercase tracking-[0.2em]">Flow Volume</th>
                             <th className="px-10 py-6 text-left text-[10px] font-black text-text-dim/60 uppercase tracking-[0.2em]">Spot Rate</th>
                             <th className="px-10 py-6 text-right text-[10px] font-black text-text-dim/60 uppercase tracking-[0.2em]">Dynamics</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-black/[0.03]">
                          {mandiPrices.map((mandi, i) => (
                             <tr key={i} className="hover:bg-surface/50 transition-all duration-500">
                                <td className="px-10 py-8">
                                   <p className="text-sm font-bold text-primary uppercase tracking-tight">{mandi.market}</p>
                                </td>
                                <td className="px-10 py-8">
                                   <span className="text-[11px] font-bold text-text-dim/60 uppercase tracking-widest">{mandi.volume}</span>
                                </td>
                                <td className="px-10 py-8">
                                   <span className="text-lg font-display font-bold text-primary">₹{mandi.price}</span>
                                </td>
                                <td className="px-10 py-8 text-right">
                                   {mandi.trend === 'up' ? (
                                     <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 border border-emerald-100">
                                        <TrendingUp className="w-3.5 h-3.5" /> Bullish
                                     </span>
                                   ) : (
                                     <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[9px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 border border-blue-100">
                                        <Activity className="w-3.5 h-3.5" /> Stable
                                     </span>
                                   )}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Right: Sidebar Analytics */}
           <div className="lg:col-span-4 space-y-8">
              
              {/* Market Sentiment */}
              <div className="bg-white p-10 rounded-[2.5rem] text-primary shadow-xl border border-black/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 transition-all duration-1000 group-hover:bg-primary/10"></div>
                 <div className="relative z-10 space-y-10">
                    <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                       <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-accent shadow-inner">
                          <PieChartIcon className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-display font-bold uppercase tracking-widest text-primary">Market Sentiment</h3>
                    </div>

                    <div className="space-y-10">
                       <div className="space-y-4">
                          <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-dim">Demand Index</p>
                                <p className="text-2xl font-display font-bold text-emerald-600 uppercase">84% Bullish</p>
                             </div>
                             <TrendingUp className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-black/5 p-0.5">
                             <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 2, ease: "easeOut" }} className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-dim">Supply Flux</p>
                                <p className="text-2xl font-display font-bold text-amber-600 uppercase">Low Reserves</p>
                             </div>
                             <ArrowUpRight className="w-6 h-6 text-amber-600 rotate-90" />
                          </div>
                          <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-black/5 p-0.5">
                             <motion.div initial={{ width: 0 }} animate={{ width: '32%' }} transition={{ duration: 2, ease: "easeOut" }} className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                          </div>
                       </div>
                    </div>

                    <div className="pt-10 border-t border-black/5">
                       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-dim mb-4">Expert Analysis</p>
                       <div className="p-6 bg-surface/50 rounded-3xl border border-black/5 relative group-hover:bg-surface transition-all duration-500">
                          <p className="text-sm italic font-medium leading-relaxed text-primary">
                             "Wheat arrivals are expected to slow down in northern belts, suggesting a possible price hike in the next 14 days."
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Global Commodity Comparison */}
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                 <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">Top Commodities</h3>
                 <div className="space-y-4">
                    {tickerData.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-surface/50 rounded-2xl hover:bg-surface transition-all">
                         <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                               {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            </div>
                            <span className="text-sm font-bold text-primary uppercase tracking-tight">{item.name}</span>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-bold text-primary">₹{item.price}</p>
                            <p className={`text-[9px] font-black ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>{item.change}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-6 py-4 border border-black/5 rounded-2xl text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    Full Market Report
                 </button>
              </div>

              {/* Expert Advice Widget */}
              <div className="p-8 rounded-[2.5rem] bg-accent/10 border border-accent/20 flex items-start gap-6 group">
                 <Zap className="w-8 h-8 text-accent shrink-0 mt-1" />
                 <div>
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Krishi Insights</p>
                    <p className="text-sm font-bold text-primary uppercase tracking-tight leading-tight mt-1">Smart Sowing Recommendation</p>
                    <p className="text-xs text-text-dim mt-2 leading-relaxed">Based on current market flux, Mustard yields are projected to have a 20% higher ROI next quarter.</p>
                 </div>
              </div>

           </div>
        </div>
      </div>
      
      {/* Styles for Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};

export default AgriInsights;
