import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import './CartPage.css';

const CartPage = () => {
  const { items, removeFromCart, loading } = useCart();

  // FIX: Calculate total price using the correct nested structure (item.product.price)
  const totalPrice = items.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2);

  if (loading) {
    return <Spinner />;
  }

  if (items.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your cart is empty.</h2>
        <Link to="/" className="btn-shop">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items-list">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            {/* FIX: Access the image via item.product.image */}
            <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
            
            <div className="cart-item-details">
              {/* FIX: Access name and price via item.product */}
              <h3>{item.product.name}</h3>
              <p>Price: ₹{item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            
            <div className="cart-item-actions">
              <p className="item-total">Subtotal: ₹{(item.quantity * item.product.price).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.product)} className="remove-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ₹{totalPrice}</h3>
        <Link to="/checkout" className="btn-checkout">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default CartPage;