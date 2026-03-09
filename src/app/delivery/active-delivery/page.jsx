'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Phone, Package, Navigation, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ActiveDeliveryPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (session?.user?.role === 'delivery') {
            fetchActiveOrder();
        }
    }, [session]);

    const fetchActiveOrder = async () => {
        try {
            const res = await fetch('/api/delivery/active-order');
            const data = await res.json();
            if (data.success) {
                setOrder(data.data);
            }
        } catch (error) {
            console.error('Error fetching active order:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus) => {
        setUpdating(true);
        try {
            const res = await fetch(`/api/orders/${order._id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: 'Status Updated',
                    description: `Delivery status: ${newStatus.replace('_', ' ')}`,
                });
                fetchActiveOrder(); // Refresh
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setUpdating(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            toast({ title: 'Invalid OTP', description: 'Enter a 6-digit code', variant: 'destructive' });
            return;
        }

        setUpdating(true);
        try {
            const res = await fetch(`/api/orders/${order._id}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp }),
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: 'Delivery Completed!',
                    description: 'Great job! Order delivered successfully.',
                });
                setOrder(null); // Clear active order
                router.push('/delivery/dashboard');
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            toast({
                title: 'Verification Failed',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen p-4 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">No Active Deliveries</h2>
                <p className="text-gray-600">You are free to pick up new orders!</p>
                <Button onClick={() => router.push('/delivery/available-orders')}>
                    View Available Orders
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b px-4 py-3 z-10 flex justify-between items-center shadow-sm">
                <div>
                    <h1 className="font-bold text-lg">Current Delivery</h1>
                    <p className="text-xs text-gray-500">#{order.orderNumber}</p>
                </div>
                <Badge variant={order.status === 'nearby' ? 'default' : 'secondary'}>
                    {order.status.replace(/_/g, ' ').toUpperCase()}
                </Badge>
            </div>

            <div className="p-4 space-y-6 max-w-lg mx-auto">
                {/* Customer Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            Drop Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="font-semibold text-lg">{order.customer.name}</p>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <a href={`tel:${order.customer.phone}`} className="hover:text-blue-600">
                                    {order.customer.phone}
                                </a>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md text-sm">
                            <p>{order.deliveryAddress.street}</p>
                            <p>{order.deliveryAddress.city}</p>
                            {order.deliveryAddress.landmark && (
                                <p className="text-gray-500 mt-1">Landmark: {order.deliveryAddress.landmark}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full flex items-center gap-2">
                            <Navigation className="w-4 h-4" />
                            Navigate
                        </Button>
                    </CardFooter>
                </Card>

                {/* Status Actions */}
                <div className="space-y-4">
                    <h3 className="font-semibold px-1">Update Status</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant={order.status === 'picked_up' ? 'default' : 'outline'}
                            disabled={order.status !== 'assigned'}
                            onClick={() => updateStatus('picked_up')}
                        >
                            Picked Up
                        </Button>
                        <Button
                            variant={order.status === 'out_for_delivery' ? 'default' : 'outline'}
                            disabled={order.status !== 'picked_up'}
                            onClick={() => updateStatus('out_for_delivery')}
                        >
                            In Transit
                        </Button>
                        <Button
                            variant={order.status === 'nearby' ? 'default' : 'outline'}
                            disabled={order.status !== 'out_for_delivery'}
                            onClick={() => updateStatus('nearby')}
                            className="col-span-2"
                        >
                            Arrived at Location
                        </Button>
                    </div>
                </div>

                {/* OTP Verification */}
                <Card className="border-orange-200 shadow-orange-100">
                    <CardHeader>
                        <CardTitle className="text-center text-orange-700">Complete Delivery</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-center text-sm text-gray-600">
                            Ask customer for the 6-digit OTP to complete the order.
                        </p>
                        <div className="flex justify-center">
                            <Input
                                className="w-40 text-center text-2xl tracking-[0.5em] h-14 font-bold"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="------"
                            />
                        </div>
                        <Button
                            className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg"
                            disabled={otp.length !== 6 || updating}
                            onClick={handleVerifyOTP}
                        >
                            {updating ? <Loader2 className="animate-spin" /> : 'Verify & Finish'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Order Items Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Order Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            {order.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between">
                                    <span>{item.quantity} x {item.name}</span>
                                    <span className="text-gray-500">₹{item.subtotal}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                            <span>Total to Collect</span>
                            <span>₹{order.total}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 uppercase text-right">
                            Payment: {order.paymentMethod}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
