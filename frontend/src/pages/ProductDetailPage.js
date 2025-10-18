import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="product-detail-container"><p className="error-message">{error}</p></div>;
  }

  if (!product) {
    return null;
  }

  // --- THIS IS THE FIX ---
  // We apply the same logic here to prevent the duplicated URL.
  const imageUrl = product.image && product.image.startsWith('http')
    ? product.image
    : `http://localhost:8000${product.image}`;

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        <div className="product-detail-image">
          {/* Use the corrected imageUrl variable here */}
          <img src={imageUrl} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-category">{product.category.name}</p>
          <p className="product-price-detail">₹{product.price}</p>
          <p className="product-description">{product.description}</p>
          <button onClick={handleAddToCart} className="btn-add-to-cart-detail">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;