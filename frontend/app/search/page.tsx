"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import MainSearchBar from "@/components/MainSearchBar";
import { getSearchResults, SearchResult } from "@/app/utils/getSearchResults";

const Search = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchTerm = searchParams.get("query") || "";

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    router.push(`?query=${encodeURIComponent(query)}`, { scroll: false });

    setLoading(true);
    setError(null);

    const data = await getSearchResults(query);
    setResults(data);
    setLoading(false);
  }, [router]);

  const handleHomeClick = () => {
    router.push("/");
    setResults([]);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      setResults([]);
    }
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

        {/* TODO: Add pagination */}
        {/* Search Results */}
        <div className="mt-8 pl-20">
          {loading && <p className="text-white">Loading results...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && results.length === 0 && searchTerm && (
            <p className="text-gray-400">No results found for search "{searchTerm}"</p>
          )}

          {!loading && results.map((result, index) => (
            <div key={index} className="mb-6">
              <Link href={result.link} className="text-xl text-blue-500 hover:underline">
                {result.link}
              </Link>
              <p className="text-white">{result.title}</p>
              <p className="text-gray-400">{result.snippet && result.snippet.slice(0,100)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
