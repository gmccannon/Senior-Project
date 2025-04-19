"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getBooks, Book } from "@/app/utils/getBooks";
import Link from "next/link";
import Image from "next/image";
import { AISummary, getAISummary } from "@/app/utils/getAISummary";

const BooksPage = () => {
  const [booksResults, setBooksResults] = useState<Book[]>([]);
  const [booksAIsummary, setBooksAIsummary] = useState<AISummary>({
    summary: "Hover over a book to get a summary",
  });
  const [booksLoading, setBooksLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  useEffect(() => {
    setBooksAIsummary({ summary: "Hover over a book to get a summary" });
    setBooksLoading(true);
    setError(null);

    getBooks(searchTerm)
      .then((data) => {
        setBooksResults(data);
        setBooksLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch books");
        setBooksLoading(false);
      });
  }, [searchTerm]);

  const handleMouseHover = async (content: string) => {
    setBooksAIsummary({ summary: "loading..." });
    setBooksAIsummary(await getAISummary(content.slice(0, 200)));
  };

  return (
    <div className="bg-neutral-900 min-h-screen mt-16 flex flex-col md:flex-row gap-10 px-4 md:px-0 md:pl-48 pb-24 md:pb-0">
      {/* Left Column */}
      <div className="w-full md:w-1/2">
        {booksLoading && <p className="text-white">Loading books...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!booksLoading && !error && booksResults.length === 0 && searchTerm && (
          <p className="text-gray-400">
            No results found for search “{searchTerm}”
          </p>
        )}
        {!booksLoading &&
          booksResults.map((result, idx) => (
            <div key={idx} className="flex flex-col space-y-4 mb-16">
              <div className="flex space-x-4">
                {result.coverLink && (
                  <Image
                    src={`https://covers.openlibrary.org/b/olid/${result.coverLink}-L.jpg`}
                    alt={`${result.title} cover`}
                    height={640}
                    width={480}
                    className="h-64 w-48 object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col">
                  <Link
                    onMouseEnter={() =>
                      handleMouseHover(
                        `the book ${result.title} by ${result.author}`
                      )
                    }
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
              {/* Mobile-only AI Summary Button */}
              <button
                className="block md:hidden bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() =>
                  handleMouseHover(
                    `the book ${result.title} by ${result.author}`
                  )
                }
              >
                Get AI Summary
              </button>
            </div>
          ))}
      </div>

      {/* AI Summary – fixed on mobile, sticky on md+ */}
      <div
        className={`
          fixed inset-x-0 bottom-0 h-24
          bg-neutral-900
          border-t border-gray-700
          px-4
          z-50

          md:static md:inset-auto md:bottom-auto
          md:w-1/2
          md:border-t-0 md:border-l
          md:pt-0 md:px-16
          md:h-auto
        `}
      >
        <div className="overflow-y-auto h-full md:overflow-visible md:h-auto md:sticky md:top-16">
          <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
          <p className="text-gray-400">{booksAIsummary.summary}</p>
        </div>
      </div>
    </div>
  );
};
export default BooksPage;
