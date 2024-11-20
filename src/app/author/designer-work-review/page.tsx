"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, MessageSquare, RefreshCw, Star, Upload, X } from "lucide-react";
import { useState } from "react";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WorkItem {
  id: string;
  title: string;
  author: string;
  designer: string;
  coverImage: string;
  status: "Pending" | "Approved" | "Rejected" | "Modification Requested";
  feedback?: string;
  rating?: number;
}

const initialWorks: WorkItem[] = [
  {
    id: "1",
    title: "The Silent Echo",
    author: "Elena Martínez",
    designer: "Alex Johnson",
    coverImage: "/placeholder.svg?height=400&width=300",
    status: "Pending",
  },
  {
    id: "2",
    title: "Quantum Dreams",
    author: "Dr. Aiden Chen",
    designer: "Alex Johnson",
    coverImage: "/placeholder.svg?height=400&width=300",
    status: "Approved",
    feedback:
      "Excellent work! The cover perfectly captures the essence of quantum physics.",
    rating: 5,
  },
  {
    id: "3",
    title: "Echoes of Eternity",
    author: "Olivia Blackwood",
    designer: "Alex Johnson",
    coverImage: "/placeholder.svg?height=400&width=300",
    status: "Modification Requested",
    feedback:
      "The overall design is great, but could we make the title more prominent?",
  },
];

export default function DesignerWorkReview() {
  const [works, setWorks] = useState<WorkItem[]>(initialWorks);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newWork: WorkItem = {
        id: (works.length + 1).toString(),
        title: "New Upload",
        author: "Current Author",
        designer: "Alex Johnson",
        coverImage: URL.createObjectURL(file),
        status: "Pending",
      };
      setWorks([...works, newWork]);
    }
  };

  const handleStatusChange = (
    id: string,
    newStatus: WorkItem["status"],
    feedback?: string,
    rating?: number
  ) => {
    setWorks(
      works.map((work) =>
        work.id === id ? { ...work, status: newStatus, feedback, rating } : work
      )
    );
  };

  const filteredWorks =
    activeTab === "all"
      ? works
      : works.filter((work) => work.status.toLowerCase() === activeTab);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Work Review Dashboard
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload New Work</CardTitle>
              <CardDescription>
                Upload your latest book cover design for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="cover-upload" className="cursor-pointer">
                <div className="flex items-center justify-center w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-600">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                      Click to upload or drag and drop
                    </span>
                  </div>
                </div>
                <Input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
            </CardContent>
          </Card>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Works</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="modification requested">
                Modifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredWorks.map((work) => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    onSelect={setSelectedWork}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredWorks.map((work) => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    onSelect={setSelectedWork}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="approved">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredWorks.map((work) => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    onSelect={setSelectedWork}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="modification requested">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredWorks.map((work) => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    onSelect={setSelectedWork}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Dialog open={!!selectedWork} onOpenChange={() => setSelectedWork(null)}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>{selectedWork?.title}</DialogTitle>
            <DialogDescription>
              Review and provide feedback for this work
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={selectedWork?.coverImage}
                alt={selectedWork?.title}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">Details</h3>
                <p>
                  <strong>Author:</strong> {selectedWork?.author}
                </p>
                <p>
                  <strong>Designer:</strong> {selectedWork?.designer}
                </p>
                <p>
                  <strong>Status:</strong> {selectedWork?.status}
                </p>
                {selectedWork?.feedback && (
                  <>
                    <h4 className="font-semibold mt-4 mb-2">Feedback</h4>
                    <p>{selectedWork.feedback}</p>
                  </>
                )}
                {selectedWork?.rating && (
                  <div className="flex items-center mt-4">
                    <span className="font-semibold mr-2">Rating:</span>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < selectedWork.rating!
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            {selectedWork?.status === "Pending" && (
              <>
                <Button
                  onClick={() =>
                    handleStatusChange(
                      selectedWork.id,
                      "Approved",
                      "Great work!",
                      5
                    )
                  }
                >
                  <Check className="mr-2 h-4 w-4" /> Approve
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleStatusChange(
                      selectedWork.id,
                      "Modification Requested",
                      "Please make some adjustments."
                    )
                  }
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Request Modifications
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleStatusChange(
                      selectedWork.id,
                      "Rejected",
                      "This design does not meet our requirements."
                    )
                  }
                >
                  <X className="mr-2 h-4 w-4" /> Reject
                </Button>
              </>
            )}
            {selectedWork?.status === "Modification Requested" && (
              <Button
                onClick={() => handleStatusChange(selectedWork.id, "Pending")}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Submit Revised Version
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WorkCard({
  work,
  onSelect,
}: {
  work: WorkItem;
  onSelect: (work: WorkItem) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={work.coverImage}
          alt={work.title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{work.title}</CardTitle>
        <CardDescription>{work.author}</CardDescription>
        <Badge
          variant={
            work.status === "Approved"
              ? "default"
              : work.status === "Rejected"
              ? "destructive"
              : work.status === "Modification Requested"
              ? "outline"
              : "secondary"
          }
          className="mt-2"
        >
          {work.status}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelect(work)} className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" /> Review
        </Button>
      </CardFooter>
    </Card>
  );
}
