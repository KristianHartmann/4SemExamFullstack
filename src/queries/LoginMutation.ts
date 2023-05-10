import { gql } from "@apollo/client";

const LoginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export { LoginMutation };
