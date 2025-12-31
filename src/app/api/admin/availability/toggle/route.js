import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import { RestaurantSettings, User } from '@/lib/models';

// PUT: Toggle temporary close/open
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

        const { isActive, reason, until } = await req.json();

        const settings = await RestaurantSettings.findOneAndUpdate(
            { restaurant: user.restaurant },
            {
                $set: {
                    'availability.temporaryClosed': {
                        isActive: isActive || false,
                        reason: reason || '',
                        until: until || null
                    }
                }
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            success: true,
            data: settings.availability.temporaryClosed,
            message: isActive ? 'Restaurant temporarily closed' : 'Restaurant reopened'
        }, { status: 200 });

    } catch (error) {
        console.error('Toggle availability error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
