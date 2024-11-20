"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  Eye,
  Heart,
  MoreHorizontal,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BookData {
  id: string;
  title: string;
  author: string;
  genre: string;
  dateAdded: string;
  price: number;
  rating: number;
  totalWishes: number;
  availability: "In Stock" | "Pre-order" | "Out of Stock";
  coverImage: string;
}

export default function Component() {
  const [books] = useState<BookData[]>([
    {
      id: "FWB12546798",
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      author: "Gabrielle Zevin",
      genre: "Literary Fiction",
      dateAdded: "11.12.2023",
      price: 24.99,
      rating: 4.5,
      totalWishes: 2847,
      availability: "In Stock",
      coverImage: "/assets/images/book1.png?height=50&width=35",
    },
    {
      id: "FWB12546777",
      title: "Demon Copperhead",
      author: "Barbara Kingsolver",
      genre: "Contemporary Fiction",
      dateAdded: "10.11.2024",
      price: 28.99,
      rating: 4.8,
      totalWishes: 3156,
      availability: "In Stock",
      coverImage: "/assets/images/book2.png?height=50&width=35",
    },
    {
      id: "FWB12546846",
      title: "The Light We Carry",
      author: "Michelle Obama",
      genre: "Memoir",
      dateAdded: "07.11.2024",
      price: 32.5,
      rating: 4.9,
      totalWishes: 5423,
      availability: "Pre-order",
      coverImage: "/assets/images/book1.png?height=50&width=35",
    },
    {
      id: "FWB12546212",
      title: "Lessons in Chemistry",
      author: "Bonnie Garmus",
      genre: "Historical Fiction",
      dateAdded: "18.10.2024",
      price: 27.99,
      rating: 4.7,
      totalWishes: 4231,
      availability: "Out of Stock",
      coverImage: "/assets/images/book2.png?height=50&width=35",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Wishlist Books</h1>
          <Badge variant="secondary" className="text-sm">
            {books.length} Books
          </Badge>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Total Wishes</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-12 w-8 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{book.title}</div>
                        <div className="text-sm text-gray-400">#{book.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.dateAdded}</TableCell>
                  <TableCell>${book.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>{book.totalWishes.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        book.availability === "In Stock"
                          ? "default"
                          : book.availability === "Pre-order"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {book.availability}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Book className="mr-2 h-4 w-4" />
                            Preview Book
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Add to Cart
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Remove from Wishlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
