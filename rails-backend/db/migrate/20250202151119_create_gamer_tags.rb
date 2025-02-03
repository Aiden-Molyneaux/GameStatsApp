class CreateGamerTags < ActiveRecord::Migration[8.0]
  def change
    create_table :gamer_tags do |t|
      t.references :user, null: false, foreign_key: true
      t.string :tag
      t.string :platform

      t.timestamps
    end
  end
end
