class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :services
  has_many :user_services
  has_many :bought, :class_name => "UserService", foreign_key: 'buyer_id'
  has_many :sold, :class_name => "UserService", foreign_key: 'seller_id'
  has_many :messages
  has_many :received_messages, class_name: 'Message', foreign_key: :receiver_id


  def sent_messages
    self.messages.where(reply: false)
  end

  def received_messages
    Message.where(receiver_id:self.id, reply:false)
  end

  def received_requests
    Connection.where(receiver_id:self.id, status:false)
  end

  def sent_requests
    Connection.where(user_id:self.id, status:false)
  end

  def friends
    Connection.where(user:self, status:true).or(Connection.where(receiver:self, status:true))
  end

  def self.friends
    ary = []
    Connection.where(user:self.last, status:true).each do |connection|
      ary << User.find_by(id: connection.receiver_id)
    end

    Connection.where(receiver:self.last, status:true).each do |connection|
      ary << User.find_by(id: connection.user_id)
    end
    ary
  end

  def friends_order
    ary = []
    self.friends.each do |friend|
      ary << friend.receiver
    end
    ary.sort
  end

end
