const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Task.deleteMany({});

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin',
        });

        // Create Employee
        const employee = await User.create({
            name: 'Employee User',
            email: 'employee@example.com',
            password: 'password123',
            role: 'employee',
        });

        console.log('Seed data created:');
        console.log('Admin: admin@example.com / password123');
        console.log('Employee: employee@example.com / password123');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
