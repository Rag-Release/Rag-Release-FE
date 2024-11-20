"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
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
        <Link
          href="/auth/sign-in"
          className="text-indigo-400 hover:text-indigo-300 flex items-center mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Send className="mr-2 h-4 w-4" /> Reset Password
            </Button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <svg
              className="mx-auto h-12 w-12 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-white">
              Check your email
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              We've sent a password reset link to {email}. Please check your
              inbox and follow the instructions to reset your password.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Back to Reset Password
            </Button>
          </motion.div>
        )}
        <p className="mt-8 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
