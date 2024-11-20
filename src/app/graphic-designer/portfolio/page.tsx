"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useState } from "react";
import { LightCard } from "../../../components/card/LightCard";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortfolioItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  description: string;
  rating: number;
  link: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "The Silent Echo",
    author: "Elena Martínez",
    coverImage: "/assets/images/book1.png?height=600&width=400",
    category: "Mystery",
    description:
      "A haunting tale of secrets and redemption set in a small coastal town.",
    rating: 4.8,
    link: "https://example.com/silent-echo",
  },
  {
    id: "2",
    title: "Quantum Dreams",
    author: "Dr. Aiden Chen",
    coverImage: "/assets/images/book1.png?height=600&width=400",
    category: "Science Fiction",
    description:
      "An mind-bending journey through parallel universes and quantum realities.",
    rating: 4.9,
    link: "https://example.com/quantum-dreams",
  },
  {
    id: "3",
    title: "Echoes of Eternity",
    author: "Olivia Blackwood",
    coverImage: "/assets/images/book1.png?height=600&width=400",
    category: "Fantasy",
    description:
      "An epic tale of magic, destiny, and the power of choice in a world on the brink of chaos.",
    rating: 4.7,
    link: "https://example.com/echoes-eternity",
  },
  {
    id: "4",
    title: "Whispers in the Wind",
    author: "Liam O'Connor",
    coverImage: "/assets/images/book1.png?height=600&width=400",
    category: "Romance",
    description:
      "A heartwarming story of love, loss, and second chances set in the Irish countryside.",
    rating: 4.6,
    link: "https://example.com/whispers-wind",
  },
  {
    id: "5",
    title: "Neon Nights",
    author: "Zoe Chang",
    coverImage: "/assets/images/book1.png?height=600&width=400",
    category: "Cyberpunk",
    description:
      "A thrilling cyberpunk adventure in a world where technology and humanity collide.",
    rating: 4.9,
    link: "https://example.com/neon-nights",
  },
  {
    id: "6",
    title: "The Last Expedition",
    author: "Dr. Marcus Holloway",
    coverImage: "/assets/images/book1.png?height=600&width=400",
    category: "Adventure",
    description:
      "A gripping account of the final journey to uncharted territories of our planet.",
    rating: 4.8,
    link: "https://example.com/last-expedition",
  },
];

export default function DesignerPortfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="">
          {/* <header className="bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt="Alex Johnson"
                    />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Alex Johnson
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                      Book Cover Designer
                    </p>
                  </div>
                </div>
                <Button>
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </div>
            </div>
          </header> */}

          <main className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  With over a decade of experience in book cover design, I
                  specialize in creating visually striking and emotionally
                  resonant covers across various genres. My work has been
                  featured in bestselling novels and award-winning publications,
                  always aiming to capture the essence of each story in a
                  single, powerful image.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Portfolio</h2>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                  <div className="flex w-max space-x-4 p-4">
                    {portfolioItems.map((item) => (
                      <LightCard key={item.id} className="w-[300px] text-white">
                        <CardHeader>
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-full h-[400px] object-cover rounded-t-lg"
                          />
                        </CardHeader>
                        <CardContent>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.author}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Badge>{item.category}</Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedItem(item)}
                                className="text-black"
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px] bg-gray-900 text-white">
                              <DialogHeader>
                                <DialogTitle>{selectedItem?.title}</DialogTitle>
                                <DialogDescription>
                                  by {selectedItem?.author}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <img
                                    src={selectedItem?.coverImage}
                                    alt={selectedItem?.title}
                                    className="w-full h-[500px] object-cover rounded-lg"
                                  />
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                      About this design
                                    </h3>
                                    <p className="mb-4">
                                      {selectedItem?.description}
                                    </p>
                                    <div className="flex items-center mb-4">
                                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                      <span className="font-semibold">
                                        {selectedItem?.rating.toFixed(1)}
                                      </span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                                        Client Rating
                                      </span>
                                    </div>
                                    <Button asChild>
                                      <a
                                        href={selectedItem?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="mr-2 h-4 w-4" />{" "}
                                        View on Bookstore
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </CardFooter>
                      </LightCard>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </section>

              <section className="mt-12 ">
                <h2 className="text-3xl font-bold mb-6">Skills & Services</h2>
                <Tabs defaultValue="skills" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                  </TabsList>
                  <TabsContent value="skills">
                    <LightCard className="text-white">
                      <CardHeader>
                        <CardTitle>Technical Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-2 ">
                          <li>Adobe Photoshop, Illustrator, and InDesign</li>
                          <li>Digital illustration and typography</li>
                          <li>Color theory and composition</li>
                          <li>Print production and pre-press preparation</li>
                          <li>3D modeling and rendering for book covers</li>
                        </ul>
                      </CardContent>
                    </LightCard>
                  </TabsContent>
                  <TabsContent value="services">
                    <LightCard className="text-white">
                      <CardHeader>
                        <CardTitle>Design Services</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Custom book cover design</li>
                          <li>eBook cover design</li>
                          <li>Series design and branding</li>
                          <li>Author branding and marketing materials</li>
                          <li>Book interior layout and typesetting</li>
                          <li>Consultation and concept development</li>
                        </ul>
                      </CardContent>
                    </LightCard>
                  </TabsContent>
                </Tabs>
              </section>

              <section className="mt-12 text-white">
                <h2 className="text-3xl font-bold mb-6 ">Testimonials</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-white">
                  {[
                    {
                      author: "Emily R., Bestselling Author",
                      text: "Alex's designs consistently capture the essence of my stories. His covers have played a significant role in the success of my books.",
                    },
                    {
                      author: "Mark T., Independent Publisher",
                      text: "Working with Alex is always a pleasure. His creativity and attention to detail make every project stand out.",
                    },
                    {
                      author: "Sarah L., Fantasy Writer",
                      text: "Alex has an incredible talent for bringing fantasy worlds to life. His covers are pure magic!",
                    },
                  ].map((testimonial, index) => (
                    <LightCard key={index} className="text-white">
                      <CardHeader>
                        <CardTitle>
                          <Star className="w-5 h-5 text-yellow-400 inline mr-1" />
                          <Star className="w-5 h-5 text-yellow-400 inline mr-1" />
                          <Star className="w-5 h-5 text-yellow-400 inline mr-1" />
                          <Star className="w-5 h-5 text-yellow-400 inline mr-1" />
                          <Star className="w-5 h-5 text-yellow-400 inline" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="italic">"{testimonial.text}"</p>
                      </CardContent>
                      <CardFooter>
                        <p className="font-semibold">- {testimonial.author}</p>
                      </CardFooter>
                    </LightCard>
                  ))}
                </div>
              </section>
            </motion.div>
          </main>
        </div>
      </main>
    </div>
  );
}
