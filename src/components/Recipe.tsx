import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GetRecipe } from "../queries/GetRecipe";
import mongoose from "mongoose";

const Recipe = ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const { search } = useLocation();
  const recipeId = new URLSearchParams(search).get("id") as string;
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      let recipe;

      if (mongoose.Types.ObjectId.isValid(recipeId)) {
        const result = await client.query({
          query: GetRecipe,
          variables: { recipeId: recipeId },
        });
        recipe = result.data.recipe;
      } else {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await response.json();
        console.log(data);
        const ingredients = [];
        const meal = data.meals[0];

        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];

          if (ingredient && measure) {
            ingredients.push({ name: ingredient, measure });
          }
        }

        recipe = {
          mealHeadline: meal.strMeal,
          instructions: meal.strInstructions,
          mealThumbnail: meal.strMealThumb,
          mealVideo: meal.strYoutube,
          category: {
            category: meal.strCategory,
          },
          ingredients,
        };
      }
      console.log(recipe);
      setRecipe(recipe);
    };

    fetchRecipe();
  }, [recipeId, client]);

  if (!recipe) {
    return <div className="flex-grow flex h-screen"></div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 mb-10 mt-10">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg shadow-lg overflow-hidden  bg-white">
        <img
          src={recipe?.mealThumbnail}
          alt={recipe?.mealHeadline}
          className="w-full max-h-60 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{recipe?.mealHeadline}</h2>
          <div className="flex flex-wrap">
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <div key={index} className="w-1/2">
                {ingredient.name} - {ingredient.measure}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Instructions:</h3>
            <p className="whitespace-pre-wrap">{recipe?.instructions}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Made by:</h3>
            <p className="whitespace-pre-wrap">{recipe?.createdBy?.email}</p>
          </div>
          {recipe?.reviews && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Reviews:</h3>
              <ul>
                {recipe.reviews.map((review: any) => (
                  <li key={review.id}>
                    <p className="font-bold">{review.author}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe?.mealVideo && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Video Guide:</h3>
              <p>Check out a video guide on how to do the recipe below:</p>
              <iframe
                className="w-full"
                height="315"
                src={`https://www.youtube.com/embed/${recipe?.mealVideo.slice(
                  -11
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
