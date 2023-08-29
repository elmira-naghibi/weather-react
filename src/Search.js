import React, { useState } from "react";

function Search({ refresh }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    refresh(value);
    setValue("");
  };

  return (
    <form className="float-left" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city"
        autoComplete="off"
        autoFocus={true}
        onChange={handleChange}
        value={value}
      />
      <input type="submit" value="Search" className="btn btn-primary" />
    </form>
  );
}

export default Search;
