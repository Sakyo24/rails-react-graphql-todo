module Mutations
  class DeleteTodo < BaseMutation
    field :id, ID, null: false

    argument :id, ID, required: true

    def resolve(**args)
      Todo.find(args[:id]).delete

      { id: args[:id] }
    end
  end
end
