class Transportation < ActiveHash::Base
    self.data = [
      { id: 1, name: '選択してください（任意）' },
      { id: 2, name: '電車' },
      { id: 3, name: 'タクシー' },
      { id: 4, name: 'レンタカー' },
      { id: 5, name: 'マイカー' },
      { id: 6, name: 'シェアサイクル' },
      { id: 7, name: '徒歩' },
      { id: 8, name: 'バス' },
      { id: 9, name: 'その他' }
    ]
    include ActiveHash::Associations
    has_many :plans
  end