# Nudle - A Search Engine

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

Nudle is a search engine that not only provides search results similar to Google but also summarizes the content of each page. This helps users quickly understand the main points of the pages without having to visit each one.

## Features

- Search functionality similar to Google
- Summarizes the content of each search result
- User-friendly interface

## Installation
To get a local copy up and running, follow these steps:
1. Clone the repository:
    ```sh
    git clone https://github.com/gmccannon/Senior-Project.git
    ```

2. Install dependencies:
    ```sh
    pnpm i
    ```

3. Create a `.env.local` file in the root directory and add your Google API key and Search Engine ID:
    ```env
    GOOGLE_API_KEY=your_google_api_key
    SEARCH_ENGINE_ID=your_search_engine_id
    ```

4. Start the development server:
    ```sh
    pnpm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a search query in the search bar and submit.
3. View the summarized search results.

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Google Search API
- Arxiv API
- Meilisearch
- Docker

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- Google Custom Search API
- Next.js Documentation
- React Documentation
- Tailwind CSS Documentation