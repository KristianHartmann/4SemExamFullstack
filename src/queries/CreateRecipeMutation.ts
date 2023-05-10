import { gql } from "@apollo/client";

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($input: RecipeInput!) {
    createRecipe(input: $input) {
      mealHeadline
      category {
        id
      }
      instructions
      mealThumbnail
      mealVideo
      createdBy {
        id
      }
      ingredients {
        name
        measure
      }
    }
  }
`;
