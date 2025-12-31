import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { restaurantId } = await req.json();
    const email = session.user.email;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Check if restaurant is already in favorites
    const isFavorite = user.favoriteRestaurants.includes(restaurantId);

    if (isFavorite) {
      // Remove
      user.favoriteRestaurants = user.favoriteRestaurants.filter(
        (id) => id.toString() !== restaurantId
      );
    } else {
      // Add
      user.favoriteRestaurants.push(restaurantId);
    }

    await user.save();

    return NextResponse.json({ 
      success: true, 
      isFavorite: !isFavorite,
      message: isFavorite ? "Removed from favorites" : "Added to favorites" 
    });

  } catch (error) {
    console.error("Toggle Favorite Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}