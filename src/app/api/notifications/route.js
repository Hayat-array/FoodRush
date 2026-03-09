import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Notification from '@/lib/models/Notification';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET: Get user notifications
export async function GET(request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const unreadOnly = searchParams.get('unreadOnly') === 'true';
        const limit = parseInt(searchParams.get('limit') || '50');

        const query = { userId: session.user.id };
        if (unreadOnly) {
            query.read = false;
        }

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('orderId', 'orderNumber status total');

        const unreadCount = await Notification.countDocuments({
            userId: session.user.id,
            read: false
        });

        return NextResponse.json({
            success: true,
            data: notifications,
            unreadCount
        });

    } catch (error) {
        console.error('Fetch notifications error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch notifications' },
            { status: 500 }
        );
    }
}
