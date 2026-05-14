import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Plus, 
  X,
  ShoppingBag,
  Leaf,
  DollarSign,
  Tag,
  Layers,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400';

const AddProductForm = ({ onSuccess, onClose }) => {
  const { addProduct } = useProducts();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Vegetables',
    quantity: '',
    unit: 'kg',
    location: currentUser?.location || '',
    image: ''
  });

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Others'];
  const units = ['kg', 'L', 'dozen', 'piece', 'bundle'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.quantity),
        image: formData.image || DEFAULT_IMAGE
      }, currentUser);
      
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-body text-text-main">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Name */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Product Name</label>
          <div className="relative">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
            <input
              required
              type="text"
              placeholder="e.g. Fresh Organic Carrots"
              className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Category</label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
            <select
              className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 appearance-none cursor-pointer"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Price (₹)</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
            <input
              required
              type="number"
              placeholder="0.00"
              className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Stock Quantity</label>
          <div className="relative">
            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
            <input
              required
              type="number"
              placeholder="Available stock"
              className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </div>
        </div>

        {/* Unit */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Unit</label>
          <div className="relative">
            <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
            <select
              className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 appearance-none cursor-pointer"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Farm Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
            <input
              required
              type="text"
              placeholder="e.g. Mandya, Karnataka"
              className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Product Image URL</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-24 h-24 rounded-2xl bg-surface border border-black/5 overflow-hidden shrink-0 shadow-sm">
              <img 
                src={formData.image || DEFAULT_IMAGE} 
                className="w-full h-full object-cover" 
                alt="Preview" 
                onError={(e) => e.target.src = DEFAULT_IMAGE}
              />
            </div>
            <div className="flex-1 relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/40" />
              <input
                type="url"
                placeholder="Paste image link here..."
                className="w-full bg-surface border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-4 border border-black/5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-surface transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] btn-premium px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? 'Processing...' : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>List Product</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
