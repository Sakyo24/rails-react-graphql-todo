import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
	mutation createTodo($createTodoInput: CreateTodoInput!) {
		createTodo(input: $createTodoInput) {
			todo {
				id
				title
				detail
				isDone
				createdAt
				updatedAt
			}
		}
	}
`;

export const UPDATE_TODO = gql`
	mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
		updateTodo(input: $updateTodoInput) {
			todo {
				id
				title
				detail
				isDone
				createdAt
				updatedAt
			}
		}
	}
`;

export const DELETE_TODO = gql`
	mutation deleteTodo($deleteTodoInput: DeleteTodoInput!) {
		deleteTodo(input: $deleteTodoInput) {
			id
		}
	}
`;
