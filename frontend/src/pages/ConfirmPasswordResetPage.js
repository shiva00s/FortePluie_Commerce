// src/pages/ConfirmPasswordResetPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import './AuthForm.css';

const ConfirmPasswordResetPage = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/password_reset/confirm/', { token, password });
      toast.success('Your password has been reset successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error('Invalid or expired token. Please request a new reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Set New Password</h2>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm New Password</label>
          <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ConfirmPasswordResetPage;