"use client";

import { format } from "date-fns";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Book,
  Edit3,
  Eye,
  Info,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: "Approved" | "Rejected" | "Pending";
  dateWritten: Date;
  dateReviewed: Date | null;
  dateApprovedRejected: Date | null;
  description: string;
  reviewComments: string;
  approvalHistory: {
    action: string;
    date: Date;
  }[];
  coverImage: string;
  price: number;
  salesDaily: number;
  salesMonthly: number;
  rating: number;
  totalSales: number;
  revenue: string;
  contributors: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
}

const initialBooks: Book[] = [
  {
    id: "1",
    title: "The Silent Echo",
    author: "Elena Martínez",
    coverImage: "/assets/images/book1.png?height=50&width=35",
    price: 29.99,
    salesDaily: 1.47,
    salesMonthly: 0.47,
    rating: 5.0,
    totalSales: 1600000,
    revenue: "$3.2M",
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
    genre: "Mystery",
    status: "Approved",
    dateWritten: new Date("2023-01-15"),
    dateReviewed: new Date("2023-02-01"),
    dateApprovedRejected: new Date("2023-02-10"),
    description:
      "A gripping mystery set in a small coastal town, where the disappearance of a local artist unravels dark secrets from the past.",
    reviewComments:
      "Excellent pacing and character development. Approved for publication.",
    approvalHistory: [
      { action: "Written", date: new Date("2023-01-15") },
      { action: "Reviewed", date: new Date("2023-02-01") },
      { action: "Approved", date: new Date("2023-02-10") },
    ],
  },
  {
    id: "2",
    title: "Quantum Dreams",
    author: "Dr. Aiden Chen",
    coverImage: "/assets/images/book1.png?height=50&width=35",
    price: 29.99,
    salesDaily: 1.47,
    salesMonthly: 0.47,
    rating: 5.0,
    totalSales: 1600000,
    revenue: "$3.2M",
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
    genre: "Science Fiction",
    status: "Pending",
    dateWritten: new Date("2023-03-20"),
    dateReviewed: null,
    dateApprovedRejected: null,
    description:
      "An exploration of consciousness and reality through the lens of quantum mechanics, following a brilliant physicist's journey through parallel universes.",
    reviewComments:
      "While well-written, the plot lacks originality. Suggested revisions before resubmission.",
    approvalHistory: [{ action: "Written", date: new Date("2023-03-20") }],
  },
  {
    id: "3",
    title: "Whispers of the Heart",
    coverImage: "/assets/images/book1.png?height=50&width=35",
    price: 29.99,
    salesDaily: 1.47,
    salesMonthly: 0.47,
    rating: 5.0,
    totalSales: 1600000,
    revenue: "$3.2M",
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
    author: "Sophia Andersen",
    genre: "Romance",
    status: "Rejected",
    dateWritten: new Date("2023-02-05"),
    dateReviewed: new Date("2023-02-28"),
    dateApprovedRejected: new Date("2023-03-05"),
    description:
      "A touching love story that spans decades, exploring the power of unspoken emotions and second chances.",
    reviewComments:
      "While well-written, the plot lacks originality. Suggested revisions before resubmission.",
    approvalHistory: [
      { action: "Written", date: new Date("2023-02-05") },
      { action: "Reviewed", date: new Date("2023-02-28") },
      { action: "Rejected", date: new Date("2023-03-05") },
    ],
  },
];

// Define a mapping for status colors
const statusColors = {
  New: "bg-yellow-500 text-white",
  "Under Review": "bg-orange-500 text-white",
  Approved: "bg-green-500 text-white",
  Published: "bg-blue-600 text-white",
  Draft: "bg-gray-600 text-white",
  Rejected: "bg-red-500 text-white",
  Archived: "bg-gray-600 text-white",
  Trashed: "bg-red-600 text-white",
  "In Progress": "bg-purple-500 text-white",
  Completed: "bg-green-500 text-white",
  "Pre-order": "bg-yellow-500 text-white",
  "Out of Stock": "bg-red-500 text-white",
  "In Stock": "bg-green-500 text-white",
  "Awaiting Payment": "bg-yellow-500 text-white",
  "Payment Received": "bg-green-500 text-white",
  "Payment Failed": "bg-red-500 text-white",
  "Payment Pending": "bg-yellow-500 text-white",
  "Order Received": "bg-green-500 text-white",
  "Order Processing": "bg-yellow-500 text-white",
  "Order Shipped": "bg-blue-600 text-white",
  "Order Delivered": "bg-green-500 text-white",
  "Order Canceled": "bg-red-500 text-white",
  "Order Returned": "bg-gray-600 text-white",
  "Order Refunded": "bg-gray-600 text-white",
  "Order Disputed": "bg-red-500 text-white",
  "Order Lost": "bg-red-500 text-white",
  "Order Damaged": "bg-red-500 text-white",
  "Order Completed": "bg-green-500 text-white",
  "Order Pending": "bg-yellow-500 text-white",
  "Order Approved": "bg-green-500 text-white",
  "Order Disapproved": "bg-red-500 text-white",
};

