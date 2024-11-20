"use client";

import { Button } from "@/components/ui/button";

export default function Component() {
  const recentBooks = [
    {
      id: 1,
      title: "Take My Hand",
      author: "Dolen Perkins-Valdez",
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 2,
      title: "Little Women",
      author: "Louisa May Alcott",
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 3,
      title: "Our Missing Hearts",
      author: "Celeste Ng",
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 4,
      title: "Harry Potter",
      author: "J.K. Rowling",
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 5,
      title: "The Famous Five",
      author: "Enid Blyton",
      cover: "/placeholder.svg?height=300&width=200",
    },
  ];

  const trendingAuthors = [
    { id: 1, name: "Author 1", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Author 2", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Author 3", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Author 4", image: "/placeholder.svg?height=200&width=200" },
    { id: 5, name: "Author 5", image: "/placeholder.svg?height=200&width=200" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="p-6">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recently Accessed Books</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentBooks.map((book) => (
              <div key={book.id} className="shrink-0">
                <img
                  alt={book.title}
                  className="h-[300px] w-[200px] rounded-lg object-cover"
                  height="300"
                  src={book.cover}
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Suggest Books</h2>
            <Button variant="link" className="text-white">
              View All
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentBooks.map((book) => (
              <div key={book.id} className="shrink-0">
                <img
                  alt={book.title}
                  className="h-[300px] w-[200px] rounded-lg object-cover"
                  height="300"
                  src={book.cover}
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Trending Books</h2>
            <Button variant="link" className="text-white">
              View All
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentBooks.map((book) => (
              <div key={book.id} className="shrink-0">
                <img
                  alt={book.title}
                  className="h-[300px] w-[200px] rounded-lg object-cover"
                  height="300"
                  src={book.cover}
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Trending Authors</h2>
            <Button variant="link" className="text-white">
              View All
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {trendingAuthors.map((author) => (
              <div key={author.id} className="shrink-0">
                <img
                  alt={author.name}
                  className="h-[200px] w-[200px] rounded-full object-cover"
                  height="200"
                  src={author.image}
                  style={{
                    aspectRatio: "1",
                    objectFit: "cover",
                  }}
                  width="200"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* <footer className="border-t border-gray-800 px-6 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-gray-400 hover:text-white">
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="text-gray-400 hover:text-white"
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/publish"
                  className="text-gray-400 hover:text-white"
                >
                  Guide to publish
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-gray-400 hover:text-white"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © Copyright 2024. Powered by Rag Release
        </div>
      </footer> */}
    </div>
  );
}
