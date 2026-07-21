class MissedCheckInMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.missed_check_in_mailer.notify_coach.subject
  #
  def notify_coach
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
