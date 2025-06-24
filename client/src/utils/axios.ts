import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if needed
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear all auth data
      localStorage.removeItem('token');
      
      // Only redirect to login if not already on login page
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        // Store the current path to redirect back after login
        sessionStorage.setItem('redirectPath', currentPath);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;