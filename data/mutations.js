import {gql} from "apollo-boost";

export const INSERT_USER = gql`
  mutation($id: String, $name: String) {
    insert_user(objects: {id: $id, name: $name}) {
      affected_rows
    }
  }
`;

export const INSERT_USER_SETTINGS = gql`
  mutation($user_id: String, $lock_calendar: Boolean) {
    insert_user_settings(
      objects: {user_id: $user_id, lock_calendar: $lock_calendar}
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_USER_SETTINGS = gql`
  mutation($user_id: String, $lock_calendar: Boolean) {
    update_user_settings(
      where: {user_id: {_eq: $user_id}}
      _set: {lock_calendar: $lock_calendar}
    ) {
      affected_rows
    }
  }
`;

export const INSERT_SPENDING_ITEMS = gql`
  mutation(
    $description: String!
    $category_id: Int!
    $amount: numeric!
    $user_id: String!
    $spending_date: timestamptz!
  ) {
    insert_spending_item(
      objects: {
        description: $description
        category_id: $category_id
        amount: $amount
        user_id: $user_id
        spending_date: $spending_date
      }
    ) {
      returning {
        id
        description
        amount
      }
    }
  }
`;

export const DELETE_SPENDING_ITEM = gql`
  mutation($id: Int!) {
    delete_spending_item(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export const DELETE_SPENDING_CATEGORY = gql`
  mutation($id: Int!) {
    delete_spending_category(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export const UPDATE_SPENDING_CATEGORY = gql`
  mutation update_spending_category(
    $id: Int!
    $name: String!
    $description: String!
    $budget_amount: numeric!
    $budget_time_duration: time_duration_enum!
    $budget_amount_per_day: numeric!
    $icon_id: Int!
  ) {
    update_spending_category(
      where: {id: {_eq: $id}}
      _set: {
        name: $name
        description: $description
        budget_amount: $budget_amount
        budget_time_duration: $budget_time_duration
        budget_amount_per_day: $budget_amount_per_day
        icon_id: $icon_id
      }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_SPENDING_CATEGORY = gql`
  mutation insert_spending_category(
    $user_id: String!
    $name: String!
    $description: String!
    $budget_amount: numeric!
    $budget_time_duration: time_duration_enum!
    $budget_amount_per_day: numeric!
    $icon_id: Int!
    $order: Int!
  ) {
    insert_spending_category(
      objects: {
        user_id: $user_id
        name: $name
        description: $description
        budget_amount: $budget_amount
        budget_time_duration: $budget_time_duration
        budget_amount_per_day: $budget_amount_per_day
        icon_id: $icon_id
        order: $order
      }
    ) {
      affected_rows
    }
  }
`;
