class MissedCheckInMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.missed_check_in_mailer.notify_coach.subject
  #
  def notify_coach
    @client = params[:client]
    @coach = @client.coach
    @missed_date = params[:missed_date]

    mail(
      to: @coach.email,
      subject: "#{@client.name} missed their check-in on #{@missed_date}"
    )
  end
end
