class CreateConnection < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.integer :user_id
      t.integer :receiver_id
      t.boolean :status, default: false
    end
  end
end
