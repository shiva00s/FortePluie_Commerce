// src/components/admin/ProductManagement.js
import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { getAuthToken } from '../../utils/auth';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const token = getAuthToken();

  const fetchProducts = async () => {
    try {
      const response = await api.get('/admin/products/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // 1. Make data fetching more robust
      const data = Array.isArray(response.data) ? response.data : response.data.results;
      setProducts(data || []); // Ensure it's always an array
    } catch (err) {
      setError('Failed to fetch products.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin/categories/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // 2. Also make this robust
      const data = Array.isArray(response.data) ? response.data : response.data.results;
      setCategories(data || []); // Ensure it's always an array
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setCurrentProduct({ ...currentProduct, image: e.target.files[0] });
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/admin/products/${productId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct({ ...product, category: product.category.id, image: null });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({ name: '', description: '', price: '', category: '', image: null });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', currentProduct.name);
    formData.append('description', currentProduct.description);
    formData.append('price', currentProduct.price);
    formData.append('category', currentProduct.category);
    if (currentProduct.image) {
      formData.append('image', currentProduct.image);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (isEditing) {
        await api.patch(`/admin/products/${currentProduct.id}/`, formData, config);
      } else {
        await api.post('/admin/products/', formData, config);
      }
      fetchProducts();
      setShowForm(false);
    } catch (err) {
      alert('Failed to save product. Check all fields.');
      console.error(err.response ? err.response.data : err);
    }
  };

  return (
    <div className="product-management">
      <div className="pm-header">
        <h2>Manage Products</h2>
        <button onClick={handleAddNew} className="btn-add-new">Add New Product</button>
      </div>

      {showForm && (
        <div className="product-form-container">
          <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <input name="name" value={currentProduct.name} onChange={handleInputChange} placeholder="Product Name" required />
            <textarea name="description" value={currentProduct.description} onChange={handleInputChange} placeholder="Description" required />
            <input name="price" value={currentProduct.price} onChange={handleInputChange} type="number" step="0.01" placeholder="Price" required />
            <select name="category" value={currentProduct.category} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <input name="image" onChange={handleFileChange} type="file" accept="image/*" />
            <div className="form-actions">
              <button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="product-list-admin">
        {products.map(product => (
            <div key={product.id} className="product-list-item">
                <span>{product.name}</span>
                <div>
                    <button onClick={() => handleEdit(product)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="btn-delete">Delete</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;