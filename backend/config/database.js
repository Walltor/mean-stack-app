const mongoose = require('mongoose')

function connectToDatabase () {
    mongoose.connect('mongodb://localhost:27017/meanstackapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))
}

module.exports = connectToDatabase
