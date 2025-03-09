import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { SearchResult } from "@/app/utils/getSearchResults";

// Determine the correct database path
let dbPath = path.join(process.cwd(), "database", "commoncrawl.db");

// Move to /tmp/
if (process.env.VERCEL) {
  const tmpDbPath = "/tmp/commoncrawl.db";
  if (!fs.existsSync(tmpDbPath)) {
    fs.copyFileSync(dbPath, tmpDbPath);
  }
  dbPath = tmpDbPath;
}

// Helper function to query the database
const queryDb = (query: string): Promise<SearchResult[]> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    db.all(
      "SELECT url as link, content as snippet FROM webpages WHERE link LIKE ? OR snippet LIKE ? LIMIT 20",
      [`%${query}%`, `%${query}%`],
      (err, rows) => {
        db.close();
        if (err) {
          console.error("Database query error:", err);
          reject(err);
        } else {
          resolve(rows as SearchResult[]);
        }
      }
    );
  });
};

// API handler function
export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    const results = await queryDb(query);
    if (results.length === 0) {
      return NextResponse.json({ message: "No results found" }, { status: 404 });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Error querying database";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
