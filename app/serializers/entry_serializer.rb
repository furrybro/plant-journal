class EntrySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :note, :date, :organism_id, :entry_image

  belongs_to :organism

  def entry_image
    if object.entry_image.attached?
      {
        url: rails_blob_url(object.entry_image, only_path: true)
      }
    end
  end
  
end
