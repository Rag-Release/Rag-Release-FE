"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does the book publishing process work?",
    answer:
      "Our publishing process involves several steps: manuscript submission, editorial review, content editing, cover design, formatting, proofreading, and finally, publication. We work closely with authors throughout this journey to ensure a high-quality final product.",
  },
  {
    question: "What royalties do authors receive?",
    answer:
      "Authors typically receive 10-15% royalties on print books and 25-50% on ebooks. However, exact percentages can vary based on factors such as book format, distribution channels, and individual contracts. We offer competitive rates and transparent royalty reporting.",
  },
  {
    question: "Do you offer editing services?",
    answer:
      "Yes, we provide comprehensive editing services including developmental editing, copy editing, and proofreading. Our team of experienced editors works to enhance your manuscript while preserving your unique voice and vision.",
  },
  {
    question: "How long does it take to publish a book?",
    answer:
      "The publishing timeline can vary depending on the book's complexity and the author's responsiveness. On average, it takes 6-12 months from manuscript acceptance to publication. We provide a detailed timeline at the start of each project.",
  },
  {
    question: "What formats are your books available in?",
    answer:
      "We publish books in various formats including hardcover, paperback, ebook (Kindle, ePub), and audiobook. The specific formats for each title depend on the book's content and target audience.",
  },
  {
    question: "How can I submit my manuscript for consideration?",
    answer:
      "You can submit your manuscript through our online submission portal. Please include a brief synopsis, author bio, and the first three chapters of your work. Our editorial team reviews all submissions and aims to respond within 4-6 weeks.",
  },
];

const FAQItem = ({
  item,
  isOpen,
  toggleOpen,
}: {
  item: FAQItem;
  isOpen: boolean;
  toggleOpen: () => void;
}) => (
  <div className="border-b border-gray-700">
    <button
      className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      onClick={toggleOpen}
    >
      <span className="text-lg font-medium text-white">{item.question}</span>
      <ChevronDown
        className={`w-5 h-5 text-indigo-400 transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="py-4 text-gray-300">{item.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                toggleOpen={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
