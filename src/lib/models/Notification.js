import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userRole: {
        type: String,
        enum: ['user', 'restaurant_owner', 'delivery', 'super_admin'],
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    type: {
        type: String,
        enum: [
            'order_placed',
            'order_accepted',
            'order_rejected',
            'order_preparing',
            'order_ready',
            'delivery_assigned',
            'order_picked_up',
            'order_in_transit',
            'order_nearby',
            'order_delivered',
            'order_cancelled',
            'payment_verified',
            'new_delivery_request'
        ],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

// Index for faster queries
notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });
notificationSchema.index({ orderId: 1 });

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification;
