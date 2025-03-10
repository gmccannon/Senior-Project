import { openDB } from "idb";

export interface Book {
    title: string;
    author: string;
    year: string;
    coverLink: string;
}

const DB_NAME = "BookCacheDB";
const STORE_NAME = "books_results";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export const getBooks = async (query: string): Promise<Book[]> => {
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
        const response = await fetch(`/api/SearchBooks?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            console.log(response.statusText);
            return [];
        }

        const data: { results: Book[] } = await response.json();

        // Store in chache
        await db.put(STORE_NAME, data.results, query);

        return data.results;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}
