import requests
from bs4 import BeautifulSoup
import mysql.connector
from urllib.parse import urljoin, urlparse
from collections import deque

db_config = {
    "host": "localhost",
    "user": "user1",
    "password": "pass1",
    "database": "database1"
}

def init_db():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS crawled_pages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            url TEXT NOT NULL,
            title TEXT
        )
    """)
    conn.commit()
    cursor.close()
    conn.close()

def store_page(url, title):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO crawled_pages (url, title) VALUES (%s, %s)", (url, title))
    conn.commit()
    cursor.close()
    conn.close()

def crawl(start_url, max_pages=10):
    visited = set()
    queue = deque([start_url])

    while queue and len(visited) < max_pages:
        url = queue.popleft()
        if url in visited:
            continue
        try:
            response = requests.get(url, timeout=5)
            if response.status_code != 200:
                continue
            
            soup = BeautifulSoup(response.text, 'html.parser')
            title = soup.title.string if soup.title else 'No Title'
            store_page(url, title)
            print(f"Stored: {url} - {title}")
            
            visited.add(url)
            
            for link in soup.find_all('a', href=True):
                absolute_link = urljoin(url, link['href'])
                if urlparse(absolute_link).netloc == urlparse(start_url).netloc and absolute_link not in visited:
                    queue.append(absolute_link)
        except Exception as e:
            print(f"Failed to crawl {url}: {e}")

if __name__ == "__main__":
    init_db()
    start_url = "https://example.com"  # Change this to your starting URL
    crawl(start_url)
