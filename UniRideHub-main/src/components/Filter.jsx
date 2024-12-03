import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
 const [filter, setFilter] = useState('');

 const handleFilter = (e) => {
   setFilter(e.target.value);
   onFilter(e.target.value);
 };

 return (
   <select onChange={handleFilter}>
     <option value="">Select Filter</option>
     <option value="source">Source</option>
     <option value="destination">Destination</option>
     <option value="middleRoute">Middle Route</option>
     <option value="time">Time</option>
   </select>
 );
};

export default Filter;
