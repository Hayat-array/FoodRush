import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Restaurant, Dish } from '@/lib/models'; // Ensure these are imported correctly

export async function GET() {
  try {
    await connectDB();

    // 1. Find an existing restaurant to add dishes to
    // You can replace findOne() with findOne({ name: "Your Restaurant Name" }) if you want a specific one
    const restaurant = await Restaurant.findOne();

    if (!restaurant) {
      return NextResponse.json({ 
        success: false, 
        message: "No restaurants found! Please create a restaurant first." 
      });
    }

    // 2. Define Dummy Dishes
    const dummyDishes = [
      {
        name: "Paneer Butter Masala",
        description: "Rich and creamy curry made with paneer, spices, onions, tomatoes, cashews and butter.",
        price: 280,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
        category: "Main Course",
        isVeg: true,
        restaurant: restaurant._id,
      },
      {
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with tender chicken pieces and authentic Indian spices.",
        price: 350,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
        category: "Main Course",
        isVeg: false,
        restaurant: restaurant._id,
      },
      {
        name: "Garlic Naan",
        description: "Leavened flatbread made from white flour and topped with garlic and butter.",
        price: 60,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1000&auto=format&fit=crop",
        category: "Breads",
        isVeg: true,
        restaurant: restaurant._id,
      },
      {
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato masala, served with chutney and sambar.",
        price: 180,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop",
        category: "Breakfast",
        isVeg: true,
        restaurant: restaurant._id,
      },
      {
        name: "Gulab Jamun",
        description: "Soft delicious berry sized balls made with milk solids, flour & a leavening agent.",
        price: 120,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
        category: "Dessert",
        isVeg: true,
        restaurant: restaurant._id,
      },
      {
        name: "Veg Hakka Noodles",
        description: "Indo-Chinese dish of stir fried noodles with fresh vegetables and sauces.",
        price: 220,
        image: "https://images.unsplash.com/photo-1610725663724-4bd3c62464bc?q=80&w=1000&auto=format&fit=crop",
        category: "Chinese",
        isVeg: true,
        restaurant: restaurant._id,
      },
      {
        name: "Tandoori Roti",
        description: "Whole wheat flatbread baked in a clay oven.",
        price: 40,
        image: "https://images.unsplash.com/photo-1647432924976-928af0905470?q=80&w=1000&auto=format&fit=crop",
        category: "Breads",
        isVeg: true,
        restaurant: restaurant._id,
      },
      {
        name: "Butter Chicken",
        description: "Chicken prepared in a buttery gravy with the addition of cream gives the curry sauce a silky smooth rich texture.",
        price: 380,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop",
        category: "Main Course",
        isVeg: false,
        restaurant: restaurant._id,
      },
    ];

    // 3. Insert dishes into the database
    const createdDishes = await Dish.insertMany(dummyDishes);

    // 4. (Optional) If your Restaurant model has a 'menu' or 'dishes' array, update it
    // const dishIds = createdDishes.map(d => d._id);
    // restaurant.dishes.push(...dishIds);
    // await restaurant.save();

    return NextResponse.json({
      success: true,
      message: `Added ${createdDishes.length} dishes to restaurant: ${restaurant.name}`,
      data: createdDishes
    });

  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}