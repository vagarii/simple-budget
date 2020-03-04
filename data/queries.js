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

export const GET_SPENDING_ITEMS_FOR_CATEGORY = gql`
  query spending_item($user_id: String!, $category_id: Int!) {
    spending_item(
      where: {user_id: {_eq: $user_id}, category_id: {_eq: $category_id}}
    ) {
      id
    }
  }
`;

export const GET_CATEGORY_ICONS = gql`
  query category_icon {
    category_icon(order_by: {id: asc}) {
      id
      name
      color
      color2
    }
  }
`;
