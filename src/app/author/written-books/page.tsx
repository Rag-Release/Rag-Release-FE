"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Book,
  Edit3,
  Eye,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  coverImage: string;
  category: string;
  price: number;
  salesDaily: number;
  salesMonthly: number;
  rating: number;
  totalSales: number;
  revenue: string;
  status: "Published" | "Draft" | "Under Review";
  contributors: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
}

// Define a mapping for category colors
const categoryColors = {
  Fiction: "bg-blue-500 text-white",
  Business: "bg-green-500 text-white",
  Technology: "bg-purple-500 text-white",
};

// Define a mapping for status colors
const statusColors = {
  New: "bg-yellow-500 text-white", // Yellow for new books
  "Under Review": "bg-orange-500 text-white", // Orange for books under review
  Approved: "bg-green-500 text-white", // Green for approved books
  Published: "bg-blue-600 text-white", // Blue for published books
  Draft: "bg-gray-600 text-white", // Gray for drafts
  Rejected: "bg-red-500 text-white", // Red for rejected books
  Archived: "bg-gray-600 text-white", // Gray for archived books
  Trashed: "bg-red-600 text-white", // Red for trashed books
  "In Progress": "bg-purple-500 text-white", // Purple for books in progress
  Completed: "bg-green-500 text-white", // Green for completed books
  "Pre-order": "bg-yellow-500 text-white", // Yellow for pre-orders
  "Out of Stock": "bg-red-500 text-white", // Red for out-of-stock books
  "In Stock": "bg-green-500 text-white", // Green for in-stock books
  "Awaiting Payment": "bg-yellow-500 text-white", // Yellow for books awaiting payment
  "Payment Received": "bg-green-500 text-white", // Green for books with received payment
  "Payment Failed": "bg-red-500 text-white", // Red for books with failed payment
  "Payment Pending": "bg-yellow-500 text-white", // Yellow for books with pending payment
  "Order Received": "bg-green-500 text-white", // Green for orders received
  "Order Processing": "bg-yellow-500 text-white", // Yellow for orders processing
  "Order Shipped": "bg-blue-600 text-white", // Blue for orders shipped
  "Order Delivered": "bg-green-500 text-white", // Green for orders delivered
  "Order Canceled": "bg-red-500 text-white", // Red for orders canceled
  "Order Returned": "bg-gray-600 text-white", // Gray for orders returned
  "Order Refunded": "bg-gray-600 text-white", // Gray for orders refunded
  "Order Disputed": "bg-red-500 text-white", // Red for orders disputed
  "Order Lost": "bg-red-500 text-white", // Red for orders lost
  "Order Damaged": "bg-red-500 text-white", // Red for orders damaged
  "Order Completed": "bg-green-500 text-white", // Green for orders completed
  "Order Pending": "bg-yellow-500 text-white", // Yellow for orders pending
  "Order Approved": "bg-green-500 text-white", // Green for orders approved
  "Order Disapproved": "bg-red-500 text-white", // Red for orders disapproved
};

