// import connectDB from '../lib/mongodb.js';
// import { Restaurant, Dish, User, Order } from '../lib/models/index.js';

// const sampleRestaurants = [
//   {
//     name: 'Pizza Palace',
//     slug: 'pizza-palace',
//     description: 'Authentic Italian pizza with fresh ingredients and traditional recipes',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
//     cuisine: ['Italian', 'Pizza'],
//     rating: 4.5,
//     deliveryTime: '30-40 min',
//     deliveryFee: 40,
//     minOrder: 200,
//     upiId: 'pizzapalace@upi'
//   },
//   {
//     name: 'Spice Garden',
//     slug: 'spice-garden',
//     description: 'Traditional Indian cuisine with aromatic spices and rich flavors',
//     image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db2?w=400&h=300&fit=crop',
//     coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
//     cuisine: ['Indian', 'North Indian', 'South Indian'],
//     rating: 4.3,
//     deliveryTime: '25-35 min',
//     deliveryFee: 30,
//     minOrder: 150,
//     upiId: 'spicegarden@upi'
//   },
//   {
//     name: 'Burger Barn',
//     slug: 'burger-barn',
//     description: 'Juicy burgers and American comfort food classics',
//     image: 'https://images.unsplash.com/photo-1568901346375-23c9450c583b?w=400&h=300&fit=crop',
//     coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
//     cuisine: ['American', 'Fast Food', 'Burgers'],
//     rating: 4.2,
//     deliveryTime: '20-30 min',
//     deliveryFee: 25,
//     minOrder: 100,
//     upiId: 'burgerbarn@upi'
//   },
//   {
//     name: 'Sushi Master',
//     slug: 'sushi-master',
//     description: 'Authentic Japanese sushi and fresh seafood delicacies',
//     image: 'https://images.unsplash.com/photo-1579584422533-7a5ae5febf36?w=400&h=300&fit=crop',
//     coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
//     cuisine: ['Japanese', 'Sushi', 'Seafood'],
//     rating: 4.7,
//     deliveryTime: '40-50 min',
//     deliveryFee: 50,
//     minOrder: 300,
//     upiId: 'sushimaster@upi'
//   }
// ];

