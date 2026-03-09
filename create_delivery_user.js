const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI not found in .env.local');
    process.exit(1);
}

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    phone: String,
    deliveryDetails: {
        bikeNumber: String,
        licenseNumber: String,
        address: String,
        isVerified: Boolean,
        rating: Number,
        totalDeliveries: Number
    }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createDeliveryPartner() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const email = 'delivery@test.com';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // cleanup existing
        await User.deleteOne({ email });
        console.log('🗑️  Cleaned up old test account if existed');

        const deliveryUser = new User({
            name: 'Test Delivery Partner',
            email: email,
            password: hashedPassword,
            phone: '9999999999',
            role: 'delivery',
            deliveryDetails: {
                bikeNumber: 'TEST-BIKE-01',
                licenseNumber: 'TEST-DL-01',
                address: '123 Test St, Food City',
                isVerified: true, // Auto verify
                rating: 4.8,
                totalDeliveries: 10
            }
        });

        await deliveryUser.save();
        console.log('\n🎉 Test Delivery Partner Created Successfully!');
        console.log('-------------------------------------------');
        console.log(`📧 Email:    ${email}`);
        console.log(`🔑 Password: ${password}`);
        console.log('-------------------------------------------');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createDeliveryPartner();
