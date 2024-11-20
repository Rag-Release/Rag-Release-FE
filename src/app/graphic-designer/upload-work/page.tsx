"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Book,
  Clock,
  User,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { LightCard } from "../../../components/card/LightCard";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookDetails {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  publishDate: string;
  coverBrief: string;
}

interface DesignSubmission {
  id: string;
  designerName: string;
  submissionDate: string;
  coverImage: string;
  status: "Pending" | "Approved" | "Rejected" | "Revision Requested";
  authorComment?: string;
}

const bookDetails: BookDetails = {
  id: "book-123",
  title: "The Quantum Paradox",
  author: "Dr. Amelia Hawthorne",
  description:
    "A mind-bending journey through the multiverse, where every decision creates a new reality. Dr. Hawthorne weaves quantum physics with human emotion in this groundbreaking sci-fi thriller.",
  genre: "Science Fiction",
  publishDate: "2024-03-15",
  coverBrief:
    "Looking for a cover that captures the essence of quantum entanglement and parallel universes. Should be visually striking with a blend of scientific imagery and human elements. Preferred colors: deep blues, purples, and gold accents.",
};

const previousSubmissions: DesignSubmission[] = [
  {
    id: "submission-1",
    designerName: "Alex Johnson",
    submissionDate: "2023-11-10",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "Revision Requested",
    authorComment:
      "I love the concept, but can we make the title more prominent? Also, try incorporating more quantum imagery.",
  },
  {
    id: "submission-2",
    designerName: "Sophia Lee",
    submissionDate: "2023-11-15",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "Rejected",
    authorComment:
      "This design doesn't quite capture the essence of the book. It feels too generic for a quantum physics thriller.",
  },
  {
    id: "submission-3",
    designerName: "Marcus Rivera",
    submissionDate: "2023-11-20",
    coverImage: "/assets/images/book1.png?height=400&width=300",
    status: "Pending",
  },
];

export default function DesignerUpload() {
  const [newSubmission, setNewSubmission] = useState<File | null>(null);
  const [designNote, setDesignNote] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewSubmission(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the file and note to your server
    console.log("Submitting design:", newSubmission, "with note:", designNote);
    // Reset form after submission
    setNewSubmission(null);
    setDesignNote("");
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div>
          <header>
            <div className="container">
              <h1 className="text-3xl text-white font-bold ">
                Cover Design Upload
              </h1>
            </div>
          </header>

          <main className="container mx-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-8 md:grid-cols-2 ">
                <LightCard className="text-white">
                  <CardHeader>
                    <CardTitle>Book Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {bookDetails.title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                          by {bookDetails.author}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge>{bookDetails.genre}</Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="inline mr-1 h-4 w-4" />
                          Publish Date: {bookDetails.publishDate}
                        </span>
                      </div>
                      <p>{bookDetails.description}</p>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">
                          Cover Design Brief
                        </h3>
                        <p>{bookDetails.coverBrief}</p>
                      </div>
                    </div>
                  </CardContent>
                </LightCard>

                <LightCard className="text-white">
                  <CardHeader>
                    <CardTitle>Upload Your Design</CardTitle>
                    <CardDescription>
                      Submit your cover design for &quot;{bookDetails.title}
                      &quot;
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="cover-upload"
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-center w-full h-64 rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-600">
                              {newSubmission ? (
                                <img
                                  src={URL.createObjectURL(newSubmission)}
                                  alt="New submission preview"
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <div className="text-center">
                                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                  <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Click to upload or drag and drop
                                  </span>
                                </div>
                              )}
                            </div>
                            <Input
                              id="cover-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileUpload}
                            />
                          </Label>
                        </div>
                        <div>
                          <Label htmlFor="design-note">Design Note</Label>
                          <Textarea
                            id="design-note"
                            placeholder="Explain your design choices and how they relate to the book's themes..."
                            value={designNote}
                            onChange={(e) => setDesignNote(e.target.value)}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={!newSubmission}
                        >
                          Submit Design
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </LightCard>
              </div>

              <LightCard className="mt-8 text-white">
                <CardHeader>
                  <CardTitle>Previous Submissions</CardTitle>
                  <CardDescription>
                    Review past submissions and author feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full rounded-md border">
                    {previousSubmissions.map((submission, index) => (
                      <div
                        key={submission.id}
                        className="flex items-start space-x-4 p-4 border-b last:border-b-0"
                      >
                        <img
                          src={submission.coverImage}
                          alt={`Submission ${index + 1}`}
                          className="w-24 h-36 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">
                              {submission.designerName}
                            </h3>
                            <Badge
                              variant={
                                submission.status === "Approved"
                                  ? "default"
                                  : submission.status === "Rejected"
                                  ? "destructive"
                                  : submission.status === "Revision Requested"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Submitted on {submission.submissionDate}
                          </p>
                          {submission.authorComment && (
                            <div className="mt-2 p-3 rounded-md">
                              <p className="text-sm font-medium mb-1">
                                Author Comment:
                              </p>
                              <p className="text-sm">
                                {submission.authorComment}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </LightCard>
            </motion.div>
          </main>
        </div>
      </main>
    </div>
  );
}
