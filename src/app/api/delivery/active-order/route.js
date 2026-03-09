import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET: Get active delivery for the logged-in delivery partner
export async function GET(request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || session.user.role !== 'delivery') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Find incomplete orders assigned to this partner
        const activeOrder = await Order.findOne({
            deliveryPartnerId: session.user.id,
            status: { $in: ['assigned', 'picked_up', 'out_for_delivery', 'nearby'] }
        })
            .populate('restaurant', 'name address phone')
            .populate('customerId', 'name phone')
            .lean();

        // If no active order found, return null data
        if (!activeOrder) {
            return NextResponse.json({
                success: true,
                data: null
            });
        }

        return NextResponse.json({
            success: true,
            data: activeOrder
        });

    } catch (error) {
        console.error('Fetch active delivery error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch active delivery' },
            { status: 500 }
        );
    }
}
