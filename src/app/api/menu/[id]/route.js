// // // import { NextResponse } from 'next/server';
// // // import connectDB from '@/lib/db';
// // // import { Dish } from '@/lib/models';

// // // export async function GET(req, { params }) {
// // //   try {
// // //     await connectDB();

// // //     const { id } = params;

// // //     const dish = await Dish.findById(id)
// // //       .populate('restaurant', 'name slug address phone image rating deliveryTime minOrder')
// // //       .lean();

// // //     if (!dish) {
// // //       return NextResponse.json({ 
// // //         success: false, 
// // //         error: 'Dish not found' 
// // //       }, { status: 404 });
// // //     }

// // //     return NextResponse.json({ 
// // //       success: true, 
// // //       data: dish 
// // //     });

// // //   } catch (error) {
// // //     return NextResponse.json({ 
// // //       success: false, 
// // //       error: error.message 
// // //     }, { status: 500 });
// // //   }
// // // }

// // import connectDB from '@/lib/mongodb';
// // import { Restaurant, Dish } from '@/lib/models';

// // export async function GET(request, { params }) {
// //   try {
// //     await connectDB();
    
// //     const { slug } = params;
    
// //     // First find the restaurant
// //     const restaurant = await Restaurant.findOne({ 
// //       slug, 
// //       isActive: true 
// //     });
    
// //     if (!restaurant) {
// //       return Response.json({
// //         success: false,
// //         error: 'Restaurant not found'
// //       }, { status: 404 });
// //     }

// //     // Find dishes for this restaurant
// //     const dishes = await Dish.find({ 
// //       restaurant: restaurant._id,
// //       isAvailable: true 
// //     })
// //       .sort({ category: 1, isPopular: -1, rating: -1 })
// //       .lean();

// //     return Response.json({
// //       success: true,
// //       data: dishes
// //     });

// //   } catch (error) {
// //     console.error('Error fetching dishes:', error);
// //     return Response.json({
// //       success: false,
// //       error: 'Failed to fetch dishes'
// //     }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import { Dish } from '@/lib/models'; // Ensure this correctly exports the Dish model
// import mongoose from 'mongoose'; // Essential for validating ObjectId format

// export async function GET(request, { params }) {
//   try {
//     await connectDB();

//     const dishId = params.id;

//     // 🔑 STEP 1: Validate the ID format before querying the database
//     if (!mongoose.Types.ObjectId.isValid(dishId)) {
//         console.warn(`[API/Dish] Invalid Dish ID format received: ${dishId}`);
//         return NextResponse.json({ 
//           success: false, 
//           error: 'Invalid dish ID format. Must be a valid MongoDB ID.' 
//         }, { status: 400 }); // 400 Bad Request
//     }

//     // STEP 2: Find the dish and populate related restaurant data
//     const dish = await Dish.findById(dishId)
//       // Populate fields needed for the detail view (e.g., contact, delivery info)
//       .populate('restaurant', 'name slug address contact image rating deliveryTime minOrder')
//       .lean();

//     // STEP 3: Check if the dish exists
//     if (!dish) {
//         console.log(`[API/Dish] Dish not found for ID: ${dishId}`);
//         return NextResponse.json({ 
//           success: false, 
//           error: 'Dish not found' 
//         }, { status: 404 }); // 404 Not Found
//     }

//     // STEP 4: Success
//     return NextResponse.json({ 
//       success: true, 
//       data: dish 
//     }, { status: 200 });

//   } catch (error) {
//     // Catch generic server/database errors
//     console.error('SERVER API ERROR (/api/menu/[id]):', error);
//     return NextResponse.json({ 
//       success: false, 
//       error: error.message || 'Internal server error during single dish fetch.' 
//     }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Dish } from '@/lib/models';
import mongoose from 'mongoose'; 

export async function GET(request, { params }) {
  try {
    await connectDB();

    const dishId = params.id;

    // 🔑 STEP 1: Validate the ID format before querying the database
    if (!mongoose.Types.ObjectId.isValid(dishId)) {
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid dish ID format' 
        }, { status: 400 }); 
    }

    // STEP 2: Find the dish and populate related restaurant data
    const dish = await Dish.findById(dishId)
      .populate('restaurant', 'name slug address contact image rating deliveryTime minOrder')
      .lean();

    // STEP 3: Check if the dish exists
    if (!dish) {
        return NextResponse.json({ 
          success: false, 
          error: 'Dish not found' 
        }, { status: 404 }); 
    }

    // STEP 4: Success
    return NextResponse.json({ 
      success: true, 
      data: dish 
    }, { status: 200 });

  } catch (error) {
    console.error('SERVER API ERROR (/api/menu/[id]):', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error during single dish fetch.' 
    }, { status: 500 });
  }
}