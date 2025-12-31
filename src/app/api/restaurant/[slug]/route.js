// // // // // // // import connectDB from '@/lib/mongodb';
// // // // // // // import { Restaurant, Dish } from '@/lib/models';

// // // // // // // export async function GET(request, { params }) {
// // // // // // //   try {
// // // // // // //     await connectDB();
    
// // // // // // //     const { slug } = params;
    
// // // // // // //     const restaurant = await Restaurant.findOne({ 
// // // // // // //       slug, 
// // // // // // //       isActive: true 
// // // // // // //     }).lean();

// // // // // // //     if (!restaurant) {
// // // // // // //       return Response.json({
// // // // // // //         success: false,
// // // // // // //         error: 'Restaurant not found'
// // // // // // //       }, { status: 404 });
// // // // // // //     }

// // // // // // //     return Response.json({
// // // // // // //       success: true,
// // // // // // //       data: restaurant
// // // // // // //     });

// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error fetching restaurant:', error);
// // // // // // //     return Response.json({
// // // // // // //       success: false,
// // // // // // //       error: 'Failed to fetch restaurant'
// // // // // // //     }, { status: 500 });
// // // // // // //   }
// // // // // // // }
// // // // // // import { NextResponse } from 'next/server';
// // // // // // import connectDB from '@/lib/db';
// // // // // // import { Restaurant, Dish } from '@/lib/models';

// // // // // // export async function GET(req, { params }) {
// // // // // //   try {
// // // // // //     await connectDB();

// // // // // //     // 1. Await params (Required in Next.js 15)
// // // // // //     const { slug } = await params;

// // // // // //     if (!slug) {
// // // // // //       return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
// // // // // //     }

// // // // // //     // 2. Find the restaurant by slug
// // // // // //     const restaurant = await Restaurant.findOne({ slug, isActive: true });

// // // // // //     if (!restaurant) {
// // // // // //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// // // // // //     }

// // // // // //     // 3. Find all dishes linked to this restaurant's ID
// // // // // //     // We filter for only 'isAvailable' dishes for the user view
// // // // // //     const dishes = await Dish.find({ restaurant: restaurant._id, isAvailable: true });

// // // // // //     // 4. Combine restaurant info with its menu
// // // // // //     const restaurantData = {
// // // // // //       ...restaurant.toObject(),
// // // // // //       menu: dishes
// // // // // //     };

// // // // // //     return NextResponse.json({ success: true, data: restaurantData });

// // // // // //   } catch (error) {
// // // // // //     console.error("API Error:", error);
// // // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from 'next/server';
// // // // // import connectDB from '@/lib/db';
// // // // // import { Restaurant, Dish } from '@/lib/models';

// // // // // export async function GET(req, { params }) {
// // // // //   try {
// // // // //     await connectDB();

// // // // //     // 1. Await params (Required in Next.js 15+)
// // // // //     const { slug } = await params;

// // // // //     if (!slug) {
// // // // //       return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
// // // // //     }

// // // // //     // 2. Find the restaurant
// // // // //     const restaurant = await Restaurant.findOne({ slug, isActive: true });

// // // // //     if (!restaurant) {
// // // // //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// // // // //     }

// // // // //     // 3. Find dishes for this restaurant
// // // // //     const dishes = await Dish.find({ restaurant: restaurant._id, isAvailable: true });

// // // // //     // 4. Combine data
// // // // //     const restaurantData = {
// // // // //       ...restaurant.toObject(),
// // // // //       menu: dishes
// // // // //     };

// // // // //     return NextResponse.json({ success: true, data: restaurantData });

// // // // //   } catch (error) {
// // // // //     console.error("API Error:", error);
// // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextResponse } from 'next/server';
// // // // import connectDB from '@/lib/db';
// // // // import { Restaurant, Dish } from '@/lib/models';

// // // // export async function GET(req, { params }) {
// // // //   try {
// // // //     await connectDB();

// // // //     // 1. Await params (Mandatory in Next.js 15)
// // // //     const { slug } = await params;

// // // //     if (!slug) {
// // // //       return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
// // // //     }

// // // //     // 2. Find restaurant
// // // //     const restaurant = await Restaurant.findOne({ slug, isActive: true });

// // // //     if (!restaurant) {
// // // //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// // // //     }

// // // //     // 3. Find menu items
// // // //     const dishes = await Dish.find({ restaurant: restaurant._id, isAvailable: true });

// // // //     // 4. Return combined data
// // // //     return NextResponse.json({ 
// // // //       success: true, 
// // // //       data: { ...restaurant.toObject(), menu: dishes } 
// // // //     });

