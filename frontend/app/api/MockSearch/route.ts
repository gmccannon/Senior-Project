import { NextResponse } from "next/server";

const MOCK_RESULTS = [
  {
    title: "Example result 1",
    snippet: "This is a snippet for the first example result.",
    link: "https://example1.com",
  },
  {
    title: "Example result 2",
    snippet: "This is a snippet for the second example result.",
    link: "https://example2.com",
  },
  {
    title: "Example result 3",
    snippet: "This is a snippet for the third example result.",
    link: "https://example3.com",
  },
  {
    title: "Example result 4",
    snippet: "This is a snippet for the first example result.",
    link: "https://example1.com",
  },
  {
    title: "Example result 5",
    snippet: "This is a snippet for the second example result.",
    link: "https://example2.com",
  },
  {
    title: "Example result 6",
    snippet: "This is a snippet for the third example result.",
    link: "https://example3.com",
  },
];

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  console.log("Received query:", query);

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  // Simulate a delay for mock results
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock search results
  const searchResults = MOCK_RESULTS.map((item: SearchResult) => ({
    title: item.title,
    description: item.snippet,
    link: item.link,
  }));

  console.log("Mock search results:", searchResults);
  return NextResponse.json({ results: searchResults }, { status: 200 });
}
