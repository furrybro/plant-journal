# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "Start seeding"

User.destroy_all
Organism.destroy_all
Entry.destroy_all

jane = User.create(username: "Jane", email: "jane@gmail.com", password: "jane123", password_confirmation: "jane123")
john = User.create(username: "John", email: "john@gmail.com", password: "john123", password_confirmation: "john123")

monstera = Organism.create(name: "Monstera", species: "Monstera Deliciosa", user_id: jane.id)
snake = Organism.create(name: "Sassy", species: "Snake Plant", user_id: jane.id)
bamboo = Organism.create(name: "Bambi", species: "Bamboo", user_id: john.id)
aloe = Organism.create(name: "Alex", species: "Aloe Vera", user_id: john.id)

entry1 = Entry.create(note: "here we go!", date: "2022-07-18 12:02:43", organism_id: monstera.id)
entry2 = Entry.create(note: "off to a good start", date: "2022-07-18 10:09:38", organism_id: snake.id)
entry3 = Entry.create(note: "super small right now", date: "2022-07-18 01:23:43", organism_id: bamboo.id)
entry4 = Entry.create(note: "new leaves starting to unfurl", date: "2022-07-19 12:08:13", organism_id: monstera.id)
entry5 = Entry.create(note: "should i move this outside?", date: "2022-07-19 09:36:26", organism_id: aloe.id)


puts "Done seeding!"