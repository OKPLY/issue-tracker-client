import { Alert } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8080";

const axiosInstance = axios.create();

// Add an interceptor to set the token for each request
axiosInstance.interceptors.request.use(
  (config) => {
    let token;

    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      token = user?.token;
    }

    if (token) {
      // Exclude sign in and sign up routes from token inclusion
      if (config.url !== "/signin" && config.url !== "/signup") {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle expired or invalid tokens
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration or invalid token error
      // You can redirect to the login page or display a message to the user
      Alert("Session expired. Please log in again.");
    }

    if (error.response?.status === 403) {
      toast.error("You are not authorized to perform this action.", {
        toastId: 1234567890,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
