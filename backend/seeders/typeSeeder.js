const mongoose = require('mongoose');
const Type = require('../models/type.js');

mongoose.connect('mongodb://localhost:27017/meanstackapp', { useNewUrlParser: true, useUnifiedTopology: true, });

// Type seed data
const types = [
    { _id: '65afd0827c1611711ff207b1', name: 'House' },
    { _id: '65afd0827c1611711ff207b2', name: 'Apartment' },
    { _id: '65afd0827c1611711ff207b3', name: 'Villa' },
    { _id: '65afd0827c1611711ff207b4', name: 'Office'},
    { _id: '65afd0827c1611711ff207b5', name: 'Plot'}
];

// Function to seed types 
async function seedTypes() {
  try {
    // Remove existing types
    await Type.deleteMany();

    // Insert seed data
    await Type.insertMany(types);

    console.log('Seeding complete');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
}

// Run the seeder function
seedTypes();
