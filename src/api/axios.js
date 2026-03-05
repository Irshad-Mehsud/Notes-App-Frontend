import axios from "axios";

// Create instance

const API_BASE_URL = "https://notes-app-backend-khaki.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // required for HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: request timeout (10s)
});

// ============================
// Response Interceptor
// ============================

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If server responds with 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.warn("Session expired. Redirecting to login...");

      // Optional: clear frontend state here if needed
      // Example: localStorage.clear()

      window.location.href = "/login";
    }

    // If server error
    if (error.response?.status === 500) {
      console.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;