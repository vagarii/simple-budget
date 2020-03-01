import {gql} from "apollo-boost";

export const INSERT_USER = gql`
  mutation($id: String, $name: String) {
    insert_user(objects: {id: $id, name: $name}) {
      affected_rows
    }
  }
`;

export const INSERT_TODO = gql`
  mutation(
    $description: String!
    $category_id: Int!
    $amount: money!
    $user_id: String!
  ) {
    insert_spending_item(
      objects: {
        description: $description
        category_id: $category_id
        amount: $amount
        user_id: $user_id
      }
    ) {
      returning {
        id
        description
      }
    }
  }
`;
