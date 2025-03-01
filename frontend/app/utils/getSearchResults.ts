export interface SearchResult {
    title: string;
    description: string;
    link: string;
  }
  
  export const getSearchResults = async (query: string): Promise<SearchResult[]> => {
    if (!query) return [];
    
    try {
      const response = await fetch(`/api/MockSearch?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch search results");
  
      const data: { results: SearchResult[] } = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  };
  