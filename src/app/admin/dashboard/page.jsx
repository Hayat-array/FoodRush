'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Store, ShoppingBag, Users, TrendingUp, Loader2,
    Edit, Trash2, Eye, Plus, DollarSign, Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleBasedNav from '@/components/RoleBasedNav';

export default function AdminDashboard() {
    return (
        <ProtectedRoute allowedRoles={['super_admin']}>
            <AdminDashboardContent />
        </ProtectedRoute>
    );
}

function AdminDashboardContent() {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();

    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([]);
    const [stats, setStats] = useState({
        totalRestaurants: 0,
        activeRestaurants: 0,
        totalOrders: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch all restaurants
            const res = await fetch('/api/admin/restaurant');
            const data = await res.json();

            if (data.success) {
                setRestaurants(data.data || []);

                // Calculate stats
                const activeCount = data.data.filter(r => r.isActive).length;
                setStats({
                    totalRestaurants: data.data.length,
                    activeRestaurants: activeCount,
                    totalOrders: 0, // TODO: Fetch from orders API
                    totalRevenue: 0 // TODO: Calculate from orders
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Error',
                description: 'Failed to load dashboard data',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRestaurant = async (id, name) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/restaurant/${id}`, {
                method: 'DELETE'
            });

            const result = await res.json();

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Restaurant deleted successfully'
                });
                fetchData(); // Refresh data
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to delete restaurant',
                variant: 'destructive'
            });
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-red-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50">
            <RoleBasedNav />

            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent mb-2">
                        Super Admin Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Platform-wide overview and management
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Restaurants
                            </CardTitle>
                            <Store className="h-5 w-5 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-600">{stats.totalRestaurants}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats.activeRestaurants} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Orders
                            </CardTitle>
                            <ShoppingBag className="h-5 w-5 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600">{stats.totalOrders}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Across all restaurants
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Platform Revenue
                            </CardTitle>
                            <DollarSign className="h-5 w-5 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600">₹{stats.totalRevenue}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Total earnings
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-100 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Active Users
                            </CardTitle>
                            <Users className="h-5 w-5 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-600">0</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Registered users
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* All Restaurants Table */}
                <Card className="shadow-lg border-2 border-purple-100">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-red-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-purple-700">All Restaurants</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Manage all restaurants on the platform
                                </CardDescription>
                            </div>
                            <Link href="/admin/restaurants/new">
                                <Button className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Restaurant
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {restaurants.length === 0 ? (
                            <div className="text-center py-12">
                                <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No restaurants found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-purple-100">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Restaurant</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Owner</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Cuisine</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurants.map((restaurant) => (
                                            <tr key={restaurant._id} className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        {restaurant.image ? (
                                                            <img
                                                                src={restaurant.image}
                                                                alt={restaurant.name}
                                                                className="w-12 h-12 rounded-lg object-cover border-2 border-purple-200"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                                                <Store className="w-6 h-6 text-purple-600" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-semibold text-gray-800">{restaurant.name}</div>
                                                            <div className="text-sm text-gray-500">{restaurant.slug}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-700">{restaurant.owner?.name || 'N/A'}</div>
                                                        <div className="text-gray-500">{restaurant.owner?.email || ''}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {restaurant.cuisine?.slice(0, 2).map((c, i) => (
                                                            <Badge key={i} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                                                {c}
                                                            </Badge>
                                                        ))}
                                                        {restaurant.cuisine?.length > 2 && (
                                                            <Badge variant="secondary" className="text-xs bg-gray-100">
                                                                +{restaurant.cuisine.length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <Badge className={restaurant.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                                        {restaurant.isActive ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-yellow-500">★</span>
                                                        <span className="font-medium">{restaurant.rating || 0}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/admin/restaurants/${restaurant._id}`}>
                                                            <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/admin/restaurants/${restaurant._id}/edit`}>
                                                            <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                                            onClick={() => handleDeleteRestaurant(restaurant._id, restaurant.name)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
