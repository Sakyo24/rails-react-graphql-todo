module Mutations
  class CreateTodo < BaseMutation
    field :todo, Types::ObjectTypes::TodoType, null: true

    argument :title, String, required: true
    argument :detail, String, required: true

    def resolve(**args)
      todo = Todo.create!(args)

      { todo: todo }
    end
  end
end
