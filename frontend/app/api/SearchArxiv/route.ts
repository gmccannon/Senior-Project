import { NextResponse, NextRequest } from "next/server";
import { ArxivArticle } from "@/app/utils/getArxivArticles";
import { parseStringPromise } from 'xml2js';

interface ArxivEntry {
  title: string[];
  summary: string[];
  link: { $: { href: string } }[];
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  console.log("Received query:", query);

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const arxivUrl = `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=10`;
    const response = await fetch(arxivUrl);
    const data = await response.text();

    // Parse the XML data to JSON
    const parsedData = await parseStringPromise(data);

    // Check for valid data
    if (!parsedData.feed || !parsedData.feed.entry) {
      return NextResponse.json({ error: "No data found" }, { status: 400 });
    }

    // Extract articles from the parsed JSON and map to ArxivArticle structure
    const articles: ArxivArticle = parsedData.feed.entry.map((entry: ArxivEntry) => ({
        title: entry.title[0],
        summary: entry.summary[0],
        siteLink: entry.link[0].$.href,
    }));

    return NextResponse.json({ results: articles }, {status: 200});
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
