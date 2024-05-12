const connectToDatabase = require('../config/database')
const mongoose = require('mongoose')
const Type = require('../models/type.js')

connectToDatabase()

// Type seed data
const types = [
  {
    _id: '000000000000000000000001',
    name: 'House',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    _id: '000000000000000000000002',
    name: 'Apartment',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    _id: '000000000000000000000003',
    name: 'Villa',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    _id: '000000000000000000000004',
    name: 'Office',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    _id: '000000000000000000000005',
    name: 'Plot',
    created_at: Date.now(),
    updated_at: Date.now()
  }
]

// Function to seed types 
async function seedTypes() {
  try {
    // Remove existing types
    await Type.deleteMany()

    // Insert seed data
    await Type.insertMany(types)

    console.log('Seeding complete')
  } catch (err) {
    console.error('Error seeding data:', err)
  } finally {
    // Disconnect from the database
    await mongoose.disconnect()
  }
}

// Run the seeder function
seedTypes()
