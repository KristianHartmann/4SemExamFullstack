import React, { useState, useEffect } from "react";
import { useQuery, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GetRecipesByUserID } from "../queries/GetRecipesByUserID";
import facade from "../facades/apiFacade";

interface RecipeData {
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

// interface RecipeList {
//   recipelist: [
//     {
//       headline: string;
//     }
//   ];
// }

const MyRecipes = ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const [recipeList, setRecipeList] = useState<RecipeData[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeData>();
  const userID = facade.getUserId();

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

  return (
    <div className="bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
      <ul className="space-y-4">
        {recipeList &&
          recipeList.map((recipe: RecipeData) => (
            <li key={recipe.mealHeadline} className="bg-white p-4 shadow-md">
              <h2 className="text-xl font-bold">{recipe.mealHeadline}</h2>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
