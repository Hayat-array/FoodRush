'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Check, X, Clock, Package, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RestaurantOrdersPage() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending');

    useEffect(() => {
        if (session?.user) {
            fetchOrders();
            // Poll for new orders every 15 seconds
            const interval = setInterval(fetchOrders, 15000);
            return () => clearInterval(interval);
        }
    }, [session]);

    const fetchOrders = async () => {
        try {
            // Assuming restaurant ID is in session or we need to fetch it
            const res = await fetch(`/api/orders?restaurantId=${session?.user?.restaurantId || session?.user?.id}`);
            const data = await res.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptOrder = async (orderId) => {
        try {
            const res = await fetch(`/api/orders/${orderId}/accept`, {
                method: 'PATCH',
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: 'Order Accepted',
                    description: 'Order has been accepted successfully',
                });
                fetchOrders();
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to accept order',
                variant: 'destructive',
            });
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: 'Status Updated',
                    description: `Order status updated to ${newStatus}`,
                });
                fetchOrders();
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to update status',
                variant: 'destructive',
            });
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
            delivered: 'bg-green-500 text-white',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const filterOrders = (status) => {
        if (status === 'pending') {
            return orders.filter(o => o.status === 'pending' || o.status === 'pending_payment');
        }
        if (status === 'active') {
            return orders.filter(o => ['accepted', 'preparing', 'ready', 'assigned', 'picked_up', 'out_for_delivery'].includes(o.status));
        }
        if (status === 'completed') {
            return orders.filter(o => o.status === 'delivered');
        }
        return orders;
    };

    const OrderCard = ({ order }) => (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                        <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                        {order.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Customer Info */}
                    <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm text-gray-600">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>

                    {/* Order Items */}
                    <div>
                        <p className="text-sm font-medium mb-2">Items</p>
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{item.subtotal}</span>
                            </div>
                        ))}
                        <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{order.total}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap">
                        {order.status === 'pending' && (
                            <>
                                <Button
                                    onClick={() => handleAcceptOrder(order._id)}
                                    className="bg-green-600 hover:bg-green-700"
                                    size="sm"
                                >
                                    <Check className="w-4 h-4 mr-1" />
                                    Accept Order
                                </Button>
                                <Button
                                    onClick={() => handleUpdateStatus(order._id, 'cancelled')}
                                    variant="destructive"
                                    size="sm"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Reject
                                </Button>
                            </>
                        )}
                        {order.status === 'accepted' && (
                            <Button
                                onClick={() => handleUpdateStatus(order._id, 'preparing')}
                                className="bg-purple-600 hover:bg-purple-700"
                                size="sm"
                            >
                                <ChefHat className="w-4 h-4 mr-1" />
                                Start Preparing
                            </Button>
                        )}
                        {order.status === 'preparing' && (
                            <Button
                                onClick={() => handleUpdateStatus(order._id, 'ready')}
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                            >
                                <Package className="w-4 h-4 mr-1" />
                                Mark as Ready
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Order Management</h1>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="pending">
                            Pending ({filterOrders('pending').length})
                        </TabsTrigger>
                        <TabsTrigger value="active">
                            Active ({filterOrders('active').length})
                        </TabsTrigger>
                        <TabsTrigger value="completed">
                            Completed ({filterOrders('completed').length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending">
                        {filterOrders('pending').length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-gray-500">
                                    <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <p>No pending orders</p>
                                </CardContent>
                            </Card>
                        ) : (
                            filterOrders('pending').map(order => (
                                <OrderCard key={order._id} order={order} />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="active">
                        {filterOrders('active').length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-gray-500">
                                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <p>No active orders</p>
                                </CardContent>
                            </Card>
                        ) : (
                            filterOrders('active').map(order => (
                                <OrderCard key={order._id} order={order} />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="completed">
                        {filterOrders('completed').length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-gray-500">
                                    <Check className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <p>No completed orders</p>
                                </CardContent>
                            </Card>
                        ) : (
                            filterOrders('completed').map(order => (
                                <OrderCard key={order._id} order={order} />
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
