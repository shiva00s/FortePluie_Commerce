// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner'; // We're using the spinner
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Each card will appear 0.1s after the previous one
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await api.get('/products/');

        // --- THIS IS THE FIX ---
        // Gracefully handle both paginated and non-paginated responses.
        const data = response.data.results || response.data;
        setProducts(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]); // Ensure products is an array even on error
      } finally {
        setLoading(false); // ALWAYS stop loading
      }
    };

    fetchProducts();
  }, []);

  // Display the spinner while loading
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="home-container">
      <h1 className="main-heading">Our Premium Products</h1>
      
      <motion.div
        className="product-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
  );
};

export default Home;