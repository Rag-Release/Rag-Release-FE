"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Use next/navigation instead of next/router
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { LightCard } from "../../../../components/card/LightCard";
import {
  Book,
  User,
  PenTool,
  CheckCircle,
  XCircle,
  Edit,
  Send,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Contributor {
  id: string;
  name: string;
  role: "Reviewer" | "Designer";
  avatar: string;
}

interface Bookshop {
  id: string;
  name: string;
  location: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  status: "Pending" | "Approved" | "Rejected" | "Published";
  coverImage: string;
  description: string;
  genre: string;
  reviewComments: string;
  contributors: Contributor[];
  contract?: {
    royaltyRate: number;
    advancePayment: number;
    contractTerms: string;
  };
  publication?: {
    isbn: string;
    publicationDate: string;
    printRun: number;
    distribution: {
      bookshopId: string;
      quantity: number;
    }[];
  };
}

const statusColors = {
  New: "bg-yellow-500 text-white",
  "Under Review": "bg-orange-500 text-white",
  Pending: "bg-yellow-500 text-white",
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

const bookshops: Bookshop[] = [
  { id: "bs1", name: "City Lights Books", location: "San Francisco, CA" },
  { id: "bs2", name: "Powell's City of Books", location: "Portland, OR" },
  { id: "bs3", name: "The Strand", location: "New York City, NY" },
  { id: "bs4", name: "Shakespeare and Company", location: "Paris, France" },
  { id: "bs5", name: "Foyles", location: "London, UK" },
];

export default function BookApprovalManagement() {
  const router = useRouter();

  const { id } = useParams(); // Replace router.query.id
  const { toast } = useToast();

  const [book, setBook] = useState<Book>({
    id: id as string,
    title: "The Silent Echo",
    author: "Elena Martínez",
    status: "Pending",
    coverImage: "/assets/images/author2.png?height=180&width=120",
    description:
      "A gripping mystery set in a small coastal town, where the disappearance of a local artist unravels dark secrets from the past.",
    genre: "Mystery",
    reviewComments: "",
    contributors: [
      {
        id: "c1",
        name: "John Doe",
        role: "Reviewer",
        avatar: "/assets/images/author2.png",
      },
      {
        id: "c2",
        name: "Jane Smith",
        role: "Reviewer",
        avatar: "/assets/images/author1.png",
      },
      {
        id: "c3",
        name: "Alex Johnson",
        role: "Designer",
        avatar: "/assets/images/author2.png",
      },
    ],
  });

  const handleStatusChange = (
    newStatus: "Pending" | "Approved" | "Rejected" | "Published"
  ) => {
    setBook({ ...book, status: newStatus });
  };

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const reviewComments = formData.get("reviewComments") as string;
      setBook({ ...book, reviewComments });
      toast({
        title: "Success",
        description: "Review submitted successfully!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review.",
        variant: "destructive",
      });
    }
  };

  const handleContractSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const royaltyRate = parseFloat(formData.get("royaltyRate") as string);
    const advancePayment = parseFloat(formData.get("advancePayment") as string);
    const contractTerms = formData.get("contractTerms") as string;

    if (!royaltyRate || !advancePayment || !contractTerms) {
      alert("All fields are required!");
      return;
    }

    setBook({
      ...book,
      contract: { royaltyRate, advancePayment, contractTerms },
    });
  };

  const handlePublicationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const publication = {
      isbn: formData.get("isbn") as string,
      publicationDate: formData.get("publicationDate") as string,
      printRun: parseInt(formData.get("printRun") as string),
      distribution: [],
    };
    setBook({ ...book, publication, status: "Published" });
  };

  const handleDistributionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDistribution = {
      bookshopId: formData.get("bookshop") as string,
      quantity: parseInt(formData.get("quantity") as string),
    };
    setBook({
      ...book,
      publication: {
        ...book.publication!,
        distribution: [
          ...(book.publication?.distribution || []),
          newDistribution,
        ],
      },
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6">
              Book Approval and Publication Management
            </h1>
            <div className="grid gap-6 md:grid-cols-2">
              <LightCard className="text-white">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>by {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-24 h-36 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {book.genre}
                      </p>
                      <Badge
                        className={`mt-2 ${
                          statusColors[book.status] || "bg-gray-300 text-black"
                        }`}
                      >
                        {book.status}
                      </Badge>

                      <p className="mt-2 text-sm">{book.description}</p>
                    </div>
                  </div>
                </CardContent>
              </LightCard>

              <LightCard className="text-white">
                <CardHeader>
                  <CardTitle>Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    {book.contributors.map((contributor) => (
                      <div
                        key={contributor.id}
                        className="flex items-center space-x-4 mb-4"
                      >
                        <Avatar>
                          <AvatarImage
                            src={contributor.avatar}
                            alt={contributor.name}
                          />
                          <AvatarFallback>
                            {contributor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contributor.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {contributor.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </LightCard>
            </div>

            <Tabs defaultValue="review" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="review">Review</TabsTrigger>
                <TabsTrigger
                  value="progress"
                  //   disabled={book.status !== "Pending"}
                >
                  Update Progress
                </TabsTrigger>
                <TabsTrigger
                  value="contract"
                  disabled={book.status !== "Approved"}
                >
                  Contract
                </TabsTrigger>
                <TabsTrigger value="publication" disabled={!book.contract}>
                  Publication
                </TabsTrigger>
              </TabsList>
              <TabsContent value="review">
                <LightCard className="text-white">
                  <CardHeader>
                    <CardTitle>Book Review</CardTitle>
                    <CardDescription>
                      Provide your review and comments for the book
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleReviewSubmit}>
                      <Textarea
                        name="reviewComments"
                        placeholder="Enter your review comments here..."
                        className="min-h-[200px]"
                        defaultValue={book.reviewComments}
                      />
                      <Button
                        type="submit"
                        className="mt-4 bg-green-500 hover:bg-green-700 hover:text-white"
                      >
                        <Send className="mr-2 h-4 w-4 " /> Submit Review
                      </Button>
                    </form>
                  </CardContent>
                </LightCard>
              </TabsContent>
              <TabsContent value="progress">
                <LightCard className="text-white">
                  <CardHeader>
                    <CardTitle>Update Book Status</CardTitle>
                    <CardDescription>
                      Select the new status for the book and submit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const newStatus = formData.get("status") as
                          | "Pending"
                          | "Approved"
                          | "Rejected"
                          | "Published";
                        handleStatusChange(newStatus);
                      }}
                    >
                      <div className="flex items-center gap-x-4">
                        {/* Select Status Dropdown */}
                        <div className="flex-1">
                          <Select name="status" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(statusColors).map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          className="bg-green-500 hover:bg-green-700 hover:text-white"
                        >
                          <Send className="mr-2 h-4 w-4" /> Update Status
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </LightCard>
              </TabsContent>

              <TabsContent value="contract">
                <LightCard className="text-white">
                  <CardHeader>
                    <CardTitle>Contract Details</CardTitle>
                    <CardDescription>
                      Enter the contract details for the approved book
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContractSubmit}>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="royaltyRate">
                              Royalty Rate (%)
                            </Label>
                            <Input
                              id="royaltyRate"
                              name="royaltyRate"
                              type="number"
                              step="0.1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="advancePayment">
                              Advance Payment ($)
                            </Label>
                            <Input
                              id="advancePayment"
                              name="advancePayment"
                              type="number"
                              step="100"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="contractTerms">Contract Terms</Label>
                          <Textarea
                            id="contractTerms"
                            name="contractTerms"
                            placeholder="Enter contract terms..."
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="mt-4 bg-green-500 hover:bg-green-700 hover:text-white"
                      >
                        <Edit className="mr-2 h-4 w-4" /> Save Contract
                      </Button>
                    </form>
                  </CardContent>
                </LightCard>
              </TabsContent>
              <TabsContent value="publication">
                <LightCard className="text-white">
                  <CardHeader>
                    <CardTitle>Publication Details</CardTitle>
                    <CardDescription>
                      Enter the publication details for the book
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePublicationSubmit}>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input id="isbn" name="isbn" required />
                          </div>
                          <div>
                            <Label htmlFor="publicationDate">
                              Publication Date
                            </Label>
                            <Input
                              id="publicationDate"
                              name="publicationDate"
                              type="date"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="printRun">Print Run</Label>
                          <Input
                            id="printRun"
                            name="printRun"
                            type="number"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="mt-4 bg-green-500 hover:bg-green-700 hover:text-white"
                      >
                        <Book className="mr-2 h-4 w-4" /> Publish Book
                      </Button>
                    </form>
                  </CardContent>
                </LightCard>
                {book.status === "Published" && (
                  <LightCard className="mt-6 text-white">
                    <CardHeader>
                      <CardTitle>Distribution Management</CardTitle>
                      <CardDescription>
                        Manage the distribution of the published book
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleDistributionSubmit}
                        className="grid gap-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bookshop">Bookshop</Label>
                            <Select name="bookshop" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a bookshop" />
                              </SelectTrigger>
                              <SelectContent>
                                {bookshops.map((shop) => (
                                  <SelectItem key={shop.id} value={shop.id}>
                                    {shop.name} - {shop.location}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                              id="quantity"
                              name="quantity"
                              type="number"
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit">
                          <ShoppingBag className="mr-2 h-4 w-4" /> Add
                          Distribution
                        </Button>
                      </form>
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value="distribution-list">
                          <AccordionTrigger>
                            View Current Distribution
                          </AccordionTrigger>
                          <AccordionContent>
                            <ScrollArea className="h-[200px]">
                              {book.publication?.distribution.map(
                                (dist, index) => {
                                  const bookshop = bookshops.find(
                                    (shop) => shop.id === dist.bookshopId
                                  );
                                  return (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center mb-2"
                                    >
                                      <span>
                                        {bookshop?.name} - {bookshop?.location}
                                      </span>
                                      <Badge variant="secondary">
                                        {dist.quantity} copies
                                      </Badge>
                                    </div>
                                  );
                                }
                              )}
                            </ScrollArea>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </LightCard>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
