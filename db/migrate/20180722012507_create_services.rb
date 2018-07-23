class CreateServices < ActiveRecord::Migration[5.0]
  def change
    create_table :services do |t|
      t.string :type          null: false, default: ""
      t.timestamps
    end
  end
end
