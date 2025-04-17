import os
import requests
import redis
from warcio.archiveiterator import ArchiveIterator

# Constants
COMMON_CRAWL_BASE_URL = "https://data.commoncrawl.org/"
WET_PATHS_FILE = "wet.paths"
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))

# Connect to Redis
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

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
                    try:
                        text = record.content_stream().read().decode("utf-8")

                        # Store in Redis only if key doesn't exist
                        if not r.exists(url):
                            r.set(url, text)
                        else:
                            print(f"Duplicate URL skipped: {url}")
                    except Exception as e:
                        print(f"Error processing {url}: {e}")

        # Delete the processed WET file to save space
        os.remove(wet_filename)
        print(f"Deleted: {wet_filename}")

print("All WET files processed and stored in Redis.")
