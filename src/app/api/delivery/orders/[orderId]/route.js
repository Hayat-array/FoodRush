// // // // // import { NextResponse } from 'next/server';
// // // // // import { getServerSession } from 'next-auth';
// // // // // import { Order, User } from '@/lib/models'; // Import models
// // // // // import { connectDB } from '@/lib/models'; // Import DB connection

// // // // // export async function PUT(req, { params }) {
// // // // //     // 1. Check DB Connection
// // // // //     await connectDB();
    
// // // // //     // 2. Authorization Check (CRITICAL)
// // // // //     const session = await getServerSession();
// // // // //     if (!session || session.user?.role !== 'delivery') {
// // // // //         return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 403 });
// // // // //     }

// // // // //     const { orderId } = params;
// // // // //     const { newStatus } = await req.json();

// // // // //     if (!newStatus || !['out_for_delivery', 'delivered'].includes(newStatus)) {
// // // // //         return NextResponse.json({ success: false, error: 'Invalid status provided.' }, { status: 400 });
// // // // //     }

// // // // //     try {
// // // // //         // 3. Update Order in DB
// // // // //         const updatedOrder = await Order.findOneAndUpdate(
// // // // //             { 
// // // // //                 _id: orderId,
// // // // //                 // Ensure the order is either unassigned or assigned to this specific delivery man
// // // // //                 $or: [{ assignedTo: null }, { assignedTo: session.user.id }],
// // // // //                 // Prevent updating if already delivered or cancelled
// // // // //                 status: { $in: ['ready', 'out_for_delivery'] } 
// // // // //             },
// // // // //             { 
// // // // //                 status: newStatus,
// // // // //                 assignedTo: session.user.id, // Assign if not assigned yet
// // // // //                 actualDeliveryTime: newStatus === 'delivered' ? Date.now() : undefined,
// // // // //                 updatedAt: Date.now()
// // // // //             },
// // // // //             { new: true }
// // // // //         ).populate('restaurant');

// // // // //         if (!updatedOrder) {
// // // // //             return NextResponse.json({ success: false, error: 'Order not found, already delivered/cancelled, or not ready for action.' }, { status: 404 });
// // // // //         }

// // // // //         return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });

// // // // //     } catch (error) {
// // // // //         console.error("Delivery Status Update Error:", error);
// // // // //         return NextResponse.json({ success: false, error: 'Internal server error during update.' }, { status: 500 });
// // // // //     }
// // // // // }
// // // // // NEW FILE: C:\website\Food Delivary App\foodrush\src\app\api\delivery\orders\[orderId]\route.js
// // // // import { NextResponse } from 'next/server';
// // // // import { getServerSession } from 'next-auth';
// // // // import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// // // // import connectDB from '@/lib/db';
// // // // import { Order } from '@/lib/models'; 

// // // // export async function PATCH(req, { params }) {
// // // //     const { orderId } = params;
// // // //     try {
// // // //         // 1. AUTHENTICATION & AUTHORIZATION CHECK
// // // //         const session = await getServerSession(authOptions);
// // // //         if (!session || session.user.role !== 'delivery') {
// // // //             return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
// // // //         }

// // // //         const userId = session.user.id;

// // // //         // 2. CONNECT TO DATABASE
// // // //         await connectDB();

// // // //         // 3. VALIDATE ORDER ASSIGNMENT
// // // //         const order = await Order.findById(orderId);
// // // //         if (!order || order.assignedTo.toString() !== userId.toString()) {
// // // //             return NextResponse.json({ success: false, error: "Order not found or not assigned to you" }, { status: 404 });
// // // //         }

// // // //         // 4. PARSE BODY FOR NEW STATUS
// // // //         const { status } = await req.json();

// // // //         // 5. VALIDATE STATUS TRANSITION
// // // //         const validTransitions = {
// // // //             ready: ['out_for_delivery'],
// // // //             'out_for_delivery': ['delivered']
// // // //         };
// // // //         if (!validTransitions[order.status]?.includes(status)) {
// // // //             return NextResponse.json({ success: false, error: "Invalid status transition" }, { status: 400 });
// // // //         }

// // // //         // 6. UPDATE ORDER
// // // //         const updatedOrder = await Order.findByIdAndUpdate(
// // // //             orderId,
// // // //             { $set: { status, updatedAt: new Date() } },
// // // //             { new: true }
// // // //         ).populate('restaurant', 'name');

// // // //         return NextResponse.json({ success: true, data: updatedOrder });

