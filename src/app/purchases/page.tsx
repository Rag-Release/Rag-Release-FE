"use client";
import React from "react";
import { Book, Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  publishDate: string;
  price: number;
  status: "Available" | "In Progress" | "Completed";
  progress: number;
}

export default function Component() {
  const [books] = useState<BookData[]>([
    {
      id: "FWB12546798",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      publishDate: "11.12.2023",
      price: 29.99,
      status: "Available",
      progress: 0,
    },
    {
      id: "FWB12546777",
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      publishDate: "10.11.2024",
      price: 24.99,
      status: "In Progress",
      progress: 45,
    },
    {
      id: "FWB12546846",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      publishDate: "07.11.2024",
      price: 19.99,
      status: "Completed",
      progress: 100,
    },
    {
      id: "FWB12546212",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      publishDate: "18.10.2024",
      price: 34.99,
      status: "In Progress",
      progress: 72,
    },
  ]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">My Books</h1>

        <div className="rounded-lg border border-gray-800 bg-gray-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Price</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.publishDate}</TableCell>
                  <TableCell>${book.price}</TableCell>
                  {/* <TableCell>
                    <Badge
                      variant={
                        book.status === "Completed"
                          ? "secondary"
                          : book.status === "In Progress"
                          ? "default"
                          : "outline"
                      }
                    >
                      {book.status}
                      {book.status === "In Progress" && ` (${book.progress}%)`}
                    </Badge>
                  </TableCell> */}
                  <TableCell>
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
                          Read Book
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
