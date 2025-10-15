// src/pages/RequestPasswordResetPage.js
import React, { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import './AuthForm.css'; // Reuse the same styles as Login/Register

const RequestPasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/password_reset/', { email });
      toast.success('If an account with this email exists, a reset link has been sent.');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p style={{textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>Enter your email address and we will send you a link to reset your password.</p>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default RequestPasswordResetPage;