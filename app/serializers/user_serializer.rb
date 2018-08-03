class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :profile_pic

  has_many :services
end
