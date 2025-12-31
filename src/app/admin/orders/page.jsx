// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { useSession } from 'next-auth/react';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import { 
// // // // // //   CheckCircle, 
// // // // // //   Clock, 
// // // // // //   XCircle, 
// // // // // //   Truck, 
// // // // // //   ChefHat, 
// // // // // //   RefreshCw, 
// // // // // //   Filter,
// // // // // //   Search,
// // // // // //   MoreVertical
// // // // // // } from 'lucide-react';

// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // import {
// // // // // //   DropdownMenu,
// // // // // //   DropdownMenuContent,
// // // // // //   DropdownMenuItem,
// // // // // //   DropdownMenuLabel,
// // // // // //   DropdownMenuTrigger,
// // // // // // } from "@/components/ui/dropdown-menu";
// // // // // // import { useToast } from '@/hooks/use-toast';
// // // // // // import { Skeleton } from '@/components/ui/skeleton';

// // // // // // export default function AdminOrdersPage() {
// // // // // //   const { data: session, status } = useSession();
// // // // // //   const router = useRouter();
// // // // // //   const { toast } = useToast();

// // // // // //   const [orders, setOrders] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [filterStatus, setFilterStatus] = useState('all');
// // // // // //   const [searchQuery, setSearchQuery] = useState('');

// // // // // //   // 1. Fetch Orders
// // // // // //   const fetchOrders = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       // Ensure you have created this GET endpoint: src/app/api/admin/orders/route.js
// // // // // //       // If not created yet, it will fail, but the UI structure is correct.
// // // // // //       const res = await fetch('/api/admin/orders'); 
// // // // // //       const data = await res.json();

