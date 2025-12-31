import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    size: {
        name: String,
        price: Number
    },
    customizations: [{
        name: String,
        options: [{
            name: String,
            price: Number
        }]
    }],
    subtotal: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: String
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [orderItemSchema],
    deliveryOTP: { type: String },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    otpGeneratedAt: {
        type: Date,
        default: null
    },
    otpVerified: {
        type: Boolean,
        default: false
    },
    deliveryType: {
        type: String,
        enum: ['delivery', 'pickup'],
        required: true
    },
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        coordinates: {
            lat: Number,
            lng: Number
        },
        landmark: String,
        instructions: String
    },
    pickupTime: {
        type: Date
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'upi'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'partial', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    utrNumber: { type: String, default: null }, // UPI transaction reference

    // Payment Verification (for UPI/Online payments)
    paymentVerified: { type: Boolean, default: false },
    paymentVerifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    paymentVerifiedAt: { type: Date, default: null },
    paymentAmount: { type: Number, default: null }, // Actual amount paid
    amountDue: { type: Number, default: 0 }, // Remaining amount to pay

    subtotal: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    taxes: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'pending_payment', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    estimatedDeliveryTime: {
        type: Date
    },
    actualDeliveryTime: {
        type: Date
    },
    specialInstructions: String,
    trackingLink: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


orderSchema.index({ customer: { phone: 1 } });
orderSchema.index({ restaurant: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ deliveryType: 1, status: 1 });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;