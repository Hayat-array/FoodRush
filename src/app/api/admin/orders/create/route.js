// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import { Order, Dish, Restaurant } from '@/lib/models';

// export async function POST(req) {
//   try {
//     // 1. Connect to Database
//     await connectDB();

//     // 2. Authentication & Authorization Check
//     const session = await getServerSession();
    
//     // Check if user is logged in AND has admin/owner privileges
//     if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized. Admin access required." },
//         { status: 403 }
//       );
//     }

//     // 3. Parse Request Body
//     const body = await req.json();
//     const { 
//       customer, 
//       restaurantId, 
//       items, 
//       deliveryType = 'delivery', 
//       paymentMethod = 'cod',
//       deliveryAddress
//     } = body;

//     // 4. Validation
//     if (!customer || !restaurantId || !items || items.length === 0) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // 5. Verify Restaurant Exists
//     const restaurant = await Restaurant.findById(restaurantId);
//     if (!restaurant) {
//       return NextResponse.json(
//         { success: false, error: "Restaurant not found" },
//         { status: 404 }
//       );
//     }

//     // 6. Calculate Totals Server-Side (Security Best Practice)
//     // We fetch the actual prices from the database to prevent tampering
//     let subtotal = 0;
//     const orderItems = [];

//     for (const item of items) {
//       // Find the dish in DB
//       const dish = await Dish.findById(item.dishId);
      
//       if (!dish) {
//         throw new Error(`Dish not found: ${item.dishId}`);
//       }

//       // Calculate item total (price * quantity)
//       // Note: You can add logic here for customizations/sizes if needed
//       const itemPrice = dish.price; 
//       const itemSubtotal = itemPrice * item.quantity;
      
//       subtotal += itemSubtotal;

//       orderItems.push({
//         dish: dish._id,
//         name: dish.name,
//         price: itemPrice,
//         quantity: item.quantity,
//         subtotal: itemSubtotal
//       });
//     }

//     // Calculate Fees
//     const deliveryFee = deliveryType === 'delivery' ? restaurant.deliveryFee : 0;
//     const taxes = Math.round(subtotal * 0.05); // 5% Tax
//     const total = subtotal + deliveryFee + taxes;

//     // 7. Generate Unique Order Number
//     const orderNumber = `ADM-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

//     // 8. Create Order Document
//     const newOrder = new Order({
//       orderNumber,
//       customer: {
//         name: customer.name,
//         phone: customer.phone,
//         email: customer.email || session.user.email // Fallback to admin email if not provided
//       },
//       restaurant: restaurant._id,
//       items: orderItems,
//       deliveryType,
//       deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
//       paymentMethod, // 'cod' or 'upi'
//       paymentStatus: 'pending', // Admins usually mark as paid later or immediately
//       subtotal,
//       deliveryFee,
//       taxes,
//       total,
//       status: 'confirmed', // Admin orders are usually auto-confirmed
//       createdBy: session.user.id // Optional: track which admin created it
//     });

//     // 9. Save to Database
//     await newOrder.save();

//     // 10. Update stats (Optional)
//     // Increment order count for dishes
//     for (const item of orderItems) {
//       await Dish.findByIdAndUpdate(item.dish, { $inc: { orderCount: item.quantity } });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: "Order created successfully", 
//       data: newOrder 
//     });

//   } catch (error) {
//     console.error("Admin Order Creation Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// C:\website\Food Delivary App\foodrush\src\app\api\admin\orders\create\route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db'; // Standardized to db
import { Order, Dish, Restaurant } from '@/lib/models';

export async function POST(req) {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Authentication & Authorization Check
    const session = await getServerSession();
    
    // Check if user is logged in AND has admin/owner privileges
    if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    // 3. Parse Request Body
    const body = await req.json();
    const { 
      customer, 
      restaurantId, 
      items, 
      deliveryType = 'delivery', 
      paymentMethod = 'cod',
      deliveryAddress
    } = body;

    // 4. Validation
    if (!customer || !restaurantId || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 5. Verify Restaurant Exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant not found" },
        { status: 404 }
      );
    }

    // 6. Calculate Totals Server-Side (Security Best Practice)
    // We fetch the actual prices from the database to prevent tampering
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      // Find the dish in DB
      const dish = await Dish.findById(item.dishId);
      
      if (!dish) {
        throw new Error(`Dish not found: ${item.dishId}`);
      }

      // Calculate item total (price * quantity)
      // Note: You can add logic here for customizations/sizes if needed
      const itemPrice = dish.price; 
      const itemSubtotal = itemPrice * item.quantity;
      
      subtotal += itemSubtotal;

      orderItems.push({
        dish: dish._id,
        name: dish.name,
        price: itemPrice,
        quantity: item.quantity,
        subtotal: itemSubtotal
      });
    }

    // Calculate Fees
    const deliveryFee = deliveryType === 'delivery' ? restaurant.deliveryFee : 0;
    const taxes = Math.round(subtotal * 0.05); // 5% Tax
    const total = subtotal + deliveryFee + taxes;

    // 7. Generate Unique Order Number
    const orderNumber = `ADM-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // 8. Create Order Document
    const newOrder = new Order({
      orderNumber,
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || session.user.email // Fallback to admin email if not provided
      },
      restaurant: restaurant._id,
      items: orderItems,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
      paymentMethod, // 'cod' or 'upi'
      paymentStatus: 'pending', // Admins usually mark as paid later or immediately
      subtotal,
      deliveryFee,
      taxes,
      total,
      status: 'confirmed', // Admin orders are usually auto-confirmed
      assignedTo: null, // Consistent default
      createdBy: session.user.id, // Optional: track which admin created it
      updatedAt: new Date()
    });

    // 9. Save to Database
    await newOrder.save();

    // 10. Update stats (Optional)
    // Increment order count for dishes (use bulk for efficiency)
    const bulkOps = orderItems.map(item => ({
      updateOne: {
        filter: { _id: item.dish },
        update: { $inc: { orderCount: item.quantity } }
      }
    }));
    await Dish.bulkWrite(bulkOps);

    return NextResponse.json({ 
      success: true, 
      message: "Order created successfully", 
      data: newOrder 
    });

  } catch (error) {
    console.error("Admin Order Creation Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}