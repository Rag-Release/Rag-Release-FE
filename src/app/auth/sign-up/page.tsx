"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
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

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate inputs
    if (!formData) {
      setErrorMessage("Email and password are required.");
      return;
    }

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
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create Account
        </h2>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-300"
            >
              First Name
            </label>
            <Input
              id="fistName"
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
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <LogIn className="mr-2 h-4 w-4" /> Sign Up
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
