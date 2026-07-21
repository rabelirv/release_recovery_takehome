require "test_helper"

class MissedCheckInMailerTest < ActionMailer::TestCase
  test "notify_coach" do
    mail = MissedCheckInMailer.notify_coach
    assert_equal "Notify coach", mail.subject
    assert_equal [ "to@example.org" ], mail.to
    assert_equal [ "from@example.com" ], mail.from
    assert_match "Hi", mail.body.encoded
  end
end
