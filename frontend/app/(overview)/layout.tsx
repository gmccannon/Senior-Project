'use client';

import MainSearchBar from "@/components/MainSearchBar";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function OverLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  // Get the seach term from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const router = useRouter();

  // Naviagte to home page
  const handleHomeClick = () => {
    router.push("/");
  };

  // Navigate to search page
  const handleWebSearchClick = () => {
    router.push('/websearch' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }

  // Navigate to search page
  const handleSearchClick = () => {
    router.push('/search' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }

  // Navigate to articles page
  const handleArticlesClick = () => {
    router.push('/papers' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }

  // Navigate to news page
  const handleNewsClick = () => {
    router.push('/news' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }

      // Navigate to finance page
  const handleFinanceClick = () => {
    router.push('/finance' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }

  // Update the search term in the URL when the user searches
  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    router.push(`?query=${encodeURIComponent(query)}`, { scroll: false });
  }, [router]);
    
  return (
    <div>
        {/* Logo and Search Bar */}
        <div className="flex items-center p-6">
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

        {/* Navigation buttons */}
        <div className="flex gap-4 pl-20 pb-5">
          <button className="text-white" onClick={handleWebSearchClick}>
            Web
          </button>
          <button className="text-white" onClick={handleSearchClick}>
            Nudle::Database
          </button>
          <button className="text-white" onClick={handleArticlesClick}>
            Papers
          </button>
          <button className="text-white" onClick={handleNewsClick}>
            News
          </button>
          <button className="text-white" onClick={handleFinanceClick}>
            Finance
          </button>
        </div>

        <hr className="border-gray-600" />
        
        {children}
    </div>
  );
}
