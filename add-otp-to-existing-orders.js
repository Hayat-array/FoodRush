// Script to add OTPs to existing orders that don't have them
// Run this once: node add-otp-to-existing-orders.js

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodrush')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Define Order schema (minimal version)
const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', orderSchema);

async function addOTPsToOrders() {
    try {
        // Find all orders without deliveryOTP
        const ordersWithoutOTP = await Order.find({
            $or: [
                { deliveryOTP: { $exists: false } },
                { deliveryOTP: null },
                { deliveryOTP: '' }
            ]
        });

        console.log(`📦 Found ${ordersWithoutOTP.length} orders without OTP`);

        if (ordersWithoutOTP.length === 0) {
            console.log('✅ All orders already have OTPs!');
            process.exit(0);
        }

        let updated = 0;
        for (const order of ordersWithoutOTP) {
            // Generate 4-digit OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();

            // Update order
            await Order.updateOne(
                { _id: order._id },
                {
                    $set: {
                        deliveryOTP: otp,
                        otpGeneratedAt: new Date(),
                        otpVerified: false
                    }
                }
            );

            updated++;
            if (updated % 10 === 0) {
                console.log(`Updated ${updated}/${ordersWithoutOTP.length} orders...`);
            }
        }

        console.log(`✅ Successfully added OTPs to ${updated} orders!`);
        console.log('Sample OTPs:');

        // Show a few sample orders with their OTPs
        const samples = await Order.find({ deliveryOTP: { $exists: true } })
            .select('orderNumber status deliveryOTP')
            .limit(5);

        samples.forEach(order => {
            console.log(`  ${order.orderNumber} (${order.status}): ${order.deliveryOTP}`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
    }
}

addOTPsToOrders();
