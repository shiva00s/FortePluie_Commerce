// src/pages/CategoriesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Spinner from '../components/Spinner';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories/');
        // --- THIS IS THE FIX ---
        // Check if the response has a 'results' key (for pagination)
        // and ensure we are always setting an array to the state.
        const data = response.data.results || response.data;
        setCategories(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <Spinner />; // Use Spinner
  }

  return (
    <div className="categories-container">
      <h1>Browse by Category</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.id} to={`/categories/${category.slug}`} className="category-card">
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;