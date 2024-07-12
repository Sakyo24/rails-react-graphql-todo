require 'rails_helper'

RSpec.describe Resolvers::TodoResolver, type: :request do
  subject(:graphql_req) do
    post(
      graphql_path,
      params: { query: query, variables: variables }.to_json,
      headers: { 'CONTENT-TYPE': 'application/json' }
    )
  end

  let(:query) do
    <<-GRAPHQL
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
    GRAPHQL
  end

  let(:todo) { create(:todo) }

  describe '#resolve' do
    context 'when valid id' do
      let(:variables) { { id: todo.id } }

      it 'get todo' do
        graphql_req

        json = JSON.parse(response.body)
        res_todo = json['data']['todo']

        expect(response).to have_http_status(:ok)
        expect(res_todo['id']).to eq(todo.id.to_s)
        expect(res_todo['title']).to eq(todo.title)
        expect(res_todo['detail']).to eq(todo.detail)
      end
    end

    context 'when no exist id' do
      let(:variables) { { id: 0 } }

      it 'ActiveRecord::RecordNotFound error' do
        expect do
          graphql_req
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
