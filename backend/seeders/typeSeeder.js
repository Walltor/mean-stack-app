const mongoose = require('mongoose')
const Type = require('../models/type.js')

mongoose.connect('mongodb://localhost:27017/meanstackapp', { useNewUrlParser: true, useUnifiedTopology: true, })

// Type seed data
const types = [
    { _id: '000000000000000000000001', name: 'House' },
    { _id: '000000000000000000000002', name: 'Apartment' },
    { _id: '000000000000000000000003', name: 'Villa' },
    { _id: '000000000000000000000004', name: 'Office'},
    { _id: '000000000000000000000005', name: 'Plot'}
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
