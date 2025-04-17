import os
import sqlite3
import requests
from warcio.archiveiterator import ArchiveIterator

# Constants
COMMON_CRAWL_BASE_URL = "https://data.commoncrawl.org/"
WET_PATHS_FILE = "wet.paths"
DB_FILE = "commoncrawl.db"

# Initialize SQLite database
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Create table if it doesn't exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS webpages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT UNIQUE,
        content TEXT
    )
""")
conn.commit()

# Read wet.paths file and process each WET file
with open(WET_PATHS_FILE, "r") as paths_file:
    for line in paths_file:
        wet_url = COMMON_CRAWL_BASE_URL + line.strip()
        wet_filename = wet_url.split("/")[-1]

        # Download the WET file
        print(f"Downloading: {wet_url}")
        response = requests.get(wet_url, stream=True)
        if response.status_code == 200:
            with open(wet_filename, "wb") as wet_file:
                for chunk in response.iter_content(chunk_size=1024):
                    wet_file.write(chunk)
        else:
            print(f"Failed to download {wet_url}")
            continue

        # Process the downloaded WET file
        print(f"Processing: {wet_filename}")
        with open(wet_filename, "rb") as stream:
            for record in ArchiveIterator(stream):
                if record.rec_type == "conversion":
                    url = record.rec_headers.get_header("WARC-Target-URI")
                    text = record.content_stream().read().decode("utf-8")

                    # Insert into SQLite database
                    try:
                        cursor.execute("INSERT INTO webpages (url, content) VALUES (?, ?)", (url, text))
                        conn.commit()
                    except sqlite3.IntegrityError:
                        print(f"Duplicate URL skipped: {url}")

        # Delete the processed WET file to save space
        os.remove(wet_filename)
        print(f"Deleted: {wet_filename}")

# Close database connection
conn.close()
print("All WET files processed and stored in commoncrawl.db")
