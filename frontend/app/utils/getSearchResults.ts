export interface SearchResult {
  title: string;
  description: string;
  link: string;
}

// In-memory cache
const searchCache: Record<string, SearchResult[]> = {};

export const getSearchResults = async (query: string): Promise<SearchResult[]> => {
  if (!query) return [];

  // Check if the query results are cached
  if (searchCache[query]) {
    console.log("Returning cached results for:", query);
    return searchCache[query];
  }

  try {
    const response = await fetch(`/api/DatabaseSearch?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      console.log(response.statusText);
      return [];
    }

    const data: { results: SearchResult[] } = await response.json();

    // Cache the results
    searchCache[query] = data.results;

    return data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
