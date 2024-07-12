FactoryBot.define do
  factory :todo do
    sequence(:title) { |n| "title#{n}" }
    sequence(:detail) { |n| "detail#{n}" }
    sequence(:is_done, &:even?)
  end
end
