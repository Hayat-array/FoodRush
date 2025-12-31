'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  CreditCard, 
  Settings, 
  LogOut,
  Edit2,
  ChevronRight,
  Star
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Stats Counters
  const [stats, setStats] = useState({
    totalOrders: 0,
    reviews: 0,
    addresses: 1 // Default to 1 for demo
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      // Fetch recent orders to populate the dashboard
      const response = await fetch('/api/user/orders');
      const data = await response.json();
      
      if (data.success) {
        setRecentOrders(data.data.slice(0, 3)); // Only show last 3
        setStats(prev => ({ ...prev, totalOrders: data.data.length }));
      }
    } catch (error) {
      console.error("Failed to load profile data", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex gap-6">
          <Skeleton className="h-64 w-full md:w-1/3 rounded-xl" />
          <div className="flex-1 space-y-6">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: User Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <CardContent className="relative pt-0 pb-8 px-6 text-center">
                <div className="absolute top-[-10rem] left-1/2 transform -translate-x-1/2">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={session.user.avatar} alt={session.user.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl font-bold">
                      {session.user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="mt-14 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{session.user.name}</h2>
                  <p className="text-gray-500 text-sm">Member since 2024</p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{session.user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{session.user.phone || '+91 98765 43210'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Jaipur, Rajasthan</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/settings">
                    <Button variant="outline" className="w-full gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation Menu */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <Link href="/orders" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-700">Orders</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-700">Addresses</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-gray-700">Payments</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">Settings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Stats & Activities */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.addresses}</h3>
                  <p className="text-sm text-gray-500">Saved Addresses</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-3">
                    <Star className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.reviews}</h3>
                  <p className="text-sm text-gray-500">Reviews Given</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link href="/orders">
                  <Button variant="ghost" className="text-orange-500 hover:text-orange-600 hover:bg-orange-50">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{order.restaurant?.name || "Restaurant"}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} items
                            </p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="secondary" className="capitalize text-xs">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                          <span className="font-bold text-gray-900">₹{order.total}</span>
                          <Button size="sm" variant="outline" className="h-8">Track</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500">No recent orders found</p>
                    <Link href="/restaurants" className="mt-4 inline-block">
                      <Button variant="link" className="text-orange-500">Order something delicious</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}