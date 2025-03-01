import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";

interface MainSearchBarProps {
  onSearch: (input: string) => void;
}

const MainSearchBar: React.FC<MainSearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();

  // Update the input field whenever the URL query changes
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setInput(query);
    } else {
      setInput(""); 
    }
  }, [searchParams]); 

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex">
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
