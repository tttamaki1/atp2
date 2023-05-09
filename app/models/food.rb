class Food < ActiveHash::Base
  self.data = [
    { id: 1, name: '選択してください（任意）' },
    { id: 2, name: 'レストラン' },
    { id: 3, name: '海鮮' },
    { id: 4, name: '肉料理' },
    { id: 5, name: '麺類' },
    { id: 6, name: 'カフェ' },
    { id: 7, name: 'ベジタリアン' },
    { id: 8, name: 'ヴィーガン' },
    { id: 9, name: '軽食' },
    { id: 10, name: '名物' },
    { id: 11, name: '伝統' },
    { id: 12, name: 'ハラル' },
    { id: 13, name: 'その他' }
  ]

  include ActiveHash::Associations
  has_many :plans
end