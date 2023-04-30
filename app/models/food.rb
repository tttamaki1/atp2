class Food < ActiveHash::Base
    self.data = [
      { id: 1, name: '---' },
      { id: 2, name: '高級レストラン' },
      { id: 3, name: 'ファーストフード' },
      { id: 4, name: '名物料理' },
      { id: 5, name: '海鮮料理' },
      { id: 6, name: '軽食' },
      { id: 7, name: 'カフェ' },
      { id: 8, name: '伝統料理' },
      { id: 9, name: 'ハラル' },
      { id: 10, name: 'その他' }
    ]

    include ActiveHash::Associations
    has_many :plans
  end
