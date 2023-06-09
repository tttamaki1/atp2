require 'async'
require 'json'
require 'openai'
require 'async/http'

class OpenAiController < ApplicationController

  include ActionView::Helpers::SanitizeHelper #sanitizeメソッドを使えるようにするため

  def index
    @plan = Plan.new
  end

  def create

    @plan = Plan.new(plan_params)
    if @plan.save
      open_api_request(@plan)
    else
      render :index
    end
  end

  def open_api_request(plan)

    page_session_id = $page_session_id

    destination_prompt = "#{plan.destination}"
    if I18n.locale == :ja
      duration_prompt = "#{plan.duration}日間"
    elsif I18n.locale == :en
      duration_prompt = "#{plan.duration} days"
    end
    

    if plan.duration == 1
      recommendation = 5
    elsif (2..4).include?(plan.duration)
      recommendation = plan.duration * 4
    elsif (5..7).include?(plan.duration)
      recommendation = plan.duration * 3
    end

    recommendation_for_food = plan.duration * 3

    # budget_prompt = if plan.budget_option != 1
    #                   ''
    #                 else
    #                   if I18n.locale == :ja
    #                     "予算: #{plan.budget} 円"
    #                   elsif I18n.locale == :en
    #                     "budget: #{plan.budget} US Doller"
    #                   elsif I18n.locale == :'zh-CN'
    #                     "budget: #{plan.budget} 元"
    #                   end
    #                 end

    activity_prompt = if plan.activity_id != 1
                        if I18n.locale == :ja
                          "・#{destination_prompt}の、#{plan.activity.translated_name}のおすすめスポットの場所名だけを#{recommendation}個
                          を日本語で返してください。(適当な日本語名が無ければ、英語でもいいです)
                          ##形式## 1.
                          最後は改行してください"
                        elsif I18n.locale == :en
                          "・Please return the names of #{recommendation} recommended spots for #{plan.activity.translated_name}
                          at #{destination_prompt}, in English.
                           ##Format## 1.
                           Please include a line break at the end."
                          elsif I18n.locale == :'zh-CN'
                            "・请返回在#{destination_prompt}的#{plan.activity.translated_name}推荐的#{recommendation}个景点的中文名称。
                            ##格式## 1.
                            请在末尾包含一个换行符。"
                          end
                          
                      else
                          ''
                      end

    food_prompt = if plan.food_id != 1
                    if I18n.locale == :ja
                      "・#{destination_prompt}の#{plan.food.translated_name}のお店がもしあればそのお店の名前と
                      他にもおすすめの食事するお店の名前だけを、合計#{recommendation_for_food}個
                      を日本語で返してください。(適当な日本語名が無ければ、英語でもいいです)
                      ##形式## 1.
                      最後は改行してください"
                    elsif I18n.locale == :en
                      "・If there are any restaurants serving #{plan.food.translated_name}
                       in #{destination_prompt}, please provide the names of those restaurants
                       and #{recommendation_for_food} other recommended dining establishments in English.
                        ##Format## 1.
                        Please include a line break at the end."
                    elsif I18n.locale == :'zh-CN'
                      "・如果在#{destination_prompt}有任何提供#{plan.food.translated_name}的餐馆，
                        请提供这些餐馆的名称和其他#{recommendation_for_food}个推荐的餐饮场所的中文名称。
                        ##格式## 1.
                        请在结尾处包括一个换行符。"
                    end
                      

                  else
                      ''
                  end

    travel_style_prompt = if plan.travel_style_id != 1
                            if I18n.locale == :ja
                              "旅のスタイルは#{plan.travel_style.translated_name}です。"
                            elsif I18n.locale == :en
                              "The travel style is #{plan.travel_style.translated_name}."
                            elsif I18n.locale == :'zh-CN'
                              "旅行风格是#{plan.travel_style.translated_name}。"
                            end
                            
                            
                          else
                            ''
                          end

    transportation_prompt = if plan.transportation_id != 1
                              if I18n.locale == :ja
                                "交通: #{plan.transportation.translated_name}"
                              elsif I18n.locale == :en
                                "Transportation: #{plan.transportation.translated_name}"
                              elsif I18n.locale == :'zh-CN'
                                "交通方式：#{plan.transportation.translated_name}"
                              end
                              
                              
                            else
                              ''
                            end
    accommodation_prompt = if plan.accommodation_id != 1
                              if I18n.locale == :ja
                                "宿泊タイプ: #{plan.accommodation.translated_name}"
                              elsif I18n.locale == :en
                                "Accommodation Type: #{plan.accommodation.translated_name}"
                              elsif I18n.locale == :'zh-CN'
                                "住宿类型：#{plan.accommodation.translated_name}"
                              end
                              
                           else
                              ''
                           end
    if I18n.locale == :ja
      prompt = "
      Step by stepで
      ・#{destination_prompt}のおすすめ観光スポットの場所名だけを#{recommendation}個
      を日本語で返してください。(適当な日本語名が無ければ、英語でもいいです)
      ##形式## 1.
      最後は改行してください
      #{activity_prompt}
      #{food_prompt}
      #{travel_style_prompt}
      
     "
    elsif I18n.locale == :en
      prompt = "
       Step by step,
       ・Recommend #{recommendation} must-see spots in #{destination_prompt}. Please provide only their English names of the places.
        ##Format## 1.
        Please include a line break at the end.
       #{activity_prompt}
       #{food_prompt}
       #{travel_style_prompt}
      "
    elsif I18n.locale == :'zh-CN'
      prompt = "
       逐步说明，
       ・在#{destination_prompt}推荐#{recommendation}个必看景点。请只提供这些地方的名称。
        ##格式## 1.
        请在末尾包含一个换行符。
       #{activity_prompt}
       #{food_prompt}
       #{travel_style_prompt}
      "
    end


    output_text = ''
    Async do |task|
      client = OpenAI::Client.new(access_token: Rails.application.credentials.dig(:OPENAI_API_KEY))
      client.chat(
        parameters: {
          model: 'gpt-3.5-turbo-0613', # Required.
          messages: [{ role: 'user', content: prompt }], # Required.
          temperature: 1.0,
          max_tokens: 2048,
          stream: proc do |chunk, _bytesize|
            task.async do
              text = chunk.dig('choices', 0, 'delta', 'content')
              unless text.nil?
                text = sanitize(text.gsub(/\n/, '<br>'), tags: %w[br p h1 h2])
                output_text += text
                ActionCable.server.broadcast("second_channel:#{page_session_id}", text)
                
              end
            end
          end
        }
      )
    end

    puts prompt
    if I18n.locale == :ja
      prompt = "#{output_text}
      の場所名と#{plan.place_to_visit}からだけで、#{destination_prompt}#{duration_prompt}旅行プランを立ててください。
      時刻と、訪れる場所ですることを詳しく日本語で書いてください。
      
      例)
      テーマ#{destination_prompt}

      1日目

      10:00 - エッフェル塔

              高さ324mのパリの象徴的存在。パリ市内を一望でき、美しい景色が楽しめます。

      12:00 - エッフェル塔周辺のお土産屋さんでショッピング
      
              象徴的なタワーの周辺にはお土産屋さんがたくさんあります。地元のお土産を探しましょう

      "
    elsif I18n.locale == :en
      prompt = "#{output_text}
      Please create a #{destination_prompt}#{duration_prompt} travel plan based solely on the name of the place and
       #{plan.place_to_visit}.
       Please write in detail in English the times and things to do at the places you visit,

      Example)
      Theme#{destination_prompt}

      Day 1

      10:00 - Eiffel Tower

      An iconic presence in Paris with a height of 324m. You can overlook the city of Paris and enjoy the beautiful scenery.

      12:00 - Shopping at souvenir shops around the Eiffel Tower

      There are lots of souvenir shops around the iconic tower. Let's look for local souvenirs."
    elsif I18n.locale == :'zh-CN'
      prompt = "#{output_text}
      请根据地点名称和#{plan.place_to_visit}创建一份仅基于中文的#{destination_prompt}#{duration_prompt}旅行计划。
      请详细描述您在每个地点参观的时间和活动。
    
      示例)
      #{destination_prompt}主题
    
      第一天
    
      10:00 - 巴黎铁塔
    
      巴黎的标志性建筑，高达324米。您可以俯瞰巴黎市区并欣赏美丽的风景。
    
      12:00 - 在巴黎铁塔周围的纪念品商店购物
    
      在这个标志性塔周围有许多纪念品商店。让我们寻找当地的纪念品。"
    end
    


    Async do |task|
      client = OpenAI::Client.new(access_token: Rails.application.credentials.dig(:OPENAI_API_KEY))
      client.chat(
        parameters: {
          model: 'gpt-3.5-turbo-16k', # Required.
          messages: [{ role: 'user', content: prompt }], # Required.
          temperature: 0.5,
          max_tokens: 8192,
          # format: "html",
          stream: proc do |chunk, _bytesize|
                    task.async do
                      text = chunk.dig('choices', 0, 'delta', 'content')
                      unless text.nil?
                        max_day = 7
                        (1..max_day).each do |i|
                          if text.include?("#{i}日目")
                            html_text.gsub!(/#{i}日目\s*/,
                                            "<h3>#{i}日目</h3>")
                          elsif text.include?("Day #{i}")
                            html_text.gsub!(/Day\s{i}*/,
                                            "<h3>Day #{i}</h3>")
                          elsif text.include?("第#{i}天")
                            html_text.gsub!(/第#{i}天\s*/,
                                            "<h3>第#{i}天</h3>")
                          end
                        end
                        html_text = sanitize("<pre>" + text.gsub(/\n/, '<br>'), tags: %w[br p h1 h2 h3])
                        ActionCable.server.broadcast("open_ai_channel:#{page_session_id}", html_text)
                      end
                    end
                  end
        }
      )
    end
  end

  def search
    plans = Plan.search(params[:keyword])
  end

  private

  def plan_params
    params.require(:plan).permit(:destination, :duration, :activity_id, :transportation_id,
                                 :accommodation_id, :food_id, :travel_style_id, :place_to_visit)
  end
end
