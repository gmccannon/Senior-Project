"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import MainSearchBar from "@/components/MainSearchBar";
import { getSearchResults, SearchResult } from "@/app/utils/getSearchResults";
import { getAISummary, AISummary } from "@/app/utils/getAISummary";

const Search = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [AISummary, setAISummary] = useState<AISummary>();

  const [searchLoading, setSearchLoading] = useState(false);
  const [AILoading, setAILoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get the seach term from the URL
  const searchTerm = searchParams.get("query") || "";

  // Update the search term in the URL when the user searches
  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    router.push(`?query=${encodeURIComponent(query)}`, { scroll: false });
  }, [router]);

  // Naviagte to the home page when the logo is clicked
  const handleHomeClick = () => {
    router.push("/");
    setSearchResults([]);
  };

  // On page load, fetch search results using the search term in the URL
  useEffect(() => {
    setSearchLoading(true);
    setAILoading(true);
    setError(null);
  
    // Fetch search results independently
    getSearchResults(searchTerm)
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
        setError("Failed to fetch AI summary");
        setAILoading(false);
      });
  }, [searchTerm]);

  return (
    <div className="bg-neutral-900 min-h-screen">
      <div className="p-6">
        {/* Logo and Search Bar */}
        <div className="flex items-center">
          <p
            onClick={handleHomeClick}
            style={{ fontFamily: "Pacifico, cursive" }}
            className="text-4xl text-white pl-4 cursor-pointer"
          >
            Nuddle
          </p>
          <div className="flex-grow max-w-xl pl-8">
            <MainSearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="mt-8 pl-20 flex gap-10">
          {/* Left Column - Search Results */}
          <div className="w-1/2">
            {searchLoading && <p className="text-white">Loading results...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!searchLoading && !error && searchResults.length === 0 && searchTerm && (
              <p className="text-gray-400">No results found for search "{searchTerm}"</p>
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
              <p className="text-gray-400">Generating AI summary...</p>
            ) : (
              <p className="text-white">{AISummary?.summary}</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Search;
