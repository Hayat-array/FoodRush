'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrdersRedirect() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to ordersU page
        router.replace('/ordersU');
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600">Redirecting to orders...</p>
        </div>
    );
}