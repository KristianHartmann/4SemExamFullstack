import { gql } from "@apollo/client";

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($input: RecipeInput!) {
    createRecipe(input: $input) {
      id
      mealHeadline
      category {
        id
        name
      }
      createdBy
      ingredients {
        name
        measure
      }
      instructions
      mealThumbnail
      mealVideo
    }
  }
`;
