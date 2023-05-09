class TravelStyle < ActiveHash::Base
    self.data = [
      { id: 1, name: '選択してください（任意）' },
      { id: 2, name: 'アクティブ' },
      { id: 3, name: 'リラックス' },
      { id: 4, name: 'ロマンチック' },
      { id: 5, name: 'ファミリー' },
      { id: 6, name: 'その他' }
    ]
  
    include ActiveHash::Associations
    has_many :plans
  end
  