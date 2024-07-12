require 'rails_helper'

RSpec.describe Resolvers::TodosResolver, type: :request do
  subject(:graphql_req) do
    post(
      graphql_path,
      params: { query: query, variables: variables }.to_json,
      headers: { 'CONTENT-TYPE': 'application/json' }
    )
  end

  let(:query) do
    <<-GRAPHQL
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
    GRAPHQL
  end

  let(:total_count) { 30 }

  describe '#resolve' do
    before { create_list(:todo, total_count) }

    context 'when page is 1' do
      let(:variables) { { after: "0" } }

      it 'get todos' do
        graphql_req

        json = JSON.parse(response.body)

        todos_ids = Todo.order(created_at: :desc).limit(10).pluck(:id)
        res_todos = json['data']['todos']['nodes']

        expect(response).to have_http_status(:ok)
        expect(res_todos.map { |v| v['id'].to_i }).to eq(todos_ids)
        expect(json['data']['todos']['totalCount']).to eq(total_count)
      end
    end

    context 'when page is 2' do
      let(:variables) { { after: "10" } }

      it 'get todos' do
        graphql_req

        json = JSON.parse(response.body)

        todos_ids = Todo.order(created_at: :desc).offset(10).limit(10).pluck(:id)
        res_todos = json['data']['todos']['nodes']

        expect(response).to have_http_status(:ok)
        expect(res_todos.map { |v| v['id'].to_i }).to eq(todos_ids)
        expect(json['data']['todos']['totalCount']).to eq(total_count)
      end
    end
  end
end
