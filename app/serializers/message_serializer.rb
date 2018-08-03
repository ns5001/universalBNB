class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user, :receiver, :content
end
