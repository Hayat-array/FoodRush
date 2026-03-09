import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password, phone, role = 'user', restaurantName, adminKey, adminSecretName, dob } = await request.json();

    // Validation
    if (!name || !email || !password || !phone) {
      console.log('⚠️ Signup failed: Missing required fields');
      return NextResponse.json({
        success: false,
        message: 'Please provide all required fields: name, email, password, and phone'
      }, { status: 400 });
    }

    // Role-specific validation
    if (role === 'super_admin') {
      // 1. Verify Admin Key
      if (adminKey !== process.env.ADMIN_KEY) {
        return NextResponse.json({ success: false, message: 'Invalid Admin Key' }, { status: 403 });
      }

      // 2. Verify Admin Secret Name
      if (adminSecretName !== process.env.ADMIN_NAME) {
        return NextResponse.json({ success: false, message: 'Invalid Authority Name' }, { status: 403 });
      }

      // 3. Verify DOB (Age > 18)
      if (!dob) {
        return NextResponse.json({ success: false, message: 'Date of Birth is required for Super Admin' }, { status: 400 });
      }
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        return NextResponse.json({ success: false, message: 'You must be at least 18 years old to be a Super Admin' }, { status: 403 });
      }
    }

    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        message: 'Password must be at least 6 characters long'
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      console.log('⚠️ Signup failed: User already exists with email or phone');
      return NextResponse.json({
        success: false,
        message: 'User with this email or phone already exists'
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    await user.save();

    // Log restaurant name for future use (can be used to create restaurant later)
    if (restaurantName && role === 'restaurant_owner') {
      console.log(`✅ Admin user created: ${email} with restaurant: ${restaurantName}`);
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to create user'
    }, { status: 500 });
  }
}
