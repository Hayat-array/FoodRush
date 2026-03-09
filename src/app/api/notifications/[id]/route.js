import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Notification from '@/lib/models/Notification';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// PATCH: Mark notification as read
export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        const { id } = params;

        const notification = await Notification.findOneAndUpdate(
            { _id: id, userId: session.user.id },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return NextResponse.json(
                { success: false, error: 'Notification not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: notification
        });

    } catch (error) {
        console.error('Mark notification read error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update notification' },
            { status: 500 }
        );
    }
}
