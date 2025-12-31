// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { getServerSession } from 'next-auth';
// // // // // // import connectDB from '@/lib/db';
// // // // // // import { Order, Restaurant } from '@/lib/models';

// // // // // // export async function GET(req) {
// // // // // //   try {
// // // // // //     await connectDB();
// // // // // //     const session = await getServerSession();

// // // // // //     // 1. Security Check
// // // // // //     if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
// // // // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // // // //     }

// // // // // //     // 2. Find the restaurant owned by this user
// // // // // //     const restaurant = await Restaurant.findOne({ owner: session.user.id });

// // // // // //     if (!restaurant) {
// // // // // //       // If user is a super-admin, they might want to see ALL orders (optional)
// // // // // //       // For now, return empty if no restaurant linked
// // // // // //       return NextResponse.json({ success: true, data: [] });
// // // // // //     }

// // // // // //     // 3. Fetch Orders for this specific restaurant
// // // // // //     const orders = await Order.find({ restaurant: restaurant._id })
// // // // // //       .sort({ createdAt: -1 }) // Newest first
// // // // // //       .populate('items.dish'); // Optional: get full dish details if needed

// // // // // //     return NextResponse.json({ success: true, data: orders });

// // // // // //   } catch (error) {
// // // // // //     console.error("Fetch Admin Orders Error:", error);
// // // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from 'next/server';
// // // // // import { getServerSession } from 'next-auth';
// // // // // import connectDB from '@/lib/db';
// // // // // import { Order, Restaurant, User } from '@/lib/models';

// // // // // // GET: Fetch all orders for the Admin's Restaurant
// // // // // export async function GET(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //     const session = await getServerSession();

// // // // //     if (!session?.user?.email) {
// // // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // // //     }

// // // // //     // 1. Find Admin User
// // // // //     const user = await User.findOne({ email: session.user.email });
    
// // // // //     // 2. Find the Restaurant owned by this Admin
// // // // //     const restaurant = await Restaurant.findOne({ owner: user._id });

// // // // //     if (!restaurant) {
// // // // //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// // // // //     }

// // // // //     // 3. Find Orders linked to this Restaurant
// // // // //     const orders = await Order.find({ restaurant: restaurant._id })
// // // // //       .populate('customer.name customer.phone') // Optional: populate user details if schema supports ref
// // // // //       .sort({ createdAt: -1 }); // Newest first

// // // // //     return NextResponse.json({ success: true, data: orders });

// // // // //   } catch (error) {
// // // // //     console.error("Admin Orders GET Error:", error);
// // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // // PUT: Update Order Status (Accept, Reject, etc.)
// // // // // export async function PUT(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //     const session = await getServerSession();
    
// // // // //     if (!session?.user?.email) {
// // // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // // //     }

// // // // //     const { orderId, status } = await req.json();

// // // // //     // Verify Admin Ownership
// // // // //     const user = await User.findOne({ email: session.user.email });
// // // // //     const restaurant = await Restaurant.findOne({ owner: user._id });

// // // // //     if (!restaurant) {
// // // // //       return NextResponse.json({ success: false, error: "Unauthorized Restaurant" }, { status: 403 });
// // // // //     }

// // // // //     // Update the Order
// // // // //     const updatedOrder = await Order.findOneAndUpdate(
// // // // //       { _id: orderId, restaurant: restaurant._id }, // Security Check
// // // // //       { $set: { status: status } },
// // // // //       { new: true }
// // // // //     );

// // // // //     if (!updatedOrder) {
// // // // //       return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
// // // // //     }

// // // // //     return NextResponse.json({ success: true, data: updatedOrder });

// // // // //   } catch (error) {
// // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextResponse } from 'next/server';
// // // // import { getServerSession } from 'next-auth';
// // // // import connectDB from '@/lib/db';
// // // // import { Order, Restaurant, User } from '@/lib/models';
// // // // export const dynamic = 'force-dynamic';
// // // // export async function GET(req) {
// // // //   try {
// // // //     console.log("🔍 [ADMIN ORDERS] Starting fetch...");
// // // //     await connectDB();
    
// // // //     const session = await getServerSession();
// // // //     if (!session?.user?.email) {
// // // //       console.log("❌ No session found.");
// // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     console.log(`👤 Admin Email: ${session.user.email}`);

// // // //     // 1. Find Admin User
// // // //     const user = await User.findOne({ email: session.user.email });
// // // //     if (!user) {
// // // //       console.log("❌ User not found in DB.");
// // // //       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
// // // //     }
// // // //     console.log(`✅ Admin ID: ${user._id}`);

// // // //     // 2. Find Restaurant owned by this Admin
// // // //     const restaurant = await Restaurant.findOne({ owner: user._id });
    
// // // //     if (!restaurant) {
// // // //       console.log("❌ NO RESTAURANT FOUND for this Admin ID.");
// // // //       // This is likely the problem!
// // // //       return NextResponse.json({ success: false, error: "You do not own a restaurant yet." }, { status: 404 });
// // // //     }

