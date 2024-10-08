import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (value.length > 2) {  // Only search if there are at least 3 characters
        setIsLoading(true);
        setHasSearched(true);
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a452ad27bbc1c5209f9a3a9222c23ca&query=${value}`);
          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }
          const data = await response.json();
          if (data.results && Array.isArray(data.results)) {
            onSearch(data.results, false, true);
          } else {
            throw new Error('Invalid data format');
          }
        } catch (err) {
          console.error(err);
          onSearch([], false, true);
        } finally {
          setIsLoading(false);
        }
      } else {
        onSearch([], false, false);
        setHasSearched(false);
      }
    }, 300),  // 300ms delay
    [onSearch]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch([], false, false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 pr-10 mb-4 border rounded"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
        X
        </button>
      )}
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;