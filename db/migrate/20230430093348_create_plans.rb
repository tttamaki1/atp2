class CreatePlans < ActiveRecord::Migration[6.0]
  def change
    create_table :plans do |t|
      t.string     :title              , null: false
      t.text       :content            , null: false
      t.string     :destination        , null: false
      t.integer    :duration           , null: false
      t.integer    :budget             , null: false
      t.boolean    :budget_option      , null: false
      t.string     :place_to_visit     , null: false
      t.integer    :accommodation_id   , null: false
      t.integer    :activity_id        , null: false
      t.integer    :transportation_id  , null: false
      t.integer    :food_id            , null: false
      t.timestamps
    end
  end
end
