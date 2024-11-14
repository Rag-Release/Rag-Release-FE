"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./contact-form";
import SuccessMessage from "./success-message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const contactOptions = [
  "I want to publish a book",
  "I'm an author looking for representation",
  "I want to buy books in bulk",
  "I have a question about an order",
  "I want to report an issue with a book",
  "I'm interested in rights and permissions",
  "I want to work for Rag Release",
  "I need something else",
];

export default function ContactPage() {
  const [option, setOption] = useState(contactOptions[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-4xl w-full"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-white mb-4">
              Have questions? Shoot us an email.
            </h1>
            <p className="text-gray-300 mb-6">
              We are an industry-leading publisher that provides the latest
              books and insights about literature, publishing, and how it
              impacts your career.
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                How can we help?
              </h2>
              <Select onValueChange={setOption} defaultValue={option}>
                <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {contactOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-gray-300">
              <p>
                Have a question for us or feedback? Please fill out the form to
                reach us.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            {!isSubmitted ? (
              <ContactForm option={option} setIsSubmitted={setIsSubmitted} />
            ) : (
              <SuccessMessage />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
