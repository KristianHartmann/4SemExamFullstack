import { gql } from "@apollo/client";

const EditRecipeById = gql`
  mutation Mutation($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
      mealVideo
      mealThumbnail
      mealHeadline
      instructions
      ingredients {
        measure
        name
      }
      id
    }
  }
`;

export { EditRecipeById };
