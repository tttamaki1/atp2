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

        tab_session_id = $tab_session_id #重要

        if I18n.locale == :ja
          prompt =
          "##指示##
          ・日本語で
          ・#{place}の#{prompt_value}
          ・最大のトークン数に収まるように調整してください。
          ・最後の行は改行して
          
          ##出力形式##
          タイトル  #{place}の#{prompt_value}
    
          1.場所名

          説明
          "
        elsif  I18n.locale == :en
          prompt =
          "##Instructions##
          ・In English
          ・#{prompt_value} of #{place}
          ・within the maximum token limit
          ・Break lines at the end of the output
          
          ##Output Format##
          Title:  #{prompt_value} of #{place}
    
          1. The Name of the Place

          The description of the place
          "     
        end  

        Async do |task|
            client = OpenAI::Client.new(access_token: Rails.application.credentials.dig(:OPENAI_API_KEY))
            client.chat(
              parameters: {
                model: 'gpt-3.5-turbo', # Required.
                messages: [{ role: 'user', content: prompt }], # Required.
                temperature: 0.1,
                max_tokens: 2048,
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
                               ActionCable.server.broadcast("inspiration_guide_channel:#{tab_session_id}", html_text)
                            end
                    end
                end
              }
            )
        end

    end 

end
