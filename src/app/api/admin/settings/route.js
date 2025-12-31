import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import { RestaurantSettings, User } from '@/lib/models';

// GET: Fetch restaurant settings
export async function GET(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        // Get user and verify admin role
        const user = await User.findOne({ email: session.user.email }).select('role restaurant');

        if (!user || !['admin', 'super_admin', 'manager'].includes(user.role)) {
            return NextResponse.json({ success: false, error: 'Forbidden - Admin access required' }, { status: 403 });
        }

        if (!user.restaurant) {
            return NextResponse.json({ success: false, error: 'No restaurant associated with this user' }, { status: 404 });
        }

        // Get or create settings
        let settings = await RestaurantSettings.findOne({ restaurant: user.restaurant })
            .populate('staff.user', 'name email')
            .lean();

        // If no settings exist, create default settings
        if (!settings) {
            settings = await RestaurantSettings.create({
                restaurant: user.restaurant,
                profile: {},
                availability: {
                    schedule: [
                        { day: 'monday', isOpen: true, slots: [{ openTime: '09:00', closeTime: '22:00' }] },
                        { day: 'tuesday', isOpen: true, slots: [{ openTime: '09:00', closeTime: '22:00' }] },
                        { day: 'wednesday', isOpen: true, slots: [{ openTime: '09:00', closeTime: '22:00' }] },
                        { day: 'thursday', isOpen: true, slots: [{ openTime: '09:00', closeTime: '22:00' }] },
                        { day: 'friday', isOpen: true, slots: [{ openTime: '09:00', closeTime: '22:00' }] },
                        { day: 'saturday', isOpen: true, slots: [{ openTime: '09:00', closeTime: '22:00' }] },
                        { day: 'sunday', isOpen: true, slots: [{ openTime: '09:00', closeTime: '22:00' }] }
                    ],
                    holidays: [],
                    temporaryClosed: { isActive: false },
                    autoToggle: true
                }
            });
        }

        return NextResponse.json({ success: true, data: settings }, { status: 200 });

    } catch (error) {
        console.error('Get settings error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT: Update restaurant settings
export async function PUT(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        // Get user and verify admin role
        const user = await User.findOne({ email: session.user.email }).select('role restaurant');

        if (!user || !['admin', 'super_admin', 'manager'].includes(user.role)) {
            return NextResponse.json({ success: false, error: 'Forbidden - Admin access required' }, { status: 403 });
        }

        if (!user.restaurant) {
            return NextResponse.json({ success: false, error: 'No restaurant associated with this user' }, { status: 404 });
        }

        const updates = await req.json();

        // Update settings
        const settings = await RestaurantSettings.findOneAndUpdate(
            { restaurant: user.restaurant },
            { $set: updates },
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json({
            success: true,
            data: settings,
            message: 'Settings updated successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Update settings error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
