import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import Notification from '@/lib/models/Notification';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// POST: Delivery partner accepts an order
export async function POST(request, { params }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || session.user.role !== 'delivery') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;

        // Use a transaction or atomic update to prevent double assignment
        const order = await Order.findOneAndUpdate(
            {
                _id: id,
                status: 'ready',
                deliveryPartnerId: null
            },
            {
                $set: {
                    deliveryPartnerId: session.user.id,
                    status: 'assigned'
                },
                $push: {
                    timeline: {
                        status: 'assigned',
                        timestamp: new Date(),
                        updatedBy: session.user.id,
                        note: 'Delivery partner assigned'
                    }
                }
            },
            { new: true }
        ).populate('customerId', 'name email').populate('restaurant', 'name');

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found or already assigned' },
                { status: 404 }
            );
        }

        // Notify Customer
        await Notification.create({
            userId: order.customerId._id,
            userRole: 'user',
            orderId: order._id,
            type: 'delivery_assigned',
            title: 'Delivery Partner Assigned',
            message: `${session.user.name} is assigned to your order`,
            data: {
                orderNumber: order.orderNumber,
                deliveryPartnerName: session.user.name
            }
        });

        // Notify Restaurant
        await Notification.create({
            userId: order.restaurant.owner || order.restaurant._id, // Adjust based on restaurant schema
            userRole: 'restaurant_owner',
            orderId: order._id,
            type: 'delivery_assigned',
            title: 'Delivery Partner Assigned',
            message: `${session.user.name} will pick up order #${order.orderNumber}`,
            data: {
                orderNumber: order.orderNumber,
                deliveryPartnerName: session.user.name
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Order accepted successfully',
            data: order
        });

    } catch (error) {
        console.error('Accept delivery error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to accept order' },
            { status: 500 }
        );
    }
}
