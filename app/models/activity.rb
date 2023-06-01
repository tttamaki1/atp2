class Activity < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---' },
    { id: 2, name_ja: '観光地巡り', name_en: 'Sightseeing' },
    { id: 3, name_ja: '自然散策', name_en: 'Nature' },
    { id: 4, name_ja: 'ビーチリゾート', name_en: 'Beach Resort' },
    { id: 5, name_ja: 'ショッピング', name_en: 'Shopping' },
    { id: 6, name_ja: 'フードツアー', name_en: 'Food Tour' },
    { id: 7, name_ja: 'ローカルマーケット', name_en: 'Local Market' },
    { id: 8, name_ja: '美術館・博物館', name_en: 'Art / Museum' },
    { id: 9, name_ja: '水族館・動物園', name_en: 'Aquarium / Zoo' },
    { id: 10, name_ja: '植物園・庭園', name_en: 'Botanical Gardens / Gardens' },    
    { id: 11, name_ja: 'テーマパーク', name_en: 'Theme Park' },
    { id: 12, name_ja: '公園', name_en: 'Park' },
    { id: 13, name_ja: '文化体験', name_en: 'Cultural Experience' },
    { id: 14, name_ja: '歴史', name_en: 'History' },
    { id: 15, name_ja: '寺院・神社・モスク', name_en: 'Religion' },
    { id: 16, name_ja: 'その他', name_en: 'Other' }
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
