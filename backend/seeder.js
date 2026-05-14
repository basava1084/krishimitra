require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');

const INITIAL_FARMERS = [
  { 
    name: 'Rajesh Kumar', 
    email: 'rajesh@farmer.com',
    password: 'password123',
    phone: '9876543210',
    role: 'farmer',
    location: 'Satara, MH', 
    rating: 4.8, 
    experience: 12,
    farmDetails: { farmingType: 'Organic', location: 'Satara, MH', description: 'Expert in organic tomato and onion cultivation with over 12 years of experience.' }
  },
  { 
    name: 'Suresh Patil', 
    email: 'suresh@farmer.com',
    password: 'password123',
    phone: '9876543211',
    role: 'farmer',
    location: 'Ratnagiri, MH', 
    rating: 5.0, 
    experience: 20,
    farmDetails: { farmingType: 'Natural', location: 'Ratnagiri, MH', description: 'Specializing in Alphonso mangoes and premium dairy products directly from our family farm.' }
  },
  { 
    name: 'Amrita Devi', 
    email: 'amrita@farmer.com',
    password: 'password123',
    phone: '9876543212',
    role: 'farmer',
    location: 'Shimla, HP', 
    rating: 4.9, 
    experience: 8,
    farmDetails: { farmingType: 'Hydroponic', location: 'Shimla, HP', description: 'Pioneering hydroponic and organic farming in the Himalayan foothills.' }
  },
  { 
    name: 'Harpreet Singh', 
    email: 'harpreet@farmer.com',
    password: 'password123',
    phone: '9876543213',
    role: 'farmer',
    location: 'Ludhiana, PB', 
    rating: 4.7, 
    experience: 15,
    farmDetails: { farmingType: 'Traditional', location: 'Ludhiana, PB', description: 'Fourth-generation farmer focused on premium grains and golden wheat harvests.' }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 Connected to MongoDB Atlas for seeding...');

    // Clear existing data
    await User.deleteMany({ role: 'farmer' });
    await Product.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});
    console.log('🧹 Cleared old data');

    // Seed farmers first to get their _ids
    const createdFarmers = [];
    for (const f of INITIAL_FARMERS) {
      const farmer = await User.create(f);
      createdFarmers.push(farmer);
    }
    console.log('🌱 Seeded 4 farmers');

    // Map old F-00X ids to real MongoDB _ids
    const farmerMap = {
      'F-001': createdFarmers[0]._id,
      'F-002': createdFarmers[1]._id,
      'F-003': createdFarmers[2]._id,
      'F-004': createdFarmers[3]._id,
    };

    const INITIAL_PRODUCTS = [
      { name: 'Organic Vine Tomatoes', price: 60, unit: 'kg', image: '/images/tomato.png', category: 'Vegetables', sellerName: 'Rajesh Kumar', farmerId: farmerMap['F-001'], createdByRole: 'farmer', location: 'Satara, MH', organic: true, rating: 4.9, harvestDate: new Date(), stock: 50 },
      { name: 'Alphonso Mangoes', price: 450, unit: 'box', image: '/images/cat-fruits.png', category: 'Fruits', sellerName: 'Suresh Patil', farmerId: farmerMap['F-002'], createdByRole: 'farmer', location: 'Ratnagiri, MH', organic: true, rating: 5.0, harvestDate: new Date(), stock: 20, preorder: true, countdown: new Date('2026-05-15T10:00:00Z') },
      { name: 'Farm Fresh A2 Milk', price: 80, unit: 'L', image: '/images/milk.png', category: 'Dairy', sellerName: 'Suresh Patil', farmerId: farmerMap['F-002'], createdByRole: 'farmer', location: 'Pune, MH', organic: false, rating: 4.7, harvestDate: new Date(), stock: 100 },
      { name: 'Golden Wheat Grains', price: 45, unit: 'kg', image: '/images/cat-grains.png', category: 'Grains', sellerName: 'Harpreet Singh', farmerId: farmerMap['F-004'], createdByRole: 'farmer', location: 'Ludhiana, PB', organic: true, rating: 4.8, harvestDate: new Date(), stock: 500 },
      { name: 'Red Onions', price: 35, unit: 'kg', image: '/images/onion.png', category: 'Vegetables', sellerName: 'Rajesh Kumar', farmerId: farmerMap['F-001'], createdByRole: 'farmer', location: 'Satara, MH', organic: true, rating: 4.6, harvestDate: new Date(), stock: 200 },
      { name: 'Fresh Carrots', price: 55, unit: 'kg', image: '/images/carrot.png', category: 'Vegetables', sellerName: 'Amrita Devi', farmerId: farmerMap['F-003'], createdByRole: 'farmer', location: 'Shimla, HP', organic: true, rating: 4.9, harvestDate: new Date(), stock: 80 },
      { name: 'Himalayan Honey', price: 350, unit: 'jar', image: '/images/honey-new.png', category: 'Others', sellerName: 'Amrita Devi', farmerId: farmerMap['F-003'], createdByRole: 'farmer', location: 'Manali, HP', organic: true, rating: 5.0, harvestDate: new Date(), stock: 40 },
      { name: 'Green Chillies', price: 40, unit: 'kg', image: '/images/green-chillies-new.png', category: 'Vegetables', sellerName: 'Rajesh Kumar', farmerId: farmerMap['F-001'], createdByRole: 'farmer', location: 'Satara, MH', organic: true, rating: 4.5, harvestDate: new Date(), stock: 60 },
      { name: 'Pure Desi Ghee', price: 850, unit: 'L', image: '/images/ghee.png', category: 'Dairy', sellerName: 'Suresh Patil', farmerId: farmerMap['F-002'], createdByRole: 'farmer', location: 'Ratnagiri, MH', organic: true, rating: 4.9, harvestDate: new Date(), stock: 15 },
      { name: 'Basmati Rice', price: 120, unit: 'kg', image: '/images/rice.png', category: 'Grains', sellerName: 'Harpreet Singh', farmerId: farmerMap['F-004'], createdByRole: 'farmer', location: 'Ludhiana, PB', organic: true, rating: 4.8, harvestDate: new Date(), stock: 1000, preorder: true, countdown: new Date('2026-05-20T08:00:00Z') },
      { name: 'Fresh Ginger', price: 120, unit: 'kg', image: '/images/ginger.png', category: 'Vegetables', sellerName: 'Rajesh Kumar', farmerId: farmerMap['F-001'], createdByRole: 'farmer', location: 'Satara, MH', organic: true, rating: 4.7, harvestDate: new Date(), stock: 45 },
      { name: 'Organic Turmeric', price: 180, unit: 'kg', image: '/images/turmeric.png', category: 'Vegetables', sellerName: 'Amrita Devi', farmerId: farmerMap['F-003'], createdByRole: 'farmer', location: 'Shimla, HP', organic: true, rating: 4.9, harvestDate: new Date(), stock: 30 },
      { name: 'Farm Fresh Eggs', price: 180, unit: 'dz', image: '/images/eggs.png', category: 'Others', sellerName: 'Suresh Patil', farmerId: farmerMap['F-002'], createdByRole: 'farmer', location: 'Ratnagiri, MH', organic: true, rating: 4.8, harvestDate: new Date(), stock: 25 },
      { name: 'Golden Potatoes', price: 40, unit: 'kg', image: '/images/potato.png', category: 'Vegetables', sellerName: 'Harpreet Singh', farmerId: farmerMap['F-004'], createdByRole: 'farmer', location: 'Ludhiana, PB', organic: false, rating: 4.4, harvestDate: new Date(), stock: 300 },
      { name: 'Sweet Cauliflower', price: 45, unit: 'kg', image: '/images/cauliflower.png', category: 'Vegetables', sellerName: 'Rajesh Kumar', farmerId: farmerMap['F-001'], createdByRole: 'farmer', location: 'Satara, MH', organic: false, rating: 4.4, harvestDate: new Date(), stock: 120 },
      { name: 'Fresh Papaya', price: 70, unit: 'kg', image: '/images/cat-fruits.png', category: 'Fruits', sellerName: 'Amrita Devi', farmerId: farmerMap['F-003'], createdByRole: 'farmer', location: 'Shimla, HP', organic: true, rating: 4.7, harvestDate: new Date(), stock: 50 }
    ];

    await Product.insertMany(INITIAL_PRODUCTS);
    console.log('🛒 Seeded 16 products!');

    console.log('✅ Database seeding complete!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
