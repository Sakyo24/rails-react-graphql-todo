module Types
  module ObjectTypes
    class TodoType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :detail, String, null: false
      field :is_done, Boolean, null: false
      field :deleted_at, GraphQL::Types::ISO8601DateTime
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    end
  end
end
