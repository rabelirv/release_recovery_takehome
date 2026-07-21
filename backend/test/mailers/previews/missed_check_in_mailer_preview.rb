# Preview all emails at http://localhost:3000/rails/mailers/missed_check_in_mailer
class MissedCheckInMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/missed_check_in_mailer/notify_coach
  def notify_coach
    MissedCheckInMailer.notify_coach
  end
end
