const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    address: { 
        street: String, 
        city: String, 
        country: String, 
    },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    garages: { type: Number },
    price: { type: Number },
    size: { type: Number},
    area: { type: Number },
    forsale: {type: Boolean},
    featured: {type: Boolean},
    new: {type: Boolean}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;