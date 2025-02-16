import fetch from "node-fetch";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

export default async function handler(req, res) {
  const { query } = req.query;
  console.log("Received query:", query); // Log the received query

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
    );
    const data = await response.json();

    if (data.error) {
      return res.status(data.error.code).json({ error: data.error.message });
    }

    const searchResults = data.items.map((item) => ({
      title: item.title,
      description: item.snippet,
      link: item.link,
    }));

    console.log("Search results:", searchResults); // Log the search results
    res.status(200).json({ results: searchResults });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
