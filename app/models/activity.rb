class Activity < ActiveHash::Base
    self.data = [
      { id: 1, name: '選択してください（任意）' },
      { id: 2, name: '観光地巡り' },
      { id: 3, name: '自然' },
      { id: 4, name: 'アウトドア' },
      { id: 5, name: '食べ歩き' },
      { id: 6, name: '食べ物' },
      { id: 7, name: 'ショッピング' },
    ]
    include ActiveHash::Associations
    has_many :plans
  end