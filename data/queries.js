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
      budget_amount
      budget_time_duration
      category_icon {
        id
        name
        color
        color2
      }
    }
  }
`;
