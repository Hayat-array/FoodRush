'use client';

import { useState, useEffect } from 'react';
import { LogOut, Package, Truck, Clock, RefreshCw, MapPin, Phone } from 'lucide-react';

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// --- MOCK DATA (Replace with real API calls) ---
const mockOrders = [
    { _id: "ORD1001", orderNumber: "ORD1001", status: "ready", total: 550, 
      deliveryAddress: { street: "123 North Ave, City A" }, 
      restaurant: { name: "Pizza Hut Central", address: { street: "45 West St" } },
      customer: { contact: { phone: "9876543210" } }
    },
    { _id: "ORD1002", orderNumber: "ORD1002", status: "out-for-delivery", total: 720, 
      deliveryAddress: { street: "99 Maple Lane, City B" }, 
      restaurant: { name: "Indian Spice Corner", address: { street: "10 Main Rd" } },
      customer: { contact: { phone: "9988776655" } }
    },
];
// --- END MOCK DATA ---


export default function DeliveryDashboardPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // --- Data Fetching Effect ---
    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            // --- MOCK FALLBACK ---
            await new Promise(resolve => setTimeout(resolve, 500));
            setOrders(mockOrders.filter(o => ['ready', 'out-for-delivery'].includes(o.status)));
            // --- END MOCK FALLBACK ---
        } catch (error) {
            console.error('Error fetching delivery orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        setIsUpdating(true);
        try {
            // --- MOCK UPDATE ---
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error('Update Error:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ready': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'out-for-delivery': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getNextStatus = (currentStatus) => {
        if (currentStatus === 'ready') return { status: 'out-for-delivery', label: 'Start Delivery' };
        if (currentStatus === 'out-for-delivery') return { status: 'delivered', label: 'Mark Delivered' };
        return null;
    };

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="container mx-auto p-8">
                <Skeleton className="h-48 w-full mb-4" />
            </div>
        );
    }

    // --- MAIN UI ---
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <hgroup>
                    <h1 className="text-3xl font-bold">Delivery Dashboard</h1>
                    <p className="text-gray-600">Welcome Delivery Partner! Active Orders: {orders.length}</p>
                </hgroup>
                <div className="flex gap-2">
                    <Button onClick={fetchOrders} variant="outline" disabled={isUpdating}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </Button>
                    <Button variant="destructive">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length === 0 ? (
                    <Card className="col-span-full text-center py-12">
                        <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <CardTitle className="text-xl">No Active Orders</CardTitle>
                        <CardDescription>No orders currently available.</CardDescription>
                    </Card>
                ) : (
                    orders.map((order) => {
                        const nextAction = getNextStatus(order.status);
                        return (
                            <Card key={order._id} className="shadow-lg">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-xl">#{order.orderNumber}</CardTitle>
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status.toUpperCase().replace('-', ' ')}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-4">

                                    {/* Pickup */}
                                    <div className="border-b pb-3">
                                        <p className="font-semibold text-sm text-gray-600 mb-1">Pickup (Restaurant)</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            <span>{order.restaurant?.address?.street}</span>
                                        </div>
                                    </div>

                                    {/* Drop-off */}
                                    <div className="border-b pb-3">
                                        <p className="font-semibold text-sm text-gray-600 mb-1">Drop-off (Customer)</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-green-500" />
                                            <span>{order.deliveryAddress?.street}</span>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-sm text-gray-600">Customer Contact</p>
                                        <a href={`tel:${order.customer?.contact?.phone}`} className="text-indigo-600 hover:underline flex items-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            {order.customer?.contact?.phone}
                                        </a>
                                    </div>

                                    {/* Total */}
                                    <div className="text-xl font-bold pt-2 border-t flex justify-between">
                                        <span>Total:</span>
                                        <span className="text-orange-600">₹{order.total}</span>
                                    </div>

                                    {/* Action Button */}
                                    {nextAction ? (
                                        <Button
                                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                                            onClick={() => updateOrderStatus(order._id, nextAction.status)}
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? (
                                                <Clock className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <Truck className="w-4 h-4 mr-2" />
                                            )}
                                            {nextAction.label}
                                        </Button>
                                    ) : (
                                        <Button variant="secondary" className="w-full" disabled>
                                            Order Status: {order.status}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
