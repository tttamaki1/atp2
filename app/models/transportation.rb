class Transportation < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---' },
    { id: 2, name_ja: '電車', name_en: 'Train' },
    { id: 3, name_ja: 'タクシー', name_en: 'Taxi' },
    { id: 4, name_ja: 'レンタカー', name_en: 'Rental Car' },
    { id: 5, name_ja: 'マイカー', name_en: 'Private Car' },
    { id: 6, name_ja: 'シェアサイクル', name_en: 'Bike Share' },
    { id: 7, name_ja: '徒歩', name_en: 'Walking' },
    { id: 8, name_ja: 'バス', name_en: 'Bus' },
    { id: 9, name_ja: 'その他', name_en: 'Other' }
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
