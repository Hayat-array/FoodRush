import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import { RestaurantSettings, User } from '@/lib/models';

// PUT: Update staff member
export async function PUT(req, { params }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email }).select('role restaurant');

        if (!user || !['admin', 'super_admin'].includes(user.role)) {
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
        }

        const { id } = params;
        const updates = await req.json();

        const settings = await RestaurantSettings.findOneAndUpdate(
            {
                restaurant: user.restaurant,
                'staff._id': id
            },
            {
                $set: {
                    'staff.$.role': updates.role,
                    'staff.$.permissions': updates.permissions,
                    'staff.$.isActive': updates.isActive
                }
            },
            { new: true }
        ).populate('staff.user', 'name email');

        if (!settings) {
            return NextResponse.json({ success: false, error: 'Staff member not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: settings.staff,
            message: 'Staff member updated successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Update staff error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove staff member
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email }).select('role restaurant');

        if (!user || !['admin', 'super_admin'].includes(user.role)) {
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
        }

        const { id } = params;

        const settings = await RestaurantSettings.findOneAndUpdate(
            { restaurant: user.restaurant },
            {
                $pull: {
                    staff: { _id: id }
                }
            },
            { new: true }
        );

        if (!settings) {
            return NextResponse.json({ success: false, error: 'Settings not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Staff member removed successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Delete staff error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
