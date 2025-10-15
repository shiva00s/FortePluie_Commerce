// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken, setAuthToken } from '../utils/auth';
import { useCart } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle'
import './Header.css'; // This is the correct import

const Header = () => {
  const [user, setUser] = useState(null);
  const { items } = useCart();
  const navigate = useNavigate();

  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log('Decoded Token Content:', decodedUser);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        // handleLogout(); // This can be removed if logout is handled elsewhere
      }
    }
  }, []);

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="brand">Fortepluie</Link>
        <nav className="navigation">
          {user && user.is_staff ? (
            // If the user is an admin, show these links
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/">View Shop</Link>
            </>
          ) : (
            // Otherwise, show these links for a regular user
            <>
              <Link to="/">Products</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/cart">
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
            </>
          )}
        </nav>
        <DarkModeToggle />
        <div className="user-auth">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.username}</span>
              <Link to="/account">My Account</Link>
              {user.is_staff && <Link to="/admin/dashboard">Admin</Link>}
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;