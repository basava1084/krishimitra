import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('krishi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('krishi_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    // Support both _id (MongoDB) and id (local)
    const pid = product._id || product.id;
    setCart(prev => {
      const existing = prev.find(item => (item._id || item.id) === pid);
      if (existing) {
        return prev.map(item =>
          (item._id || item.id) === pid
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, id: pid, quantity }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCart(prev => prev.map(item => {
      if (item.id === id || item._id === id) {
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const reorderItems = (items) => {
    setCart(prev => {
      const newCart = [...prev];
      items.forEach(item => {
        const existing = newCart.find(i => i.id === item.productId);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          newCart.push({
            id: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            farmerId: item.farmerId,
            unit: item.unit || 'kg',
            image: item.image || '/src/assets/images/tomato.png'
          });
        }
      });
      return newCart;
    });
    showToast('Previous order items added to basket');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartTotal = subtotal;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, reorderItems, subtotal, cartTotal, cartCount }}>
      {children}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-bold tracking-tight">{toast}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
