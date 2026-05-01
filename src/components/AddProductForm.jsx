import React, { useState } from 'react';
import { Package, IndianRupee, Tag, Info, MapPin, Image as ImageIcon, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const AddProductForm = ({ onSuccess }) => {
  const { addProduct } = useProducts();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Vegetables',
    quantity: '',
    unit: 'kg',
    location: currentUser?.farmDetails?.location || currentUser?.address || '',
    farmingType: currentUser?.farmDetails?.farmingType || 'Natural',
    image: ''
  });

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Others'];
  const units = ['kg', 'L', 'dozen', 'piece', 'bundle'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate slight delay for real-world feel
    setTimeout(() => {
      addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.quantity)
      }, currentUser);
      
      setFormData({
        name: '',
        price: '',
        category: 'Vegetables',
        quantity: '',
        unit: 'kg',
        location: currentUser?.farmDetails?.location || currentUser?.address || '',
        farmingType: currentUser?.farmDetails?.farmingType || 'Natural',
        image: ''
      });
      
      setLoading(false);
      if (onSuccess) onSuccess();
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5 md:col-span-2">
          <label className="label-text">Product Name</label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="text" 
              className="input-field pl-10" 
              placeholder="e.g. Organic Red Tomatoes" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="label-text">Price (₹)</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="number" 
              className="input-field pl-10" 
              placeholder="0.00" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="label-text">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              className="input-field pl-10 appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="label-text">Quantity</label>
          <input 
            required
            type="number" 
            className="input-field" 
            placeholder="Available stock" 
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
          />
        </div>

        <div className="space-y-1.5">
          <label className="label-text">Unit</label>
          <select 
            className="input-field"
            value={formData.unit}
            onChange={(e) => setFormData({...formData, unit: e.target.value})}
          >
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="label-text">Farm/Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="text" 
              className="input-field pl-10" 
              placeholder="e.g. Kolar, Karnataka" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="label-text">Image URL (Optional)</label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="url" 
              className="input-field pl-10" 
              placeholder="https://..." 
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>
          <p className="text-[10px] text-gray-400 font-medium italic">Leave empty to use a high-quality default harvest image.</p>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary w-full py-4 rounded-xl uppercase tracking-widest font-black flex items-center justify-center gap-2 shadow-xl shadow-primary/20 disabled:opacity-50"
      >
        {loading ? 'Processing Harvest...' : <><Plus className="w-5 h-5" /> List Product in Marketplace</>}
      </button>
    </form>
  );
};

export default AddProductForm;
