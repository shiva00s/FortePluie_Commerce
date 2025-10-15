// src/components/admin/OrderManagement.js
import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { getAuthToken } from '../../utils/auth';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  // 1. New state to keep track of the current filter
  const [filterStatus, setFilterStatus] = useState('all');
  const token = getAuthToken();

  // 2. Update fetchOrders to use the filter
  const fetchOrders = async () => {
    setError('');
    let url = '/admin/orders/';
    if (filterStatus !== 'all') {
      url += `?status=${filterStatus}`;
    }

    try {
      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data.results || response.data;
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch orders. You may not have admin privileges.');
      console.error(err);
    }
  };

  // 3. This useEffect now re-runs whenever the filterStatus changes
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, filterStatus]); // Add filterStatus as a dependency

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}/`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      alert('Failed to update order status.');
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="order-management">
      <h2>Manage Orders</h2>

      {/* 4. Add filter buttons */}
      <div className="order-filters">
        <button onClick={() => setFilterStatus('all')} className={filterStatus === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilterStatus('pending')} className={filterStatus === 'pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => setFilterStatus('processing')} className={filterStatus === 'processing' ? 'active' : ''}>Processing</button>
        <button onClick={() => setFilterStatus('delivered')} className={filterStatus === 'delivered' ? 'active' : ''}>Delivered</button>
        <button onClick={() => setFilterStatus('cancelled')} className={filterStatus === 'cancelled' ? 'active' : ''}>Cancelled</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Username</th> {/* 5. Add Username column */}
            <th>Customer Email</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Date Placed</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              {/* 6. Display the username */}
              <td>{order.user ? order.user.username : 'Guest'}</td>
              <td>{order.email}</td>
              <td>₹{order.total_price}</td>
              <td><span className={`status-pill status-${order.status}`}>{order.status}</span></td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;