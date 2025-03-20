import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

const MainSearchBar = () => {
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  // Update the input field whenever the URL query changes
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setInput(query);
    } else {
      setInput(""); 
    }
  }, [searchParams]); 

  const handleSearch = async (e: { preventDefault: () => void }, query: string): Promise<void> => {
    e.preventDefault();
    if (!query) return;

    console.log("search forrrr:" + query);

    // Handle bang search at the end of the query
    if (query.toLowerCase().endsWith("!gh")) {
      // redirect
      window.location.href = `https://github.com/search?q=${encodeURIComponent(query.slice(0, -3))}`;
      return;
    }
    if (query.toLowerCase().endsWith("!gi")) {
      // redirect
      window.location.href = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query.slice(0, -3))}`;
      return;
    }
    if (query.toLowerCase().endsWith("!w")) {
      // redirect
      window.location.href = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query.slice(0, -3))}`;
      return;
    }
    if (query.toLowerCase().endsWith("!yt")) {
      // redirect
      window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query.slice(0, -3))}`;
      return;
    }
    if (query.toLowerCase().endsWith("!a")) {
      // redirect
      window.location.href = `https://www.amazon.com/s?k=${encodeURIComponent(query.slice(0, -3))}`;
      return;
    }

    // Update the query, if the user is on the home page, default to navigating to the search page, otherwise, stay on the page that they are on
    if (pathname === '/') {
      router.push(`search/?query=${encodeURIComponent(query)}`, { scroll: false });
    } else {
      router.push(`${pathname}/?query=${encodeURIComponent(query)}`, { scroll: false });
    }
  };

  return (
    <form onSubmit={(e) => handleSearch(e, input)} className="relative flex">
      <MagnifyingGlassIcon className="h-6 w-6 text-white absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow pl-12 p-2 h-10 rounded-3xl text-white placeholder-gray-500 bg-neutral-600"
      />
    </form>
  );
};

export default MainSearchBar;
