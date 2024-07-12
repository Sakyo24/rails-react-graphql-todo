require 'rails_helper'

RSpec.describe Mutations::UpdateTodo, type: :request do
  subject(:graphql_req) do
    post(
      graphql_path,
      params: { query: query, variables: variables }.to_json,
      headers: { 'CONTENT-TYPE': 'application/json' }
    )
  end

  let(:query) do
    <<-GRAPHQL
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
    GRAPHQL
  end

  let(:todo) { create(:todo) }

  describe '#resolve' do
    context 'when valid input' do
      let(:update_todo_input) do
        {
          updateTodoInput: {
            id: todo.id,
            title: 'test_title',
            detail: 'test_detail',
            isDone: true
          }
        }
      end
      let(:variables) { update_todo_input }

      it 'update todo' do
        graphql_req

        json = JSON.parse(response.body)
        res_todo = json['data']['updateTodo']['todo']

        expect(response).to have_http_status(:ok)
        expect(res_todo['id']).to eq(todo.id.to_s)
        expect(res_todo['title']).to eq(update_todo_input[:updateTodoInput][:title])
        expect(res_todo['detail']).to eq(update_todo_input[:updateTodoInput][:detail])
        expect(res_todo['isDone']).to eq(update_todo_input[:updateTodoInput][:isDone])
      end
    end

    context 'when invalid input no id' do
      let(:update_todo_input) do
        {
          updateTodoInput: {
            id: 0,
            title: 'test_title',
            detail: 'test_detail',
            isDone: true
          }
        }
      end
      let(:variables) { update_todo_input }

      it 'ActiveRecord::RecordNotFound error' do
        expect do
          graphql_req
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when invalid input without title' do
      let(:update_todo_input) do
        {
          updateTodoInput: {
            id: todo.id,
            title: '',
            detail: 'test_detail',
            isDone: true
          }
        }
      end
      let(:variables) { update_todo_input }

      it 'ActiveRecord::RecordInvalid error' do
        expect do
          graphql_req
        end.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when invalid input without detail' do
      let(:update_todo_input) do
        {
          updateTodoInput: {
            id: todo.id,
            title: 'test_title',
            detail: '',
            isDone: true
          }
        }
      end
      let(:variables) { update_todo_input }

      it 'ActiveRecord::RecordInvalid error' do
        expect do
          graphql_req
        end.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
