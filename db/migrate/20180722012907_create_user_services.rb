class CreateUserServices < ActiveRecord::Migration[5.0]
  def change
    create_table :user_services do |t|
      t.integer :seller_id
      t.integer :buyer_id
      t.integer :service_id
      t.boolean "rated", default: false
      t.boolean "final", default: false
      t.timestamps
    end
  end
end
