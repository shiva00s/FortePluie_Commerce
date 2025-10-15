// src/pages/CategoryProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import './Home.css'; // Reusing the same styles as the home page grid

const CategoryProductPage = () => {
  const { categorySlug } = useParams(); // Get slug from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      try {
        // Use the new filtering endpoint
        const response = await api.get(`/products/?category__slug=${categorySlug}`);
        setProducts(response.data.results);
      } catch (error) {
        console.error('Failed to fetch products for this category:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsByCategory();
  }, [categorySlug]); // Re-run when the category slug changes

  if (loading) {
    return <Spinner />; // Use Spinner
  }

  return (
    <div className="home-container">
      <h1 className="main-heading">Products in {categorySlug.replace('-', ' ')}</h1>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductPage;