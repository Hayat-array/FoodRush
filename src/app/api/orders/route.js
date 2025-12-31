// // // // import { NextResponse } from 'next/server';
// // // // import { getServerSession } from 'next-auth';
// // // // import connectDB from '@/lib/db';
// // // // import { Order, User, Restaurant } from '@/lib/models';

// // // // // GET: Get My Orders
// // // // export async function GET(req) {
// // // //   try {
// // // //     await connectDB();
// // // //     const session = await getServerSession();

// // // //     if (!session) {
// // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     // Find orders where customer.email matches logged in user
// // // //     // Using .populate to get restaurant details (name, image)
// // // //     const orders = await Order.find({ "customer.email": session.user.email })
// // // //       .populate('restaurant', 'name coverImage') 
// // // //       .sort({ createdAt: -1 });

// // // //     return NextResponse.json({ success: true, data: orders });

// // // //   } catch (error) {
// // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // // POST: Place New Order
// // // // export async function POST(req) {
// // // //   try {
// // // //     await connectDB();
// // // //     const session = await getServerSession();

// // // //     if (!session) {
// // // //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     const { items, total, deliveryAddress, restaurantId } = await req.json();

// // // //     // Create Order
// // // //     const newOrder = await Order.create({
// // // //       orderNumber: `ORD-${Date.now()}`,
// // // //       customer: {
// // // //         name: session.user.name,
// // // //         email: session.user.email,
// // // //         phone: "9999999999", // You should fetch this from User profile realistically
// // // //       },
// // // //       restaurant: restaurantId,
// // // //       items: items.map(item => ({
// // // //         dish: item.id,
// // // //         name: item.name,
// // // //         price: item.price,
// // // //         quantity: item.quantity,
// // // //         subtotal: item.price * item.quantity
// // // //       })),
// // // //       deliveryType: 'delivery',
// // // //       deliveryAddress,
// // // //       paymentMethod: 'cod', // Hardcoded for demo
// // // //       subtotal: total,
// // // //       total: total,
// // // //       status: 'pending'
// // // //     });

// // // //     return NextResponse.json({ success: true, data: newOrder });

// // // //   } catch (error) {
// // // //     console.error("Order Error:", error);
// // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import { getServerSession } from 'next-auth';
// // // import connectDB from '@/lib/db';
// // // import { Order, User, Restaurant } from '@/lib/models';

// // // // GET: Get Logged In User's Orders
// // // export async function GET(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();
// // //     if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

// // //     const orders = await Order.find({ "customer.email": session.user.email })
// // //       .populate('restaurant', 'name coverImage') 
// // //       .sort({ createdAt: -1 });

// // //     return NextResponse.json({ success: true, data: orders });
// // //   } catch (error) {
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // // POST: Create New Order
// // // export async function POST(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession();
// // //     if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

// // //     const body = await req.json();
// // //     const { items, total, deliveryAddress, restaurantId } = body;

// // //     // Validate
// // //     if (!items || items.length === 0) {
// // //       return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 });
// // //     }

// // //     // Create Order
// // //     const newOrder = await Order.create({
// // //       orderNumber: `ORD-${Date.now()}`, // Simple unique ID
// // //       customer: {
// // //         name: session.user.name,
// // //         email: session.user.email,
// // //         phone: "9999999999", // Ideally fetch from User profile
// // //       },
// // //       restaurant: restaurantId,
// // //       items: items.map(item => ({
// // //         dish: item.id,
// // //         name: item.name,
// // //         price: item.price,
// // //         quantity: item.quantity,
// // //         subtotal: item.price * item.quantity
// // //       })),
// // //       deliveryType: 'delivery',
// // //       deliveryAddress: {
// // //         street: deliveryAddress.street,
// // //         city: "Jaipur", // Defaulting for now
// // //         zipCode: "302001"
// // //       },
// // //       paymentMethod: 'cod', 
// // //       subtotal: total,
// // //       total: total,
// // //       status: 'pending'
// // //     });

// // //     return NextResponse.json({ success: true, data: newOrder });

// // //   } catch (error) {
// // //     console.error("Order Creation Error:", error);
// // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { getServerSession } from 'next-auth';
// // import connectDB from '@/lib/db';
// // import { Order, User, Restaurant } from '@/lib/models';

// // // GET: My Orders
// // export async function GET(req) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();
// //     if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

// //     const orders = await Order.find({ "customer.email": session.user.email })
// //       .populate('restaurant', 'name coverImage') 
// //       .sort({ createdAt: -1 });

// //     return NextResponse.json({ success: true, data: orders });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // // POST: Create Order
// // export async function POST(req) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();
// //     if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

// //     const body = await req.json();
// //     const { items, total, deliveryAddress, restaurantId } = body;

// //     // Validate
// //     if (!items || items.length === 0) {
// //       return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 });
// //     }

