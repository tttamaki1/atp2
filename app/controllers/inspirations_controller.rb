require 'async'
require 'json'
require 'openai'
require 'async/http'
class InspirationsController < ApplicationController

    include ActionView::Helpers::SanitizeHelper #重要

    def index

    end

    def create
        session[:place] = params[:place]
        session[:prompt_value] = params[:prompt_value]
        if params[:place].blank? #場所入力のテキストボックスに値が入力されていなかったら、
            #flash[:error] = "場所を入力してください"
            render 'inspirations/index'
        else
            result(session[:place], session[:prompt_value])
        end   
    end
    
    def result(place, prompt_value)

        page_session_id = $page_session_id #重要

        if I18n.locale == :ja
          prompt =
          "##指示##
          ・#{place}の#{prompt_value}
          ・日本語で、最大のトークン数に収まるように調整してください。
          
          ##出力形式##
          タイトル  #{place}の#{prompt_value}
    
          1.場所名

          説明
          "
        elsif  I18n.locale == :en
          prompt =
          "##Instructions##
          ・#{prompt_value} of #{place}
          ・In English, within the maximum token limit
  
          
          ##Output Format##
          Title:  #{prompt_value} of #{place}
    
          1. The Name of the Place

          The description of the place
          "     
        elsif I18n.locale == :'zh-CN'
          prompt =
          "##说明##
          ・#{place}的#{prompt_value}
          ・使用中文，不超过最大令牌限制
        
        
          ##输出格式##
          标题：#{place}的#{prompt_value}
        
          1. 地点的名称
        
          地点的描述
          "
        end
        

        Async do |task|
            client = OpenAI::Client.new(access_token: Rails.application.credentials.dig(:OPENAI_API_KEY))
            client.chat(
              parameters: {
                model: 'gpt-3.5-turbo-0613', # Required.
                messages: [{ role: 'user', content: prompt }], # Required.
                temperature: 0.1,
                max_tokens: 3000,
                # format: "html",
                stream: proc do |chunk, _bytesize|
                          task.async do
                            text = chunk.dig('choices', 0, 'delta', 'content')
                            unless text.nil?
                                list_number = 20
                                (1..list_number).each do |i|
                                  if text.include?("#{i}.")
                                    html_text.gsub!(/#{i}.\s*/,"#{i}.<br><br>")
                                  end
                                end
                               html_text = sanitize("<pre>" + text.gsub(/\n/, '<br>'), tags: %w[br p h1 h2 h3])
                               ActionCable.server.broadcast("inspiration_guide_channel:#{page_session_id}", html_text)
                            end
                    end
                end
              }
            )
        end

    end 

end
