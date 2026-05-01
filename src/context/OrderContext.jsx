import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('km_orders_v2');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('km_orders_v2', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: 'ORD-' + Math.floor(Math.random() * 100000),
      createdAt: new Date().toISOString(),
      status: 'placed'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter(o => o.customerId === customerId);
  };

  const getFarmerOrders = (farmerId) => {
    // A farmer sees an order if it contains any of their products
    return orders.filter(o => o.items.some(item => item.farmerId === farmerId));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, getCustomerOrders, getFarmerOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
