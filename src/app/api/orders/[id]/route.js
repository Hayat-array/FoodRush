import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET: Get single order details
export async function GET(request, { params }) {
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

        const order = await Order.findById(id)
            .populate('customerId', 'name email phone')
            .populate('restaurant', 'name address phone coverImage')
            .populate('deliveryPartnerId', 'name phone')
            .lean();

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Check if user has access to this order
        const isCustomer = order.customerId?._id?.toString() === session.user.id;
        const isRestaurant = order.restaurant?._id?.toString() === session.user.id;
        const isDelivery = order.deliveryPartnerId?._id?.toString() === session.user.id;

        if (!isCustomer && !isRestaurant && !isDelivery && session.user.role !== 'super_admin') {
            return NextResponse.json(
                { success: false, error: 'Access denied' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error('Fetch order error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch order' },
            { status: 500 }
        );
    }
}
