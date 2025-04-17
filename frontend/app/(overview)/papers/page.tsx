'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getArxivArticles, ArxivArticle } from '@/app/utils/getArxivArticles';
import Link from 'next/link';
import { getAISummary, AISummary } from '@/app/utils/getAISummary';

const Articles = () => {
    const [articleResults, setArticleResults] = useState<ArxivArticle[]>([]);
    const [articleAIsummary, setArticleAIsummary] = useState<AISummary>({summary : "Hover over an article to get a summary"});
    const [articlesLoading, setArticlesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get the seach term from the URL
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("query") || "";

    // On page load, fetch search results using the search term in the URL
    useEffect(() => {
        setArticleAIsummary({summary : "Hover over an article to get a summary"});
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

    const handleMouseHover = async (content: string) => {
    console.log("Hovered over:", content);
    setArticleAIsummary(await getAISummary(content.slice(0, 400)));
    };
    
  return (
    <div className="bg-neutral-900 min-h-screen mt-4 pl-20 flex gap-10">
        {/* Left Column - Search Results */}
        {/* TODO: Add pagination */}
        <div className="w-1/2">
            {articlesLoading && <p className="text-white">Loading articles...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!articlesLoading && !error && articleResults.length === 0 && searchTerm && (
            <p className="text-gray-400">No results found for search &quot;{searchTerm}&quot;</p>
            )}
            {!articlesLoading && articleResults.map((result, index) => (
                <div key={index} className="flex flex-col mb-6">
                    <Link href={result.siteLink} className="text-xl pb-1 text-blue-500"
                        onMouseEnter={() => handleMouseHover(`${result.summary}`)}>
                        {result.title}
                    </Link>
                    <Link href={`/papers?query=${result.author}`} className="text-m pb-1">
                        {result.author}
                    </Link>
                </div>
            ))}
        </div>

        {/* Right Column - Article Summary */}
        <div className=" border-l border-gray-700 pl-16 pr-16 w-1/2">
            <div className='sticky top-16'>
                <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
                <p className="text-gray-400">{articleAIsummary.summary}</p>
            </div>
        </div>
    </div>
  )
}

export default Articles
