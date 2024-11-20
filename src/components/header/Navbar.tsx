"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  User,
  Menu,
  X,
  ShoppingCart,
  Book,
  Users,
  Heart,
  PenTool,
  Star,
  LayoutDashboard,
  SquarePen,
  ListTodo,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({
  isSignedIn = true,
  userRole = "author", // Possible values: "common", "admin", "designer", "reviewer"
}: {
  isSignedIn?: boolean;
  userRole?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabClick = async (tab: string) => {
    setActiveTab(tab);
    await new Promise((resolve) => setTimeout(resolve, 0));
    // Hide dropdown after selecting an option
    if (dropdownOpen) {
      setDropdownOpen(false);
      setTimeout(() => setIsMenuOpen(false), 1000); // Hide after 1000ms
    }
  };

  // const toggleDropdown = () => {
  //   if (window.innerWidth >= 768) {
  //     // Only toggle on large screens
  //     setDropdownOpen(!dropdownOpen);
  //   }
  // };

  const renderDropdownMenu = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            <DropdownMenuItem>
              <Link
                href="/admin/dashboard"
                className={`flex items-center ${
                  activeTab === "dashboard" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/admin/users"
                className={`flex items-center ${
                  activeTab === "users" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("users")}
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/admin/books"
                className={`flex items-center ${
                  activeTab === "books" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("books")}
              >
                <Book className="mr-2 h-4 w-4" />
                Books
              </Link>
            </DropdownMenuItem>
          </>
        );

      case "designer":
        return (
          <>
            <DropdownMenuItem>
              <Link
                href="/graphic-designer/dashboard"
                className={`flex items-center ${
                  activeTab === "dashboard" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/graphic-designer/works-todo"
                className={`flex items-center ${
                  activeTab === "works-todo" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("works-todo")}
              >
                <PenTool className="mr-2 h-4 w-4" />
                Works ToDo
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/graphic-designer/portfolio"
                className={`flex items-center ${
                  activeTab === "portfolio" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("portfolio")}
              >
                <Star className="mr-2 h-4 w-4" />
                Portfolio
              </Link>
            </DropdownMenuItem>
          </>
        );

      case "reviewer":
        return (
          <>
            <DropdownMenuItem>
              <Link
                href="/reviewer/reviews"
                className={`flex items-center ${
                  activeTab === "reviews" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("reviews")}
              >
                <Heart className="mr-2 h-4 w-4" />
                My Reviews
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/reviewer/feedback"
                className={`flex items-center ${
                  activeTab === "feedback" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("feedback")}
              >
                <Star className="mr-2 h-4 w-4" />
                Feedback
              </Link>
            </DropdownMenuItem>
          </>
        );

      case "common":
      default:
        return (
          <>
            <DropdownMenuItem>
              <Link
                href="/account"
                className={`flex items-center ${
                  activeTab === "account" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("account")}
              >
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/purchases"
                className={`flex items-center ${
                  activeTab === "purchases" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("purchases")}
              >
                Purchases
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/wishlist"
                className={`flex items-center ${
                  activeTab === "wishlist" ? "text-green-600" : "text-ghost"
                }`}
                onClick={() => handleTabClick("wishlist")}
              >
                Wishlist
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/upgrade-account"
                className={`flex items-center ${
                  activeTab === "upgrade-account"
                    ? "text-green-600"
                    : "text-ghost"
                }`}
                onClick={() => handleTabClick("upgrade-account")}
              >
                Upgrade Account
              </Link>
            </DropdownMenuItem>
          </>
        );
    }
  };

  return (
    <>
      <nav className="bg-gray-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold bg-gradient-to-r from-green-600 to-white text-transparent bg-clip-text"
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
                <div className="flex items-center gap-4">
                  {/* Conditional Rendering Based on User Role */}
                  {userRole === "common" && (
                    <Link href="/shopping-cart">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-green-400"
                      >
                        <ShoppingCart className="h-6 w-6" />
                        <span className="sr-only">Shopping cart</span>
                      </Button>
                    </Link>
                  )}

                  {userRole === "author" && (
                    <Link href="/book/write">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-green-400"
                      >
                        <SquarePen className="h-6 w-6" />
                        <span className="sr-only">Book Write</span>
                      </Button>
                    </Link>
                  )}

                  {userRole === "designer" && (
                    <Link href="/graphic-designer/works-todo">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-green-400"
                      >
                        <ListTodo className="h-6 w-6" />
                        <span className="sr-only">Works ToDo</span>
                      </Button>
                    </Link>
                  )}

                  {userRole === "reviewer" && (
                    <Link href="/reviewer/reviews">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-green-400"
                      >
                        <BookOpenCheck className="h-6 w-6" />
                        <span className="sr-only">Review Book</span>
                      </Button>
                    </Link>
                  )}

                  {/* User Dropdown Menu */}
                  <div>
                    <DropdownMenu
                      open={dropdownOpen}
                      onOpenChange={setDropdownOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-green-400"
                        >
                          <User className="h-6 w-6" />
                          <span className="sr-only">User menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 bg-gray-900 text-white rounded-md shadow-lg"
                      >
                        {/* User Info */}
                        {/* Render dropdown menu items based on user role */}
                        {renderDropdownMenu()}
                        {/* Sign Out Option */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="hover:bg-green-200"
                          onClick={() => handleTabClick("sign-out")}
                        >
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ) : (
                // If not signed in, show Sign In button
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
                <div className="space-y-1">
                  {userRole === "common" && (
                    <>
                      <Link href="/account">
                        <Button variant="ghost" className="w-full text-left">
                          Accounts
                        </Button>
                      </Link>
                      <Link href="/purchases">
                        <Button variant="ghost" className="w-full text-left">
                          Purchases
                        </Button>
                      </Link>
                      <Link href="/wishlist">
                        <Button variant="ghost" className="w-full text-left">
                          Wishlist
                        </Button>
                      </Link>
                      <Link href="/upgrade-account">
                        <Button variant="ghost" className="w-full text-left">
                          Upgrade Account
                        </Button>
                      </Link>
                    </>
                  )}
                  {userRole === "admin" && (
                    <>
                      <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full text-left">
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/admin/users">
                        <Button variant="ghost" className="w-full text-left">
                          Users
                        </Button>
                      </Link>
                      <Link href="/admin/books">
                        <Button variant="ghost" className="w-full text-left">
                          Books
                        </Button>
                      </Link>
                    </>
                  )}
                  {userRole === "designer" && (
                    <>
                      <Link href="/graphic-designer/dashboard">
                        <Button variant="ghost" className="w-full text-left">
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/graphic-designer/works-todo">
                        <Button variant="ghost" className="w-full text-left">
                          Works ToDo
                        </Button>
                      </Link>
                      <Link href="/graphic-designer/portfolio">
                        <Button variant="ghost" className="w-full text-left">
                          Portfolio
                        </Button>
                      </Link>
                    </>
                  )}
                  {userRole === "reviewer" && (
                    <>
                      <Link href="/reviewer/reviews">
                        <Button variant="ghost" className="w-full text-left">
                          My Reviews
                        </Button>
                      </Link>
                      <Link href="/reviewer/feedback">
                        <Button variant="ghost" className="w-full text-left">
                          Feedback
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
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
    </>
  );
}
