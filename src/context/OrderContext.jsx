import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();
const API = 'http://localhost:5000/api/v1/orders';

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('km_orders_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage in sync as a cache
  useEffect(() => {
    localStorage.setItem('km_orders_v2', JSON.stringify(orders));
  }, [orders]);

  // Fetch orders from Atlas for logged-in customer
  const fetchMyOrders = async (customerId) => {
    try {
      const res = await fetch(`${API}/my?customerId=${customerId}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
        return data.data;
      }
    } catch (err) {
      console.warn('Could not fetch orders from API:', err.message);
    }
    return orders;
  };

  // Place order → saves to MongoDB Atlas
  const placeOrder = async (orderData) => {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => [data.data, ...prev]);
        return data.data;
      }
      throw new Error(data.message || 'Order failed');
    } catch (err) {
      // Fallback: save locally
      console.warn('API order failed, saving locally:', err.message);
      const localOrder = {
        ...orderData,
        orderId: 'KM-' + Date.now(),
        orderStatus: 'confirmed',
        paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 4 * 86400000).toISOString()
      };
      setOrders(prev => [localOrder, ...prev]);
      return localOrder;
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await fetch(`${API}/${orderId}/cancel`, { method: 'PUT' });
    } catch (err) {
      console.warn('API cancel failed');
    }
    setOrders(prev => prev.map(o =>
      (o._id === orderId || o.orderId === orderId || o.id === orderId)
        ? { ...o, orderStatus: 'cancelled' }
        : o
    ));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o =>
      (o._id === orderId || o.id === orderId) ? { ...o, orderStatus: newStatus } : o
    ));
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter(o => o.customer === customerId || o.customerId === customerId);
  };

  const getFarmerOrders = (farmerId) => {
    return orders.filter(o => o.items?.some(item => item.farmerId === farmerId));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      cancelOrder,
      fetchMyOrders,
      updateOrderStatus,
      getCustomerOrders,
      getFarmerOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};
