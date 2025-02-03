Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  scope '/api' do
    scope '/auth' do
      post '/register', to: 'auth#register'
      post '/login', to: 'auth#login'
    end

    scope '/user' do
      patch '/', to: 'users#update'
    end

    scope '/games' do
      get '/', to: 'games#index'
      post '/', to: 'games#create'
      patch '/:id', to: 'games#update'
      delete '/:id', to: 'games#destroy'
    end

    scope '/gamerTags' do
      get '/', to: 'gamer_tags#index'
      post '/', to: 'gamer_tags#create'
      patch '/:id', to: 'gamer_tags#update'
      delete '/:id', to: 'gamer_tags#destroy'
    end
  end
end
