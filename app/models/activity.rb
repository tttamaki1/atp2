class Activity < ActiveHash::Base
  self.data = [
    { id: 1, name: '選択してください（任意）' },
    { id: 2, name: '観光地巡り' },
    { id: 3, name: '自然' },
    { id: 4, name: 'ビーチリゾート' },
    { id: 5, name: '美術館・博物館' },
    { id: 6, name: '水族館・動物園' },
    { id: 7, name: 'ショッピング' },
    { id: 8, name: 'フードツアー' },
    { id: 9, name: '文化体験' },
    { id: 10, name: '歴史' },
    { id: 11, name: '宗教' },
    { id: 12, name: 'その他' }

  ]
  include ActiveHash::Associations
  has_many :plans
end
