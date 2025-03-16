"use client";

import { useRouter } from "next/navigation";
import MainSearchBar from "@/components/MainSearchBar";

const Home = () => {
  const router = useRouter();

  const handleSearch = async (query: string): Promise<void> => {
    if (!query) return;

    console.log("search forrrr:" + query);

    // Handle bang search at the end of the query
    if (query.toLowerCase().endsWith("!gh")) {
      // redirect
      router.push(`https://github.com/search?q=${encodeURIComponent(query.slice(0, -3))}`)
      return;
    }
    if (query.toLowerCase().endsWith("!gi")) {
      // redirect
      router.push(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query.slice(0, -3))}`)
      return;
    }
    if (query.toLowerCase().endsWith("!w")) {
      // redirect
      router.push(`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query.slice(0, -3))}`)
      return;
    }
    if (query.toLowerCase().endsWith("!yt")) {
      // redirect
      router.push(`https://www.youtube.com/results?search_query=${encodeURIComponent(query.slice(0, -3))}`)
      return;
    }
    if (query.toLowerCase().endsWith("!a")) {
      // redirect
      router.push(`https://www.amazon.com/s?k=${encodeURIComponent(query.slice(0, -3))}`)
      return;
    }

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
            Nuddle
        </p>
        <MainSearchBar onSearch={handleSearch} />
        </div>
    </div>
  );
};

export default Home;
