// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useSession } from 'next-auth/react';
// // // // import { useRouter } from 'next/navigation';
// // // // import Link from 'next/link';
// // // // import { 
// // // //   Store, 
// // // //   DollarSign, 
// // // //   ShoppingBag, 
// // // //   Utensils, 
// // // //   TrendingUp, 
// // // //   Clock, 
// // // //   MoreHorizontal,
// // // //   Plus
// // // // } from 'lucide-react';

// // // // import { Button } from '@/components/ui/button';
// // // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // // // import {
// // // //   DropdownMenu,
// // // //   DropdownMenuContent,
// // // //   DropdownMenuItem,
// // // //   DropdownMenuLabel,
// // // //   DropdownMenuSeparator,
// // // //   DropdownMenuTrigger,
// // // // } from "@/components/ui/dropdown-menu";

// // // // export default function AdminRestaurantDashboard() {
// // // //   const { data: session, status } = useSession();
// // // //   const router = useRouter();
  
// // // //   const [stats, setStats] = useState({
// // // //     revenue: 0,
// // // //     orders: 0,
// // // //     menuItems: 0,
// // // //     activeOrders: 0
// // // //   });
// // // //   const [recentOrders, setRecentOrders] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     if (status === 'unauthenticated') {
// // // //       router.push('/auth/signin');
// // // //       return;
// // // //     }

// // // //     // Role check: Only allow admins or restaurant owners
// // // //     if (session?.user && ['admin', 'restaurant_owner'].includes(session.user.role)) {
// // // //       fetchDashboardData();
// // // //     } else if (session?.user) {
// // // //         // Redirect regular users away if they try to access this
// // // //         router.push('/');
// // // //     }
// // // //   }, [session, status, router]);

// // // //   const fetchDashboardData = async () => {
// // // //     try {
// // // //       // In a real production app, you would fetch this from a dedicated dashboard API
// // // //       // For now, we are simulating the data aggregation
      
// // // //       // Simulate API delay
// // // //       await new Promise(resolve => setTimeout(resolve, 800));

// // // //       setStats({
// // // //         revenue: 125000, // ₹1,25,000
// // // //         orders: 450,
// // // //         menuItems: 24,
// // // //         activeOrders: 12
// // // //       });

// // // //       // Sample recent orders data
// // // //       setRecentOrders([
// // // //         { id: 'ORD-001', customer: 'Amit Sharma', total: 450, status: 'preparing', time: '10 mins ago' },
// // // //         { id: 'ORD-002', customer: 'Priya Singh', total: 1200, status: 'ready', time: '25 mins ago' },
// // // //         { id: 'ORD-003', customer: 'Rahul Verma', total: 850, status: 'delivered', time: '1 hour ago' },
// // // //         { id: 'ORD-004', customer: 'Sneha Gupta', total: 320, status: 'pending', time: '2 mins ago' },
// // // //       ]);

// // // //     } catch (error) {
// // // //       console.error("Failed to load dashboard:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   if (loading || status === 'loading') {
// // // //     return (
// // // //       <div className="container mx-auto p-8 space-y-8">
// // // //         <div className="flex justify-between items-center">
// // // //           <Skeleton className="h-10 w-48" />
// // // //           <Skeleton className="h-10 w-32" />
// // // //         </div>
// // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// // // //           {[...Array(4)].map((_, i) => (
// // // //             <Skeleton key={i} className="h-32 rounded-xl" />
// // // //           ))}
// // // //         </div>
// // // //         <div className="grid gap-4 md:grid-cols-7">
// // // //             <Skeleton className="col-span-4 h-96 rounded-xl" />
// // // //             <Skeleton className="col-span-3 h-96 rounded-xl" />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50/50 p-8">
// // // //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
// // // //           <p className="text-muted-foreground">Overview of your restaurant's performance.</p>
// // // //         </div>
// // // //         <div className="flex gap-2">
// // // //            <Link href="/admin/orders/create">
// // // //             <Button className="bg-orange-600 hover:bg-orange-700">
// // // //                 <Plus className="mr-2 h-4 w-4" /> New Order
// // // //             </Button>
// // // //            </Link>
// // // //         </div>
// // // //       </div>

// // // //       {/* Stats Cards */}
// // // //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
// // // //         <Card>
// // // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // // //             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
// // // //             <DollarSign className="h-4 w-4 text-muted-foreground" />
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
// // // //             <p className="text-xs text-muted-foreground text-green-600 flex items-center mt-1">
// // // //               <TrendingUp className="h-3 w-3 mr-1" />
// // // //               +20.1% from last month
// // // //             </p>
// // // //           </CardContent>
// // // //         </Card>
// // // //         <Card>
// // // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // // //             <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
// // // //             <ShoppingBag className="h-4 w-4 text-muted-foreground" />
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <div className="text-2xl font-bold">+{stats.orders}</div>
// // // //             <p className="text-xs text-muted-foreground mt-1">+180 from last month</p>
// // // //           </CardContent>
// // // //         </Card>
// // // //         <Card>
// // // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // // //             <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
// // // //             <Utensils className="h-4 w-4 text-muted-foreground" />
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <div className="text-2xl font-bold">{stats.menuItems}</div>
// // // //             <p className="text-xs text-muted-foreground mt-1">4 items low on stock</p>
// // // //           </CardContent>
// // // //         </Card>
// // // //         <Card>
// // // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // // //             <CardTitle className="text-sm font-medium">Active Now</CardTitle>
// // // //             <Clock className="h-4 w-4 text-muted-foreground" />
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <div className="text-2xl font-bold">+{stats.activeOrders}</div>
// // // //             <p className="text-xs text-muted-foreground mt-1">Orders in preparation</p>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>

// // // //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
// // // //         {/* Recent Orders - Takes up 4 columns */}
// // // //         <Card className="col-span-4">
// // // //           <CardHeader>
// // // //             <CardTitle>Recent Orders</CardTitle>
// // // //             <CardDescription>
// // // //               You made {stats.orders} sales this month.
// // // //             </CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <div className="space-y-8">
// // // //               {recentOrders.map((order) => (
// // // //                 <div key={order.id} className="flex items-center justify-between">
// // // //                   <div className="flex items-center">
// // // //                     <Avatar className="h-9 w-9 hidden sm:block">
// // // //                         <AvatarImage src="" />
// // // //                         <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
// // // //                     </Avatar>
// // // //                     <div className="ml-4 space-y-1">
// // // //                         <p className="text-sm font-medium leading-none">{order.customer}</p>
// // // //                         <p className="text-xs text-muted-foreground">{order.id} • {order.time}</p>
// // // //                     </div>
// // // //                   </div>
                  
// // // //                   <div className="flex items-center gap-4">
// // // //                     <div className="font-medium">
// // // //                         {order.status === 'pending' && <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pending</Badge>}
// // // //                         {order.status === 'preparing' && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Preparing</Badge>}
// // // //                         {order.status === 'ready' && <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Ready</Badge>}
// // // //                         {order.status === 'delivered' && <Badge variant="secondary">Delivered</Badge>}
// // // //                     </div>
// // // //                     <div className="font-bold w-16 text-right">₹{order.total}</div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* Quick Actions / Overview - Takes up 3 columns */}
// // // //         <Card className="col-span-3">
// // // //           <CardHeader>
// // // //             <CardTitle>Restaurant Status</CardTitle>
// // // //             <CardDescription>Quick controls for your store.</CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent className="space-y-4">
// // // //              {/* Status Indicator */}
// // // //              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-100">
// // // //                 <div className="flex items-center gap-3">
// // // //                     <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></div>
// // // //                     <div>
// // // //                         <p className="font-medium text-green-900">Accepting Orders</p>
// // // //                         <p className="text-xs text-green-700">Your restaurant is currently online.</p>
// // // //                     </div>
// // // //                 </div>
// // // //                 <Link href="/admin/settings">
// // // //                     <Button variant="outline" size="sm" className="bg-white border-green-200 text-green-700 hover:bg-green-100">
// // // //                         Change
// // // //                     </Button>
// // // //                 </Link>
// // // //              </div>

