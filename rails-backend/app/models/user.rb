class User < ApplicationRecord
  has_secure_password  # This adds password hashing via bcrypt
  
  has_many :games
  has_many :gamer_tags

  validates :username, presence: true, uniqueness: true, length: { maximum: 20 }
  validates :password, presence: true, length: { maximum: 60 }, on: :create
  validates :email, uniqueness: true, length: { maximum: 30 }, allow_nil: true
  validates :favourite_game, length: { maximum: 60 }
  validates :preferred_platform, length: { maximum: 30 }

  # Customize the JSON output to exclude password_digest
  def as_json(options = {})
    super(options.merge(except: [:password_digest])).tap do |hash|
      hash['id'] = id
      hash['username'] = username
      hash['email'] = email
      hash['favourite_game'] = favourite_game
      hash['preferred_platform'] = preferred_platform
      hash['number_of_games'] = number_of_games
    end
  end
end 