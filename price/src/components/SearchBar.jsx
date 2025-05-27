
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for a skincare product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Compare Prices</button>
    </form>
  );
};

export default SearchBar;
