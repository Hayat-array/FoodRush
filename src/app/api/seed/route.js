import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Restaurant, Dish, User, Order } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    // 1. CLEAR EXISTING DATA
    await Restaurant.deleteMany({});
    await Dish.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // 2. CREATE USERS
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.create([
      {
        name: 'John Customer',
        email: 'user@example.com',
        password: hashedPassword,
        phone: '9876543210',
        role: 'user',
        addresses: [{ type: 'home', street: '123 Main St', city: 'Jaipur', zipCode: '302001', isDefault: true }]
      },
      {
        name: 'Restaurant Owner',
        email: 'admin@example.com',
        password: hashedPassword,
        phone: '1122334455',
        role: 'restaurant_owner'
      }
    ]);

    const ownerId = users[1]._id;

    // 3. CREATE RESTAURANTS
    const restaurants = await Restaurant.create([
      {
        name: 'Pizza Paradise',
        slug: 'pizza-paradise',
        description: 'Authentic Italian pizzas fired in a wood oven.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
        coverImage: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1200',
        rating: 4.5,
        deliveryTime: '30-40 min',
        deliveryFee: 40,
        minOrder: 200,
        cuisine: ['Italian', 'Pizza'],
        address: { street: '123 Cheese Street', city: 'Jaipur' },
        owner: ownerId,
        upiId: 'pizza@upi',
        isActive: true
      },
      {
        name: 'Burger Hub',
        slug: 'burger-hub',
        description: 'Juicy burgers and crispy fries.',
        image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80',
        coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200',
        rating: 4.2,
        deliveryTime: '25-35 min',
        deliveryFee: 20,
        minOrder: 150,
        cuisine: ['American', 'Burger'],
        address: { street: '45 Bun Avenue', city: 'Jaipur' },
        owner: ownerId,
        upiId: 'burger@upi',
        isActive: true
      }
    ]);

    // 4. CREATE DISHES (With Required Fields)
    await Dish.create([
      // --- Pizza Paradise Menu ---
      {
        name: "Margherita Pizza",
        slug: "margherita-pizza",
        description: "Classic tomato and mozzarella",
        price: 299,
        originalPrice: 349,
        category: "main-course",
        subcategory: "Pizza", // REQUIRED FIELD ADDED
        preparationTime: "15 min", // REQUIRED FIELD ADDED
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
        restaurant: restaurants[0]._id,
        isAvailable: true,
        dietary: ["vegetarian"],
        isPopular: true
      },
      {
        name: "Pepperoni Feast",
        slug: "pepperoni-feast",
        description: "Spicy pepperoni loaded with extra cheese",
        price: 450,
        category: "main-course",
        subcategory: "Pizza", // REQUIRED FIELD ADDED
        preparationTime: "20 min", // REQUIRED FIELD ADDED
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
        restaurant: restaurants[0]._id,
        isAvailable: true,
        dietary: ["non-vegetarian"]
      },
      
      // --- Burger Hub Menu ---
      {
        name: "Classic Cheeseburger",
        slug: "classic-cheeseburger",
        description: "Beef patty with cheddar cheese and lettuce",
        price: 199,
        category: "main-course",
        subcategory: "Burger", // REQUIRED FIELD ADDED
        preparationTime: "10 min", // REQUIRED FIELD ADDED
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        restaurant: restaurants[1]._id,
        isAvailable: true,
        dietary: ["non-vegetarian"],
        isPopular: true
      },
      {
        name: "Veggie Supreme",
        slug: "veggie-supreme",
        description: "Crispy vegetable patty with mayo",
        price: 149,
        category: "main-course",
        subcategory: "Burger", // REQUIRED FIELD ADDED
        preparationTime: "12 min", // REQUIRED FIELD ADDED
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
        restaurant: restaurants[1]._id,
        isAvailable: true,
        dietary: ["vegetarian"]
      }
    ]);

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully!",
      credentials: {
        admin: "admin@example.com / password123",
        user: "user@example.com / password123"
      }
    });

  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}