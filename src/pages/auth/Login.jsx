import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  LogIn, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  User, 
  Leaf, 
  Zap, 
  Globe, 
  Fingerprint,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // customer or farmer
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const user = await login(email, password, role);
      const from = location.state?.from?.pathname || (user.role === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center relative overflow-hidden bg-background font-body selection:bg-primary/5">
      {/* Dynamic Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[800px] bg-primary/5 rounded-full blur-[140px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
      
      <div className="max-w-5xl w-full px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Brand/Emotional Panel - Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-12 hidden lg:block"
          >
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white border border-black/5 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-700">
                <Leaf className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold text-primary tracking-tight uppercase">
                  KRISHI<span className="text-accent italic ml-0.5">MITRA</span>
                </span>
                <span className="text-[8px] font-black text-text-dim uppercase tracking-[0.6em] mt-2 opacity-50">Premium Agricultural Marketplace</span>
              </div>
            </Link>

            <div className="space-y-8">
               <h2 className="text-6xl font-display font-bold text-primary leading-[0.95] uppercase tracking-tighter">
                 Welcome <span className="text-accent italic font-normal">Back</span>
               </h2>
               <p className="text-base text-text-dim/70 leading-relaxed max-w-lg font-medium tracking-wide">
                 Access your personalized management suite. Your gateway to the most professional organic marketplace.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6">
               {[
                 { icon: Fingerprint, label: 'Secure Access', val: 'Protected' },
                 { icon: Cpu, label: 'System Status', val: 'Online' }
               ].map((item, i) => (
                 <div key={i} className="p-6 rounded-3xl bg-white border border-black/[0.03] shadow-sm space-y-4">
                    <item.icon className="w-6 h-6 text-accent" />
                    <div>
                       <p className="text-[9px] font-black text-text-dim/40 uppercase tracking-widest">{item.label}</p>
                       <p className="text-lg font-display font-bold text-primary uppercase">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Authentication Card - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="card-premium !p-8 md:!p-10 shadow-2xl space-y-8 relative overflow-hidden border-white/60">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="text-center space-y-3 relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1 bg-primary/5 rounded-full border border-primary/10 mb-2">
                   <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                   <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">Secure Login</span>
                </div>
                <h1 className="text-3xl font-display font-bold text-primary tracking-tight uppercase">
                  Member <span className="text-accent italic font-normal">Access</span>
                </h1>
                <p className="text-[11px] text-text-dim/60 font-medium tracking-wide">Sign in to access your dashboard</p>
              </div>

              {/* Role Toggle - Sleek Design */}
              <div className="flex bg-surface p-1 rounded-xl border border-black/[0.03] relative z-10">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2 ${role === 'customer' ? 'bg-primary text-white shadow-xl' : 'text-text-dim/40 hover:text-primary'}`}
                >
                  <User className="w-3.5 h-3.5" /> Consumer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2 ${role === 'farmer' ? 'bg-primary text-white shadow-xl' : 'text-text-dim/40 hover:text-primary'}`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Farmer
                </button>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold text-center relative z-10 shadow-sm">
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-text-dim uppercase tracking-widest ml-4 opacity-60">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                    <input
                      type="email"
                      required
                      className="input-premium !py-4 pl-14"
                      placeholder="name@nexus.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-4">
                    <label className="text-[9px] font-black text-text-dim uppercase tracking-widest opacity-60">Security Key</label>
                    <button type="button" className="text-[9px] font-bold text-accent uppercase tracking-widest hover:text-primary transition-colors">Lost Key?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                    <input
                      type="password"
                      required
                      className="input-premium !py-4 pl-14"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium w-full !py-5 text-[11px] tracking-[0.5em] flex items-center justify-center gap-5 group disabled:opacity-50 shadow-2xl relative overflow-hidden"
                >
                  {loading ? (
                     <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 animate-spin text-accent" />
                        <span>SYNCHRONIZING...</span>
                     </div>
                  ) : (
                    <>INITIATE SESSION <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-700" /></>
                  )}
                </button>
              </form>

              <div className="pt-8 border-t border-black/[0.03] text-center relative z-10">
                <p className="text-[11px] text-text-dim/60 font-medium">
                  New to the ecosystem? 
                  <Link to="/register" className="text-primary font-black ml-3 uppercase tracking-widest hover:text-accent transition-all duration-500 underline underline-offset-8 decoration-primary/10">
                    Register Node
                  </Link>
                </p>
              </div>
            </div>

            {/* Bottom Trust Indicators */}
            <div className="mt-8 flex items-center justify-center gap-8 text-[9px] font-black text-text-dim/20 uppercase tracking-[0.4em]">
               <div className="flex items-center gap-2"><Zap className="w-3 h-3" /> Latency: 4ms</div>
               <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> SSL Node</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
