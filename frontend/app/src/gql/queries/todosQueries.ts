import { gql } from "@apollo/client";

export const GET_TODOS = gql`
	query getTodos($after: String!) {
		todos(first: 10, after: $after) {
			nodes {
				id
				title
				detail
				isDone
				createdAt
				updatedAt
			}
			pageInfo {
				endCursor
				hasNextPage
				startCursor
				hasPreviousPage
			}
			totalCount
		}
	}
`;

export const GET_TODO = gql`
	query getTodo($id: ID!) {
		todo(id: $id) {
			id
			title
			detail
			isDone
			createdAt
			updatedAt
		}
	}
`;
