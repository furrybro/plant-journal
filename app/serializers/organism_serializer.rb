class OrganismSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :species, :user_id, :featured_image

  belongs_to :user
  has_many :entries

  # def featured_image
  #   rails_blob_path(object.featured_image, only_path: true) if object.featured_image.attached?
  # end

  def featured_image
    if object.featured_image.attached?
      {
        url: rails_blob_url(object.featured_image, only_path: true)
      }
    end
  end

end
