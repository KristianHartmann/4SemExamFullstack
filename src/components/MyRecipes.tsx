import React, { useState, useEffect } from "react";
import {
  useQuery,
  ApolloClient,
  NormalizedCacheObject,
  useMutation,
} from "@apollo/client";
import { GetRecipesByUserID } from "../queries/GetRecipesByUserID";
import { DeleteRecipeById } from "../queries/DeleteRecipeByID";
import facade from "../facades/apiFacade";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
interface DeleteRecipeInput {
  input: {
    token: {
      token: string;
    };
    id: string;
  };
}

const MyRecipes = ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const [recipeList, setRecipeList] = useState<RecipeData[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeData>();
  const userID = facade.getUserId();
  const [deleteRecipe, { loading, error }] = useMutation<DeleteRecipeInput>(
    DeleteRecipeById,
    {
      onCompleted: () => {
        // Refetch the recipes after successful deletion
        refetchRecipes();
      },
    }
  );

  const refetchRecipes = async () => {
    const result = await client.query({
      query: GetRecipesByUserID,
      variables: { userId: userID },
      fetchPolicy: "network-only",
    });
    console.log(result.data.user.recipes);
    setRecipeList(result.data.user.recipes);
  };

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
    console.log("pre: " + recipe.instructions);
    await setRecipeData(recipe);
  };
  const handleEdit = async (recipe: RecipeData) => {};

  const handleDeleteRecipe = async (recipe: RecipeData) => {
    console.log("delete recipe:", recipe);
    try {
      await deleteRecipe({
        variables: {
          input: {
            token: {
              token: facade.getToken(),
            },
            id: recipe.id,
          },
        },
      });
      setRecipeList((prevRecipeList) =>
        prevRecipeList.filter((item) => item.id !== recipe.id)
      );
      // window.location.reload();
    } catch (error) {
      // Handle any error that occurs during the mutation
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(recipeData?.id);
  }, [recipeData]);

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="">
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
              <button
                onClick={() => handleDeleteRecipe(recipe)}
                className="ml-4"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-28px h-28px object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form>
        <div className="mt-5 p-4 shadow-md w-1/2 justify-center items-center flex flex-col bg-white py-10 mx-auto">
          {recipeData && (
            <div className="">
              <div className="mb-4">
                <label className="font-bold">Meal Headline:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.mealHeadline}
                />
              </div>
              <div className="mb-4">
                <label className="font-bold">Category:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.category.category}
                />
              </div>
              <div className="mb-4">
                <label className="font-bold">Instructions:</label>
                <textarea
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.instructions}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="font-bold">Meal Thumbnail:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.mealThumbnail}
                />
              </div>
              <div className="mb-4">
                <label className="font-bold">Ingredients Name:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.ingredients.name}
                />
              </div>
              <div className="mb-4">
                <label className="font-bold">Ingredients Measure:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.ingredients.measure}
                />
              </div>
              <div className="mb-4">
                <label className="font-bold">Meal Video:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.mealVideo}
                />
              </div>
            </div>
          )}
          <button className="btn-primary justify-center scale-75">Edit</button>
        </div>
      </form>
    </div>
  );
};

export default MyRecipes;
