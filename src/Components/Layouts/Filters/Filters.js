import React from "react";
import DateInput from "../Filters/Date";
import Filter from "../Filters/Filter";
import ToggleFilters from "./ToggleFilters";

import "./Filters.css";

const Filters = ({
  showReporterFilter,
  showTypeFilter,
  showStartFilter,
  showEndFilter,
  updateFilter,
  updateRange,
  toggleFilter,
}) => {
  return (
    <div className="container">
      <div className="filters">
        <Filter
          field="district"
          placeholder="District"
          updateFilter={updateFilter}
        />

        {showReporterFilter && (
          <Filter
            field="repoter"
            placeholder="Reporter"
            updateFilter={updateFilter}
          />
        )}

        {showTypeFilter && (
          <Filter
            field="type"
            placeholder="Type"
            updateFilter={updateFilter}
            toggleDisplay={() => toggleFilter("type")}
          />
        )}

        {showStartFilter && (
          <DateInput
            name="start"
            label="Start"
            handleChange={updateRange}
            toggleDisplay={() => toggleFilter("start")}
          />
        )}

        {showEndFilter && (
          <DateInput
            name="end"
            label="End"
            handleChange={updateRange}
            toggleDisplay={() => toggleFilter("end")}
          />
        )}
      </div>
      <ToggleFilters toggleFilter={toggleFilter} />
    </div>
  );
};

export default Filters;
