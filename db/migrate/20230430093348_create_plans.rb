class CreatePlans < ActiveRecord::Migration[6.0]
  def change
    create_table :plans do |t|
      t.text       :content
      t.string     :destination, null: false
      t.integer    :duration, null: false
      t.integer    :budget
      t.boolean    :budget_option
      t.string     :place_to_visit
      t.integer    :accommodation_id
      t.integer    :activity_id
      t.integer    :transportation_id
      t.integer    :food_id
      t.integer    :travel_style_id
      t.timestamps
    end
  end
end
