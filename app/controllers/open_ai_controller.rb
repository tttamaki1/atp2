
  require "async"
  require "json"
  require "openai"
  require "async/http"
  
  class OpenAiController < ApplicationController

    def index
    end
  
    def stream_openai_api
      Async do |task|
        client = OpenAI::Client.new(access_token: "")
        client.chat(
          parameters: {
            model: "gpt-3.5-turbo", # Required.
            messages: [{ role: "user", content: "Who is Elon Musk"}], # Required.
            temperature: 0.7,
            stream: proc do |chunk, _bytesize|
              task.async do
                ActionCable.server.broadcast('open_ai_channel', chunk.dig("choices", 0, "delta", "content"))
              end
            end
          })
      end
    end
  end