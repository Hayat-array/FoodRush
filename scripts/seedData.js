const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Import models
const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    coverImage: { type: String, required: false },
    cuisine: { type: [String], required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    deliveryTime: { type: String, required: true },
    deliveryFee: { type: Number, default: 0 },
    minOrder: { type: Number, default: 0 },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: String,
        zipCode: String,
        coordinates: { lat: Number, lng: Number }
    },
    contact: { phone: String, email: String, website: String },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    tags: [String],
    upiId: String,
}, { timestamps: true });

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, default: "General" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    dietary: [{ type: String, trim: true }],
    spiceLevel: { type: String, default: 'medium' },
    preparationTime: { type: String, default: "20 min" },
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
}, { timestamps: true });

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);
const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema);

// Dummy data
const restaurantsData = [
    {
        name: "Spice Garden",
        slug: "spice-garden",
        description: "Authentic Indian cuisine with a modern twist",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
        coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        cuisine: ["Indian", "North Indian", "South Indian"],
        rating: 4.5,
        deliveryTime: "30-40 min",
        deliveryFee: 40,
        minOrder: 150,
        address: {
            street: "123 MG Road",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560001",
            coordinates: { lat: 12.9716, lng: 77.5946 }
        },
        contact: {
            phone: "+91 9876543210",
            email: "contact@spicegarden.com"
        },
        isActive: true,
        featured: true,
        tags: ["popular", "trending"],
        upiId: "spicegarden@upi"
    },
    {
        name: "Pizza Paradise",
        slug: "pizza-paradise",
        description: "Wood-fired pizzas and Italian delights",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
        coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        cuisine: ["Italian", "Pizza", "Continental"],
        rating: 4.3,
        deliveryTime: "25-35 min",
        deliveryFee: 30,
        minOrder: 200,
        address: {
            street: "456 Brigade Road",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560025",
            coordinates: { lat: 12.9698, lng: 77.6055 }
        },
        contact: {
            phone: "+91 9876543211",
            email: "hello@pizzaparadise.com"
        },
        isActive: true,
        featured: true,
        tags: ["new", "recommended"],
        upiId: "pizzaparadise@upi"
    },
    {
        name: "Burger Bliss",
        slug: "burger-bliss",
        description: "Gourmet burgers and loaded fries",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
        coverImage: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
        cuisine: ["American", "Fast Food", "Burgers"],
        rating: 4.2,
        deliveryTime: "20-30 min",
        deliveryFee: 25,
        minOrder: 100,
        address: {
            street: "789 Indiranagar",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560038",
            coordinates: { lat: 12.9784, lng: 77.6408 }
        },
        contact: {
            phone: "+91 9876543212",
            email: "info@burgerbliss.com"
        },
        isActive: true,
        featured: false,
        tags: ["popular"],
        upiId: "burgerbliss@upi"
    },
    {
        name: "Sushi Station",
        slug: "sushi-station",
        description: "Fresh sushi and Japanese cuisine",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
        coverImage: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
        cuisine: ["Japanese", "Sushi", "Asian"],
        rating: 4.6,
        deliveryTime: "35-45 min",
        deliveryFee: 50,
        minOrder: 300,
        address: {
            street: "321 Koramangala",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560034",
            coordinates: { lat: 12.9352, lng: 77.6245 }
        },
        contact: {
            phone: "+91 9876543213",
            email: "contact@sushistation.com"
        },
        isActive: true,
        featured: true,
        tags: ["trending", "recommended"],
        upiId: "sushistation@upi"
    },
    {
        name: "Biryani House",
        slug: "biryani-house",
        description: "Authentic Hyderabadi biryani and kebabs",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
        coverImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
        cuisine: ["Indian", "Biryani", "Mughlai"],
        rating: 4.7,
        deliveryTime: "40-50 min",
        deliveryFee: 35,
        minOrder: 180,
        address: {
            street: "654 HSR Layout",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560102",
            coordinates: { lat: 12.9121, lng: 77.6446 }
        },
        contact: {
            phone: "+91 9876543214",
            email: "orders@biryanihouse.com"
        },
        isActive: true,
        featured: true,
        tags: ["popular", "offers"],
        upiId: "biryanihouse@upi"
    }
];

