class CreateMessage < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.integer "user_id"
      t.string  "content"
      t.boolean "reply",             default: false
      t.integer "connection_id"
      t.integer "receiver_id"
      t.integer "master_message_id"
    end
  end
end