// // // // // //       if (data.success) {
// // // // // //         setOrders(data.data);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Failed to fetch orders", error);
// // // // // //       toast({
// // // // // //         title: "Error",
// // // // // //         description: "Failed to fetch orders",
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (status === 'unauthenticated') {
// // // // // //       router.push('/auth/signin');
// // // // // //     } else if (session?.user?.role === 'admin' || session?.user?.role === 'restaurant_owner') {
// // // // // //       fetchOrders();
// // // // // //     }
// // // // // //   }, [session, status, router]);

// // // // // //   // 2. Update Order Status
// // // // // //   const handleStatusUpdate = async (orderId, newStatus) => {
// // // // // //     try {
// // // // // //       // Optimistic update
// // // // // //       setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));

// // // // // //       const res = await fetch(`/api/admin/orders/${orderId}`, {
// // // // // //         method: 'PUT',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({ status: newStatus }),
// // // // // //       });

// // // // // //       const data = await res.json();

// // // // // //       if (!data.success) throw new Error(data.error);

// // // // // //       toast({
// // // // // //         title: "Status Updated",
// // // // // //         description: `Order marked as ${newStatus}`,
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error(error);
// // // // // //       toast({
// // // // // //         title: "Error",
// // // // // //         description: "Failed to update status",
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //       fetchOrders(); // Revert on failure
// // // // // //     }
// // // // // //   };

// // // // // //   // 3. Filter Logic
// // // // // //   const filteredOrders = orders.filter(order => {
// // // // // //     const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
// // // // // //     const matchesSearch = 
// // // // // //       order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // //       order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
// // // // // //     return matchesStatus && matchesSearch;
// // // // // //   });

// // // // // //   // Helper: Status Colors & Icons
// // // // // //   const getStatusConfig = (status) => {
// // // // // //     switch (status) {
// // // // // //       case 'pending': return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Pending' };
// // // // // //       case 'confirmed': return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle, label: 'Confirmed' };
// // // // // //       case 'preparing': return { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: ChefHat, label: 'Preparing' };
// // // // // //       case 'ready': return { color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: CheckCircle, label: 'Ready' };
// // // // // //       case 'out_for_delivery': return { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: Truck, label: 'Out for Delivery' };
// // // // // //       case 'delivered': return { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Delivered' };
// // // // // //       case 'cancelled': return { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Cancelled' };
// // // // // //       default: return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: status };
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
// // // // // //       {/* Header */}
// // // // // //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
// // // // // //         <div>
// // // // // //           <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
// // // // // //           <p className="text-muted-foreground">Manage and track all incoming orders.</p>
// // // // // //         </div>
// // // // // //         <div className="flex items-center gap-2">
// // // // // //           <Button variant="outline" size="sm" onClick={fetchOrders} className="gap-2">
// // // // // //             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
// // // // // //             Refresh
// // // // // //           </Button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Filters & Tabs */}
// // // // // //       <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
// // // // // //         <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setFilterStatus}>
// // // // // //           <TabsList className="grid w-full grid-cols-4 md:w-auto">
// // // // // //             <TabsTrigger value="all">All</TabsTrigger>
// // // // // //             <TabsTrigger value="pending">New</TabsTrigger>
// // // // // //             <TabsTrigger value="preparing">Kitchen</TabsTrigger>
// // // // // //             <TabsTrigger value="out_for_delivery">Delivery</TabsTrigger>
// // // // // //           </TabsList>
// // // // // //         </Tabs>

// // // // // //         <div className="relative w-full md:w-72">
// // // // // //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // // // // //           <Input 
// // // // // //             placeholder="Search Order ID or Customer..." 
// // // // // //             className="pl-9"
// // // // // //             value={searchQuery}
// // // // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // // // //           />
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Orders Grid */}
// // // // // //       {loading ? (
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //           {[...Array(6)].map((_, i) => (
// // // // // //             <Skeleton key={i} className="h-64 rounded-xl" />
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       ) : filteredOrders.length === 0 ? (
// // // // // //         <div className="text-center py-20 bg-white rounded-xl border border-dashed">
// // // // // //           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // // //             <Clock className="w-8 h-8 text-gray-400" />
// // // // // //           </div>
// // // // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
// // // // // //           <p className="text-gray-500">Wait for new orders to arrive or adjust filters.</p>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// // // // // //           {filteredOrders.map((order) => {
// // // // // //             const statusConfig = getStatusConfig(order.status);
// // // // // //             const StatusIcon = statusConfig.icon;

// // // // // //             return (
// // // // // //               <Card key={order._id} className="flex flex-col h-full hover:shadow-md transition-shadow">
// // // // // //                 <CardHeader className="pb-3">
// // // // // //                   <div className="flex justify-between items-start">
// // // // // //                     <div>
// // // // // //                       <CardTitle className="text-lg font-bold">{order.orderNumber}</CardTitle>
// // // // // //                       <CardDescription>{new Date(order.createdAt).toLocaleTimeString()} • {order.items.length} Items</CardDescription>
// // // // // //                     </div>
// // // // // //                     <Badge variant="outline" className={`${statusConfig.color} flex gap-1 items-center px-2 py-1`}>
// // // // // //                       <StatusIcon className="w-3 h-3" />
// // // // // //                       {statusConfig.label}
// // // // // //                     </Badge>
// // // // // //                   </div>
// // // // // //                 </CardHeader>

// // // // // //                 <CardContent className="flex-1 pb-4">
// // // // // //                   <div className="space-y-4">
// // // // // //                     {/* Customer Info */}
// // // // // //                     <div className="bg-gray-50 p-3 rounded-lg text-sm">
// // // // // //                       <p className="font-semibold text-gray-900">{order.customer.name}</p>
// // // // // //                       <p className="text-gray-500">{order.customer.phone}</p>
// // // // // //                       {order.deliveryType === 'delivery' && (
// // // // // //                         <p className="text-gray-500 truncate mt-1">
// // // // // //                           {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
// // // // // //                         </p>
// // // // // //                       )}
// // // // // //                       <div className="mt-2 flex gap-2">
// // // // // //                         <Badge variant="secondary" className="text-xs">{order.deliveryType}</Badge>
// // // // // //                         <Badge variant="secondary" className="text-xs uppercase">{order.paymentMethod}</Badge>
// // // // // //                       </div>
// // // // // //                     </div>

// // // // // //                     {/* Items Preview */}
// // // // // //                     <div className="space-y-2">
// // // // // //                       {order.items.map((item, idx) => (
// // // // // //                         <div key={idx} className="flex justify-between text-sm">
// // // // // //                           <span className="text-gray-600">
// // // // // //                             <span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}
// // // // // //                           </span>
// // // // // //                           <span className="font-medium">₹{item.price * item.quantity}</span>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </CardContent>

// // // // // //                 <div className="px-6 pb-2">
// // // // // //                   <div className="flex justify-between items-center py-3 border-t border-dashed">
// // // // // //                     <span className="text-sm font-medium text-gray-500">Total Bill</span>
// // // // // //                     <span className="text-lg font-bold text-gray-900">₹{order.total}</span>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <CardFooter className="pt-2 gap-2">
// // // // // //                   {/* Dynamic Action Buttons based on Status */}
// // // // // //                   {order.status === 'pending' && (
// // // // // //                     <>
// // // // // //                       <Button 
// // // // // //                         variant="outline" 
// // // // // //                         className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
// // // // // //                         onClick={() => handleStatusUpdate(order._id, 'cancelled')}
// // // // // //                       >
// // // // // //                         Reject
// // // // // //                       </Button>
// // // // // //                       <Button 
// // // // // //                         className="flex-1 bg-green-600 hover:bg-green-700"
// // // // // //                         onClick={() => handleStatusUpdate(order._id, 'confirmed')}
// // // // // //                       >
// // // // // //                         Accept Order
// // // // // //                       </Button>
// // // // // //                     </>
// // // // // //                   )}

// // // // // //                   {order.status === 'confirmed' && (
// // // // // //                     <Button 
// // // // // //                       className="w-full bg-blue-600 hover:bg-blue-700"
// // // // // //                       onClick={() => handleStatusUpdate(order._id, 'preparing')}
// // // // // //                     >
// // // // // //                       Start Preparing
// // // // // //                     </Button>
// // // // // //                   )}

// // // // // //                   {order.status === 'preparing' && (
// // // // // //                     <Button 
// // // // // //                       className="w-full bg-indigo-600 hover:bg-indigo-700"
// // // // // //                       onClick={() => handleStatusUpdate(order._id, 'ready')}
// // // // // //                     >
// // // // // //                       Mark Ready
// // // // // //                     </Button>
// // // // // //                   )}

// // // // // //                   {order.status === 'ready' && (
// // // // // //                     <Button 
// // // // // //                       className="w-full bg-orange-600 hover:bg-orange-700"
// // // // // //                       onClick={() => handleStatusUpdate(order._id, 'out_for_delivery')}
// // // // // //                     >
// // // // // //                       {order.deliveryType === 'pickup' ? 'Mark Picked Up' : 'Dispatch Driver'}
// // // // // //                     </Button>
// // // // // //                   )}

// // // // // //                   {order.status === 'out_for_delivery' && (
// // // // // //                     <Button 
// // // // // //                       className="w-full bg-green-600 hover:bg-green-700"
// // // // // //                       onClick={() => handleStatusUpdate(order._id, 'delivered')}
// // // // // //                     >
// // // // // //                       Complete Delivery
// // // // // //                     </Button>
// // // // // //                   )}

// // // // // //                   {(order.status === 'delivered' || order.status === 'cancelled') && (
// // // // // //                     <Button variant="outline" className="w-full" disabled>
// // // // // //                       Order Closed
// // // // // //                     </Button>
// // // // // //                   )}

// // // // // //                   {/* More Options */}
// // // // // //                   <DropdownMenu>
// // // // // //                     <DropdownMenuTrigger asChild>
// // // // // //                       <Button variant="ghost" size="icon">
// // // // // //                         <MoreVertical className="h-4 w-4" />
// // // // // //                       </Button>
// // // // // //                     </DropdownMenuTrigger>
// // // // // //                     <DropdownMenuContent align="end">
// // // // // //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
// // // // // //                       <DropdownMenuItem>Print Receipt</DropdownMenuItem>
// // // // // //                       <DropdownMenuItem>View Details</DropdownMenuItem>
// // // // // //                       <DropdownMenuItem className="text-red-600" onClick={() => handleStatusUpdate(order._id, 'cancelled')}>
// // // // // //                         Cancel Order
// // // // // //                       </DropdownMenuItem>
// // // // // //                     </DropdownMenuContent>
// // // // // //                   </DropdownMenu>
// // // // // //                 </CardFooter>
// // // // // //               </Card>
// // // // // //             );
// // // // // //           })}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client';
// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // import { useState, useEffect } from 'react';
// // // // // import { useSession } from 'next-auth/react';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { Check, X, Clock, Package, Truck, Utensils, RefreshCcw } from 'lucide-react';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // import { Badge } from '@/components/ui/badge';
// // // // // import { useToast } from '@/hooks/use-toast';
// // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// // // // // export default function AdminOrdersPage() {
// // // // //   const { data: session, status } = useSession();
// // // // //   const router = useRouter();
// // // // //   const { toast } = useToast();

// // // // //   const [orders, setOrders] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // Auto-refresh logic
// // // // //   useEffect(() => {
// // // // //     if (status === 'unauthenticated') router.push('/auth/signin');
// // // // //     if (session) {
// // // // //       fetchOrders();
// // // // //       const interval = setInterval(fetchOrders, 15000); // Poll every 15s
// // // // //       return () => clearInterval(interval);
// // // // //     }
// // // // //   }, [session, status]);
// // // // // // const fetchOrders = async () => {
// // // // // //     try {
// // // // // //       // 👇 Update fetch with 'no-store'
// // // // // //       const res = await fetch('/api/admin/orders', { cache: 'no-store' });
// // // // // //       const data = await res.json();
// // // // // //       if (data.success) {
// // // // // //         setOrders(data.data);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Failed to fetch orders:", error);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };
// // // // //   // Add a ref to track previous count
// // // // //   const prevOrderCount = useRef(0);

// // // // //   const fetchOrders = async () => {
// // // // //     try {
// // // // //       const res = await fetch('/api/admin/orders', { cache: 'no-store' });
// // // // //       const data = await res.json();
// // // // //       if (data.success) {
// // // // //         setOrders(data.data);

// // // // //         // Check for new orders
// // // // //         if (data.data.length > prevOrderCount.current && prevOrderCount.current !== 0) {
// // // // //            // Play notification sound
// // // // //            const audio = new Audio('/notification.mp3'); // Put a file in /public folder
// // // // //            audio.play().catch(e => console.log("Audio play failed"));
// // // // //            toast({ title: "New Order Received!", className: "bg-green-600 text-white" });
// // // // //         }
// // // // //         prevOrderCount.current = data.data.length;
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //     }
// // // // //   };
// // // // //   // const fetchOrders = async () => {
// // // // //   //   try {
// // // // //   //     const res = await fetch('/api/admin/orders');
// // // // //   //     const data = await res.json();
// // // // //   //     if (data.success) {
// // // // //   //       setOrders(data.data);
// // // // //   //     }
// // // // //   //   } catch (error) {
// // // // //   //     console.error("Failed to fetch orders:", error);
// // // // //   //   } finally {
// // // // //   //     setLoading(false);
// // // // //   //   }
// // // // //   // };

// // // // //   const updateStatus = async (orderId, newStatus) => {
// // // // //     // Optimistic UI Update (Instant change before API responds)
// // // // //     setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));

// // // // //     try {
// // // // //       const res = await fetch('/api/admin/orders', {
// // // // //         method: 'PUT',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({ orderId, status: newStatus }),
// // // // //       });

// // // // //       const data = await res.json();

// // // // //       if (data.success) {
// // // // //         toast({ title: `Order ${newStatus}`, className: "bg-green-50 border-green-200" });
// // // // //       } else {
// // // // //         fetchOrders(); // Revert on failure
// // // // //         toast({ title: "Update Failed", description: data.error, variant: "destructive" });
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   const getStatusBadge = (status) => {
// // // // //     const styles = {
// // // // //       pending: "bg-yellow-500 hover:bg-yellow-600",
// // // // //       confirmed: "bg-blue-500 hover:bg-blue-600",
// // // // //       preparing: "bg-orange-500 hover:bg-orange-600",
// // // // //       ready: "bg-purple-500 hover:bg-purple-600",
// // // // //       delivered: "bg-green-600 hover:bg-green-700",
// // // // //       cancelled: "bg-red-500 hover:bg-red-600"
// // // // //     };
// // // // //     return <Badge className={styles[status] || "bg-gray-500"}>{status.toUpperCase()}</Badge>;
// // // // //   };

// // // // //   if (loading) return <div className="p-10 text-center">Loading orders...</div>;

// // // // //   // Filter Orders for Tabs
// // // // //   const pendingOrders = orders.filter(o => o.status === 'pending');
// // // // //   const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(o.status));
// // // // //   const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

// // // // //   return (
// // // // //     <div className="container mx-auto p-6 min-h-screen bg-gray-50/30">
// // // // //       <div className="flex justify-between items-center mb-6">
// // // // //         <div>
// // // // //           <h1 className="text-3xl font-bold">Manage Orders</h1>
// // // // //           <p className="text-gray-500">Live order management dashboard.</p>
// // // // //         </div>
// // // // //         <Button onClick={fetchOrders} variant="outline" size="sm">
// // // // //           <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
// // // // //         </Button>
// // // // //       </div>

// // // // //       <Tabs defaultValue="pending" className="space-y-6">
// // // // //         <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
// // // // //           <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
// // // // //           <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
// // // // //           <TabsTrigger value="history">History</TabsTrigger>
// // // // //         </TabsList>

// // // // //         {['pending', 'active', 'history'].map((tabVal) => {
// // // // //           const currentList = tabVal === 'pending' ? pendingOrders : tabVal === 'active' ? activeOrders : pastOrders;

// // // // //           return (
// // // // //             <TabsContent key={tabVal} value={tabVal}>
// // // // //               <div className="grid gap-4">
// // // // //                 {currentList.length === 0 ? (
// // // // //                   <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">No orders in this category.</div>
// // // // //                 ) : (
// // // // //                   currentList.map((order) => (
// // // // //                     <Card key={order._id} className="overflow-hidden border-l-4 border-l-orange-500 shadow-sm">
// // // // //                       <CardHeader className="bg-white pb-3 border-b">
// // // // //                         <div className="flex justify-between items-start">
// // // // //                           <div>
// // // // //                             <div className="flex items-center gap-2 mb-1">
// // // // //                               <span className="font-mono text-sm font-bold">#{order.orderNumber}</span>
// // // // //                               {getStatusBadge(order.status)}
// // // // //                             </div>
// // // // //                             <p className="text-sm text-gray-500">
// // // // //                               {order.customer.name} • {new Date(order.createdAt).toLocaleTimeString()}
// // // // //                             </p>
// // // // //                           </div>
// // // // //                           <div className="text-right">
// // // // //                             <span className="text-xl font-bold block">₹{order.total}</span>
// // // // //                             <span className="text-xs text-gray-400 capitalize">{order.paymentMethod}</span>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </CardHeader>

// // // // //                       <CardContent className="pt-4 bg-gray-50/50">
// // // // //                         {/* Order Items */}
// // // // //                         <div className="space-y-2 mb-4">
// // // // //                           {order.items.map((item, idx) => (
// // // // //                             <div key={idx} className="flex justify-between text-sm">
// // // // //                               <span className="flex items-center gap-2">
// // // // //                                 <Badge variant="outline" className="h-5 w-5 flex items-center justify-center p-0 rounded-full bg-white">
// // // // //                                   {item.quantity}
// // // // //                                 </Badge> 
// // // // //                                 {item.name}
// // // // //                               </span>
// // // // //                               <span className="text-gray-600">₹{item.subtotal}</span>
// // // // //                             </div>
// // // // //                           ))}
// // // // //                         </div>

// // // // //                         {/* Action Buttons Logic */}
// // // // //                         <div className="flex gap-3 justify-end pt-2 border-t">
// // // // //                           {order.status === 'pending' && (
// // // // //                             <>
// // // // //                               <Button variant="destructive" size="sm" onClick={() => updateStatus(order._id, 'cancelled')}>
// // // // //                                 <X className="w-4 h-4 mr-1" /> Reject
// // // // //                               </Button>
// // // // //                               <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={() => updateStatus(order._id, 'confirmed')}>
// // // // //                                 <Check className="w-4 h-4 mr-1" /> Accept Order
// // // // //                               </Button>
// // // // //                             </>
// // // // //                           )}

// // // // //                           {order.status === 'confirmed' && (
// // // // //                             <Button onClick={() => updateStatus(order._id, 'preparing')} className="bg-orange-500 hover:bg-orange-600 text-white">
// // // // //                               <Utensils className="w-4 h-4 mr-2" /> Start Cooking
// // // // //                             </Button>
// // // // //                           )}

// // // // //                           {order.status === 'preparing' && (
// // // // //                             <Button onClick={() => updateStatus(order._id, 'ready')} className="bg-blue-500 hover:bg-blue-600 text-white">
// // // // //                               <Package className="w-4 h-4 mr-2" /> Mark Ready
// // // // //                             </Button>
// // // // //                           )}

// // // // //                           {order.status === 'ready' && (
// // // // //                             <Button onClick={() => updateStatus(order._id, 'delivered')} className="bg-green-600 hover:bg-green-700 text-white">
// // // // //                               <Truck className="w-4 h-4 mr-2" /> Out for Delivery / Done
// // // // //                             </Button>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       </CardContent>
// // // // //                     </Card>
// // // // //                   ))
// // // // //                 )}
// // // // //               </div>
// // // // //             </TabsContent>
// // // // //           );
// // // // //         })}
// // // // //       </Tabs>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react'; // Added useRef here
// // // // import { useSession } from 'next-auth/react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { Check, X, Clock, Package, Truck, Utensils, RefreshCcw } from 'lucide-react';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { useToast } from '@/hooks/use-toast';
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// // // // export default function AdminOrdersPage() {
// // // //   const { data: session, status } = useSession();
// // // //   const router = useRouter();
// // // //   const { toast } = useToast();

// // // //   const [orders, setOrders] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // Track previous order count to trigger notifications
// // // //   const prevOrderCount = useRef(0);

// // // //   // Auto-refresh logic
// // // //   useEffect(() => {
// // // //     if (status === 'unauthenticated') router.push('/auth/signin');

// // // //     if (session) {
// // // //       fetchOrders();
// // // //       const interval = setInterval(fetchOrders, 15000); // Poll every 15s
// // // //       return () => clearInterval(interval);
// // // //     }
// // // //   }, [session, status]);

// // // //   const fetchOrders = async () => {
// // // //     try {
// // // //       // Force fetch to bypass cache
// // // //       const res = await fetch('/api/admin/orders', { cache: 'no-store' });
// // // //       const data = await res.json();

// // // //       if (data.success) {
// // // //         setOrders(data.data);

// // // //         // Check for NEW orders (Notify if count increases)
// // // //         // We specifically check pending orders so notifications are relevant
// // // //         const pendingCount = data.data.filter(o => o.status === 'pending').length;

// // // //         if (pendingCount > prevOrderCount.current && prevOrderCount.current !== 0) {
// // // //            // Play notification sound
// // // //            try {
// // // //              const audio = new Audio('/notification.mp3'); 
// // // //              audio.play().catch(e => console.log("Audio play blocked by browser"));
// // // //            } catch(e) {}

// // // //            toast({ 
// // // //              title: "New Order Received!", 
// // // //              description: "Check the Pending tab.",
// // // //              className: "bg-green-600 text-white border-none" 
// // // //            });
// // // //         }
// // // //         prevOrderCount.current = pendingCount;
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Failed to fetch orders:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const updateStatus = async (orderId, newStatus) => {
// // // //     // Optimistic UI Update
// // // //     setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));

// // // //     try {
// // // //       const res = await fetch('/api/admin/orders', {
// // // //         method: 'PUT',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ orderId, status: newStatus }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (data.success) {
// // // //         toast({ title: `Order ${newStatus}`, className: "bg-green-50 border-green-200" });
// // // //       } else {
// // // //         fetchOrders(); // Revert on failure
// // // //         toast({ title: "Update Failed", description: data.error, variant: "destructive" });
// // // //       }
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       fetchOrders(); // Revert
// // // //     }
// // // //   };

// // // //   const getStatusBadge = (status) => {
// // // //     const styles = {
// // // //       pending: "bg-yellow-500 hover:bg-yellow-600",
// // // //       confirmed: "bg-blue-500 hover:bg-blue-600",
// // // //       preparing: "bg-orange-500 hover:bg-orange-600",
// // // //       ready: "bg-purple-500 hover:bg-purple-600",
// // // //       delivered: "bg-green-600 hover:bg-green-700",
// // // //       cancelled: "bg-red-500 hover:bg-red-600"
// // // //     };
// // // //     return <Badge className={styles[status] || "bg-gray-500"}>{status.toUpperCase()}</Badge>;
// // // //   };

// // // //   if (loading) return <div className="p-10 text-center">Loading orders...</div>;

// // // //   // Filter Orders for Tabs
// // // //   const pendingOrders = orders.filter(o => o.status === 'pending');
// // // //   const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(o.status));
// // // //   const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

// // // //   return (
// // // //     <div className="container mx-auto p-6 min-h-screen bg-gray-50/30">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold">Manage Orders</h1>
// // // //           <p className="text-gray-500">Live order management dashboard.</p>
// // // //         </div>
// // // //         <Button onClick={fetchOrders} variant="outline" size="sm">
// // // //           <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
// // // //         </Button>
// // // //       </div>

// // // //       <Tabs defaultValue="pending" className="space-y-6">
// // // //         <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
// // // //           <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
// // // //           <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
// // // //           <TabsTrigger value="history">History</TabsTrigger>
// // // //         </TabsList>

// // // //         {['pending', 'active', 'history'].map((tabVal) => {
// // // //           const currentList = tabVal === 'pending' ? pendingOrders : tabVal === 'active' ? activeOrders : pastOrders;

// // // //           return (
// // // //             <TabsContent key={tabVal} value={tabVal}>
// // // //               <div className="grid gap-4">
// // // //                 {currentList.length === 0 ? (
// // // //                   <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">No orders in this category.</div>
// // // //                 ) : (
// // // //                   currentList.map((order) => (
// // // //                     <Card key={order._id} className={`overflow-hidden border-l-4 shadow-sm ${order.status === 'pending' ? 'border-l-yellow-500 animate-in fade-in slide-in-from-bottom-2' : 'border-l-blue-500'}`}>
// // // //                       <CardHeader className="bg-white pb-3 border-b">
// // // //                         <div className="flex justify-between items-start">
// // // //                           <div>
// // // //                             <div className="flex items-center gap-2 mb-1">
// // // //                               <span className="font-mono text-sm font-bold">#{order.orderNumber}</span>
// // // //                               {getStatusBadge(order.status)}
// // // //                             </div>
// // // //                             <p className="text-sm text-gray-500">
// // // //                               {order.customer.name} • {new Date(order.createdAt).toLocaleTimeString()}
// // // //                             </p>
// // // //                           </div>
// // // //                           <div className="text-right">
// // // //                             <span className="text-xl font-bold block">₹{order.total}</span>
// // // //                             <span className="text-xs text-gray-400 capitalize">{order.paymentMethod}</span>
// // // //                           </div>
// // // //                         </div>
// // // //                       </CardHeader>

// // // //                       <CardContent className="pt-4 bg-gray-50/50">
// // // //                         {/* Order Items */}
// // // //                         <div className="space-y-2 mb-4">
// // // //                           {order.items.map((item, idx) => (
// // // //                             <div key={idx} className="flex justify-between text-sm">
// // // //                               <span className="flex items-center gap-2">
// // // //                                 <Badge variant="outline" className="h-5 w-5 flex items-center justify-center p-0 rounded-full bg-white">
// // // //                                   {item.quantity}
// // // //                                 </Badge> 
// // // //                                 {item.name}
// // // //                               </span>
// // // //                               <span className="text-gray-600">₹{item.subtotal}</span>
// // // //                             </div>
// // // //                           ))}
// // // //                         </div>

// // // //                         {/* Action Buttons Logic */}
// // // //                         <div className="flex gap-3 justify-end pt-2 border-t">
// // // //                           {order.status === 'pending' && (
// // // //                             <>
// // // //                               <Button variant="destructive" size="sm" onClick={() => updateStatus(order._id, 'cancelled')}>
// // // //                                 <X className="w-4 h-4 mr-1" /> Reject
// // // //                               </Button>
// // // //                               <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={() => updateStatus(order._id, 'confirmed')}>
// // // //                                 <Check className="w-4 h-4 mr-1" /> Accept Order
// // // //                               </Button>
// // // //                             </>
// // // //                           )}

// // // //                           {order.status === 'confirmed' && (
// // // //                             <Button onClick={() => updateStatus(order._id, 'preparing')} className="bg-orange-500 hover:bg-orange-600 text-white">
// // // //                               <Utensils className="w-4 h-4 mr-2" /> Start Cooking
// // // //                             </Button>
// // // //                           )}

// // // //                           {order.status === 'preparing' && (
// // // //                             <Button onClick={() => updateStatus(order._id, 'ready')} className="bg-blue-500 hover:bg-blue-600 text-white">
// // // //                               <Package className="w-4 h-4 mr-2" /> Mark Ready
// // // //                             </Button>
// // // //                           )}

// // // //                           {order.status === 'ready' && (
// // // //                             <Button onClick={() => updateStatus(order._id, 'delivered')} className="bg-green-600 hover:bg-green-700 text-white">
// // // //                               <Truck className="w-4 h-4 mr-2" /> Complete Delivery
// // // //                             </Button>
// // // //                           )}
// // // //                         </div>
// // // //                       </CardContent>
// // // //                     </Card>
// // // //                   ))
// // // //                 )}
// // // //               </div>
// // // //             </TabsContent>
// // // //           );
// // // //         })}
// // // //       </Tabs>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useSession } from 'next-auth/react';
// // // import { useRouter } from 'next/navigation';
// // // import { Check, X, Clock, Package, Truck, Utensils, RefreshCcw, AlertTriangle } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Badge } from '@/components/ui/badge';
// // // import { useToast } from '@/hooks/use-toast';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// // // export default function AdminOrdersPage() {
// // //   const { data: session, status } = useSession();
// // //   const router = useRouter();
// // //   const { toast } = useToast();

// // //   const [orders, setOrders] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const prevOrderCount = useRef(0);

// // //   useEffect(() => {
// // //     if (status === 'unauthenticated') router.push('/auth/signin');
// // //     if (session) {
// // //       fetchOrders();
// // //       const interval = setInterval(fetchOrders, 10000);
// // //       return () => clearInterval(interval);
// // //     }
// // //   }, [session, status]);

// // //   const fetchOrders = async () => {
// // //     try {
// // //       const res = await fetch('/api/admin/orders', { cache: 'no-store' });
// // //       const data = await res.json();

// // //       if (data.success) {
// // //         console.log("📦 Frontend Received Orders:", data.data); // CHECK CONSOLE
// // //         setOrders(data.data);

// // //         // Sound Notification logic
// // //         const pendingCount = data.data.filter(o => o.status === 'pending').length;
// // //         if (pendingCount > prevOrderCount.current && prevOrderCount.current !== 0) {
// // //            try {
// // //              const audio = new Audio('/notification.mp3'); 
// // //              audio.play().catch(() => {});
// // //              toast({ title: "New Order!", className: "bg-green-600 text-white" });
// // //            } catch(e) {}
// // //         }
// // //         prevOrderCount.current = pendingCount;
// // //       }
// // //     } catch (error) {
// // //       console.error("Fetch Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const updateStatus = async (orderId, newStatus) => {
// // //     setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
// // //     try {
// // //       await fetch('/api/admin/orders', {
// // //         method: 'PUT',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ orderId, status: newStatus }),
// // //       });
// // //       toast({ title: `Order ${newStatus}`, className: "bg-green-50 border-green-200" });
// // //     } catch (error) {
// // //       fetchOrders(); 
// // //     }
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const s = status ? status.toLowerCase() : 'unknown';
// // //     const styles = {
// // //       pending: "bg-yellow-500", confirmed: "bg-blue-500", preparing: "bg-orange-500",
// // //       ready: "bg-purple-500", delivered: "bg-green-600", cancelled: "bg-red-500"
// // //     };
// // //     return <Badge className={styles[s] || "bg-gray-500"}>{s.toUpperCase()}</Badge>;
// // //   };

// // //   if (loading) return <div className="p-10 text-center">Loading orders...</div>;

// // //   // Safe Filters (Handle missing status)
// // //   const pendingOrders = orders.filter(o => (o.status || 'pending').toLowerCase() === 'pending');
// // //   const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes((o.status || '').toLowerCase()));
// // //   const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes((o.status || '').toLowerCase()));

// // //   // Render Card Helper
// // //   const OrderCard = ({ order }) => (
// // //     <Card className={`overflow-hidden border-l-4 shadow-sm mb-4 ${order.status === 'pending' ? 'border-l-yellow-500' : 'border-l-blue-500'}`}>
// // //       <CardHeader className="bg-white pb-3 border-b">
// // //         <div className="flex justify-between items-start">
// // //           <div>
// // //             <div className="flex items-center gap-2 mb-1">
// // //               <span className="font-mono text-sm font-bold">#{order.orderNumber}</span>
// // //               {getStatusBadge(order.status)}
// // //             </div>
// // //             <p className="text-sm text-gray-500">
// // //               {/* Safe Access to Customer Name */}
// // //               {order.customer?.name || "Guest"} • {new Date(order.createdAt).toLocaleTimeString()}
// // //             </p>
// // //           </div>
// // //           <div className="text-right">
// // //             <span className="text-xl font-bold block">₹{order.total}</span>
// // //             <span className="text-xs text-gray-400 capitalize">{order.paymentMethod}</span>
// // //           </div>
// // //         </div>
// // //       </CardHeader>

// // //       <CardContent className="pt-4 bg-gray-50/50">
// // //         <div className="space-y-2 mb-4">
// // //           {order.items?.map((item, idx) => (
// // //             <div key={idx} className="flex justify-between text-sm">
// // //               <span className="flex items-center gap-2">
// // //                 <Badge variant="outline" className="bg-white">{item.quantity}x</Badge> 
// // //                 {item.name}
// // //               </span>
// // //               <span className="text-gray-600">₹{item.price * item.quantity}</span>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div className="flex gap-2 justify-end pt-2 border-t">
// // //           {order.status === 'pending' && (
// // //             <>
// // //               <Button variant="destructive" size="sm" onClick={() => updateStatus(order._id, 'cancelled')}>Reject</Button>
// // //               <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={() => updateStatus(order._id, 'confirmed')}>Accept</Button>
// // //             </>
// // //           )}
// // //           {order.status === 'confirmed' && (
// // //             <Button onClick={() => updateStatus(order._id, 'preparing')} className="bg-orange-500 hover:bg-orange-600 text-white">Start Cooking</Button>
// // //           )}
// // //           {order.status === 'preparing' && (
// // //             <Button onClick={() => updateStatus(order._id, 'ready')} className="bg-blue-500 hover:bg-blue-600 text-white">Mark Ready</Button>
// // //           )}
// // //           {order.status === 'ready' && (
// // //             <Button onClick={() => updateStatus(order._id, 'delivered')} className="bg-green-600 hover:bg-green-700 text-white">Complete</Button>
// // //           )}
// // //         </div>
// // //       </CardContent>
// // //     </Card>
// // //   );

// // //   return (
// // //     <div className="container mx-auto p-6 min-h-screen bg-gray-50/30">
// // //       <div className="flex justify-between items-center mb-6">
// // //         <div>
// // //           <h1 className="text-3xl font-bold">Manage Orders</h1>
// // //           <p className="text-gray-500">Live Dashboard</p>
// // //         </div>
// // //         <Button onClick={fetchOrders} variant="outline" size="sm"><RefreshCcw className="w-4 h-4 mr-2" /> Refresh</Button>
// // //       </div>

// // //       <Tabs defaultValue="all" className="space-y-6">
// // //         <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
// // //           <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
// // //           <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
// // //           <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
// // //           <TabsTrigger value="history">History</TabsTrigger>
// // //         </TabsList>

// // //         <TabsContent value="all">
// // //           {orders.length === 0 ? <div className="text-center py-10">No orders found</div> : orders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //         <TabsContent value="pending">
// // //           {pendingOrders.length === 0 ? <div className="text-center py-10">No pending orders</div> : pendingOrders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //         <TabsContent value="active">
// // //           {activeOrders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //         <TabsContent value="history">
// // //           {pastOrders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //       </Tabs>
// // //     </div>
// // //   );
// // // }
// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useSession } from 'next-auth/react';
// // // import { useRouter } from 'next/navigation';
// // // import { Check, X, Clock, Package, Truck, Utensils, RefreshCcw, Bell } from 'lucide-react'; // Added Bell icon
// // // import { Button } from '@/components/ui/button';
// // // import { Card, CardContent, CardHeader } from '@/components/ui/card';
// // // import { Badge } from '@/components/ui/badge';
// // // import { useToast } from '@/hooks/use-toast';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// // // export default function AdminOrdersPage() {
// // //   const { data: session, status } = useSession();
// // //   const router = useRouter();
// // //   const { toast } = useToast();

// // //   const [orders, setOrders] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // 👇 FIXED: Start with -1 to differentiate "First Load" from "0 Orders"
// // //   const prevOrderCount = useRef(-1);

// // //   useEffect(() => {
// // //     if (status === 'unauthenticated') router.push('/auth/signin');
// // //     if (session) {
// // //       fetchOrders();
// // //       const interval = setInterval(fetchOrders, 10000); // Check every 10s
// // //       return () => clearInterval(interval);
// // //     }
// // //   }, [session, status]);

// // //   const fetchOrders = async () => {
// // //     try {
// // //       const res = await fetch('/api/admin/orders', { cache: 'no-store' });
// // //       const data = await res.json();

// // //       if (data.success) {
// // //         // console.log("📦 Orders:", data.data); 
// // //         setOrders(data.data);

// // //         // Count ONLY Pending orders for notifications
// // //         const pendingCount = data.data.filter(o => o.status === 'pending').length;

// // //         // 👇 FIXED NOTIFICATION LOGIC
// // //         // If it's NOT the first load (not -1) AND count has increased
// // //         if (prevOrderCount.current !== -1 && pendingCount > prevOrderCount.current) {
// // //            playNotificationSound();
// // //            toast({ 
// // //              title: "🔔 New Order Received!", 
// // //              description: "Check the Pending tab.",
// // //              className: "bg-green-600 text-white border-none" 
// // //            });
// // //         }

// // //         // Update the ref for next time
// // //         prevOrderCount.current = pendingCount;
// // //       }
// // //     } catch (error) {
// // //       console.error("Fetch Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const playNotificationSound = () => {
// // //     try {
// // //       // Browsers block audio if user hasn't interacted with page.
// // //       // Click anywhere on the dashboard once to enable sound.
// // //       const audio = new Audio('/notification.mp3'); 
// // //       audio.play().catch((err) => console.log("Audio blocked by browser (Click page to enable):", err));
// // //     } catch(e) {}
// // //   };

// // //   const updateStatus = async (orderId, newStatus) => {
// // //     // Optimistic Update
// // //     setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
// // //     try {
// // //       await fetch('/api/admin/orders', {
// // //         method: 'PUT',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ orderId, status: newStatus }),
// // //       });
// // //       toast({ title: `Order ${newStatus}`, className: "bg-green-50 border-green-200" });
// // //     } catch (error) {
// // //       fetchOrders(); 
// // //     }
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const s = status ? status.toLowerCase() : 'unknown';
// // //     const styles = {
// // //       pending: "bg-yellow-500 hover:bg-yellow-600",
// // //       confirmed: "bg-blue-500 hover:bg-blue-600",
// // //       preparing: "bg-orange-500 hover:bg-orange-600",
// // //       ready: "bg-purple-500 hover:bg-purple-600",
// // //       delivered: "bg-green-600 hover:bg-green-700",
// // //       cancelled: "bg-red-500 hover:bg-red-600"
// // //     };
// // //     return <Badge className={styles[s] || "bg-gray-500"}>{s.toUpperCase()}</Badge>;
// // //   };

// // //   if (loading) return <div className="p-10 text-center">Loading orders...</div>;

// // //   const pendingOrders = orders.filter(o => (o.status || 'pending').toLowerCase() === 'pending');
// // //   const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes((o.status || '').toLowerCase()));
// // //   const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes((o.status || '').toLowerCase()));

// // //   // Card Component
// // //   const OrderCard = ({ order }) => (
// // //     <Card key={order._id} className={`overflow-hidden border-l-4 shadow-sm mb-4 ${order.status === 'pending' ? 'border-l-yellow-500 animate-in fade-in slide-in-from-top-2' : 'border-l-blue-500'}`}>
// // //       <CardHeader className="bg-white pb-3 border-b">
// // //         <div className="flex justify-between items-start">
// // //           <div>
// // //             <div className="flex items-center gap-2 mb-1">
// // //               <span className="font-mono text-sm font-bold">#{order.orderNumber}</span>
// // //               {getStatusBadge(order.status)}
// // //             </div>
// // //             <p className="text-sm text-gray-500">
// // //               {order.customer?.name || "Guest"} • {new Date(order.createdAt).toLocaleTimeString()}
// // //             </p>
// // //           </div>
// // //           <div className="text-right">
// // //             <span className="text-xl font-bold block">₹{order.total}</span>
// // //             <span className="text-xs text-gray-400 capitalize">{order.paymentMethod}</span>
// // //           </div>
// // //         </div>
// // //       </CardHeader>
// // //       <CardContent className="pt-4 bg-gray-50/50">
// // //         <div className="space-y-2 mb-4">
// // //           {order.items?.map((item, idx) => (
// // //             <div key={idx} className="flex justify-between text-sm">
// // //               <span className="flex items-center gap-2">
// // //                 <Badge variant="outline" className="bg-white">{item.quantity}x</Badge> 
// // //                 {item.name}
// // //               </span>
// // //               <span className="text-gray-600">₹{item.subtotal || (item.price * item.quantity)}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //         <div className="flex gap-2 justify-end pt-2 border-t">
// // //           {order.status === 'pending' && (
// // //             <>
// // //               <Button variant="destructive" size="sm" onClick={() => updateStatus(order._id, 'cancelled')}><X className="w-4 h-4 mr-1" /> Reject</Button>
// // //               <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={() => updateStatus(order._id, 'confirmed')}><Check className="w-4 h-4 mr-1" /> Accept</Button>
// // //             </>
// // //           )}
// // //           {order.status === 'confirmed' && (
// // //             <Button onClick={() => updateStatus(order._id, 'preparing')} className="bg-orange-500 hover:bg-orange-600 text-white"><Utensils className="w-4 h-4 mr-2" /> Start Cooking</Button>
// // //           )}
// // //           {order.status === 'preparing' && (
// // //             <Button onClick={() => updateStatus(order._id, 'ready')} className="bg-blue-500 hover:bg-blue-600 text-white"><Package className="w-4 h-4 mr-2" /> Mark Ready</Button>
// // //           )}
// // //           {order.status === 'ready' && (
// // //             <Button onClick={() => updateStatus(order._id, 'delivered')} className="bg-green-600 hover:bg-green-700 text-white"><Truck className="w-4 h-4 mr-2" /> Complete</Button>
// // //           )}
// // //         </div>
// // //       </CardContent>
// // //     </Card>
// // //   );

// // //   return (
// // //     <div className="container mx-auto p-6 min-h-screen bg-gray-50/30">
// // //       <div className="flex justify-between items-center mb-6">
// // //         <div>
// // //           <h1 className="text-3xl font-bold">Manage Orders</h1>
// // //           <p className="text-gray-500">Live Dashboard</p>
// // //         </div>
// // //         <Button onClick={fetchOrders} variant="outline" size="sm"><RefreshCcw className="w-4 h-4 mr-2" /> Refresh</Button>
// // //       </div>

// // //       <Tabs defaultValue="all" className="space-y-6">
// // //         <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
// // //           <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
// // //           <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
// // //           <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
// // //           <TabsTrigger value="history">History</TabsTrigger>
// // //         </TabsList>

// // //         <TabsContent value="all">
// // //           {orders.length === 0 ? <div className="text-center py-10">No orders found</div> : orders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //         <TabsContent value="pending">
// // //           {pendingOrders.length === 0 ? <div className="text-center py-10">No pending orders</div> : pendingOrders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //         <TabsContent value="active">
// // //           {activeOrders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //         <TabsContent value="history">
// // //           {pastOrders.map(order => <OrderCard key={order._id} order={order} />)}
// // //         </TabsContent>
// // //       </Tabs>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useSession } from 'next-auth/react';
// // import { useRouter } from 'next/navigation';
// // import { Check, X, Clock, Package, Truck, Utensils, RefreshCcw, Bell } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { useToast } from '@/hooks/use-toast';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// // export default function AdminOrdersPage() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();
// //   const { toast } = useToast();

// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [audioEnabled, setAudioEnabled] = useState(false);

// //   // Start with -1 to differentiate "First Load" from "0 Orders"
// //   const prevOrderCount = useRef(-1);
// //   const audioRef = useRef(null);

// //   useEffect(() => {
// //     if (status === 'unauthenticated') router.push('/auth/signin');
// //     if (session) {
// //       fetchOrders();
// //       const interval = setInterval(fetchOrders, 10000); // Check every 10s
// //       return () => clearInterval(interval);
// //     }
// //   }, [session, status]);

// //   const fetchOrders = async () => {
// //     try {
// //       const res = await fetch('/api/admin/orders', { cache: 'no-store' });
// //       const data = await res.json();

// //       if (data.success) {
// //         setOrders(data.data);

// //         // Count ONLY Pending orders for notifications
// //         const pendingCount = data.data.filter(o => o.status === 'pending').length;

// //         // If it's NOT the first load (not -1) AND count has increased
// //         if (prevOrderCount.current !== -1 && pendingCount > prevOrderCount.current) {
// //            playNotificationSound();
// //            toast({ 
// //              title: "🔔 New Order Received!", 
// //              description: "Check the Pending tab.",
// //              className: "bg-green-600 text-white border-none" 
// //            });
// //         }

// //         // Update the ref for next time
// //         prevOrderCount.current = pendingCount;
// //       }
// //     } catch (error) {
// //       console.error("Fetch Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const playNotificationSound = () => {
// //     if (!audioEnabled) return;

// //     try {
// //       if (audioRef.current) {
// //         audioRef.current.currentTime = 0; // Reset to start
// //         audioRef.current.play().catch((err) => console.log("Audio playback failed:", err));
// //       }
// //     } catch(e) {
// //       console.error("Audio error:", e);
// //     }
// //   };

// //   const enableAudio = () => {
// //     if (audioRef.current) {
// //       audioRef.current.play().then(() => {
// //         audioRef.current.pause();
// //         audioRef.current.currentTime = 0;
// //         setAudioEnabled(true);
// //         toast({ 
// //           title: "🔔 Notifications Enabled", 
// //           description: "You'll hear a sound for new orders",
// //           className: "bg-green-600 text-white border-none" 
// //         });
// //       }).catch(err => {
// //         console.error("Failed to enable audio:", err);
// //         toast({ 
// //           title: "⚠️ Audio Blocked", 
// //           description: "Please check browser permissions",
// //           variant: "destructive"
// //         });
// //       });
// //     }
// //   };

// //   const updateStatus = async (orderId, newStatus) => {
// //     // Optimistic Update
// //     setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
// //     try {
// //       await fetch('/api/admin/orders', {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ orderId, status: newStatus }),
// //       });
// //       toast({ title: `Order ${newStatus}`, className: "bg-green-50 border-green-200" });
// //     } catch (error) {
// //       fetchOrders(); 
// //     }
// //   };

// //   const getStatusBadge = (status) => {
// //     const s = status ? status.toLowerCase() : 'unknown';
// //     const styles = {
// //       pending: "bg-yellow-500 hover:bg-yellow-600",
// //       confirmed: "bg-blue-500 hover:bg-blue-600",
// //       preparing: "bg-orange-500 hover:bg-orange-600",
// //       ready: "bg-purple-500 hover:bg-purple-600",
// //       delivered: "bg-green-600 hover:bg-green-700",
// //       cancelled: "bg-red-500 hover:bg-red-600"
// //     };
// //     return <Badge className={styles[s] || "bg-gray-500"}>{s.toUpperCase()}</Badge>;
// //   };

// //   if (loading) return <div className="p-10 text-center">Loading orders...</div>;

// //   const pendingOrders = orders.filter(o => (o.status || 'pending').toLowerCase() === 'pending');
// //   const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes((o.status || '').toLowerCase()));
// //   const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes((o.status || '').toLowerCase()));

// //   // Card Component
// //   const OrderCard = ({ order }) => (
// //     <Card key={order._id} className={`overflow-hidden border-l-4 shadow-sm mb-4 ${order.status === 'pending' ? 'border-l-yellow-500 animate-in fade-in slide-in-from-top-2' : 'border-l-blue-500'}`}>
// //       <CardHeader className="bg-white pb-3 border-b">
// //         <div className="flex justify-between items-start">
// //           <div>
// //             <div className="flex items-center gap-2 mb-1">
// //               <span className="font-mono text-sm font-bold">#{order.orderNumber}</span>
// //               {getStatusBadge(order.status)}
// //             </div>
// //             <p className="text-sm text-gray-500">
// //               {order.customer?.name || "Guest"} • {new Date(order.createdAt).toLocaleTimeString()}
// //             </p>
// //           </div>
// //           <div className="text-right">
// //             <span className="text-xl font-bold block">₹{order.total}</span>
// //             <span className="text-xs text-gray-400 capitalize">{order.paymentMethod}</span>
// //           </div>
// //         </div>
// //       </CardHeader>
// //       <CardContent className="pt-4 bg-gray-50/50">
// //         <div className="space-y-2 mb-4">
// //           {order.items?.map((item, idx) => (
// //             <div key={idx} className="flex justify-between text-sm">
// //               <span className="flex items-center gap-2">
// //                 <Badge variant="outline" className="bg-white">{item.quantity}x</Badge> 
// //                 {item.name}
// //               </span>
// //               <span className="text-gray-600">₹{item.subtotal || (item.price * item.quantity)}</span>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="flex gap-2 justify-end pt-2 border-t">
// //           {order.status === 'pending' && (
// //             <>
// //               <Button variant="destructive" size="sm" onClick={() => updateStatus(order._id, 'cancelled')}><X className="w-4 h-4 mr-1" /> Reject</Button>
// //               <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={() => updateStatus(order._id, 'confirmed')}><Check className="w-4 h-4 mr-1" /> Accept</Button>
// //             </>
// //           )}
// //           {order.status === 'confirmed' && (
// //             <Button onClick={() => updateStatus(order._id, 'preparing')} className="bg-orange-500 hover:bg-orange-600 text-white"><Utensils className="w-4 h-4 mr-2" /> Start Cooking</Button>
// //           )}
// //           {order.status === 'preparing' && (
// //             <Button onClick={() => updateStatus(order._id, 'ready')} className="bg-blue-500 hover:bg-blue-600 text-white"><Package className="w-4 h-4 mr-2" /> Mark Ready</Button>
// //           )}
// //           {order.status === 'ready' && (
// //             <Button onClick={() => updateStatus(order._id, 'delivered')} className="bg-green-600 hover:bg-green-700 text-white"><Truck className="w-4 h-4 mr-2" /> Complete</Button>
// //           )}
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );

// //   return (
// //     <div className="container mx-auto p-6 min-h-screen bg-gray-50/30">
// //       {/* Hidden audio element */}
// //       <audio ref={audioRef} preload="auto">
// //         <source src="/notification.mp3" type="audio/mpeg" />
// //       </audio>

// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold">Manage Orders</h1>
// //           <p className="text-gray-500">Live Dashboard</p>
// //         </div>
// //         <div className="flex gap-2">
// //           {!audioEnabled && (
// //             <Button onClick={enableAudio} variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
// //               <Bell className="w-4 h-4 mr-2" /> Enable Notifications
// //             </Button>
// //           )}
// //           <Button onClick={fetchOrders} variant="outline" size="sm">
// //             <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
// //           </Button>
// //         </div>
// //       </div>

// //       <Tabs defaultValue="all" className="space-y-6">
// //         <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
// //           <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
// //           <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
// //           <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
// //           <TabsTrigger value="history">History</TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="all">
// //           {orders.length === 0 ? <div className="text-center py-10">No orders found</div> : orders.map(order => <OrderCard key={order._id} order={order} />)}
// //         </TabsContent>
// //         <TabsContent value="pending">
// //           {pendingOrders.length === 0 ? <div className="text-center py-10">No pending orders</div> : pendingOrders.map(order => <OrderCard key={order._id} order={order} />)}
// //         </TabsContent>
// //         <TabsContent value="active">
// //           {activeOrders.map(order => <OrderCard key={order._id} order={order} />)}
// //         </TabsContent>
// //         <TabsContent value="history">
// //           {pastOrders.map(order => <OrderCard key={order._id} order={order} />)}
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { Check, X, Clock, Package, Truck, Utensils, RefreshCcw, Bell } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// export default function AdminOrdersPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { toast } = useToast();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [audioEnabled, setAudioEnabled] = useState(false);

//   // Start with -1 to differentiate "First Load" from "0 Orders"
//   const prevOrderCount = useRef(-1);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (status === 'unauthenticated') router.push('/auth/signin');
//     if (session) {
//       fetchOrders();
//       const interval = setInterval(fetchOrders, 10000); // Check every 10s
//       return () => clearInterval(interval);
//     }
//   }, [session, status]);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch('/api/admin/orders', { cache: 'no-store' });
//       const data = await res.json();

//       if (data.success) {
//         setOrders(data.data);

//         // Count ONLY Pending orders for notifications
//         const pendingCount = data.data.filter(o => o.status === 'pending').length;

//         // If it's NOT the first load (not -1) AND count has increased
//         if (prevOrderCount.current !== -1 && pendingCount > prevOrderCount.current) {
//            playNotificationSound();
//            toast({ 
//              title: "🔔 New Order Received!", 
//              description: "Check the Pending tab.",
//              className: "bg-green-600 text-white border-none" 
//            });
//         }

//         // Update the ref for next time
//         prevOrderCount.current = pendingCount;
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const playNotificationSound = () => {
//     if (!audioEnabled) {
//       console.log("Audio not enabled yet - click 'Enable Notifications' button");
//       return;
//     }

//     try {
//       if (audioRef.current) {
//         audioRef.current.currentTime = 0; // Reset to start
//         const playPromise = audioRef.current.play();

//         if (playPromise !== undefined) {
//           playPromise
//             .then(() => {
//               console.log("✅ Notification sound played successfully!");
//             })
//             .catch((err) => {
//               console.error("❌ Audio playback failed:", err);
//               toast({
//                 title: "Audio Failed",
//                 description: "Click 'Enable Notifications' again",
//                 variant: "destructive"
//               });
//             });
//         }
//       }
//     } catch(e) {
//       console.error("Audio error:", e);
//     }
//   };

//   const enableAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.play().then(() => {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//         setAudioEnabled(true);
//         toast({ 
//           title: "🔔 Notifications Enabled", 
//           description: "You'll hear a sound for new orders",
//           className: "bg-green-600 text-white border-none" 
//         });
//       }).catch(err => {
//         console.error("Failed to enable audio:", err);
//         toast({ 
//           title: "⚠️ Audio Blocked", 
//           description: "Please check browser permissions",
//           variant: "destructive"
//         });
//       });
//     }
//   };

//   const updateStatus = async (orderId, newStatus) => {
//     // Optimistic Update
//     setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
//     try {
//       await fetch('/api/admin/orders', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId, status: newStatus }),
//       });
//       toast({ title: `Order ${newStatus}`, className: "bg-green-50 border-green-200" });
//     } catch (error) {
//       fetchOrders(); 
//     }
//   };

//   const getStatusBadge = (status) => {
//     const s = status ? status.toLowerCase() : 'unknown';
//     const styles = {
//       pending: "bg-yellow-500 hover:bg-yellow-600",
//       confirmed: "bg-blue-500 hover:bg-blue-600",
//       preparing: "bg-orange-500 hover:bg-orange-600",
//       ready: "bg-purple-500 hover:bg-purple-600",
//       delivered: "bg-green-600 hover:bg-green-700",
//       cancelled: "bg-red-500 hover:bg-red-600"
//     };
//     return <Badge className={styles[s] || "bg-gray-500"}>{s.toUpperCase()}</Badge>;
//   };

//   if (loading) return <div className="p-10 text-center">Loading orders...</div>;

//   const pendingOrders = orders.filter(o => (o.status || 'pending').toLowerCase() === 'pending');
//   const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes((o.status || '').toLowerCase()));
//   const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes((o.status || '').toLowerCase()));

//   // Card Component
//   const OrderCard = ({ order }) => (
//     <Card key={order._id} className={`overflow-hidden border-l-4 shadow-sm mb-4 ${order.status === 'pending' ? 'border-l-yellow-500 animate-in fade-in slide-in-from-top-2' : 'border-l-blue-500'}`}>
//       <CardHeader className="bg-white pb-3 border-b">
//         <div className="flex justify-between items-start">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <span className="font-mono text-sm font-bold">#{order.orderNumber}</span>
//               {getStatusBadge(order.status)}
//             </div>
//             <p className="text-sm text-gray-500">
//               {order.customer?.name || "Guest"} • {new Date(order.createdAt).toLocaleTimeString()}
//             </p>
//           </div>
//           <div className="text-right">
//             <span className="text-xl font-bold block">₹{order.total}</span>
//             <span className="text-xs text-gray-400 capitalize">{order.paymentMethod}</span>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="pt-4 bg-gray-50/50">
//         <div className="space-y-2 mb-4">
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="flex justify-between text-sm">
//               <span className="flex items-center gap-2">
//                 <Badge variant="outline" className="bg-white">{item.quantity}x</Badge> 
//                 {item.name}
//               </span>
//               <span className="text-gray-600">₹{item.subtotal || (item.price * item.quantity)}</span>
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-2 justify-end pt-2 border-t">
//           {order.status === 'pending' && (
//             <>
//               <Button variant="destructive" size="sm" onClick={() => updateStatus(order._id, 'cancelled')}><X className="w-4 h-4 mr-1" /> Reject</Button>
//               <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={() => updateStatus(order._id, 'confirmed')}><Check className="w-4 h-4 mr-1" /> Accept</Button>
//             </>
//           )}
//           {order.status === 'confirmed' && (
//             <Button onClick={() => updateStatus(order._id, 'preparing')} className="bg-orange-500 hover:bg-orange-600 text-white"><Utensils className="w-4 h-4 mr-2" /> Start Cooking</Button>
//           )}
//           {order.status === 'preparing' && (
//             <Button onClick={() => updateStatus(order._id, 'ready')} className="bg-blue-500 hover:bg-blue-600 text-white"><Package className="w-4 h-4 mr-2" /> Mark Ready</Button>
//           )}
//           {order.status === 'ready' && (
//             <Button onClick={() => updateStatus(order._id, 'delivered')} className="bg-green-600 hover:bg-green-700 text-white"><Truck className="w-4 h-4 mr-2" /> Complete</Button>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="container mx-auto p-6 min-h-screen bg-gray-50/30">
//       {/* Hidden audio element */}
//       <audio ref={audioRef} preload="auto">
//         <source src="/notification.mp3" type="audio/mpeg" />
//       </audio>

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold">Manage Orders</h1>
//           <p className="text-gray-500">Live Dashboard</p>
//         </div>
//         {/* <div className="flex gap-2">
//           {!audioEnabled ? (
//             <Button onClick={enableAudio} variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
//               <Bell className="w-4 h-4 mr-2" /> Enable Notifications
//             </Button>
//           ) : (
//             <Button onClick={playNotificationSound} variant="outline" size="sm" className="border-green-600 display:none text-green-600 hover:bg-green-50">
//               <Bell className="w-4 h-4 mr-2" /> Test Sound
//             </Button>
//           )}
//           <Button onClick={fetchOrders} variant="outline" size="sm">
//             <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
//           </Button>
//         </div> */}
//         <div className="flex gap-2">
//         {!audioEnabled && (
//           <Button 
//             onClick={enableAudio} 
//             variant="default" 
//             size="sm" 
//             className="bg-green-600 hover:bg-green-700"
//           >
//             <Bell className="w-4 h-4 mr-2" /> Enable Notifications
//           </Button>
//         )}

//         <Button onClick={fetchOrders} variant="outline" size="sm">
//           <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
//         </Button>
//       </div>

//       </div>

//       <Tabs defaultValue="all" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
//           <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
//           <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
//           <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
//           <TabsTrigger value="history">History</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all">
//           {orders.length === 0 ? <div className="text-center py-10">No orders found</div> : orders.map(order => <OrderCard key={order._id} order={order} />)}
//         </TabsContent>
//         <TabsContent value="pending">
//           {pendingOrders.length === 0 ? <div className="text-center py-10">No pending orders</div> : pendingOrders.map(order => <OrderCard key={order._id} order={order} />)}
//         </TabsContent>
//         <TabsContent value="active">
//           {activeOrders.map(order => <OrderCard key={order._id} order={order} />)}
//         </TabsContent>
//         <TabsContent value="history">
//           {pastOrders.map(order => <OrderCard key={order._id} order={order} />)}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
// C:\website\Food Delivary App\foodrush\src\app\admin\orders\page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Check, X, Clock, Package, Truck, Utensils, RefreshCcw, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Start with -1 to differentiate "First Load" from "0 Orders"
  const prevOrderCount = useRef(-1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
    if (session) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 10000); // Check every 10s
      return () => clearInterval(interval);
    }
  }, [session, status]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders', { cache: 'no-store' });
      const data = await res.json();

      if (data.success) {
        setOrders(data.data);

        // Count ONLY Pending orders for notifications
        const pendingCount = data.data.filter(o => o.status === 'pending').length;

        // If it's NOT the first load (not -1) AND count has increased
        if (prevOrderCount.current !== -1 && pendingCount > prevOrderCount.current) {
          playNotificationSound();
          toast({
            title: "🔔 New Order Received!",
            description: "Check the Pending tab.",
            className: "bg-green-600 text-white border-none"
          });
        }

        // Update the ref for next time
        prevOrderCount.current = pendingCount;
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const playNotificationSound = () => {
    if (!audioEnabled) {
      console.log("Audio not enabled yet - click 'Enable Notifications' button");
      return;
    }

    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset to start
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("✅ Notification sound played successfully!");
            })
            .catch((err) => {
              console.error("❌ Audio playback failed:", err);
              toast({
                title: "Audio Failed",
                description: "Click 'Enable Notifications' again",
                variant: "destructive"
              });
            });
        }
      }
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  const enableAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setAudioEnabled(true);
        toast({
          title: "🔔 Notifications Enabled",
          description: "You'll hear a sound for new orders",
          className: "bg-green-600 text-white border-none"
        });
      }).catch(err => {
        console.error("Failed to enable audio:", err);
        toast({
          title: "⚠️ Audio Blocked",
          description: "Please check browser permissions",
          variant: "destructive"
        });
      });
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    // Optimistic Update
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    try {
      await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      toast({ title: `Order ${newStatus}`, className: "bg-green-50 border-green-200" });
    } catch (error) {
      fetchOrders();
    }
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : 'unknown';
    const styles = {
      pending: "bg-yellow-500 hover:bg-yellow-600",
      confirmed: "bg-blue-500 hover:bg-blue-600",
      preparing: "bg-orange-500 hover:bg-orange-600",
      ready: "bg-purple-500 hover:bg-purple-600",
      out_for_delivery: "bg-indigo-500 hover:bg-indigo-600",
      delivered: "bg-green-600 hover:bg-green-700",
      cancelled: "bg-red-500 hover:bg-red-600"
    };
    return <Badge className={styles[s] || "bg-gray-500"}>{s.toUpperCase().replace('-', ' ')}</Badge>;
  };

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;

  const pendingOrders = orders.filter(o => (o.status || 'pending').toLowerCase() === 'pending');
  const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes((o.status || '').toLowerCase()));
  const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes((o.status || '').toLowerCase()));

  // Card Component
  const OrderCard = ({ order }) => (
    <Card key={order._id} className={`overflow-hidden border-l-4 shadow-sm mb-4 ${order.status === 'pending' ? 'border-l-yellow-500 animate-in fade-in slide-in-from-top-2' : 'border-l-blue-500'}`}>
      <CardHeader className="bg-white pb-3 border-b">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-bold">#{order.orderNumber}</span>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-sm text-gray-500">
              {order.customer?.name || "Guest"} • {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold block">₹{order.total}</span>
            <span className="text-xs text-gray-400 capitalize">{order.paymentMethod}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 bg-gray-50/50">
        <div className="space-y-2 mb-4">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">{item.quantity}x</Badge>
                {item.name}
              </span>
              <span className="text-gray-600">₹{item.subtotal || (item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end pt-2 border-t">
          {order.status === 'pending' && (
            <>
              <Button variant="destructive" size="sm" onClick={() => updateStatus(order._id, 'cancelled')}><X className="w-4 h-4 mr-1" /> Reject</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={() => updateStatus(order._id, 'confirmed')}><Check className="w-4 h-4 mr-1" /> Accept</Button>
            </>
          )}
          {order.status === 'confirmed' && (
            <Button onClick={() => updateStatus(order._id, 'preparing')} className="bg-orange-500 hover:bg-orange-600 text-white"><Utensils className="w-4 h-4 mr-2" /> Start Cooking</Button>
          )}
          {order.status === 'preparing' && (
            <Button onClick={() => updateStatus(order._id, 'ready')} className="bg-blue-500 hover:bg-blue-600 text-white"><Package className="w-4 h-4 mr-2" /> Mark Ready</Button>
          )}
          {order.status === 'ready' && (
            <Button onClick={() => updateStatus(order._id, 'out_for_delivery')} className="bg-indigo-500 hover:bg-indigo-600 text-white"><Truck className="w-4 h-4 mr-2" /> Assign Delivery</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50/30">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification.mp3" type="audio/mpeg" />
      </audio>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Orders</h1>
          <p className="text-gray-500">Live Dashboard</p>
        </div>
        <div className="flex gap-2">
          {!audioEnabled && (
            <Button
              onClick={enableAudio}
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Bell className="w-4 h-4 mr-2" /> Enable Notifications
            </Button>
          )}

          <Button onClick={fetchOrders} variant="outline" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {orders.length === 0 ? <div className="text-center py-10">No orders found</div> : orders.map(order => <OrderCard key={order._id} order={order} />)}
        </TabsContent>
        <TabsContent value="pending">
          {pendingOrders.length === 0 ? <div className="text-center py-10">No pending orders</div> : pendingOrders.map(order => <OrderCard key={order._id} order={order} />)}
        </TabsContent>
        <TabsContent value="active">
          {activeOrders.map(order => <OrderCard key={order._id} order={order} />)}
        </TabsContent>
        <TabsContent value="history">
          {pastOrders.map(order => <OrderCard key={order._id} order={order} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}