// src/utils/auth.js

// Function to store the token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Function to retrieve the token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};