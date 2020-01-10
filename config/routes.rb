Rails.application.routes.draw do
  scope '(:locale)', locale: /en|fr/ do
    root to: 'pages#home'
  end
end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
