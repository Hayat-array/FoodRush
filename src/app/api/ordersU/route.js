import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Order, User, Restaurant } from '@/lib/models';

// GET: Get My Orders
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Find orders where customer.email matches logged in user
    // Using .populate to get restaurant details (name, image)
    const orders = await Order.find({ "customer.email": session.user.email })
      .populate('restaurant', 'name coverImage') 
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Place New Order
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { items, total, deliveryAddress, restaurantId } = await req.json();

    // Create Order
    const newOrder = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      customer: {
        name: session.user.name,
        email: session.user.email,
        phone: "9999999999", // You should fetch this from User profile realistically
      },
      restaurant: restaurantId,
      items: items.map(item => ({
        dish: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      deliveryType: 'delivery',
      deliveryAddress,
      paymentMethod: 'cod', // Hardcoded for demo
      subtotal: total,
      total: total,
      status: 'pending'
    });

    return NextResponse.json({ success: true, data: newOrder });

  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}