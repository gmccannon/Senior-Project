'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getNews, News } from '@/app/utils/getNews';
import Link from 'next/link';

const NewsPage = () => {
  const [newsResults, setNewsResults] = useState<News[]>([]);
  const [newsAIsummary, setNewsAIsummary] = useState<string>("Click a news story to get a summary");
  const [newsLoading, setNewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the seach term from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // On page load, fetch search news using the search term in the URL
  useEffect(() => {
    setNewsAIsummary("Click a news story to get a summary");
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

  return (
    <div className="bg-neutral-900 min-h-screen mt-4 pl-20 flex gap-10">
      {/* Left Column - Search Results */}
      {/* TODO: Add pagination */}
      <div className="w-1/2">
          {newsLoading && <p className="text-white">Loading articles...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!newsLoading && !error && newsResults.length === 0 && searchTerm && (
            <p className="text-gray-400">No results found for search &quot;{searchTerm}&quot;</p>
          )}
          {!newsLoading && newsResults.map((result, index) => (
              <div key={index} className="flex justify-between space-x-4 mb-12" onClick={() => setNewsAIsummary(result.summary)}>                  
                  <div className="p-3">
                      <Link href={result.link} className="text-xl text-blue-500 hover:underline break-all">
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
          ))}
      </div>

      {/* Right Column - Article Summary */}
      <div className=" border-l border-gray-700 pl-6 w-1/2">
          <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
          <p className="text-gray-400">{newsAIsummary}</p>
      </div>
    </div>
  )
}

export default NewsPage
