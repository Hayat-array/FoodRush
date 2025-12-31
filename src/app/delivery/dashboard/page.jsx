'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Package, Truck, Clock, RefreshCw, MapPin, Phone, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DeliveryNavbar from '@/components/DeliveryNavbar';

export default function DeliveryDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [otpInput, setOtpInput] = useState({});

  // Authentication and role check
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

      // Fetch orders when authenticated
      fetchOrders();
      const interval = setInterval(fetchOrders, 30000); // Auto-refresh every 30s
      return () => clearInterval(interval);
    }
  }, [status, session, router]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/delivery/orders');
      const data = await res.json();

      if (data.success) {
        setOrders(data.data || []);
      } else {
        console.error('Failed to fetch orders:', data.error);
        toast({
          title: "Error",
          description: "Failed to load orders",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching delivery orders:', error);
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePickupOrder = async (orderId) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/delivery/pickup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Order Picked Up",
          description: "Order is now out for delivery",
          className: "bg-green-600 text-white border-none"
        });
        fetchOrders();
      } else {
        throw new Error(data.error || 'Failed to pickup order');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleVerifyAndDeliver = async (orderId) => {
    const otp = otpInput[orderId];

    if (!otp || otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 4-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsUpdating(true);
    try {
      const res = await fetch('/api/delivery/verify-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, otp })
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "✅ Delivery Completed",
          description: "Order has been successfully delivered",
          className: "bg-green-600 text-white border-none"
        });
        setOtpInput(prev => ({ ...prev, [orderId]: '' }));
        fetchOrders();
      } else {
        throw new Error(data.error || 'Invalid OTP');
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      ready: 'bg-purple-100 text-purple-800 border-purple-200',
      out_for_delivery: 'bg-blue-100 text-blue-800 border-blue-200',
      delivered: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (status === 'loading' || loading) {
    return (
      <>
        <DeliveryNavbar />
        <div className="container mx-auto p-8">
          <Skeleton className="h-48 w-full mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DeliveryNavbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {session?.user?.name}! Active Orders: {orders.length}
              </p>
            </div>
            <Button
              onClick={fetchOrders}
              variant="outline"
              disabled={isUpdating}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Orders Grid */}
          {orders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <CardTitle className="text-xl mb-2">No Active Orders</CardTitle>
                <CardDescription>
                  No orders currently assigned or ready for pickup.
                </CardDescription>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <Card key={order._id} className="shadow-lg hover:shadow-xl transition">
                  <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.orderNumber || order._id.slice(-6)}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">₹{order.total}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status?.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 space-y-4">
                    {/* Restaurant Pickup */}
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <Label className="text-xs text-gray-600 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3 text-red-500" />
                        Pickup from Restaurant
                      </Label>
                      <p className="text-sm font-medium text-gray-900">
                        {order.restaurant?.name || 'Restaurant'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {order.restaurant?.address?.street || order.restaurant?.address || 'Address'}
                      </p>
                      {/* Restaurant Contact */}
                      <a
                        href={`tel:${order.restaurant?.contact?.phone || ''}`}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-2"
                      >
                        <Phone className="w-3 h-3" />
                        {order.restaurant?.contact?.phone || 'Restaurant Contact'}
                      </a>
                    </div>

                    {/* Customer Delivery */}
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <Label className="text-xs text-gray-600 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3 text-green-500" />
                        Deliver to Customer
                      </Label>
                      <p className="text-sm font-medium text-gray-900">
                        {order.deliveryAddress?.street || 'Customer Address'}
                      </p>
                      {/* Customer Contact */}
                      <a
                        href={`tel:${order.customer?.phone || ''}`}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-2"
                      >
                        <Phone className="w-3 h-3" />
                        {order.customer?.phone || 'No phone number'}
                      </a>
                    </div>

                    {/* OTP Section for out_for_delivery */}
                    {order.status === 'out_for_delivery' && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Label className="text-xs text-gray-700 flex items-center gap-1 mb-2">
                          <AlertCircle className="w-3 h-3 text-yellow-600" />
                          Delivery OTP Required
                        </Label>
                        <Input
                          type="text"
                          maxLength={4}
                          placeholder="Enter 4-digit OTP"
                          value={otpInput[order._id] || ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setOtpInput(prev => ({ ...prev, [order._id]: value }));
                          }}
                          className="text-center text-lg font-mono tracking-widest"
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    {order.status === 'ready' && (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handlePickupOrder(order._id)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Truck className="w-4 h-4 mr-2" />
                        )}
                        Pickup & Start Delivery
                      </Button>
                    )}

                    {order.status === 'out_for_delivery' && (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleVerifyAndDeliver(order._id)}
                        disabled={isUpdating || !otpInput[order._id] || otpInput[order._id].length !== 4}
                      >
                        {isUpdating ? (
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Truck className="w-4 h-4 mr-2" />
                        )}
                        Verify & Complete Delivery
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
