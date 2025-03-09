import { NextResponse, NextRequest } from "next/server";
import { SearchResult } from "@/app/utils/getSearchResults";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  console.log("Received query:", query);

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
    );
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: data.error.code });
    }

    const searchResults = data.items.map((item: SearchResult) => ({
      title: item.title,
      description: item.snippet,
      link: item.link,
    }));

    console.log("Search results:", searchResults);
    return NextResponse.json({ results: searchResults }, { status: 200 });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
