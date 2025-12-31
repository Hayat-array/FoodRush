import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

// You might need to import your authOptions if getServerSession requires it in your setup
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function GET(req) {
  try {
    await connectDB();

    // 1. Check Authentication
    const session = await getServerSession(); // Pass authOptions here if needed

    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch User Data (excluding password)
    const user = await User.findOne({ email: session.user.email }).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    // 1. Check Authentication
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get Data from Request
    const body = await req.json();
    const { name, phone, avatar, addresses } = body;

    // 3. Update User
    // We only allow updating specific fields for security
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          name,
          phone,
          avatar,
          addresses,
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true } // Return the updated document
    ).select('-password');

    return NextResponse.json({ success: true, data: updatedUser, message: "Profile updated successfully" });

  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}