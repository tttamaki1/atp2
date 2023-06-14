class Transportation < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---', name_cn: '---' },
    { id: 2, name_ja: '電車', name_en: 'Train', name_cn: '火车' },
    { id: 3, name_ja: 'タクシー', name_en: 'Taxi', name_cn: '出租车' },
    { id: 4, name_ja: 'レンタカー', name_en: 'Rental Car', name_cn: '租赁汽车' },
    { id: 5, name_ja: 'マイカー', name_en: 'Private Car', name_cn: '私人汽车' },
    { id: 6, name_ja: 'シェアサイクル', name_en: 'Bike Share', name_cn: '共享单车' },
    { id: 7, name_ja: '徒歩', name_en: 'Walking', name_cn: '步行' },
    { id: 8, name_ja: 'バス', name_en: 'Bus', name_cn: '公共汽车' },
    { id: 9, name_ja: 'その他', name_en: 'Other', name_cn: '其他' }
  ]

  include ActiveHash::Associations
  has_many :plans

  def translated_name
    case I18n.locale
    when :ja
      name_ja
    when :en
      name_en
    when :'zh-CN'
      name_cn
    else
      name
    end
  end
end
