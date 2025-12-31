'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Package, Calendar, TrendingUp, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import DeliveryNavbar from '@/components/DeliveryNavbar';

export default function DeliveryHistoryPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, today, week, month

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/delivery/login');
            return;
        }

        if (status === 'authenticated') {
            const role = session?.user?.role;
            if (role !== 'delivery') {
                router.push('/');
                return;
            }

            fetchHistory();
        }
    }, [status, session, router]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/delivery/history');
            const data = await res.json();

            if (data.success) {
                setHistory(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        return status === 'delivered'
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-gray-100 text-gray-800';
    };

    const filterHistory = () => {
        const now = new Date();
        return history.filter(order => {
            const orderDate = new Date(order.deliveredAt || order.updatedAt);

            switch (filter) {
                case 'today':
                    return orderDate.toDateString() === now.toDateString();
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return orderDate >= weekAgo;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    return orderDate >= monthAgo;
                default:
                    return true;
            }
        });
    };

    const filteredHistory = filterHistory();
    const totalEarnings = filteredHistory.reduce((sum, order) => sum + (order.deliveryFee || 40), 0);

    if (status === 'loading' || loading) {
        return (
            <>
                <DeliveryNavbar />
                <div className="container mx-auto p-8">
                    <Skeleton className="h-32 w-full mb-6" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </>
        );
    }

    return (
        <>
            <DeliveryNavbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Delivery History</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Deliveries</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{filteredHistory.length}</h3>
                                    </div>
                                    <Package className="w-12 h-12 text-blue-500" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Earnings</p>
                                        <h3 className="text-3xl font-bold text-green-600">₹{totalEarnings}</h3>
                                    </div>
                                    <TrendingUp className="w-12 h-12 text-green-500" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Avg per Delivery</p>
                                        <h3 className="text-3xl font-bold text-gray-900">
                                            ₹{filteredHistory.length > 0 ? Math.round(totalEarnings / filteredHistory.length) : 0}
                                        </h3>
                                    </div>
                                    <Calendar className="w-12 h-12 text-purple-500" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2 mb-6">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('all')}
                            className={filter === 'all' ? 'bg-blue-600' : ''}
                        >
                            All Time
                        </Button>
                        <Button
                            variant={filter === 'today' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('today')}
                            className={filter === 'today' ? 'bg-blue-600' : ''}
                        >
                            Today
                        </Button>
                        <Button
                            variant={filter === 'week' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('week')}
                            className={filter === 'week' ? 'bg-blue-600' : ''}
                        >
                            This Week
                        </Button>
                        <Button
                            variant={filter === 'month' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('month')}
                            className={filter === 'month' ? 'bg-blue-600' : ''}
                        >
                            This Month
                        </Button>
                    </div>

                    {/* History List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Deliveries</CardTitle>
                            <CardDescription>Your delivery history and earnings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {filteredHistory.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-600">No deliveries found for this period</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredHistory.map((order) => (
                                        <div
                                            key={order._id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-semibold text-gray-900">
                                                        Order #{order.orderNumber || order._id.slice(-6)}
                                                    </h4>
                                                    <Badge className={getStatusColor(order.status)}>
                                                        {order.status?.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {order.restaurant?.name || 'Restaurant'} → {order.deliveryAddress?.street || 'Customer'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(order.deliveredAt || order.updatedAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                                                <p className="text-sm text-green-600">+₹{order.deliveryFee || 40} earned</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
