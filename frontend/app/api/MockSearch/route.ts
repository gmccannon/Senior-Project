import { NextResponse } from "next/server";

const MOCK_RESULTS = [
  { title: "Example 1", snippet: "Snippet 1", link: "https://example1.com" },
  { title: "Example 2", snippet: "Snippet 2", link: "https://example2.com" },
  { title: "Example 3", snippet: "Snippet 3", link: "https://example3.com" },
  { title: "Example 4", snippet: "Snippet 4", link: "https://example4.com" },
  { title: "Example 5", snippet: "Snippet 5", link: "https://example5.com" },
  { title: "Example 6", snippet: "Snippet 6", link: "https://example6.com" },
];

const MOCK_RESULTS_2 = [
  { title: "Example 7", snippet: "Snippet 1", link: "https://example1.com" },
  { title: "Example 8", snippet: "Snippet 2", link: "https://example2.com" },
  { title: "Example 9", snippet: "Snippet 3", link: "https://example3.com" },
  { title: "Example 10", snippet: "Snippet 4", link: "https://example4.com" },
  { title: "Example 11", snippet: "Snippet 5", link: "https://example5.com" },
  { title: "Example 12", snippet: "Snippet 6", link: "https://example6.com" },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) return NextResponse.json({ error: "Query required" }, { status: 400 });

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

  if (query == "h") {
    return NextResponse.json({
      results: MOCK_RESULTS.map(({ title, snippet, link }) => ({
        title,
        description: snippet,
        link,
      })),
    });
  } else {
    return NextResponse.json({
      results: MOCK_RESULTS_2.map(({ title, snippet, link }) => ({
        title,
        description: snippet,
        link,
      })),
    });
  }  
}
