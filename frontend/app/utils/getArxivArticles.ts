import { openDB } from "idb";
import { parseStringPromise } from 'xml2js';

// Define the interface for the ArXiv article data
export interface ArxivArticle {
    title: string;
    summary: string;
    link: string;
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
export const getArxivArticles = async (query: string): Promise<ArxivArticle[]> => {
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
        const arxivUrl = `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=10`;
    
        // Fetch data from ArXiv API
        const response = await fetch(arxivUrl);
        const data = await response.text();
    
        // Parse the XML data to JSON
        const parsedData = await parseStringPromise(data);

        if (!parsedData.feed || !parsedData.feed.entry) {
            return [];
        }

        // Extract articles from the parsed JSON and map to ArxivArticle structure
        const articles = parsedData.feed.entry.map((entry: any) => ({
            title: entry.title[0],
            summary: entry.summary[0],
            link: entry.id[0],
        }));

        // Store in chache
        await db.put(STORE_NAME, articles, query);

        return articles;
    } catch (error) {
        console.error("Error fetching from ArXiv API:", error);
        return [];
    }
}
