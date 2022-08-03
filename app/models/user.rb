class User < ApplicationRecord
    has_many :organisms
    has_many :entries, through: :organisms
    
    has_secure_password

    validates :username, :email, :password, presence: true
    validates :username, :email, uniqueness: true
    validates :username, length: { minimum: 4 }
    validates :password, length: { in: 6..20 }

    validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create


end
