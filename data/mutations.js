import {gql} from "apollo-boost";

export const INSERT_USER = gql`
  mutation($id: String, $name: String) {
    insert_user(objects: {id: $id, name: $name}) {
      affected_rows
    }
  }
`;

export const INSERT_SPENDING_ITEMS = gql`
  mutation(
    $description: String!
    $category_id: Int!
    $amount: money!
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
