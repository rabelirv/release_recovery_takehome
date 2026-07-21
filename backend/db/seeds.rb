puts "Clearing existing data..."
CheckIn.destroy_all
User.destroy_all

puts "Creating coaches..."
coach1 = User.create!(
  name: "Sarah Johnson",
  email: "sarah@freshstart.com",
  role: :coach
)

coach2 = User.create!(
  name: "Mike Chen",
  email: "mike@freshstart.com",
  role: :coach
)

puts "Creating clients..."
client1 = User.create!(
  name: "Alex Rivera",
  email: "alex@example.com",
  role: :client,
  coach: coach1
)

client2 = User.create!(
  name: "Jordan Taylor",
  email: "jordan@example.com",
  role: :client,
  coach: coach1
)

client3 = User.create!(
  name: "Sam Kim",
  email: "sam@example.com",
  role: :client,
  coach: coach2
)

puts "Creating check-ins for Alex (14-day streak)..."
14.downto(1) do |days_ago|
  CheckIn.create!(
    user: client1,
    date: days_ago.days.ago.to_date,
    mood: rand(3..5),
    craving_level: rand(1..3),
    attended_meeting: [true, false].sample,
    fresh_start: false
  )
end

puts "Creating check-ins for Jordan (with fresh start)..."
30.downto(15) do |days_ago|
  CheckIn.create!(
    user: client2,
    date: days_ago.days.ago.to_date,
    mood: rand(2..4),
    craving_level: rand(2..4),
    attended_meeting: [true, false].sample,
    fresh_start: false
  )
end

CheckIn.create!(
  user: client2,
  date: 14.days.ago.to_date,
  mood: 2,
  craving_level: 5,
  attended_meeting: false,
  fresh_start: true
)

10.downto(1) do |days_ago|
  CheckIn.create!(
    user: client2,
    date: days_ago.days.ago.to_date,
    mood: rand(3..5),
    craving_level: rand(1..2),
    attended_meeting: true,
    fresh_start: false
  )
end

puts "Creating check-ins for Sam (missed yesterday)..."
7.downto(2) do |days_ago|
  CheckIn.create!(
    user: client3,
    date: days_ago.days.ago.to_date,
    mood: rand(3..5),
    craving_level: rand(1..4),
    attended_meeting: [true, false].sample,
    fresh_start: false
  )
end

puts "\n✅ Seed data created!"
puts "Coaches: #{User.coach.count}"
puts "Clients: #{User.client.count}"
puts "Check-ins: #{CheckIn.count}"