Rails.application.routes.draw do
  get '/', to: 'open_ai#index'
  get 'open_ai/stream_openai_api', to: 'open_ai#stream_openai_api'
  mount ActionCable.server => '/cable'
end
