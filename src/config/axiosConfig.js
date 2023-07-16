import { Alert } from '@mui/material';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080";

const axiosInstance = axios.create();

// Add an interceptor to set the token for each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
      // Exclude sign in and sign up routes from token inclusion
      if (config.url !== '/signin' && config.url !== '/signup') {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

// Add an interceptor to handle expired or invalid tokens
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Handle token expiration or invalid token error
      // You can redirect to the login page or display a message to the user
     Alert('Session expired. Please log in again.');
    }
    return Promise.reject(error);
});

export default axiosInstance;
