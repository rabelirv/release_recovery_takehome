class CheckMissedCheckInsJob < ApplicationJob
  queue_as :default

  def perform
    yesterday = Date.yesterday

    User.where(role: :client).find_each do |client|
      next unless client.coach.present?

      check_in_exists = client.check_ins.exists?(date: yesterday)

      unless check_in_exists
        MissedCheckInMailer.with(client: client, missed_date: yesterday).notify_coach.deliver_later
      end
    end
  end
end