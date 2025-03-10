import { NextResponse, NextRequest } from "next/server";

interface BookEntryFromAPI {
  title: string;
  author_name: string;
  first_publish_year: string;
  cover_edition_key: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const booksUrl = `https://openlibrary.org/search.json?q=${query}`;
    const response = await fetch(booksUrl);
    const data = await response.json();

    // Check for valid data
    if (!data) {
      return NextResponse.json({ error: "No data found" }, { status: 400 });
    }

    // Build the results
    const booksResults = data.docs
    .filter((item: BookEntryFromAPI) => item.title && item.author_name && item.cover_edition_key)
    .map((item: BookEntryFromAPI) => ({
        title: item.title,
        author: item.author_name[0],
        year: item.first_publish_year ? item.first_publish_year : "",
        coverLink: item.cover_edition_key,
    }));

    return NextResponse.json({ results: booksResults }, {status: 200});
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
