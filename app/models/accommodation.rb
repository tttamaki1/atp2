class Accommodation < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---' },
    { id: 2, name_ja: 'ホテル', name_en: 'Hotel' },
    { id: 3, name_ja: '民宿', name_en: 'Ryokan' },
    { id: 4, name_ja: 'ホステル', name_en: 'Hostel' },
    { id: 5, name_ja: '温泉旅館', name_en: 'Hot Spring Inn' },
    { id: 6, name_ja: 'ビジネスホテル', name_en: 'Business Hotel' },
    { id: 7, name_ja: 'カプセルホテル', name_en: 'Capsule Hotel' }
  ]

  include ActiveHash::Associations
  has_many :plans

  def translated_name
    case I18n.locale
    when :ja
      name_ja
    when :en
      name_en
    else
      name
    end
  end
end
