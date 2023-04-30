class Plan < ApplicationRecord
    extend ActiveHash::Associations::ActiveRecordExtensions
    belongs_to :activity
    belongs_to :transportation
    belongs_to :accommodation
    belongs_to :food

    validates :destination, :duration,:budget_option, presence: true
    # validates :activity_id, numericality: { other_than: 1 }
    # validates :transportation_id, numericality: { other_than: 1 }
    # validates :accommodation_id, numericality: { other_than: 1 }
    # validates :food_id, numericality: { other_than: 1 }
end