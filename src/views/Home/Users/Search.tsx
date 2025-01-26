"use client";
import { useState } from "react";
import { useData } from "./dataContext"; // Import your custom `useData` hook

const SearchInput = () => {
  const { filterState, filterDispatch } = useData(); // Access filter state and dispatch from context
  const [searchText, setSearchText] = useState(filterState.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    filterDispatch({ type: "SET_SEARCH_QUERY", payload: value });
  };

  return (
    <div className="search-container p-4 bg-gray-100 rounded-md">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search by full name or username"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchInput;
