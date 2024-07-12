require 'rails_helper'

RSpec.describe Mutations::DeleteTodo, type: :request do
  subject(:graphql_req) do
    post(
      graphql_path,
      params: { query: query, variables: variables }.to_json,
      headers: { 'CONTENT-TYPE': 'application/json' }
    )
  end

  let(:query) do
    <<-GRAPHQL
      mutation deleteTodo($deleteTodoInput: DeleteTodoInput!) {
        deleteTodo(input: $deleteTodoInput) {
          id
        }
      }
    GRAPHQL
  end

  let(:todo) { create(:todo) }

  describe '#resolve' do
    context 'when valid input' do
      let(:delete_todo_input) do
        {
          deleteTodoInput: {
            id: todo.id
          }
        }
      end
      let(:variables) { delete_todo_input }

      it 'delete todo' do
        graphql_req

        json = JSON.parse(response.body)
        res_todo = json['data']['deleteTodo']

        expect(response).to have_http_status(:ok)
        expect(res_todo['id']).to eq(todo.id.to_s)
      end
    end

    context 'when invalid input no id' do
      let(:delete_todo_input) do
        {
          deleteTodoInput: {
            id: 0
          }
        }
      end
      let(:variables) { delete_todo_input }

      it 'ActiveRecord::RecordNotFound error' do
        expect do
          graphql_req
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
