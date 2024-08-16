const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User'); // Ensure the path to your User model is correct

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Create and save a new user
const createUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);

  const newUser = new User({
    name: 'admin',
    email: 'admin@example.com',
    password: hashedPassword,
    activeTemplate: 'template1',
  });

  try {
    await newUser.save();
    console.log('User created');
  } catch (error) {
    console.error('Error creating user:', error.message);
  }

  mongoose.connection.close();
};

// Run the script
const run = async () => {
  await connectDB();
  await createUser();
};

run();
