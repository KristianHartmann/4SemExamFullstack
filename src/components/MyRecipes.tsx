import React, { useState, useEffect } from "react";
import {
  useQuery,
  ApolloClient,
  NormalizedCacheObject,
  useMutation,
} from "@apollo/client";
import { GetRecipesByUserID } from "../queries/GetRecipesByUserID";
import { DeleteRecipeById } from "../queries/DeleteRecipeByID";
import { EditRecipeById } from "../queries/EditRecipeById";
import facade from "../facades/apiFacade";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Category {
  category: string;
}

interface Ingredient {
  name: string;
  measure: string;
}

interface RecipeData {
  id: string;
  mealThumbnail: string;
  mealHeadline: string;
  category: Category;
  instructions: string;
  ingredients: Ingredient[];
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

interface EditRecipeInput {
  input: {
    token: {
      token: string;
    };
    id: string;
    mealHeadline?: string;
    mealVideo?: string;
    mealThumbnail?: string;
    instructions?: string;
    ingredients?: Ingredient[];
  };
}

const MyRecipes = ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const [recipeList, setRecipeList] = useState<RecipeData[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeData | undefined>();
  const [editRecipeData, setEditRecipeData] = useState<
    EditRecipeInput | undefined
  >();
  const userID = facade.getUserId();
  const [deleteRecipe, {}] = useMutation<DeleteRecipeInput>(DeleteRecipeById, {
    onCompleted: () => {
      // Refetch the recipes after successful deletion
      refetchRecipes();
    },
  });
  const [editRecipe, {}] = useMutation<RecipeData>(EditRecipeById, {
    onCompleted: () => {
      // Refetch the recipes after successful update
      refetchRecipes();
    },
  });

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
    await setRecipeData(recipe);
  };

  const handleEdit = async (recipe: EditRecipeInput) => {
    try {
      const updatedRecipe: RecipeData = {
        id: recipe.input.id,
        mealHeadline:
          recipe.input.mealHeadline || recipeData?.mealHeadline || "",
        mealVideo: recipe.input.mealVideo || recipeData?.mealVideo || "",
        mealThumbnail:
          recipe.input.mealThumbnail || recipeData?.mealThumbnail || "",
        instructions:
          recipe.input.instructions || recipeData?.instructions || "",
        ingredients: recipe.input.ingredients || recipeData?.ingredients || [],
        category: recipeData?.category || { category: "" },
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
      // Handle any error that occurs during the mutation
      console.log(error);
    }
  };

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
                  value={recipeData?.mealHeadline || ""}
                  onChange={(e) =>
                    setRecipeData((prevData: any) => ({
                      ...prevData,
                      mealHeadline: e.target.value,
                    }))
                  }
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
              {recipeData.ingredients &&
                Array.isArray(recipeData.ingredients) &&
                recipeData.ingredients.map(
                  (ingredient: Ingredient, index: number) => (
                    <div key={index} className="mb-4">
                      <label className="font-bold">Ingredient Name:</label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded py-2 px-3"
                        value={ingredient.name}
                      />
                      <label className="font-bold">Ingredient Measure:</label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded py-2 px-3"
                        value={ingredient.measure}
                      />
                    </div>
                  )
                )}
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
          <button
            onClick={() => handleEdit(recipeData)}
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
