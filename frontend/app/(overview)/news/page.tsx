"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getNews, News } from "@/app/utils/getNews";
import Link from "next/link";
import { AISummary, getAISummary } from "@/app/utils/getAISummary";

const NewsPage = () => {
  const [newsResults, setNewsResults] = useState<News[]>([]);
  const [newsAIsummary, setNewsAIsummary] = useState<AISummary>({
    summary: "Hover over an article to get a summary",
  });
  const [newsLoading, setNewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the search term from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // On page load, fetch search news using the search term in the URL
  useEffect(() => {
    setNewsAIsummary({ summary: "Hover over an article to get a summary" });
    setNewsLoading(true);
    setError(null);

    // Fetch search results independently
    getNews(searchTerm)
      .then((data) => {
        setNewsResults(data);
        setNewsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch articles");
        setNewsLoading(false);
      });
  }, [searchTerm]);

  const handleMouseHover = async (content: string) => {
    console.log("Hovered over:", content);
    setNewsAIsummary({ summary: "loading..." });
    setNewsAIsummary(await getAISummary(content.slice(0, 200)));
  };

  return (
    <div className="bg-neutral-900 min-h-screen mt-4 flex flex-col md:flex-row gap-10 px-4 md:px-0 md:pl-32 pb-24 md:pb-0">
      {/* Left Column - Search Results */}
      <div className="w-full md:w-1/2">
        {newsLoading && <p className="text-white">Loading articles...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!newsLoading && !error && newsResults.length === 0 && searchTerm && (
          <p className="text-gray-400">
            No results found for search &quot;{searchTerm}&quot;
          </p>
        )}
        {!newsLoading &&
          newsResults.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-4 mb-16"
                  onMouseEnter={() => handleMouseHover(result.summary)}
                >
                  <div className="flex justify-between space-x-4">
                <div className="p-3">
                  <Link
                    href={result.link}
                    className="text-xl text-blue-500 hover:underline break-all"
                  >
                    {result.title}
                  </Link>
                  <p className="text-white">{result.summary}</p>
                </div>
                {/* Thumbnail image */}
                {result.imageLink && (
                  <img
                    src={result.imageLink}
                    alt={result.title.slice(0, 20)}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                )}
              </div>
              {/* Mobile-only AI Summary Button */}
              <button
                className="block md:hidden bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleMouseHover(result.summary)}
              >
                Get AI Summary
              </button>
            </div>
          ))}
      </div>

      {/* Right Column - Article Summary */}
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
          <p className="text-gray-400">{newsAIsummary.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
