"use client";

import { motion } from "framer-motion";
import { Book } from "lucide-react";

interface AuthorCardProps {
  name: string;
  image: string;
  bookCount: number;
}

export default function AuthorCard({
  name,
  image,
  bookCount,
}: AuthorCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-48 h-48 m-2 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-semibold truncate">{name}</h3>
          <div className="flex items-center mt-2 text-gray-300">
            <Book className="h-4 w-4 mr-1" />
            <span className="text-sm">{bookCount} books</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
