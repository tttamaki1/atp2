Rails.application.routes.draw do
  devise_for :users

  root to: 'open_ai#index'
  post 'open_ai/stream_openai_api', to: 'open_ai#stream_openai_api'
  post 'open_ai/create', to: 'open_ai#create'
  get 'open_ai/search', to: 'open_ai#search'
  get 'top', to: 'pages#top', as: :top
  get 'inspiration_guide', to: 'inspirations#index', as: :inspiration_guide
  mount ActionCable.server => '/cable'
end