// // // //              {/* Quick Links Grid */}
// // // //              <div className="grid grid-cols-2 gap-4">
// // // //                 <Link href="/admin/menu" className="block h-full">
// // // //                     <div className="p-4 border rounded-lg hover:bg-accent transition cursor-pointer text-center space-y-2 h-full flex flex-col items-center justify-center">
// // // //                         <Utensils className="h-6 w-6 text-orange-500" />
// // // //                         <span className="font-medium text-sm block">Manage Menu</span>
// // // //                     </div>
// // // //                 </Link>
// // // //                 <Link href="/qr-generator" className="block h-full">
// // // //                     <div className="p-4 border rounded-lg hover:bg-accent transition cursor-pointer text-center space-y-2 h-full flex flex-col items-center justify-center">
// // // //                         <div className="h-6 w-6 bg-black text-white rounded flex items-center justify-center text-xs font-bold">QR</div>
// // // //                         <span className="font-medium text-sm block">QR Codes</span>
// // // //                     </div>
// // // //                 </Link>
// // // //                 <Link href="/admin/orders" className="block h-full">
// // // //                     <div className="p-4 border rounded-lg hover:bg-accent transition cursor-pointer text-center space-y-2 h-full flex flex-col items-center justify-center">
// // // //                         <ShoppingBag className="h-6 w-6 text-blue-500" />
// // // //                         <span className="font-medium text-sm block">All Orders</span>
// // // //                     </div>
// // // //                 </Link>
// // // //                 <Link href="/admin/settings" className="block h-full">
// // // //                     <div className="p-4 border rounded-lg hover:bg-accent transition cursor-pointer text-center space-y-2 h-full flex flex-col items-center justify-center">
// // // //                         <Store className="h-6 w-6 text-gray-500" />
// // // //                         <span className="font-medium text-sm block">Settings</span>
// // // //                     </div>
// // // //                 </Link>
// // // //              </div>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useSession } from 'next-auth/react';
// // // import { useRouter } from 'next/navigation';
// // // import Link from 'next/link';
// // // import { Store, DollarSign, ShoppingBag, Utensils, TrendingUp, Clock, Plus } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// // // import { Skeleton } from '@/components/ui/skeleton';
// // // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// // // export default function AdminRestaurantDashboard() {
// // //   const { data: session, status } = useSession();
// // //   const router = useRouter();
  
// // //   const [stats, setStats] = useState({ revenue: 0, orders: 0, menuItems: 0, activeOrders: 0 });
// // //   const [recentOrders, setRecentOrders] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     // 1. Wait for loading to finish
// // //     if (status === 'loading') return;

// // //     // 2. DEBUGGING: Check what's happening
// // //     console.log("Current Status:", status);
// // //     console.log("User Role:", session?.user?.role);

// // //     // 3. Security Checks
// // //     if (status === 'unauthenticated') {
// // //       // Don't redirect yet, let's see the debug screen
// // //       // router.push('/auth/signin');
// // //       return;
// // //     }

// // //     // Role check
// // //     if (session?.user && ['admin', 'restaurant_owner'].includes(session.user.role)) {
// // //       fetchDashboardData();
// // //     } else {
// // //       // User is logged in, but not an admin
// // //       console.warn("User is not authorized. Role found:", session?.user?.role);
// // //     }
// // //   }, [session, status, router]);

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       // Simulating API call for now
// // //       await new Promise(resolve => setTimeout(resolve, 800));
// // //       setStats({ revenue: 125000, orders: 450, menuItems: 24, activeOrders: 12 });
// // //       setRecentOrders([
// // //         { id: 'ORD-001', customer: 'Amit Sharma', total: 450, status: 'preparing', time: '10 mins ago' },
// // //         { id: 'ORD-002', customer: 'Priya Singh', total: 1200, status: 'ready', time: '25 mins ago' },
// // //       ]);
// // //     } catch (error) {
// // //       console.error("Failed to load dashboard:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // --- DEBUG SCREEN (REMOVE THIS LATER) ---
// // //   if (status === 'authenticated' && !['admin', 'restaurant_owner'].includes(session?.user?.role)) {
// // //     return (
// // //       <div className="p-10 text-center space-y-4">
// // //         <h1 className="text-2xl font-bold text-red-600">Access Denied (Debug Mode)</h1>
// // //         <p>You are logged in, but your role is incorrect.</p>
// // //         <div className="bg-gray-100 p-4 rounded text-left inline-block">
// // //           <p><strong>Name:</strong> {session.user.name}</p>
// // //           <p><strong>Email:</strong> {session.user.email}</p>
// // //           <p><strong>Role Detected:</strong> {session.user.role || "undefined"}</p>
// // //         </div>
// // //         <p>Please log out and verify your database role is "admin".</p>
// // //       </div>
// // //     );
// // //   }
// // //   // -----------------------------------------

// // //   if (status === 'loading' || (loading && status === 'authenticated')) {
// // //     return (
// // //       <div className="container mx-auto p-8 space-y-8">
// // //         <div className="flex justify-between items-center"><Skeleton className="h-10 w-48" /><Skeleton className="h-10 w-32" /></div>
// // //         <div className="grid gap-4 md:grid-cols-4"><Skeleton className="h-32 rounded-xl" /><Skeleton className="h-32 rounded-xl" /><Skeleton className="h-32 rounded-xl" /><Skeleton className="h-32 rounded-xl" /></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (status === 'unauthenticated') {
// // //     return <div className="p-10 text-center">You are not logged in. <Link href="/auth/signin" className="text-blue-600 underline">Sign in</Link></div>;
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50/50 p-8">
// // //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
// // //         <div>
// // //           <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
// // //           <p className="text-muted-foreground">Overview of your restaurant's performance.</p>
// // //         </div>
// // //         <Link href="/admin/orders">
// // //            <Button className="bg-orange-600 hover:bg-orange-700"><Plus className="mr-2 h-4 w-4" /> New Order</Button>
// // //         </Link>
// // //       </div>

