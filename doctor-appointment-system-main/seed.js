const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Import models
const User = require('./schemas/userModel');
const Doctor = require('./schemas/docModel');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/docspot';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - be careful in production!)
    await User.deleteMany({});
    await Doctor.deleteMany({});

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@docspot.com',
      password: hashedPassword,
      phone: '1234567890',
      isAdmin: true,
      isDoctor: false,
      doctorId: null
    });

    await adminUser.save();
    console.log('Admin user created: admin@docspot.com / admin123');

    // Create Doctor User first (without doctorId)
    const hashedDoctorPassword = await bcrypt.hash('doctor123', salt);

    const doctorUser = new User({
      name: 'Dr. John Smith',
      email: 'doctor@docspot.com',
      password: hashedDoctorPassword,
      phone: '9876543210',
      isAdmin: false,
      isDoctor: true,
      doctorId: null  // Will be updated after creating doctor profile
    });

    await doctorUser.save();
    console.log('Doctor user created: doctor@docspot.com / doctor123');

    // Create Doctor Profile with userId reference
    const doctorProfile = new Doctor({
      userId: doctorUser._id,
      firstName: 'John',
      lastName: 'Smith',
      email: 'doctor@docspot.com',
      phone: '9876543210',
      specialty: 'General Medicine',
      experience: '10',
      fees: 500,
      address: '123 Medical Center, City',
      status: 'approved'
    });

    await doctorProfile.save();
    console.log('Doctor profile created');

    // Update user with doctorId
    doctorUser.doctorId = doctorProfile._id;
    await doctorUser.save();

    // Create Regular User for testing
    const hashedUserPassword = await bcrypt.hash('user123', salt);

    const regularUser = new User({
      name: 'Test User',
      email: 'user@docspot.com',
      password: hashedUserPassword,
      phone: '5555555555',
      isAdmin: false,
      isDoctor: false,
      doctorId: null
    });

    await regularUser.save();
    console.log('Regular user created: user@docspot.com / user123');

    console.log('\n=== Seed Data Created Successfully ===');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@docspot.com / admin123');
    console.log('Doctor: doctor@docspot.com / doctor123');
    console.log('User: user@docspot.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
