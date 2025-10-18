// src/api/api.js
import axios from 'axios';
import { getAuthToken } from '../utils/auth';

// Use the production URL if it exists, otherwise fall back to localhost
const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://fortepluie.com/api'
    : 'http://127.0.0.1:8000/api'
  );

const api = axios.create({
  baseURL: API_URL,
});

// The interceptor automatically adds the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;