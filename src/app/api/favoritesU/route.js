import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { Restaurant } from '@/lib/models'; // Import to register model

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email }).populate('favorites');
    
    // Note: Ensure your User schema has: favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
    return NextResponse.json({ success: true, data: user.favorites || [] });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}