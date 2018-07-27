class CreateServices < ActiveRecord::Migration[5.0]
  def change
    create_table :services do |t|
      t.string :type
      t.text :detail
      t.string :name
      t.integer :price
      t.integer :user_service_id
      t.timestamps
    end
  end
end