// // // //     } catch (error) {
// // // //         console.error('Delivery Update Error:', error);
// // // //         return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
// // // //     }
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import { getServerSession } from 'next-auth';
// // // import connectDB from '@/lib/db';
// // // import { Order } from '@/lib/models'; 
// // // import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 

// // // export async function PUT(req, { params }) {
// // //     await connectDB();
// // //     
// // //     const session = await getServerSession(authOptions);
// // //     if (!session || session.user?.role !== 'delivery') {
// // //         return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 403 });
// // //     }

// // //     const { orderId } = params;
// // //     const { status: newStatus } = await req.json();

// // //     // 🔑 Status Consistency Check: Uses underscore
// // //     if (!newStatus || !['out_for_delivery', 'delivered'].includes(newStatus)) { 
// // //         return NextResponse.json({ success: false, error: 'Invalid status provided.' }, { status: 400 });
// // //     }

// // //     try {
// // //         const userId = session.user.id;

// // //         // 🔑 CONSISTENCY: Atomic query with status checks
// // //         const updatedOrder = await Order.findOneAndUpdate(
// // //             { 
// // //                 _id: orderId,
// // //                 $or: [
// // //                     { status: 'ready', assignedTo: null }, 
// // //                     { assignedTo: userId, status: 'out_for_delivery' } // Uses underscore
// // //                 ],
// // //             },
// // //             { 
// // //                 status: newStatus,
// // //                 assignedTo: newStatus === 'out_for_delivery' ? userId : undefined, // Uses underscore
// // //                 actualDeliveryTime: newStatus === 'delivered' ? Date.now() : undefined,
// // //                 updatedAt: Date.now()
// // //             },
// // //             { new: true }
// // //         );

// // //         if (!updatedOrder) {
// // //             return NextResponse.json({ success: false, error: 'Order not eligible for this action.' }, { status: 404 });
// // //         }

// // //         return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });

// // //     } catch (error) {
// // //         console.error("Delivery Status Update Error:", error);
// // //         return NextResponse.json({ success: false, error: 'Internal server error during update.' }, { status: 500 });
// // //     }
// // // }
// // import { NextResponse } from 'next/server';
// // import { getServerSession } from 'next-auth';
// // import connectDB from '@/lib/db';
// // import { Order } from '@/lib/models'; 
// // import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 

