import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import Notification from '@/lib/models/Notification';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// PATCH: Update Order Status
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
        const { status, note } = await request.json();

        const order = await Order.findById(id)
            .populate('customerId', 'name email')
            .populate('deliveryPartnerId', 'name phone');

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        const validStatuses = [
            'pending', 'pending_payment', 'accepted', 'preparing',
            'ready', 'assigned', 'picked_up', 'out_for_delivery',
            'nearby', 'delivered', 'cancelled'
        ];

        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, error: 'Invalid status' },
                { status: 400 }
            );
        }

        // Update order status
        order.status = status;
        order.addTimelineEntry(status, session.user.id, note || `Status updated to ${status}`);
        await order.save();

        // Create notifications based on status
        const notificationMap = {
            'accepted': { title: 'Order Accepted', message: 'Your order is being prepared' },
            'preparing': { title: 'Order Preparing', message: 'Your food is being prepared' },
            'ready': { title: 'Order Ready', message: 'Your order is ready for pickup' },
            'assigned': { title: 'Delivery Assigned', message: 'A delivery partner has been assigned' },
            'picked_up': { title: 'Order Picked Up', message: 'Your order is on its way' },
            'out_for_delivery': { title: 'Out for Delivery', message: 'Your order is out for delivery' },
            'nearby': { title: 'Delivery Nearby', message: 'Your delivery partner is nearby' },
            'delivered': { title: 'Order Delivered', message: 'Your order has been delivered' },
            'cancelled': { title: 'Order Cancelled', message: 'Your order has been cancelled' }
        };

        if (notificationMap[status]) {
            await Notification.create({
                userId: order.customerId,
                userRole: 'user',
                orderId: order._id,
                type: `order_${status}`,
                title: notificationMap[status].title,
                message: `Order #${order.orderNumber}: ${notificationMap[status].message}`,
                data: {
                    orderNumber: order.orderNumber,
                    status
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });

    } catch (error) {
        console.error('Update status error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update status' },
            { status: 500 }
        );
    }
}
