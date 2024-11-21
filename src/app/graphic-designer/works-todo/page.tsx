"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Upload } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Design {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: "Draft" | "Ready for Review" | "Revisions Needed" | "In Progress";
  feedback: Feedback[];
}

interface Feedback {
  id: string;
  user: string;
  avatar: string;
  comment: string;
  timestamp: string;
}

interface Feedback {
  id: string;
  user: string;
  avatar: string;
  comment: string;
  timestamp: string;
}

const initialDesigns: Design[] = [
  {
    id: "1",
    title: "The Silent Echo",
    author: "Elena Martínez",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "Ready for Review",
    feedback: [
      {
        id: "f1",
        user: "John Editor",
        avatar: "/assets/images/author1.png",
        comment:
          "The color scheme is great, but can we make the title more prominent?",
        timestamp: "2023-06-15T14:30:00Z",
      },
      {
        id: "f2",
        user: "Sarah Author",
        avatar: "/assets/images/author2.png",
        comment:
          "I love the overall design! Could we try a different font for the author name?",
        timestamp: "2023-06-16T09:15:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Quantum Dreams",
    author: "Dr. Aiden Chen",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "Draft",
    feedback: [],
  },
  {
    id: "3",
    title: "Echoes of Eternity",
    author: "Olivia Blackwood",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "Ready for Review",
    feedback: [
      {
        id: "f3",
        user: "Mark Publisher",
        avatar: "/assets/images/author1.png",
        comment:
          "Fantastic work! This cover will definitely catch readers' attention.",
        timestamp: "2023-06-14T16:45:00Z",
      },
    ],
  },
  {
    id: "4",
    title: "The Silent Echo",
    author: "Elena Martínez",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "In Progress",
    feedback: [
      {
        id: "f1",
        user: "John Editor",
        avatar: "/assets/images/author1.png",
        comment:
          "The color scheme is great, but can we make the title more prominent?",
        timestamp: "2023-06-15T14:30:00Z",
      },
      {
        id: "f2",
        user: "Sarah Author",
        avatar: "/assets/images/author2.png",
        comment:
          "I love the overall design! Could we try a different font for the author name?",
        timestamp: "2023-06-16T09:15:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "Quantum Dreams",
    author: "Dr. Aiden Chen",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "Draft",
    feedback: [],
  },
  {
    id: "6",
    title: "Echoes of Eternity",
    author: "Olivia Blackwood",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "In Progress",
    feedback: [
      {
        id: "f3",
        user: "Mark Publisher",
        avatar: "/assets/images/author1.png",
        comment:
          "Fantastic work! This cover will definitely catch readers' attention.",
        timestamp: "2023-06-14T16:45:00Z",
      },
    ],
  },
];

export default function WorksToDo() {
  const [designs, setDesigns] = useState<Design[]>(initialDesigns);
  const [filter, setFilter] = useState("all");

  //   const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const newDesign: Design = {
  //         id: (designs.length + 1).toString(),
  //         title: "New Design",
  //         author: "Unknown Author",
  //         coverImage: URL.createObjectURL(file),
  //         status: "Draft",
  //         feedback: [],
  //       };
  //       setDesigns([...designs, newDesign]);
  //     }
  //   };

  const handleStatusChange = (id: string, newStatus: Design["status"]) => {
    setDesigns(
      designs.map((design) =>
        design.id === id ? { ...design, status: newStatus } : design
      )
    );
  };

  const handleAddFeedback = (id: string, comment: string) => {
    const newFeedback: Feedback = {
      id: Math.random().toString(36).substr(2, 9),
      user: "Current User",
      avatar: "/assets/images/book1.png",
      comment,
      timestamp: new Date().toISOString(),
    };
    setDesigns(
      designs.map((design) =>
        design.id === id
          ? { ...design, feedback: [...design.feedback, newFeedback] }
          : design
      )
    );
  };

  const [uploadingDesign] = useState<string | null>(null);

  //   const handleFileUpload = (
  //     designId: string,
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       // Here you would typically upload the file to your server
  //       console.log(`Uploading file for design ${designId}:`, file.name);
  //       // For demonstration, we'll just show a success message
  //       setUploadingDesign(designId);
  //       setTimeout(() => {
  //         setUploadingDesign(null);
  //         // You might want to update the design's status or image here
  //       }, 2000);
  //     }
  //   };

  const filteredDesigns =
    filter === "all"
      ? designs
      : designs.filter((design) => design.status === filter);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6">
              Book Cover Design Management
            </h1>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Designs</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Ready for Review">
                      Ready for Review
                    </SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Revisions Needed">
                      Revisions Needed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog>
                <DialogTrigger asChild className="text-black">
                  <Button variant="outline">
                    <Info className="w-4 h-4 mr-2" />
                    Design Specifications
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white">
                  <DialogHeader>
                    <DialogTitle>Book Cover Design Specifications</DialogTitle>
                    <DialogDescription>
                      Follow these guidelines to ensure your design meets our
                      standards.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>
                      <strong>Dimensions:</strong> 6" x 9" (15.24 cm x 22.86 cm)
                    </p>
                    <p>
                      <strong>Resolution:</strong> 300 DPI minimum
                    </p>
                    <p>
                      <strong>Color Mode:</strong> CMYK for print, RGB for
                      digital
                    </p>
                    <p>
                      <strong>File Format:</strong> PDF (preferred), JPEG, or
                      PNG
                    </p>
                    <p>
                      <strong>Bleed:</strong> 0.125" (3 mm) on all sides
                    </p>
                    <p>
                      <strong>Spine Width:</strong> Calculated based on page
                      count and paper type
                    </p>
                    <p>
                      <strong>Font:</strong> All fonts must be embedded or
                      converted to outlines
                    </p>
                    <p>
                      <strong>Branding:</strong> Include publisher's logo if
                      required
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDesigns.map((design) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden text-white bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>{design.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {design.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <img
                          src={design.coverImage}
                          alt={`Cover for ${design.title}`}
                          className="w-full h-64 object-cover mb-4 rounded-md"
                        />
                        <AnimatePresence>
                          {uploadingDesign === design.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md"
                            >
                              <div className="text-white text-center">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="mb-2"
                                >
                                  <Upload className="w-8 h-8" />
                                </motion.div>
                                <p>Uploading...</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <Badge
                          variant={
                            design.status === "In Progress"
                              ? "default"
                              : design.status === "Revisions Needed"
                              ? "destructive"
                              : design.status === "Ready for Review"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {design.status}
                        </Badge>
                        <Select
                          value={design.status}
                          onValueChange={(value) =>
                            handleStatusChange(
                              design.id,
                              value as Design["status"]
                            )
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Ready for Review">
                              Ready for Review
                            </SelectItem>
                            <SelectItem value="Rejected by Designer">
                              Rejected by Designer
                            </SelectItem>{" "}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative">
                        <Link
                          href="/graphic-designer/upload-work"
                          className="flex items-center justify-center w-full px-4 py-2 bg-green-400 text-white rounded-md cursor-pointer hover:bg-green-600 transition-colors"
                          target="_blank"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload New Version
                        </Link>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="feedback">
                          <AccordionTrigger>
                            Feedback ({design.feedback.length})
                          </AccordionTrigger>
                          <AccordionContent>
                            <ScrollArea className="h-[200px] w-full rounded-md border border-gray-700 p-4">
                              {design.feedback.map((feedback) => (
                                <div
                                  key={feedback.id}
                                  className="flex items-start space-x-4 mb-4"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={feedback.avatar}
                                      alt={feedback.user}
                                    />
                                    <AvatarFallback>
                                      {feedback.user[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <p className="font-semibold text-white">
                                      {feedback.user}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {new Date(
                                        feedback.timestamp
                                      ).toLocaleString()}
                                    </p>
                                    <p className="mt-1 text-gray-300">
                                      {feedback.comment}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </ScrollArea>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const comment = (e.target as HTMLFormElement)
                                  .comment.value;
                                handleAddFeedback(design.id, comment);
                                (e.target as HTMLFormElement).reset();
                              }}
                              className="mt-4"
                            >
                              <Textarea
                                name="comment"
                                placeholder="Add your feedback..."
                                className="mb-2 bg-gray-700 text-white border-gray-600"
                              />
                              <Button type="submit" className="w-full">
                                Add Feedback
                              </Button>
                            </form>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
