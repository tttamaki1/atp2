class Food < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---' },
    { id: 2, name_ja: 'レストラン', name_en: 'Restaurant' },
    { id: 3, name_ja: 'シーフード', name_en: 'Seafood' },
    { id: 4, name_ja: '肉料理', name_en: 'Meat Dishes' },
    { id: 5, name_ja: '麺類', name_en: 'Noodles' },
    { id: 6, name_ja: 'カフェ', name_en: 'Cafe' },
    { id: 7, name_ja: 'ベジタリアン', name_en: 'Vegetarian' },
    { id: 8, name_ja: 'ヴィーガン', name_en: 'Vegan' },
    { id: 9, name_ja: '軽食', name_en: 'Snacks' },
    { id: 10, name_ja: '名物', name_en: 'Local Specialty' },
    { id: 11, name_ja: '伝統', name_en: 'Traditional' },
    { id: 12, name_ja: 'ハラル', name_en: 'Halal' },
    { id: 13, name_ja: 'その他', name_en: 'Other' }
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
