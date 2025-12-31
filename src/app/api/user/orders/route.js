import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Order, Restaurant } from '@/lib/models'; // Ensure this matches your models index export

export async function GET(req) {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Check Authentication Session
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // 3. Fetch Orders
    // We search for orders where 'customer.email' matches the logged-in user
    const orders = await Order.find({ "customer.email": session.user.email })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate({
        path: 'restaurant',
        select: 'name coverImage slug address' // Only fetch necessary restaurant fields
      });

    return NextResponse.json({ success: true, data: orders });

  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}