import {gql} from "apollo-boost";

export const GET_SPENDING_ITEMS = gql`
  query spending_item(
    $user_id: String!
    $spending_date_start: timestamptz!
    $spending_date_end: timestamptz!
  ) {
    spending_item(
      order_by: {created_time: desc}
      where: {
        user_id: {_eq: $user_id}
        spending_date: {_gte: $spending_date_start, _lt: $spending_date_end}
      }
    ) {
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
  query spending_category($user_id: String!) {
    spending_category(
      order_by: {order: asc}
      where: {user_id: {_eq: $user_id}}
    ) {
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
