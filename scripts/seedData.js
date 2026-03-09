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
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop",
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
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
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
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop",
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
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=400&fit=crop",
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
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=400&fit=crop",
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
    },
    {
        name: "Taco Fiesta",
        slug: "taco-fiesta",
        description: "Authentic Mexican tacos, burritos and nachos",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=400&fit=crop",
        cuisine: ["Mexican", "Tex-Mex", "Latin"],
        rating: 4.4,
        deliveryTime: "25-35 min",
        deliveryFee: 30,
        minOrder: 150,
        address: {
            street: "890 Whitefield",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560066",
            coordinates: { lat: 12.9698, lng: 77.7499 }
        },
        contact: {
            phone: "+91 9876543215",
            email: "hello@tacofiesta.com"
        },
        isActive: true,
        featured: true,
        tags: ["new", "trending"],
        upiId: "tacofiesta@upi"
    },
    {
        name: "Dragon Wok",
        slug: "dragon-wok",
        description: "Delicious Chinese cuisine with authentic flavors",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=400&fit=crop",
        cuisine: ["Chinese", "Asian", "Noodles"],
        rating: 4.5,
        deliveryTime: "30-40 min",
        deliveryFee: 35,
        minOrder: 160,
        address: {
            street: "234 Electronic City",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560100",
            coordinates: { lat: 12.8456, lng: 77.6603 }
        },
        contact: {
            phone: "+91 9876543216",
            email: "orders@dragonwok.com"
        },
        isActive: true,
        featured: false,
        tags: ["popular"],
        upiId: "dragonwok@upi"
    },
    {
        name: "Thai Basil",
        slug: "thai-basil",
        description: "Aromatic Thai curries and street food",
        image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&h=400&fit=crop",
        cuisine: ["Thai", "Asian", "Curry"],
        rating: 4.6,
        deliveryTime: "35-45 min",
        deliveryFee: 40,
        minOrder: 200,
        address: {
            street: "567 JP Nagar",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560078",
            coordinates: { lat: 12.9081, lng: 77.5858 }
        },
        contact: {
            phone: "+91 9876543217",
            email: "contact@thaibasil.com"
        },
        isActive: true,
        featured: true,
        tags: ["recommended", "trending"],
        upiId: "thaibasil@upi"
    },
    {
        name: "Mediterranean Grill",
        slug: "mediterranean-grill",
        description: "Fresh Mediterranean dishes and grilled delights",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop",
        cuisine: ["Mediterranean", "Greek", "Healthy"],
        rating: 4.5,
        deliveryTime: "30-40 min",
        deliveryFee: 35,
        minOrder: 180,
        address: {
            street: "432 Jayanagar",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560041",
            coordinates: { lat: 12.9250, lng: 77.5838 }
        },
        contact: {
            phone: "+91 9876543218",
            email: "hello@meditgrill.com"
        },
        isActive: true,
        featured: false,
        tags: ["healthy", "new"],
        upiId: "meditgrill@upi"
    },
    {
        name: "Seoul Kitchen",
        slug: "seoul-kitchen",
        description: "Korean BBQ, kimchi and authentic Korean dishes",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=400&fit=crop",
        cuisine: ["Korean", "BBQ", "Asian"],
        rating: 4.7,
        deliveryTime: "35-45 min",
        deliveryFee: 45,
        minOrder: 250,
        address: {
            street: "789 Marathahalli",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560037",
            coordinates: { lat: 12.9591, lng: 77.6974 }
        },
        contact: {
            phone: "+91 9876543219",
            email: "orders@seoulkitchen.com"
        },
        isActive: true,
        featured: true,
        tags: ["trending", "popular"],
        upiId: "seoulkitchen@upi"
    },
    {
        name: "Sweet Delights Cafe",
        slug: "sweet-delights-cafe",
        description: "Desserts, pastries, coffee and bakery items",
        image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=400&fit=crop",
        cuisine: ["Desserts", "Bakery", "Cafe"],
        rating: 4.8,
        deliveryTime: "20-30 min",
        deliveryFee: 25,
        minOrder: 100,
        address: {
            street: "123 Malleshwaram",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560003",
            coordinates: { lat: 13.0006, lng: 77.5707 }
        },
        contact: {
            phone: "+91 9876543220",
            email: "sweet@delightscafe.com"
        },
        isActive: true,
        featured: true,
        tags: ["desserts", "popular", "offers"],
        upiId: "sweetdelights@upi"
    },
    {
        name: "Pasta Villa",
        slug: "pasta-villa",
        description: "Italian pasta, risotto and authentic Italian cuisine",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&h=400&fit=crop",
        cuisine: ["Italian", "Pasta", "Continental"],
        rating: 4.4,
        deliveryTime: "25-35 min",
        deliveryFee: 30,
        minOrder: 170,
        address: {
            street: "345 Banashankari",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560070",
            coordinates: { lat: 12.9250, lng: 77.5482 }
        },
        contact: {
            phone: "+91 9876543221",
            email: "info@pastavilla.com"
        },
        isActive: true,
        featured: false,
        tags: ["recommended"],
        upiId: "pastavilla@upi"
    }
];

