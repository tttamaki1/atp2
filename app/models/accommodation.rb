class Accommodation < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---', name_cn: '---' },
    { id: 2, name_ja: 'ホテル', name_en: 'Hotel', name_cn: '酒店' },
    { id: 3, name_ja: '民宿', name_en: 'Ryokan', name_cn: '旅馆' },
    { id: 4, name_ja: 'ホステル', name_en: 'Hostel', name_cn: '宿舍' },
    { id: 5, name_ja: '温泉旅館', name_en: 'Hot Spring Inn', name_cn: '温泉旅馆' },
    { id: 6, name_ja: 'ビジネスホテル', name_en: 'Business Hotel', name_cn: '商务酒店' },
    { id: 7, name_ja: 'カプセルホテル', name_en: 'Capsule Hotel', name_cn: '胶囊旅馆' }
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
