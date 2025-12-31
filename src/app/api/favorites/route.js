import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { User, Restaurant } from '@/lib/models';

// GET: List Favorite Restaurants
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email }).populate('favoriteRestaurants');

    return NextResponse.json({ success: true, data: user.favoriteRestaurants || [] });
  } catch (error) {
    console.error("Fav GET Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Toggle Favorite
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { restaurantId } = await req.json();

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    if (!user.favoriteRestaurants) user.favoriteRestaurants = [];

    const isFavorite = user.favoriteRestaurants.includes(restaurantId);

    if (isFavorite) {
      user.favoriteRestaurants = user.favoriteRestaurants.filter(id => id.toString() !== restaurantId);
    } else {
      user.favoriteRestaurants.push(restaurantId);
    }

    await user.save();

    return NextResponse.json({ success: true, isFavorite: !isFavorite });
  } catch (error) {
    console.error("Fav POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}