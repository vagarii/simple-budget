import {gql} from "apollo-boost";

export const GET_SPENDING_ITEMS = gql`
  {
    spending_item {
      id
      amount
      description
      spending_category {
        category_icon {
          name
          color
        }
      }
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
        color2
      }
    }
  }
`;