export default function Component() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 1000;

  const [books] = useState<BookData[]>([
    {
      id: "BK-2024-001",
      title: "The Art of Modern Fiction",
      coverImage: "/assets/images/book1.png?height=50&width=35",
      category: "Fiction",
      price: 29.99,
      salesDaily: 1.47,
      salesMonthly: 0.47,
      rating: 5.0,
      totalSales: 1600000,
      revenue: "$3.2M",
      status: "Published",
      contributors: [
        {
          id: "AUTH-001",
          name: "Sarah Mitchell",
          avatar: "/assets/images/author2.png?height=32&width=32",
          role: "Lead Author",
        },
        {
          id: "AUTH-002",
          name: "James Wilson",
          avatar: "/assets/images/author1.png?height=32&width=32",
          role: "Co-Author",
        },
      ],
    },
    {
      id: "BK-2024-002",
      title: "Digital Age Marketing",
      coverImage: "/assets/images/book2.png?height=50&width=35",
      category: "Business",
      price: 34.99,
      salesDaily: 1.15,
      salesMonthly: 0.32,
      rating: 4.8,
      totalSales: 600000,
      revenue: "$785K",
      status: "Under Review",
      contributors: [
        {
          id: "AUTH-003",
          name: "Emily Chen",
          avatar: "/assets/images/author2.png?height=32&width=32",
          role: "Author",
        },
      ],
    },
    // Add more books as needed
  ]);

  const handleDeleteClick = (book: BookData) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    // Implement delete logic here
    setDeleteDialogOpen(false);
    setSelectedBook(null);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Books</h1>
            <p className="mt-2 text-gray-400">
              Manage your written and published books
            </p>
          </div>
          <Link href="/book/write" target="_blank">
            <Button className="bg-pink-500 hover:bg-pink-600">
              <Pencil className="mr-2 h-4 w-4" />
              Write Book
            </Button>
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            {" "}
            {/* Reduced gap between filters */}
            <Input
              placeholder="Search books..."
              className="max-w-sm bg-gray-900"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-gray-900">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px] bg-gray-900">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="sales">Highest Sales</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Daily Sales</TableHead>
                <TableHead>Monthly Sales</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contributors</TableHead>
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
                  {/* Dynamic Category Badge */}
                  <TableCell>
                    {/* Apply dynamic classes based on category */}
                    <Badge
                      variant="outline"
                      className={
                        categoryColors[
                          book.category as keyof typeof categoryColors
                        ] || "bg-gray-600"
                      }
                    >
                      {book.category}
                    </Badge>
                  </TableCell>
                  <TableCell>${book.price}</TableCell>
                  <TableCell>{book.salesDaily}</TableCell>
                  <TableCell>{book.salesMonthly}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {book.rating}
                    </div>
                  </TableCell>
                  <TableCell>{book.totalSales.toLocaleString()}</TableCell>
                  <TableCell>{book.revenue}</TableCell>
                  {/* Dynamic Status Badge */}
                  <TableCell>
                    {/* Apply dynamic classes based on status */}
                    <Badge
                      variant="outline"
                      className={statusColors[book.status]}
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {book.contributors.map((contributor) => (
                        <Link
                          key={contributor.id}
                          href={`/authors/${contributor.id}`}
                          target="_blank"
                          className="relative"
                          title={`${contributor.name} - ${contributor.role}`}
                        >
                          <Avatar className="h-8 w-8 border-2 border-gray-900">
                            <AvatarImage
                              src={contributor.avatar}
                              alt={contributor.name}
                            />
                            <AvatarFallback>
                              {contributor.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      ))}
                    </div>
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
                        <DropdownMenuContent
                          align="end"
                          className="bg-gray-900 text-white rounded-md shadow-lg"
                        >
                          <DropdownMenuItem asChild>
                            <Link href={`/books/${book.id}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              View Book
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/books/${book.id}/edit`}
                              target="_blank"
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Edit Book
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/books/${book.id}/analytics`}>
                              <Book className="mr-2 h-4 w-4" />
                              Analytics
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteClick(book)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Book
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

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                currentPage === 1 ? "text-gray-400" : "text-gray-700"
              } bg-white border border-gray-300 rounded-md hover:bg-gray-500`}
            >
              ←
            </Button>
            {visiblePages.map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } border border-gray-300 rounded-md hover:bg-gray-200`}
              >
                {page}
              </Button>
            ))}
            {currentPage + 1 < totalPages && (
              <>
                <span className="text-gray-400">...</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(totalPages)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                currentPage === totalPages ? "text-gray-400" : "text-gray-700"
              } bg-white border border-gray-300 rounded-md hover:bg-gray-500`}
            >
              →
            </Button>
          </div>
        </div>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle>Delete Book</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedBook?.title}"? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Deleting this book will remove all associated data, including
                sales history and reader analytics.
              </AlertDescription>
            </Alert>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="hover:bg-red-700"
              >
                Delete Book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
