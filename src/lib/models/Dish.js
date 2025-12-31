// // // import mongoose from 'mongoose';

// // // const dishSchema = new mongoose.Schema({
// // //   name: {
// // //     type: String,
// // //     required: true,
// // //     trim: true
// // //   },
// // //   slug: {
// // //     type: String,
// // //     required: true,
// // //     lowercase: true
// // //   },
// // //   description: {
// // //     type: String,
// // //     required: true
// // //   },
// // //   image: {
// // //     type: String,
// // //     required: true
// // //   },
// // //   price: {
// // //     type: Number,
// // //     required: true,
// // //     min: 0
// // //   },
// // //   originalPrice: {
// // //     type: Number,
// // //     min: 0
// // //   },
// // //   category: {
// // //     type: String,
// // //     required: true,
// // //     enum: ['starters', 'main-course', 'desserts', 'beverages', 'snacks', 'biryani', 'chinese', 'continental', 'south-indian', 'north-indian']
// // //   },
// // //   subcategory: {
// // //     type: String,
// // //     required: true
// // //   },
// // //   restaurant: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: 'Restaurant',
// // //     required: true
// // //   },
// // //   dietary: [{
// // //     type: String,
// // //     enum: ['vegetarian', 'non-vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'jain', 'eggless']
// // //   }],
// // //   spiceLevel: {
// // //     type: String,
// // //     enum: ['mild', 'medium', 'hot', 'extra-hot'],
// // //     default: 'medium'
// // //   },
// // //   preparationTime: {
// // //     type: String,
// // //     required: true
// // //   },
// // //   ingredients: [{
// // //     type: String,
// // //     trim: true
// // //   }],
// // //   allergens: [{
// // //     type: String,
// // //     enum: ['nuts', 'dairy', 'gluten', 'soy', 'eggs', 'shellfish', 'fish']
// // //   }],
// // //   nutritionInfo: {
// // //     calories: Number,
// // //     protein: Number,
// // //     carbs: Number,
// // //     fat: Number,
// // //     fiber: Number
// // //   },
// // //   sizes: [{
// // //     name: String,
// // //     price: Number,
// // //     description: String
// // //   }],
// // //   customizations: [{
// // //     name: String,
// // //     options: [{
// // //       name: String,
// // //       price: Number
// // //     }],
// // //     required: Boolean,
// // //     multiple: Boolean
// // //   }],
// // //   isAvailable: {
// // //     type: Boolean,
// // //     default: true
// // //   },
// // //   isPopular: {
// // //     type: Boolean,
// // //     default: false
// // //   },
// // //   isRecommended: {
// // //     type: Boolean,
// // //     default: false
// // //   },
// // //   tags: [{
// // //     type: String,
// // //     enum: ['bestseller', 'chef-special', 'healthy', 'spicy', 'sweet', 'sour', 'crispy', 'soft']
// // //   }],
// // //   rating: {
// // //     type: Number,
// // //     default: 0,
// // //     min: 0,
// // //     max: 5
// // //   },
// // //   reviewCount: {
// // //     type: Number,
// // //     default: 0
// // //   },
// // //   orderCount: {
// // //     type: Number,
// // //     default: 0
// // //   },
// // //   createdAt: {
// // //     type: Date,
// // //     default: Date.now
// // //   },
// // //   updatedAt: {
// // //     type: Date,
// // //     default: Date.now
// // //   }
// // // });

// // // dishSchema.pre('save', function(next) {
// // //   this.updatedAt = Date.now();
// // //   next();
// // // });

// // // dishSchema.index({ restaurant: 1, category: 1 });
// // // dishSchema.index({ restaurant: 1, isAvailable: 1 });
// // // dishSchema.index({ name: 'text', description: 'text', ingredients: 'text' });
// // // dishSchema.index({ rating: -1 });
// // // dishSchema.index({ isPopular: 1, isAvailable: 1 });
// // // dishSchema.index({ price: 1 });

// // // const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema);

// // // export default Dish;
// // import mongoose from 'mongoose';

// // const dishSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   slug: {
// //     type: String,
// //     required: true,
// //     lowercase: true
// //   },
// //   description: {
// //     type: String,
// //     required: true
// //   },
// //   image: {
// //     type: String,
// //     required: true
// //   },
// //   price: {
// //     type: Number,
// //     required: true,
// //     min: 0
// //   },
// //   originalPrice: {
// //     type: Number,
// //     min: 0
// //   },
// //   category: {
// //     type: String,
// //     required: true,
// //     // Removed strict enum to prevent errors if you add a new category dynamically
// //     trim: true
// //   },

