'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Package, Clock, MapPin, Phone, User, CheckCircle2 } from 'lucide-react';

export default function OrderTrackingPage() {
    const params = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
        // Poll for updates every 10 seconds
        const interval = setInterval(fetchOrderDetails, 10000);
        return () => clearInterval(interval);
    }, [params.id]);

    const fetchOrderDetails = async () => {
        try {
            const res = await fetch(`/api/orders/${params.id}`);
            const data = await res.json();
            if (data.success) {
                setOrder(data.data);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-blue-100 text-blue-800',
            preparing: 'bg-purple-100 text-purple-800',
            ready: 'bg-green-100 text-green-800',
            assigned: 'bg-indigo-100 text-indigo-800',
            picked_up: 'bg-orange-100 text-orange-800',
            out_for_delivery: 'bg-cyan-100 text-cyan-800',
            nearby: 'bg-pink-100 text-pink-800',
            delivered: 'bg-green-500 text-white',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'Order Placed',
            accepted: 'Order Accepted',
            preparing: 'Preparing Your Food',
            ready: 'Ready for Pickup',
            assigned: 'Delivery Partner Assigned',
            picked_up: 'Order Picked Up',
            out_for_delivery: 'Out for Delivery',
            nearby: 'Delivery Partner Nearby',
            delivered: 'Delivered',
            cancelled: 'Cancelled'
        };
        return texts[status] || status;
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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Order not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">Order #{order.orderNumber}</CardTitle>
                                <p className="text-sm text-gray-500 mt-1">
                                    Placed on {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>

                {/* OTP Display */}
                {order.otp && !order.otp.verified && order.status !== 'delivered' && (
                    <Card className="border-2 border-orange-500">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Your Delivery OTP</h3>
                                <div className="text-4xl font-bold text-orange-600 tracking-widest mb-2">
                                    {order.otp.code}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Share this OTP with the delivery partner to confirm delivery
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Expires: {new Date(order.otp.expiresAt).toLocaleTimeString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {order.timeline && order.timeline.length > 0 ? (
                                order.timeline.map((entry, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-orange-600' : 'bg-gray-300'
                                                }`} />
                                            {index < order.timeline.length - 1 && (
                                                <div className="w-0.5 h-12 bg-gray-200" />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-4">
                                            <p className="font-medium">{getStatusText(entry.status)}</p>
                                            {entry.note && <p className="text-sm text-gray-600">{entry.note}</p>}
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(entry.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No timeline available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Delivery Partner Info */}
                {order.deliveryPartnerId && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Delivery Partner
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span>{order.deliveryPartnerId.name || 'Assigned'}</span>
                                </div>
                                {order.deliveryPartnerId.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span>{order.deliveryPartnerId.phone}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Order Items */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Order Items
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">₹{item.subtotal}</p>
                                </div>
                            ))}
                            <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{order.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Delivery Fee</span>
                                    <span>₹{order.deliveryFee}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Taxes</span>
                                    <span>₹{order.taxes}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-2">
                                    <span>Total</span>
                                    <span>₹{order.total}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Delivery Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{order.deliveryAddress.street}</p>
                        <p>{order.deliveryAddress.city}</p>
                        {order.deliveryAddress.landmark && (
                            <p className="text-sm text-gray-600">Landmark: {order.deliveryAddress.landmark}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
