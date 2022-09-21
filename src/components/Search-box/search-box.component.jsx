import React from "react";
import "./search-box.styles.css";

export const SearchBox = ({ placeholder, handleChange }) => (
  <input
    type="serch"
    className="search"
    placeholder={placeholder}
    onChange={handleChange}
  />
);
