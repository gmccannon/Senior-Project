"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getGoogleSearch, SearchResult } from "@/app/utils/getGoogleSearch";
import { getAISummary, AISummary } from "@/app/utils/getAISummary";

const Search = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [googleHitsHovered, setGoogleHitsHovered] = useState<SearchResult | null>(null);
  const [AISummary, setAISummary] = useState<AISummary>({
    summary: "Hover over a site to get a summary",
  });

  const [searchLoading, setSearchLoading] = useState(false);
  const [AILoading, setAILoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the search term from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // On page load, fetch search results using the search term in the URL
  useEffect(() => {
    setSearchLoading(true);
    setError(null);

    getGoogleSearch(searchTerm)
      .then((data) => {
        setSearchResults(data);
        setSearchLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch search results");
        setSearchLoading(false);
      });
  }, [searchTerm]);

  // Fetch AI summary whenever googleHitsHovered changes
  useEffect(() => {
    if (googleHitsHovered) {
      setAILoading(true);
      setError(null);

      const hoveredResultString = `${googleHitsHovered.title} - ${googleHitsHovered.description}`;
      console.log("Fetching AI summary for:", hoveredResultString);

      getAISummary(hoveredResultString)
        .then((summary) => {
          setAISummary(summary);
          setAILoading(false);
        })
        .catch(() => {
          setError("Failed to fetch AI summary");
          setAILoading(false);
        });
    }
  }, [googleHitsHovered]);

  const handleMouseHover = (result: SearchResult) => {
    console.log("Hovered over:", result);
    setGoogleHitsHovered(result);
  };

  return (
    <div className="bg-neutral-900 min-h-screen mt-4 flex flex-col md:flex-row gap-10 px-4 md:px-0 md:pl-32 pb-24 md:pb-0">
      {/* Left Column - Search Results */}
      <div className="w-full md:w-1/2">
        {searchLoading && <p className="text-white">Loading results...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!searchLoading && !error && searchResults.length === 0 && searchTerm && (
          <p className="text-gray-400">No results found for search &quot;{searchTerm}&quot;</p>
        )}
        {!searchLoading &&
          searchResults.map((result, index) => (
            <div key={index} className="flex flex-col space-y-4 mb-16">
              <div className="flex justify-between space-x-4">
                <div>
                  <Link
                    href={result.link}
                    className="text-xl text-blue-500 hover:underline break-all"
                  >
                    {result.link.slice(0, 50)}
                  </Link>
                  <p className="text-white">{result.title}</p>
                  <p className="text-gray-400">{result.snippet?.slice(0, 100)}</p>
                </div>
              </div>
              {/* Mobile-only AI Summary Button */}
              <button
                className="block md:hidden bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleMouseHover(result)}
              >
                Get AI Summary
              </button>
            </div>
          ))}
      </div>

      {/* Right Column - AI Summary */}
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
          md:pt-0 md:px-12
          md:h-auto
        `}
      >
        <div className="overflow-y-auto h-full md:overflow-visible md:h-auto md:sticky md:top-16">
          <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
          {AILoading ? (
            <p className="text-gray-600">Generating AI summary...</p>
          ) : (
            <p className="text-gray-400">{AISummary?.summary}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
