import React from "react";
import "./Filters.css";

const Filter = ({ updateFilter, field, placeholder }) => {
  const handleChange = (event) => updateFilter(field, event.target.value);

  return (
    <div>
      <input
        className="filter"
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Filter;
