# Nudle

Nudle is a Google search engine clone that summarizes each page. This project was developed by Elia Albaba and George McCannon as part of their senior project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
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
- Google Custom Search API

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- Google Custom Search API
- Next.js Documentation
- React Documentation
- Tailwind CSS Documentation