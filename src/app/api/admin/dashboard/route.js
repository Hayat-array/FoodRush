import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Order, Restaurant, Dish, User } from '@/lib/models';

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 1. Find Admin & Their Restaurant
    const user = await User.findOne({ email: session.user.email });
    const restaurant = await Restaurant.findOne({ owner: user._id });

    if (!restaurant) {
      return NextResponse.json({ success: false, error: "No restaurant found." }, { status: 404 });
    }

    // 2. Fetch Data in Parallel for Speed
    const [orders, dishesCount] = await Promise.all([
      Order.find({ restaurant: restaurant._id }).sort({ createdAt: -1 }), // Get all orders
      Dish.countDocuments({ restaurant: restaurant._id }) // Count menu items
    ]);

    // 3. Calculate Stats
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const totalOrders = orders.length;
    
    const activeOrders = orders.filter(o => 
      ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(o.status)
    ).length;

    // 4. Get Top 5 Recent Orders for the list
    const recentOrders = orders.slice(0, 5).map(order => ({
      id: order.orderNumber,
      customer: order.customer.name,
      total: order.total,
      status: order.status,
      time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date(order.createdAt).toLocaleDateString()
    }));

    return NextResponse.json({
      success: true,
      data: {
        restaurantName: restaurant.name,
        stats: {
          revenue: totalRevenue,
          orders: totalOrders,
          menuItems: dishesCount,
          activeOrders: activeOrders
        },
        recentOrders
      }
    });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}