// // //       {/* Stats Cards */}
// // //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
// // //         <Card>
// // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
// // //             <DollarSign className="h-4 w-4 text-muted-foreground" />
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
// // //             <p className="text-xs text-muted-foreground text-green-600 flex items-center mt-1"><TrendingUp className="h-3 w-3 mr-1" />+20.1% from last month</p>
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //             <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
// // //             <ShoppingBag className="h-4 w-4 text-muted-foreground" />
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="text-2xl font-bold">+{stats.orders}</div>
// // //             <p className="text-xs text-muted-foreground mt-1">+180 from last month</p>
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //             <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
// // //             <Utensils className="h-4 w-4 text-muted-foreground" />
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="text-2xl font-bold">{stats.menuItems}</div>
// // //             <p className="text-xs text-muted-foreground mt-1">4 items low on stock</p>
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// // //             <CardTitle className="text-sm font-medium">Active Now</CardTitle>
// // //             <Clock className="h-4 w-4 text-muted-foreground" />
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="text-2xl font-bold">+{stats.activeOrders}</div>
// // //             <p className="text-xs text-muted-foreground mt-1">Orders in preparation</p>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
// // //         <Card className="col-span-4">
// // //           <CardHeader>
// // //             <CardTitle>Recent Orders</CardTitle>
// // //             <CardDescription>You made {stats.orders} sales this month.</CardDescription>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="space-y-8">
// // //               {recentOrders.map((order) => (
// // //                 <div key={order.id} className="flex items-center justify-between">
// // //                   <div className="flex items-center">
// // //                     <Avatar className="h-9 w-9 hidden sm:block">
// // //                       <AvatarImage src="" />
// // //                       <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
// // //                     </Avatar>
// // //                     <div className="ml-4 space-y-1">
// // //                       <p className="text-sm font-medium leading-none">{order.customer}</p>
// // //                       <p className="text-xs text-muted-foreground">{order.id} • {order.time}</p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="font-medium text-sm text-gray-500">{order.status}</div>
// // //                     <div className="font-bold w-16 text-right">₹{order.total}</div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Quick Actions */}
// // //         <Card className="col-span-3">
// // //           <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
// // //           <CardContent className="space-y-4">
// // //              <Link href="/admin/menu" className="block w-full">
// // //                 <Button variant="outline" className="w-full justify-start"><Utensils className="mr-2 h-4 w-4" /> Manage Menu</Button>
// // //              </Link>
// // //              <Link href="/admin/orders" className="block w-full">
// // //                 <Button variant="outline" className="w-full justify-start"><ShoppingBag className="mr-2 h-4 w-4" /> View Orders</Button>
// // //              </Link>
// // //              <Link href="/admin/settings" className="block w-full">
// // //                 <Button variant="outline" className="w-full justify-start"><Store className="mr-2 h-4 w-4" /> Store Settings</Button>
// // //              </Link>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useSession } from 'next-auth/react';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { Store, DollarSign, ShoppingBag, Utensils, TrendingUp, Clock, Plus, RefreshCw } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// // import { Skeleton } from '@/components/ui/skeleton';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Badge } from '@/components/ui/badge';

// // export default function AdminRestaurantDashboard() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();
  
// //   // Real State
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // 1. Auto-Fetch Data (Live Updates)
// //   useEffect(() => {
// //     if (status === 'unauthenticated') router.push('/auth/signin');
// //     if (session) {
// //       fetchDashboardData();
// //       // Poll every 10 seconds for new orders ("Notification" style)
// //       const interval = setInterval(fetchDashboardData, 10000);
// //       return () => clearInterval(interval);
// //     }
// //   }, [session, status]);

// //   // const fetchDashboardData = async () => {
// //   //   try {
// //   //     const res = await fetch('/api/admin/dashboard');
// //   //     const json = await res.json();
// //   //     if (json.success) {
// //   //       setData(json.data);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Failed to load dashboard:", error);
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };
// //   const fetchDashboardData = async () => {
// //     try {
// //       // 👇 Update fetch with 'no-store'
// //       const res = await fetch('/api/admin/dashboard', { cache: 'no-store' });
// //       const json = await res.json();
// //       if (json.success) {
// //         setData(json.data);
// //       }
// //     } catch (error) {
// //       console.error("Failed to load dashboard:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'pending': return 'bg-yellow-100 text-yellow-800';
// //       case 'confirmed': return 'bg-blue-100 text-blue-800';
// //       case 'delivered': return 'bg-green-100 text-green-800';
// //       case 'cancelled': return 'bg-red-100 text-red-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   if (loading || !data) {
// //     return (
// //       <div className="container mx-auto p-8 space-y-8">
// //         <div className="flex justify-between items-center"><Skeleton className="h-10 w-48" /><Skeleton className="h-10 w-32" /></div>
// //         <div className="grid gap-4 md:grid-cols-4"><Skeleton className="h-32 rounded-xl" /><Skeleton className="h-32 rounded-xl" /><Skeleton className="h-32 rounded-xl" /><Skeleton className="h-32 rounded-xl" /></div>
// //       </div>
// //     );
// //   }

// //   const { stats, recentOrders, restaurantName } = data;

// //   return (
// //     <div className="min-h-screen bg-gray-50/50 p-8">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
// //           <p className="text-muted-foreground flex items-center gap-2">
// //             Overview for <span className="font-bold text-orange-600">{restaurantName}</span>
// //           </p>
// //         </div>
// //         <div className="flex gap-2">
// //            <Button variant="outline" onClick={fetchDashboardData}><RefreshCw className="w-4 h-4 mr-2" /> Refresh</Button>
// //            <Link href="/admin/orders">
// //               <Button className="bg-orange-600 hover:bg-orange-700"><ShoppingBag className="mr-2 h-4 w-4" /> Manage Orders</Button>
// //            </Link>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
// //             <DollarSign className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
// //             <p className="text-xs text-muted-foreground text-green-600 flex items-center mt-1"><TrendingUp className="h-3 w-3 mr-1" /> Lifetime</p>
// //           </CardContent>
// //         </Card>
// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
// //             <ShoppingBag className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">{stats.orders}</div>
// //             <p className="text-xs text-muted-foreground mt-1">All time orders</p>
// //           </CardContent>
// //         </Card>
// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
// //             <Utensils className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">{stats.menuItems}</div>
// //             <p className="text-xs text-muted-foreground mt-1">Active dishes</p>
// //           </CardContent>
// //         </Card>
// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Active Now</CardTitle>
// //             <Clock className="h-4 w-4 text-green-500 animate-pulse" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold text-green-600">{stats.activeOrders}</div>
// //             <p className="text-xs text-muted-foreground mt-1">Orders in progress</p>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
// //         <Card className="col-span-4">
// //           <CardHeader>
// //             <CardTitle>Recent Activity</CardTitle>
// //             <CardDescription>Latest orders for {restaurantName}</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-8">
// //               {recentOrders.length === 0 ? (
// //                 <div className="text-center py-4 text-gray-500">No orders yet.</div>
// //               ) : (
// //                 recentOrders.map((order) => (
// //                   <div key={order.id} className="flex items-center justify-between">
// //                     <div className="flex items-center">
// //                       <Avatar className="h-9 w-9 hidden sm:block">
// //                         <AvatarFallback className="bg-orange-100 text-orange-700">{order.customer.charAt(0)}</AvatarFallback>
// //                       </Avatar>
// //                       <div className="ml-4 space-y-1">
// //                         <p className="text-sm font-medium leading-none">{order.customer}</p>
// //                         <p className="text-xs text-muted-foreground">{order.id} • {order.time}</p>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center gap-4">
// //                       <Badge className={getStatusColor(order.status)} variant="secondary">{order.status}</Badge>
// //                       <div className="font-bold w-16 text-right">₹{order.total}</div>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Quick Actions */}
// //         <Card className="col-span-3">
// //           <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
// //           <CardContent className="space-y-4">
// //              <Link href="/admin/menu" className="block w-full">
// //                 <Button variant="outline" className="w-full justify-start"><Utensils className="mr-2 h-4 w-4" /> Manage Menu</Button>
// //              </Link>
// //              <Link href="/admin/orders" className="block w-full">
// //                 <Button variant="outline" className="w-full justify-start"><ShoppingBag className="mr-2 h-4 w-4" /> View All Orders</Button>
// //              </Link>
// //              <Link href="/admin/settings" className="block w-full">
// //                 <Button variant="outline" className="w-full justify-start"><Store className="mr-2 h-4 w-4" /> Store Settings</Button>
// //              </Link>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { 
//   Store, Clock, MapPin, DollarSign, Save, Loader2, Trash2, Plus, QrCode as QrCodeIcon, Download, Printer, RefreshCw, Link as LinkIcon 
// } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useToast } from '@/hooks/use-toast';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from '@/components/ui/badge'; 
// import QRCode from 'qrcode'; // 🔑 Import QRCode here

