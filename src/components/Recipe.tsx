import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  useQuery,
  ApolloClient,
  NormalizedCacheObject,
  useMutation,
} from "@apollo/client";
import { GetRecipe } from "../queries/GetRecipe";
import { CREATE_REVIEW_MUTATION } from "../queries/CreateReview";
import { create } from "domain";
import facade from "../facades/apiFacade";
import { Review, ReviewInput, TokenPayload } from "../types/types";
interface CreateReviewProps {}

const Recipe = ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const { search } = useLocation();
  const recipeId = new URLSearchParams(search).get("id") as string;
  const [recipe, setRecipe] = useState<any>(null);
  const [averageRating, setAverageRating] = useState<number>(0);

  const [
    createReview,
    { loading: createReviewLoading, error: createReviewError },
  ] = useMutation(CREATE_REVIEW_MUTATION);

  const [decodedJwtToken, setDecodedJwtToken] = useState<TokenPayload | null>(
    null
  );
  const [reviewInput, setReviewInput] = useState<ReviewInput>({
    comment: "",
    rating: 1,
    createdBy: "",
    recipe: recipeId,
  });
  useEffect(() => {
    const decodedToken = facade.decodeToken();
    if (decodedToken) {
      setReviewInput({
        ...reviewInput,
        createdBy: decodedToken._id,
      });
    }
    setDecodedJwtToken(decodedToken);
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await client.query({
        query: GetRecipe,
        variables: { recipeId: recipeId },
      });
      const reviews = result.data.recipe.reviews;
      if (reviews.length > 0) {
        const totalRating = reviews.reduce(
          (sum: number, review: Review) => sum + review.rating,
          0
        );
        const average = totalRating / reviews.length;
        setAverageRating(average);
      } else {
        setAverageRating(0);
      }
      setRecipe(result.data.recipe);
    };
    fetchRecipe();
  }, [recipeId, client]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setReviewInput({ ...reviewInput, [name]: value });
  };

  const handleNumberchange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    let parsedValue;
    if (
      name === "rating" &&
      !isNaN(parseInt(value)) &&
      parseInt(value) <= 5 &&
      parseInt(value) >= 0
    ) {
      parsedValue = parseInt(value);
    }
    setReviewInput({ ...reviewInput, [name]: parsedValue });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (decodedJwtToken != null) {
      try {
        const { data } = await createReview({
          variables: {
            input: {
              ...reviewInput,
            },
            setReviewInput: {
              comment: "",
              rating: 1,
            },
          },
        });
        alert("Review created successfully");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You are not logged in!");
    }
  };

  if (!recipe) {
    return <div className="flex-grow flex h-screen">Couldn't find recipe</div>;
  }
  if (createReviewLoading) return <p>Creating review...</p>;
  if (createReviewError) return <p>Error: {createReviewError.message}</p>;

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
          <h2 className="text-2xl mb-2">
            Average Rating: {averageRating.toFixed(1)}/5
          </h2>
          <h2 className="text-xl font-bold mt-2">Ingredients: </h2>
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
            <p className="whitespace-pre-wrap">{recipe?.createdBy.email}</p>
          </div>
          {recipe?.reviews && (
            <div className="mt-4">
              <ul>
                {recipe?.reviews && (
                  <div className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Reviews:</h3>
                    <ul>
                      {recipe.reviews.map((review: Review) => (
                        <li className="mb-5" key={review.id}>
                          <p> By: {review.createdBy.email}</p>
                          <p>rating: {review.rating}/5</p>
                          <p>comment: {review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          )}

          {decodedJwtToken != null && (
            <div>
              <div className="border-t border-black my-4"></div>
              <form className="mt-5 flex-auto" onSubmit={handleSubmit}>
                <label className="flex flex-col font-bold mb-1 ">
                  Give a review!
                </label>
                <textarea
                  name="comment"
                  value={reviewInput.comment}
                  onChange={handleInputChange}
                  required
                  className="py-2 px-3 border rounded-md w-full focus:outline-none focus:shadow-outline"
                />
                <div className="mb-4">
                  <label className="blocktext-sm font-bold mb-2">Rating</label>
                  <select
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="rating"
                    onChange={handleNumberchange}
                    value={reviewInput.rating}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary text-sm py-1 px-2">
                  Submit
                </button>
              </form>
            </div>
          )}
          {recipe?.strYoutube && (
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
