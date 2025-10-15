// src/pages/AdminDashboard.js
import React from 'react';
import OrderManagement from '../components/admin/OrderManagement';
import ProductManagement from '../components/admin/ProductManagement'; // Import
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <OrderManagement />
       <ProductManagement /> {/* Add this line */}
      </div>
    </div>
  );
};

export default AdminDashboard;