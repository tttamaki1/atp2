class Accommodation < ActiveHash::Base
  self.data = [
    { id: 1, name: '---' },
    { id: 2, name: 'ホテル' },
    { id: 3, name: '民宿' },
    { id: 4, name: 'ホステル' },
    { id: 5, name: '温泉旅館' },
    { id: 6, name: 'ビジネスホテル' },
    { id: 7, name: 'カプセルホテル' }
  ]
  include ActiveHash::Associations
  has_many :plans
end
