const mongoose = require('mongoose')
const Utility = require('../models/utility.js')

mongoose.connect('mongodb://localhost:27017/meanstackapp', { useNewUrlParser: true, useUnifiedTopology: true, })

const utilities = [
    { _id: '000000000000000000000001', name: 'Garage' },
    { _id: '000000000000000000000002', name: 'Parking' },
    { _id: '000000000000000000000003', name: 'Pool' },
    { _id: '000000000000000000000004', name: 'Gym' },
    { _id: '000000000000000000000005', name: 'Central heating' },
    { _id: '000000000000000000000006', name: 'Internet' }
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