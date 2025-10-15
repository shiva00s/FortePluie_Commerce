import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { getAuthToken } from '../utils/auth';
import Spinner from '../components/Spinner';
import './MyAccountPage.css';

const MyAccountPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = getAuthToken();
      if (!token) {
        setError('You must be logged in to view your orders.');
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/my-orders/');
        const data = response.data.results || response.data;
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to fetch your orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="my-account-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="my-account-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => {
            const orderNumber = orders.length - index;
            return (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <h3>Your Order #{orderNumber} (Ref: {order.id})</h3>
                  <span className={`status-pill status-${order.status}`}>{order.status}</span>
                </div>
                <div className="order-card-body">
                  {/* THIS IS THE FIX: It correctly formats the date string */}
                  <p><strong>Date Placed:</strong> {new Date(order.created_at).toLocaleString()}</p>
                  <p><strong>Total Price:</strong> ₹{order.total_price}</p>
                  <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;