"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getBooks, Book } from "@/app/utils/getBooks";
import Link from "next/link";
import Image from "next/image";
import { AISummary, getAISummary } from "@/app/utils/getAISummary";

const booksPage = () => {
  const [booksResults, setbooksResults] = useState<Book[]>([]);
  const [booksAIsummary, setbooksAIsummary] = useState<AISummary>({summary : "Hover over an article to get a summary"});
  const [booksLoading, setbooksLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the seach term from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // On page load, fetch search books using the search term in the URL
  useEffect(() => {
    setbooksAIsummary({summary : "Hover over an article to get a summary"});
    setbooksLoading(true);
    setError(null);

    // Fetch search results independently
    getBooks(searchTerm)
      .then((data) => {
        setbooksResults(data);
        setbooksLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch books");
        setbooksLoading(false);
      });
  }, [searchTerm]);

  const handleMouseHover = async (content: string) => {
  console.log("Hovered over:", content);
  setbooksAIsummary({summary: "loading..."});
  setbooksAIsummary(await getAISummary(content.slice(0, 200)));
  };

  return (
    <div className="bg-neutral-900 min-h-screen mt-16 pl-48 flex gap-10">
      {/* Left Column - Search Results */}
      {/* TODO: Add pagination */}
      <div className="w-1/2">
        {booksLoading && <p className="text-white">Loading books...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!booksLoading && !error && booksResults.length === 0 && searchTerm && (
          <p className="text-gray-400">
            No results found for search &quot;{searchTerm}&quot;
          </p>
        )}
        {!booksLoading &&
          booksResults.map((result, index) => (
            <div
              key={index}
              className="flex space-x-4 mb-16"
            >
              {/* Thumbnail image */}
              {result.coverLink && (
                <Image
                  src={`https://covers.openlibrary.org/b/olid/${result.coverLink}-L.jpg`}
                  alt={`cover loading...`}
                  height={640}
                  width={480}
                  className="h-64 w-48 object-cover rounded-md align-right"
                />
              )}
              {/* Book info */}
              <div className="flex flex-col align-top">
                <Link
                  onMouseEnter={() => handleMouseHover(`the book ${result.title} by ${result.author}`)}
                  className="text-2xl italic pb-1"
                  href={`/books?query=${result.title}`}
                >
                  {result.title}
                </Link>
                <Link
                  className="text-xl pb-1"
                  href={`/books?query=${result.author}`}
                >
                  {result.author}
                </Link>
                <Link
                  className="pb-1 text-blue-400"
                  href={`https://www.amazon.com/s?k=${result.title} book`}
                >
                  Buy on Amazon
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* Right Column - Article Summary */}
      <div className="border-l border-gray-700 pl-6 w-1/2">
        <div className="sticky top-16">
          <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
          <p className="text-gray-400">{booksAIsummary.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default booksPage;
