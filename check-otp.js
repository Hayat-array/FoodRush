// Check if OTPs are actually in the database
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodrush';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected'))
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });

const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', orderSchema);

async function checkOTPs() {
    try {
        const order = await Order.findOne({ orderNumber: 'ORD-876547' });
        console.log('Order found:', {
            orderNumber: order.orderNumber,
            status: order.status,
            deliveryOTP: order.deliveryOTP,
            hasOTP: !!order.deliveryOTP,
            allFields: Object.keys(order.toObject())
        });
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkOTPs();