// // --- Reusable QR Code Component ---
// // This uses the logic from your QrGeneratorPage.jsx
// const QrCodeSection = ({ restaurantSlug, restaurantName }) => {
//     // Note: The public URL structure depends on your Next.js setup.
//     // Assuming the menu route is '/menu/[slug]' or similar.
//     const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
//     const menuUrl = restaurantSlug ? `${baseUrl}/restaurants/${restaurantSlug}` : baseUrl;
    
//     const [qrDataUrl, setQrDataUrl] = useState('');
//     const [qrLoading, setQrLoading] = useState(true);

//     const generateQRCode = async (url) => {
//         setQrLoading(true);
//         try {
//             const dataUrl = await QRCode.toDataURL(url, {
//                 width: 400,
//                 margin: 2,
//                 color: { dark: '#000000', light: '#ffffff' },
//             });
//             setQrDataUrl(dataUrl);
//         } catch (err) {
//             console.error("QR Code generation failed:", err);
//         } finally {
//             setQrLoading(false);
//         }
//     };

//     useEffect(() => {
//         generateQRCode(menuUrl);
//     }, [menuUrl]);

//     const handleDownload = () => {
//         if (!qrDataUrl) return;
//         const link = document.createElement('a');
//         link.href = qrDataUrl;
//         link.download = `${restaurantName}-menu-qr.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };
    
//     const handlePrint = () => {
//         const printWindow = window.open('', '_blank');
//         printWindow.document.write(`
//             <html>
//                 <head>
//                     <title>${restaurantName} QR Code</title>
//                     <style>
//                         body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; padding: 20px;}
//                         img { max-width: 300px; height: auto; border: 5px solid #000; padding: 10px;}
//                         h1 { margin-bottom: 10px; color: #f97316; }
//                         p { color: #666; }
//                     </style>
//                 </head>
//                 <body>
//                     <h1>Scan to View Menu</h1>
//                     <img src="${qrDataUrl}" />
//                     <p style="font-size: 14px; margin-top: 20px;">${menuUrl}</p>
//                 </body>
//             </html>
//         `);
//         printWindow.document.close();
//         printWindow.print();
//     };


//     return (
//         <Card className="col-span-3">
//             <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                     <QrCodeIcon className="w-5 h-5 text-orange-500" /> Menu QR Code
//                 </CardTitle>
//                 <CardDescription>
//                     Share this QR code with customers for direct menu access.
//                 </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                 <div className="flex flex-col items-center justify-center border p-4 rounded-lg bg-gray-50">
//                     {qrLoading ? (
//                         <Loader2 className="h-10 w-10 animate-spin text-orange-500 my-8" />
//                     ) : (
//                         <div className="border-4 border-black p-2 rounded-lg bg-white shadow-lg">
//                             <img 
//                                 src={qrDataUrl} 
//                                 alt="Generated QR Code" 
//                                 className="w-48 h-48 object-contain"
//                             />
//                         </div>
//                     )}
//                     <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
//                         <LinkIcon className="w-3 h-3" /> 
//                         {menuUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
//                     </p>
//                 </div>
//                 {qrDataUrl && (
//                     <div className="flex gap-2">
//                         <Button variant="outline" className="flex-1" onClick={handleDownload}>
//                             <Download className="w-4 h-4 mr-2" /> Download PNG
//                         </Button>
//                         <Button variant="outline" className="flex-1" onClick={handlePrint}>
//                             <Printer className="w-4 h-4 mr-2" /> Print Sheet
//                         </Button>
//                     </div>
//                 )}
//             </CardContent>
//         </Card>
//     );
// };
// // --- End Reusable QR Code Component ---


// export default function AdminSettingsPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { toast } = useToast();
//   
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [restaurantId, setRestaurantId] = useState(null);

//   // --- Base Form Schema for Reset ---
//   const defaultFormData = {
//     name: '',
//     description: '',
//     phone: '',
//     slug: '', // 🔑 Added slug field for QR code generation
//     address: { street: '', city: '', zipCode: '' },
//     deliveryTime: '30-40 min',
//     deliveryFee: 40,
//     minOrder: 0,
//     isActive: true,
//     cuisine: [],
//     image: '',
//     coverImage: '',
//     upiId: '',
//     tags: [],
//     workingHours: {
//       monday: { open: '09:00', close: '22:00' },
//       tuesday: { open: '09:00', close: '22:00' },
//       wednesday: { open: '09:00', close: '22:00' },
//       thursday: { open: '09:00', close: '22:00' },
//       friday: { open: '09:00', close: '23:00' },
//       saturday: { open: '10:00', close: '23:00' },
//       sunday: { open: '10:00', close: '23:00' },
//     }
//   };

//   const [formData, setFormData] = useState(defaultFormData);

//   // Cuisine options
//   const cuisineOptions = [
//     'North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food',
//     'Biryani', 'Desserts', 'Pizza', 'Burger', 'American', 'Mexican',
//     'Thai', 'Japanese', 'Korean', 'Mediterranean'
//   ];

//   // 1. Fetch Current Settings
//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//       return;
//     }

//     if (status === 'authenticated') {
//       fetchSettings();
//     }
//   }, [status, router]);

//   const fetchSettings = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('/api/admin/restaurant'); 
//       const data = await res.json();
//       
//       if (data.success && data.data && data.data.length > 0) {
//         const restaurant = data.data[0]; 
//         setRestaurantId(restaurant._id);
//         
//         setFormData(prev => ({
//           ...prev,
//           name: restaurant.name || '',
//           description: restaurant.description || '',
//           phone: restaurant.contact?.phone || '', 
//           slug: restaurant.slug || '', // 🔑 Fetch slug
//           address: { 
//             street: restaurant.address?.street || '', 
//             city: restaurant.address?.city || '', 
//             zipCode: restaurant.address?.zipCode || '' 
//           },
//           deliveryTime: restaurant.deliveryTime || '30-40 min',
//           deliveryFee: restaurant.deliveryFee || 40,
//           minOrder: restaurant.minOrder || 0,
//           isActive: restaurant.isActive !== undefined ? restaurant.isActive : true,
//           cuisine: restaurant.cuisine || [],
//           image: restaurant.image || '',
//           coverImage: restaurant.coverImage || '',
//           upiId: restaurant.upiId || '',
//           tags: restaurant.tags || [],
//           workingHours: restaurant.workingHours || defaultFormData.workingHours,
//         }));
//       } else {
//         setRestaurantId(null);
//         setFormData(defaultFormData);
//       }
//     } catch (error) {
//       console.error("Failed to load settings:", error);
//       toast({
//         title: "Error",
//         description: "Could not load restaurant settings.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- NEW: Reset Function (Safe) ---
//   const handleNewRestaurant = () => {
//     if (restaurantId && !confirm("Are you sure you want to clear the form to create a new restaurant? The current settings will not be deleted.")) {
//         return;
//     }
//     setRestaurantId(null); 
//     setFormData(defaultFormData); 
//     toast({ title: "Creation Mode", description: "Form cleared. Ready to create new restaurant." });
//   };
//   
//   // --- NEW: Delete Logic ---
//   const handleDeleteRestaurant = async () => {
//     if (!restaurantId || !confirm("WARNING: Are you absolutely sure you want to permanently delete this restaurant? This action cannot be undone.")) {
//         return;
//     }
//     
//     setSaving(true);
//     try {
//         // Use the ID from the state to call the PUT dynamic route
//         const res = await fetch(`/api/admin/restaurant/${restaurantId}`, {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//         });

