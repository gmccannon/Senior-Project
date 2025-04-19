'use client';

import MainSearchBar from "@/components/MainSearchBar";
import { usePathname, useRouter } from "next/navigation";
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
  const currentTab = usePathname();

  // Naviagte to home page
  const handleHomeClick = () => {
    router.push("/");
  };

  // Navigate to google search page
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
  const handleBooksClick = () => {
    router.push('/books' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }

  // Navigate to finance page
  const handleFinanceClick = () => {
    router.push('/finance' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }

  const handleWisdomClick = () => {
    router.push('/wisdom' + (searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''));
  }
    
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
            <MainSearchBar />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 pl-24 pb-1">
          {/* Highlight the current tab */}
          <button className={`${currentTab === '/search' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-500'}`} onClick={handleSearchClick}>
            Nuddle
          </button>
          <button className={`${currentTab === '/websearch' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-500'}`} onClick={handleWebSearchClick}>
            Web
          </button>
          <button className={`${currentTab === '/papers' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-500'}`} onClick={handleArticlesClick}>
            Papers
          </button>
          <button className={`${currentTab === '/news' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-500'}`} onClick={handleNewsClick}>
            News
          </button>
          <button className={`${currentTab === '/books' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-500'}`} onClick={handleBooksClick}>
            Books
          </button>
          {/* <button className={`${currentTab === '/finance' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-500'}`} onClick={handleFinanceClick}>
            Finance
          </button> */}
          <button className={`${currentTab === '/wisdom' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-500'}`} onClick={handleWisdomClick}>
            Wisdom
          </button>
        </div>

        <hr className="border-gray-600" />
        
        {children}
    </div>
  );
}
