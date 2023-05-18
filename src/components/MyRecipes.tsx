import React, { useState, useEffect } from "react";
import { useQuery, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GetRecipesByUserID } from "../queries/GetRecipesByUserID";
import facade from "../facades/apiFacade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/free-solid-svg-icons/faTrash";

interface RecipeData {
  id: string;
  mealThumbnail: string;
  mealHeadline: string;
  category: {
    category: string;
  };
  instructions: string;
  ingredients: {
    name: string;
    measure: string;
  };
  mealVideo: string;
}

const MyRecipes = ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const [recipeList, setRecipeList] = useState<RecipeData[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeData>();
  const userID = facade.getUserId();

  // const removeRecipe = () => {
  //   setRecipeList((prev) => !prev);
  // };

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await client.query({
        query: GetRecipesByUserID,
        variables: { userId: userID },
      });
      console.log(result.data.user.recipes);
      setRecipeList(result.data.user.recipes);
    };
    fetchRecipes();
  }, [client]);

  
  const handleRecipeClick = async (recipe: RecipeData) => {
    console.log("pre: " + recipe);
    console.log("pre: " + recipe.id);
    await setRecipeData(recipe);
    console.log(recipeData?.id);
  };

  return (
    <div>
      <div className="bg-gray-100 py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
        <ul className="space-y-4">
          {recipeList.map((recipe: RecipeData) => (
            <li
              key={recipe.mealHeadline}
              className="bg-white p-4 shadow-md flex items-center justify-between"
            >
              <h2
                className="text-xl font-bold cursor-pointer"
                onClick={() => handleRecipeClick(recipe)}
              >
                {recipe.mealHeadline}
              </h2>
              <button onClick={() => console.log("delete")} className="ml-4">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyRecipes;