//         const result = await res.json();

//         if (result.success) {
//             toast({
//                 title: "Deleted!",
//                 description: "The restaurant has been permanently removed.",
//                 variant: "destructive"
//             });
//             // Reset to creation mode after successful deletion
//             setRestaurantId(null);
//             setFormData(defaultFormData);
//         } else {
//             throw new Error(result.error || 'Failed to delete');
//         }
//     } catch (error) {
//         toast({ title: "Error", description: error.message, variant: "destructive" });
//     } finally {
//         setSaving(false);
//     }
//   };


//   // 2. Handle Input Changes
//   const handleChange = (section, field, value) => {
//     setFormData(prev => {
//       if (section === 'root') {
//         return { ...prev, [field]: value };
//       }
//       if (section === 'address') {
//         return { ...prev, address: { ...prev.address, [field]: value } };
//       }
//       if (section === 'workingHours') {
//         return { 
//           ...prev, 
//           workingHours: { 
//             ...prev.workingHours, 
//             [field]: { ...prev.workingHours[field], ...value } 
//           } 
//         };
//       }
//       return prev;
//     });
//   };

//   // Handle cuisine changes
//   const handleCuisineToggle = (cuisine) => {
//     setFormData(prev => {
//       const currentCuisine = [...prev.cuisine];
//       if (currentCuisine.includes(cuisine)) {
//         return { ...prev, cuisine: currentCuisine.filter(c => c !== cuisine) };
//       } else {
//         return { ...prev, cuisine: [...currentCuisine, cuisine] };
//       }
//     });
//   };

//   // Handle tag changes
//   const handleTagAdd = (e) => {
//     if (e.key === 'Enter' && e.target.value.trim()) {
//       const newTag = e.target.value.trim();
//       if (!formData.tags.includes(newTag)) {
//         setFormData(prev => ({
//           ...prev,
//           tags: [...prev.tags, newTag]
//         }));
//       }
//       e.target.value = '';
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   // 3. Save Changes (POST or PUT)
//   const handleSave = async () => {
//     // Frontend validation check
//     if (!formData.name || !formData.address.street || !formData.phone || formData.cuisine.length === 0) {
//         toast({
//             title: "Validation Error",
//             description: "Please fill in Name, Phone, Address, and select at least one Cuisine.",
//             variant: "destructive",
//         });
//         return;
//     }
//     
//     setSaving(true);
//     try {
//       // Determine endpoint and method
//       const currentId = restaurantId; // Use a local variable to ensure the correct ID is sent
//       
//       const url = currentId 
//         ? `/api/admin/restaurant/${currentId}` // PUT
//         : '/api/admin/restaurant'; // POST
//       
//       const method = currentId ? 'PUT' : 'POST';

//       // Ensure numeric values are numbers and send simplified data
//       const payload = {
//         ...formData,
//         deliveryFee: Number(formData.deliveryFee),
//         minOrder: Number(formData.minOrder),
//         
//         // Structure data for API based on your model definition
//         contact: {
//             phone: formData.phone
//         },
//         phone: undefined, // Ensure phone is not sent at the root level if you use the nested object
//       };

//       const res = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();

//       if (result.success) {
//         toast({
//           title: "Success",
//           description: currentId 
//             ? "Restaurant settings updated successfully!" 
//             : "New restaurant created successfully!",
//         });
//         
//         // CRITICAL: Update restaurantId state if a new restaurant was created
//         if (method === 'POST' && result.data?._id) {
//           setRestaurantId(result.data._id);
//         }
//         
//         fetchSettings(); // Refresh data to ensure PUT mode is active next time
//       } else {
//         throw new Error(result.error || 'Failed to save');
//       }
//     } catch (error) {
//       console.error("Save Error:", error);
//       toast({
//         title: "Error",
//         description: `Failed to save: ${error.message}.`,
//         variant: "destructive",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-10 px-4 max-w-5xl">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
//           <p className="text-muted-foreground">
//             {restaurantId ? `Managing: ${formData.name}` : 'Create your restaurant profile'}
//           </p>
//         </div>
//         <div className="flex gap-3">
//           {restaurantId && (
//             <Button 
//                 variant="outline" 
//                 onClick={handleDeleteRestaurant} 
//                 disabled={saving}
//                 className="border-red-400 text-red-600 hover:bg-red-50"
//             >
//                 <Trash2 className="mr-2 h-4 w-4" /> Delete Restaurant
//             </Button>
//           )}
//           {restaurantId && (
//             <Button 
//                 variant="outline" 
//                 onClick={handleNewRestaurant} 
//                 className="border-orange-600 text-orange-600 hover:bg-orange-50"
//             >
//                 <Plus className="mr-2 h-4 w-4" /> Add New
//             </Button>
//           )}
//           <Button 
//             onClick={handleSave} 
//             disabled={saving} 
//             className="bg-orange-600 hover:bg-orange-700"
//           >
//             {saving ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="mr-2 h-4 w-4" />
//                 {restaurantId ? 'Save Changes' : 'Create Restaurant'}
//               </>
//             )}
//           </Button>
//         </div>
//         
//       </div>

//       <Tabs defaultValue="general" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="general">General</TabsTrigger>
//           <TabsTrigger value="delivery">Delivery</TabsTrigger>
//           <TabsTrigger value="cuisine">Cuisine & Tags</TabsTrigger>
//           <TabsTrigger value="hours">Working Hours</TabsTrigger>
//           <TabsTrigger value="payment">Payment</TabsTrigger>
//           {restaurantId && <TabsTrigger value="qr">QR Code</TabsTrigger>}
//         </TabsList>

