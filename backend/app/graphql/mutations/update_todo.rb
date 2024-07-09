module Mutations
  class UpdateTodo < BaseMutation
    field :todo, Types::ObjectTypes::TodoType, null: true

    argument :id, ID, required: true
    argument :title, String, required: true
    argument :detail, String, required: true
    argument :is_done, Boolean, required: true

    def resolve(**args)
      todo = Todo.find(args[:id])
      todo.update!(args)
      {
        todo: todo
      }
    end
  end
end
