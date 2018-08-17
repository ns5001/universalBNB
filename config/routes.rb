Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#index'

  devise_scope :user do
    get '/logout',  :to => 'sessions#destroy'
    get '/users/inbox', to: "users#inbox"
  end

  devise_for :users, :controllers => { :registrations => "registrations" }

  resources :users
  resources :services

  get '/sold', to: "user_services#getSold"
  get '/bought', to: "user_services#getBought"
  get '/inProgressBuying', to: "users#getInProgressBuying"
  get '/inProgressSelling', to: "users#getInProgressSelling"

  get '/services/new', to: "services#new"
  get '/services/:id', to: "services#show"
  get "/service/:id/purchase", to: "services#purchase"
  get "/messages/received", to: 'messages#getReceivedMessages'
  get "/userService/approve/:id", to: "user_services#approve"

  get "/messages/received", to: 'messages#getReceivedMessages'
  get "/messages/sent", to: 'messages#getSentMessages'
  get "messages/:id/message_data", to: 'messages#message_data'
  get "/messages/chain/:id", to: 'messages#messageHistory'
  post "/messages/createReply", to: "messages#createReply"
  get "/userService/reject/:id", to: "user_services#reject"
  get "/services/edit/:id", to: "services#edit"
  get "/notYetPurchased", to: "services#notYetPurchased"
  get "/rateUser/:id", to: "users#rate"

  resources :messages


end
