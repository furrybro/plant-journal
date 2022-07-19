class CreateEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :entries do |t|
      t.string :note
      t.datetime :date
      t.integer :organism_id

      t.timestamps
    end
  end
end
