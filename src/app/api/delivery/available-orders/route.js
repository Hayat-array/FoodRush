import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET: Get available orders for delivery (ready for pickup and not assigned)
export async function GET(request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || session.user.role !== 'delivery') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized access' },
                { status: 401 }
            );
        }

        // Find orders that are 'ready' and have no delivery partner assigned
        // You might want to filter by location in a real app
        const orders = await Order.find({
            status: 'ready',
            deliveryPartnerId: null
        })
            .populate('restaurant', 'name address phone coverImage')
            .populate('customerId', 'name phone') // Caution with exposing customer info before acceptance
            .sort({ updatedAt: -1 }); // Newest first

        // Sanitize data - maybe don't show full customer details until accepted
        const sanitizedOrders = orders.map(order => ({
            _id: order._id,
            orderNumber: order.orderNumber,
            restaurant: order.restaurant,
            deliveryAddress: {
                city: order.deliveryAddress.city,
                // Show approximate location or distance
            },
            total: order.total,
            itemsCount: order.items.length,
            createdAt: order.createdAt
        }));

        return NextResponse.json({
            success: true,
            data: sanitizedOrders
        });

    } catch (error) {
        console.error('Fetch available orders error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
