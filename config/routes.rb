Rails.application.routes.draw do
  get 'hotels/hotel'
  devise_for :users

  root to: 'open_ai#index'
  post 'open_ai/stream_openai_api', to: 'open_ai#stream_openai_api'
  post 'open_ai/create', to: 'open_ai#create'
  get 'open_ai/search', to: 'open_ai#search'
  get 'top', to: 'pages#top', as: :top
  get 'inspiration_guide', to: 'inspirations#index', as: :inspiration_guide
  get '/inspiration_guide/result', to: 'inspirations#result'
  post '/inspiration_guide/result', to: 'inspirations#create', as: :inspiration_guide_post
  post '/switch_language', to: 'application#switch_language', as: :switch_language
  get 'get_recommendation_for_hotel', to: 'hotels#hotel', as: :hotel

  mount ActionCable.server => '/cable'
end
