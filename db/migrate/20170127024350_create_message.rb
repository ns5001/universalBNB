class CreateMessage < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.integer "user_id"
      t.string  "content"
      t.integer "receiver_id"
    end
  end
end
