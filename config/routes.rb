Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to =>'application#index'

  devise_scope :user do
    get '/logout',  :to => 'sessions#destroy'
  end

  resources :services
  resources :users

end
