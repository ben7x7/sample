Rails.application.routes.draw do
  scope '(:locale)', locale: /en|fr/ do
    root to: 'pages#home'
    get 'about', to: 'pages#about', as: :about
    get 'portfolio', to: 'pages#portfolio', as: :portfolio
    get 'contact', to: 'pages#contact', as: :contact
  end
end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
