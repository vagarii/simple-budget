import {gql} from "apollo-boost";

export const GET_SPENDING_ITEMS = gql`
  {
    spending_item {
      id
      amount
      description
    }
  }
`;
