const mongoose = require('mongoose')

const utilitySchema = new mongoose.Schema({
    name : { type: String }
})

const Utility = mongoose.model('Utility', utilitySchema)

module.exports = Utility