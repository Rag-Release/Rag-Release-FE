// authService.js
import axiosInstance from "../axiosInstance";
import * as apiRoutes from "../apiRoutes";
import { get } from "http";

class AccountService {
  getSingleProfile = async (id) => {
    try {
      const response = await axiosInstance.get(apiRoutes.GET_SINGLE_PROFILE, {
        id,
      });
      console.log("Get Single Profile Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("Get Single Profile Error:", error);
      throw error; // Rethrow the error for handling in calling code
    }
  };

  updateProfile = async (id, formData) => {
    try {
      const response = await axiosInstance.put(
        `${apiRoutes.UPDATE_PROFILE}/${id}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          cardExpiry: formData.cardExpiry,
          cardNumber: formData.cardNumber,
          company: formData.company,
          deliveryAddress: formData.deliveryAddress,
          fiscalCode: formData.fiscalCode,
          homeAddress: formData.homeAddress,
          phoneNumber: formData.phoneNumber,
          pickupPoint: formData.pickupPoint,
        }
      );
      return response;
    } catch (error) {
      console.error("Update Profile Error:", error);
      throw error;
    }
  };

  deleteProfile = async (id) => {
    try {
      const response = await axiosInstance.delete(apiRoutes.DELETE_PROFILE, {
        id,
      });
      console.log("Delete Profile Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("Delete Profile Error:", error);
      throw error; // Rethrow the error for handling in calling code
    }
  };

  softDeleteProfile = async (id) => {
    try {
      const response = await axiosInstance.delete(
        apiRoutes.SOFT_DELETE_PROFILE,
        {
          id,
        }
      );
      console.log("Soft Delete Profile Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("Soft Delete Profile Error:", error);
      throw error; // Rethrow the error for handling in calling code
    }
  };

  getAllProfiles = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.GET_ALL_PROFILES);
      console.log("Get All Profiles Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("Get All Profiles Error:", error);
      throw error; // Rethrow the error for handling in calling code
    }
  };

  verifyEmail = async (id) => {
    try {
      const response = await axiosInstance.put(apiRoutes.VERIFY_EMAIL, {
        id,
      });
      console.log("Verify Email Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("Verify Email Error:", error);
      throw error; // Rethrow the error for handling in calling code
    }
  };

  deVerifyEmail = async (id) => {
    try {
      const response = await axiosInstance.put(apiRoutes.DE_VERIFY_EMAIL, {
        id,
      });
      console.log("De-Verify Email Successful:", response);
      return response; // Return the response for further processing if needed
    } catch (error) {
      console.error("De-Verify Email Error:", error);
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

export default new AccountService();
