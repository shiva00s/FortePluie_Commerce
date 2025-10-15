// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { getAuthToken } from '../utils/auth';

// 1. Create the context
const CartContext = createContext();

// 2. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getAuthToken();

  // 3. This useEffect is the core of the new logic.
  // It runs once when the app loads to fetch the cart from the backend.
  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        try {
          const response = await api.get('/cart/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          // The API returns the full cart object, we just need the 'items' array
          setCartItems(response.data.items || []);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          setCartItems([]); // Set to empty on error
        }
      }
      setLoading(false);
    };

    fetchCart();
  }, [token]); // It re-runs if the token changes (i.e., user logs in/out)

  // 4. All cart functions are now async and make API calls
  const addToCart = async (product) => {
    try {
      const response = await api.post('/cart/', { product_id: product.id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.items); // Update state with response from server
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      const response = await api.delete('/cart/', {
        headers: { Authorization: `Bearer ${token}` },
        data: { product_id: product.id } // DELETE requests send data this way
      });
      setCartItems(response.data.items);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };
  
  // A simple clear cart that works client-side after checkout
  const clearCart = async () => {
        try {
          const token = getAuthToken();
          // Send a DELETE request with an empty body to clear the whole cart
          const response = await api.delete('/cart/', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCartItems(response.data.items || []);
        } catch (error) {
          console.error("Failed to clear cart:", error);
        }
      };

  // The value that will be available to all consuming components
  const value = {
    items: cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    loading, // We can also provide the loading state if needed elsewhere
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 5. Create a custom hook for easy access to the context
export const useCart = () => {
  return useContext(CartContext);
};  