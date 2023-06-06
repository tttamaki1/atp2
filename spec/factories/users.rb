FactoryBot.define do
    factory :user do
      sequence(:email) { |n| "user#{n}@example.com" }
      password              { '000t000' }
      password_confirmation { password }
    end
  end
  