import requests
from bs4 import BeautifulSoup
import sqlite3
from urllib.parse import urljoin, urlparse
import time

# SQLite connection settings
db_connection = sqlite3.connect("wiki_articles.db")  # The SQLite database file
cursor = db_connection.cursor()

# Create table if not exists
cursor.execute("""
    CREATE TABLE IF NOT EXISTS crawled_pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        url TEXT UNIQUE,
        snippet TEXT
    );
""")
db_connection.commit()

# Function to extract a snippet (first paragraph) from a Wikipedia page
def get_snippet(soup):
    paragraphs = soup.find_all('p')
    if paragraphs:
        return paragraphs[0].get_text(strip=True)
    return "No snippet available"

# Normalize URL to avoid duplicates
def normalize_url(url, base_url):
    # Remove fragments to avoid crawling the same page with different fragment
    parsed_url = urlparse(urljoin(base_url, url))
    return parsed_url._replace(fragment='').geturl()

# Function to crawl a Wikipedia page
def crawl_page(url, visited):
    if url in visited:
        return
    visited.add(url)

    print(f"Crawling: {url}")
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract title and snippet
        title = soup.find('h1').get_text(strip=True)
        snippet = get_snippet(soup)

        # Insert data into SQLite database
        cursor.execute("""
            INSERT OR IGNORE INTO crawled_pages (title, url, snippet) 
            VALUES (?, ?, ?);
        """, (title, url, snippet))
        db_connection.commit()

        # Find the first valid link in the body of the article
        body_content = soup.find('div', {'class': 'mw-parser-output'})
        if body_content:
            links = body_content.find_all('a', href=True)
            for link in links:
                href = link['href']

                # Skip external links or links with fragments
                if '//' in href or href.startswith('#'):
                    continue

                # Follow the first valid Wikipedia internal link (like articles, files, categories)
                if href.startswith('/wiki/'):
                    new_url = normalize_url(href, url)
                    if new_url not in visited:
                        crawl_page(new_url, visited)
                    break  # Only follow the first valid link
        time.sleep(1)  # Be polite to the server
    except requests.RequestException as e:
        print(f"Error crawling {url}: {e}")

# Starting point: Wikipedia article (e.g., Kevin Bacon)
start_url = "https://en.wikipedia.org/wiki/Kevin_Bacon"
visited_urls = set()

# Start crawling
crawl_page(start_url, visited_urls)

# Close database connection
cursor.close()
db_connection.close()
