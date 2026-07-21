# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_07_21_034859) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "check_ins", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "date", null: false
    t.integer "mood", null: false
    t.integer "craving_level", null: false
    t.boolean "attended_meeting", default: false, null: false
    t.boolean "fresh_start", default: false, null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "date"], name: "index_check_ins_on_user_id_and_date", unique: true
    t.index ["user_id"], name: "index_check_ins_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.integer "role", default: 0, null: false
    t.bigint "coach_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_users_on_coach_id"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "check_ins", "users"
  add_foreign_key "users", "users", column: "coach_id"
end
