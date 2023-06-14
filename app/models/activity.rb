class Activity < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---', name_cn: '---' },
    { id: 2, name_ja: '観光地巡り', name_en: 'Sightseeing', name_cn: '观光游' },
    { id: 3, name_ja: '自然散策', name_en: 'Nature', name_cn: '自然漫步' },
    { id: 4, name_ja: 'ビーチリゾート', name_en: 'Beach Resort', name_cn: '海滩度假' },
    { id: 5, name_ja: 'ショッピング', name_en: 'Shopping', name_cn: '购物' },
    { id: 6, name_ja: 'フードツアー', name_en: 'Food Tour', name_cn: '美食之旅' },
    { id: 7, name_ja: 'ローカルマーケット', name_en: 'Local Market', name_cn: '本地市场' },
    { id: 8, name_ja: '美術館・博物館', name_en: 'Art / Museum', name_cn: '艺术 / 博物馆' },
    { id: 9, name_ja: '水族館・動物園', name_en: 'Aquarium / Zoo', name_cn: '水族馆 / 动物园' },
    { id: 10, name_ja: '植物園・庭園', name_en: 'Botanical Gardens / Gardens', name_cn: '植物园 / 公园' },
    { id: 11, name_ja: 'テーマパーク', name_en: 'Theme Park', name_cn: '主题公园' },
    { id: 12, name_ja: '公園', name_en: 'Park', name_cn: '公园' },
    { id: 13, name_ja: '文化体験', name_en: 'Cultural Experience', name_cn: '文化体验' },
    { id: 14, name_ja: '歴史', name_en: 'History', name_cn: '历史' },
    { id: 15, name_ja: 'お寺・神社・モスク', name_en: 'Temples Shrines Mosques', name_cn: '寺庙 神社 清真寺' },
    { id: 16, name_ja: 'その他', name_en: 'Other', name_cn: '其他' }
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
