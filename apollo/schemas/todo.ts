import { gql } from 'apollo-server-micro';

export default gql`
  type Todo {
    id: ID
    task: String
  }

  type Query {
    getTodoList: [Todo]
    getTodoTask(id: ID!): Todo!
  }

  input TodoInput {
    task: String
  }

  type Mutation {
    addTask(input: TodoInput): Todo
    updateTask(id: ID!, input: TodoInput): Todo
    removeTask(id: ID!): Boolean
  }
`;
