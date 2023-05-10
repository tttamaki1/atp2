require 'openai'
client = OpenAI::Client.new(access_token: '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')
client.chat(
  parameters: {
    model: 'gpt-3.5-turbo', # Required.
    messages: [{ role: 'user', content: 'Describe a character called Anna!' }], # Required.
    temperature: 0.7,
    stream: proc do |chunk, _bytesize|
              print chunk.dig('choices', 0, 'delta', 'content')
            end
  }
)
