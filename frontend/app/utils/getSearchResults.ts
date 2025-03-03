export interface SearchResult {
  url: string;
  content: string;
}

// Prefix to differentiate from other localStorage items
const CACHE_KEY_PREFIX = "search_cache_";
const CACHE_LIMIT = 10;

const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn("LocalStorage quota exceeded. Clearing old cache...");
    pruneCache();
    try {
      localStorage.setItem(key, value); 
    } catch (error) {
      console.error("Failed to store in cache after pruning:", error);
    }
  }
};

 // Remove the oldest cached query if the limit is reached
const pruneCache = () => {
  const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_KEY_PREFIX));
  if (keys.length > CACHE_LIMIT) {
    localStorage.removeItem(keys[0]);
  }
};

// Fetch search results
export const getSearchResults = async (query: string): Promise<SearchResult[]> => {
  if (!query) return [];

  const cacheKey = CACHE_KEY_PREFIX + query;
  const cachedResults = localStorage.getItem(cacheKey);

  // If results are cached, return them
  if (cachedResults) {
    console.log("Returning cached results for:", query);
    return JSON.parse(cachedResults);
  }

  // Fetch information from the custom database
  try {
    const response = await fetch(`/api/DatabaseSearch?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      console.log(response.statusText);
      return [];
    }

    const data: { results: SearchResult[] } = await response.json();

    // Cache results safely
    safeSetItem(cacheKey, JSON.stringify(data.results));

    return data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
