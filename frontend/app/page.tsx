"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import MainSearchBar from "@/components/MainSearchBar";

interface SearchResult {
    title: string;
    description: string;
    link: string;
}

const Home = () => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get the search query from the URL
    const searchTerm = searchParams.get("query") || "";

    const handleSearch = async (query: string): Promise<void> => {
        if (!query) return;
        
        // Update the URL with the search query
        router.push(`?query=${encodeURIComponent(query)}`, { scroll: false });
        
        // Fetch search results
        try {
            const response = await fetch(
                `/api/MockSearch?query=${encodeURIComponent(query)}`,
            );
            if (!response.ok) throw new Error("Failed to fetch search results");

            const data: { results: SearchResult[] } = await response.json();
            console.log("Search results:", data.results);
            setResults(data.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setResults([]);
        }
    };

    // Function to clear the query parameter
    const handleHomeClick = () => {
        router.push('/');

        setResults([]);
    };

    useEffect(() => {
        if (searchTerm) {
            handleSearch(searchTerm);
        }
    }, [searchTerm]);

    return (
        <div className="bg-neutral-900">
            {results.length > 0 ? (
                // Search results present: show the bar top left
                <div className="p-6">
                    <div className="flex items-center">
                        <p
                            onClick={handleHomeClick}
                            style={{ fontFamily: "Pacifico, cursive" }}
                            className="text-4xl text-white pl-4 cursor-pointer"
                        >
                            Presto
                        </p>
                        <div className="flex-grow max-w-xl pl-8">
                            <MainSearchBar onSearch={handleSearch} />
                        </div>
                    </div>
        
                    {/* Display the search results below */}
                    <div className="mt-8 pl-40">
                        {results.map((result, index) => (
                            <div key={index} className="mb-6">
                                <Link href={result.link} className="text-xl text-blue-500 hover:underline">
                                    {result.title}
                                </Link>
                                <p className="text-sm text-gray-400">{result.link}</p>
                                <p className="text-white">{result.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Empty search results: show the bar in the center
                <div className="flex flex-col items-center justify-start min-h-screen pt-64">
                    <div className="w-full max-w-xl">
                        <p
                            style={{ fontFamily: "Pacifico, cursive" }}
                            className="flex text-8xl flex-col items-center justify-center p-8 cursor-pointer"
                        >
                            Presto
                        </p>
                        <MainSearchBar onSearch={handleSearch} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
