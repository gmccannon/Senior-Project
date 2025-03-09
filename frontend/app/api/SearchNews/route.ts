import { NextResponse, NextRequest } from "next/server";

// NewsAPI response type
export interface NewsAPIItem {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    content: string;
    publishedAt: string;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`);
    
    const data = await response.json();

    if (data.status !== "ok") {
        return NextResponse.json({ error: data.message || "Error fetching news" }, { status: 500 });
    }

    const newsResults = data.articles.map((item: NewsAPIItem) => ({
        title: item.title,
        summary: item.description,
        link: item.url,
        imageLink: item.urlToImage,
        content: item.content,
    }));

    return NextResponse.json({ results: newsResults }, { status: 200 });
}
