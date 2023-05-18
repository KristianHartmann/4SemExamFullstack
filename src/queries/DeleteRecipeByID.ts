import { gql } from "@apollo/client";

const DeleteRecipeById = gql`
  mutation Mutation($input: DeleteRecipeInput!) {
    deleteRecipe(input: $input)
  }
`;

export { DeleteRecipeById };
