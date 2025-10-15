// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// 1. Import react-toastify components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
// ... (import all your other pages and components)
import Home from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductPage from './pages/CategoryProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MyAccountPage from './pages/MyAccountPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import RequestPasswordResetPage from './pages/RequestPasswordResetPage';
import ConfirmPasswordResetPage from './pages/ConfirmPasswordResetPage';

import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* 2. Place the ToastContainer here */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              {/* ... (all your existing routes) ... */}
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:categorySlug" element={<CategoryProductPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/request-password-reset" element={<RequestPasswordResetPage />} />
          <Route path="/reset-password-confirm/:token" element={<ConfirmPasswordResetPage />} />
       
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AdminRoute><MyAccountPage /></AdminRoute>} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;