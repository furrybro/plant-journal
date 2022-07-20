Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :entries
      resources :organisms
      resources :users
      resources :sessions
      # Route for login after signup
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"

      # Route for signing up/creating new user
      post "/signup", to: "users#create"
      get "/me", to: "users#show"
    end
  end

  # Defines the root path route ("/")
  root "home#index"

  get "*path", to: "home#index"
end
