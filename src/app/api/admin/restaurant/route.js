// // // // // // // import connectDB from '@/lib/db';
// // // // // // // import { Restaurant, Dish } from '@/lib/models';

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
// // // // // //  import { NextResponse } from 'next/server';
// // // // // // import { getServerSession } from 'next-auth';
// // // // // // import connectDB from '@/lib/db';
// // // // // // import { Restaurant, User } from '@/lib/models'; 

// // // // // // export async function GET(req) {
// // // // // //   try {
// // // // // //     await connectDB();
    
// // // // // //     // 1. Get Logged In User
// // // // // //     const session = await getServerSession();
// // // // // //     if (!session?.user?.email) {
// // // // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // // // //     }

// // // // // //     // 2. Find the User's ID
// // // // // //     const user = await User.findOne({ email: session.user.email });
// // // // // //     if (!user) {
// // // // // //         return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
// // // // // //     }

// // // // // //     // 3. Find the Restaurant owned by this user
// // // // // //     // We search by 'owner' field, not by ID passed in URL
// // // // // //     const restaurant = await Restaurant.findOne({ owner: user._id });
    
// // // // // //     if (!restaurant) {
// // // // // //       return NextResponse.json({ 
// // // // // //         success: false, 
// // // // // //         error: "No restaurant found for this admin. Please create one in Settings." 
// // // // // //       }, { status: 404 });
// // // // // //     }

// // // // // //     return NextResponse.json({
// // // // // //       success: true,
// // // // // //       data: restaurant
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error('Error fetching admin restaurant:', error);
// // // // // //     return NextResponse.json({
// // // // // //       success: false,
// // // // // //       error: error.message || 'Failed to fetch restaurant'
// // // // // //     }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from 'next/server';
// // // // // import { getServerSession } from 'next-auth';
// // // // // import connectDB from '@/lib/db';
// // // // // import { Restaurant, User } from '@/lib/models';

// // // // // export async function GET(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //     const session = await getServerSession();

// // // // //     if (!session?.user?.email) {
// // // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // // //     }

// // // // //     // 1. Find User
// // // // //     const user = await User.findOne({ email: session.user.email });
    
// // // // //     // 2. Find ALL restaurants owned by this user
// // // // //     const restaurants = await Restaurant.find({ owner: user._id });

// // // // //     return NextResponse.json({ success: true, data: restaurants });

// // // // //   } catch (error) {
// // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }
// // // // // /api/admin/restaurant/route.js (POST method)
// // // // import { NextResponse } from 'next/server';
// // // // import { getServerSession } from 'next-auth';
// // // // import connectDB from '@/lib/db';
// // // // import { Restaurant, User } from '@/lib/models';

// // // // export async function POST(req) {
// // // //   try {
// // // //     await connectDB();
// // // //     const session = await getServerSession();

// // // //     if (!session?.user?.email) {
// // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     // Find User
// // // //     const user = await User.findOne({ email: session.user.email });
// // // //     if (!user) {
// // // //       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
// // // //     }

// // // //     // Check if user already has a restaurant
// // // //     const existingRestaurant = await Restaurant.findOne({ owner: user._id });
// // // //     if (existingRestaurant) {
// // // //       return NextResponse.json({ 
// // // //         success: false, 
// // // //         error: "You already have a restaurant. You can only have one restaurant per account." 
// // // //       }, { status: 400 });
// // // //     }

// // // //     // Get restaurant data
// // // //     const restaurantData = await req.json();
    
// // // //     // Create slug from name
// // // //     const slug = restaurantData.name
// // // //       .toLowerCase()
// // // //       .replace(/[^a-z0-9]+/g, '-')
// // // //       .replace(/(^-|-$)/g, '');

// // // //     // Create new restaurant
// // // //     const newRestaurant = new Restaurant({
// // // //       ...restaurantData,
// // // //       slug,
// // // //       owner: user._id,
// // // //       isActive: true,
// // // //       featured: false,
// // // //     });

// // // //     await newRestaurant.save();

// // // //     return NextResponse.json({ 
// // // //       success: true, 
// // // //       message: "Restaurant created successfully",
// // // //       data: newRestaurant 
// // // //     }, { status: 201 });

// // // //   } catch (error) {
// // // //     console.error("Create error:", error);
// // // //     return NextResponse.json({ 
// // // //       success: false, 
// // // //       error: error.message || "Failed to create restaurant" 
// // // //     }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import { getServerSession } from 'next-auth';
// // // import connectDB from '@/lib/db';
// // // import { Restaurant, User } from '@/lib/models';

// // // // GET method - Get all restaurants for the logged-in user
// // // export async function GET(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();

// // //     if (!session?.user?.email) {
// // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     // 1. Find User
// // //     const user = await User.findOne({ email: session.user.email });
    
// // //     // 2. Find ALL restaurants owned by this user
// // //     const restaurants = await Restaurant.find({ owner: user._id });

// // //     return NextResponse.json({ success: true, data: restaurants });

