
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



      destination_prompt = "場所:#{@plan.destination}"
      duration_prompt = "日数:#{@plan.duration}日間"
    
      if @plan.budget_option == 1
        budget_prompt = "予算: #{@plan.budget} 円"
      else
        budget_prompt = ""
      end
      if @plan.activity_id == 1
        activity_prompt = "アクティビティ: #{@plan.activity.name}"
      else
        activity_prompt = ""
      end
      if @plan.transportation_id == 1
        transportation_prompt = "交通: #{@plan.transportation.name}"
      else
        transportation_prompt = ""
      end
      if @plan.accommodation_id == 1
        accommodation_prompt = "宿泊タイプ: #{@plan.accommodation.name}"
      else
        accommodation_prompt = ""
      end        

      prompt = "
      <以下の情報に基づいて、旅のスケジュールと具体的な旅行プランを日本語で作成してください。>

      <出力には、以下の旅程のみを含めてください。
      「設定なし」のカテゴリーは表示しないでください！！
      時間を必ず表示してください。
      以下のような形式で出力してください>
      出力形式で全角スペースを含む場合はそのまま、全角スペースを含む文章で出力してください。
      
      #出力形式ー開始

       30字以上で、このプラン特有の旅行のテーマをここに表示(プランという文字列は含めない、スペースは含めない)

       #{destination_prompt}
       #{duration_prompt}
       #{budget_prompt}
       #{activity_prompt}
       #{transportation_prompt}
       #{accommodation_prompt}
       時期　
       訪問先　

       x日目

       13:00ホテルへ向かいチェックイン
       14:00レンタカーで国際通りを散策、お土産屋さんを見る
       18:00地元のレストラン「かりゆしそば」で沖縄そばを堪能
       20:00那覇市内の居酒屋「うりずん」で沖縄料理を楽しむ（ゴーヤチャンプルーやラフテーなど）

       #出力形式ー終了
      
      ※重要な命令、合理的なルートで、訪れる順番を決めて計画を作成してください。
      ※重要な命令、場所で指定したエリアを出る計画は含めないでください。
      ※重要な命令、場所で指定したエリア内の目的地だけを計画に含めてください。
      ※重要な命令、徒歩の場合は、車で移動する計画は含めないでください。
      ※重要な命令、「ホテルに戻る」は計画に含めないでください。
      
      各訪問地ですることについて、イメージできるように具体的に表示してください。ただし、ホテル、空港、車の返却は除外してください。
      
      周辺のおすすめのローカルフードをたくさん選択し、そのうちいくつかを選んで計画に含めてください。
      
      ※重要な命令、アクティビティはシーズンかどうかを考慮して、適したアクティビティが見つからない場合は計画に含めないでください。
      
      おすすめの料理については、「おすすめは〜です」という形式で記載してください。
      
      日程の最終日に目的地にあるお土産屋を含めてください。
      
      各計画における交通手段、乗車場所、降車場所を記載してください。
      
      「思い出を胸に帰る」といった表現は含めないでください。
      
      

      計画の最初の日に車を借りる必要がない場合は、まだ車を借りないプランを作成してください。
      
      車を借りた場合、昼間に飲酒する計画を含めないで計画と作成してください。
      
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
        @plans = Plan.search(params[:keyword])
    end    

    private
    def plan_params
      params.require(:plan).permit(:destination, :duration, :budget_option, :budget, :activity_id, :transportation_id,:accommodation_id, :food_id, :place_to_visit)
    end

  end