class Service < ApplicationRecord
  has_many :user_services
  belongs_to :user
  has_many :buyers, :class_name => "UserService", foreign_key: 'buyer_id'
  has_many :sellers, :class_name => "UserService", foreign_key: 'seller_id'
end
