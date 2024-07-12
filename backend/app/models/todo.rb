class Todo < ApplicationRecord
  validates :title, presence: true
  validates :detail, presence: true
end
