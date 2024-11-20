"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  CheckCircle,
  MoreHorizontal,
  Info,
  XCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  dateJoined: Date;
  datePromoted: Date;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Editor",
    status: "Active",
    dateJoined: new Date("2023-01-15"),
    datePromoted: new Date("2023-02-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Author",
    status: "Inactive",
    dateJoined: new Date("2023-02-20"),
    datePromoted: new Date("2023-03-20"),
  },
  // Add more users as needed
];

// Define a mapping for status colors
const statusColors = {
  Pending: "bg-yellow-500 text-white",
  Approved: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
  Archived: "bg-gray-600 text-white",
};

export default function UserManagementAdmin() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 1000;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1)
  );

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
    }
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <main className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="mt-2 text-gray-400">
                Manage users as publication admin
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
              <Select defaultValue="Pending">
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.status === "Active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(user.dateJoined, "PP")}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-gray-900 text-white"
                          >
                            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                            <DropdownMenuItem
                            //   onClick={() => handleApprove(book.id)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            //   onClick={() => handleReject(book.id)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Reject</span>
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
                                  <DialogTitle>{user.name}</DialogTitle>
                                  <DialogDescription>
                                    by {user.email}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">Role:</span>
                                    <span className="col-span-3">
                                      {user.role}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">Status:</span>
                                    <span className="col-span-3">
                                      <Badge
                                        className={
                                          user.status === "Active"
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                        }
                                      >
                                        {user.status}
                                      </Badge>
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">
                                      Date Joined:
                                    </span>
                                    <p className="col-span-3">
                                      {format(user.dateJoined, "PP")}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">
                                      Date Promoted:
                                    </span>
                                    <p className="col-span-3">
                                      {format(user.datePromoted, "PP")}
                                    </p>
                                  </div>
                                  {/* <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">
                                      Review Comments:
                                    </span>
                                    <p className="col-span-3">
                                      {user.reviewComments ||
                                        "No comments yet."}
                                    </p>
                                  </div> */}
                                  {/* <div className="grid grid-cols-4 items-start gap-4">
                                    <span className="font-bold">
                                      Approval History:
                                    </span>
                                    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                                      {user.approvalHistory.map(
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
                                  </div> */}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteClick(user)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
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
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{selectedUser?.name}"? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <Alert variant="destructive">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Deleting this user will remove all associated data.
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
                  Delete User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </>
  );
}
