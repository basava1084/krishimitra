require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
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
    console.log('📡 Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({ role: 'farmer' });
    await Conversation.deleteMany({});
    await Message.deleteMany({});

    console.log('🧹 Cleared old chat and farmer data');

    // Add Farmers
    for (const f of INITIAL_FARMERS) {
      await User.create(f);
    }

    console.log('🌱 Successfully seeded farmers!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
