// src/api/api.js
import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// This is the interceptor. It runs automatically before every single request.
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      // If a token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;