// const sampleDishes = [
//   // Pizza Palace Dishes
//   {
//     name: 'Margherita Pizza',
//     slug: 'margherita-pizza',
//     description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     price: 299,
//     originalPrice: 349,
//     category: 'main-course',
//     subcategory: 'vegetarian',
//     dietary: ['vegetarian'],
//     spiceLevel: 'mild',
//     preparationTime: '15-20 min',
//     ingredients: ['Mozzarella', 'Tomatoes', 'Basil', 'Olive Oil'],
//     allergens: ['dairy'],
//     nutritionInfo: {
//       calories: 280,
//       protein: 12,
//       carbs: 35,
//       fat: 10,
//       fiber: 3
//     },
//     isAvailable: true,
//     isPopular: true,
//     isRecommended: true,
//     tags: ['bestseller', 'vegetarian'],
//     rating: 4.6,
//     reviewCount: 128
//   },
//   {
//     name: 'Pepperoni Pizza',
//     slug: 'pepperoni-pizza',
//     description: 'Classic pepperoni pizza with extra cheese and Italian herbs',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     price: 399,
//     category: 'main-course',
//     subcategory: 'non-vegetarian',
//     dietary: ['non-vegetarian'],
//     spiceLevel: 'medium',
//     preparationTime: '15-20 min',
//     ingredients: ['Pepperoni', 'Mozzarella', 'Tomatoes', 'Italian Herbs'],
//     allergens: ['dairy'],
//     nutritionInfo: {
//       calories: 320,
//       protein: 15,
//       carbs: 38,
//       fat: 14,
//       fiber: 2
//     },
//     isAvailable: true,
//     isPopular: true,
//     tags: ['bestseller', 'non-veg'],
//     rating: 4.7,
//     reviewCount: 95
//   },
//   {
//     name: 'Garlic Bread',
//     slug: 'garlic-bread',
//     description: 'Crispy garlic bread with melted mozzarella cheese',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     price: 149,
//     category: 'starters',
//     subcategory: 'vegetarian',
//     dietary: ['vegetarian'],
//     spiceLevel: 'mild',
//     preparationTime: '10-15 min',
//     ingredients: ['Bread', 'Garlic', 'Butter', 'Mozzarella', 'Herbs'],
//     allergens: ['dairy', 'gluten'],
//     nutritionInfo: {
//       calories: 180,
//       protein: 6,
//       carbs: 22,
//       fat: 8,
//       fiber: 1
//     },
//     isAvailable: true,
//     isPopular: true,
//     tags: ['popular'],
//     rating: 4.4,
//     reviewCount: 67
//   },
//   // Spice Garden Dishes
//   {
//     name: 'Butter Chicken',
//     slug: 'butter-chicken',
//     description: 'Tender chicken in rich, creamy tomato-based curry with butter',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     price: 349,
//     category: 'main-course',
//     subcategory: 'non-vegetarian',
//     dietary: ['non-vegetarian'],
//     spiceLevel: 'medium',
//     preparationTime: '20-25 min',
//     ingredients: ['Chicken', 'Butter', 'Tomatoes', 'Cream', 'Ginger', 'Garlic', 'Spices'],
//     allergens: ['dairy'],
//     nutritionInfo: {
//       calories: 380,
//       protein: 28,
//       carbs: 12,
//       fat: 24,
//       fiber: 2
//     },
//     isAvailable: true,
//     isPopular: true,
//     isRecommended: true,
//     tags: ['bestseller', 'chef-special'],
//     rating: 4.8,
//     reviewCount: 203
//   },
//   {
//     name: 'Paneer Tikka',
//     slug: 'paneer-tikka',
//     description: 'Grilled paneer cubes marinated in aromatic spices and yogurt',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     price: 279,
//     category: 'main-course',
//     subcategory: 'vegetarian',
//     dietary: ['vegetarian'],
//     spiceLevel: 'medium',
//     preparationTime: '15-20 min',
//     ingredients: ['Paneer', 'Yogurt', 'Ginger', 'Garlic', 'Spices', 'Lemon'],
//     allergens: ['dairy'],
//     nutritionInfo: {
//       calories: 290,
//       protein: 18,
//       carbs: 8,
//       fat: 20,
//       fiber: 3
//     },
//     isAvailable: true,
//     isPopular: true,
//     tags: ['popular', 'vegetarian'],
//     rating: 4.5,
//     reviewCount: 156
//   },
//   {
//     name: 'Samosa',
//     slug: 'samosa',
//     description: 'Crispy triangular pastry filled with spiced potatoes and peas',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     price: 89,
//     originalPrice: 99,
//     category: 'starters',
//     subcategory: 'vegetarian',
//     dietary: ['vegetarian'],
//     spiceLevel: 'medium',
//     preparationTime: '10-15 min',
//     ingredients: ['Potatoes', 'Peas', 'Flour', 'Spices', 'Oil'],
//     allergens: ['gluten'],
//     nutritionInfo: {
//       calories: 150,
//       protein: 3,
//       carbs: 18,
//       fat: 7,
//       fiber: 2
//     },
//     isAvailable: true,
//     isPopular: true,
//     tags: ['popular', 'snacks'],
//     rating: 4.3,
//     reviewCount: 89
//   },
//   // Burger Barn Dishes
//   {
//     name: 'Classic Cheeseburger',
//     slug: 'classic-cheeseburger',
//     description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
//     image: 'https://images.unsplash.com/photo-1568901346375-23c9450c583b?w=400&h=300&fit=crop',
//     price: 249,
//     category: 'main-course',
//     subcategory: 'non-vegetarian',
//     dietary: ['non-vegetarian'],
//     spiceLevel: 'mild',
//     preparationTime: '10-15 min',
//     ingredients: ['Beef Patty', 'Cheese', 'Lettuce', 'Tomato', 'Onion', 'Special Sauce'],
//     allergens: ['dairy', 'gluten'],
//     nutritionInfo: {
//       calories: 540,
//       protein: 25,
//       carbs: 42,
//       fat: 32,
//       fiber: 2
//     },
//     isAvailable: true,
//     isPopular: true,
//     isRecommended: true,
//     tags: ['bestseller', 'american'],
//     rating: 4.6,
//     reviewCount: 178
//   },
//   {
//     name: 'Crispy Fries',
//     slug: 'crispy-fries',
//     description: 'Golden crispy french fries with sea salt',
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
//     price: 129,
//     category: 'starters',
//     subcategory: 'vegetarian',
//     dietary: ['vegetarian'],
//     spiceLevel: 'mild',
//     preparationTime: '5-10 min',
//     ingredients: ['Potatoes', 'Sea Salt', 'Oil'],
//     allergens: [],
//     nutritionInfo: {
//       calories: 320,
//       protein: 4,
//       carbs: 42,
//       fat: 16,
//       fiber: 4
//     },
//     isAvailable: true,
//     isPopular: true,
//     tags: ['popular', 'snacks'],
//     rating: 4.4,
//     reviewCount: 234
//   },
//   // Sushi Master Dishes
//   {
//     name: 'Salmon Nigiri',
//     slug: 'salmon-nigiri',
//     description: 'Fresh salmon over seasoned sushi rice with wasabi',
//     image: 'https://images.unsplash.com/photo-1579584422533-7a5ae5febf36?w=400&h=300&fit=crop',
//     price: 449,
//     category: 'main-course',
//     subcategory: 'non-vegetarian',
//     dietary: ['non-vegetarian'],
//     spiceLevel: 'mild',
//     preparationTime: '15-20 min',
//     ingredients: ['Fresh Salmon', 'Sushi Rice', 'Wasabi', 'Soy Sauce'],
//     allergens: ['fish'],
//     nutritionInfo: {
//       calories: 200,
//       protein: 22,
//       carbs: 28,
//       fat: 6,
//       fiber: 1
//     },
//     isAvailable: true,
//     isPopular: true,
//     isRecommended: true,
//     tags: ['bestseller', 'japanese', 'fresh'],
//     rating: 4.9,
//     reviewCount: 145
//   },
//   {
//     name: 'California Roll',
//     slug: 'california-roll',
//     description: 'Crab, avocado, and cucumber rolled with sushi rice',
//     image: 'https://images.unsplash.com/photo-1579584422533-7a5ae5febf36?w=400&h=300&fit=crop',
//     price: 379,
//     category: 'main-course',
//     subcategory: 'non-vegetarian',
//     dietary: ['non-vegetarian'],
//     spiceLevel: 'mild',
//     preparationTime: '10-15 min',
//     ingredients: ['Crab', 'Avocado', 'Cucumber', 'Sushi Rice', 'Nori'],
//     allergens: ['fish'],
//     nutritionInfo: {
//       calories: 250,
//       protein: 8,
//       carbs: 38,
//       fat: 8,
//       fiber: 2
//     },
//     isAvailable: true,
//     isPopular: true,
//     tags: ['popular', 'japanese'],
//     rating: 4.5,
//     reviewCount: 112
//   },
//   {
//     name: 'Miso Soup',
//     slug: 'miso-soup',
//     description: 'Traditional Japanese soup with tofu, seaweed, and miso paste',
//     image: 'https://images.unsplash.com/photo-1579584422533-7a5ae5febf36?w=400&h=300&fit=crop',
//     price: 179,
//     category: 'starters',
//     subcategory: 'vegetarian',
//     dietary: ['vegetarian'],
//     spiceLevel: 'mild',
//     preparationTime: '5-10 min',
//     ingredients: ['Miso Paste', 'Tofu', 'Seaweed', 'Green Onions', 'Dashi'],
//     allergens: ['soy'],
//     nutritionInfo: {
//       calories: 80,
//       protein: 6,
//       carbs: 10,
//       fat: 3,
//       fiber: 1
//     },
//     isAvailable: true,
//     isPopular: true,
//     tags: ['popular', 'japanese', 'healthy'],
//     rating: 4.2,
//     reviewCount: 78
//   }
// ];

