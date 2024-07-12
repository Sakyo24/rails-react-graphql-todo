require 'rails_helper'

RSpec.describe Mutations::CreateTodo, type: :request do
  subject(:graphql_req) do
    post(
      graphql_path,
      params: { query: query, variables: variables }.to_json,
      headers: { 'CONTENT-TYPE': 'application/json' }
    )
  end

  let(:query) do
    <<-GRAPHQL
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
    GRAPHQL
  end

  describe '#resolve' do
    context 'when valid input' do
      let(:create_todo_input) do
        {
          createTodoInput: {
            title: 'test_title',
            detail: 'test_detail'
          }
        }
      end
      let(:variables) { create_todo_input }

      it 'create todo' do
        graphql_req

        json = JSON.parse(response.body)
        res_todo = json['data']['createTodo']['todo']

        expect(response).to have_http_status(:ok)
        expect(res_todo['title']).to eq(create_todo_input[:createTodoInput][:title])
        expect(res_todo['detail']).to eq(create_todo_input[:createTodoInput][:detail])
      end
    end

    context 'when invalid input without title' do
      let(:create_todo_input) do
        {
          createTodoInput: {
            title: '',
            detail: 'test_detail'
          }
        }
      end
      let(:variables) { create_todo_input }

      it 'ActiveRecord::RecordInvalid error' do
        expect do
          graphql_req
        end.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when invalid input without detail' do
      let(:create_todo_input) do
        {
          createTodoInput: {
            title: 'test_title',
            detail: ''
          }
        }
      end
      let(:variables) { create_todo_input }

      it 'ActiveRecord::RecordInvalid error' do
        expect do
          graphql_req
        end.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
