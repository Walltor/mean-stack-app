const connectToDatabase = require('../config/database')
const mongoose = require('mongoose')
const Item = require('../models/item.js')

connectToDatabase()

// Item seed data
const items = [
  {
    title: 'Spacious Family House',
    types: ['000000000000000000000001'],
    address: { street: '123 Main St', city: 'Cityville', country: 'Countryland' },
    bedrooms: 4,
    bathrooms: 3,
    price: 500000,
    area: null,
    size: 167,
    forsale: true,
    featured: true,
    utilities: ['000000000000000000000001', '000000000000000000000006'],
    images: ['http://localhost:3000/uploads/house-pic1.jpg', 'http://localhost:3000/uploads/house-pic2.jpg'],
    description: 'This spacious family house offers ample living space with 4 bedrooms, 3 bathrooms, and 2 garages. Situated in the heart of Cityville, it boasts modern amenities and a stylish design.',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    title: 'Modern City Apartment',
    types: ['000000000000000000000002'],
    address: { street: '456 Downtown Ave', city: 'Metropolis', country: 'Countryland' },
    bedrooms: 2,
    bathrooms: 2,
    price: 800000,
    area: null,
    size: 111,
    forsale: true,
    featured: false,
    utilities: ['000000000000000000000002', '000000000000000000000006'],
    images: ['http://localhost:3000/uploads/apartment-pic1.jpg', 'http://localhost:3000/uploads/apartment-pic2.jpg'],
    description: 'Enjoy urban living in this modern city apartment located in Metropolis. With 2 bedrooms, 2 bathrooms, and a garage, it offers convenience and comfort in a bustling city environment.',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    title: 'Luxurious Villa with a View',
    types: ['000000000000000000000003', '000000000000000000000005'],
    address: { street: '789 Hilltop Rd', city: 'Scenicview', country: 'Countryland' },
    bedrooms: 5,
    bathrooms: 4,
    price: 1200000,
    area: 21000,
    size: 260,
    forsale: true,
    featured: true,
    utilities: ['000000000000000000000001', '000000000000000000000003', '000000000000000000000005', '000000000000000000000006'],
    images: ['http://localhost:3000/uploads/villa-pic1.jpg', 'http://localhost:3000/uploads/villa-pic2.jpg'],
    description: 'Experience luxury living in this stunning villa nestled in Scenicview. Featuring 5 bedrooms, 4 bathrooms, and 3 garages, it offers breathtaking views and sophisticated amenities.',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    title: 'Downtown Office Space',
    types: ['000000000000000000000004'],
    address: {
      street: '101 Business Blvd',
      city: 'Corporateville', country: 'Countryland'
    },
    bedrooms: 0, bathrooms: 2,
    price: 500000,
    area: null,
    size: 74,
    forsale: false,
    featured: true,
    utilities: ['000000000000000000000002'],
    images: ['http://localhost:3000/uploads/office-pic1.jpg', 'http://localhost:3000/uploads/office-pic2.jpg'],
    description: 'Ideal for businesses, this downtown office space in Corporateville offers modern facilities and convenient access to amenities. With 2 bathrooms and ample workspace, it provides a conducive environment for productivity.',
    created_at: Date.now(),
    updated_at: Date.now()
  },

  {
    title: 'Scenic Plot for Development',
    types: ['000000000000000000000005'],
    address: { street: null, city: 'Ruralville', country: 'Countryland' },
    bedrooms: null,
    bathrooms: null,
    price: 200000,
    area: 5000, size: null,
    forsale: true,
    featured: false,
    utilities: [],
    images: ['http://localhost:3000/uploads/plot-pic1.jpg', 'http://localhost:3000/uploads/plot-pic2.jpg'],
    description: 'This scenic plot in Ruralville presents an excellent opportunity for development. With a vast area of 5000 square meters, it offers endless possibilities for creating your dream project.',
    created_at: Date.now(),
    updated_at: Date.now()
  },

  {
    title: 'Classic Suburban House',
    types: ['000000000000000000000001'],
    address: { street: '222 Suburb St', city: 'Suburbia', country: 'Countryland' },
    bedrooms: 3,
    bathrooms: 2,
    price: 400000,
    area: null,
    size: 167,
    forsale: true,
    featured: false,
    utilities: ['000000000000000000000001', '000000000000000000000003', '000000000000000000000005'],
    images: ['http://localhost:3000/uploads/house-pic1.jpg', 'http://localhost:3000/uploads/house-pic2.jpg'],
    description: 'Enjoy suburban living in this classic house located in the peaceful neighborhood of Suburbia. With 3 bedrooms, 2 bathrooms, and 2 garages, it offers a cozy and welcoming atmosphere for families.',
    created_at: Date.now(),
    updated_at: Date.now()
  },

  {
    title: 'Penthouse in the Sky',
    types: ['000000000000000000000002'],
    address: { street: '888 Skyhigh Ave', city: 'Highrise City', country: 'Countryland' },
    bedrooms: 3,
    bathrooms: 3,
    price: 1000000,
    area: null,
    size: 167,
    forsale: false,
    featured: true,
    utilities: ['000000000000000000000002', '000000000000000000000004', '000000000000000000000005', '000000000000000000000006'],
    images: ['http://localhost:3000/uploads/apartment-pic1.jpg', 'http://localhost:3000/uploads/apartment-pic2.jpg'],
    description: 'Live the high life in this luxurious penthouse located in the prestigious area of Highrise City. With 3 bedrooms, 3 bathrooms, and 2 garages, it offers unparalleled elegance and breathtaking views.',
    created_at: Date.now(),
    updated_at: Date.now()
  },

  {
    title: 'Secluded Mountain Villa',
    types: ['000000000000000000000003', '000000000000000000000005'],
    address: { street: '555 Mountain Rd', city: 'Mountainville', country: 'Countryland' },
    bedrooms: 6,
    bathrooms: 5,
    price: 1500000,
    area: 43000,
    size: 297,
    forsale: true,
    featured: true,
    utilities: ['000000000000000000000001', '000000000000000000000003', '000000000000000000000004', '000000000000000000000005'],
    images: ['http://localhost:3000/uploads/villa-pic1.jpg', 'http://localhost:3000/uploads/villa-pic2.jpg'],
    description: 'Escape to the serenity of nature in this secluded mountain villa located in the picturesque town of Mountainville. With 6 bedrooms, 5 bathrooms, and 4 garages, it offers the ultimate retreat for relaxation and rejuvenation.',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    title: 'Modern Downtown Office',
    types: ['000000000000000000000004'],
    address: { street: '333 Business Center', city: 'Metropolis', country: 'Countryland' },
    bedrooms: 0,
    bathrooms: 1,
    price: 600000,
    area: null,
    size: 46,
    forsale: true,
    featured: true,
    utilities: ['000000000000000000000002', '000000000000000000000004'],
    images: ['http://localhost:3000/uploads/office-pic1.jpg', 'http://localhost:3000/uploads/office-pic2.jpg'],
    description: 'Establish your business in this modern downtown office located in the bustling city of Metropolis. With 1 bathroom and a strategic location, it offers convenience and accessibility for your professional endeavors.',
    created_at: Date.now(),
    updated_at: Date.now()
  },

  {
    title: 'Expansive Countryside Plot',
    types: ['000000000000000000000005'],
    address: { street: null, city: 'Ruralville', country: 'Countryland' },
    bedrooms: null,
    bathrooms: null,
    price: 300000,
    area: 7000,
    size: null,
    forsale: true,
    featured: true,
    utilities: [],
    images: ['http://localhost:3000/uploads/plot-pic1.jpg', 'http://localhost:3000/uploads/plot-pic2.jpg'],
    description: 'Discover endless possibilities with this expansive countryside plot located in the idyllic town of Ruralville. With a vast area of 7000 square meters, it offers ample space for agricultural pursuits or building your dream home.',
    created_at: Date.now(),
    updated_at: Date.now()
  }
]

// Function to seed items
async function seedItems() {
  try {
    // Remove existing items
    await Item.deleteMany()

    // Insert seed data
    await Item.insertMany(items)

    console.log('Seeding complete')
  } catch (err) {
    console.error('Error seeding data:', err)
  } finally {
    // Disconnect from the database
    await mongoose.disconnect()
  }
}

// Run the seeder function
seedItems()
