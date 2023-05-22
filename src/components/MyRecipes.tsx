import React, { useState, useEffect } from "react";
import { GetRecipesByUserID } from "../queries/GetRecipesByUserID";
import { DeleteRecipeById } from "../queries/DeleteRecipeByID";
import { EditRecipeById } from "../queries/EditRecipeById";
import {
  ApolloClient,
  NormalizedCacheObject,
  useMutation,
} from "@apollo/client";
import facade from "../facades/apiFacade";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Ingredient {
  name: string;
  measure: string;
}

interface RecipeData {
  id: string;
  mealHeadline: string;
  mealVideo: string;
  mealThumbnail: string;
  instructions: string;
  ingredients: Ingredient[];
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
  const [recipeData, setRecipeData] = useState<RecipeData | undefined>();
  const userID = facade.getUserId();
  const [deleteRecipe, { loading, error }] = useMutation<DeleteRecipeInput>(
    DeleteRecipeById,
    {
      onCompleted: () => {
        refetchRecipes();
      },
    }
  );
  const [editRecipe, {}] = useMutation<RecipeData>(EditRecipeById, {
    onCompleted: () => {},
  });

  const refetchRecipes = async () => {
    const { data } = await client.query({
      query: GetRecipesByUserID,
      variables: { userId: userID },
      fetchPolicy: "network-only",
    });
    setRecipeList(data.user.recipes);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await client.query({
        query: GetRecipesByUserID,
        variables: { userId: userID },
      });
      setRecipeList(data.user.recipes);
    };
    fetchRecipes();
  }, [client]);

  const handleRecipeClick = async (recipe: RecipeData) => {
    setRecipeData(recipe);
  };

  const handleEdit = async (recipe: RecipeData) => {
    try {
      const updatedRecipe: RecipeData = {
        id: recipe.id,
        mealHeadline: recipe.mealHeadline,
        mealVideo: recipe.mealVideo,
        mealThumbnail: recipe.mealThumbnail,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients.map((ingredient) => ({
          name: ingredient.name,
          measure: ingredient.measure,
        })),
      };

      await editRecipe({
        variables: {
          input: {
            token: {
              token: facade.getToken(),
            },
            ...updatedRecipe,
          },
        },
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDeleteRecipe = async (recipe: RecipeData) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [recipeData]);

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div>
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
                  className="w-4 h-4 object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form>
        <div className="mt-5 p-4 shadow-md w-1/2 justify-center items-center flex flex-col bg-white py-10 mx-auto">
          {recipeData && (
            <div>
              <div className="mb-4">
                <label className="font-bold">Meal Headline:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.mealHeadline}
                  onChange={(e) =>
                    setRecipeData((prevData) => ({
                      ...prevData!,
                      mealHeadline: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="font-bold">Instructions:</label>
                <textarea
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.instructions}
                  onChange={(e) =>
                    setRecipeData((prevData) => ({
                      ...prevData!,
                      instructions: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="font-bold">Meal Thumbnail:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.mealThumbnail}
                  onChange={(e) =>
                    setRecipeData((prevData) => ({
                      ...prevData!,
                      mealThumbnail: e.target.value,
                    }))
                  }
                />
              </div>
              {recipeData.ingredients &&
                Array.isArray(recipeData.ingredients) &&
                recipeData.ingredients.map((ingredient, index: number) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded py-2 px-3"
                      value={ingredient.name}
                      onChange={(e) =>
                        setRecipeData((prevData) => {
                          const updatedIngredients = [...prevData!.ingredients];
                          updatedIngredients[index] = {
                            ...updatedIngredients[index],
                            name: e.target.value,
                          };
                          return {
                            ...prevData!,
                            ingredients: updatedIngredients,
                          };
                        })
                      }
                    />
                    <input
                      type="text"
                      className="border border-gray-300 rounded py-2 px-3"
                      value={ingredient.measure}
                      onChange={(e) =>
                        setRecipeData((prevData) => {
                          const updatedIngredients = [...prevData!.ingredients];
                          updatedIngredients[index] = {
                            ...updatedIngredients[index],
                            measure: e.target.value,
                          };
                          return {
                            ...prevData!,
                            ingredients: updatedIngredients,
                          };
                        })
                      }
                    />
                  </div>
                ))}

              <div className="mb-4">
                <label className="font-bold">Meal Video:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded py-2 px-3"
                  value={recipeData.mealVideo}
                  onChange={(e) =>
                    setRecipeData((prevData) => ({
                      ...prevData!,
                      mealVideo: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
          <button
            onClick={() => handleEdit(recipeData!)}
            className="btn-primary justify-center scale-75"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyRecipes;
