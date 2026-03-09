'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
    Store, Plus, Search, Edit, Trash2, Eye, MapPin, Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleBasedNav from '@/components/RoleBasedNav';

export default function AllRestaurantsPage() {
    return (
        <ProtectedRoute allowedRoles={['super_admin']}>
            <AllRestaurantsContent />
        </ProtectedRoute>
    );
}

function AllRestaurantsContent() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = restaurants.filter(r =>
                r.name.toLowerCase().includes(lowerQuery) ||
                r.slug.toLowerCase().includes(lowerQuery) ||
                (r.owner?.name && r.owner.name.toLowerCase().includes(lowerQuery))
            );
            setFilteredRestaurants(filtered);
        } else {
            setFilteredRestaurants(restaurants);
        }
    }, [searchQuery, restaurants]);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/restaurant');
            const data = await res.json();

            if (data.success) {
                setRestaurants(data.data || []);
                setFilteredRestaurants(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            toast({
                title: 'Error',
                description: 'Failed to load restaurants',
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
                fetchRestaurants(); // Refresh data
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50">
            <RoleBasedNav />

            <div className="container mx-auto py-8 px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">All Restaurants</h1>
                        <p className="text-gray-600">Manage all registered restaurants on the platform</p>
                    </div>

                    <Link href="/admin/restaurants/new">
                        <Button className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Restaurant
                        </Button>
                    </Link>
                </div>

                <Card className="mb-8 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search by name, slug, or owner..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading restaurants...</p>
                        </div>
                    ) : filteredRestaurants.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                            <Store className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No restaurants found matching your criteria</p>
                        </div>
                    ) : (
                        filteredRestaurants.map((restaurant) => (
                            <Card key={restaurant._id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Image Section */}
                                        <div className="w-full md:w-48 h-48 md:h-auto bg-gray-100 flex-shrink-0 relative">
                                            {restaurant.image ? (
                                                <img
                                                    src={restaurant.image}
                                                    alt={restaurant.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Store className="w-12 h-12" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 md:hidden">
                                                <Badge className={restaurant.isActive ? 'bg-green-500' : 'bg-red-500'}>
                                                    {restaurant.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                                            <MapPin className="w-3 h-3 mr-1" />
                                                            {restaurant.address}
                                                        </div>
                                                    </div>
                                                    <div className="hidden md:block">
                                                        <Badge className={restaurant.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                                            {restaurant.isActive ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {restaurant.cuisine?.map((c, i) => (
                                                        <Badge key={i} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100">
                                                            {c}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500 block">Owner</span>
                                                        <span className="font-medium">{restaurant.owner?.name || 'N/A'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500 block">Contact</span>
                                                        <span className="font-medium">{restaurant.phone || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                                                <Link href={`/admin/restaurants/${restaurant._id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/restaurants/${restaurant._id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => handleDeleteRestaurant(restaurant._id, restaurant.name)}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
