class User < ApplicationRecord

  has_attached_file :profile_pic, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\z/

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_uniqueness_of :email

  has_many :services
  has_many :user_services
  has_many :messages
  has_many :received_messages, class_name: 'Message', foreign_key: :receiver_id


  def getSold
    UserService.where(seller_id:self.id, final:true)
  end

  def getBought
    UserService.where(buyer_id:self.id, final:true)
  end

  def inProgressBuying
    UserService.where(buyer_id:self.id, final:false)
  end

  def inProgressSelling
    UserService.where(seller_id:self.id, final:false)
  end

  def sent_messages
    self.messages.where(reply: false)
  end

  def received_messages
    Message.where(receiver_id:self.id, reply:false)
  end

  def notYetPurchased
    Service.where(user_id:self.id, purchased:false)
  end



end