//         {/* --- GENERAL TAB --- */}
//         <TabsContent value="general">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Restaurant Profile</CardTitle>
//                 <CardDescription>
//                   Basic information visible to your customers.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Restaurant Name *</Label>
//                   <Input 
//                     id="name" 
//                     value={formData.name} 
//                     onChange={(e) => handleChange('root', 'name', e.target.value)}
//                     placeholder="Enter restaurant name"
//                     required
//                   />
//                 </div>
//                 {/* 🔑 New: Slug Input */}
//                 <div className="space-y-2">
//                     <Label htmlFor="slug">Public URL Slug</Label>
//                     <Input 
//                         id="slug" 
//                         value={formData.slug} 
//                         onChange={(e) => handleChange('root', 'slug', e.target.value)}
//                         placeholder="e.g., pizza-house-central"
//                         disabled={!!restaurantId} // Typically slug is only editable on creation
//                     />
//                     <p className="text-xs text-muted-foreground">The unique identifier for your menu URL (e.g., /restaurants/pizza-house-central). Cannot be changed after creation.</p>
//                 </div>
//                 {/* 🔑 End New: Slug Input */}
//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea 
//                     id="description" 
//                     rows={4}
//                     value={formData.description} 
//                     onChange={(e) => handleChange('root', 'description', e.target.value)}
//                     placeholder="Tell customers about your restaurant"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Contact Phone *</Label>
//                   <Input 
//                     id="phone" 
//                     value={formData.phone} 
//                     onChange={(e) => handleChange('root', 'phone', e.target.value)}
//                     placeholder="+91 1234567890"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="image">Logo Image URL</Label>
//                     <Input 
//                       id="image" 
//                       value={formData.image} 
//                       onChange={(e) => handleChange('root', 'image', e.target.value)}
//                       placeholder="https://example.com/logo.jpg"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="coverImage">Cover Image URL</Label>
//                     <Input 
//                       id="coverImage" 
//                       value={formData.coverImage} 
//                       onChange={(e) => handleChange('root', 'coverImage', e.target.value)}
//                       placeholder="https://example.com/cover.jpg"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>Status & Location</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center justify-between rounded-lg border p-4">
//                   <div className="space-y-0.5">
//                     <Label className="text-base">Online Status</Label>
//                     <div className="text-sm text-muted-foreground">
//                       {formData.isActive ? "✅ Restaurant is Open" : "🔴 Restaurant is Closed"}
//                     </div>
//                   </div>
//                   <Switch 
//                     checked={formData.isActive}
//                     onCheckedChange={(checked) => handleChange('root', 'isActive', checked)}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Address *</Label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input 
//                       className="pl-9 mb-2" 
//                       placeholder="Street Address"
//                       value={formData.address.street}
//                       onChange={(e) => handleChange('address', 'street', e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-2">
//                     <Input 
//                       placeholder="City"
//                       value={formData.address.city}
//                       onChange={(e) => handleChange('address', 'city', e.target.value)}
//                       required
//                     />
//                     <Input 
//                       placeholder="Zip Code"
//                       value={formData.address.zipCode}
//                       onChange={(e) => handleChange('address', 'zipCode', e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* --- DELIVERY TAB --- */}
//         <TabsContent value="delivery">
//           <Card>
//             <CardHeader>
//               <CardTitle>Delivery Configuration</CardTitle>
//               <CardDescription>Set your delivery fees and minimum order requirements.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6 md:grid-cols-3">
//               <div className="space-y-2">
//                 <Label htmlFor="deliveryTime">Estimated Delivery Time *</Label>
//                 <div className="relative">
//                   <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Select 
//                     value={formData.deliveryTime}
//                     onValueChange={(value) => handleChange('root', 'deliveryTime', value)}
//                   >
//                     <SelectTrigger className="pl-9">
//                       <SelectValue placeholder="Select time" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="15-25 min">15-25 minutes</SelectItem>
//                       <SelectItem value="20-30 min">20-30 minutes</SelectItem>
//                       <SelectItem value="25-35 min">25-35 minutes</SelectItem>
//                       <SelectItem value="30-40 min">30-40 minutes</SelectItem>
//                       <SelectItem value="35-45 min">35-45 minutes</SelectItem>
//                       <SelectItem value="40-50 min">40-50 minutes</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               
//               <div className="space-y-2">
//                 <Label htmlFor="deliveryFee">Delivery Fee (₹) *</Label>
//                 <div className="relative">
//                   <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     id="deliveryFee" 
//                     type="number" 
//                     className="pl-9"
//                     value={formData.deliveryFee}
//                     onChange={(e) => handleChange('root', 'deliveryFee', Number(e.target.value))}
//                     min="0"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="minOrder">Minimum Order (₹) *</Label>
//                 <div className="relative">
//                   <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     id="minOrder" 
//                     type="number" 
//                     className="pl-9"
//                     value={formData.minOrder}
//                     onChange={(e) => handleChange('root', 'minOrder', Number(e.target.value))}
//                     min="0"
//                     required
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* --- CUISINE & TAGS TAB --- */}
//         <TabsContent value="cuisine">
//           <Card>
//             <CardHeader>
//               <CardTitle>Cuisine & Tags</CardTitle>
//               <CardDescription>Select the cuisines you serve and add relevant tags.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <Label className="mb-4 block">Select Cuisines *</Label>
//                 <div className="flex flex-wrap gap-2">
//                   {cuisineOptions.map((cuisine) => (
//                     <Button
//                       key={cuisine}
//                       type="button"
//                       variant={formData.cuisine.includes(cuisine) ? "default" : "outline"}
//                       className={`${
//                         formData.cuisine.includes(cuisine) 
//                           ? 'bg-orange-600 hover:bg-orange-700' 
//                           : ''
//                       }`}
//                       onClick={() => handleCuisineToggle(cuisine)}
//                     >
//                       {cuisine}
//                     </Button>
//                   ))}
//                 </div>
//                 {formData.cuisine.length === 0 && (
//                   <p className="text-sm text-red-500 mt-2">Please select at least one cuisine</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="tags">Tags</Label>
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {formData.tags.map((tag) => (
//                     <Badge key={tag} variant="secondary" className="px-3 py-1">
//                       {tag}
//                       <button
//                         onClick={() => handleTagRemove(tag)}
//                         className="ml-2 text-xs hover:text-red-500"
//                       >
//                         <Trash2 className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//                 <Input 
//                   placeholder="Type a tag and press Enter"
//                   onKeyDown={handleTagAdd}
//                 />
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Add tags like "Family Friendly", "Late Night", "Healthy Options", etc.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* --- HOURS TAB --- */}
//         <TabsContent value="hours">
//           <Card>
//             <CardHeader>
//               <CardTitle>Operating Hours</CardTitle>
//               <CardDescription>Set the opening and closing times for each day of the week.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
//                 <div key={day} className="grid grid-cols-3 items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
//                   <Label className="capitalize font-medium">{day}</Label>
//                   <div className="col-span-2 flex gap-4">
//                     <div className="grid w-full items-center gap-1.5">
//                       <Label htmlFor={`${day}-open`} className="text-xs text-muted-foreground">Open</Label>
//                       <Input 
//                         id={`${day}-open`} 
//                         type="time" 
//                         value={formData.workingHours[day]?.open || ''}
//                         onChange={(e) => handleChange('workingHours', day, { open: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid w-full items-center gap-1.5">
//                       <Label htmlFor={`${day}-close`} className="text-xs text-muted-foreground">Close</Label>
//                       <Input 
//                         id={`${day}-close`} 
//                         type="time" 
//                         value={formData.workingHours[day]?.close || ''}
//                         onChange={(e) => handleChange('workingHours', day, { close: e.target.value })}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* --- PAYMENT TAB --- */}
//         <TabsContent value="payment">
//           <Card>
//             <CardHeader>
//               <CardTitle>Payment Settings</CardTitle>
//               <CardDescription>Configure your UPI ID for payments.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="upiId">UPI ID</Label>
//                 <Input 
//                   id="upiId" 
//                   value={formData.upiId} 
//                   onChange={(e) => handleChange('root', 'upiId', e.target.value)}
//                   placeholder="yourname@upi"
//                 />
//                 <p className="text-sm text-muted-foreground">
//                   Customers will pay to this UPI ID when ordering from your restaurant.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* --- QR CODE TAB --- */}
//         {restaurantId && (
//             <TabsContent value="qr">
//                 {/* 🔑 Embed the QR Code Section component here */}
//                 <QrCodeSection 
//                     restaurantSlug={formData.slug} 
//                     restaurantName={formData.name} 
//                 />
//             </TabsContent>
//         )}
//       </Tabs>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Store, Clock, MapPin, DollarSign, Save, Loader2, Trash2, Plus, QrCode as QrCodeIcon, Download, Printer, RefreshCw, Link as LinkIcon 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge'; 
import QRCode from 'qrcode'; // Dependency for QR Code generation

// --- Reusable QR Code Component ---
// NOTE: This component must be fully implemented in src/components/QrCodeSection.jsx
const QrCodeSection = ({ restaurantSlug, restaurantName }) => {
    // This inline definition is used only for execution in this file. 
    // You should ensure the external file src/components/QrCodeSection.jsx exists.
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
    const menuUrl = restaurantSlug ? `${baseUrl}/restaurants/${restaurantSlug}` : baseUrl;
    
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [qrLoading, setQrLoading] = useState(true);

    const generateQRCode = async (url) => {
        setQrLoading(true);
        try {
            const dataUrl = await QRCode.toDataURL(url, {
                width: 400,
                margin: 2,
                color: { dark: '#000000', light: '#ffffff' },
            });
            setQrDataUrl(dataUrl);
        } catch (err) {
            console.error("QR Code generation failed:", err);
        } finally {
            setQrLoading(false);
        }
    };

    useEffect(() => {
        if (restaurantSlug) generateQRCode(menuUrl);
    }, [menuUrl, restaurantSlug]);

    const handleDownload = () => {
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `${restaurantName}-menu-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${restaurantName} QR Code</title>
                    <style>
                        body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; padding: 20px;}
                        img { max-width: 300px; height: auto; border: 5px solid #000; padding: 10px;}
                        h1 { margin-bottom: 10px; color: #f97316; }
                        p { color: #666; }
                    </style>
                </head>
                <body>
                    <h1>Scan to View Menu</h1>
                    <img src="${qrDataUrl}" />
                    <p style="font-size: 14px; margin-top: 20px;">${menuUrl}</p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <QrCodeIcon className="w-5 h-5 text-orange-500" /> Menu QR Code
                </CardTitle>
                <CardDescription>
                    Share this QR code with customers for direct menu access.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center border p-4 rounded-lg bg-gray-50">
                    {qrLoading ? (
                        <Loader2 className="h-10 w-10 animate-spin text-orange-500 my-8" />
                    ) : qrDataUrl ? (
                        <div className="border-4 border-black p-2 rounded-lg bg-white shadow-lg">
                            <img 
                                src={qrDataUrl} 
                                alt="Generated QR Code" 
                                className="w-48 h-48 object-contain"
                            />
                        </div>
                    ) : (
                         <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-sm">No URL (Save settings first)</span>
                        </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> 
                        {menuUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </p>
                </div>
                {qrDataUrl && (
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" /> Download PNG
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={handlePrint}>
                            <Printer className="w-4 h-4 mr-2" /> Print Sheet
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
// --- End Reusable QR Code Component ---


export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null);

  // --- Base Form Schema for Reset ---
  const defaultFormData = {
    name: '',
    description: '',
    phone: '',
    slug: '', // 🔑 Added slug field for QR code generation
    address: { street: '', city: '', zipCode: '' },
    deliveryTime: '30-40 min',
    deliveryFee: 40,
    minOrder: 0,
    isActive: true,
    cuisine: [],
    image: '',
    coverImage: '',
    upiId: '',
    tags: [],
    workingHours: {
      monday: { open: '09:00', close: '22:00' },
      tuesday: { open: '09:00', close: '22:00' },
      wednesday: { open: '09:00', close: '22:00' },
      thursday: { open: '09:00', close: '22:00' },
      friday: { open: '09:00', close: '23:00' },
      saturday: { open: '10:00', close: '23:00' },
      sunday: { open: '10:00', close: '23:00' },
    }
  };

  const [formData, setFormData] = useState(defaultFormData);

  // Cuisine options
  const cuisineOptions = [
    'North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food',
    'Biryani', 'Desserts', 'Pizza', 'Burger', 'American', 'Mexican',
    'Thai', 'Japanese', 'Korean', 'Mediterranean'
  ];

  // 1. Fetch Current Settings
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchSettings();
    }
  }, [status, router]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/restaurant'); 
      const data = await res.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const restaurant = data.data[0]; 
        setRestaurantId(restaurant._id);
        
        setFormData(prev => ({
          ...prev,
          name: restaurant.name || '',
          description: restaurant.description || '',
          phone: restaurant.contact?.phone || '', 
          slug: restaurant.slug || '', // 🔑 Fetch slug
          address: { 
            street: restaurant.address?.street || '', 
            city: restaurant.address?.city || '', 
            zipCode: restaurant.address?.zipCode || '' 
          },
          deliveryTime: restaurant.deliveryTime || '30-40 min',
          deliveryFee: restaurant.deliveryFee || 40,
          minOrder: restaurant.minOrder || 0,
          isActive: restaurant.isActive !== undefined ? restaurant.isActive : true,
          cuisine: restaurant.cuisine || [],
          image: restaurant.image || '',
          coverImage: restaurant.coverImage || '',
          upiId: restaurant.upiId || '',
          tags: restaurant.tags || [],
          workingHours: restaurant.workingHours || defaultFormData.workingHours,
        }));
      } else {
        setRestaurantId(null);
        setFormData(defaultFormData);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      toast({
        title: "Error",
        description: "Could not load restaurant settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Reset Function (Safe) ---
  const handleNewRestaurant = () => {
    if (restaurantId && !confirm("Are you sure you want to clear the form to create a new restaurant? The current settings will not be deleted.")) {
        return;
    }
    setRestaurantId(null); 
    setFormData(defaultFormData); 
    toast({ title: "Creation Mode", description: "Form cleared. Ready to create new restaurant." });
  };
  
  // --- NEW: Delete Logic ---
  const handleDeleteRestaurant = async () => {
    if (!restaurantId || !confirm("WARNING: Are you absolutely sure you want to permanently delete this restaurant? This action cannot be undone.")) {
        return;
    }
    
    setSaving(true);
    try {
        // Use the ID from the state to call the DELETE dynamic route
        const res = await fetch(`/api/admin/restaurant/${restaurantId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await res.json();

        if (result.success) {
            toast({
                title: "Deleted!",
                description: "The restaurant has been permanently removed.",
                variant: "destructive"
            });
            // Reset to creation mode after successful deletion
            setRestaurantId(null);
            setFormData(defaultFormData);
        } else {
            throw new Error(result.error || 'Failed to delete');
        }
    } catch (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
        setSaving(false);
    }
  };


  // 2. Handle Input Changes
  const handleChange = (section, field, value) => {
    setFormData(prev => {
      if (section === 'root') {
        return { ...prev, [field]: value };
      }
      if (section === 'address') {
        return { ...prev, address: { ...prev.address, [field]: value } };
      }
      if (section === 'workingHours') {
        return { 
          ...prev, 
          workingHours: { 
            ...prev.workingHours, 
            [field]: { ...prev.workingHours[field], ...value } 
          } 
        };
      }
      return prev;
    });
  };

  // Handle cuisine changes
  const handleCuisineToggle = (cuisine) => {
    setFormData(prev => {
      const currentCuisine = [...prev.cuisine];
      if (currentCuisine.includes(cuisine)) {
        return { ...prev, cuisine: currentCuisine.filter(c => c !== cuisine) };
      } else {
        return { ...prev, cuisine: [...currentCuisine, cuisine] };
      }
    });
  };

  // Handle tag changes
  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // 3. Save Changes (POST or PUT)
  const handleSave = async () => {
    // Frontend validation check
    if (!formData.name || !formData.address.street || !formData.phone || formData.cuisine.length === 0) {
        toast({
            title: "Validation Error",
            description: "Please fill in Name, Phone, Address, and select at least one Cuisine.",
            variant: "destructive",
        });
        return;
    }
    
    setSaving(true);
    try {
      // Determine endpoint and method
      const currentId = restaurantId; 
      
      const url = currentId 
        ? `/api/admin/restaurant/${currentId}` // PUT
        : '/api/admin/restaurant'; // POST
      
      const method = currentId ? 'PUT' : 'POST';

      // Ensure numeric values are numbers and send simplified data
      const payload = {
        ...formData,
        deliveryFee: Number(formData.deliveryFee),
        minOrder: Number(formData.minOrder),
        
        // 🔑 FIX: Correctly structure the nested 'contact' object for validation
        contact: {
            phone: formData.phone
        },
        phone: undefined, // Ensure phone is not sent at the root level
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        toast({
          title: "Success",
          description: currentId 
            ? "Restaurant settings updated successfully!" 
            : "New restaurant created successfully!",
        });
        
        // CRITICAL: Update restaurantId state if a new restaurant was created
        if (method === 'POST' && result.data?._id) {
          setRestaurantId(result.data._id);
        }
        
        fetchSettings(); // Refresh data to ensure PUT mode is active next time
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error("Save Error:", error);
      toast({
        title: "Error",
        description: `Failed to save: ${error.message}.`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
          <p className="text-muted-foreground">
            {restaurantId ? `Managing: ${formData.name}` : 'Create your restaurant profile'}
          </p>
        </div>
        <div className="flex gap-3">
          {restaurantId && (
            <Button 
                variant="outline" 
                onClick={handleDeleteRestaurant} 
                disabled={saving}
                className="border-red-400 text-red-600 hover:bg-red-50"
            >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Restaurant
            </Button>
          )}
          {restaurantId && (
            <Button 
                variant="outline" 
                onClick={handleNewRestaurant} 
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
                <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          )}
          <Button 
            onClick={handleSave} 
            disabled={saving} 
            className="bg-orange-600 hover:bg-orange-700"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {restaurantId ? 'Save Changes' : 'Create Restaurant'}
              </>
            )}
          </Button>
        </div>
        
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="cuisine">Cuisine & Tags</TabsTrigger>
          <TabsTrigger value="hours">Working Hours</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          {restaurantId && <TabsTrigger value="qr">QR Code</TabsTrigger>}
        </TabsList>

        {/* --- GENERAL TAB --- */}
        <TabsContent value="general">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Restaurant Profile</CardTitle>
                <CardDescription>
                  Basic information visible to your customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name *</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => handleChange('root', 'name', e.target.value)}
                    placeholder="Enter restaurant name"
                    required
                  />
                </div>
                {/* 🔑 New: Slug Input */}
                <div className="space-y-2">
                    <Label htmlFor="slug">Public URL Slug</Label>
                    <Input 
                        id="slug" 
                        value={formData.slug} 
                        onChange={(e) => handleChange('root', 'slug', e.target.value)}
                        placeholder="e.g., pizza-house-central"
                        disabled={!!restaurantId} // Typically slug is only editable on creation
                    />
                    <p className="text-xs text-muted-foreground">The unique identifier for your menu URL (e.g., /restaurants/pizza-house-central). Cannot be changed after creation.</p>
                </div>
                {/* 🔑 End New: Slug Input */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    rows={4}
                    value={formData.description} 
                    onChange={(e) => handleChange('root', 'description', e.target.value)}
                    placeholder="Tell customers about your restaurant"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone *</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={(e) => handleChange('root', 'phone', e.target.value)}
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Logo Image URL</Label>
                    <Input 
                      id="image" 
                      value={formData.image} 
                      onChange={(e) => handleChange('root', 'image', e.target.value)}
                      placeholder="https://example.com/logo.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input 
                      id="coverImage" 
                      value={formData.coverImage} 
                      onChange={(e) => handleChange('root', 'coverImage', e.target.value)}
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Status & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Online Status</Label>
                    <div className="text-sm text-muted-foreground">
                      {formData.isActive ? "✅ Restaurant is Open" : "🔴 Restaurant is Closed"}
                    </div>
                  </div>
                  <Switch 
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleChange('root', 'isActive', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-9 mb-2" 
                      placeholder="Street Address"
                      value={formData.address.street}
                      onChange={(e) => handleChange('address', 'street', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="City"
                      value={formData.address.city}
                      onChange={(e) => handleChange('address', 'city', e.target.value)}
                      required
                    />
                    <Input 
                      placeholder="Zip Code"
                      value={formData.address.zipCode}
                      onChange={(e) => handleChange('address', 'zipCode', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- DELIVERY TAB --- */}
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Configuration</CardTitle>
              <CardDescription>Set your delivery fees and minimum order requirements.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Estimated Delivery Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Select 
                    value={formData.deliveryTime}
                    onValueChange={(value) => handleChange('root', 'deliveryTime', value)}
                  >
                    <SelectTrigger className="pl-9">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15-25 min">15-25 minutes</SelectItem>
                      <SelectItem value="20-30 min">20-30 minutes</SelectItem>
                      <SelectItem value="25-35 min">25-35 minutes</SelectItem>
                      <SelectItem value="30-40 min">30-40 minutes</SelectItem>
                      <SelectItem value="35-45 min">35-45 minutes</SelectItem>
                      <SelectItem value="40-50 min">40-50 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryFee">Delivery Fee (₹) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="deliveryFee" 
                    type="number" 
                    className="pl-9"
                    value={formData.deliveryFee}
                    onChange={(e) => handleChange('root', 'deliveryFee', Number(e.target.value))}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order (₹) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="minOrder" 
                    type="number" 
                    className="pl-9"
                    value={formData.minOrder}
                    onChange={(e) => handleChange('root', 'minOrder', Number(e.target.value))}
                    min="0"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- CUISINE & TAGS TAB --- */}
        <TabsContent value="cuisine">
          <Card>
            <CardHeader>
              <CardTitle>Cuisine & Tags</CardTitle>
              <CardDescription>Select the cuisines you serve and add relevant tags.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-4 block">Select Cuisines *</Label>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <Button
                      key={cuisine}
                      type="button"
                      variant={formData.cuisine.includes(cuisine) ? "default" : "outline"}
                      className={`${
                        formData.cuisine.includes(cuisine) 
                          ? 'bg-orange-600 hover:bg-orange-700' 
                          : ''
                      }`}
                      onClick={() => handleCuisineToggle(cuisine)}
                    >
                      {cuisine}
                    </Button>
                  ))}
                </div>
                {formData.cuisine.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">Please select at least one cuisine</p>
                )}
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-xs hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input 
                  placeholder="Type a tag and press Enter"
                  onKeyDown={handleTagAdd}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Add tags like "Family Friendly", "Late Night", "Healthy Options", etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- HOURS TAB --- */}
        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <CardDescription>Set the opening and closing times for each day of the week.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <div key={day} className="grid grid-cols-3 items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <Label className="capitalize font-medium">{day}</Label>
                  <div className="col-span-2 flex gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor={`${day}-open`} className="text-xs text-muted-foreground">Open</Label>
                      <Input 
                        id={`${day}-open`} 
                        type="time" 
                        value={formData.workingHours[day]?.open || ''}
                        onChange={(e) => handleChange('workingHours', day, { open: e.target.value })}
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor={`${day}-close`} className="text-xs text-muted-foreground">Close</Label>
                      <Input 
                        id={`${day}-close`} 
                        type="time" 
                        value={formData.workingHours[day]?.close || ''}
                        onChange={(e) => handleChange('workingHours', day, { close: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- PAYMENT TAB --- */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure your UPI ID for payments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input 
                  id="upiId" 
                  value={formData.upiId} 
                  onChange={(e) => handleChange('root', 'upiId', e.target.value)}
                  placeholder="yourname@upi"
                />
                <p className="text-sm text-muted-foreground">
                  Customers will pay to this UPI ID when ordering from your restaurant.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- QR CODE TAB --- */}
        {restaurantId && (
            <TabsContent value="qr">
                {/* 🔑 Embed the QR Code Section component here */}
                <QrCodeSection 
                    restaurantSlug={formData.slug} 
                    restaurantName={formData.name} 
                />
            </TabsContent>
        )}
      </Tabs>
    </div>
  );
}