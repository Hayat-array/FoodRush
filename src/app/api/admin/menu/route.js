// // // // // // // import connectDB from '@/lib/db';
// // // // // // // import { Dish, Restaurant } from '@/lib/models';

// // // // // // // export async function GET(request) {
// // // // // // //   try {
// // // // // // //     await connectDB();
    
// // // // // // //     const { searchParams } = new URL(request.url).searchParams;
// // // // // // //     const restaurantId = searchParams.get('restaurantId');
    
// // // // // // //     // Find restaurant
// // // // // // //     const restaurant = await Restaurant.findById(restaurantId);
    
// // // // // // //     if (!restaurant) {
// // // // // // //       return Response.json({
// // // // // // //         success: false,
// // // // // // //         error: 'Restaurant not found'
// // // // // // //       }, { status: 404 });
// // // // // // //     }

// // // // // // //     // Get dishes for this restaurant
// // // // // // //     const dishes = await Dish.find({ 
// // // // // // //       restaurant: restaurant._id,
// // // // // // //       isAvailable: true 
// // // // // // //     }).sort({ category: 1, isPopular: -1, rating: -1 });

// // // // // // //     // Get unique categories
// // // // // // //     const categories = [...new Set(dishes.map(dish => dish.category))];

// // // // // // //     return Response.json({
// // // // // // //       success: true,
// // // // // // //       data: {
// // // // // // //         dishes,
// // // // // // //         categories
// // // // // // //       }
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error fetching menu:', error);
// // // // // // //     return Response.json({
// // // // // // //       success: false,
// // // // // // //       error: 'Failed to fetch menu'
// // // // // // //     }, { status: 500 });
// // // // // // //   }
// // // // // // // }
// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { getServerSession } from 'next-auth';
// // // // // // import connectDB from '@/lib/db';
// // // // // // import { Dish, Restaurant, User } from '@/lib/models';

// // // // // // export async function GET(req) {
// // // // // //   try {
// // // // // //     await connectDB();
// // // // // //     const session = await getServerSession();

// // // // // //     if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

// // // // // //     // 1. Find the restaurant owned by this user
// // // // // //     // (Assuming the logged-in user is the owner)
// // // // // //     const restaurant = await Restaurant.findOne({ owner: session.user.id });

// // // // // //     // If user is a super-admin, maybe fetch all. For now, assume single restaurant owner.
// // // // // //     // If no restaurant found for this owner, return empty or error
// // // // // //     if (!restaurant) {
// // // // // //        // Fallback for testing: Just fetch all dishes if no specific owner link exists yet
// // // // // //        // In production, you strictly filter by restaurant._id
// // // // // //        const allDishes = await Dish.find({}).sort({ createdAt: -1 });
// // // // // //        return NextResponse.json({ success: true, data: allDishes });
// // // // // //     }

// // // // // //     const dishes = await Dish.find({ restaurant: restaurant._id }).sort({ createdAt: -1 });
// // // // // //     return NextResponse.json({ success: true, data: dishes });

// // // // // //   } catch (error) {
// // // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // export async function POST(req) {
// // // // // //   try {
// // // // // //     await connectDB();
// // // // // //     const session = await getServerSession();

// // // // // //     if (!session || !['admin', 'restaurant_owner'].includes(session.user.role)) {
// // // // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // // // //     }

// // // // // //     const body = await req.json();

// // // // // //     // 1. Find the restaurant to attach this dish to
// // // // // //     let restaurant = await Restaurant.findOne({ owner: session.user.id });
    
// // // // // //     // Fallback: If no restaurant is linked to this user yet, pick the first one (FOR DEMO ONLY)
// // // // // //     if (!restaurant) {
// // // // // //       restaurant = await Restaurant.findOne({}); 
// // // // // //     }

// // // // // //     // 2. Create the Dish
// // // // // //     const newDish = await Dish.create({
// // // // // //       ...body,
// // // // // //       restaurant: restaurant._id,
// // // // // //       slug: body.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now(), // Auto-generate slug
// // // // // //     });

