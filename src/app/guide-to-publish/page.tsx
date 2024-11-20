"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Barcode,
  BookOpen,
  Edit,
  Palette,
  Printer,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "Writing and Editing",
    icon: Edit,
    content:
      "Complete your manuscript and ensure it is thoroughly edited and proofread. Consider hiring a professional editor to polish your work.",
  },
  {
    title: "Choosing a Publishing Method",
    icon: BookOpen,
    content:
      "Decide between traditional publishing (submitting to a local publisher) or self-publishing (handling the process yourself or using online platforms).",
  },
  {
    title: "Obtaining an ISBN",
    icon: Barcode,
    content:
      "Apply for an ISBN (International Standard Book Number) from the National Library and Documentation Services Board (NLDSB) in Sri Lanka.",
  },
  {
    title: "Design and Layout",
    icon: Palette,
    content:
      "Create an eye-catching cover design and format the interior layout of your book to meet print or e-book standards.",
  },
  {
    title: "Printing the Book",
    icon: Printer,
    content:
      "If choosing the print route, find a local printing company such as Vijitha Yapa Publications, M.D. Gunasena, or independent printers.",
  },
  {
    title: "Distribution to Bookstores",
    icon: ShoppingBag,
    content:
      "Distribute printed copies to local bookstores such as Sarasavi Bookshop, MD Gunasena, or Vijitha Yapa Bookshop.",
  },
];

export default function BookPublishingGuide() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          How to Publish a Book in Sri Lanka
        </h1>
        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center cursor-pointer ${
                  activeStep === index ? "text-blue-400" : "text-gray-400"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full border-2 ${
                      activeStep === index
                        ? "border-blue-400"
                        : "border-gray-600"
                    } flex items-center justify-center`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-0.5 h-16 ${
                        activeStep > index ? "bg-blue-400" : "bg-gray-600"
                      }`}
                    />
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  {activeStep === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 text-gray-300"
                    >
                      {step.content}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
