
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
        open_api_request
      else
        render :index
      end    
    end

    def open_api_request
      @plan.destination = plan_params[:destination]
      @plan.budget = plan_params[:budget]
      @plan.budget_option = plan_params[:budget_option]
      @plan.duration = plan_params[:duration]
      @plan.activity_id = plan_params[:activity]
      @plan.transportation_id = plan_params[:transportation]
      @plan.accommodation_id = plan_params[:accommodation]
      @plan.place_to_visit = plan_params[:place_to_visit]
      @plan.save

      budget_prompt = ""
      if @plan.budget_option == 1
        budget_prompt = "予算: #{@plan.budget} 円"
      else
        budget_prompt = "予算: 設定なし"
      end
      if @plan.activity_id == 1
        activity_prompt = "アクティビティ: #{@plan.activity.name}"
      else
        activity_prompt = "アクティビティ:  設定なし"
      end
      if @plan.transportation_id == 1
        transportation_prompt = "交通: #{@plan.transportation.name}"
      else
        transportation_prompt = "交通:  設定なし"
      end
      if @plan.accommodation_id == 1
        accommodation_prompt = "宿泊タイプ: #{@plan.accommodation.name}"
      else
        accommodation_prompt = "宿泊タイプ:  設定なし"
      end        

      prompt = "
      <以下の情報に基づいて、旅のスケジュールと具体的な旅行プランを日本語で作成してください。>

      #情報
      -場所: #{@plan.destination}
      -期間: #{@plan.duration} 日間
      -#{budget_prompt}
      -#{activity_prompt}
      -#{transportation_prompt}
      -#{accommodation_prompt}
      -出発時期: 4月
      -出発地: 千葉県の自宅
      -訪問先: #{@plan.place_to_visit}
      
      訪問する場所は、互いに離れすぎていないようにしてください。
      国内旅行の場合は、自宅からスタートしてください。
      海外旅行の場合は、出発時間の2〜3時間前に空港に到着してください。
      
      各訪問地でのアクティビティについて、イメージできるように具体的に指定してください。ただし、ホテル、空港、車の返却時のアクティビティは除外してください。
      
      周辺のおすすめのローカルフードをたくさん選択し、そのうちいくつかを選んで計画に含めてください。
      
      遠距離の場所をお勧めする場合は、到着までの所要時間を考慮して、各訪問地の間の移動時間を含めてください。
      
      アクティビティは時期を考慮して、アクティビティが見つからない場合は計画に含めないでください。
      
      おすすめの料理については、「おすすめは〜です」という形式で記載してください。
      
      日程の最終日に目的地にあるお土産屋を含めてください。
      
      各計画における交通手段、乗車場所、降車場所を記載してください。
      
      「思い出を胸に帰る」といった表現は含めないでください。
      
      「リラックスする」「休息」といった表現は含めないでください。
      
      計画の最初の日に車を借りる必要がない場合は、まだ車を借りないでください。
      
      車を借りた場合、昼間に飲酒する計画を含めないでください。
      
      <返答には、以下の旅程のみを含めてください。
      設定なしは表示しないでください。
      時間を指定し、計画を日別に分解して、
      以下のような形式で返信してください>

       場所：
       期間：
       予算：
       宿泊：
       アクティビティ：
       交通手段：
       時期：
       出発地：
       訪問先：
       日程：
       1日目: 
       12:00：那覇空港に到着、レンタカーを借りる
       13:00：ホテルへ向かいチェックイン
       14:00：レンタカーで国際通りを散策、お土産屋さんを見る
       18:00：地元のレストラン「かりゆしそば」で沖縄そばを堪能
       20:00：那覇市内の居酒屋「うりずん」で沖縄料理を楽しむ（ゴーヤチャンプルーやラフテーなど）
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
                    html_text = sanitize(text.gsub(/\n/, '<br>'), tags: %w(br p h1 h2))
                    ActionCable.server.broadcast('open_ai_channel', html_text)
                  end  
                end
            end 
        })
      end
    end
  
    def search
        @plans = Plan.search(params[:keyword])
    end    

    private
    def plan_params
      params.require(:plan).permit(:destination, :duration, :budget_option, :budget, :activity_id, :transportation_id,:accommodation_id, :food_id, :place_to_visit)
    end

  end