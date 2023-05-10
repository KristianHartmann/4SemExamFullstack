import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_RECIPE_MUTATION } from "../queries/CreateRecipeMutation";
import { GET_CATEGORIES_QUERY } from "../queries/GetCategoriesQuery";
import facade from "../facades/apiFacade";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Token } from "graphql";

interface CreateRecipeProps {}

interface TokenPayload {
  _id: string;
  email: string;
  role: string;
}
interface TokenInput {
  token: string;
}

interface RecipeInput {
  mealHeadline: string;
  category: string;
  createdBy: string;
  ingredients: { name: string; measure: string }[];
  instructions: string;
  mealThumbnail?: string;
  mealVideo?: string;
  token: string;
}

interface Ingredient {
  name: string;
  measure: string;
}

const CreateRecipe = (props: CreateRecipeProps) => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES_QUERY);

  const isAdmin = facade.isAdmin();
  const [decodedJwtToken, setDecodedJwtToken] = useState<TokenPayload | null>(
    null
  );

  useEffect(() => {
    const decodedToken = facade.decodeToken();
    setDecodedJwtToken(decodedToken);
  }, []);

  useEffect(() => {
    setRecipeInput({
      ...recipeInput,
      token: localStorage.getItem("jwtToken") || "",
    });
    if (decodedJwtToken) {
      setRecipeInput({
        ...recipeInput,
        createdBy: decodedJwtToken._id,
        token: localStorage.getItem("jwtToken") || "",
      });
    }
  }, [decodedJwtToken]);

  const [recipeInput, setRecipeInput] = useState<RecipeInput>({
    mealHeadline: "",
    category: categoriesData?.categories[0]?.id || "",
    createdBy: "",
    ingredients: [{ name: "", measure: "" }],
    instructions: "",
    mealThumbnail: "",
    mealVideo: "",
    token: "",
  });

  const [
    createRecipe,
    { loading: createRecipeLoading, error: createRecipeError },
  ] = useMutation(CREATE_RECIPE_MUTATION);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setRecipeInput({ ...recipeInput, [name]: value });
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const ingredientsCopy: Ingredient[] = [...recipeInput.ingredients];
    ingredientsCopy[index] = {
      ...ingredientsCopy[index],
      [name]: value,
    };
    setRecipeInput({ ...recipeInput, ingredients: ingredientsCopy });
  };

  const handleAddIngredient = () => {
    setRecipeInput({
      ...recipeInput,
      ingredients: [...recipeInput.ingredients, { name: "", measure: "" }],
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAdmin) {
      try {
        const { data } = await createRecipe({
          variables: {
            input: {
              ...recipeInput,
              token: { token: recipeInput.token },
            },
          },
        });
        console.log(data);
        alert("Recipe created successfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You are not authorized to create a recipe");
    }
  };

  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Error: {categoriesError.message}</p>;
  if (createRecipeLoading) return <p>Creating recipe...</p>;
  if (createRecipeError) return <p>Error: {createRecipeError.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Recipe</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Meal Headline</span>
          <input
            type="text"
            name="mealHeadline"
            value={recipeInput.mealHeadline}
            onChange={handleInputChange}
            required
            className="py-2 px-3 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Category</span>
          <select
            name="category"
            value={recipeInput.category}
            onChange={handleInputChange}
            required
            className="py-2 px-3 border rounded-md"
          >
            {categoriesData.categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Ingredients</span>
          {recipeInput.ingredients.map(
            (ingredient: Ingredient, index: number) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(event) => handleIngredientChange(event, index)}
                  className="py-2 px-3 border rounded-md"
                />
                <input
                  type="text"
                  name="measure"
                  placeholder="Amount"
                  value={ingredient.measure}
                  onChange={(event) => handleIngredientChange(event, index)}
                  className="py-2 px-3 border rounded-md"
                />
              </div>
            )
          )}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 py-2 px-3 bg-blue-500 text-white rounded-md"
          >
            Add Another Ingredient
          </button>
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Instructions</span>
          <textarea
            name="instructions"
            value={recipeInput.instructions}
            onChange={handleInputChange}
            required
            className="py-2 px-3 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Meal Thumbnail</span>
          <input
            type="text"
            name="mealThumbnail"
            value={recipeInput.mealThumbnail}
            onChange={handleInputChange}
            className="py-2 px-3 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Video URL</span>
          <input
            type="text"
            name="mealVideo"
            value={recipeInput.mealVideo}
            onChange={handleInputChange}
            className="py-2 px-3 border rounded-md"
          />
        </label>
        <button
          type="submit"
          className="mt-4 py-2 px-3 bg-green-500 text-white rounded-md"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
