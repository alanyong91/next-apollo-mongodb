import { gql } from '@apollo/client';

export const GET_TODO_LIST = gql`
  query {
    getTodoList {
      id
      task
    }
  }
`;

export const GET_TODO_TASK = gql`
  query($id: ID!) {
    getTodoTask(id: $id) {
      id
      task
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($input: TodoInput!) {
    addTask(input: $input) {
      id
      task
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($id: ID!, $input: TodoInput!) {
    updateTask(id: $id, input: $input) {
      id
      task
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation removeTask($id: ID!) {
    removeTask(id: $id)
  }
`;
