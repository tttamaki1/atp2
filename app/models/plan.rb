class Plan < ApplicationRecord
    extend ActiveHash::Associations::ActiveRecordExtensions
    belongs_to :activity
    belongs_to :transportation
    belongs_to :accommodation
    belongs_to :food

    validates :destination, :duration, presence: true
end