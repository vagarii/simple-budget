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

export const GET_SPENDING_CATEGORIES = gql`
  {
    spending_category {
      id
      name
      description
      category_icon {
        name
        color
      }
    }
  }
`;
