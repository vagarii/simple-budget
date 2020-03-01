import {gql} from "apollo-boost";

export const GET_TODOS = gql`
  {
    spending_item {
      id
      description
    }
  }
`;
