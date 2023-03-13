import React from "react";
import { useState } from "react";
import { SearchRecipesText } from "../constants";

const SearchRecipes = () => {
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
    <section id="searchrecipes">
      <div className="container mx-auto py-4 flex flex-col">
        <div className="text-1.5xl font-bold mb-4 items-center">
          {
            SearchRecipesText.find((text) => text.id === "SearchRecipesText")
              ?.heading
          }
        </div>
        <div className="flex items-center mb-4">
          <input
            className=""
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
          />
          <button
            className="py-2 px-4 rounded-r-lg bg-primary hover:bg-secondary text-white font-bold focus:outline-none"
            type="submit"
            onClick={submitTest}>
            Search
          </button>
        </div>
        {imageUrl && (
          <div className="max-w-xs">
            <img src={imageUrl} alt="Search result" className="w-full h-auto" />
          </div>
        )}
      </div>
    </section>
  );
};
export default SearchRecipes;