// const sampleUsers = [
//   {
//     name: 'John Doe',
//     email: 'john@example.com',
//     password: 'password123',
//     phone: '+1 234 567 8900',
//     role: 'user',
//     preferences: {
//       cuisine: ['Italian', 'Indian'],
//       dietary: ['non-vegetarian'],
//       notifications: {
//         email: true,
//         sms: true,
//         push: true
//       }
//     },
//     addresses: [
//       {
//         type: 'home',
//         street: '123 Main Street',
//         city: 'New York',
//         state: 'NY',
//         zipCode: '10001',
//         landmark: 'Near Central Park',
//         isDefault: true
//       }
//     ]
//   },
//   {
//     name: 'Restaurant Owner',
//     email: 'owner@restaurant.com',
//     password: 'password123',
//     phone: '+1 234 567 8901',
//     role: 'restaurant_owner',
//     preferences: {
//       cuisine: ['Italian'],
//       dietary: ['non-vegetarian'],
//       notifications: {
//         email: true,
//         sms: true,
//         push: true
//       }
//     }
//   }
// ];

// async function seedDatabase() {
//   try {
//     await connectDB();
//     console.log('Connected to MongoDB');

//     // Clear existing data
//     await Restaurant.deleteMany({});
//     await Dish.deleteMany({});
//     await User.deleteMany({});
//     await Order.deleteMany({});
//     console.log('Cleared existing data');

