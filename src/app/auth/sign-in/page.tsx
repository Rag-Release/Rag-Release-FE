"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthService from "../../../services/authService";
import { setUser, setToken } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

// Sign In Form Component
const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate inputs
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      const response = await AuthService.loginUser(email, password);

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
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Welcome Back
      </h2>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-gray-700 text-white"
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
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full bg-gray-700 text-white"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox id="remember-me" />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-300"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link
              href="/auth/forget-password"
              passHref
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          type="submit" // Change to type submit for form submission
        >
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </Button>
        {/* Additional buttons and links */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
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
        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            passHref
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Create Account
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

// Main Component
export default function SignInPage() {
  return (
    <div
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SignInForm />
    </div>
  );
}
