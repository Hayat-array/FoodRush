// import mongoose from 'mongoose';

// const restaurantSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   image: {
//     type: String,
//     required: true
//   },
//   coverImage: {
//     type: String,
//     required: true
//   },
//   cuisine: {
//     type: [String],
//     required: true
//   },
//   rating: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: 5
//   },
//   deliveryTime: {
//     type: String,
//     required: true
//   },
//   deliveryFee: {
//     type: Number,
//     default: 0
//   },
//   minOrder: {
//     type: Number,
//     default: 0
//   },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
//     coordinates: {
//       lat: Number,
//       lng: Number
//     }
//   },
//   contact: {
//     phone: String,
//     email: String,
//     website: String
//   },
//   workingHours: {
//     monday: { open: String, close: String },
//     tuesday: { open: String, close: String },
//     wednesday: { open: String, close: String },
//     thursday: { open: String, close: String },
//     friday: { open: String, close: String },
//     saturday: { open: String, close: String },
//     sunday: { open: String, close: String }
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   featured: {
//     type: Boolean,
//     default: false
//   },
//   tags: [{
//     type: String,
//     enum: ['popular', 'new', 'trending', 'recommended', 'offers']
//   }],
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   upiId: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// restaurantSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// restaurantSchema.index({ name: 'text', description: 'text', cuisine: 'text' });
// restaurantSchema.index({ cuisine: 1 });
// restaurantSchema.index({ rating: -1 });
// restaurantSchema.index({ featured: 1, isActive: 1 });

// const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

// export default Restaurant;
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // MUST be sent
    trim: true
  },
  slug: {
    type: String,
    required: true, // MUST be sent/generated
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: false // 🛠️ FIX: Made optional, but frontend validation should enforce
  },
  image: {
    type: String,
    required: false // 🛠️ FIX: Made optional (user may add later)
  },
  coverImage: {
    type: String,
    required: false // 🛠️ FIX: Made optional
  },
  cuisine: {
    type: [String],
    required: true // MUST contain at least one item
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  deliveryTime: {
    type: String,
    required: true // MUST be sent
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  minOrder: {
    type: Number,
    default: 0
  },
  address: { // 🛠️ FIX: Made subfields non-required
    street: { type: String, required: true }, // Enforce address street/city
    city: { type: String, required: true },
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: { type: String, required: false }, // Made optional - can be added later
    email: String,
    website: String
  },
  workingHours: {
    // These remain optional/defaulted objects
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    enum: ['popular', 'new', 'trending', 'recommended', 'offers']
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  upiId: {
    type: String,
    required: false // 🛠️ FIX: Made optional to allow COD restaurants
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

restaurantSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes remain the same
restaurantSchema.index({ name: 'text', description: 'text', cuisine: 'text' });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ featured: 1, isActive: 1 });

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;