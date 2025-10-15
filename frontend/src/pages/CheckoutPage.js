import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/api';
import { toast } from 'react-toastify';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipping_address: '',
    phone_number: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // FIX: Calculate total price using the correct nested structure
  const totalPrice = items.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (paymentMethod) => {
    if (!formData.shipping_address || !formData.phone_number || !formData.email) {
      setError("Please fill out all shipping details.");
      return;
    }
    setIsProcessing(true);
    setError('');

    if (paymentMethod === 'COD') {
      await createFinalOrder(null);
    } else if (paymentMethod === 'Razorpay') {
      try {
        const orderResponse = await api.post('/payments/razorpay/create/', { amount: totalPrice });
        const razorpayOrder = orderResponse.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'Fortepluie',
          description: 'Payment for your order',
          order_id: razorpayOrder.id,
          handler: async (response) => {
            try {
              await api.post('/payments/razorpay/verify/', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              await createFinalOrder(response.razorpay_payment_id);
            } catch (err) {
              setError('Payment verification failed. Please contact support.');
              setIsProcessing(false);
            }
          },
          prefill: {
            email: formData.email,
            contact: formData.phone_number,
          },
          theme: { color: '#3056D3' }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        setIsProcessing(false);
      } catch (err) {
        setError('Failed to initiate payment. Please try again.');
        setIsProcessing(false);
      }
    }
  };

  const createFinalOrder = async (razorpayPaymentId) => {
    const orderData = {
      ...formData,
      total_price: totalPrice,
      razorpay_payment_id: razorpayPaymentId,
      // FIX: Send the correct data structure for items
      items: items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      await api.post('/orders/create/', orderData);
      toast.success('Your order has been placed successfully!');
      await clearCart();
      navigate('/');
    } catch (err) {
      setError('Failed to save your order. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return <div className="checkout-container"><h2>Your cart is empty.</h2></div>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <div className="checkout-form">
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Shipping Information</h3>
            <div className="form-group">
              <label>Full Address</label>
              <textarea name="shipping_address" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone_number" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" onChange={handleChange} required />
            </div>
            {error && <p className="error-message">{error}</p>}
            
            <h3>Payment Method</h3>
            <div className="payment-options">
              <button onClick={() => handlePayment('Razorpay')} className="btn-place-order" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay ₹${totalPrice} with Razorpay`}
              </button>
              <button onClick={() => handlePayment('COD')} className="btn-cod" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Cash on Delivery'}
              </button>
            </div>
          </form>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          {items.map(item => (
            <div key={item.id} className="summary-item">
              {/* FIX: Display name and quantity from the correct nested object */}
              <span>{item.product.name} (x{item.quantity})</span>
              <span>₹{(item.quantity * item.product.price).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{totalPrice}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;