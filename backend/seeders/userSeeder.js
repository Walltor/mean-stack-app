const connectToDatabase = require('../config/database')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

connectToDatabase()

// User seed data
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'user1',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'user2',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    password: 'user3',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    username: 'user4',
    email: 'user4@example.com',
    password: 'user4',
    created_at: Date.now(),
    updated_at: Date.now()
  },
]

// Function to seed users
async function seedUsers() {
  try {
    // Remove existing users
    await User.deleteMany()

    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      return { ...user, password: hashedPassword }
    }))

    // Insert seed data
    await User.insertMany(hashedUsers)

    console.log('Seeding complete')
  } catch (err) {
    console.error('Error seeding data:', err)
  } finally {
    // Disconnect from the database
    await mongoose.disconnect()
  }
}

// Run the seeder function
seedUsers()
