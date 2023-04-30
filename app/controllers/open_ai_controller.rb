
  require "async"
  require "json"
  require "openai"
  require "async/http"
  
  class OpenAiController < ApplicationController
    include ActionView::Helpers::SanitizeHelper

    def index
      @plan = Plan.new
    end
  
    #def stream_openai_api
    def create
        @plan = Plan.new(plan_params)
        @plan.destination = params[:destination]
        puts  @plan.destination
        @plan.budget = params[:budget]
        @plan.duration = params[:duration]
        @plan.activity = params[:activity]
        @plan.transportation = params[:transportation]
        @plan.accommodation = params[:accommodation]
        @plan.place_to_visit = params[:place_to_visit]
  
        prompt = "
    
        Create create a time table and a specific and travel plan in Japanese for the following information:\n
        Location: #{@plan.destination}\n
        Duration: #{@plan.duration} days\n
        Budget: #{@plan.budget} yen\n
        Accommodation: #{@plan.accommodation}\n
        Activity: #{@plan.activity}\n
        transportation: #{@plan.transportation}\n
        When: April\n 
        Where you live: Chiba\n
        Place to visit: #{@plan.place_to_visit}\n
        Please start from the airport for overseas travel, and from the nearest station to the destination for domestic travel.
        If planning on overseas travel, get to the airport 2 to 3 hours before the departure time\n
        Specifiy what to do in the each destination so that we can imagin it but, exclude what to do at the hotel, the airport and returning the car \n
        Pick up a lot of recommended local foods around there or on the way and choose some of it and include it in the plan\n
        If you recommend the distant location, include the information how to get there and taking into account the required travel time between each destination\n
        If you can't find the activity, don't try to include it\n
        Include the recommended food with the sentense like the reccomendation is ~\n
        Pick up a lot of recommended souvenir shops and choose some of it and include some souvenir shops at the end of the plan\n
        Include the transportation method in the each plan, where to get on and get off\n
        Don't include the sentense like returning home with memories in one's heart\n
        Don't include the sentense like relaxing time\n
        Don't rent a car yet if not nessesary on the first day of the plan\n
        Don't recommend drinking during the day if renting a car\n
        Respond only the itinerary under\n
        Specify the time\n
        Then, please break down the plan into a daily itinerary,\n
         specifically, please format the response with the format like\n
         日程：\n
         day1:\n
         12:00 - 那覇空港に到着、レンタカーを借りる\n
         13:00 - ホテルへ向かいチェックイン\n
         14:00 - レンタカーで国際通りを散策、お土産屋さんを見る\n
         18:00 - 地元のレストラン「かりゆしそば」で沖縄そばを堪能\n
         20:00 - 那覇市内の居酒屋「うりずん」で沖縄料理を楽しむ（ゴーヤチャンプルーやラフテーなど）\n
        "   
        
        puts @plan
        puts @plan.destination
        Async do |task|
        client = OpenAI::Client.new(access_token: "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")
        client.chat(
            parameters: {
            model: "gpt-3.5-turbo", # Required.
            messages: [{ role: "user", content: prompt}], # Required.
            temperature: 0.7,
            # format: "html",
            stream: proc do |chunk, _bytesize|
                task.async do
                text = chunk.dig("choices", 0, "delta", "content") 
                text_with_newlines = text.gsub(/([^\n])(\n)([^\n])/,'\1<br>\3') # 改行を挿入
                html_text = sanitize(text_with_newlines, tags: %w(br p h1 h2)) # brタグを追加
                ActionCable.server.broadcast('open_ai_channel', html_text)
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