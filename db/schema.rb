# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_230_430_093_348) do
  create_table 'plans', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb3', force: :cascade do |t|
    t.text 'content'
    t.string 'destination', null: false
    t.integer 'duration', null: false
    t.integer 'budget'
    t.boolean 'budget_option'
    t.string 'place_to_visit'
    t.integer 'accommodation_id'
    t.integer 'activity_id'
    t.integer 'transportation_id'
    t.integer 'food_id'
    t.integer 'travel_style_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end
end
