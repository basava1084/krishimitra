import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, Tag, Sprout, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const location = useLocation();
  const [role, setRole] = useState(location.state?.defaultRole || 'customer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Unified form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmLocation: '',
    farmingType: 'Organic',
    farmDescription: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reset farmer-specific fields when switching to customer
  useEffect(() => {
    if (role === 'customer') {
      setFormData(prev => ({
        ...prev,
        farmLocation: '',
        farmingType: 'Organic',
        farmDescription: ''
      }));
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: role
      };

      if (role === 'farmer') {
        userData.address = formData.farmLocation; // Fallback mapping
        userData.farmDetails = {
          location: formData.farmLocation,
          farmingType: formData.farmingType,
          experience: 1, // Defaulting for new users
          description: formData.farmDescription || "A passionate local farmer."
        };
      }

      register(userData);
      navigate(`/${role}/dashboard`, { replace: true });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <div className="p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Join Community</h1>
            <p className="text-gray-500 font-medium mt-2 text-sm">Create your Krishi Market account</p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1 bg-gray-50 rounded-xl mb-8 border border-gray-100 relative">
             <div 
               className="absolute top-1 bottom-1 left-1 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300"
               style={{ width: 'calc(50% - 4px)', transform: role === 'farmer' ? 'translateX(100%)' : 'translateX(0)' }}
             ></div>
             
             <button 
               type="button"
               onClick={() => { setRole('customer'); setError(''); }}
               className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-widest relative z-10 transition-colors ${role === 'customer' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
               <User className="w-4 h-4" /> Customer
             </button>
             
             <button 
               type="button"
               onClick={() => { setRole('farmer'); setError(''); }}
               className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-widest relative z-10 transition-colors ${role === 'farmer' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
               <Sprout className="w-4 h-4" /> Farmer
             </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest p-4 rounded-xl mb-6 border border-red-100 text-center animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 md:col-span-2">
                <label className="label-text">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" name="name" required className="input-field pl-10" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="label-text">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" name="email" required className="input-field pl-10" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="label-text">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" name="phone" required className="input-field pl-10" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              {/* Dynamic Farmer Fields */}
              {role === 'farmer' && (
                <>
                  <div className="space-y-1.5 md:col-span-2 pt-4 border-t border-gray-50">
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Sprout className="w-4 h-4" /> Farm Details
                    </h3>
                    <label className="label-text">Farm Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" name="farmLocation" required={role === 'farmer'} className="input-field pl-10" placeholder="City, State" value={formData.farmLocation} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="label-text">Farming Type</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select name="farmingType" className="input-field pl-10 appearance-none" value={formData.farmingType} onChange={handleChange}>
                        <option value="Organic">100% Organic</option>
                        <option value="Natural">Natural / Conventional</option>
                        <option value="Hydroponic">Hydroponic</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="label-text">Your Harvest Philosophy (Short Bio)</label>
                    <textarea 
                       name="farmDescription" 
                       className="input-field h-20 py-3" 
                       placeholder="Why do you grow what you grow?" 
                       value={formData.farmDescription} 
                       onChange={handleChange}
                    ></textarea>
                  </div>
                </>
              )}

              <div className="space-y-1.5 pt-4 border-t border-gray-50 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="label-text">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="password" name="password" required className="input-field pl-10" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label-text">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="password" name="confirmPassword" required className="input-field pl-10" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 rounded-xl uppercase tracking-widest font-black shadow-xl shadow-primary/20 disabled:opacity-70 flex justify-center items-center gap-2 mt-8"
            >
              {isLoading ? 'Creating Account...' : <>Complete Registration <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-sm font-bold text-gray-500">
              Already have an account?{' '}
              <Link to="/login" state={{ defaultRole: role }} className="text-primary hover:underline uppercase tracking-widest text-xs font-black">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
