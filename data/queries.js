import {gql} from "apollo-boost";

export const GET_USER_SETTINGS = gql`
  query user($user_id: String!) {
    user(where: {id: {_eq: $user_id}}) {
      user_settings {
        lock_calendar
      }
    }
  }
`;

export const GET_SPENDING_ITEMS = gql`
  query user(
    $user_id: String!
    $spending_date_start: timestamptz!
    $spending_date_end: timestamptz!
  ) {
    user(where: {id: {_eq: $user_id}}) {
      spending_items(
        order_by: {created_time: desc}
        where: {
          spending_date: {_gte: $spending_date_start, _lt: $spending_date_end}
        }
      ) {
        id
        amount
        description
        category_id
        spending_category {
          category_icon {
            name
            color
          }
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
      budget_amount_per_day
      budget_time_duration
      category_icon {
        id
        name
        color
        color2
        color3
      }
    }
  }
`;

export const GET_CATEGORY_SPENDING_ITEM_COUNT = gql`
  query spending_category($category_id: Int!) {
    spending_category(where: {id: {_eq: $category_id}}) {
      spending_items_aggregate {
        aggregate {
          count
        }
      }
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

export const GET_SPENDING_ITEMS_AGGREGATE = gql`
  query spending_category(
    $category_id: Int!
    $spending_date_start: timestamptz!
    $spending_date_end: timestamptz!
  ) {
    spending_category(where: {id: {_eq: $category_id}}) {
      spending_items_aggregate(
        where: {
          spending_date: {_gte: $spending_date_start, _lt: $spending_date_end}
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;

export const GET_CATEGORY_MAX_ORDER = gql`
  query spending_category_aggregate($user_id: String!) {
    spending_category_aggregate(where: {user_id: {_eq: $user_id}}) {
      aggregate {
        max {
          order
        }
      }
    }
  }
`;
