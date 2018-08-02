class Message < ApplicationRecord
  belongs_to :user
  belongs_to :receiver, class_name: 'User'

  def self.getMessageChain(id)
    ary = Message.all.where(master_message_id: id)
  end

  def self.createReply(data)
    old_message = Message.find_by(id: data[:message_id])
    Message.create(content: data[:content], user_id: old_message.receiver_id, master_message_id: old_message.master_message_id, receiver_id: old_message.user_id)
    old_message.reply = true
    old_message.save
  end

end
