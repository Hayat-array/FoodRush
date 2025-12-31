// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import { Dish, Restaurant } from '@/lib/models';

// // GET: Fetch all dishes for public users (no auth required)
// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const restaurantId = searchParams.get('restaurantId');
//     const category = searchParams.get('category');
//     const dietary = searchParams.get('dietary');
//     const search = searchParams.get('search');

//     // Build query object
//     let query = { isAvailable: true }; // Only show available dishes

//     // Filter by specific restaurant (optional)
//     if (restaurantId) {
//       query.restaurant = restaurantId;
//     }

//     // Filter by category
//     if (category && category !== 'all') {
//       query.category = category;
//     }

//     // Filter by dietary preference
//     if (dietary && dietary !== 'all') {
//       query.dietary = dietary;
//     }

//     // Search by name or description
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } }
//       ];
//     }

//     // Fetch dishes with restaurant details populated
//     const dishes = await Dish.find(query)
//       .populate('restaurant', 'name slug address image rating')
//       .sort({ isPopular: -1, createdAt: -1 })
//       .lean();

//     // Transform data to include restaurant info in a clean format
//     const transformedDishes = dishes.map(dish => ({
//       _id: dish._id,
//       name: dish.name,
//       description: dish.description,
//       price: dish.price,
//       image: dish.image,
//       category: dish.category,
//       subcategory: dish.subcategory,
//       dietary: dish.dietary,
//       isPopular: dish.isPopular,
//       isAvailable: dish.isAvailable,
//       preparationTime: dish.preparationTime,
//       rating: dish.rating,
//       restaurant: {
//         _id: dish.restaurant?._id,
//         name: dish.restaurant?.name,
//         slug: dish.restaurant?.slug,
//         address: dish.restaurant?.address,
//         image: dish.restaurant?.image,
//         rating: dish.restaurant?.rating
//       }
//     }));

//     return NextResponse.json({ 
//       success: true, 
//       data: transformedDishes,
//       count: transformedDishes.length
//     });

//   } catch (error) {
//     console.error('Menu fetch error:', error);
//     return NextResponse.json({ 
//       success: false, 
//       error: 'Failed to fetch menu' 
//     }, { status: 500 });
//   }
// }

// // GET single dish details (for dish detail page)
// export async function getById(dishId) {
//   try {
//     await connectDB();

//     const dish = await Dish.findById(dishId)
//       .populate('restaurant', 'name slug address phone email image rating deliveryTime')
//       .lean();

//     if (!dish) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Dish not found' 
//       }, { status: 404 });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       data: dish 
//     });

//   } catch (error) {
//     return NextResponse.json({ 
//       success: false, 
//       error: error.message 
//     }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Dish, Restaurant } from '@/lib/models'; // Ensure models are correctly exported from index.js
import mongoose from 'mongoose';

// GET: Fetch multiple dishes based on filters
export async function GET(req) {
        try {
                await connectDB();

                const { searchParams } = new URL(req.url);
                const restaurantId = searchParams.get('restaurantId');
                const category = searchParams.get('category');
                const dietary = searchParams.get('dietary');
                const search = searchParams.get('search');

                // 1. Build the base query
                let query = { isAvailable: true };

                // 🔑 CRITICAL FIX: Ensure restaurantId is a valid ObjectId and cast it
                if (restaurantId) {
                        if (mongoose.Types.ObjectId.isValid(restaurantId)) {
                                // Cast the string ID from the URL parameter to the Mongoose ObjectId type
                                query.restaurant = new mongoose.Types.ObjectId(restaurantId);
                        } else {
                                console.warn(`[API/Menu] Invalid Restaurant ID format received: ${restaurantId}.`);
                                // If the ID is invalid, return an empty set rather than crashing the server
                                return NextResponse.json({ success: true, data: [], count: 0 }, { status: 200 });
                        }
                }

                // Filter by Category
                if (category && category !== 'all') {
                        query.category = category;
                }

                // FIX: Use $in operator for Array Filtering (Dietary)
                if (dietary && dietary !== 'all') {
                        query.dietary = { $in: [dietary] };
                }

                // Search by text
                if (search) {
                        const searchRegex = { $regex: search, $options: 'i' };
                        query.$or = [
                                { name: searchRegex },
                                { description: searchRegex },
                        ];
                }

                // 2. Fetch dishes
                const dishes = await Dish.find(query)
                        .populate('restaurant', 'name slug address rating')
                        .select('+ratings') // Include ratings array with comments
                        .sort({ isPopular: -1, createdAt: -1 })
                        .lean();

                // 3. Return data
                return NextResponse.json({
                        success: true,
                        data: dishes,
                        count: dishes.length
                }, { status: 200 });

        } catch (error) {
                console.error('Menu fetch error (FATAL):', error);
                return NextResponse.json({
                        success: false,
                        error: 'Internal Server Error fetching menu list.'
                }, { status: 500 });
        }
}