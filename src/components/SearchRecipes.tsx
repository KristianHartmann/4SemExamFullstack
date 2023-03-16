import React from "react";
import { useState } from "react";
import { SearchRecipesText } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
const SearchRecipes = () => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
  });

  

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searched");
    console.log(filters);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };  
  };

  return (
    <section>

   
      <div className="p-5 heading2 bg-white w-1/2 mx-auto h-96 ">
        <div className="mb-5 font-sans">
        {
        SearchRecipesText.find((text) => text.id === "SearchRecipesText")
        ?.heading
        }
        </div>
  
        <form onSubmit={handleSubmit}>
           <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none ">
              <FontAwesomeIcon
              icon={faSearch}
                className="w-28px h-28px object-contain text-gray-500"
         />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm border border-gray-300  rounded-lg bg-gray-50 outline-none"
          placeholder="Search recipes..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-tertiary font-medium rounded-lg text-sm px-4 py-2">
          Search
        </button>
      </div>
    </form>

        </div>
        </section>
  

  );
};
export default SearchRecipes;
