import React from "react";

const ToggleFilters = ({ toggleFilter }) => {
  return (
    <select
      className="awesome"
      value={"Toggle Filters"}
      onChange={(e) => {
        toggleFilter(e.target.value);
      }}
    >
      {["type", "start", "end", "reporter", "Toggle Filters"].map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default ToggleFilters;
