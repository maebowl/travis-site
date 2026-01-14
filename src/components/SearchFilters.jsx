import React from 'react';

function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedDistillery,
  onDistilleryChange,
  selectedType,
  onTypeChange,
  selectedProofRange,
  onProofRangeChange,
  distilleries,
  types,
  proofRanges
}) {
  return (
    <div className="controls container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search bourbons..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Distillery:</label>
        <select
          value={selectedDistillery}
          onChange={(e) => onDistilleryChange(e.target.value)}
        >
          <option value="">All Distilleries</option>
          {distilleries.map((distillery) => (
            <option key={distillery} value={distillery}>
              {distillery}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Type:</label>
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Proof:</label>
        <select
          value={selectedProofRange}
          onChange={(e) => onProofRangeChange(parseInt(e.target.value))}
        >
          {proofRanges.map((range, index) => (
            <option key={index} value={index}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchFilters;
