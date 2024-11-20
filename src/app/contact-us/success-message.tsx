import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
      <h3 className="mt-2 text-xl font-medium text-white">Message Sent!</h3>
      <p className="mt-1 text-gray-300">
        Thank you for contacting us. We'll get back to you soon.
      </p>
    </motion.div>
  );
}
