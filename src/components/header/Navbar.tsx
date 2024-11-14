"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "../../../temp/button";
import { Input } from "../../../temp/input";

export default function Navbar({
  isSignedIn = true,
}: {
  isSignedIn?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text"
              >
                RR Logo
              </motion.div>
            </Link>
          </div>
          <div className="hidden md:block flex-1 mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search Books, Authors, and Shop"
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="hidden md:block">
            {isSignedIn ? (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-800"
              >
                <User className="h-6 w-6" />
              </Button>
            ) : (
              <Link href="/auth/sign-in">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Input
              type="search"
              placeholder="Search Books, Authors, and Shop"
              className="w-full bg-gray-800 text-white mb-2"
            />
            {isSignedIn ? (
              <Button variant="ghost" className="w-full text-left">
                Profile
              </Button>
            ) : (
              <Link href="/auth/sign-in" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
