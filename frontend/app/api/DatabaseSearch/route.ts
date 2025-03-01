import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

// Open database (this link will change when the database is deployed)
const db = new sqlite3.Database("database/web_crawler.db");

// Helper function to query the database
const queryDb = (query: string): Promise<{ title: string; snippet: string; link: string }[]> => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT title, url AS link, snippet FROM crawled_pages WHERE link LIKE ? OR title LIKE ? OR snippet LIKE ?",
        [`%${query}%`, `%${query}%`, `%${query}%`],  
        (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            console.log("Query Result:", rows);
            resolve(rows);
          }
        }
      );
    });
  };
  

// API handler function
export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    const results: { title: string; snippet: string; link: string }[] = await queryDb(query);

    if (results.length === 0) {
      return NextResponse.json({ message: "No results found" }, { status: 404 });
    }

    return NextResponse.json({
      results: results.map(({ title, snippet, link }) => ({
        title,
        description: snippet,
        link,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Error querying database" }, { status: 500 });
  }
}
