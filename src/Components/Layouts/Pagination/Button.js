import React from "react";

const Button = ({ onClick, disabled, text }) => (
  <button className="awesome" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