//     // Insert restaurants
//     const insertedRestaurants = await Restaurant.insertMany(sampleRestaurants);
//     console.log(`Inserted ${insertedRestaurants.length} restaurants`);

//     // Insert users
//     const insertedUsers = await User.insertMany(sampleUsers);
//     console.log(`Inserted ${insertedUsers.length} users`);

//     // Insert dishes for each restaurant
//     const allDishes = [];
//     insertedRestaurants.forEach((restaurant, index) => {
//       const restaurantDishes = sampleDishes.map((dish, dishIndex) => ({
//         ...dish,
//         restaurant: restaurant._id,
//         slug: `${dish.slug}-${index}`
//       }));
//       allDishes.push(...restaurantDishes);
//     });

//     const insertedDishes = await Dish.insertMany(allDishes);
//     console.log(`Inserted ${insertedDishes.length} dishes`);

//     console.log('Database seeded successfully!');
//     console.log('\nSample Login Credentials:');
//     console.log('User: john@example.com / password123');
//     console.log('Restaurant Owner: owner@restaurant.com / password123');
//     console.log('\nSample Restaurants:');
//     insertedRestaurants.forEach((restaurant) => {
//       console.log(`${restaurant.name} - /restaurant/${restaurant.slug}`);
//     });

//   } catch (error) {
//     console.error('Error seeding database:', error);
//   } finally {
//     process.exit(0);
//   }
// }