// // // // // //     return NextResponse.json({ success: true, data: newDish });

// // // // // //   } catch (error) {
// // // // // //     console.error("Create Dish Error:", error);
// // // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from 'next/server';
// // // // // import { getServerSession } from 'next-auth';
// // // // // import connectDB from '@/lib/db';
// // // // // import { Dish, Restaurant } from '@/lib/models';

// // // // // export async function GET(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //     const session = await getServerSession();

// // // // //     if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

// // // // //     // 1. Find the restaurant owned by this user
// // // // //     const restaurant = await Restaurant.findOne({ owner: session.user.id });

// // // // //     if (!restaurant) {
// // // // //        return NextResponse.json({ success: true, data: [] }); // Return empty if no restaurant yet
// // // // //     }

// // // // //     // 2. Find dishes for this restaurant
// // // // //     const dishes = await Dish.find({ restaurant: restaurant._id }).sort({ createdAt: -1 });
// // // // //     return NextResponse.json({ success: true, data: dishes });

// // // // //   } catch (error) {
// // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // export async function POST(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //     const session = await getServerSession();

// // // // //     if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
// // // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // // //     }

// // // // //     const body = await req.json();

// // // // //     // Find Owner's Restaurant
// // // // //     const restaurant = await Restaurant.findOne({ owner: session.user.id });
// // // // //     if (!restaurant) {
// // // // //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// // // // //     }

// // // // //     // Create Dish linked to that restaurant
// // // // //     const newDish = await Dish.create({
// // // // //       ...body,
// // // // //       restaurant: restaurant._id,
// // // // //       slug: body.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
// // // // //     });

// // // // //     return NextResponse.json({ success: true, data: newDish });

// // // // //   } catch (error) {
// // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextResponse } from 'next/server';
// // // // import { getServerSession } from 'next-auth';
// // // // import connectDB from '@/lib/db';
// // // // import { Dish, Restaurant, User } from '@/lib/models'; // Import User to ensure we get the ID

// // // // // GET: Fetch menu for the logged-in owner
// // // // export async function GET(req) {
// // // //   try {
// // // //     await connectDB();
// // // //     const session = await getServerSession();

// // // //     if (!session?.user?.email) {
// // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     // 1. Find User by Email to get the correct _id
// // // //     const user = await User.findOne({ email: session.user.email });
// // // //     if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

// // // //     // 2. Find Restaurant owned by this user
// // // //     const restaurant = await Restaurant.findOne({ owner: user._id });

// // // //     // If no restaurant exists yet, return empty array (don't throw error)
// // // //     if (!restaurant) {
// // // //        return NextResponse.json({ success: true, data: [] }); 
// // // //     }

// // // //     // 3. Find dishes
// // // //     const dishes = await Dish.find({ restaurant: restaurant._id }).sort({ createdAt: -1 });
// // // //     return NextResponse.json({ success: true, data: dishes });

// // // //   } catch (error) {
// // // //     console.error("Menu GET Error:", error);
// // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // // POST: Add a new dish
// // // // export async function POST(req) {
// // // //   try {
// // // //     await connectDB();
// // // //     const session = await getServerSession();

// // // //     if (!session?.user?.email) {
// // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     const body = await req.json();

// // // //     // 1. Find User & Restaurant
// // // //     const user = await User.findOne({ email: session.user.email });
// // // //     const restaurant = await Restaurant.findOne({ owner: user._id });

// // // //     if (!restaurant) {
// // // //       return NextResponse.json({ 
// // // //         success: false, 
// // // //         error: "No restaurant found. Please create your restaurant profile in Settings first." 
// // // //       }, { status: 400 });
// // // //     }

// // // //     // 2. Create Dish
// // // //     const newDish = await Dish.create({
// // // //       ...body,
// // // //       restaurant: restaurant._id, // Link to restaurant
// // // //       price: parseFloat(body.price),
// // // //       dietary: Array.isArray(body.dietary) ? body.dietary : [body.dietary], // Ensure array
// // // //       slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
// // // //     });

