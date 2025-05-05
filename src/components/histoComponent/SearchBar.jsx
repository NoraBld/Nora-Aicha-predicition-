import React, { useState } from 'react';

const SearchBar = ({ predictions, onSelect }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = predictions.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className=" relative mb-4">
      <input
        type="text"
        placeholder="Rechercher une prédiction..."
        className="w-full p-3 rounded-lg bg-[#d3b185d8] border-1 border-blue-900 text-white placeholder-gray-300"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />
      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute  bg-[#d2c9b2] mt-2 rounded-lg shadow-lg z-10">
          {filtered.map(pred => (
            <li
              key={pred.id}
              className="p-3 hover:bg-[#c4bb9a] cursor-pointer"
              onClick={() => {
                onSelect(pred);
                setQuery(pred.title);
                setShowSuggestions(false);
              }}
            >
              {pred.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