// //   // 👇 FIXED: Removed 'required: true' and added default
// //   subcategory: {
// //     type: String,
// //     default: "General" 
// //   },

// //   restaurant: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Restaurant',
// //     required: true
// //   },

// //   dietary: [{
// //     type: String,
// //     // Removed strict enum to allow flexibility, or ensure your frontend sends exactly these values
// //     trim: true
// //   }],

// //   spiceLevel: {
// //     type: String,
// //     enum: ['mild', 'medium', 'hot', 'extra-hot'],
// //     default: 'medium'
// //   },

// //   // 👇 FIXED: Removed 'required: true' and added default
// //   preparationTime: {
// //     type: String,
// //     default: "20 min"
// //   },

// //   ingredients: [{
// //     type: String,
// //     trim: true
// //   }],
// //   allergens: [{
// //     type: String,
// //     trim: true
// //   }],
// //   nutritionInfo: {
// //     calories: Number,
// //     protein: Number,
// //     carbs: Number,
// //     fat: Number,
// //     fiber: Number
// //   },
// //   sizes: [{
// //     name: String,
// //     price: Number,
// //     description: String
// //   }],
// //   customizations: [{
// //     name: String,
// //     options: [{
// //       name: String,
// //       price: Number
// //     }],
// //     required: Boolean,
// //     multiple: Boolean
// //   }],
// //   isAvailable: {
// //     type: Boolean,
// //     default: true
// //   },
// //   isPopular: {
// //     type: Boolean,
// //     default: false
// //   },
// //   isRecommended: {
// //     type: Boolean,
// //     default: false
// //   },
// //   tags: [{
// //     type: String,
// //     trim: true
// //   }],
// //   rating: {
// //     type: Number,
// //     default: 0,
// //     min: 0,
// //     max: 5
// //   },
// //   reviewCount: {
// //     type: Number,
// //     default: 0
// //   },
// //   orderCount: {
// //     type: Number,
// //     default: 0
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   updatedAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // dishSchema.pre('save', function(next) {
// //   this.updatedAt = Date.now();
// //   next();
// // });

// // // Indexes
// // dishSchema.index({ restaurant: 1, category: 1 });
// // dishSchema.index({ restaurant: 1, isAvailable: 1 });
// // dishSchema.index({ name: 'text', description: 'text', ingredients: 'text' });
// // dishSchema.index({ rating: -1 });
// // dishSchema.index({ isPopular: 1, isAvailable: 1 });
// // dishSchema.index({ price: 1 });

// // // Check if model exists before creating to prevent overwrite errors in dev mode
// // const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema);

// // export default Dish;
// import mongoose from 'mongoose';

// const dishSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   slug: {
//     type: String,
//     required: true,
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
//   price: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   originalPrice: {
//     type: Number,
//     min: 0
//   },
//   category: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   // 👇 FIXED: Removed 'required: true'
//   subcategory: {
//     type: String,
//     default: "General"
//   },
//   restaurant: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Restaurant',
//     required: true
//   },
//   dietary: [{
//     type: String,
//     trim: true
//   }],
//   spiceLevel: {
//     type: String,
//     default: 'medium'
//   },
//   // 👇 FIXED: Removed 'required: true'
//   preparationTime: {
//     type: String,
//     default: "20 min"
//   },
//   ingredients: [{ type: String }],
//   allergens: [{ type: String }],
//   isAvailable: {
//     type: Boolean,
//     default: true
//   },
//   isPopular: {
//     type: Boolean,
//     default: false
//   },
//   rating: {
//     type: Number,
//     default: 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Check if model exists before creating to avoid "OverwriteModelError"
// const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema);

// export default Dish;
import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  // 👇 FIXED: Removed 'required: true', added default
  subcategory: {
    type: String,
    default: "General"
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  dietary: [{
    type: String,
    trim: true
  }],
  spiceLevel: {
    type: String,
    default: 'medium'
  },
  // 👇 FIXED: Removed 'required: true', added default
  preparationTime: {
    type: String,
    default: "20 min"
  },
  ingredients: [{ type: String }],
  allergens: [{ type: String }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isRecommended: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalRatings: {
    type: Number,
    default: 0
  },
  orderCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Force model refresh - delete cached version
if (mongoose.models.Dish) {
  delete mongoose.models.Dish;
}

// Create fresh model with updated schema
const Dish = mongoose.model('Dish', dishSchema);

export default Dish;