const dishesData = [
    // Spice Garden dishes
    {
        name: "Butter Chicken",
        slug: "butter-chicken",
        description: "Creamy tomato-based curry with tender chicken pieces",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1630431341973-02e1b1c45cca?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1540648639573-8e33fbb0fba0?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1589301773859-b68c8d69c0f3?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
        price: 280,
        category: "Starters",
        dietary: ["non-vegetarian"],
        spiceLevel: "medium",
        preparationTime: "20 min",
        ingredients: ["Chicken", "Yogurt", "Spices", "Lemon"],
        isRecommended: true,
        rating: 4.6
    },
    // Taco Fiesta dishes
    {
        name: "Classic Beef Tacos",
        slug: "classic-beef-tacos",
        description: "Three soft tacos with seasoned beef and fresh toppings",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
        price: 240,
        category: "Mexican",
        dietary: ["non-vegetarian"],
        preparationTime: "15 min",
        ingredients: ["Beef", "Tortillas", "Lettuce", "Cheese", "Salsa"],
        isPopular: true,
        rating: 4.5
    },
    {
        name: "Veggie Burrito Bowl",
        slug: "veggie-burrito-bowl",
        description: "Rice bowl with black beans, veggies and guacamole",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        price: 220,
        originalPrice: 260,
        category: "Mexican",
        dietary: ["vegetarian"],
        preparationTime: "12 min",
        ingredients: ["Rice", "Black Beans", "Corn", "Avocado", "Salsa"],
        isRecommended: true,
        rating: 4.4
    },
    {
        name: "Loaded Nachos",
        slug: "loaded-nachos",
        description: "Crispy nachos with cheese, jalapeños and sour cream",
        image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop",
        price: 180,
        category: "Appetizers",
        dietary: ["vegetarian"],
        preparationTime: "10 min",
        ingredients: ["Nachos", "Cheese", "Jalapeños", "Sour Cream"],
        isPopular: true,
        rating: 4.3
    },
    // Dragon Wok dishes
    {
        name: "Hakka Noodles",
        slug: "hakka-noodles",
        description: "Stir-fried noodles with vegetables and soy sauce",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
        price: 200,
        category: "Noodles",
        dietary: ["vegetarian"],
        spiceLevel: "medium",
        preparationTime: "15 min",
        ingredients: ["Noodles", "Vegetables", "Soy Sauce", "Garlic"],
        isPopular: true,
        rating: 4.4
    },
    {
        name: "Manchurian Chicken",
        slug: "manchurian-chicken",
        description: "Crispy chicken in tangy Indo-Chinese sauce",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
        price: 280,
        originalPrice: 320,
        category: "Main Course",
        dietary: ["non-vegetarian"],
        spiceLevel: "medium",
        preparationTime: "20 min",
        ingredients: ["Chicken", "Cornflour", "Soy Sauce", "Vinegar", "Garlic"],
        isRecommended: true,
        rating: 4.6
    },
    {
        name: "Fried Rice",
        slug: "fried-rice",
        description: "Wok-tossed rice with egg and vegetables",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        price: 180,
        category: "Rice",
        dietary: ["non-vegetarian"],
        preparationTime: "12 min",
        ingredients: ["Rice", "Egg", "Vegetables", "Soy Sauce"],
        rating: 4.3
    },
    // Thai Basil dishes
    {
        name: "Pad Thai",
        slug: "pad-thai",
        description: "Classic Thai stir-fried noodles with peanuts",
        image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop",
        price: 260,
        category: "Noodles",
        dietary: ["non-vegetarian"],
        spiceLevel: "mild",
        preparationTime: "18 min",
        ingredients: ["Rice Noodles", "Shrimp", "Peanuts", "Tamarind", "Lime"],
        isPopular: true,
        isRecommended: true,
        rating: 4.7
    },
    {
        name: "Green Curry",
        slug: "green-curry",
        description: "Aromatic coconut curry with vegetables",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
        price: 240,
        category: "Curry",
        dietary: ["vegetarian"],
        spiceLevel: "hot",
        preparationTime: "20 min",
        ingredients: ["Coconut Milk", "Green Curry Paste", "Vegetables", "Basil"],
        isRecommended: true,
        rating: 4.5
    },
    {
        name: "Tom Yum Soup",
        slug: "tom-yum-soup",
        description: "Hot and sour Thai soup with shrimp",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop",
        price: 200,
        category: "Soup",
        dietary: ["non-vegetarian"],
        spiceLevel: "hot",
        preparationTime: "15 min",
        ingredients: ["Shrimp", "Lemongrass", "Lime", "Mushrooms", "Chili"],
        rating: 4.4
    },
    // Mediterranean Grill dishes
    {
        name: "Chicken Shawarma",
        slug: "chicken-shawarma",
        description: "Grilled chicken wrap with garlic sauce",
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
        price: 220,
        category: "Wraps",
        dietary: ["non-vegetarian"],
        preparationTime: "15 min",
        ingredients: ["Chicken", "Pita", "Tahini", "Vegetables", "Garlic Sauce"],
        isPopular: true,
        rating: 4.6
    },
    {
        name: "Falafel Platter",
        slug: "falafel-platter",
        description: "Crispy chickpea fritters with hummus",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
        price: 240,
        originalPrice: 280,
        category: "Main Course",
        dietary: ["vegetarian", "vegan"],
        preparationTime: "18 min",
        ingredients: ["Chickpeas", "Herbs", "Hummus", "Tahini", "Pita"],
        isRecommended: true,
        rating: 4.5
    },
    {
        name: "Greek Salad",
        slug: "greek-salad",
        description: "Fresh salad with feta cheese and olives",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
        price: 180,
        category: "Salads",
        dietary: ["vegetarian"],
        preparationTime: "10 min",
        ingredients: ["Lettuce", "Feta", "Olives", "Cucumber", "Tomatoes"],
        rating: 4.3
    },
    // Seoul Kitchen dishes
    {
        name: "Korean BBQ Beef",
        slug: "korean-bbq-beef",
        description: "Marinated beef with Korean BBQ sauce",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
        price: 380,
        originalPrice: 420,
        category: "BBQ",
        dietary: ["non-vegetarian"],
        spiceLevel: "medium",
        preparationTime: "25 min",
        ingredients: ["Beef", "Soy Sauce", "Sesame", "Garlic", "Ginger"],
        isPopular: true,
        isRecommended: true,
        rating: 4.8
    },
    {
        name: "Bibimbap",
        slug: "bibimbap",
        description: "Mixed rice bowl with vegetables and egg",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
        price: 300,
        category: "Rice Bowl",
        dietary: ["non-vegetarian"],
        spiceLevel: "medium",
        preparationTime: "20 min",
        ingredients: ["Rice", "Vegetables", "Egg", "Gochujang", "Sesame Oil"],
        isRecommended: true,
        rating: 4.6
    },
    {
        name: "Kimchi Fried Rice",
        slug: "kimchi-fried-rice",
        description: "Spicy fried rice with kimchi",
        image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop",
        price: 250,
        category: "Rice",
        dietary: ["vegetarian"],
        spiceLevel: "hot",
        preparationTime: "15 min",
        ingredients: ["Rice", "Kimchi", "Vegetables", "Sesame", "Gochugaru"],
        isPopular: true,
        rating: 4.5
    },
    // Sweet Delights Cafe dishes
    {
        name: "Chocolate Lava Cake",
        slug: "chocolate-lava-cake",
        description: "Warm chocolate cake with molten center",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
        price: 180,
        category: "Desserts",
        dietary: ["vegetarian"],
        preparationTime: "12 min",
        ingredients: ["Chocolate", "Butter", "Eggs", "Sugar", "Flour"],
        isPopular: true,
        isRecommended: true,
        rating: 4.9
    },
    {
        name: "New York Cheesecake",
        slug: "new-york-cheesecake",
        description: "Creamy cheesecake with berry compote",
        image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop",
        price: 200,
        originalPrice: 240,
        category: "Desserts",
        dietary: ["vegetarian"],
        preparationTime: "10 min",
        ingredients: ["Cream Cheese", "Graham Crackers", "Berries", "Sugar"],
        isRecommended: true,
        rating: 4.8
    },
    {
        name: "Cappuccino",
        slug: "cappuccino",
        description: "Classic Italian coffee with steamed milk",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
        price: 120,
        category: "Beverages",
        dietary: ["vegetarian"],
        preparationTime: "5 min",
        ingredients: ["Espresso", "Steamed Milk", "Milk Foam"],
        isPopular: true,
        rating: 4.6
    },
    // Pasta Villa dishes
    {
        name: "Spaghetti Carbonara",
        slug: "spaghetti-carbonara",
        description: "Creamy pasta with bacon and parmesan",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
        price: 290,
        category: "Pasta",
        dietary: ["non-vegetarian"],
        preparationTime: "18 min",
        ingredients: ["Spaghetti", "Bacon", "Eggs", "Parmesan", "Black Pepper"],
        isPopular: true,
        rating: 4.7
    },
    {
        name: "Penne Arrabbiata",
        slug: "penne-arrabbiata",
        description: "Spicy tomato pasta with garlic",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
        price: 250,
        originalPrice: 290,
        category: "Pasta",
        dietary: ["vegetarian", "vegan"],
        spiceLevel: "hot",
        preparationTime: "15 min",
        ingredients: ["Penne", "Tomatoes", "Garlic", "Chili", "Olive Oil"],
        isRecommended: true,
        rating: 4.5
    },
    {
        name: "Mushroom Risotto",
        slug: "mushroom-risotto",
        description: "Creamy Italian rice with wild mushrooms",
        image: "https://images.unsplash.com/photo-1476124369491-c664426d8d9b?w=400&h=300&fit=crop",
        price: 320,
        category: "Rice",
        dietary: ["vegetarian"],
        preparationTime: "25 min",
        ingredients: ["Arborio Rice", "Mushrooms", "Parmesan", "White Wine", "Butter"],
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

        // Taco Fiesta dishes (15-17)
        dishesData.slice(15, 18).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[5]._id });
        });

        // Dragon Wok dishes (18-20)
        dishesData.slice(18, 21).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[6]._id });
        });

        // Thai Basil dishes (21-23)
        dishesData.slice(21, 24).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[7]._id });
        });

        // Mediterranean Grill dishes (24-26)
        dishesData.slice(24, 27).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[8]._id });
        });

        // Seoul Kitchen dishes (27-29)
        dishesData.slice(27, 30).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[9]._id });
        });

        // Sweet Delights Cafe dishes (30-32)
        dishesData.slice(30, 33).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[10]._id });
        });

        // Pasta Villa dishes (33-35)
        dishesData.slice(33, 36).forEach(dish => {
            dishesWithRestaurants.push({ ...dish, restaurant: restaurants[11]._id });
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
