'use client';

import { useSession } from 'next-auth/react';
import { ShoppingBag, Heart, MapPin, User, Clock, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleBasedNav from '@/components/RoleBasedNav';

export default function UserDashboard() {
    return (
        <ProtectedRoute allowedRoles={['user']}>
            <UserDashboardContent />
        </ProtectedRoute>
    );
}

function UserDashboardContent() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <RoleBasedNav />

            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        My Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Welcome back, {session?.user?.name}! Track your orders and favorites.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className="border-2 border-blue-100 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Active Orders
                            </CardTitle>
                            <Clock className="h-5 w-5 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600">0</div>
                            <p className="text-xs text-gray-500 mt-1">In progress</p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-indigo-100 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Orders
                            </CardTitle>
                            <ShoppingBag className="h-5 w-5 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-indigo-600">0</div>
                            <p className="text-xs text-gray-500 mt-1">All time</p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-pink-100 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Favorites
                            </CardTitle>
                            <Heart className="h-5 w-5 text-pink-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-pink-600">0</div>
                            <p className="text-xs text-gray-500 mt-1">Restaurants</p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-100 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Saved Addresses
                            </CardTitle>
                            <MapPin className="h-5 w-5 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-600">0</div>
                            <p className="text-xs text-gray-500 mt-1">Locations</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Active Orders */}
                <Card className="shadow-lg border-2 border-blue-100 mb-6">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardTitle className="text-blue-700">Active Orders</CardTitle>
                        <CardDescription className="text-gray-600">
                            Track your current orders
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No active orders</p>
                            <p className="text-sm text-gray-400 mt-2 mb-4">Start ordering from your favorite restaurants</p>
                            <Link href="/">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    Browse Restaurants
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-2 border-blue-100 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <ShoppingBag className="w-5 h-5" />
                                Order History
                            </CardTitle>
                            <CardDescription>View all your past orders</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2 border-pink-100 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-pink-700">
                                <Heart className="w-5 h-5" />
                                Favorite Restaurants
                            </CardTitle>
                            <CardDescription>Your saved restaurants</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2 border-purple-100 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-700">
                                <User className="w-5 h-5" />
                                Profile Settings
                            </CardTitle>
                            <CardDescription>Manage your account</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
