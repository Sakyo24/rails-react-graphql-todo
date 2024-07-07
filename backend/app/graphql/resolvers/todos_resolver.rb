module Resolvers
  class TodosResolver < GraphQL::Schema::Resolver
    description 'Find todos'
    type [Types::ObjectTypes::TodoType], null: false

    def resolve
      Todo.all
    end
  end
end
