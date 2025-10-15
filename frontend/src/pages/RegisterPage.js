// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './AuthForm.css'; // Reusing the same styles

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await api.post('/auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      });
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError('Failed to register. Username or email may already exist.');
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" onChange={handleChange} required />
        </div>
        <button type="submit" className="auth-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;