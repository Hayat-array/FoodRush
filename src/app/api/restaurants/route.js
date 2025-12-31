import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Restaurant } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const restaurants = await Restaurant.find({ isActive: true })
      .select('-owner -__v')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: restaurants });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}