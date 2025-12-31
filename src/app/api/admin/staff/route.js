import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import { RestaurantSettings, User } from '@/lib/models';

// GET: List all staff members
export async function GET(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email }).select('role restaurant');

        if (!user || !['admin', 'super_admin', 'manager'].includes(user.role)) {
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
        }

        const settings = await RestaurantSettings.findOne({ restaurant: user.restaurant })
            .populate('staff.user', 'name email phone')
            .lean();

        if (!settings) {
            return NextResponse.json({ success: true, data: [] }, { status: 200 });
        }

        return NextResponse.json({ success: true, data: settings.staff || [] }, { status: 200 });

    } catch (error) {
        console.error('Get staff error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Add new staff member
export async function POST(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email }).select('role restaurant');

        if (!user || !['admin', 'super_admin'].includes(user.role)) {
            return NextResponse.json({ success: false, error: 'Forbidden - Super admin access required' }, { status: 403 });
        }

        const { userId, role, permissions } = await req.json();

        if (!userId || !role) {
            return NextResponse.json({ success: false, error: 'User ID and role are required' }, { status: 400 });
        }

        // Verify the user exists
        const staffUser = await User.findById(userId);
        if (!staffUser) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // Add staff member
        const settings = await RestaurantSettings.findOneAndUpdate(
            { restaurant: user.restaurant },
            {
                $push: {
                    staff: {
                        user: userId,
                        role,
                        permissions: permissions || {},
                        isActive: true
                    }
                }
            },
            { new: true, upsert: true }
        ).populate('staff.user', 'name email');

        return NextResponse.json({
            success: true,
            data: settings.staff,
            message: 'Staff member added successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Add staff error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
