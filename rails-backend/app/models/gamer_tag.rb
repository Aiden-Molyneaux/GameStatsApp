class GamerTag < ApplicationRecord
  belongs_to :user

  validates :tag, presence: true, length: { maximum: 20 }
  validates :platform, presence: true, length: { maximum: 30 }
end 