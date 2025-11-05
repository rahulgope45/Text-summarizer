import axios from 'axios';

const getBackendURL = () => {
  if (import.meta.env.PROD) {
    return "https://text-summarizer-1-gadp.onrender.com";
  }
  return "http://localhost:3002";
};

const api = axios.create({
    baseURL: getBackendURL(),
    withCredentials: false
});

// Add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle 401 errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;