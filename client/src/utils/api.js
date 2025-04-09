import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers.Authorization);
    } else {
      console.warn('No token found in localStorage');
    }
    return config;
  },
  error => {
    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  response => {
    // Ne pas gérer la redirection ici - elle est maintenant gérée dans authContext.js
    return response;
  },
  error => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

export default api;
