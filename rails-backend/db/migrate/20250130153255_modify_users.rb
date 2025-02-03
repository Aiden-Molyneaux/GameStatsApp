class ModifyUsers < ActiveRecord::Migration[8.0]
  def change
    # First rename password to password_digest
    rename_column :users, :password, :password_digest
    remove_index :users, :password if index_exists?(:users, :password)

    # Then modify any other columns if needed
    change_column :users, :username, :string, null: false, limit: 20
    change_column :users, :password_digest, :string, null: false, limit: 60
    change_column :users, :email, :string, limit: 30
    change_column :users, :favourite_game, :string, limit: 60
    change_column :users, :preferred_platform, :string, limit: 30
  end
end 