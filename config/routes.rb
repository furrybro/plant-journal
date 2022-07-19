Rails.application.routes.draw do
  resources :entries
  resources :organisms
  resources :users
  resources :sessions
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"

  # Route for login after signup
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Route for signing up/creating new user
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  get "*path", to: "home#index"
end
