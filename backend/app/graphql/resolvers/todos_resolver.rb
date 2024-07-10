module Resolvers
  class TodosResolver < GraphQL::Schema::Resolver
    description 'Find todos'
    type Types::ObjectTypes::TodoType.connection_type, null: false

    def resolve
      Todo.order(created_at: :desc).all
    end
  end
end
