import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import "../styles/SearchRecipes.css";
import GetAllRecipes from "../queries/GetAllRecipes";
interface Meal {
  id: string;
  mealThumbnail: string;
  mealHeadline: string;
  category: {
    category: string;
  };
}

const RandomMealList = ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}) => {
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
      const result = await client.query(GetAllRecipes);
      let randomRecipes = result.data.recipes.slice(0);
      for (let i = randomRecipes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomRecipes[i], randomRecipes[j]] = [
          randomRecipes[j],
          randomRecipes[i],
        ];
      }
      randomRecipes = randomRecipes.slice(0, 6);

      console.log(result);
      // const responses = await Promise.all(
      //   Array.from({ length: 6 }, () =>
      //     fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      //   )
      // );

      // for (let i = 0; i < responses.length; i++) {
      //   for (let j = i + 1; j < responses.length; j++) {
      //     if (JSON.stringify(responses[i]) === JSON.stringify(responses[j])) {
      //       const newResponse = await fetch(
      //         "https://www.themealdb.com/api/json/v1/1/random.php"
      //       );
      //       responses[j] = newResponse;
      //     }
      //   }
      // }

      // const data = await Promise.all(
      //   responses.map((response) => response.json())
      // );

      setMeals(randomRecipes);
      localStorage.setItem("meals", JSON.stringify(result.data.recipes));
      localStorage.setItem("time", new Date().getTime().toString());
    };

    fetchMeals();
  }, []);

  const handleMealClick = (id: string) => {
    navigate(`/recipe?id=${id}`);
  };
  return (
    <div className="flex flex-col justify-center items-center mb-10 cursor-pointer">
      <h2 className="heading1 text-2xl font-bold text-center SearchRecipesHeading mb-10 mt-10">
        Check out some the latest and coolest recipes!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-3/4">
        {meals.map((meal, index) => (
          <div
            key={meal.mealHeadline}
            className={`bg-white rounded-lg shadow-md flex flex-col items-center ${
              index >= 3 ? "hidden md:block" : ""
            }`}
            onClick={() => handleMealClick(meal.id)}
          >
            <img
              src={meal.mealThumbnail}
              alt={meal.mealHeadline}
              className="rounded-t-lg w-full"
            />
            <div className="p-4">
              <div className="text-lg font-bold mb-2">{meal.mealHeadline}</div>
              <div className="text-sm text-gray-600 mb-2">
                {meal.category.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomMealList;
