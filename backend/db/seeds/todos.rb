300.times do |n|
  Todo.create!(
    title: "テストTODO#{n + 1}",
    detail: "テストTODO#{n + 1}の詳細です。",
    is_done: (n + 1) % 2 == 0
  )
end
