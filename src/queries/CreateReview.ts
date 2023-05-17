import { gql } from "@apollo/client";

export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      comment
      createdBy {
        id
      }
      rating
      recipe {
        id
      }
    }
  }
`;
