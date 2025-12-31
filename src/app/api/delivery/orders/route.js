// src/app/api/delivery/orders/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { Order, User } from '@/lib/models';

export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let userIdStr = session.user?.id || session.user?._id || null;
    let role = session.user?.role ?? null;

    if (!userIdStr || !role) {
      const dbUser = await User.findOne({ email: session.user.email }).select('_id role').lean();
      if (!dbUser) {
        return NextResponse.json({ success: false, error: "User record not found" }, { status: 404 });
      }
      userIdStr = dbUser._id.toString();
      role = dbUser.role;
    }

    if (role !== 'delivery') {
      return NextResponse.json({ success: false, error: "Forbidden - not a delivery user" }, { status: 403 });
    }

    if (!mongoose.Types.ObjectId.isValid(userIdStr)) {
      return NextResponse.json({ success: false, error: "Invalid user id" }, { status: 400 });
    }

    // Fetch orders: Show ready orders and all out_for_delivery orders
    const orders = await Order.find({
      $or: [
        { status: 'ready', assignedTo: null },
        { status: 'out_for_delivery' } // Show all out_for_delivery orders
      ]
    })
      .select('+assignedTo customer deliveryAddress deliveryOTP orderNumber total status items')
      .populate({ path: 'restaurant', select: 'name address contact deliveryFee' })
      .sort({ createdAt: 1 })
      .lean();

    console.log(`[Delivery Orders API] User ID: ${userIdStr}, Found ${orders.length} orders`);
    if (orders.length > 0) {
      console.log('[Delivery Orders API] Sample order:', {
        orderNumber: orders[0].orderNumber,
        status: orders[0].status,
        assignedTo: orders[0].assignedTo
      });
    }

    const data = orders.map(o => ({
      ...o,
      _id: o._id.toString(),
      assignedTo: o.assignedTo ? o.assignedTo.toString() : null,
      restaurant: o.restaurant
        ? { ...o.restaurant, _id: o.restaurant._id.toString() }
        : null,
      createdAt: o.createdAt?.toISOString(),
      updatedAt: o.updatedAt?.toISOString()
    }));

    return NextResponse.json({ success: true, data });

  } catch (err) {
    console.error("Delivery orders GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
