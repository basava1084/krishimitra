import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  UserCircle, 
  Leaf,
  Phone,
  MapPin,
  Briefcase,
  Sprout,
  Compass,
  ArrowLeft,
  Zap,
  Globe,
  Database,
  Star,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [role, setRole] = useState('customer'); // customer or farmer
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Farmer specific
    farmingType: '',
    location: '',
    experience: '',
    address: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    
    try {
      setError('');
      setLoading(true);
      
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: role
      };

      if (role === 'farmer') {
        submissionData.farmDetails = {
          farmingType: formData.farmingType,
          location: formData.location,
          experience: parseInt(formData.experience) || 0,
        };
        submissionData.location = formData.location;
        submissionData.address = formData.address;
      }

      const user = await register(submissionData);
      if (user.role === 'farmer') navigate('/farmer/dashboard');
      else navigate('/customer/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center relative overflow-hidden bg-background font-body selection:bg-primary/5">
      {/* Dynamic Background Ambience */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-6xl h-[800px] bg-primary/5 rounded-full blur-[140px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-6xl w-full px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Brand/Information Panel - Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-12 hidden lg:block"
          >
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white border border-black/5 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-700">
                <Leaf className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold text-primary tracking-tight uppercase">
                  KRISHI<span className="text-accent italic ml-0.5">MITRA</span>
                </span>
                <span className="text-[8px] font-black text-text-dim uppercase tracking-[0.6em] mt-2 opacity-50">Account Creation</span>
              </div>
            </Link>

            <AnimatePresence mode="wait">
              <motion.div 
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                 <h2 className="text-6xl font-display font-bold text-primary leading-[0.95] uppercase tracking-tighter">
                   {role === 'customer' ? 'Access The ' : 'Manage Your '}
                   <span className="text-accent italic font-normal">{role === 'customer' ? 'Harvest' : 'Farm'}</span>
                 </h2>
                 <p className="text-base text-text-dim/70 leading-relaxed max-w-lg font-medium tracking-wide">
                   {role === 'customer' 
                    ? 'Join a community dedicated to accessing the highest quality organic products directly from the source.'
                    : 'Join our network of verified farmers and share your high-quality harvest with our professional marketplace.'}
                 </p>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-6">
               {[
                 { icon: Star, label: 'Quality Control', val: 'Verified Purity' },
                 { icon: Activity, label: 'Market Insights', val: 'Real-time Demand' }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6 items-center p-6 rounded-3xl bg-white border border-black/[0.03] shadow-sm group hover:shadow-xl transition-all duration-700">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary/30 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                       <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-text-dim/40 uppercase tracking-widest">{item.label}</p>
                       <p className="text-lg font-display font-bold text-primary uppercase">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Registration Card - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full"
          >
            <div className="card-premium !p-8 md:!p-12 shadow-2xl space-y-8 relative overflow-hidden border-white/60">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -mr-24 -mt-24 opacity-60"></div>
              
              <div className="text-center space-y-3 relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1 bg-accent/10 rounded-full border border-accent/20 mb-2">
                   <Leaf className="w-3.5 h-3.5 text-accent" />
                   <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">Member Registration</span>
                </div>
                <h1 className="text-3xl font-display font-bold text-primary tracking-tight uppercase">
                  Create <span className="text-accent italic font-normal">Account</span>
                </h1>
                <p className="text-[11px] text-text-dim/60 font-medium tracking-wide">Select your role and start your journey with us</p>
              </div>

              {/* Role Selector - High Fidelity Tabs */}
              <div className="flex bg-surface p-1.5 rounded-2xl border border-black/[0.03] relative z-10">
                 <button 
                   onClick={() => { setRole('customer'); setError(''); }}
                   className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-3 ${role === 'customer' ? 'bg-primary text-white shadow-xl' : 'text-text-dim/40 hover:text-primary'}`}
                 >
                    <User className="w-4 h-4" /> Consumer
                 </button>
                 <button 
                   onClick={() => { setRole('farmer'); setError(''); }}
                   className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-3 ${role === 'farmer' ? 'bg-primary text-white shadow-xl' : 'text-text-dim/40 hover:text-primary'}`}
                 >
                    <ShieldCheck className="w-4 h-4" /> Guardian
                 </button>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold text-center relative z-10">
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 gap-5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Full Name</label>
                      <div className="relative group">
                        <UserCircle className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                        <input type="text" name="name" required className="input-premium !py-3.5 pl-14" placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                        <input type="tel" name="phone" required className="input-premium !py-3.5 pl-14" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                      <input type="email" name="email" required className="input-premium !py-3.5 pl-14" placeholder="name@example.com" value={formData.email} onChange={handleInputChange} />
                    </div>
                  </div>

                  {/* Dynamic Farmer Fields Architecture */}
                  <AnimatePresence mode="wait">
                    {role === 'farmer' && (
                      <motion.div 
                        key="farmer-pro-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5 pt-4 border-t border-black/[0.03]"
                      >
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Farming Category</label>
                            <div className="relative group">
                              <Sprout className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                              <select name="farmingType" required className="input-premium !py-3.5 pl-14 appearance-none" value={formData.farmingType} onChange={handleInputChange}>
                                <option value="">Select Category</option>
                                <option value="Organic Grains">Organic Grains</option>
                                <option value="Fruits & Orchards">Fruits & Orchards</option>
                                <option value="Dairy & Livestock">Dairy & Livestock</option>
                                <option value="Organic Fertilizers">Organic Fertilizers</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Experience (Years)</label>
                            <div className="relative group">
                              <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                              <input type="number" name="experience" required className="input-premium !py-3.5 pl-14" placeholder="Years" value={formData.experience} onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Farm Location</label>
                          <div className="relative group">
                            <Compass className="absolute left-6 top-5 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                            <textarea name="location" required className="input-premium pl-14 h-20 resize-none pt-3" placeholder="Enter your farm address" value={formData.location} onChange={handleInputChange}></textarea>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                        <input type="password" name="password" required className="input-premium !py-3.5 pl-14" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-black text-text-dim/60 uppercase tracking-widest ml-4">Confirm Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/20 group-focus-within:text-primary transition-all duration-500" />
                        <input type="password" name="confirmPassword" required className="input-premium !py-3.5 pl-14" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium w-full !py-4 text-[11px] tracking-[0.5em] flex items-center justify-center gap-6 group disabled:opacity-50 relative overflow-hidden shadow-2xl"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 animate-spin text-accent" />
                      <span>CREATING ACCOUNT...</span>
                    </div>
                  ) : (
                    <>CREATE ACCOUNT <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-700" /></>
                  )}
                </button>
              </form>

              <div className="pt-8 border-t border-black/[0.03] text-center relative z-10">
                <p className="text-[11px] text-text-dim/60 font-medium">
                  Already have an account? 
                  <Link to="/login" className="text-primary font-black ml-3 uppercase tracking-widest hover:text-accent transition-all duration-500 underline underline-offset-8 decoration-primary/10">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
