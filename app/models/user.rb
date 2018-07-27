class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :services
  has_many :user_services
  has_many :bought, :class_name => "UserService", foreign_key: 'buyer_id'
  has_many :sold, :class_name => "UserService", foreign_key: 'seller_id'
end
