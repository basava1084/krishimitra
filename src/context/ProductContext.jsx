import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialData';

const ProductContext = createContext();
const API = 'http://localhost:5000/api/v1/products';

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('km_products_v11');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch all products from MongoDB Atlas on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
          localStorage.setItem('km_products_v11', JSON.stringify(data.data));
        }
      } catch (err) {
        console.warn('Could not reach API, using cached products:', err.message);
      }
    };
    fetchProducts();
  }, []);

  // Keep localStorage in sync as a cache
  useEffect(() => {
    localStorage.setItem('km_products_v11', JSON.stringify(products));
  }, [products]);

  // Add product → saves to MongoDB Atlas
  const addProduct = async (productData, user) => {
    if (!user) {
      console.error('Cannot add product: User context missing');
      return;
    }

    const newProduct = {
      ...productData,
      farmerId: user._id || user.id,
      createdBy: user._id || user.id,
      createdByRole: user.role || 'farmer',
      sellerName: user.name,
      location: productData.location || user.farmDetails?.location || 'Local',
      harvestDate: new Date().toISOString(),
      stock: parseInt(productData.quantity || productData.stock || 0),
      organic: productData.organic || false,
      rating: 4.5,
    };

    try {
      // Save to MongoDB Atlas
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch (err) {
      console.warn('API save failed, saving locally:', err.message);
      // Fallback: save locally if API is unreachable
      const localProduct = { ...newProduct, id: 'P-' + Date.now() };
      setProducts(prev => [localProduct, ...prev]);
      return localProduct;
    }
  };

  // Update product in MongoDB Atlas
  const updateProduct = async (id, updatedData) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => (p._id === id || p.id === id) ? data.data : p));
      }
    } catch (err) {
      // Fallback: update locally
      setProducts(prev => prev.map(p => (p._id === id || p.id === id) ? { ...p, ...updatedData } : p));
    }
  };

  // Delete product from MongoDB Atlas
  const deleteProduct = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API delete failed, removing locally');
    }
    // Always remove from local state
    setProducts(prev => prev.filter(p => p._id !== id && p.id !== id));
  };

  const reduceStock = (productId, quantity) => {
    setProducts(prev => prev.map(p => {
      if (p._id === productId || p.id === productId) {
        const newStock = Math.max(0, p.stock - quantity);
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, reduceStock }}>
      {children}
    </ProductContext.Provider>
  );
};
