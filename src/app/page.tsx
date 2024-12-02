"use client";
import React from "react";
import AuthorCard from "@/components/author/AuthorCard";
import BookCard from "@/components/book/BookCard";

export default function Home() {
  // Sample data
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "/assets/images/book1.png", // Corrected path
      rating: 4,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "/assets/images/book2.png", // Corrected path
      rating: 5,
    },
  ];

  const authors = [
    {
      name: "J.K. Rowling",
      image: "/assets/images/author1.png", // Corrected path
      bookCount: 10,
    },
    {
      name: "Stephen King",
      image: "/assets/images/author2.png", // Corrected path
      bookCount: 54,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Top Rated Books
          </h2>
          <div className="flex overflow-x-auto pb-4">
            {books.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Trending Authors
          </h2>
          <div className="flex overflow-x-auto pb-4">
            {authors.map((author, index) => (
              <AuthorCard key={index} {...author} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
