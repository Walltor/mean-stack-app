const mongoose = require('mongoose')

const utilitySchema = new mongoose.Schema({
    name : { type: String },
    created_at: {type: Date},
    updated_at: {type: Date}
})

const Utility = mongoose.model('Utility', utilitySchema)

module.exports = Utility