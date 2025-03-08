'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getArxivArticles, ArxivArticle } from '@/app/utils/getArxivArticles';
import Link from 'next/link';

const Articles = () => {
    const [articleResults, setArticleResults] = useState<ArxivArticle[]>([]);
    const [articlesLoading, setArticlesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get the seach term from the URL
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("query") || "";

    // On page load, fetch search results using the search term in the URL
    useEffect(() => {
        setArticlesLoading(true);
        setError(null);
        
        // Fetch search results independently
        getArxivArticles(searchTerm)
            .then((data) => {
                setArticleResults(data);
                setArticlesLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch articles");
                setArticlesLoading(false);
            });
    }, [searchTerm]);

  return (
    <div className="bg-neutral-900 min-h-screen mt-4 pl-20">
        {articlesLoading && <p className="text-white">Loading articles...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!articlesLoading && !error && articleResults.length === 0 && searchTerm && (
          <p className="text-gray-400">No results found for search "{searchTerm}"</p>
        )}

        {/* TODO: Add pagination */}
        {!articlesLoading &&
          articleResults.map((result, index) => (
            <div key={index} className="mb-6">
              <Link href={result.link} className="text-xl text-blue-500 hover:underline break-all">
                {result.link.slice(0,50)}
              </Link>
              <p className="text-white">{result.title}</p>
            </div>
          ))}
    </div>
  )
}

export default Articles
