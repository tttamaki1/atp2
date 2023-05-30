require 'async'
require 'json'
require 'openai'
require 'async/http'
Async do |task|
  client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  client.chat(
    parameters: {
      model: 'gpt-3.5-turbo', # Required.
      messages: [{ role: 'user', content: "hello" }], # Required.
      temperature: 1.0,
      max_tokens: 2048,
      # format: "html",
      stream: proc do |chunk, _bytesize|
                task.async do
                  text = chunk.dig('choices', 0, 'delta', 'content')
                  puts text
              end
      end
    }
  )
end