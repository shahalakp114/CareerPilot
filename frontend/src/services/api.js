
import axios from "axios";

const API = axios.create({
    // Use the deployed backend URL in production; keep localhost for development.
    baseURL: `${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}/api`,
    timeout: 30000
});

// Automatically attach JWT token to requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle API errors
API.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
        }

        return Promise.reject(error);
    }
);

export default API;
