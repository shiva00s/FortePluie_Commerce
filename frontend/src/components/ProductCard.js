import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  // Get the 'items' array from the cart context
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const imageUrl = product.image;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Check if this specific product is already in the cart
  const isInCart = items.some(item => item.product.id === product.id);

  return (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-card">
          <div className="product-image-container">
            <img src={imageUrl} alt={product.name} className="product-image" />
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            
            {isInCart ? (
              // If in cart, show a button that links to the cart page
              <button onClick={(e) => { e.preventDefault(); navigate('/cart'); }} className="in-cart-btn">
                View in Cart
              </button>
            ) : (
              // Otherwise, show the original "Add to Cart" button
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;