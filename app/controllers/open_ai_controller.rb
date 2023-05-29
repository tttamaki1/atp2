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

    tab_session_id = $tab_session_id

    destination_prompt = "#{plan.destination}"
    duration_prompt = "#{plan.duration}日間"

    recommendation = plan.duration * 3
    recommendation = 20 if recommendation >= 20

    budget_prompt = if plan.budget_option != 1
                      ''
                    else
                      if I18n.locale == :ja
                        "予算: #{plan.budget} 円"
                      elsif I18n.locale == :en
                        "budget: #{plan.budget} US Doller"
                      end
                    end

    activity_prompt = if plan.activity_id != 1
                        if I18n.locale == :ja
                          "・#{destination_prompt}の、#{plan.activity.name}のおすすめスポットを#{recommendation}個
                          英語名で返してください。形式 1."
                        elsif I18n.locale == :en
                          "・Please return #{recommendation} recommended spots for #{plan.activity.name}
                           at #{destination_prompt}, in English. Format: 1."
                        end
                      else
                          ''
                      end

    food_prompt = if plan.food_id != 1
                    if I18n.locale == :ja
                      "・#{destination_prompt}のおすすめレストランと#{plan.food.name}のお店を#{recommendation}個
                      英語名で返してください。形式 1."
                    elsif I18n.locale == :en
                      "・Please return #{recommendation} recommended restaurants and #{plan.food.name} shops
                       at #{destination_prompt}, in English. Format: 1."
                    end

                  else
                      ''
                  end

    travel_style_prompt = if plan.travel_style_id != 1
                            if I18n.locale == :ja
                              "旅のスタイルは#{plan.travel_style.name}です。"
                            elsif I18n.locale == :en
                              "The travel style is #{plan.travel_style.name}."
                            end
                            
                          else
                            ''
                          end

    transportation_prompt = if plan.transportation_id != 1
                              if I18n.locale == :ja
                                "交通: #{plan.transportation.name}"
                              elsif I18n.locale == :en
                                "Transportation: #{plan.transportation.name}"
                              end
                              
                            else
                              ''
                            end
    accommodation_prompt = if plan.accommodation_id != 1
                              if I18n.locale == :ja
                                "宿泊タイプ: #{plan.accommodation.name}"
                              elsif I18n.locale == :en
                                "Accommodation Type: #{plan.accommodation.name}"
                              end
                           else
                              ''
                           end
    if I18n.locale == :ja
      prompt = "
      Step by stepで
      ・#{destination_prompt}のおすすめ観光スポットを#{recommendation}個
      英語名で返してください。形式 1.
      #{activity_prompt}
      #{food_prompt}
      #{travel_style_prompt}
     "
    elsif I18n.locale == :en
      prompt = "
       Step by step,
       ・Recommend #{recommendation} must-see spots in #{destination_prompt}. Please provide their English names. Format: 1.
       #{activity_prompt}
       #{food_prompt}
       #{travel_style_prompt}
      "
    end


    output_text = ''
    Async do |task|
      client = OpenAI::Client.new(access_token: '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')
      client.chat(
        parameters: {
          model: 'gpt-3.5-turbo', # Required.
          messages: [{ role: 'user', content: prompt }], # Required.
          temperature: 0.1,
          max_tokens: 2048,
          stream: proc do |chunk, _bytesize|
            task.async do
              text = chunk.dig('choices', 0, 'delta', 'content')
              unless text.nil?
                text = sanitize(text.gsub(/\n/, '<br>'), tags: %w[br p h1 h2])
                output_text += text
                ActionCable.server.broadcast("second_channel:#{tab_session_id}", text)
                
              end
            end
          end
        }
      )
    end

    puts prompt
    if I18n.locale == :ja
      prompt = "#{output_text}
      の情報から、#{destination_prompt}#{duration_prompt}旅行プランを立ててください。
      時刻と、訪れる場所ですることを具体的に日本語で詳しく書いてください。

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
      From the information in #{output_text}, please create a travel plan for #{destination_prompt}#{duration_prompt}.
       Please write in detail in English the times and things to do at the places you visit.

      Example)
      Theme#{destination_prompt}
      Day 1

      10:00 - Eiffel Tower

      An iconic presence in Paris with a height of 324m. You can overlook the city of Paris and enjoy the beautiful scenery.

      12:00 - Shopping at souvenir shops around the Eiffel Tower

      There are lots of souvenir shops around the iconic tower. Let's look for local souvenirs."
    end


    Async do |task|
      client = OpenAI::Client.new(access_token: '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')
      client.chat(
        parameters: {
          model: 'gpt-3.5-turbo', # Required.
          messages: [{ role: 'user', content: prompt }], # Required.
          temperature: 1.0,
          max_tokens: 2048,
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
                          end
                        end
                        html_text = sanitize("<pre>" + text.gsub(/\n/, '<br>'), tags: %w[br p h1 h2 h3])
                        ActionCable.server.broadcast("open_ai_channel:#{tab_session_id}", html_text)
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
    params.require(:plan).permit(:destination, :duration, :budget_option, :budget, :activity_id, :transportation_id,
                                 :accommodation_id, :food_id, :travel_style_id, :place_to_visit)
  end
end
