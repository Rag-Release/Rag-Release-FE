"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface BookCardProps {
  title: string;
  author: string;
  image: string;
  rating: number;
}

export default function BookCard({
  title,
  author,
  image,
  rating,
}: BookCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-48 h-72 m-2 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-semibold line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{author}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-400" : "text-gray-400"
                }`}
                fill={i < rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
