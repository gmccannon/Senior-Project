import React, { useState } from 'react';

interface MainSearchBarProps {
  onSearch: (input: string) => void;
}

const MainSearchBar: React.FC<MainSearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState("");
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      onSearch(input);
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
        />
      </form>
    );
  };

  export default MainSearchBar;
  