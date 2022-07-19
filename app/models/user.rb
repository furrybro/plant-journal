class User < ApplicationRecord
    has_many :organisms
    has_many :entries, through: :organisms
    
    has_secure_password
end
