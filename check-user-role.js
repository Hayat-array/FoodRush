// Script to check and update user role
// Run this with: node check-user-role.js

require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    phone: String,
    image: String,
    createdAt: Date,
    updatedAt: Date
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function checkAndUpdateUserRole() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find the user by name or email
        const user = await User.findOne({ name: 'Shoyab' });

        if (!user) {
            console.log('❌ User "Shoyab" not found');
            return;
        }

        console.log('\n📋 Current User Details:');
        console.log('Name:', user.name);
        console.log('Email:', user.email);
        console.log('Current Role:', user.role);
        console.log('Phone:', user.phone);

        // Update role to regular user (customer)
        if (user.role === 'delivery') {
            user.role = 'customer'; // or just remove the role field
            await user.save();
            console.log('\n✅ User role updated from "delivery" to "customer"');
            console.log('The user can now access the normal FoodRush homepage');
        } else {
            console.log('\n✅ User role is already:', user.role);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

checkAndUpdateUserRole();
