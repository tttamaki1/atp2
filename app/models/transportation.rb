class Transportation < ActiveHash::Base
    self.data = [
      { id: 1, name: '選択してください（任意）' },
      { id: 2, name: '電車' },
      { id: 3, name: 'バス' },
      { id: 4, name: 'タクシー' },
      { id: 5, name: '自転車' },
      { id: 6, name: '徒歩' },
      { id: 7, name: 'レンタカー' },
      { id: 8, name: 'シェアサイクル' },
      { id: 9, name: 'マイカー' }
    ]
    include ActiveHash::Associations
    has_many :plans
  end