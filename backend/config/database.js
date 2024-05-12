const mongoose = require('mongoose')

function connectToDatabase () {
    mongoose.connect('mongodb://0.0.0.0:27017/meanstackapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))
}

module.exports = connectToDatabase
