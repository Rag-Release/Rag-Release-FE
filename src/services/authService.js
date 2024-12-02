// authService.js
import axiosInstance from "../axiosInstance";
import * as apiRoutes from "../apiRoutes";

class AuthService {
  signupUser = async (formData) => {
    try {
      const response = await axiosInstance.post(apiRoutes.SIGN_UP, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      console.log("Signup Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("Signup Error:", error);
      throw error; // Rethrow the error for handling in calling code
    }
  };

  loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post(apiRoutes.SIGN_IN, {
        email,
        password,
      });
      console.log("Login Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("Login Error:", error);
      throw error; // Rethrow the error for handling in calling code
    }
  };
}

// Example usage of the signupUser function
// const userData = {
//   email: "user.1@gmail.com",
//   password: "user.1@123A",
// };

// const authService = new AuthService();

// authService
//   .signupUser(userData)
//   .then((result) => {
//     console.log("User signed up successfully:", result);
//   })
//   .catch((err) => {
//     console.error("Error during signup:", err);
//   });

export default new AuthService();
