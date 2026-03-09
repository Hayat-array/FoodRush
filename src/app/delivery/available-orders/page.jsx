'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Store, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AvailableOrdersPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptingId, setAcceptingId] = useState(null);

    useEffect(() => {
        if (session?.user?.role === 'delivery') {
            fetchAvailableOrders();
            // Poll every 10 seconds
            const interval = setInterval(fetchAvailableOrders, 10000);
            return () => clearInterval(interval);
        }
    }, [session]);

    const fetchAvailableOrders = async () => {
        try {
            const res = await fetch('/api/delivery/available-orders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            console.error('Error fetching available orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptOrder = async (orderId) => {
        setAcceptingId(orderId);
        try {
            const res = await fetch(`/api/delivery/accept-order/${orderId}`, {
                method: 'POST',
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: 'Order Accepted!',
                    description: 'Redirecting to delivery details...',
                });
                router.push('/delivery/active-delivery');
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to accept order',
                variant: 'destructive',
            });
        } finally {
            setAcceptingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">Available Orders</h1>

                {orders.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-gray-500">
                            <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p>No orders currently available for pickup.</p>
                            <p className="text-sm mt-2">Checking for new orders...</p>
                        </CardContent>
                    </Card>
                ) : (
                    orders.map((order) => (
                        <Card key={order._id} className="w-full hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(order.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">₹{order.total}</p>
                                        <p className="text-xs text-gray-500">{order.itemsCount} Items</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-orange-100 p-2 rounded-full">
                                        <Store className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Restaurant</p>
                                        <p className="text-sm text-gray-600">{order.restaurant.name}</p>
                                        <p className="text-xs text-gray-500">{order.restaurant.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 p-2 rounded-full">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Deliver To</p>
                                        <p className="text-sm text-gray-600">{order.deliveryAddress.city}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700"
                                    size="lg"
                                    disabled={acceptingId === order._id}
                                    onClick={() => handleAcceptOrder(order._id)}
                                >
                                    {acceptingId === order._id ? (
                                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Accepting...</>
                                    ) : (
                                        'Accept Delivery'
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
