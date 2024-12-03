import React, { useState } from 'react';
import './css/searchbar.css';

const SearchBar = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    filterType: 'source',
    searchTerm: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({ ...filters, searchTerm: '' }); // Preserve the filter type
    onReset();
  };

  return (
    <div className="search-bar">
      <select name="filterType" value={filters.filterType} onChange={handleInputChange}>
        <option value="source">Source</option>
        <option value="destination">Destination</option>
        <option value="middleRoute">Middle Route</option>
        <option value="time">Time</option>
      </select>
      <input
        type="text"
        name="searchTerm"
        placeholder={`Search ${filters.filterType}`}
        value={filters.searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SearchBar;
