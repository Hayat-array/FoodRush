import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db"; 
import User from "@/lib/models";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

// PUT: Updates the user profile and settings
export async function PUT(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { profile, settings, addresses, paymentMethods } = data;

    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          name: profile.name,
          bio: profile.bio,
          image: profile.avatar, // Saves the base64 image string
          settings: settings,
          addresses: addresses,
          paymentMethods: paymentMethods
        }
      },
      { new: true } // Return the updated document
    ).select("-password"); // Exclude password from response

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Settings Update Error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

// GET: Fetches current user data to populate the form
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return structured data for the frontend
    return NextResponse.json({
      profile: {
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        avatar: user.image || ""
      },
      addresses: user.addresses || [],
      paymentMethods: user.paymentMethods || [],
      settings: user.settings || {}
    });
  } catch (error) {
    console.error("Settings Fetch Error:", error);
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}
