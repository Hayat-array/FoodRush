import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Order, User } from '@/lib/models';
import crypto from 'crypto';

// Hash OTP for comparison
function hashOTP(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
}

export async function POST(req) {
    try {
        await connectDB();

        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        // Verify user is a delivery partner
        const dbUser = await User.findOne({ email: session.user.email }).select('role').lean();
        if (!dbUser || dbUser.role !== 'delivery') {
            return NextResponse.json({
                success: false,
                error: "Only delivery partners can verify deliveries"
            }, { status: 403 });
        }

        const { orderId, otp } = await req.json();

        if (!orderId || !otp) {
            return NextResponse.json({
                success: false,
                error: "Order ID and OTP required"
            }, { status: 400 });
        }

        // Find order and explicitly select deliveryOTP field (it's hidden by default)
        const order = await Order.findById(orderId).select('status deliveryOTP otpGeneratedAt otpVerified');

        console.log('🔍 Verification attempt:', {
            orderId,
            providedOTP: otp,
            orderFound: !!order,
            orderStatus: order?.status,
            storedOTP: order?.deliveryOTP,
            match: order?.deliveryOTP === otp
        });

        if (!order) {
            return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
        }

        // Check if order is in correct status
        if (order.status !== 'out_for_delivery' && order.status !== 'out-for-delivery') {
            return NextResponse.json({
                success: false,
                error: `Order must be out for delivery. Current status: ${order.status}`
            }, { status: 400 });
        }

        // Check if OTP exists
        if (!order.deliveryOTP) {
            return NextResponse.json({
                success: false,
                error: "No OTP generated for this order"
            }, { status: 400 });
        }

        // Verify OTP (plain text comparison - OTPs are stored as plain text)
        if (order.deliveryOTP !== otp) {
            console.log('❌ OTP mismatch!', { expected: order.deliveryOTP, received: otp });
            return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 });
        }

        console.log('✅ OTP verified successfully!');

        // Update order status to delivered
        order.status = 'delivered';
        order.otpVerified = true;
        order.actualDeliveryTime = new Date();
        await order.save();

        console.log(`[Delivery Verified] Order ${order.orderNumber} delivered successfully`);

        return NextResponse.json({
            success: true,
            message: "Delivery verified successfully",
            order: {
                orderNumber: order.orderNumber,
                status: order.status,
                deliveredAt: order.actualDeliveryTime
            }
        });

    } catch (error) {
        console.error('Verify delivery error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
