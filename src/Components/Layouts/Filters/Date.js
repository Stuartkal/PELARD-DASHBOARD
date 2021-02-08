import React from "react";
import "./Date.css";

const Date = ({ handleChange, name, label }) => {
  return (
    <div className="date">
      <label for={name}>{label}</label>
      <input
        name={name}
        className="filter"
        size="20"
        onChange={(event) => handleChange(name, event.target.value)}
        type="date"
      />
    </div>
  );
};

export default Date;
