// axiosInstance.js
import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  // baseURL: "https://user-auth-service-production-5d65.up.railway.app/api", // Base URL for all requests
  baseURL: "https://user-auth-service-production-a3b9.up.railway.app/api", // Base URL for all requests
  timeout: 10000, // Set a timeout for requests (10 seconds)
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Ensure the response structure matches expectations
    if (response.data && response.data.status === "success") {
      return response.data;
    }
    return Promise.reject("Unexpected response structure");
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);

      // Handle CORS errors explicitly
      if (error.response.status === 403 || error.response.status === 401) {
        console.error("CORS or authentication error");
      }

      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error("Error Request:", error.request);
      return Promise.reject("No response received from server.");
    } else {
      console.error("Error Message:", error.message);
      return Promise.reject("Error in setup: " + error.message);
    }
  }
);

export default axiosInstance;
