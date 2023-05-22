import { gql } from "@apollo/client";

const EditRecipeById = gql`
mutation Mutation($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
  }
`;

export { EditRecipeById };
