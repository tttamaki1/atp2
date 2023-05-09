
  require "async"
  require "json"
  require "openai"
  require "async/http"
  
  class OpenAiController < ApplicationController
    
  
    include ActionView::Helpers::SanitizeHelper

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

      destination_prompt = "#{plan.destination}"
      duration_prompt = "#{plan.duration}日間"
    
      if plan.budget_option != 1
        budget_prompt = ""
      else
        budget_prompt = "予算: #{plan.budget} 円"
      end


      if plan.activity_id == nil
        activity_prompt = ""
      else
        activity_prompt = "・#{destination_prompt}の、#{plan.activity.name}のおすすめスポットを20個
        英語名で返してください。形式 1."
      end

      if plan.food_id == nil
        food_prompt = ""
      else
        food_prompt = "・#{destination_prompt}のおすすめレストランと#{plan.food.name}を20個
        英語名で返してください。形式 1."
      end

      if plan.travel_style_id == nil
        travel_style_prompt = ""
      else
        travel_style_prompt = "旅行のスタイルは#{plan.travel_style.name}、"
      end


      if plan.transportation_id == nil
        transportation_prompt = ""
      else
        transportation_prompt = "交通: #{plan.transportation.name}"
      end
      if plan.accommodation_id == nil
        accommodation_prompt = ""
      else
        accommodation_prompt = "宿泊タイプ: #{plan.accommodation.name}"
      end        

      prompt = "  
       Step by stepで
       ・#{destination_prompt}のおすすめ観光スポットを20個
       英語名で返してください。形式 1.
       #{activity_prompt}
       #{food_prompt}
      "   
      
      output_text = ""
      Async do |task|
        
        client = OpenAI::Client.new(access_token: "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")
        client.chat(
          parameters: {
            model: "gpt-3.5-turbo", # Required.
            messages: [{ role: "user", content: prompt}], # Required.
            temperature: 0.8,
            max_tokens: 2048,
            stream: proc do |chunk, _bytesize|
              task.async do
                text = chunk.dig("choices", 0, "delta", "content") 
                if text != nil
                  text = sanitize(text.gsub(/\n/, '<br>'), tags: %w(br p h1 h2))
                  output_text += text
                  ActionCable.server.broadcast('second_channel', text)
                end
              end
            end 
          }
        )
      end
      
      puts prompt
      prompt ="#{output_text}
      の情報から、#{destination_prompt}#{travel_style_prompt}#{duration_prompt}旅行プランを立ててください。
      時刻と、訪れる場所ですることを具体的に日本語で詳しく書いてください。

      例)#{destination_prompt}#{travel_style_prompt}#{duration_prompt}旅行プランテーマ
      例)1日目
      例)11:00 ドバイモール(dubai mall)へ。お土産やショッピングを楽しんだ後、SocialHouseでランチを食べる。
      "

      Async do |task|
        client = OpenAI::Client.new(access_token: "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")
        client.chat(
            parameters: {
            model: "gpt-3.5-turbo", # Required.
            messages: [{ role: "user", content: prompt}], # Required.
            temperature: 0.7,
            max_tokens: 2048,
            # format: "html",
            stream: proc do |chunk, _bytesize|
                task.async do
                  text = chunk.dig("choices", 0, "delta", "content") 
                  if text != nil
                    max_day = 14
                    (1..max_day).each do |i|
                      if text.include?("#{i}日目")
                        html_text.gsub!(/#{i}日目\s*/, "<h2 style='font-size: 3em;'>#{i}日目</h2>")
                      end
                    end
                    html_text = sanitize(text.gsub(/\n/, '<br>'), tags: %w(br p h1 h2))
                    ActionCable.server.broadcast('open_ai_channel', html_text)
                  end
                  
                end
            end 
        })
      end
    end
  
    def search
        plans = Plan.search(params[:keyword])
    end    

    private
    def plan_params
      params.require(:plan).permit(:destination, :duration, :budget_option, :budget, :activity_id, :transportation_id,:accommodation_id, :food_id,:travel_style_id, :place_to_visit)
    end

  end