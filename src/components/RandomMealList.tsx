import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/SearchRecipes.css";

interface Meal {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strTags: string;
}

function RandomMealList(): JSX.Element {
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      const cachedMeals = localStorage.getItem("meals");
      const cachedTime = localStorage.getItem("time");

      if (cachedMeals && cachedTime) {
        const parsedTime = parseInt(cachedTime, 10);
        const currentTime = new Date().getTime();
        const timeDiff = (currentTime - parsedTime) / (1000 * 60 * 60);

        if (timeDiff < 2) {
          // check if cache is less than 2 hours old
          setMeals(JSON.parse(cachedMeals));
          return;
        }
      }

      const responses = await Promise.all(
        Array.from({ length: 6 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        )
      );
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      const meals = data.map((response) => response.meals[0]); // Access the meals array from the response object

      setMeals(meals);
      localStorage.setItem("meals", JSON.stringify(meals));
      localStorage.setItem("time", new Date().getTime().toString());
    };

    fetchMeals();
  }, []);


  const handleMealClick = (mealId: string) => {
    navigate(`/recipe?id=${mealId}`);
  };
  return (
    <div className="flex flex-col justify-center items-center mb-10 cursor-pointer">
      <h2 className="heading1 text-2xl font-bold text-center SearchRecipesHeading mb-10 mt-10">
        Check out some the latest and coolest recipes!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-3/4">
        {meals.map((meal, index) => (
          <div
            key={meal.strMeal}
            className={`bg-white rounded-lg shadow-md flex flex-col items-center ${
              index >= 3 ? "hidden md:block" : ""
            }`}
            onClick={() => handleMealClick(meal.idMeal)}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded-t-lg w-full"
            />
            <div className="p-4">
              <div className="text-lg font-bold mb-2">{meal.strMeal}</div>
              <div className="text-sm text-gray-600 mb-2">
                {meal.strCategory}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomMealList;
