// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

const AdminRoute = ({ children }) => {
  const token = getAuthToken();

  if (!token) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the component they were trying to access
  return children;
};

export default AdminRoute;