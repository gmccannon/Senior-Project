"use client";

import { useRouter } from "next/navigation";
import MainSearchBar from "@/components/MainSearchBar";

const Home = () => {
  const router = useRouter();

  const handleSearch = async (query: string): Promise<void> => {
    if (!query) return;

    // Go to search page with query
    router.push(`search/?query=${encodeURIComponent(query)}`, { scroll: false });
  };

  return (
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
  );
};

export default Home;
