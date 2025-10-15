// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { setAuthToken } from '../utils/auth';
import { Link } from 'react-router-dom';
import './AuthForm.css'; // We'll create a shared CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/token/', {
        username,
        password,
      });
      setAuthToken(response.data.access); // Store the access token
      // You might want to store response.data.refresh as well for token refreshing
      navigate('/'); // Redirect to home page on successful login
      window.location.reload(); // Force a reload to update header, etc.
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login failed:', err);
    }
  };

  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
        <div className="form-footer-link">
                    <Link to="/request-password-reset">Forgot Password?</Link>
                </div>
      </form>
    </div>
  );

};

export default LoginPage;