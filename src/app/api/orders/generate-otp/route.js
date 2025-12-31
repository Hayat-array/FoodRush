import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Order } from '@/lib/models';
import crypto from 'crypto';

// Generate 4-digit OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Hash OTP for secure storage
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

        const { orderId } = await req.json();

        if (!orderId) {
            return NextResponse.json({ success: false, error: "Order ID required" }, { status: 400 });
        }

        // Find the order
        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
        }

        // Only generate OTP for out_for_delivery status
        if (order.status !== 'out_for_delivery') {
            return NextResponse.json({
                success: false,
                error: "OTP can only be generated for orders out for delivery"
            }, { status: 400 });
        }

        // Generate new OTP
        const otp = generateOTP();
        const hashedOTP = hashOTP(otp);

        // Update order with OTP
        order.deliveryOTP = hashedOTP;
        order.otpGeneratedAt = new Date();
        order.deliveryVerificationMethod = 'otp';
        order.otpVerified = false;
        await order.save();

        console.log(`[OTP Generated] Order ${order.orderNumber}: ${otp}`);

        // In production, send OTP via SMS to customer
        // For now, return it in response (for testing)
        return NextResponse.json({
            success: true,
            otp, // Remove this in production
            message: "OTP generated successfully",
            orderNumber: order.orderNumber
        });

    } catch (error) {
        console.error('Generate OTP error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
