# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create test users
users = [
  {
    username: 'testuser1',
    password: 'password123',
    email: 'test1@example.com',
    favourite_game: 'Minecraft',
    preferred_platform: 'PC',
    number_of_games: 3
  },
  {
    username: 'testuser2',
    password: 'password456',
    email: 'test2@example.com',
    favourite_game: 'The Legend of Zelda',
    preferred_platform: 'Nintendo Switch',
    number_of_games: 2
  }
]

created_users = users.map { |user_data| User.create!(user_data) }

# Create games for first user
games = [
  {
    name: 'Minecraft',
    hours: 100,
    date_purchased: Date.today - 100,
    title_colour: '#FF0000',
    header_colour: '#0000FF'
  },
  {
    name: 'Stardew Valley',
    hours: 50,
    date_purchased: Date.today - 50,
    title_colour: '#00FF00',
    header_colour: '#FF00FF'
  }
]

games.each { |game_data| created_users.first.games.create!(game_data) }

# Create gamer tags for first user
gamer_tags = [
  {
    tag: 'ProGamer123',
    platform: 'Steam'
  },
  {
    tag: 'TestPlayer',
    platform: 'Xbox'
  }
]

gamer_tags.each { |tag_data| created_users.first.gamer_tags.create!(tag_data) }
