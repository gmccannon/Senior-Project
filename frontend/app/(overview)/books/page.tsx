'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getBooks, Book } from '@/app/utils/getBooks';
import Link from 'next/link';

const booksPage = () => {
  const [booksResults, setbooksResults] = useState<Book[]>([]);
  const [booksAIsummary, setbooksAIsummary] = useState<string>("Click a books story to get a summary");
  const [booksLoading, setbooksLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the seach term from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // On page load, fetch search books using the search term in the URL
  useEffect(() => {
    setbooksAIsummary("Click a books story to get a summary");
    setbooksLoading(true);
    setError(null);
    
    // Fetch search results independently
    getBooks(searchTerm)
        .then((data) => {
          setbooksResults(data);
          setbooksLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch articles");
          setbooksLoading(false);
        });
  }, [searchTerm]);

  return (
    <div className="bg-neutral-900 min-h-screen mt-4 pl-20 flex gap-10">
      {/* Left Column - Search Results */}
      {/* TODO: Add pagination */}
      <div className="w-1/2">
          {booksLoading && <p className="text-white">Loading articles...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!booksLoading && !error && booksResults.length === 0 && searchTerm && (
            <p className="text-gray-400">No results found for search &quot;{searchTerm}&quot;</p>
          )}
          {!booksLoading && booksResults.map((result, index) => (
              <div key={index} className="flex items-center space-x-4 mb-6" onClick={() => setbooksAIsummary(result.summary)}>                  
                    <div className="p-3">
                            <p>{result.title}</p>
                            <p className="text-white">{result.author}</p>
                            <Link href = {`https://www.amazon.com/s?k=${result.coverLink}`}>
                                Buy on Amazon
                            </Link>
                    </div>
                    {/* Thumbnail image */}
                    {result.coverLink && (
                        <img 
                            src={`https://covers.openlibrary.org/b/olid/${result.coverLink}-L.jpg`} 
                            alt={result.title} 
                            className="w-48 h-64 object-cover rounded-md"
                        />
                    )}
              </div>
          ))}
      </div>

      {/* Right Column - Article Summary */}
      <div className=" border-l border-gray-700 pl-6 w-1/2">
          <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
          <p className="text-gray-400">{booksAIsummary}</p>
      </div>
    </div>
  )
}

export default booksPage