// // //   } catch (error) {
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // // POST method - Create a new restaurant
// // // export async function POST(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();

// // //     if (!session?.user?.email) {
// // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     // Find User
// // //     const user = await User.findOne({ email: session.user.email });
// // //     if (!user) {
// // //       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
// // //     }

// // //     // Check if user already has a restaurant
// // //     const existingRestaurant = await Restaurant.findOne({ owner: user._id });
// // //     if (existingRestaurant) {
// // //       return NextResponse.json({ 
// // //         success: false, 
// // //         error: "You already have a restaurant. You can only have one restaurant per account." 
// // //       }, { status: 400 });
// // //     }

// // //     // Get restaurant data
// // //     const restaurantData = await req.json();
    
// // //     // Create slug from name
// // //     const slug = restaurantData.name
// // //       .toLowerCase()
// // //       .replace(/[^a-z0-9]+/g, '-')
// // //       .replace(/(^-|-$)/g, '');

// // //     // Create new restaurant
// // //     const newRestaurant = new Restaurant({
// // //       ...restaurantData,
// // //       slug,
// // //       owner: user._id,
// // //       isActive: true,
// // //       featured: false,
// // //     });

// // //     await newRestaurant.save();

// // //     return NextResponse.json({ 
// // //       success: true, 
// // //       message: "Restaurant created successfully",
// // //       data: newRestaurant 
// // //     }, { status: 201 });

// // //   } catch (error) {
// // //     console.error("Create error:", error);
// // //     return NextResponse.json({ 
// // //       success: false, 
// // //       error: error.message || "Failed to create restaurant" 
// // //     }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { getServerSession } from 'next-auth';
// // import connectDB from '@/lib/db';
// // import { Restaurant, User } from '@/lib/models';

// // // GET: Fetch the Admin's Restaurant Settings
// // export async function GET(req) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();

// //     if (!session?.user?.email) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     const user = await User.findOne({ email: session.user.email });
// //     if (!user) {
// //       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
// //     }

// //     // Find all restaurants owned by this user (even if constraint says one, we support fetching the list)
// //     // The frontend expects this to be an array, which find() returns.
// //     const restaurants = await Restaurant.find({ owner: user._id });

// //     return NextResponse.json({ success: true, data: restaurants });

// //   } catch (error) {
// //     console.error("GET error:", error);
// //     return NextResponse.json({ success: false, error: error.message || "Failed to fetch settings" }, { status: 500 });
// //   }
// // }

// // // POST: Create a New Restaurant
// // export async function POST(req) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();

// //     if (!session?.user?.email) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     const user = await User.findOne({ email: session.user.email });
// //     if (!user) {
// //       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
// //     }

// //     // Constraint Check: Only allow one restaurant per account
// //     const existingRestaurant = await Restaurant.findOne({ owner: user._id });
// //     if (existingRestaurant) {
// //       return NextResponse.json({ 
// //         success: false, 
// //         error: "You already own a restaurant. Use the PUT method to update." 
// //       }, { status: 400 });
// //     }

// //     const restaurantData = await req.json();
    
// //     // Create slug from name
// //     const slug = restaurantData.name
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]+/g, '-')
// //       .replace(/(^-|-$)/g, '')
// //       + '-' + Math.random().toString(36).substring(2, 5); // Append unique characters

// //     // Destructure required fields from the frontend payload
// //     const { name, description, address, deliveryTime, deliveryFee, minOrder, isActive, cuisine, image, coverImage, upiId, tags, workingHours, phone } = restaurantData;

// //     // Create new restaurant document
// //     const newRestaurant = new Restaurant({
// //       name,
// //       slug,
// //       description,
// //       address,
// //       deliveryTime,
// //       deliveryFee,
// //       minOrder,
// //       isActive,
// //       cuisine,
// //       image,
// //       coverImage,
// //       upiId,
// //       tags,
// //       workingHours,
// //       // The frontend sends the phone separately; map it to the contact subdocument
// //       contact: { phone }, 
// //       owner: user._id,
// //     });

// //     await newRestaurant.save();

// //     return NextResponse.json({ 
// //       success: true, 
// //       message: "Restaurant created successfully",
// //       data: newRestaurant 
// //     }, { status: 201 });

// //   } catch (error) {
// //     console.error("POST error:", error);
// //     // Handle Mongoose validation errors
// //     if (error.name === 'ValidationError') {
// //       return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// //     }
// //     return NextResponse.json({ success: false, error: error.message || "Failed to create restaurant" }, { status: 500 });
// //   }
// // }

// // // PUT: Update an Existing Restaurant
// // export async function PUT(req) {
// //     try {
// //         await connectDB();
// //         const session = await getServerSession();

// //         if (!session?.user?.email) {
// //             return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //         }

// //         const user = await User.findOne({ email: session.user.email });
// //         const data = await req.json();
        
// //         // --- Get ID from URL or Payload ---
// //         let restaurantId = data.restaurantId; // Assuming frontend might pass ID in body
        
// //         // Find the existing restaurant by owner ID
// //         const existingRestaurant = await Restaurant.findOne({ owner: user._id });

