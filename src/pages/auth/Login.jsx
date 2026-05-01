import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Sprout, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default redirect path based on selected role
  const from = location.state?.from?.pathname || `/${role}/dashboard`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate slight network delay for realism
      await new Promise(resolve => setTimeout(resolve, 600));
      login(email, password, role);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <div className="p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Welcome Back</h1>
            <p className="text-gray-500 font-medium mt-2 text-sm">Log in to your Krishi Market account</p>
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
            <div className="space-y-1.5">
              <label className="label-text">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  required
                  className="input-field pl-10" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                 <label className="label-text">Password</label>
                 <Link to="#" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="password" 
                  required
                  className="input-field pl-10" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 rounded-xl uppercase tracking-widest font-black shadow-xl shadow-primary/20 disabled:opacity-70 flex justify-center items-center gap-2 mt-4"
            >
              {isLoading ? 'Authenticating...' : <>Log In Securely <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-sm font-bold text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" state={{ defaultRole: role }} className="text-primary hover:underline uppercase tracking-widest text-xs font-black">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
