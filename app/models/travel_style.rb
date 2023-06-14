class TravelStyle < ActiveHash::Base
  self.data = [
    { id: 1, name_ja: '---', name_en: '---', name_cn: '---' },
    { id: 2, name_ja: 'アクティブ', name_en: 'Active', name_cn: '活跃' },
    { id: 3, name_ja: 'リラックス', name_en: 'Relaxing', name_cn: '放松' },
    { id: 4, name_ja: 'ロマンチック', name_en: 'Romantic', name_cn: '浪漫' },
    { id: 5, name_ja: 'ファミリー', name_en: 'Family', name_cn: '家庭' },
    { id: 6, name_ja: 'アート', name_en: 'Art', name_cn: '艺术' },
    { id: 7, name_ja: 'カルチャー', name_en: 'Culture', name_cn: '文化' },
    { id: 8, name_ja: 'スポーツ', name_en: 'Sports', name_cn: '运动' },
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
