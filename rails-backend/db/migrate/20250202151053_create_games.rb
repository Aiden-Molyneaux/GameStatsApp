class CreateGames < ActiveRecord::Migration[8.0]
  def change
    create_table :games do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.integer :hours
      t.date :date_purchased
      t.string :title_colour
      t.string :header_colour

      t.timestamps
    end
  end
end
