class TravelStyle < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---' },
    { id: 2, name_ja: 'アクティブ', name_en: 'Active' },
    { id: 3, name_ja: 'リラックス', name_en: 'Relaxing' },
    { id: 4, name_ja: 'ロマンチック', name_en: 'Romantic' },
    { id: 5, name_ja: 'ファミリー', name_en: 'Family' },
    { id: 6, name_ja: 'その他', name_en: 'Other' }
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
