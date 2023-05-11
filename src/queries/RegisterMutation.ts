import { gql } from "@apollo/client";

const RegisterMutation = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      email
      password
    }
  }
`;

export { RegisterMutation };
