import { gql } from "@apollo/client";

const GetRecipesByUserID = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      recipes {
        mealHeadline
        category {
          category
        }
        instructions
        mealThumbnail
        ingredients {
          name
          measure
        }
        mealVideo
      }
    }
  }
`;

export { GetRecipesByUserID };
