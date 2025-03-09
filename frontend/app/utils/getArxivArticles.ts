import { openDB } from "idb";

// Define the interface for the ArXiv article data
export interface ArxivArticle {
    title: string;
    summary: string;
    siteLink: string;
}

// cache parameters
const DB_NAME = "ArticlesCacheDB";
const STORE_NAME = "article_results";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

// Define the function that fetches and parses articles from ArXiv
export const getArxivArticles = async (query: string) => {
    if (!query) return [];

    // Try fetching from cache first
    const db = await dbPromise;
    const cachedResults = await db.get(STORE_NAME, query);
    if (cachedResults) {
        console.log("Returning cached results for:", query);
        return cachedResults;
    }
    
    // Fetch data from the API
    try {
        const response = await fetch(`/api/SearchArxiv?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          console.log(response.statusText);
          return [];
        }

        const data: { results: ArxivArticle[] } = await response.json();

        // Store in chache
        await db.put(STORE_NAME, data.results, query);

        return data.results;
    } catch (error) {
        console.error("Error fetching from ArXiv API:", error);
        return [];
    }
}
