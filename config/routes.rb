Rails.application.routes.draw do
  root to: 'open_ai#index'
  get 'open_ai/stream_openai_api', to: 'open_ai#stream_openai_api'
  get 'open_ai/search', to: 'open_ai#search'
  mount ActionCable.server => '/cable'
end
