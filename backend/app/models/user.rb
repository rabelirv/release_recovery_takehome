class User < ApplicationRecord
  enum :role, { client: 0, coach: 1 }

  belongs_to :coach, class_name: "User", optional: true
  has_many :clients, class_name: "User", foreign_key: "coach_id"
end