// // // //     return NextResponse.json({ success: true, data: newDish });

// // // //   } catch (error) {
// // // //     console.error("Menu POST Error:", error);
// // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import { getServerSession } from 'next-auth';
// // // import connectDB from '@/lib/db';
// // // // ✅ Import correctly from the file we just fixed/created
// // // import { Dish, Restaurant, User } from '@/lib/models'; 

// // // export async function GET(req) {
// // //   try {
// // //     console.log("1. Connecting to DB...");
// // //     await connectDB();
    
// // //     console.log("2. Getting Session...");
// // //     const session = await getServerSession();

// // //     if (!session?.user?.email) {
// // //       console.log("❌ No session found");
// // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     console.log("3. Finding User:", session.user.email);
// // //     const user = await User.findOne({ email: session.user.email });
    
// // //     if (!user) {
// // //       console.log("❌ User not found in DB");
// // //       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
// // //     }

// // //     console.log("4. Finding Restaurant for User ID:", user._id);
// // //     const restaurant = await Restaurant.findOne({ owner: user._id });

// // //     if (!restaurant) {
// // //       console.log("⚠️ No restaurant found for this owner. Returning empty list.");
// // //       return NextResponse.json({ success: true, data: [] });
// // //     }

// // //     console.log("5. Fetching Dishes for Restaurant:", restaurant._id);
// // //     const dishes = await Dish.find({ restaurant: restaurant._id }).sort({ createdAt: -1 });

// // //     console.log(`✅ Success! Found ${dishes.length} dishes.`);
// // //     return NextResponse.json({ success: true, data: dishes });

// // //   } catch (error) {
// // //     console.error("🔥 CRITICAL API ERROR:", error); // Check your VS Code terminal for this
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // export async function POST(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();

// // //     if (!session?.user?.email) {
// // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const body = await req.json();
// // //     console.log("POST Body:", body);

// // //     const user = await User.findOne({ email: session.user.email });
// // //     const restaurant = await Restaurant.findOne({ owner: user._id });

// // //     if (!restaurant) {
// // //       return NextResponse.json({ success: false, error: "Restaurant not found. Create one first." }, { status: 404 });
// // //     }

// // //     // Create Dish
// // //     const newDish = await Dish.create({
// // //       ...body,
// // //       restaurant: restaurant._id,
// // //       price: parseFloat(body.price),
// // //       dietary: Array.isArray(body.dietary) ? body.dietary : [body.dietary],
// // //       slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
// // //     });

// // //     return NextResponse.json({ success: true, data: newDish });

// // //   } catch (error) {
// // //     console.error("🔥 POST ERROR:", error);
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { getServerSession } from 'next-auth';
// // import connectDB from '@/lib/db';
// // import { Dish, Restaurant, User } from '@/lib/models'; // Import User to resolve ID

// // export async function GET(req) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();

// //     if (!session?.user?.email) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     // 1. Find User to get ID
// //     const user = await User.findOne({ email: session.user.email });
    
// //     // 2. Find the restaurant owned by this user
// //     const restaurant = await Restaurant.findOne({ owner: user._id });

// //     if (!restaurant) {
// //        return NextResponse.json({ success: true, data: [] }); 
// //     }

// //     // 3. Find dishes
// //     const dishes = await Dish.find({ restaurant: restaurant._id }).sort({ createdAt: -1 });
// //     return NextResponse.json({ success: true, data: dishes });

// //   } catch (error) {
// //     console.error("Menu GET Error:", error);
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // export async function POST(req) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();

// //     if (!session?.user?.email) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     const body = await req.json();

// //     // 1. Get User ID from Email (Safe way)
// //     const user = await User.findOne({ email: session.user.email });
// //     if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

// //     // 2. Find Owner's Restaurant
// //     const restaurant = await Restaurant.findOne({ owner: user._id });
// //     if (!restaurant) {
// //       return NextResponse.json({ success: false, error: "Restaurant not found. Please create one in settings." }, { status: 404 });
// //     }

