import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Extract all fields
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const avatar = typeof body.avatar === "string" ? body.avatar.trim() : "";
    const bikeNumber = typeof body.bikeNumber === "string" ? body.bikeNumber.trim().toUpperCase() : "";
    const licenseNumber = typeof body.licenseNumber === "string" ? body.licenseNumber.trim().toUpperCase() : "";
    const address = typeof body.address === "string" ? body.address.trim() : "";
    const emergencyContact = typeof body.emergencyContact === "string" ? body.emergencyContact.trim() : "";
    const emergencyContactName = typeof body.emergencyContactName === "string" ? body.emergencyContactName.trim() : "";

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, email, password, phone)." },
        { status: 400 }
      );
    }

    // Validate delivery-specific fields
    if (!bikeNumber || !licenseNumber || !address) {
      return NextResponse.json(
        { success: false, error: "Missing delivery details (bike number, license, address)." },
        { status: 400 }
      );
    }

    if (!emergencyContact || !emergencyContactName) {
      return NextResponse.json(
        { success: false, error: "Missing emergency contact details." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const roleNames = {
        'user': 'Customer',
        'restaurant_owner': 'Restaurant Owner',
        'delivery': 'Delivery Partner',
        'super_admin': 'Admin'
      };
      const roleName = roleNames[existingUser.role] || existingUser.role;

      return NextResponse.json(
        {
          success: false,
          error: `This email is already registered as a ${roleName}. Please sign in instead or use a different email.`
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new delivery user with all details
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      avatar: avatar || undefined,
      role: "delivery",
      isAvailable: true,
      // Delivery-specific fields
      deliveryDetails: {
        bikeNumber,
        licenseNumber,
        address,
        emergencyContact,
        emergencyContactName,
        isVerified: false, // Requires admin verification
        rating: 0,
        totalDeliveries: 0,
      },
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "Delivery partner registered successfully. Awaiting admin verification.",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Delivery Signup Error:", error);
    if (error?.name === "ValidationError") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}

// Friendly GET: redirect browser users to the signup UI instead of returning 405
export async function GET(request) {
  try {
    // Build a redirect to the signup page on the same origin
    const url = new URL(request.url);
    url.pathname = "/auth/delivery/signup";
    return NextResponse.redirect(url.toString(), 302);
  } catch (err) {
    return NextResponse.json({ success: false, error: "Method not allowed. Use POST." }, { status: 405 });
  }
}

// Support OPTIONS for CORS preflight if some client uses cross-origin requests
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, GET, OPTIONS",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}