const dishesData = [
    // Spice Garden dishes
    {
        name: "Butter Chicken",
        slug: "butter-chicken",
        description: "Creamy tomato-based curry with tender chicken pieces",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
        price: 320,
        originalPrice: 380,
        category: "Main Course",
        dietary: ["non-vegetarian"],
        spiceLevel: "medium",
        preparationTime: "25 min",
        ingredients: ["Chicken", "Tomato", "Cream", "Butter", "Spices"],
        isPopular: true,
        isRecommended: true,
        rating: 4.6
    },
    {
        name: "Paneer Tikka Masala",
        slug: "paneer-tikka-masala",
        description: "Grilled cottage cheese in rich spiced gravy",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
        price: 280,
        category: "Main Course",
        dietary: ["vegetarian"],
        spiceLevel: "medium",
        preparationTime: "20 min",
        ingredients: ["Paneer", "Onion", "Tomato", "Cream", "Spices"],
        isPopular: true,
        rating: 4.4
    },
    {
        name: "Masala Dosa",
        slug: "masala-dosa",
        description: "Crispy rice crepe filled with spiced potato",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400",
        price: 120,
        category: "South Indian",
        dietary: ["vegetarian", "vegan"],
        spiceLevel: "mild",
        preparationTime: "15 min",
        ingredients: ["Rice", "Lentils", "Potato", "Spices"],
        isPopular: true,
        rating: 4.5
    },
    // Pizza Paradise dishes
    {
        name: "Margherita Pizza",
        slug: "margherita-pizza",
        description: "Classic pizza with fresh mozzarella and basil",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        price: 350,
        category: "Pizza",
        dietary: ["vegetarian"],
        preparationTime: "20 min",
        ingredients: ["Dough", "Mozzarella", "Tomato Sauce", "Basil"],
        isPopular: true,
        isRecommended: true,
        rating: 4.5
    },
    {
        name: "Pepperoni Pizza",
        slug: "pepperoni-pizza",
        description: "Loaded with pepperoni and extra cheese",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        price: 420,
        originalPrice: 480,
        category: "Pizza",
        dietary: ["non-vegetarian"],
        preparationTime: "22 min",
        ingredients: ["Dough", "Pepperoni", "Mozzarella", "Tomato Sauce"],
        isPopular: true,
        rating: 4.6
    },
    {
        name: "Pasta Alfredo",
        slug: "pasta-alfredo",
        description: "Creamy fettuccine pasta with parmesan",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
        price: 280,
        category: "Pasta",
        dietary: ["vegetarian"],
        preparationTime: "18 min",
        ingredients: ["Pasta", "Cream", "Parmesan", "Garlic"],
        rating: 4.3
    },
    // Burger Bliss dishes
    {
        name: "Classic Beef Burger",
        slug: "classic-beef-burger",
        description: "Juicy beef patty with lettuce, tomato, and special sauce",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        price: 220,
        category: "Burgers",
        dietary: ["non-vegetarian"],
        preparationTime: "15 min",
        ingredients: ["Beef Patty", "Bun", "Lettuce", "Tomato", "Cheese"],
        isPopular: true,
        rating: 4.4
    },
    {
        name: "Veggie Burger",
        slug: "veggie-burger",
        description: "Plant-based patty with fresh vegetables",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400",
        price: 180,
        category: "Burgers",
        dietary: ["vegetarian"],
        preparationTime: "12 min",
        ingredients: ["Veggie Patty", "Bun", "Lettuce", "Tomato", "Onion"],
        isRecommended: true,
        rating: 4.2
    },
    {
        name: "Loaded Fries",
        slug: "loaded-fries",
        description: "Crispy fries topped with cheese and bacon",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
        price: 150,
        category: "Sides",
        dietary: ["non-vegetarian"],
        preparationTime: "10 min",
        ingredients: ["Fries", "Cheese", "Bacon", "Sour Cream"],
        isPopular: true,
        rating: 4.3
    },
    // Sushi Station dishes
    {
        name: "California Roll",
        slug: "california-roll",
        description: "Crab, avocado, and cucumber wrapped in rice",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
        price: 380,
        category: "Sushi",
        dietary: ["non-vegetarian"],
        preparationTime: "15 min",
        ingredients: ["Rice", "Crab", "Avocado", "Cucumber", "Nori"],
        isPopular: true,
        rating: 4.5
    },
    {
        name: "Salmon Nigiri",
        slug: "salmon-nigiri",
        description: "Fresh salmon over pressed rice",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400",
        price: 420,
        category: "Sushi",
        dietary: ["non-vegetarian"],
        preparationTime: "12 min",
        ingredients: ["Rice", "Salmon", "Wasabi"],
        isRecommended: true,
        rating: 4.7
    },
    {
        name: "Vegetable Tempura",
        slug: "vegetable-tempura",
        description: "Crispy battered vegetables",
        image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400",
        price: 250,
        category: "Appetizers",
        dietary: ["vegetarian"],
        preparationTime: "10 min",
        ingredients: ["Mixed Vegetables", "Tempura Batter", "Soy Sauce"],
        rating: 4.3
    },
    // Biryani House dishes
    {
        name: "Hyderabadi Chicken Biryani",
        slug: "hyderabadi-chicken-biryani",
        description: "Aromatic basmati rice with tender chicken",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
        price: 320,
        originalPrice: 360,
        category: "Biryani",
        dietary: ["non-vegetarian"],
        spiceLevel: "hot",
        preparationTime: "35 min",
        ingredients: ["Chicken", "Basmati Rice", "Spices", "Yogurt", "Saffron"],
        isPopular: true,
        isRecommended: true,
        rating: 4.8
    },
    {
        name: "Veg Biryani",
        slug: "veg-biryani",
        description: "Fragrant rice with mixed vegetables and spices",
        image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400",
        price: 250,
        category: "Biryani",
        dietary: ["vegetarian"],
        spiceLevel: "medium",
        preparationTime: "30 min",
        ingredients: ["Mixed Vegetables", "Basmati Rice", "Spices", "Yogurt"],
        isPopular: true,
        rating: 4.5
    },
    {
        name: "Chicken Kebab",
        slug: "chicken-kebab",
        description: "Grilled chicken marinated in spices",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
        price: 280,
        category: "Starters",
        dietary: ["non-vegetarian"],
        spiceLevel: "medium",
        preparationTime: "20 min",
        ingredients: ["Chicken", "Yogurt", "Spices", "Lemon"],
        isRecommended: true,
        rating: 4.6
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error('MONGO_URI not found in environment variables');
        }

        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing restaurants and dishes...');
        await Restaurant.deleteMany({});
        await Dish.deleteMany({});
        console.log('✅ Cleared existing data');

        // Insert restaurants
        console.log('🏪 Inserting restaurants...');
        const restaurants = await Restaurant.insertMany(restaurantsData);
        console.log(`✅ Inserted ${restaurants.length} restaurants`);

        // Insert dishes with restaurant references
        console.log('🍽️  Inserting dishes...');
        const dishesWithRestaurants = [];

        // Spice Garden dishes (0-2)
        dishesData.slice(0, 3).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[0]._id });
        });

        // Pizza Paradise dishes (3-5)
        dishesData.slice(3, 6).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[1]._id });
        });

        // Burger Bliss dishes (6-8)
        dishesData.slice(6, 9).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[2]._id });
        });

        // Sushi Station dishes (9-11)
        dishesData.slice(9, 12).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[3]._id });
        });

        // Biryani House dishes (12-14)
        dishesData.slice(12, 15).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[4]._id });
        });

        const dishes = await Dish.insertMany(dishesWithRestaurants);
        console.log(`✅ Inserted ${dishes.length} dishes`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Restaurants: ${restaurants.length}`);
        console.log(`   - Dishes: ${dishes.length}`);
        console.log('\n🏪 Restaurants added:');
        restaurants.forEach((r, i) => {
            console.log(`   ${i + 1}. ${r.name} (${r.cuisine.join(', ')})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