// //     // 3. Create Dish with Fallbacks for missing fields
// //     const newDish = await Dish.create({
// //       ...body,
// //       restaurant: restaurant._id,
// //       price: parseFloat(body.price),
// //       dietary: Array.isArray(body.dietary) ? body.dietary : [body.dietary],
      
// //       // 👇 IMPORTANT: Defaults if frontend doesn't send them
// //       subcategory: body.subcategory || "General",
// //       preparationTime: body.preparationTime || "20 min",
      
// //       slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
// //     });

// //     return NextResponse.json({ success: true, data: newDish });

// //   } catch (error) {
// //     console.error("🔥 POST ERROR:", error); // Check console if this fails
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import { Dish, Restaurant, User } from '@/lib/models'; 

// export async function GET(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession();

//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     // 1. Find User
//     const user = await User.findOne({ email: session.user.email });
    
//     // 2. Find Restaurant owned by this user
//     const restaurant = await Restaurant.findOne({ owner: user._id });

//     if (!restaurant) {
//        // If admin has no restaurant, return empty list (not error)
//        return NextResponse.json({ success: true, data: { dishes: [], restaurantSlug: null } }); 
//     }

//     // 3. Find dishes ONLY for this specific restaurant
//     const dishes = await Dish.find({ restaurant: restaurant._id }).sort({ createdAt: -1 });

//     // Return dishes AND the slug (needed for QR code)
//     return NextResponse.json({ 
//       success: true, 
//       data: { 
//         dishes, 
//         restaurantSlug: restaurant.slug,
//         restaurantName: restaurant.name 
//       } 
//     });

//   } catch (error) {
//     console.error("Menu GET Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession();

//     if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

//     const body = await req.json();
//     const user = await User.findOne({ email: session.user.email });
//     const restaurant = await Restaurant.findOne({ owner: user._id });

//     if (!restaurant) return NextResponse.json({ success: false, error: "No restaurant found." }, { status: 404 });

//     const newDish = await Dish.create({
//       ...body,
//       restaurant: restaurant._id, // LINK TO SPECIFIC RESTAURANT
//       price: parseFloat(body.price),
//       dietary: Array.isArray(body.dietary) ? body.dietary : [body.dietary],
//       subcategory: body.subcategory || "General",
//       preparationTime: body.preparationTime || "20 min",
//       slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
//     });

//     return NextResponse.json({ success: true, data: newDish });

//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Dish, Restaurant, User } from '@/lib/models'; 

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    // Get Restaurant ID from URL query
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get('restaurantId');

    if (!restaurantId) {
      return NextResponse.json({ success: false, error: "Restaurant ID is required" }, { status: 400 });
    }

    // Security Check: Verify this user actually owns this restaurant
    const user = await User.findOne({ email: session.user.email });
    const restaurant = await Restaurant.findOne({ _id: restaurantId, owner: user._id });

    if (!restaurant) {
       return NextResponse.json({ success: false, error: "Unauthorized access to this restaurant" }, { status: 403 }); 
    }

    // Find dishes for THIS specific restaurant
    const dishes = await Dish.find({ restaurant: restaurantId }).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      data: { 
        dishes, 
        restaurantSlug: restaurant.slug,
        restaurantName: restaurant.name 
      } 
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    // Ensure we are adding to the correct restaurant
    if (!body.restaurantId) {
        return NextResponse.json({ success: false, error: "Restaurant ID missing" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    // Verify ownership again before saving
    const restaurant = await Restaurant.findOne({ _id: body.restaurantId, owner: user._id });

    if (!restaurant) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

    const newDish = await Dish.create({
      ...body,
      restaurant: restaurant._id, // LINK TO SPECIFIC RESTAURANT
      price: parseFloat(body.price),
      dietary: Array.isArray(body.dietary) ? body.dietary : [body.dietary],
      subcategory: body.subcategory || "General",
      preparationTime: body.preparationTime || "20 min",
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
    });

    return NextResponse.json({ success: true, data: newDish });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}