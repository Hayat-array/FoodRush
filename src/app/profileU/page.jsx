// 'use client';

// import { useSession } from 'next-auth/react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Mail } from 'lucide-react';

// export default function ProfilePage() {
//   const { data: session } = useSession();

//   if (!session) return <div className="p-10 text-center">Please log in.</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 min-h-screen">
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle>My Profile</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="flex items-center gap-6">
//             <Avatar className="w-24 h-24">
//               <AvatarImage src={session.user.image} />
//               <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
//                 {session.user.name?.charAt(0)}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <h2 className="text-2xl font-bold">{session.user.name}</h2>
//               <p className="text-gray-500 capitalize">{session.user.role}</p>
//             </div>
//           </div>
//           <div className="grid gap-4 mt-6">
//             <div className="flex items-center gap-4 p-4 border rounded-lg">
//               <Mail className="text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-medium">{session.user.email}</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
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
  Star,
  Heart,
  Clock,
  Shield,
  Bell,
  Wallet
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Stats Counters
  const [stats, setStats] = useState({
    totalOrders: 0,
    reviews: 0,
    addresses: 1,
    favorites: 0
  });

  // Profile edit form
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    location: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    // Role-based access control - redirect admins to admin profile
    if (status === 'authenticated') {
      const role = session?.user?.role;
      if (role === 'admin' || role === 'restaurant_owner') {
        console.log('Admin/Owner redirected to admin profile');
        router.push('/admin/profile');
        return;
      }
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user) {
      fetchUserData();
      setProfileData({
        name: session.user.name || '',
        phone: session.user.phone || '',
        location: 'Jaipur, Rajasthan'
      });
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      // Fetch recent orders
      const response = await fetch('/api/user/orders');
      const data = await response.json();

      if (data.success) {
        setRecentOrders(data.data.slice(0, 3)); // Last 3 orders
        setStats(prev => ({
          ...prev,
          totalOrders: data.data.length,
          favorites: Math.floor(Math.random() * 10) // Demo data
        }));
      }
    } catch (error) {
      console.error("Failed to load profile data", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        toast({
          title: "✅ Profile Updated",
          description: "Your changes have been saved",
          className: "bg-green-600 text-white border-none"
        });
        setIsEditingProfile(false);
      }
    } catch (error) {
      toast({
        title: "❌ Update Failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
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

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-700 border-blue-300',
      preparing: 'bg-orange-100 text-orange-700 border-orange-300',
      ready: 'bg-purple-100 text-purple-700 border-purple-300',
      delivered: 'bg-green-100 text-green-700 border-green-300',
      cancelled: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: User Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden shadow-lg">
              <div className="h-32 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"></div>
              <CardContent className="relative pt-0 pb-8 px-6 text-center">
                <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '-11.3rem' }} >
                  <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
                    <AvatarImage src={session.user.image} alt={session.user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-3xl font-bold">
                      {session.user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="mt-16 mb-6">
                  {isEditingProfile ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-center font-bold"
                        placeholder="Name"
                      />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-center"
                        placeholder="Phone"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleUpdateProfile} className="flex-1 bg-green-600 hover:bg-green-700">
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900">{session.user.name}</h2>
                      <p className="text-gray-500 text-sm">Member since {new Date().getFullYear()}</p>
                      <Badge className="mt-2 bg-gradient-to-r from-orange-500 to-red-500 border-none">
                        {session.user.role?.toUpperCase() || 'CUSTOMER'}
                      </Badge>
                    </>
                  )}
                </div>

                {!isEditingProfile && (
                  <>
                    <Separator className="my-6" />
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition">
                        <Mail className="w-5 h-5 text-orange-500" />
                        <span className="text-sm">{session.user.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition">
                        <Phone className="w-5 h-5 text-orange-500" />
                        <span className="text-sm">{profileData.phone || '+91 98765 43210'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Navigation Menu */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Quick Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <Link href="/orders" className="flex items-center justify-between p-4 hover:bg-orange-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700">My Orders</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition" />
                  </Link>
                  <Link href="/favorites" className="flex items-center justify-between p-4 hover:bg-orange-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition">
                        <Heart className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="font-medium text-gray-700">Favorites</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition" />
                  </Link>
                  <Link href="/wallet" className="flex items-center justify-between p-4 hover:bg-orange-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-700">Wallet</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition" />
                  </Link>
                  <Link href="/addresses" className="flex items-center justify-between p-4 hover:bg-orange-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-700">Addresses</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition" />
                  </Link>
                  <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-orange-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition">
                        <Settings className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-700">Settings</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Stats & Activities */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="shadow-md hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.totalOrders}</h3>
                  <p className="text-sm text-gray-500 mt-1">Orders</p>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.favorites}</h3>
                  <p className="text-sm text-gray-500 mt-1">Favorites</p>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.addresses}</h3>
                  <p className="text-sm text-gray-500 mt-1">Addresses</p>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-md">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.reviews}</h3>
                  <p className="text-sm text-gray-500 mt-1">Reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders Section */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <div>
                  <CardTitle className="text-xl">Recent Orders</CardTitle>
                  <CardDescription>Your latest food orders</CardDescription>
                </div>
                <Link href="/orders">
                  <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 gap-2">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="pt-6">
                {loadingOrders ? (
                  <div className="space-y-4">
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                  </div>
                ) : recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 rounded-xl hover:border-orange-300 hover:shadow-md transition gap-4 bg-gradient-to-r from-white to-gray-50">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Package className="w-7 h-7 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{order.restaurant?.name || "Restaurant"}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{order.items?.length || 0} items</span>
                            </div>
                            <Badge className={`mt-2 capitalize text-xs ${getStatusColor(order.status)}`}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                          <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">₹{order.total}</span>
                          <Link href={`/orders/${order._id}`}>
                            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md">
                              Track Order
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">Start exploring delicious food!</p>
                    <Link href="/restaurants">
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md">
                        Browse Restaurants
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Security Card */}
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Account Security
                </CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bell className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-500">Get order updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Auth</p>
                        <p className="text-sm text-gray-500">Extra security layer</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}