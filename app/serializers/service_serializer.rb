class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :service_type, :detail, :price, :purchased

  belongs_to :user
  has_many :user_services
end
