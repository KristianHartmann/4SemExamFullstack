import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface RecipeProps {}

const Recipe: React.FC<RecipeProps> = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id') as string;
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setRecipe(data.meals[0]);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div className='flex-grow flex h-screen'></div>;
  }

  const ingredients: string[] = [];
  const measurements: string[] = [];

  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(recipe[`strIngredient${i}`]);
      measurements.push(recipe[`strMeasure${i}`]);
    } else {
      break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 mb-10 mt-10">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg shadow-lg overflow-hidden  bg-white">
        <img
          src={recipe?.strMealThumb}
          alt={recipe?.strMeal}
          className="w-full max-h-60 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{recipe?.strMeal}</h2>
          <div className="flex flex-wrap">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="w-1/2">
                {ingredient} - {measurements[index]}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Instructions:</h3>
            <p className="whitespace-pre-wrap">{recipe?.strInstructions}</p>
          </div>
          {recipe?.strYoutube && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Video Guide:</h3>
              <p>
                Check out a video guide on how to do the recipe below:
              </p>
              <iframe
                className="w-full"
                height="315"
                src={`https://www.youtube.com/embed/${recipe?.strYoutube.slice(-11)}`}
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
