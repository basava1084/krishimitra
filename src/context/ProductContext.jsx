import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialData';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('km_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('km_products_v3', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData, user) => {
    const newProduct = {
      ...productData,
      id: 'P-' + Date.now(),
      createdBy: user.id,
      createdByRole: user.role,
      sellerName: user.name,
      location: productData.location || user.address || user.farmDetails?.location || 'Local',
      harvestDate: new Date().toISOString().split('T')[0],
      stock: parseInt(productData.quantity || productData.stock || 0)
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const reduceStock = (productId, quantity) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
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
