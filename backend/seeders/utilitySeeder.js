const connectToDatabase = require('../config/database')
const mongoose = require('mongoose')
const Utility = require('../models/utility.js')

connectToDatabase()

const utilities = [
    {
        _id: '000000000000000000000001',
        name: 'Garage',
        created_at: Date.now(),
        updated_at: Date.now()
    },
    {
        _id: '000000000000000000000002',
        name: 'Parking',
        created_at: Date.now(),
        updated_at: Date.now()
    },
    {
        _id: '000000000000000000000003',
        name: 'Pool',
        created_at: Date.now(),
        updated_at: Date.now()
    },
    {
        _id: '000000000000000000000004',
        name: 'Gym',
        created_at: Date.now(),
        updated_at: Date.now()
    },
    {
        _id: '000000000000000000000005',
        name: 'Central heating',
        created_at: Date.now(),
        updated_at: Date.now()
    },
    {
        _id: '000000000000000000000006',
        name: 'Internet',
        created_at: Date.now(),
        updated_at: Date.now()
    }
]

async function seedUtilities() {
    try {
        await Utility.deleteMany()
        await Utility.insertMany(utilities)
        console.log('Seeding complete')
    } catch (err) {
        console.error('Error seeding data:', err)
    } finally {
        await mongoose.disconnect()
    }
}

seedUtilities()