// seedDatabase();
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Ensure this points to your existing db connection file
import { Restaurant, Dish, User, Order } from '@/lib/models'; // Ensure your models are exported from here
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();
    
    // --- 1. DEFINE DATA ---
    const sampleRestaurants = [
      {
        name: 'Pizza Palace',
        slug: 'pizza-palace',
        description: 'Authentic Italian pizza with fresh ingredients and traditional recipes',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
        cuisine: ['Italian', 'Pizza'],
        rating: 4.5,
        deliveryTime: '30-40 min',
        deliveryFee: 40,
        minOrder: 200,
        upiId: 'pizzapalace@upi',
        isActive: true,
        address: { street: '123 Pizza Lane', city: 'Jaipur', zipCode: '302001' }
      },
      {
        name: 'Spice Garden',
        slug: 'spice-garden',
        description: 'Traditional Indian cuisine with aromatic spices and rich flavors',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db2?w=400&h=300&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
        cuisine: ['Indian', 'North Indian', 'South Indian'],
        rating: 4.3,
        deliveryTime: '25-35 min',
        deliveryFee: 30,
        minOrder: 150,
        upiId: 'spicegarden@upi',
        isActive: true,
        address: { street: '45 Spice Market', city: 'Jaipur', zipCode: '302002' }
      },
      {
        name: 'Burger Barn',
        slug: 'burger-barn',
        description: 'Juicy burgers and American comfort food classics',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c583b?w=400&h=300&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
        cuisine: ['American', 'Fast Food', 'Burgers'],
        rating: 4.2,
        deliveryTime: '20-30 min',
        deliveryFee: 25,
        minOrder: 100,
        upiId: 'burgerbarn@upi',
        isActive: true,
        address: { street: '88 Burger Ave', city: 'Jaipur', zipCode: '302003' }
      },
      {
        name: 'Sushi Master',
        slug: 'sushi-master',
        description: 'Authentic Japanese sushi and fresh seafood delicacies',
        image: 'https://images.unsplash.com/photo-1579584422533-7a5ae5febf36?w=400&h=300&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
        cuisine: ['Japanese', 'Sushi', 'Seafood'],
        rating: 4.7,
        deliveryTime: '40-50 min',
        deliveryFee: 50,
        minOrder: 300,
        upiId: 'sushimaster@upi',
        isActive: true,
        address: { street: '101 Sushi Way', city: 'Jaipur', zipCode: '302004' }
      }
    ];

    const sampleDishesData = [
      {
        name: 'Margherita Pizza',
        slug: 'margherita-pizza',
        description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
        price: 299,
        originalPrice: 349,
        category: 'main-course',
        subcategory: 'vegetarian',
        dietary: ['vegetarian'],
        spiceLevel: 'mild',
        preparationTime: '15-20 min',
        isAvailable: true,
        isPopular: true,
        isRecommended: true,
        rating: 4.6
      },
      {
        name: 'Pepperoni Pizza',
        slug: 'pepperoni-pizza',
        description: 'Classic pepperoni pizza with extra cheese and Italian herbs',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
        price: 399,
        category: 'main-course',
        subcategory: 'non-vegetarian',
        dietary: ['non-vegetarian'],
        spiceLevel: 'medium',
        preparationTime: '15-20 min',
        isAvailable: true,
        isPopular: true,
        rating: 4.7
      },
      {
        name: 'Butter Chicken',
        slug: 'butter-chicken',
        description: 'Tender chicken in rich, creamy tomato-based curry with butter',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500',
        price: 349,
        category: 'main-course',
        subcategory: 'non-vegetarian',
        dietary: ['non-vegetarian'],
        spiceLevel: 'medium',
        preparationTime: '20-25 min',
        isAvailable: true,
        isPopular: true,
        isRecommended: true,
        rating: 4.8
      },
      {
        name: 'Paneer Tikka',
        slug: 'paneer-tikka',
        description: 'Grilled paneer cubes marinated in aromatic spices and yogurt',
        image: 'https://images.unsplash.com/photo-1567188040754-b82d80a64b7b?w=500',
        price: 279,
        category: 'starters',
        subcategory: 'vegetarian',
        dietary: ['vegetarian'],
        spiceLevel: 'medium',
        preparationTime: '15-20 min',
        isAvailable: true,
        isPopular: true,
        rating: 4.5
      },
      {
        name: 'Classic Cheeseburger',
        slug: 'classic-cheeseburger',
        description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        price: 249,
        category: 'main-course',
        subcategory: 'non-vegetarian',
        dietary: ['non-vegetarian'],
        spiceLevel: 'mild',
        preparationTime: '10-15 min',
        isAvailable: true,
        isPopular: true,
        rating: 4.6
      },
      {
        name: 'California Roll',
        slug: 'california-roll',
        description: 'Crab, avocado, and cucumber rolled with sushi rice',
        image: 'https://images.unsplash.com/photo-1579584422533-7a5ae5febf36?w=400',
        price: 379,
        category: 'main-course',
        subcategory: 'non-vegetarian',
        dietary: ['non-vegetarian'],
        spiceLevel: 'mild',
        preparationTime: '10-15 min',
        isAvailable: true,
        isPopular: true,
        rating: 4.5
      }
    ];

    // --- 2. EXECUTE SEEDING ---
    
    // Clear existing data
    await Restaurant.deleteMany({});
    await Dish.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Hash Password for users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword, // Using hashed password
        phone: '9876543210',
        role: 'user',
        addresses: [{ type: 'home', street: '123 Main St', city: 'Jaipur', state: 'RJ', zipCode: '302001', isDefault: true }]
      },
      {
        name: 'Restaurant Owner',
        email: 'owner@restaurant.com',
        password: hashedPassword, // Using hashed password
        phone: '1122334455',
        role: 'restaurant_owner'
      }
    ];

    // Insert Users
    const insertedUsers = await User.insertMany(sampleUsers);

    // Insert Restaurants (Assign owner)
    const restaurantsWithOwners = sampleRestaurants.map(r => ({
        ...r,
        owner: insertedUsers[1]._id // Assign to the 'Restaurant Owner' user
    }));
    const insertedRestaurants = await Restaurant.insertMany(restaurantsWithOwners);

    // Insert Dishes (Assign to restaurants)
    const allDishes = [];
    
    // Logic: Distribute sample dishes among the restaurants created
    insertedRestaurants.forEach((restaurant, index) => {
        // Just picking a few dishes for each restaurant for demo purposes
        const dishesForThisRestaurant = sampleDishesData.map((dish, i) => ({
            ...dish,
            slug: `${dish.slug}-${index}-${i}`, // Ensure unique slug
            restaurant: restaurant._id
        }));
        allDishes.push(...dishesForThisRestaurant);
    });

    await Dish.insertMany(allDishes);

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully!',
      stats: {
        restaurants: insertedRestaurants.length,
        dishes: allDishes.length,
        users: insertedUsers.length
      },
      credentials: {
        user: "john@example.com / password123",
        owner: "owner@restaurant.com / password123"
      }
    });

  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}