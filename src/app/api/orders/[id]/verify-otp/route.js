import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import Notification from '@/lib/models/Notification';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// POST: Verify OTP and Complete Delivery
export async function POST(request, { params }) {
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
        const { otp } = await request.json();

        if (!otp) {
            return NextResponse.json(
                { success: false, error: 'OTP is required' },
                { status: 400 }
            );
        }

        const order = await Order.findById(id)
            .populate('customerId', 'name email')
            .populate('deliveryPartnerId', 'name phone');

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Verify OTP
        const verificationResult = order.verifyOTP(otp);

        if (!verificationResult.success) {
            return NextResponse.json(
                { success: false, error: verificationResult.message },
                { status: 400 }
            );
        }

        // Update order status to delivered
        order.status = 'delivered';
        order.actualDeliveryTime = new Date();
        order.addTimelineEntry('delivered', session.user.id, 'Order delivered and OTP verified');
        await order.save();

        // Notify customer
        await Notification.create({
            userId: order.customerId,
            userRole: 'user',
            orderId: order._id,
            type: 'order_delivered',
            title: 'Order Delivered',
            message: `Your order #${order.orderNumber} has been successfully delivered`,
            data: {
                orderNumber: order.orderNumber,
                deliveredAt: order.actualDeliveryTime
            }
        });

        // Notify delivery partner
        if (order.deliveryPartnerId) {
            await Notification.create({
                userId: order.deliveryPartnerId,
                userRole: 'delivery',
                orderId: order._id,
                type: 'order_delivered',
                title: 'Delivery Completed',
                message: `Order #${order.orderNumber} delivered successfully`,
                data: {
                    orderNumber: order.orderNumber
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: 'OTP verified successfully. Order delivered!',
            data: order
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}
