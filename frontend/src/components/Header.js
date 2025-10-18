import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';
import { useCart } from '../context/CartContext'; // Adjust path if needed
import logoImage from '../assets/logo.png'; // Adjust path if needed

const Header = () => {
  // State for the mobile navigation menu (open/closed)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for the theme (light/dark)
  const [theme, setTheme] = useState('dark');

  // Get the cart items from the context
  const { items } = useCart();
  
  // Calculate the total number of unique items in the cart
  const cartItemCount = items.length;

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // This hook applies the 'dark-mode' class to the body
  useEffect(() => {
    document.body.className = '';
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, [theme]);

  // Function to close the mobile menu, useful for when a link is clicked
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src={logoImage} alt="Fortepluie Logo" />
        </Link>

        {/* The nav menu's class changes based on isMenuOpen state */}
        <nav className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <Link to="/products" className="nav-link" onClick={closeMobileMenu}>Products</Link>
          <Link to="/categories" className="nav-link" onClick={closeMobileMenu}>Categories</Link>
          <Link to="/cart" className="nav-link cart-link" onClick={closeMobileMenu}>
            Cart
            {/* The badge will only appear if there are items in the cart */}
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </nav>
        
        {/* Right side of the header */}
        <div className="header-right">
          <div className="theme-toggle">
            <span role="img" aria-label="sun">☀️</span>
            <label className="switch">
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              <span className="slider round"></span>
            </label>
            <span role="img" aria-label="moon">🌙</span>
          </div>

          <div className="auth-links">
             <Link to="/login" className="nav-link">Login</Link>
             <Link to="/signup" className="nav-link signup-button">Sign Up</Link>
          </div>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;