class Entry < ApplicationRecord
    belongs_to :organism

    has_one_attached :entry_image

    validates :note, :date, :organism_id, presence: true
end
