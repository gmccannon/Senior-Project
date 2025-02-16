"use client"

import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from './nudle.module.css';

const Home = () => {
  const [results, setResults] = useState<SearchResult[]>([]);

  interface SearchResult {
    title: string;
    description: string;
  }

  const handleSearch = async (query: string): Promise<void> => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data: { results: SearchResult[] } = await response.json();
      console.log('Search results:', data.results);
      setResults(data.results);

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Nudle</h1>
      <div className={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.results}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className={styles.result}>
              <h2>{result.title}</h2>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;