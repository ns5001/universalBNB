class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :profile_pic, :firstName, :lastName, :age, :bio

  has_many :services
  has_many :user_services
end
