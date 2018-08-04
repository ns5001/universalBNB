class Connection < ApplicationRecord
  belongs_to :user
  belongs_to :receiver, class_name: 'User'

  def accept
    self.status = true
    self.save
  end

  def decline
    self.destroy
  end

end
