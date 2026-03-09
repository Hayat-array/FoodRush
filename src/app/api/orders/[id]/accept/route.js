import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import Notification from '@/lib/models/Notification';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// PATCH: Accept Order (Restaurant Owner)
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
        const order = await Order.findById(id).populate('customerId', 'name email');

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Update order status
        order.status = 'accepted';
        order.addTimelineEntry('accepted', session.user.id, 'Restaurant accepted the order');
        await order.save();

        // Notify customer
        await Notification.create({
            userId: order.customerId,
            userRole: 'user',
            orderId: order._id,
            type: 'order_accepted',
            title: 'Order Accepted',
            message: `Your order #${order.orderNumber} has been accepted and is being prepared`,
            data: {
                orderNumber: order.orderNumber,
                estimatedTime: order.estimatedDeliveryTime
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Order accepted successfully',
            data: order
        });

    } catch (error) {
        console.error('Accept order error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to accept order' },
            { status: 500 }
        );
    }
}
