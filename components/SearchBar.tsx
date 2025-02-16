import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                required
                className="flex-grow p-2 border border-gray-300 rounded-l-md text-black placeholder-gray-500"
                />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md ml-2">Search</button>
        </form>
    );
};

export default SearchBar;