// //         if (!existingRestaurant) {
// //             return NextResponse.json({ success: false, error: "Restaurant not found for update." }, { status: 404 });
// //         }

// //         // --- Apply Updates ---
// //         const updatedRestaurant = await Restaurant.findByIdAndUpdate(
// //             existingRestaurant._id,
// //             {
// //                 $set: {
// //                     name: data.name,
// //                     description: data.description,
// //                     address: data.address,
// //                     deliveryTime: data.deliveryTime,
// //                     deliveryFee: data.deliveryFee,
// //                     minOrder: data.minOrder,
// //                     isActive: data.isActive,
// //                     cuisine: data.cuisine,
// //                     image: data.image,
// //                     coverImage: data.coverImage,
// //                     upiId: data.upiId,
// //                     tags: data.tags,
// //                     workingHours: data.workingHours,
// //                     // Update nested contact phone number
// //                     "contact.phone": data.phone,
// //                 }
// //             },
// //             { new: true, runValidators: true }
// //         );

// //         if (!updatedRestaurant) {
// //             return NextResponse.json({ success: false, error: "Update failed." }, { status: 500 });
// //         }

// //         return NextResponse.json({ success: true, message: "Settings updated successfully", data: updatedRestaurant });

// //     } catch (error) {
// //         console.error("PUT error:", error);
// //         return NextResponse.json({ success: false, error: error.message || "Failed to update restaurant" }, { status: 500 });
// //     }
// // }
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import { Restaurant, User } from '@/lib/models';

// // GET: Fetch ALL Admin's Restaurants (used by settings page)
// export async function GET(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession();

//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
//     }

//     // Find all restaurants owned by this user
//     const restaurants = await Restaurant.find({ owner: user._id });

//     return NextResponse.json({ success: true, data: restaurants });

//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json({ success: false, error: error.message || "Failed to fetch settings" }, { status: 500 });
//   }
// }

// // POST: Create a New Restaurant
// export async function POST(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession();

//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
//     }

//     // Constraint Check: Only allow one restaurant per account
//     const existingRestaurant = await Restaurant.findOne({ owner: user._id });
//     if (existingRestaurant) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "You already own a restaurant. Use the PUT method to update." 
//       }, { status: 400 });
//     }

//     const restaurantData = await req.json();
    
//     // Create slug from name
//     const slug = restaurantData.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '')
//       + '-' + Math.random().toString(36).substring(2, 5); // Append unique characters

//     // Destructure required fields from the frontend payload
//     const { name, description, address, deliveryTime, deliveryFee, minOrder, isActive, cuisine, image, coverImage, upiId, tags, workingHours, phone } = restaurantData;

//     // Create new restaurant document
//     const newRestaurant = new Restaurant({
//       name,
//       slug,
//       description,
//       address,
//       deliveryTime,
//       deliveryFee,
//       minOrder,
//       isActive,
//       cuisine,
//       image,
//       coverImage,
//       upiId,
//       tags,
//       workingHours,
//       // Map frontend phone field to nested contact object
//       contact: { phone }, 
//       owner: user._id,
//     });

//     await newRestaurant.save();

//     return NextResponse.json({ 
//       success: true, 
//       message: "Restaurant created successfully",
//       data: newRestaurant 
//     }, { status: 201 });

//   } catch (error) {
//     console.error("POST error:", error);
//     if (error.name === 'ValidationError') {
//       return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//     }
//     return NextResponse.json({ success: false, error: error.message || "Failed to create restaurant" }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Restaurant, User } from '@/lib/models'; // <-- Correct Import Usage

// GET: Fetch ALL Admin's Restaurants
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const restaurants = await Restaurant.find({ owner: user._id });

    return NextResponse.json({ success: true, data: restaurants });

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch settings" }, { status: 500 });
  }
}

// POST: Create a New Restaurant
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const restaurantData = await req.json();
    
    // Create unique slug
    const slug = restaurantData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Math.random().toString(36).substring(2, 5); 

    // Destructure data for clean saving
    const { name, description, address, deliveryTime, deliveryFee, minOrder, isActive, cuisine, image, coverImage, upiId, tags, workingHours, phone } = restaurantData;

    // Create new restaurant document
    const newRestaurant = new Restaurant({
      name,
      slug,
      description,
      address,
      deliveryTime,
      deliveryFee,
      minOrder,
      isActive,
      cuisine,
      image,
      coverImage,
      upiId,
      tags,
      workingHours,
      contact: { phone }, // Map frontend 'phone' to nested 'contact.phone'
      owner: user._id,
    });

    await newRestaurant.save(); // The save operation that validates all fields

    return NextResponse.json({ 
      success: true, 
      message: "Restaurant created successfully",
      data: newRestaurant 
    }, { status: 201 });

  } catch (error) {
    console.error("POST error:", error);
    if (error.name === 'ValidationError') {
      // Sends specific validation errors back to the frontend for debugging
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || "Failed to create restaurant" }, { status: 500 });
  }
}