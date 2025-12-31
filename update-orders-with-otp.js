// Quick script to add OTPs to all existing orders
// Run: node update-orders-with-otp.js

const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodrush';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ Connection error:', err);
        process.exit(1);
    });

// Define Order schema
const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', orderSchema);

async function updateOrders() {
    try {
        // Find all out_for_delivery orders without OTP
        const orders = await Order.find({
            status: { $in: ['out_for_delivery', 'out-for-delivery'] },
            $or: [
                { deliveryOTP: { $exists: false } },
                { deliveryOTP: null },
                { deliveryOTP: '' }
            ]
        });

        console.log(`Found ${orders.length} orders without OTP`);

        for (const order of orders) {
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
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
            console.log(`✅ Added OTP ${otp} to order ${order.orderNumber}`);
        }

        console.log('\n✅ Done! All orders now have OTPs');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateOrders();
