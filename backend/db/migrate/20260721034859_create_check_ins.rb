class CreateCheckIns < ActiveRecord::Migration[8.0]
  def change
    create_table :check_ins do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false
      t.integer :mood, null: false
      t.integer :craving_level, null: false
      t.boolean :attended_meeting, null: false, default: false
      t.boolean :fresh_start, null: false, default: false
      t.text :notes

      t.timestamps
    end

    add_index :check_ins, [:user_id, :date], unique: true
  end
end
