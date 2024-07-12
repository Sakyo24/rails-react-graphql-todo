require 'rails_helper'

RSpec.describe Todo, type: :model do
  let(:todo) { create(:todo) }

  describe 'validates' do
    context 'when factory is created by FactoryBot' do
      it 'todo is valid' do
        expect(todo).to be_valid
      end
    end

    context 'when title is nil' do
      it 'todo is invalid' do
        todo.title = nil
        expect(todo).to be_invalid
      end
    end

    context 'when detail is nil' do
      it 'todo is invalid' do
        todo.detail = nil
        expect(todo).to be_invalid
      end
    end
  end
end
