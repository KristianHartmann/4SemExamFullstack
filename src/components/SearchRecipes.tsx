import React, { useEffect, useState } from "react";
import { SearchRecipesText } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import ThumbnailNotFound from "../images/404ThumbnailNotFound.jpg";

interface Meal {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strTags: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
}

const SearchRecipes = () => {
  const [searchText, setSearchText] = useState("");
  const [categorySearchText, setCategorySearchText] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals));
  };

  const handleCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySearchText}`
    )
      .then((response) => response.json())
      .then((data) => setMeals(data.meals));
  };

  useEffect(() => {
    // e.preventDefault();
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategorySearchText(e.target.value);
  };

  const handleMealClick = (mealId: string) => {
    navigate(`/recipe?id=${mealId}`);
  };

  return (
    <section>
      <div className="p-5 heading2 w-11/12 mx-auto md:w-1/2 h-full rounded-lg shadow-lg flex flex-col bg-white mt-3">
        <div className="mb-5 font-sans text-center md:text-left">
          {
            SearchRecipesText.find((text) => text.id === "SearchRecipesText")
              ?.heading
          }
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <FontAwesomeIcon
                icon={faSearch}
                className="w-28px h-28px object-contain text-gray-500"
              />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 outline-none"
              placeholder="Search recipes..."
              required
              value={searchText}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              onClick={() => setIndex(0)}
              className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-tertiary font-medium rounded-lg text-sm px-4 py-2">
              Search
            </button>
          </div>
        </form>

        {/* Dropdown of categories */}
        <div className="relavte text-left border-red-500 mt-10">
          <div className="flex  justify-between select-none flex-col">
            <div className="mb-5 font-sans text-center md:text-left">
              Or select a category!
            </div>
            <div className="relative w-full lg:max-w-sm">
              <form onSubmit={handleCategorySubmit}>
                <select
                  id="DropdownMeals"
                  onChange={handleCategoryInputChange}
                  className="w-full p-2.5 text-gray-500  border rounded-md shadow-sm outline-none appearance-none focus:border-black bg-gray-50">
                  {categories.map((category) => (
                    <option key={category.idCategory}>
                      {category.strCategory}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  onClick={() => setIndex(0)}
                  className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-tertiary font-medium rounded-lg text-sm px-4 py-2">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        {meals && meals.length > 0 && (
          <div className="mt-4 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              {meals.slice(index, index + 6).map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer"
                  onClick={() => handleMealClick(meal.idMeal)}>
                  {meal.strMealThumb ? (
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full object-cover h-40 rounded-lg mb-4"
                    />
                  ) : (
                    <img
                      src={ThumbnailNotFound}
                      alt="Thumbnail Not Found"
                      className="w-full object-cover h-40 rounded-lg mb-4"
                    />
                  )}
                  <div className="text-sm font-medium text-gray-700 text-center">
                    {meal.strMeal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {meals && meals.length > 6 && (
          <div className="flex justify-center mt-4 items-center">
            <button
              className="bg-primary hover:bg-tertiary text-white font-medium rounded-lg text-sm px-4 py-2 mr-2"
              disabled={index === 0}
              onClick={() => setIndex(index - 6)}>
              Prev
            </button>
            <button
              className="bg-primary hover:bg-tertiary text-white font-medium rounded-lg text-sm px-4 py-2"
              disabled={index + 6 >= meals.length}
              onClick={() => setIndex(index + 6)}>
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchRecipes;