// //     // Create Order Object matching your Mongoose Schema
// //     const newOrder = await Order.create({
// //       orderNumber: `ORD-${Date.now()}`,
// //       customer: {
// //         name: session.user.name,
// //         email: session.user.email,
// //         phone: "9999999999", // Placeholder (Schema requires phone)
// //       },
// //       restaurant: restaurantId,
// //       items: items.map(item => ({
// //         dish: item.id,
// //         name: item.name,
// //         price: item.price,
// //         quantity: item.quantity,
// //         subtotal: item.price * item.quantity
// //       })),
// //       deliveryType: 'delivery',
// //       deliveryAddress: {
// //         street: deliveryAddress.street, // From Frontend
// //         city: "Jaipur", 
// //         state: "Rajasthan",
// //         zipCode: "302001",
// //         landmark: ""
// //       },
// //       paymentMethod: 'cod', 
// //       paymentStatus: 'pending',
// //       subtotal: total,
// //       total: total,
// //       status: 'pending'
// //     });

// //     return NextResponse.json({ success: true, data: newOrder });

// //   } catch (error) {
// //     console.error("Order Creation Error:", error);
// //     // Return the specific error message to help debug
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import { Order, User } from '@/lib/models'; // Ensure models are imported

// // POST: Place New Order
// export async function POST(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession();

//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Please log in to place an order." }, { status: 401 });
//     }

//     const body = await req.json();
//     const { items, total, deliveryAddress, restaurantId } = body;

//     // 1. Basic Validation
//     if (!items || items.length === 0) {
//       return NextResponse.json({ success: false, error: "Your cart is empty." }, { status: 400 });
//     }
//     if (!deliveryAddress?.street) {
//       return NextResponse.json({ success: false, error: "Delivery address is required." }, { status: 400 });
//     }

//     // 2. Format Items for Mongoose Schema
//     // Schema expects: { dish: ObjectId, name, price, quantity, subtotal }
//     const formattedItems = items.map(item => ({
//       dish: item.id, // 👈 KEY FIX: Map 'id' from cart to 'dish' for DB
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       subtotal: item.price * item.quantity
//     }));

//     // 3. Create Order
//     const newOrder = await Order.create({
//       orderNumber: `ORD-${Date.now().toString().slice(-6)}`, // Short unique ID
//       customer: {
//         name: session.user.name,
//         email: session.user.email,
//         phone: "9999999999", // Default phone if not in session
//       },
//       restaurant: restaurantId,
//       items: formattedItems,
//       deliveryType: 'delivery',
//       deliveryAddress: {
//         street: deliveryAddress.street,
//         city: "Jaipur", 
//         state: "Rajasthan",
//         zipCode: "302001"
//       },
//       paymentMethod: 'cod', 
//       paymentStatus: 'pending',
//       subtotal: total,
//       deliveryFee: 40, // Example fixed fee
//       total: total + 40, // Grand total
//       status: 'pending'
//     });

//     return NextResponse.json({ success: true, data: newOrder });

//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// // GET: Get My Orders
// export async function GET(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession();
//     if (!session?.user?.email) return NextResponse.json({ success: false }, { status: 401 });

//     const orders = await Order.find({ "customer.email": session.user.email })
//       .populate('restaurant', 'name coverImage') 
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ success: true, data: orders });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Order, Restaurant } from '@/lib/models';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// POST: Place New Order (User Action)
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
    }

    const body = await req.json();
    const { items, total, deliveryAddress, restaurantId, paymentMethod = 'cod' } = body;

    if (!items || !total || !restaurantId) {
      return NextResponse.json({ success: false, error: "Missing essential order details." }, { status: 400 });
    }

    const restaurant = await Restaurant.findById(restaurantId).lean();
    if (!restaurant) {
      return NextResponse.json({ success: false, error: "Restaurant not found." }, { status: 404 });
    }

    const deliveryFee = restaurant.deliveryFee || 40;
    const taxes = Math.round(total * 0.05);
    const finalTotal = total + deliveryFee + taxes;

    const formattedItems = items.map(item => ({
      dish: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    }));

    const newOrder = await Order.create({
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      customer: {
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone || deliveryAddress.phone || "N/A",
      },
      restaurant: restaurantId,
      items: formattedItems,
      deliveryType: 'delivery',
      deliveryAddress: deliveryAddress,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      total: finalTotal,
      subtotal: total,
      deliveryFee: deliveryFee,
      taxes: taxes,
      status: 'pending' // Initial status is always pending
    });

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });

  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error." }, { status: 500 });
  }
}

// GET: Get My Orders (User History)
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

    // Check if OTP should be included
    const { searchParams } = new URL(req.url);
    const includeOTP = searchParams.get('includeOTP') === 'true';

    // Build query with conditional OTP selection
    let query = Order.find({ "customer.email": session.user.email })
      .populate('restaurant', 'name coverImage')
      .sort({ createdAt: -1 });

    // Explicitly select deliveryOTP if requested (it's hidden by default)
    if (includeOTP) {
      query = query.select('+deliveryOTP');
    }

    const orders = await query.lean();

    // Data Consistency Fix: Convert ObjectIds to strings
    const transformedOrders = orders.map(order => ({
      ...order,
      _id: order._id.toString(),
      restaurant: {
        ...order.restaurant,
        _id: order.restaurant?._id?.toString()
      },
      items: order.items || [],
    }));

    return NextResponse.json({ success: true, data: transformedOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}