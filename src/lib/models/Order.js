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
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

    deliveryPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    otp: {
        code: String,
        expiresAt: Date,
        verified: {
            type: Boolean,
            default: false
        }
    },

    timeline: [{
        status: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        note: String
    }],
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
        enum: [
            'pending',           // Order placed, waiting for restaurant
            'pending_payment',   // Waiting for payment verification
            'accepted',          // Restaurant accepted
            'preparing',         // Food being prepared
            'ready',             // Ready for pickup
            'assigned',          // Delivery partner assigned
            'picked_up',         // Delivery partner picked up
            'out_for_delivery',  // On the way
            'nearby',            // Near customer location
            'delivered',         // Completed
            'cancelled'          // Cancelled
        ],
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

// Method to add timeline entry
orderSchema.methods.addTimelineEntry = function (status, updatedBy, note) {
    this.timeline.push({
        status,
        timestamp: new Date(),
        updatedBy,
        note
    });
};

// Method to generate OTP
orderSchema.methods.generateOTP = function () {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.otp = {
        code: otpCode,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        verified: false
    };
    return otpCode;
};

// Method to verify OTP
orderSchema.methods.verifyOTP = function (inputOTP) {
    if (!this.otp || !this.otp.code) {
        return { success: false, message: 'No OTP generated for this order' };
    }

    if (this.otp.verified) {
        return { success: false, message: 'OTP already verified' };
    }

    if (new Date() > this.otp.expiresAt) {
        return { success: false, message: 'OTP expired' };
    }

    if (this.otp.code !== inputOTP.toString()) {
        return { success: false, message: 'Invalid OTP' };
    }

    this.otp.verified = true;
    return { success: true, message: 'OTP verified successfully' };
};


orderSchema.index({ customer: { phone: 1 } });
orderSchema.index({ restaurant: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ deliveryType: 1, status: 1 });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;