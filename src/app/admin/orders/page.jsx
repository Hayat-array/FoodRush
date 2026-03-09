'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Check, X, Clock, Package, Truck, Utensils, RefreshCcw,
  Search, Filter, MapPin, Store, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleBasedNav from '@/components/RoleBasedNav';

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute allowedRoles={['super_admin']}>
      <AdminOrdersContent />
    </ProtectedRoute>
  );
}

function AdminOrdersContent() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Auto-refresh logic
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-500",
      confirmed: "bg-blue-500",
      accepted: "bg-blue-500",
      preparing: "bg-orange-500",
      ready: "bg-purple-500",
      picked_up: "bg-indigo-500",
      out_for_delivery: "bg-indigo-600",
      delivered: "bg-green-600",
      cancelled: "bg-red-500",
      rejected: "bg-red-500"
    };
    return <Badge className={`${styles[status] || "bg-gray-500"} hover:opacity-90`}>{status.replace(/_/g, ' ').toUpperCase()}</Badge>;
  };

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    // Search Filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchLower) ||
      order.customer?.name?.toLowerCase().includes(searchLower) ||
      order.restaurant?.name?.toLowerCase().includes(searchLower);

    // Status Filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
  const activeOrders = filteredOrders.filter(o => ['confirmed', 'accepted', 'preparing', 'ready', 'picked_up', 'out_for_delivery', 'nearby'].includes(o.status));
  const pastOrders = filteredOrders.filter(o => ['delivered', 'cancelled', 'rejected'].includes(o.status));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50">
      <RoleBasedNav />

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent mb-2">
              All Orders
            </h1>
            <p className="text-gray-600">Monitor all orders across the platform</p>
          </div>
          <Button onClick={fetchOrders} variant="outline" size="sm" className="bg-white">
            <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-sm border-purple-100">
          <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Order #, Customer, or Restaurant..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white border text-gray-600">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:text-yellow-600">
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:text-blue-600">
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:text-green-600">
              History ({pastOrders.length})
            </TabsTrigger>
          </TabsList>

          {['all', 'pending', 'active', 'history'].map((tabVal) => {
            const currentList = tabVal === 'all' ? filteredOrders :
              tabVal === 'pending' ? pendingOrders :
                tabVal === 'active' ? activeOrders : pastOrders;

            return (
              <TabsContent key={tabVal} value={tabVal}>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading orders...</p>
                  </div>
                ) : currentList.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {currentList.map((order) => (
                      <Card key={order._id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="bg-gray-50/50 pb-3 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-bold text-lg text-gray-800">{order.orderNumber}</span>
                                {getStatusBadge(order.status)}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                {new Date(order.createdAt).toLocaleString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full">₹{order.total}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Order Info */}
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-2 uppercase">Items</p>
                              <ul className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <li key={idx} className="flex justify-between text-sm">
                                    <span>
                                      <span className="font-bold mr-2">{item.quantity}x</span>
                                      {item.name}
                                    </span>
                                    <span className="text-gray-600">₹{item.subtotal}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* People Info */}
                          <div className="space-y-4 border-l pl-0 md:pl-6 border-gray-100">
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1 uppercase flex items-center gap-2">
                                <Store className="w-4 h-4" /> Restaurant
                              </p>
                              <p className="font-medium">{order.restaurant?.name || 'Unknown Restaurant'}</p>
                              <p className="text-sm text-gray-500 truncate">{order.restaurant?.address}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1 uppercase flex items-center gap-2">
                                <User className="w-4 h-4" /> Customer
                              </p>
                              <p className="font-medium">{order.customer?.name || 'Guest'}</p>
                              <p className="text-sm text-gray-500">{order.customer?.phone}</p>
                            </div>
                            {order.deliveryType === 'delivery' && (
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-1 uppercase flex items-center gap-2">
                                  <MapPin className="w-4 h-4" /> Delivery Address
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}