// // // //     console.log(`🏠 Restaurant Found: ${restaurant.name} (ID: ${restaurant._id})`);

// // // //     // 3. Find Orders linked to this Restaurant ID
// // // //     const orders = await Order.find({ restaurant: restaurant._id })
// // // //       .populate('customer.name customer.phone')
// // // //       .sort({ createdAt: -1 });

// // // //     console.log(`📦 Orders Found: ${orders.length}`);

// // // //     return NextResponse.json({ success: true, data: orders });

// // // //   } catch (error) {
// // // //     console.error("🔥 API ERROR:", error);
// // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // // Keep your PUT (Update) code the same, or paste the previous working version here.
// // // // export async function PUT(req) {
// // // //     try {
// // // //       await connectDB();
// // // //       const session = await getServerSession();
// // // //       if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  
// // // //       const { orderId, status } = await req.json();
// // // //       const user = await User.findOne({ email: session.user.email });
// // // //       const restaurant = await Restaurant.findOne({ owner: user._id });
  
// // // //       if (!restaurant) return NextResponse.json({ success: false, error: "Unauthorized Restaurant" }, { status: 403 });
  
// // // //       const updatedOrder = await Order.findOneAndUpdate(
// // // //         { _id: orderId, restaurant: restaurant._id },
// // // //         { $set: { status: status } },
// // // //         { new: true }
// // // //       );
  
// // // //       return NextResponse.json({ success: true, data: updatedOrder });
// // // //     } catch (error) {
// // // //       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // //     }
// // // //   }
// // // import { NextResponse } from 'next/server';
// // // import { getServerSession } from 'next-auth';
// // // import connectDB from '@/lib/db';
// // // import { Order, Restaurant, User } from '@/lib/models';

// // // export const dynamic = 'force-dynamic';

// // // export async function GET(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();

// // //     if (!session?.user?.email) {
// // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     // 1. Find Admin
// // //     const user = await User.findOne({ email: session.user.email });
// // //     console.log(`👨‍🍳 Admin User Found: ${user.email} (${user._id})`);

// // //     // 2. Find Restaurant
// // //     const restaurant = await Restaurant.findOne({ owner: user._id });
    
// // //     if (!restaurant) {
// // //       console.log("❌ No restaurant linked to this admin.");
// // //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// // //     }
    
// // //     console.log(`🏠 Admin owns Restaurant: ${restaurant.name} (ID: ${restaurant._id})`);

// // //     // 3. Find Orders
// // //     // DEBUG: Print count of ALL orders first
// // //     const totalOrders = await Order.countDocuments({});
// // //     console.log(`📦 Total Orders in DB: ${totalOrders}`);

// // //     const orders = await Order.find({ restaurant: restaurant._id })
// // //       .populate('customer.name') // Ensure this field exists in schema
// // //       .sort({ createdAt: -1 });

// // //     console.log(`✅ Orders matching Restaurant ID: ${orders.length}`);

// // //     return NextResponse.json({ success: true, data: orders });

// // //   } catch (error) {
// // //     console.error("🔥 Admin Orders API Error:", error);
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { getServerSession } from 'next-auth';
// // import connectDB from '@/lib/db';
// // import { Order, Restaurant, User } from '@/lib/models';

// // export const dynamic = 'force-dynamic';

// // export async function GET(req) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();

// //     if (!session?.user?.email) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     // 1. Find Admin
// //     const user = await User.findOne({ email: session.user.email });
    
// //     // 2. Find ALL Restaurants owned by this Admin
// //     // Using .find() instead of .findOne() allows multiple restaurants
// //     const restaurants = await Restaurant.find({ owner: user._id });
    
// //     if (!restaurants || restaurants.length === 0) {
// //       return NextResponse.json({ success: true, data: [] }); // Return empty if no restaurants
// //     }

// //     // Get list of Restaurant IDs
// //     const restaurantIds = restaurants.map(r => r._id);

// //     // 3. Find Orders for ALL these restaurants
// //     const orders = await Order.find({ restaurant: { $in: restaurantIds } })
// //       .sort({ createdAt: -1 }); // Newest first

// //     // Note: We do NOT need .populate('customer') because customer data is saved directly in the order object.

// //     return NextResponse.json({ success: true, data: orders });

// //   } catch (error) {
// //     console.error("Admin Orders Error:", error);
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // export async function PUT(req) {
// //   try {
// //     await connectDB();
// //     const { orderId, status } = await req.json();

// //     const updatedOrder = await Order.findByIdAndUpdate(
// //       orderId,
// //       { $set: { status: status } },
// //       { new: true }
// //     );

// //     return NextResponse.json({ success: true, data: updatedOrder });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }
// // src/app/api/admin/orders/route.js
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import mongoose from 'mongoose';
// import { Order, Restaurant, User } from '@/lib/models';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession(); // <-- keep same style as your working code

