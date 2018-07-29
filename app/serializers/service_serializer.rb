class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :service_type, :detail,:price

  belongs_to :user
end
