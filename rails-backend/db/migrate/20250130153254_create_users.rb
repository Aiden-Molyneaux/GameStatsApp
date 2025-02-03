class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :email
      t.string :favourite_game
      t.string :preferred_platform
      t.integer :number_of_games

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :password, unique: true
    add_index :users, :email, unique: true
  end
end
