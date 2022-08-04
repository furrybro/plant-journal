class Organism < ApplicationRecord
    belongs_to :user
    has_many :entries, dependent: :destroy

    has_one_attached :featured_image

    validates :name, :species, :user_id, presence: true
end
