import { gql } from "@apollo/client";

const GetRecipe = gql`
  query GetRecipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      ingredients {
        name
        measure
      }
      instructions
      mealThumbnail
      mealHeadline
      mealVideo
      createdBy {
        email
      }
      category {
        category
      }
      reviews {
        comment
        createdBy {
          email
        }
      }
    }
  }
`;

export { GetRecipe };
