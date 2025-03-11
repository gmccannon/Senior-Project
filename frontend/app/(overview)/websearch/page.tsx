"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getGoogleSearch, SearchResult } from "@/app/utils/getGoogleSearch";
import { getAISummary, AISummary } from "@/app/utils/getAISummary";
import { Smokum } from "next/font/google";

const Search = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [AISummary, setAISummary] = useState<AISummary>();

  const [searchLoading, setSearchLoading] = useState(false);
  const [AILoading, setAILoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the seach term from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // On page load, fetch search results using the search term in the URL
  useEffect(() => {
    setSearchLoading(true);
    setAILoading(true);
    setError(null);
  
    // Fetch search results independently
    getGoogleSearch(searchTerm)
      .then((data) => {
        setSearchResults(data);
        setSearchLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch search results");
        setSearchLoading(false);
      });
  
    // Fetch AI summary independently
    getAISummary(searchTerm)
      .then((summary) => {
        setAISummary(summary);
        setAILoading(false);
      })
      .catch(() => {
        console.log("LALALA Summary is " + summary);
        setError("Failed to fetch AI summary");
        setAILoading(false);
      });
  }, [searchTerm]);

  return (
    <div className="bg-neutral-900 min-h-screen mt-4 pl-20 flex gap-10">
      {/* Left Column - Search Results */}
      <div className="w-1/2">
        {searchLoading && <p className="text-white">Loading results...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!searchLoading && !error && searchResults.length === 0 && searchTerm && (
          <p className="text-gray-400">No results found for search &quot;{searchTerm}&quot;</p>
        )}

        {/* TODO: Add pagination */}
        {!searchLoading &&
          searchResults.map((result, index) => (
            <div key={index} className="mb-6">
              <Link href={result.link} className="text-xl text-blue-500 hover:underline break-all">
                {result.link.slice(0,50)}
              </Link>
              <p className="text-white">{result.title}</p>
              <p className="text-gray-400">{result.snippet?.slice(0, 100)}</p>
            </div>
          ))}
      </div>

      {/* Right Column - AI Summary */}
      <div className=" border-l border-gray-700 pl-6">
        <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
        {AILoading ? (
          <p className="text-gray-600">Generating AI summary...</p>
        ) : (
          <p className="text-gray-400">{AISummary?.summary}</p>
        )}
      </div>
    </div>
  );
};

export default Search;
