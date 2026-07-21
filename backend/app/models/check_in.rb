class CheckIn < ApplicationRecord
  belongs_to :user

  validates :date, presence: true, uniqueness: { scope: :user_id }
  validates :mood, presence: true, inclusion: { in: 1..5 }
  validates :craving_level, presence: true, inclusion: { in: 1..5 }
  validates :attended_meeting, inclusion: { in: [true, false] }
  validates :fresh_start, inclusion: { in: [true, false] }
end
