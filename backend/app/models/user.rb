class User < ApplicationRecord
  enum :role, { client: 0, coach: 1 }

  belongs_to :coach, class_name: "User", optional: true
  has_many :clients, class_name: "User", foreign_key: "coach_id"
  has_many :check_ins, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
end
