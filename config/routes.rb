Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to =>'application#index'

  devise_scope :user do
    get '/logout',  :to => 'sessions#destroy'
  end

  devise_for :users, :controllers => { :registrations => "registrations" }

  resources :users
  resources :services
  
  get '/users/sold', to: "users#getSold"
  get '/users/bought', to: "users#getBought"
  resources :messages
  resources :connections

  get '/services/new', to: "services#new"

end
