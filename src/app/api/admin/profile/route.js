import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import { RestaurantSettings, User } from '@/lib/models';

// PUT: Update restaurant profile
export async function PUT(req) {
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

        const profileData = await req.json();

        const settings = await RestaurantSettings.findOneAndUpdate(
            { restaurant: user.restaurant },
            { $set: { profile: profileData } },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            success: true,
            data: settings.profile,
            message: 'Profile updated successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
