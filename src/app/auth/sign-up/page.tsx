"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthService from "../../../services/authService";
import { setUser, setToken } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const MIN_PASSWORD_LENGTH = 8;
  const STRENGTH_LEVELS = 4;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const dispatch = useDispatch<AppDispatch>();

  /**
   * Handles the change event for input fields in the sign-up form.
   * Updates the form data state with the new value and calculates the password strength if the changed field is the password.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the input field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      const lengthScore = value.length >= MIN_PASSWORD_LENGTH ? 1 : 0;
      const complexityScore = [
        /[A-Z]/.test(value),
        /[a-z]/.test(value),
        /\d/.test(value),
        /[^A-Za-z0-9]/.test(value),
      ].filter(Boolean).length;
      const strength = Math.min(lengthScore + complexityScore, STRENGTH_LEVELS);
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate inputs
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await AuthService.signupUser(formData);

      console.log("Login Successful:", response);

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      window.location.href = "/";

      // Handle successful login (e.g., redirect user)
    } catch (error: unknown) {
      console.error("Login Error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Sign up failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create Account
        </h2>

        {errorMessage && (
          <div className="text-red-500 bg-red-500/10 p-3 rounded-md mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-300"
            >
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-300"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500
 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500
 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing Up...
              </div>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Sign Up
              </>
            )}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full bg-white hover:bg-gray-100 text-gray-900"
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Google
            </Button>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  passwordStrength === 0
                    ? "bg-red-500"
                    : passwordStrength < 3
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Password strength:{" "}
              {passwordStrength === 0
                ? "Weak"
                : passwordStrength < 3
                ? "Medium"
                : "Strong"}
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
