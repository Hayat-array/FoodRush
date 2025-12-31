'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MapPin, RefreshCw, Eye, Key, Star, Search, Filter, Download, MessageSquare, Package, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StarRating from '@/components/StarRating';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/stores/cartStore';

export default function MyOrdersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [reviewDialog, setReviewDialog] = useState({ open: false, dishId: null, dishName: '' });
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }
        if (session) {
            fetchOrders();
            // Removed auto-refresh to prevent constant reloading
        }
    }, [session, status, router]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            // Request deliveryOTP field explicitly since it's hidden by default
            const res = await fetch('/api/orders?includeOTP=true');
            if (!res.ok) throw new Error(`API Error: ${res.status}`);

            const data = await res.json();
            if (data.success) {
                console.log('📦 Orders received:', data.data.length);
                // Log first order to check OTP field
                if (data.data.length > 0) {
                    console.log('First order sample:', {
                        orderNumber: data.data[0].orderNumber,
                        status: data.data[0].status,
                        hasOTP: !!data.data[0].deliveryOTP,
                        otp: data.data[0].deliveryOTP
                    });
                }
                setOrders(data.data || []);
            }
        } catch (error) {
            console.error('Fetch Orders Error:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const openReviewDialog = (dishId, dishName) => {
        setReviewDialog({ open: true, dishId, dishName });
        setReviewRating(0);
        setReviewComment('');
    };

    const closeReviewDialog = () => {
        setReviewDialog({ open: false, dishId: null, dishName: '' });
        setReviewRating(0);
        setReviewComment('');
    };

    const handleSubmitReview = async () => {
        if (reviewRating === 0) {
            toast({
                title: "Rating Required",
                description: "Please select a star rating",
                variant: "destructive"
            });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`/api/dishes/${reviewDialog.dishId}/rate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating: reviewRating,
                    comment: reviewComment
                })
            });

            const data = await res.json();
            if (data.success) {
                toast({
                    title: "Review Submitted!",
                    description: `Thank you for rating ${reviewDialog.dishName}!`,
                    className: "bg-green-600 text-white"
                });
                closeReviewDialog();
                setTimeout(() => fetchOrders(), 500);
            } else {
                toast({
                    title: "Review Failed",
                    description: data.error || "Failed to submit review",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Review error:', error);
            toast({
                title: "Error",
                description: "Failed to submit review",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    };

    const trackOrder = (order) => {
        // Show detailed tracking information
        toast({
            title: `📦 Order ${order.orderNumber}`,
            description: (
                <div className="space-y-1 mt-2">
                    <p><strong>Status:</strong> {order.status?.toUpperCase()}</p>
                    <p><strong>Restaurant:</strong> {order.restaurant?.name}</p>
                    {order.deliveryAddress && (
                        <p><strong>Delivery to:</strong> {order.deliveryAddress.street}</p>
                    )}
                    {order.estimatedDeliveryTime && (
                        <p><strong>ETA:</strong> {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}</p>
                    )}
                </div>
            ),
            duration: 5000,
            className: "bg-blue-600 text-white"
        });
    };

    const downloadInvoice = async (order) => {
        try {
            // Generate invoice content
            const invoiceContent = `
INVOICE - ${order.orderNumber}
================================
Restaurant: ${order.restaurant?.name || 'N/A'}
Date: ${new Date(order.createdAt).toLocaleString()}

ITEMS:
${order.items?.map(item => `${item.quantity}x ${item.name} - ₹${item.subtotal || (item.price * item.quantity)}`).join('\n')}

--------------------------------
Subtotal: ₹${order.subtotal || 0}
Delivery Fee: ₹${order.deliveryFee || 0}
Taxes: ₹${order.taxes || 0}
--------------------------------
TOTAL: ₹${order.total}

Payment Method: ${order.paymentMethod?.toUpperCase()}
${order.utrNumber ? `UTR: ${order.utrNumber}` : ''}

Delivery Address:
${order.deliveryAddress ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}` : 'Pickup'}

Thank you for your order!
            `.trim();

            // Create and download text file (in production, use PDF library)
            const blob = new Blob([invoiceContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice-${order.orderNumber}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast({
                title: "✅ Invoice Downloaded",
                description: `Invoice for order ${order.orderNumber} has been downloaded`,
                className: "bg-green-600 text-white"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to download invoice",
                variant: "destructive"
            });
        }
    };

    const contactSupport = (order) => {
        // Open WhatsApp with pre-filled message
        const message = `Hi! I need help with my order ${order.orderNumber}. Status: ${order.status}`;
        const phoneNumber = '1234567890'; // Replace with actual support number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');

        toast({
            title: "💬 Opening WhatsApp",
            description: "Redirecting to support chat...",
            className: "bg-purple-600 text-white"
        });
    };

    const repeatOrder = (order) => {
        // Add all items from this order to cart
        try {
            const { addItem } = useCartStore.getState();

            order.items?.forEach(item => {
                addItem({
                    _id: item.dish,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image || '/placeholder-dish.jpg'
                });
            });

            toast({
                title: "🛒 Items Added to Cart",
                description: `${order.items?.length || 0} items from order ${order.orderNumber} added to cart`,
                className: "bg-orange-600 text-white"
            });

            // Redirect to cart after a short delay
            setTimeout(() => {
                router.push('/cartU');
            }, 1500);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add items to cart",
                variant: "destructive"
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200 animate-pulse';
            case 'ready': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Filter orders based on search, status, and date
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.restaurant?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        let matchesDate = true;
        if (dateFilter !== 'all') {
            const orderDate = new Date(order.createdAt);
            const now = new Date();

            switch (dateFilter) {
                case 'today':
                    matchesDate = orderDate.toDateString() === now.toDateString();
                    break;
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    matchesDate = orderDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    matchesDate = orderDate >= monthAgo;
                    break;
            }
        }

        return matchesSearch && matchesStatus && matchesDate;
    });

    if (loading) {
        return (
            <div className="container mx-auto p-8">
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <Button variant="ghost" size="sm" onClick={fetchOrders}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                </Button>
            </div>

            {/* Search and Filters */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Search by order number or restaurant..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="preparing">Preparing</SelectItem>
                                <SelectItem value="ready">Ready</SelectItem>
                                <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="All Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-xl">
                        {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                            ? 'No orders match your filters. Try adjusting them.'
                            : 'No past orders found. Go buy some food!'}
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <Card key={order._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">{order.restaurant?.name || "Restaurant"}</h3>
                                            <Badge className={getStatusColor(order.status)} variant="outline">
                                                {order.status?.toUpperCase() || 'UNKNOWN'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Order #{order.orderNumber} • {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                        <div className="text-sm text-gray-700 space-y-2 bg-gray-50 p-3 rounded-md border">
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span>{item.quantity} x {item.name}</span>
                                                        <span className="font-medium">₹{item.subtotal || (item.price * item.quantity)}</span>
                                                    </div>
                                                    {order.status === 'delivered' && (
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline"
                                                            className="mt-1 text-xs"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                openReviewDialog(item.dish, item.name);
                                                            }}
                                                        >
                                                            <Star className="w-3 h-3 mr-1" />
                                                            Rate & Review
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="truncate">{order.deliveryAddress?.street || "Home"}</span>
                                            </div>

                                            {/* OTP Display for Out for Delivery Orders */}
                                            {(order.status === 'out_for_delivery' || order.status === 'out-for-delivery') && order.deliveryOTP && (
                                                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mt-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Key className="w-5 h-5 text-yellow-700" />
                                                        <span className="font-semibold text-yellow-900">Delivery Code</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-3xl font-bold text-yellow-900 tracking-widest my-2">
                                                            {order.deliveryOTP}
                                                        </p>
                                                        <p className="text-xs text-yellow-800">
                                                            Share this code with delivery person
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex justify-between font-bold text-black text-lg mt-4 pt-4 border-t">
                                                <span>Total Paid</span>
                                                <span>₹{order.total}</span>
                                            </div>
                                        </div>

                                        {/* Order Action Buttons */}
                                        <div className="mt-4 pt-4 border-t space-y-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => trackOrder(order)}
                                            >
                                                <Package className="w-4 h-4 mr-2" />
                                                Track Order
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => repeatOrder(order)}
                                            >
                                                <RotateCcw className="w-4 h-4 mr-2" />
                                                Repeat Order
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => contactSupport(order)}
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => downloadInvoice(order)}
                                                >
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Review Dialog */}
            <Dialog open={reviewDialog.open} onOpenChange={closeReviewDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Rate & Review: {reviewDialog.dishName}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Star Rating */}
                        <div className="space-y-2">
                            <Label className="text-base font-semibold">Your Rating *</Label>
                            <div className="flex justify-center py-2">
                                <StarRating
                                    rating={reviewRating}
                                    size="lg"
                                    onRate={setReviewRating}
                                />
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="space-y-2">
                            <Label htmlFor="comment">How was your experience? (Optional)</Label>
                            <Textarea
                                id="comment"
                                placeholder="Share your thoughts about this dish..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                rows={4}
                                className="resize-none"
                            />
                            <p className="text-xs text-gray-500">
                                Your review helps others make better choices
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={closeReviewDialog} disabled={submitting}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitReview}
                            disabled={submitting || reviewRating === 0}
                            className="bg-orange-600 hover:bg-orange-700"
                        >
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}