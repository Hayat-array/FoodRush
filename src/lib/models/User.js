import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    phone: { type: String, required: true },
    avatar: { type: String, default: null },

    role: {
        type: String,
        enum: ['user', 'admin', 'restaurant_owner', 'delivery', 'super_admin', 'manager', 'kitchen'],
        default: 'user',
        required: true,
        select: false,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        default: null
    },
    isAvailable: { type: Boolean, default: true },
    addresses: [{ type: Object }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    favoriteRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;