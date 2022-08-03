class Entry < ApplicationRecord
    belongs_to :organism

    has_one_attached :entry_image

    validates :note, :date, :entry_image, presence: true
end