// // export async function PUT(req, { params }) {
// //     await connectDB();
    
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user?.role !== 'delivery') {
// //         return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 403 });
// //     }

// //     const { orderId } = params;
// //     const { status: newStatus } = await req.json();

// //     if (!newStatus || !['out_for_delivery', 'delivered'].includes(newStatus)) {
// //         return NextResponse.json({ success: false, error: 'Invalid status provided.' }, { status: 400 });
// //     }

// //     try {
// //         const userId = session.user.id;

// //         // 🔑 ATOMIC QUERY: Finds the order and performs the assignment/status update in one go
// //         const updatedOrder = await Order.findOneAndUpdate(
// //             { 
// //                 _id: orderId,
// //                 $or: [
// //                     // Condition 1: Taking the order (must be 'ready' and unassigned)
// //                     { status: 'ready', assignedTo: null, newStatus: 'out_for_delivery' }, 
// //                     // Condition 2: Completing the order (must be 'out_for_delivery' and assigned to me)
// //                     { assignedTo: userId, status: 'out_for_delivery', newStatus: 'delivered' } 
// //                 ],
// //             },
// //             { 
// //                 status: newStatus,
// //                 // Assigns the user ID if the status is transitioning to out_for_delivery
// //                 assignedTo: newStatus === 'out_for_delivery' ? userId : undefined, 
// //                 actualDeliveryTime: newStatus === 'delivered' ? Date.now() : undefined,
// //                 updatedAt: Date.now()
// //             },
// //             { new: true } // Returns the updated document
// //         );

// //         if (!updatedOrder) {
// //             return NextResponse.json({ success: false, error: 'Order not eligible for this action (Taken by another driver or status mismatch).' }, { status: 404 });
// //         }

// //         return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });

// //     } catch (error) {
// //         console.error("Delivery Status Update Error:", error);
// //         return NextResponse.json({ success: false, error: 'Internal server error during update.' }, { status: 500 });
// //     }
// // }
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import { Order } from '@/lib/models'; 
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 
// import mongoose from 'mongoose'; // Used for ObjectId validation

// export async function PUT(req, { params }) {
//     await connectDB();

//     // 🔑 1. AUTHORIZATION: Ensures only delivery partners can access this route
//     const session = await getServerSession(authOptions);
//     if (!session || session.user?.role !== 'delivery') {
//         return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 403 });
//     }

//     const userId = session.user.id;
//     // 🔑 2. GET ORDER ID FROM URL PARAMETERS (Corrected source)
//     const orderId = params.orderId; 
    
//     // 🔑 3. GET NEW STATUS FROM REQUEST BODY (Read req.json() only once)
//     const body = await req.json();
//     const newStatus = body.status;

//     // Validation
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//         return NextResponse.json({ success: false, error: 'Invalid order ID format.' }, { status: 400 });
//     }
//     if (!newStatus || !['out_for_delivery', 'delivered'].includes(newStatus)) {
//         return NextResponse.json({ success: false, error: 'Invalid status provided.' }, { status: 400 });
//     }
    
//     try {
//         // 🔑 4. ATOMIC QUERY: Finds the order and performs the assignment/status update
//         const updatedOrder = await Order.findOneAndUpdate(
//             { 
//                 _id: orderId,
//                 // Ensures only valid state transitions occur
//                 $or: [
//                     // A) Taking the order: Must be 'ready' AND unassigned (null)
//                     { status: 'ready', assignedTo: null, newStatus: 'out_for_delivery' }, 
//                     // B) Completing the order: Must be 'out_for_delivery' AND assigned to THIS driver
//                     { assignedTo: userId, status: 'out_for_delivery', newStatus: 'delivered' } 
//                 ],
//             },
//             { 
//                 status: newStatus,
//                 // Assigns the user ID if the status is transitioning to out_for_delivery (Taking the order)
//                 assignedTo: newStatus === 'out_for_delivery' ? userId : undefined, 
//                 // Set actual delivery time on completion
//                 actualDeliveryTime: newStatus === 'delivered' ? Date.now() : undefined,
//                 updatedAt: Date.now()
//             },
//             { new: true } // Returns the updated document
//         ).lean();

//         if (!updatedOrder) {
//             // Failure usually means another driver took it first (if status was 'ready')
//             // or the order status was already delivered/cancelled.
//             return NextResponse.json({ success: false, error: 'Order not eligible for this action (Status conflict or already claimed).' }, { status: 404 });
//         }

//         return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });

//     } catch (error) {
//         console.error("Delivery Status Update Error:", error);
//         return NextResponse.json({ success: false, error: 'Internal server error during update.' }, { status: 500 });
//     }
// }
// src/app/api/delivery/orders/[orderId]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { Order, User } from '@/lib/models';

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let userIdStr = session.user?.id || session.user?._id || null;
    let role = session.user?.role;

    if (!userIdStr || !role) {
      const dbUser = await User.findOne({ email: session.user.email }).select('_id role').lean();
      if (!dbUser) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }
      userIdStr = dbUser._id.toString();
      role = dbUser.role;
    }

    if (role !== "delivery") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    if (!mongoose.Types.ObjectId.isValid(userIdStr)) {
      return NextResponse.json({ success: false, error: "Invalid user id" }, { status: 400 });
    }

    const userObjectId = new mongoose.Types.ObjectId(userIdStr); // ✅ FIXED

    const orderId = params.orderId;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json({ success: false, error: "Invalid order id" }, { status: 400 });
    }

    const body = await req.json();
    const newStatus = body.status;

    let updatedOrder;

    if (newStatus === "out_for_delivery") {
      updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId, status: "ready", assignedTo: null },
        {
          $set: {
            status: "out_for_delivery",
            assignedTo: userObjectId,
            updatedAt: Date.now()
          }
        },
        { new: true }
      ).lean();
    } else if (newStatus === "delivered") {
      updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId, status: "out_for_delivery", assignedTo: userObjectId },
        {
          $set: {
            status: "delivered",
            actualDeliveryTime: Date.now(),
            updatedAt: Date.now()
          }
        },
        { new: true }
      ).lean();
    }

    if (!updatedOrder) {
      return NextResponse.json({
        success: false,
        error: "Order not eligible or already updated"
      }, { status: 409 });
    }

    const response = {
      ...updatedOrder,
      _id: updatedOrder._id.toString(),
      assignedTo: updatedOrder.assignedTo?.toString() || null
    };

    return NextResponse.json({ success: true, data: response });

  } catch (err) {
    console.error("Delivery PUT error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
