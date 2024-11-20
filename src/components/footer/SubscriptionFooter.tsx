"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Subscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to read? Get the latest updates!
        </h2>
        <p className="text-white text-lg mb-6">
          Join our newsletter and never miss out on new books and exclusive
          offers.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 bg-white text-gray-900"
            required
          />
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800"
          >
            <Send className="mr-2 h-4 w-4" /> Get Updates
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
