class StreakCalculator
  def initialize(user)
    @user = user
  end

  def current_streak
    check_ins = @user.check_ins.order(date: :desc)
    return 0 if check_ins.empty?

    streak = 0
    expected_date = Date.today

    check_ins.each do |check_in|
      break if check_in.fresh_start && streak > 0

      if check_in.date == expected_date || check_in.date == expected_date - 1.day
        streak += 1
        expected_date = check_in.date - 1.day
      else
        break
      end
    end

    streak
  end

  def longest_streak
    check_ins = @user.check_ins.order(:date)
    return 0 if check_ins.empty?

    max_streak = 0
    current = 0
    last_date = nil

    check_ins.each do |check_in|
      if check_in.fresh_start
        max_streak = [max_streak, current].max
        current = 1
      elsif last_date.nil? || check_in.date == last_date + 1.day
        current += 1
      else
        max_streak = [max_streak, current].max
        current = 1
      end

      last_date = check_in.date
    end

    [max_streak, current].max
  end
end