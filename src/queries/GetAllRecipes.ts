import { gql } from "@apollo/client";
export default {
  query: gql`
    query Recipes {
      recipes {
        id
        mealHeadline
        category {
          category
        }
        instructions
        mealThumbnail
        mealVideo
        createdBy {
          email
        }
        ingredients {
          measure
          name
        }
        reviews {
          comment
          createdBy {
            email
            id
          }
        }
      }
    }
  `,
};
