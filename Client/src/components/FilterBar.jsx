import React from 'react';

const FilterBar = ({ filters, setFilters }) => (
  <div className="flex flex-wrap gap-4 mb-4">
    <select
      className="border p-2 rounded"
      value={filters.subCategory || ''}
      onChange={e => setFilters(f => ({ ...f, subCategory: e.target.value }))}
    >
      <option value="">All Categories</option>
      <option value="Flats">Flats</option>
      <option value="Builder Floors">Builder Floors</option>
      <option value="House Villas">House Villas</option>
      <option value="Plots">Plots</option>
      <option value="Farmhouses">Farmhouses</option>
      <option value="Hotels">Hotels</option>
      <option value="Lands">Lands</option>
      <option value="Office Spaces">Office Spaces</option>
      <option value="Hostels">Hostels</option>
      <option value="Shops Showrooms">Shops Showrooms</option>
    </select>
    <select
      className="border p-2 rounded"
      value={filters.listingType || ''}
      onChange={e => setFilters(f => ({ ...f, listingType: e.target.value }))}
    >
      <option value="">All Listings</option>
      <option value="Rent">Rent</option>
      <option value="Sale">Sale</option>
    </select>
    <select
      className="border p-2 rounded"
      value={filters.price || ''}
      onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
    >
      <option value="">Any Price</option>
      <option value="0-1000000">Below 10L</option>
      <option value="1000000-5000000">10L - 50L</option>
      <option value="5000000-10000000">50L - 1Cr</option>
      <option value="10000000-">Above 1Cr</option>
    </select>
  </div>
);

export default FilterBar; 