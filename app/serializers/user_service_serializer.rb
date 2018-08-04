class UserServiceSerializer < ActiveModel::Serializer
  attributes :final

  belongs_to :service
  belongs_to :buyer
  belongs_to :seller
end
