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
                `/api/SearchGoogle?query=${encodeURIComponent(query)}`,
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

    useEffect(() => {
        if (searchTerm) {
            handleSearch(searchTerm);
        }
    }, [searchTerm]);

    return (
        <div>
            {results.length > 0 ? (
                <div>
                    <MainSearchBar onSearch={handleSearch} />
                    {results.map((result, index) => (
                        <div key={index}>
                            <Link href={result.link}>{result.title}</Link>
                            <p>{result.link}</p>
                            <p>{result.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="w-full max-w-xl">
                        <p className="flex text-7xl flex-col items-center justify-center">Nudle</p>
                        <MainSearchBar onSearch={handleSearch} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
