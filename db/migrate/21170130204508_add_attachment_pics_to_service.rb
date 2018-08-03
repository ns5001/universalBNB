class AddAttachmentPicsToService < ActiveRecord::Migration[5.0]
  def up
    add_attachment :services, :picture
  end

  def down
    remove_attachment :services, :picture
  end
end