//     if (!session?.user?.email) {
//       console.warn('Admin GET: missing session or email');
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     // Find Admin user document
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       console.warn('Admin GET: session user not found in DB:', session.user.email);
//       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
//     }

//     // Find restaurants owned by this admin
//     const restaurants = await Restaurant.find({ owner: user._id });
//     if (!restaurants || restaurants.length === 0) {
//       return NextResponse.json({ success: true, data: [] }, { status: 200 });
//     }

//     const restaurantIds = restaurants.map(r => r._id);

//     // Find orders for these restaurants (keep original shape - do not transform)
//     const orders = await Order.find({ restaurant: { $in: restaurantIds } })
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ success: true, data: orders }, { status: 200 });

//   } catch (error) {
//     console.error("Admin Orders GET Error:", error);
//     return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function PUT(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession();

//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     // Optional: enforce roles like your app expects
//     if (!['admin', 'restaurant_owner'].includes(session.user?.role)) {
//       // If you don't want role checks, remove this block
//       return NextResponse.json({ success: false, error: "Insufficient privileges" }, { status: 403 });
//     }

//     const body = await req.json();
//     const { orderId, status, assignedTo } = body;

//     if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
//       return NextResponse.json({ success: false, error: "Invalid or missing orderId" }, { status: 400 });
//     }

//     // Build update object
//     const update = {};
//     if (status !== undefined) update.status = status;
//     update.updatedAt = Date.now();

//     if (assignedTo !== undefined) {
//       // allow null to unassign
//       if (assignedTo === null) {
//         update.assignedTo = null;
//       } else if (typeof assignedTo === 'string' && mongoose.Types.ObjectId.isValid(assignedTo)) {
//         // convert to ObjectId for DB consistency
//         update.assignedTo = mongoose.Types.ObjectId(assignedTo);
//       } else {
//         return NextResponse.json({ success: false, error: "Invalid assignedTo value" }, { status: 400 });
//       }
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: update }, { new: true });

//     if (!updatedOrder) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });

//     // Return the updated order in the same format your frontend currently expects
//     return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });

//   } catch (error) {
//     console.error("Admin Orders PUT Error:", error);
//     return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
//   }
// }
// src/app/api/admin/orders/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { Order, Restaurant, User } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session?.user?.email) {
      console.warn('Admin GET: missing session or email');
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      console.warn('Admin GET: session user not found in DB:', session.user.email);
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const restaurants = await Restaurant.find({ owner: user._id });
    if (!restaurants || restaurants.length === 0) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const restaurantIds = restaurants.map(r => r._id);
    const orders = await Order.find({ restaurant: { $in: restaurantIds } }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });

  } catch (error) {
    console.error("Admin Orders GET Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const session = await getServerSession();

    // DEBUG: print session shape (remove after debugging)
    console.log('Admin PUT - session snapshot ->', session && session.user ? {
      email: session.user.email,
      id: session.user.id || session.user._id || null,
      role: session.user.role ?? null
    } : null);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Resolve role: prefer session.role, otherwise fetch from DB
    let role = session.user?.role;
    if (!role) {
      const dbUser = await User.findOne({ email: session.user.email }).select('role _id').lean();
      if (!dbUser) {
        console.warn('Admin PUT - session user email not in DB:', session.user.email);
        return NextResponse.json({ success: false, error: "User record not found" }, { status: 404 });
      }
      role = dbUser.role;
      // Attach id for later use (non-persistent)
      session.user.id = dbUser._id.toString();
      console.log('Admin PUT - resolved role from DB:', role);
    }

    // Authorization: allow admin or restaurant_owner
    if (!['admin', 'restaurant_owner'].includes(role)) {
      console.warn('Admin PUT - insufficient privileges for:', session.user.email, 'role:', role);
      return NextResponse.json({ success: false, error: "Insufficient privileges" }, { status: 403 });
    }

    const body = await req.json();
    const { orderId, status, assignedTo } = body;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json({ success: false, error: "Invalid or missing orderId" }, { status: 400 });
    }

    // Build update object
    const update = {};
    if (status !== undefined) update.status = status;
    update.updatedAt = Date.now();

    if (assignedTo !== undefined) {
      if (assignedTo === null) {
        update.assignedTo = null;
      } else if (typeof assignedTo === 'string' && mongoose.Types.ObjectId.isValid(assignedTo)) {
        update.assignedTo = mongoose.Types.ObjectId(assignedTo);
      } else {
        return NextResponse.json({ success: false, error: "Invalid assignedTo value" }, { status: 400 });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: update }, { new: true });
    if (!updatedOrder) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    console.log('Admin PUT - updated order:', updatedOrder._id.toString(), 'status:', updatedOrder.status, 'assignedTo:', updatedOrder.assignedTo);

    return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });

  } catch (error) {
    console.error("Admin Orders PUT Error (final):", error);
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
