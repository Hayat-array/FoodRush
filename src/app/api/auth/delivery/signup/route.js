// // // // // import { NextResponse } from 'next/server';
// // // // // import connectDB from '@/lib/db';
// // // // // import { User } from '@/lib/models'; // Assuming User model is exported
// // // // // import bcrypt from 'bcryptjs';

// // // // // export async function POST(req) {
// // // // //   try {
// // // // //     await connectDB();

// // // // //     const { name, email, password } = await req.json();

// // // // //     if (!name || !email || !password) {
// // // // //       return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
// // // // //     }

// // // // //     // Check if user already exists
// // // // //     const existingUser = await User.findOne({ email });
// // // // //     if (existingUser) {
// // // // //       return NextResponse.json({ success: false, error: "A user with this email already exists." }, { status: 409 });
// // // // //     }

// // // // //     // Hash the password
// // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // //     // Create the new Delivery Man User
// // // // //     const newUser = new User({
// // // // //       name,
// // // // //       email,
// // // // //       password: hashedPassword,
// // // // //       role: 'delivery', // <-- CRITICAL: Set the role to 'delivery'
// // // // //       isAvailable: true,
// // // // //     });

// // // // //     await newUser.save();

// // // // //     return NextResponse.json({ 
// // // // //       success: true, 
// // // // //       message: "Delivery partner registered successfully.",
// // // // //     }, { status: 201 });

// // // // //   } catch (error) {
// // // // //     console.error("Delivery Signup Error:", error);
// // // // //     return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
// // // // //   }
// // // // // }
// // // // // export async function GET(req) {
// // // // //   return new Response("Method not supported for direct access.", { status: 405 });
// // // // // }
// // // // import { NextResponse } from 'next/server';
// // // // // ⚠️ Ensure connectDB and User are correctly imported from your models file
// // // // import connectDB from '@/lib/db'; 
// // // // import { User } from '@/lib/models'; 
// // // // import bcrypt from 'bcryptjs';

// // // // export async function POST(req) {
// // // //   try {
// // // //     // 1. Connect to DB
// // // //     await connectDB(); 

// // // //     // 2. CRITICAL FIX: Destructure the required 'phone' field
// // // //     const { name, email, password, phone } = await req.json();

// // // //     // 3. Validation: Check all required fields (including phone)
// // // //     if (!name || !email || !password || !phone) {
// // // //       return NextResponse.json({ success: false, error: "Missing required fields (name, email, password, phone)." }, { status: 400 });
// // // //     }

// // // //     // 4. Check if user already exists
// // // //     const existingUser = await User.findOne({ email });
// // // //     if (existingUser) {
// // // //       return NextResponse.json({ success: false, error: "A user with this email already exists." }, { status: 409 });
// // // //     }

// // // //     // 5. Hash the password
// // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // //     // 6. Create the new Delivery Man User
// // // //     const newUser = new User({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       phone, // 💡 FIX: Include the required phone field here
// // // //       role: 'delivery', // CRITICAL: Set the role to 'delivery'
// // // //       isAvailable: true,
// // // //     });

// // // //     await newUser.save();

// // // //     return NextResponse.json({ 
// // // //       success: true, 
// // // //       message: "Delivery partner registered successfully.",
// // // //       user: {
// // // //         name: newUser.name,
// // // //         email: newUser.email,
// // // //         role: newUser.role,
// // // //       }
// // // //     }, { status: 201 });

// // // //   } catch (error) {
// // // //     console.error("Delivery Signup Error:", error);

// // // //     // Improved error handling for Mongoose validation or other specific errors
// // // //     if (error.name === 'ValidationError') {
// // // //         return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// // // //     }

// // // //     return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
// // // //   }
// // // // }

// // // // // Handles browser checks and rejects direct access appropriately
// // // // export async function GET(req) {
// // // //   // This explicitly handles the GET request and sends a clean 405 response, 
// // // //   // preventing Next.js from reporting an "internal" error about a missing handler.
// // // //   return new Response(
// // // //     JSON.stringify({ success: false, error: 'Method not allowed for this path. Use POST.' }),
// // // //     { 
// // // //       status: 405,
// // // //       headers: { 'Allow': 'POST' }
// // // //     }
// // // //   );
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import { User, connectDB } from '@/lib/models'; // Import User and connectDB
// // // import bcrypt from 'bcryptjs';

// // // export async function POST(req) {
// // //   try {
// // //     await connectDB(); 

// // //     // 💡 FIXED: Destructuring the required 'phone' field
// // //     const { name, email, password, phone } = await req.json();