// // // //   } catch (error) {
// // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import { getServerSession } from 'next-auth';
// // // import connectDB from '@/lib/db';
// // // import { Restaurant } from '@/lib/models';

// // // // GET: Fetch the logged-in admin's restaurant details
// // // export async function GET(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();

// // //     // Security Check
// // //     if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
// // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     // Find the restaurant where 'owner' matches the logged-in User ID
// // //     const restaurant = await Restaurant.findOne({ owner: session.user.id });

// // //     if (!restaurant) {
// // //       return NextResponse.json({ success: false, error: "No restaurant found for this owner" }, { status: 404 });
// // //     }

// // //     return NextResponse.json({ success: true, data: restaurant });

// // //   } catch (error) {
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // // PUT: Update restaurant settings
// // // export async function PUT(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();

// // //     if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
// // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const body = await req.json();

// // //     const updatedRestaurant = await Restaurant.findOneAndUpdate(
// // //       { owner: session.user.id },
// // //       { $set: body },
// // //       { new: true, runValidators: true }
// // //     );

// // //     return NextResponse.json({ success: true, data: updatedRestaurant });

// // //   } catch (error) {
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import connectDB from '@/lib/db';
// // import { Restaurant, Dish } from '@/lib/models';

// // export async function GET(req, { params }) {
// //   try {
// //     await connectDB();
    
// //     const { slug } = params;

// //     // 1. Find the restaurant by slug
// //     const restaurant = await Restaurant.findOne({ slug, isActive: true })
// //       .select('-owner -__v'); // Exclude sensitive data

// //     if (!restaurant) {
// //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// //     }

// //     // 2. Fetch dishes associated with this restaurant
// //     // Assuming your Dish model has a 'restaurant' field referencing the restaurant._id
// //     const dishes = await Dish.find({ restaurant: restaurant._id, isAvailable: true });

// //     // 3. Combine them (optional, or you can fetch dishes in a separate call)
// //     const data = {
// //       ...restaurant.toObject(),
// //       dishes: dishes || []
// //     };

// //     return NextResponse.json({ success: true, data });

// //   } catch (error) {
// //     console.error("Fetch Single Restaurant Error:", error);
// //     return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
// //   }
// // }
// // app/api/restaurants/[slug]/route.js
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import { Restaurant, Dish } from "@/lib/models";

// export async function GET(request, { params }) {
//   try {
//     // LOG: show incoming params to help debug 404 / wrong slug issues
//     console.log("[API] GET /api/restaurants/[slug] called. params:", params);

//     // Basic validation
//     const slug = params?.slug;
//     if (!slug || typeof slug !== "string") {
//       console.warn("[API] Missing or invalid slug:", slug);
//       return NextResponse.json(
//         { success: false, error: "Missing or invalid slug" },
//         { status: 400 }
//       );
//     }

//     // Connect DB (wrap in try/catch to surface DB errors)
//     try {
//       await connectDB();
//     } catch (dbErr) {
//       console.error("[API] DB connection failed:", dbErr);
//       return NextResponse.json(
//         { success: false, error: "Database connection failed" },
//         { status: 500 }
//       );
//     }

//     // Find restaurant (only active ones)
//     const restaurant = await Restaurant.findOne({ slug, isActive: true }).select(
//       "-owner -__v"
//     );

//     if (!restaurant) {
//       console.info(`[API] Restaurant not found for slug="${slug}"`);
//       return NextResponse.json(
//         { success: false, error: "Restaurant not found" },
//         { status: 404 }
//       );
//     }

//     // Find dishes for this restaurant
//     const dishes = await Dish.find({
//       restaurant: restaurant._id,
//       isAvailable: true
//     }).select("-__v");

//     // Compose response
//     const data = {
//       ...restaurant.toObject(),
//       dishes: Array.isArray(dishes) ? dishes.map((d) => d.toObject()) : []
//     };

//     // Always return JSON
//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (err) {
//     // Catch-all: log stack and return JSON (so client doesn't parse HTML)
//     console.error("[API] Unexpected error in GET /api/restaurants/[slug]:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Restaurant, Dish } from "@/lib/models";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const slug = params?.slug;

    // 1. Find Restaurant
    const restaurant = await Restaurant.findOne({ slug, isActive: true }).select("-owner -__v");

    if (!restaurant) {
      return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
    }

    // 2. Find Dishes
    const dishes = await Dish.find({ restaurant: restaurant._id, isAvailable: true }).select("-__v");

    // 3. Combine Data
    const data = { ...restaurant.toObject(), dishes: dishes || [] };

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}