import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/models';

// POST - Verify UPI payment with amount checking
export async function POST(req) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        if (!session || !['admin', 'super_admin'].includes(session.user.role)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { orderId, paymentAmount, verified } = await req.json();

        if (!orderId || paymentAmount === undefined) {
            return NextResponse.json(
                { success: false, error: 'Order ID and payment amount required' },
                { status: 400 }
            );
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Calculate payment status based on amount paid
        let paymentStatus = 'pending';
        let amountDue = 0;
        let canDeliver = false;

        if (paymentAmount >= order.total) {
            // Full payment or overpayment
            paymentStatus = 'paid';
            amountDue = 0;
            canDeliver = true;
        } else if (paymentAmount > 0 && paymentAmount < order.total) {
            // Partial payment
            paymentStatus = 'partial';
            amountDue = order.total - paymentAmount;
            canDeliver = false;
        } else {
            // No payment
            paymentStatus = 'failed';
            amountDue = order.total;
            canDeliver = false;
        }

        // Update order with verification details
        order.paymentVerified = verified && canDeliver;
        order.paymentVerifiedBy = session.user.id;
        order.paymentVerifiedAt = new Date();
        order.paymentAmount = paymentAmount;
        order.paymentStatus = paymentStatus;
        order.amountDue = amountDue;

        await order.save();

        // Return appropriate message
        let message = '';
        if (paymentStatus === 'paid') {
            message = '✅ Payment verified - delivery can proceed';
        } else if (paymentStatus === 'partial') {
            message = `⚠️ Partial payment received. Amount due: ₹${amountDue}. Delivery blocked until full payment.`;
        } else {
            message = '❌ No payment received. Order cannot be delivered.';
        }

        return NextResponse.json({
            success: true,
            message,
            data: {
                order,
                paymentStatus,
                amountDue,
                canDeliver,
                amountPaid: paymentAmount,
                orderTotal: order.total
            }
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to verify payment' },
            { status: 500 }
        );
    }
}