// // //     if (!name || !email || !password || !phone) {
// // //       return NextResponse.json({ success: false, error: "Missing required fields (name, email, password, phone)." }, { status: 400 });
// // //     }

// // //     const existingUser = await User.findOne({ email });
// // //     if (existingUser) {
// // //       return NextResponse.json({ success: false, error: "A user with this email already exists." }, { status: 409 });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     const newUser = new User({
// // //       name,
// // //       email,
// // //       password: hashedPassword,
// // //       phone, // 👈 CRITICAL: Saves the phone field
// // //       role: 'delivery',
// // //       isAvailable: true,
// // //     });

// // //     await newUser.save();

// // //     return NextResponse.json({ 
// // //       success: true, 
// // //       message: "Delivery partner registered successfully.",
// // //     }, { status: 201 });

// // //   } catch (error) {
// // //     console.error("Delivery Signup Error:", error);

// // //     if (error.name === 'ValidationError') {
// // //         return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// // //     }

// // //     return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
// // //   }
// // // }

// // // // Handles browser checks and rejects direct access appropriately
// // // export async function GET(req) {
// // //   return new Response(JSON.stringify({ success: false, error: 'Method not allowed for this path. Use POST.' }), { 
// // //     status: 405,
// // //     headers: { 'Allow': 'POST' }
// // //   });
// // // }
// // import { NextResponse } from 'next/server';
// // import { User, connectDB } from '@/lib/models'; // Import User and connectDB
// // import bcrypt from 'bcryptjs';

// // export async function POST(req) {
// //   try {
// //     await connectDB(); 

// //     // 💡 FIXED: Destructuring the required 'phone' field
// //     const { name, email, password, phone } = await req.json();

// //     if (!name || !email || !password || !phone) {
// //       return NextResponse.json({ success: false, error: "Missing required fields (name, email, password, phone)." }, { status: 400 });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return NextResponse.json({ success: false, error: "A user with this email already exists." }, { status: 409 });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       phone, // 👈 CRITICAL: Saves the phone field
// //       role: 'delivery',
// //       isAvailable: true,
// //     });

// //     await newUser.save();

// //     return NextResponse.json({ 
// //       success: true, 
// //       message: "Delivery partner registered successfully.",
// //     }, { status: 201 });

// //   } catch (error) {
// //     console.error("Delivery Signup Error:", error);

// //     if (error.name === 'ValidationError') {
// //         return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// //     }

// //     return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
// //   }
// // }

// // // Handles browser checks and rejects direct access appropriately
// // export async function GET(req) {
// //   return new Response(JSON.stringify({ success: false, error: 'Method not allowed for this path. Use POST.' }), { 
// //     status: 405,
// //     headers: { 'Allow': 'POST' }
// //   });
// // }
// // app/api/auth/delivery/signup/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db'; // 🔄 Changed: Import the connection function
// import { User } from '@/lib/models'; // 🔄 Changed: Import User from the models index
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     await connectDB();
//     const body = await request.json();
//     const name = typeof body.name === "string" ? body.name.trim() : "";
//     const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
//     const password = typeof body.password === "string" ? body.password : "";
//     const phone = typeof body.phone === "string" ? body.phone.trim() : "";

//     if (!name || !email || !password || !phone) {
//       return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json({ success: false, error: "Invalid email." }, { status: 400 });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json({ success: false, error: "Email already registered." }, { status: 409 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword, phone, role: "delivery", isAvailable: true });
//     await newUser.save();

//     return NextResponse.json({
//       success: true,
//       message: "Delivery partner registered successfully.",
//       user: { id: newUser._id.toString(), name: newUser.name, email: newUser.email, role: newUser.role }
//     }, { status: 201 });

//   } catch (err) {
//     console.error("Delivery Signup Error:", err);
//     return NextResponse.json({ success: false, error: err?.message || "Internal server error" }, { status: 500 });
//   }
// }

// // Redirect browser GETs to the signup UI so visiting the API URL doesn't return 405
// export async function GET(request) {
//   try {
//     const url = new URL(request.url);
//     url.pathname = "/auth/delivery/signup"; // frontend signup page
//     return NextResponse.redirect(url.toString(), 302);
//   } catch (err) {
//     return NextResponse.json({ success: false, error: "Method not allowed. Use POST." }, { status: 405 });
//   }
// }

// // Optional: OPTIONS for CORS preflight
// export function OPTIONS() {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       Allow: "POST, GET, OPTIONS",
//       "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, email, password, phone)." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "A user with this email already exists." },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "delivery",
      isAvailable: true,
    });
    await newUser.save();
    return NextResponse.json(
      {
        success: true,
        message: "Delivery partner registered successfully.",
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