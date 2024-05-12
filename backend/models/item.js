const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: { type: String },
    types: [
        { 
            type: mongoose.Schema.Types.ObjectId, ref: 'Type' 
        }
    ],
    address: { 
        street: String, 
        city: String, 
        country: String, 
    },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    price: { type: Number },
    size: { type: Number },
    area: { type: Number },
    forsale: { type: Boolean },
    featured: { type: Boolean },
    description: { type: String },
    utilities: [
        { 
            type: mongoose.Schema.Types.ObjectId, ref: 'Utility' 
        }
    ],
    images: [
        { 
            type: String 
        }
    ],
    created_at: {type: Date},
    updated_at: {type: Date}
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item