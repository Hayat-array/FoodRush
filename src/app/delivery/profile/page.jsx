'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Package, TrendingUp, Clock, MapPin, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import DeliveryNavbar from '@/components/DeliveryNavbar';

export default function DeliveryProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalDeliveries: 0,
        completedToday: 0,
        earnings: 0,
        rating: 0
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/delivery/login');
            return;
        }

        if (status === 'authenticated') {
            const role = session?.user?.role;
            if (role !== 'delivery') {
                console.warn('Unauthorized access attempt to delivery profile');
                router.push('/');
                return;
            }

            // Fetch delivery stats
            fetchStats();
        }
    }, [status, session, router]);

    const fetchStats = async () => {
        try {
            // TODO: Implement API to fetch delivery partner stats
            // For now, using mock data
            setStats({
                totalDeliveries: 127,
                completedToday: 5,
                earnings: 3450,
                rating: 4.8
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    if (status === 'loading') {
        return (
            <>
                <DeliveryNavbar />
                <div className="flex h-screen items-center justify-center">
                    <Skeleton className="h-48 w-full max-w-md" />
                </div>
            </>
        );
    }

    if (!session) return null;

    return (
        <>
            <DeliveryNavbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Delivery Partner Profile</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <Card className="lg:col-span-1">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-white text-3xl font-bold">
                                            {session.user.name?.charAt(0) || 'D'}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{session.user.name}</h2>
                                    <p className="text-gray-500 text-sm mb-2">{session.user.email}</p>
                                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 border-none">
                                        DELIVERY PARTNER
                                    </Badge>

                                    <div className="w-full mt-6 space-y-3">
                                        <div className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                                            <Mail className="w-5 h-5 text-blue-500" />
                                            <span className="text-sm">{session.user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                                            <Phone className="w-5 h-5 text-blue-500" />
                                            <span className="text-sm">{session.user.phone || '+91 98765 43210'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                                            <MapPin className="w-5 h-5 text-blue-500" />
                                            <span className="text-sm">Jaipur, Rajasthan</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Grid */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card className="hover:shadow-lg transition">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">{stats.totalDeliveries}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Total Deliveries</p>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">{stats.completedToday}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Today</p>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">₹{stats.earnings}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Earnings</p>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">{stats.rating}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Rating</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Performance Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Performance Overview</CardTitle>
                                    <CardDescription>Your delivery performance metrics</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                            <span className="font-medium text-gray-700">On-Time Delivery Rate</span>
                                            <Badge className="bg-green-600">98%</Badge>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                            <span className="font-medium text-gray-700">Average Delivery Time</span>
                                            <Badge className="bg-blue-600">28 min</Badge>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                            <span className="font-medium text-gray-700">Customer Satisfaction</span>
                                            <Badge className="bg-purple-600">4.8/5.0</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-left">
                                            <Package className="w-6 h-6 text-blue-600 mb-2" />
                                            <p className="font-medium text-gray-900">View Active Deliveries</p>
                                        </button>
                                        <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-left">
                                            <Clock className="w-6 h-6 text-blue-600 mb-2" />
                                            <p className="font-medium text-gray-900">Delivery History</p>
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
