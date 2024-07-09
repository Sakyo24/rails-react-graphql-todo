module Resolvers
  class TodoResolver < GraphQL::Schema::Resolver
    description 'Find a todo by ID'
    type Types::ObjectTypes::TodoType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      Todo.find(id)
    end
  end
end
