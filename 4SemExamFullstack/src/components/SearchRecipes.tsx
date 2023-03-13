import React from "react";
import { useState } from "react";
import { SearchRecipesText } from "../constants";

const SearchRecipes = () => {
  return (
    <section className="flex justify-center items-center bg-white p-5">
      <div className="flex flex-col heading2 text-center ">
      {
      SearchRecipesText.find((text) => text.id === "SearchRecipesText")
        ?.heading
      }
        </div>
    
    </section>
  

  );
};
export default SearchRecipes;
