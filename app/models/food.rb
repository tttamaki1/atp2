class Food < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---', name_cn: '---' },
    { id: 2, name_ja: 'レストラン', name_en: 'Restaurant', name_cn: '餐厅' },
    { id: 3, name_ja: 'シーフード', name_en: 'Seafood', name_cn: '海鲜' },
    { id: 4, name_ja: 'ステーキ', name_en: 'Meat Dishes', name_cn: '肉类菜肴' },
    { id: 5, name_ja: '麺類', name_en: 'Noodles', name_cn: '面条' },
    { id: 6, name_ja: 'カフェ', name_en: 'Cafe', name_cn: '咖啡厅' },
    { id: 7, name_ja: 'スイーツ', name_en: 'Sweets', name_cn: '甜点' },
    { id: 8, name_ja: '軽食', name_en: 'Snacks', name_cn: '小吃' },
    { id: 9, name_ja: 'ラーメン', name_en: 'Ramen Shop', name_cn: '拉面店' },
    { id: 10, name_ja: '寿司', name_en: 'Sushi Restaurant', name_cn: '寿司餐厅' },
    { id: 11, name_ja: '和食', name_en: 'Japanese Cuisine Restaurant', name_cn: '日本料理餐厅' },
    { id: 12, name_ja: 'ビュッフェ', name_en: 'Buffet-style Restaurant', name_cn: '自助餐厅' },
    { id: 13, name_ja: 'ベジタリアン', name_en: 'Vegetarian', name_cn: '素食' },
    { id: 14, name_ja: 'ヴィーガン', name_en: 'Vegan', name_cn: '纯素食' },
    { id: 15, name_ja: '名物料理', name_en: 'Local Specialty', name_cn: '地方特色菜' },
    { id: 16, name_ja: '伝統料理', name_en: 'Traditional', name_cn: '传统料理' },
    { id: 17, name_ja: '中華料理', name_en: 'Chinese Cuisine', name_cn: '中餐' },
    { id: 18, name_ja: 'ハラル', name_en: 'Halal', name_cn: '清真' },
    { id: 19, name_ja: 'その他', name_en: 'Other', name_cn: '其他' }
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

