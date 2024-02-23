const mongoose = require('mongoose');
const Item = require('../models/item.js');

mongoose.connect('mongodb://localhost:27017/meanstackapp', { useNewUrlParser: true, useUnifiedTopology: true, });

// Item seed data
const items = [
  { title: 'Spacious Family House', type: '65afd0827c1611711ff207b1', address: { street: '123 Main St', city: 'Cityville', country: 'Countryland' }, bedrooms: 4, bathrooms: 3, garages: 2, price: 500000, area: 0, size: 167.23, forsale: true, featured: true, newItem: false, images: ['http://localhost:4200/assets/images/house-pic1.jpg', 'http://localhost:4200/assets/images/house-pic2.jpg'] },
  { title: 'Modern City Apartment', type: '65afd0827c1611711ff207b2', address: { street: '456 Downtown Ave', city: 'Metropolis', country: 'Countryland' }, bedrooms: 2, bathrooms: 2, garages: 1, price: 800000, area: 0, size: 111.48, forsale: true, featured: false, newItem: true, images: ['http://localhost:4200/assets/images/apartment-pic1.jpg', 'http://localhost:4200/assets/images/apartment-pic2.jpg'] },
  { title: 'Luxurious Villa with a View', type: '65afd0827c1611711ff207b3', address: { street: '789 Hilltop Rd', city: 'Scenicview', country: 'Countryland' }, bedrooms: 5, bathrooms: 4, garages: 3, price: 1200000, area: 0, size: 260.13, forsale: true, featured: true, newItem: false, images: ['http://localhost:4200/assets/images/villa-pic1.jpg', 'http://localhost:4200/assets/images/villa-pic2.jpg'] },
  { title: 'Downtown Office Space', type: '65afd0827c1611711ff207b4', address: { street: '101 Business Blvd', city: 'Corporateville', country: 'Countryland' }, bedrooms: 0, bathrooms: 2, garages: 0, price: 500000, area: 0, size: 74.32, forsale: true, featured: true, newItem: true, images: ['http://localhost:4200/assets/images/office-pic1.jpg', 'http://localhost:4200/assets/images/office-pic2.jpg'] },
  { title: 'Scenic Plot for Development', type: '65afd0827c1611711ff207b5', address: { street: '777 Countryside Ln', city: 'Ruralville', country: 'Countryland' }, bedrooms: 0, bathrooms: 0, garages: 0, price: 200000, area: 5000, size: 0, forsale: true, featured: false, newItem: true, images: ['http://localhost:4200/assets/images/plot-pic1.jpg', 'http://localhost:4200/assets/images/plot-pic2.jpg'] },
  { title: 'Classic Suburban House', type: '65afd0827c1611711ff207b1', address: { street: '222 Suburb St', city: 'Suburbia', country: 'Countryland' }, bedrooms: 3, bathrooms: 2, garages: 2, price: 400000, area: 0, size: 167.23, forsale: true, featured: false, newItem: false, images: ['http://localhost:4200/assets/images/house-pic1.jpg', 'http://localhost:4200/assets/images/house-pic2.jpg'] },
  { title: 'Penthouse in the Sky', type: '65afd0827c1611711ff207b2', address: { street: '888 Skyhigh Ave', city: 'Highrise City', country: 'Countryland' }, bedrooms: 3, bathrooms: 3, garages: 2, price: 1000000, area: 0, size: 167.23, forsale: true, featured: true, newItem: true, images: ['http://localhost:4200/assets/images/apartment-pic1.jpg', 'http://localhost:4200/assets/images/apartment-pic2.jpg'] },
  { title: 'Secluded Mountain Villa', type: '65afd0827c1611711ff207b3', address: { street: '555 Mountain Rd', city: 'Mountainville', country: 'Countryland' }, bedrooms: 6, bathrooms: 5, garages: 4, price: 1500000, area: 0, size: 297.29, forsale: true, featured: false, newItem: false, images: ['http://localhost:4200/assets/images/villa-pic1.jpg', 'http://localhost:4200/assets/images/villa-pic2.jpg'] },
  { title: 'Modern Downtown Office', type: '65afd0827c1611711ff207b4', address: { street: '333 Business Center', city: 'Metropolis', country: 'Countryland' }, bedrooms: 0, bathrooms: 1, garages: 0, price: 600000, area: 0, size: 46.45, forsale: true, featured: true, newItem: false, images: ['http://localhost:4200/assets/images/office-pic1.jpg', 'http://localhost:4200/assets/images/office-pic2.jpg'] },
  { title: 'Expansive Countryside Plot', type: '65afd0827c1611711ff207b5', address: { street: '666 Country Rd', city: 'Ruralville', country: 'Countryland' }, bedrooms: 0, bathrooms: 0, garages: 0, price: 300000, area: 7000, size: 0, forsale: true, featured: false, newItem: true, images: ['http://localhost:4200/assets/images/plot-pic1.jpg', 'http://localhost:4200/assets/images/plot-pic2.jpg'] },
];

// Function to seed items
async function seedItems() {
  try {
    // Remove existing items
    await Item.deleteMany();

    // Insert seed data
    await Item.insertMany(items);

    console.log('Seeding complete');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
}

// Run the seeder function
seedItems();
