import React from "react";
import "../styles/Homepage.css";
import { useState } from "react";

const Homepage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSearch = () => {
    console.log(searchInput);
    setSearchInput("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const submitTest = () => {
    console.log("submit test");
    const url =
      "https://gourministeriet.dk/wp-content/uploads/2020/01/IMG_0740-scaled.jpg";
    setImageUrl(url);
    setSearchInput("");
  };

  return (
    <div className="container">
      <h1>Are you feeling hungry? Search for a recipe right below!</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={submitTest}>
          Search
        </button>
      </div>
      {imageUrl && (
        <div>
          <img width="100" height="100" src={imageUrl} alt="Search result" />
        </div>
      )}
    </div>
  );
};
export default Homepage;