export default function BookManagementAdmin() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 1000;

  // const [books] = useState<BookData[]>([
  //   {
  //     id: "BK-2024-001",
  //     title: "The Art of Modern Fiction",
  //     coverImage: "/assets/images/book1.png?height=50&width=35",
  //     category: "Fiction",
  //     price: 29.99,
  //     salesDaily: 1.47,
  //     salesMonthly: 0.47,
  //     rating: 5.0,
  //     totalSales: 1600000,
  //     revenue: "$3.2M",
  //     status: "Published",
  //     contributors: [
  //       {
  //         id: "AUTH-001",
  //         name: "Sarah Mitchell",
  //         avatar: "/assets/images/author2.png?height=32&width=32",
  //         role: "Lead Author",
  //       },
  //       {
  //         id: "AUTH-002",
  //         name: "James Wilson",
  //         avatar: "/assets/images/author1.png?height=32&width=32",
  //         role: "Co-Author",
  //       },
  //     ],
  //   },
  //   {
  //     id: "BK-2024-002",
  //     title: "Digital Age Marketing",
  //     coverImage: "/assets/images/book2.png?height=50&width=35",
  //     category: "Business",
  //     price: 34.99,
  //     salesDaily: 1.15,
  //     salesMonthly: 0.32,
  //     rating: 4.8,
  //     totalSales: 600000,
  //     revenue: "$785K",
  //     status: "Under Review",
  //     contributors: [
  //       {
  //         id: "AUTH-003",
  //         name: "Emily Chen",
  //         avatar: "/assets/images/author2.png?height=32&width=32",
  //         role: "Author",
  //       },
  //     ],
  //   },
  //   // Add more books as needed
  // ]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleApprove = (id: string) => {
  //   setBooks(
  //     books.map((book) =>
  //       book.id === id
  //         ? {
  //             ...book,
  //             status: "Approved",
  //             dateApprovedRejected: new Date(),
  //             approvalHistory: [
  //               ...book.approvalHistory,
  //               { action: "Approved", date: new Date() },
  //             ],
  //           }
  //         : book
  //     )
  //   );
  // };

  // const handleReject = (id: string) => {
  //   setBooks(
  //     books.map((book) =>
  //       book.id === id
  //         ? {
  //             ...book,
  //             status: "Rejected",
  //             dateApprovedRejected: new Date(),
  //             approvalHistory: [
  //               ...book.approvalHistory,
  //               { action: "Rejected", date: new Date() },
  //             ],
  //           }
  //         : book
  //     )
  //   );
  // };

  // const handleDelete = (id: string) => {
  //   setBooks(books.filter((book) => book.id !== id));
  // };

  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
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
    <>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <main className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Book Management</h1>
              <p className="mt-2 text-gray-400">
                Manage written and published books as publication admin
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
              {" "}
              <Input
                placeholder="Search books..."
                className="max-w-sm bg-gray-900"
              />
              <Select defaultValue="New">
                <SelectTrigger className="w-[180px] bg-gray-900">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(statusColors).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Written</TableHead>
                  <TableHead>Date Reviewed</TableHead>
                  <TableHead>Date Approved/Rejected</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Contributors</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[
                            book.status as keyof typeof statusColors
                          ] || "bg-gray-500 text-white"
                        }
                      >
                        {book.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(book.dateWritten, "PP")}</TableCell>
                    <TableCell>
                      {book.dateReviewed
                        ? format(book.dateReviewed, "PP")
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {book.dateApprovedRejected
                        ? format(book.dateApprovedRejected, "PP")
                        : "N/A"}
                    </TableCell>
                    <TableCell>${book.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {book.rating}
                      </div>
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
                              <Link href={`/admin/books/view`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" />
                                View Book
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/admin/books/update`}
                                target="_blank"
                              >
                                <Edit3 className="mr-2 h-4 w-4" />
                                Update Book
                              </Link>
                            </DropdownMenuItem>
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Info className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-900 text-white">
                                <DialogHeader>
                                  <DialogTitle>{book.title}</DialogTitle>
                                  <DialogDescription>
                                    by {book.author}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">Genre:</span>
                                    <span className="col-span-3">
                                      {book.genre}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">Status:</span>
                                    <span className="col-span-3">
                                      <Badge
                                        className={
                                          statusColors[
                                            book.status as keyof typeof statusColors
                                          ] || "bg-gray-500 text-white"
                                        }
                                      >
                                        {book.status} - {book.genre}
                                      </Badge>
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">
                                      Description:
                                    </span>
                                    <p className="col-span-3">
                                      {book.description}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">
                                      Review Comments:
                                    </span>
                                    <p className="col-span-3">
                                      {book.reviewComments ||
                                        "No comments yet."}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-4 items-start gap-4">
                                    <span className="font-bold">
                                      Approval History:
                                    </span>
                                    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                                      {book.approvalHistory.map(
                                        (history, index) => (
                                          <div key={index} className="mb-2">
                                            <p className="font-semibold">
                                              {history.action}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                              {format(history.date, "PPpp")}
                                            </p>
                                          </div>
                                        )
                                      )}
                                    </ScrollArea>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
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
    </>
  );
}
