class Game < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 60 }
  validates :title_colour, length: { maximum: 16 }
  validates :header_colour, length: { maximum: 16 }
end 