import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// POST - Generate fake UTR for testing
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { amount } = await req.json();

        // Generate realistic fake UTR (12 digits)
        const fakeUTR = Math.floor(100000000000 + Math.random() * 900000000000).toString();

        // Simulate payment success
        const paymentData = {
            utr: fakeUTR,
            amount: amount,
            status: 'success',
            timestamp: new Date().toISOString(),
            paymentMethod: 'UPI',
            message: 'Test payment successful (Demo Mode)'
        };

        return NextResponse.json({
            success: true,
            data: paymentData,
            isTestMode: true
        });

    } catch (error) {
        console.error('Test payment error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate test payment' },
            { status: 500 }
        );
    }
}
