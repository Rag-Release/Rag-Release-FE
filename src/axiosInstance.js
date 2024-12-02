// axiosInstance.js
import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "https://user-auth-service-production-5d65.up.railway.app/api", // Base URL for all requests
  timeout: 10000, // Set a timeout for requests (10 seconds)
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with an error status code
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);
      return Promise.reject(error.response.data); // Reject with the error data
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error Request:", error.request);
      return Promise.reject("No response received from server.");
    } else {
      // Something happened while setting up the request
      console.error("Error Message:", error.message);
      return Promise.reject("Error in setup: " + error.message);
    }
  }
);

export default axiosInstance;
