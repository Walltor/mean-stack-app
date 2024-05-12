const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
    name: { type: String },
    created_at: {type: Date},
    updated_at: {type: Date}
})

const Type = mongoose.model('Type', typeSchema)

module.exports = Type