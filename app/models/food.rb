class Food < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---' },
    { id: 2, name_ja: 'レストラン', name_en: 'Restaurant' },
    { id: 3, name_ja: 'シーフード', name_en: 'Seafood' },
    { id: 4, name_ja: 'ステーキ', name_en: 'Meat Dishes' },
    { id: 5, name_ja: '麺類', name_en: 'Noodles' },
    { id: 6, name_ja: 'カフェ', name_en: 'Cafe' },
    { id: 7, name_ja: 'スイーツ', name_en: 'Sweets' },
    { id: 8, name_ja: '軽食', name_en: 'Snacks' },
    { id: 9, name_ja: 'ラーメン', name_en: 'Ramen Shop' },
    { id: 10, name_ja: '寿司', name_en: 'Sushi Restaurant' },
    { id: 11, name_ja: 'ビュッフェ', name_en: 'Buffet-style' },
    { id: 12, name_ja: 'ベジタリアン', name_en: 'Vegetarian' },
    { id: 13, name_ja: 'ヴィーガン', name_en: 'Vegan' },
    { id: 14, name_ja: '名物料理', name_en: 'Local Specialty' },
    { id: 15, name_ja: '伝統料理', name_en: 'Traditional' },
    { id: 16, name_ja: '中華料理', name_en: 'Chinese Cuisine' },
    { id: 17, name_ja: 'ハラル', name_en: 'Halal' },
    { id: 18, name_ja: 'その他', name_en: 'Other' }
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
