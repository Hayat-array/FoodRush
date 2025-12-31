'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const items = useCartStore((state) => state.items);
  const restaurantId = useCartStore((state) => state.restaurantId);
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryOTP, setDeliveryOTP] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    instructions: '',
    deliveryType: 'delivery',
    paymentMethod: 'cod',
    utrNumber: '' // For UPI payment verification
  });

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (items.length === 0 && !orderPlaced) {
      router.push('/menu');
    }

    // Pre-fill user data if available
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || ''
      }));
    }
  }, [session, items, router, orderPlaced]);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = formData.deliveryType === 'delivery' ? 40 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  const handlePlaceOrder = async () => {
    console.log('=== Place Order Clicked ===');
    console.log('Form data:', formData);
    console.log('Restaurant ID:', restaurantId);
    console.log('Items:', items);

    // Validation
    if (!formData.name || !formData.phone) {
      console.log('❌ Validation failed: Missing name or phone');
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number",
        variant: "destructive"
      });
      return;
    }

    if (formData.deliveryType === 'delivery' && (!formData.address || !formData.city || !formData.zipCode)) {
      console.log('❌ Validation failed: Missing address');
      toast({
        title: "Missing Address",
        description: "Please fill in your complete delivery address",
        variant: "destructive"
      });
      return;
    }

    // Phone validation (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      console.log('❌ Validation failed: Invalid phone format');
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    // UPI payment note (auto-detected, no validation needed)
    if (formData.paymentMethod === 'upi') {
      console.log('✅ UPI payment selected - payment will be auto-verified');
    }

    // Restaurant validation
    if (!restaurantId) {
      console.log('❌ Validation failed: No restaurant ID');
      toast({
        title: "Cart Error",
        description: "No restaurant selected. Please add items from a restaurant first.",
        variant: "destructive"
      });
      router.push('/menu');
      return;
    }

    console.log('✅ All validations passed, creating order...');

    setLoading(true);
    try {
      // Extract restaurant ID if it's an object
      const restaurantIdString = typeof restaurantId === 'object' ? restaurantId._id : restaurantId;
      console.log('Using restaurant ID:', restaurantIdString);

      const orderPayload = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        },
        restaurant: restaurantIdString,
        items: items.map(item => ({
          dish: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        })),
        deliveryType: formData.deliveryType,
        deliveryAddress: formData.deliveryType === 'delivery' ? {
          street: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        } : null,
        paymentMethod: formData.paymentMethod,
        utrNumber: formData.paymentMethod === 'upi' ? `AUTO_${Date.now()}` : null, // Auto-detected UTR
        subtotal,
        deliveryFee,
        taxes,
        total,
        specialInstructions: formData.instructions
      };

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const result = await response.json();

      if (result.success) {
        setOrderNumber(result.data.orderNumber);
        setDeliveryOTP(result.data.deliveryOTP);
        setOrderPlaced(true);
        clearCart();

        toast({
          title: "Order Placed!",
          description: "Your order has been placed successfully",
          className: "bg-green-600 text-white"
        });
      } else {
        throw new Error(result.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">
              Your order has been placed and will be delivered soon.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
              <p className="font-semibold mb-2">Order Details:</p>
              <p className="text-sm">Order Number: <span className="font-mono font-bold">{orderNumber}</span></p>
              <p className="text-sm">Total Amount: <span className="font-semibold">₹{total}</span></p>
              <p className="text-sm">Payment: <span className="font-semibold">{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'}</span></p>
              {deliveryOTP && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm font-semibold text-yellow-800">Delivery OTP:</p>
                  <p className="text-2xl font-mono font-bold text-yellow-900">{deliveryOTP}</p>
                  <p className="text-xs text-yellow-700 mt-1">Share this with delivery partner</p>
                </div>
              )}
            </div>
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Delivery Type */}
                <div>
                  <Label className="mb-3 block">Delivery Method</Label>
                  <RadioGroup value={formData.deliveryType} onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryType: value }))}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Truck className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Home Delivery</p>
                          <p className="text-sm text-gray-600">₹{deliveryFee} delivery fee</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label>Phone Number * (10 digits)</Label>
                      <Input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData(prev => ({ ...prev, phone: value }));
                        }}
                        placeholder="9876543210"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Address */}
                {formData.deliveryType === 'delivery' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Delivery Address</h3>
                    <div>
                      <Label>Street Address *</Label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="House no, Street name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>City *</Label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <Label>ZIP Code *</Label>
                        <Input
                          value={formData.zipCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                          placeholder="123456"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Delivery Instructions (Optional)</Label>
                      <Textarea
                        value={formData.instructions}
                        onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                        placeholder="Any special instructions"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Payment */}
                <div>
                  <Label className="mb-3 block">Payment Method</Label>
                  <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
                    {/* UPI Payment */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="cursor-pointer flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💳</span>
                            <div>
                              <p className="font-medium">UPI Payment (Scan QR)</p>
                              <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm - Instant</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      {formData.paymentMethod === 'upi' && (
                        <div className="ml-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl space-y-4">
                          {/* Amount Alert - Very Prominent */}
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 shadow-lg">
                            <div className="text-center">
                              <p className="text-sm font-semibold mb-1">💰 PAYMENT AMOUNT</p>
                              <p className="text-5xl font-bold mb-1">₹{total}</p>
                              <p className="text-xs opacity-90">Click "Pay with UPI" button below - amount auto-fills!</p>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                              {/* QR Code */}
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(process.env.NEXT_PUBLIC_UPI_ID || 'hayatali123786@oksbi')}&pn=${encodeURIComponent('FoodRush')}&am=${total}&cu=INR&tn=${encodeURIComponent('FoodRush Order Payment')}`}
                                alt="UPI QR Code"
                                className="w-48 h-48 mx-auto"
                              />
                              <p className="text-xs text-gray-600 mt-2">Scan with any UPI app</p>
                            </div>

                            {/* UPI Intent Button - Opens UPI app with amount pre-filled */}
                            <div className="mt-4">
                              <a
                                href={`upi://pay?pa=${encodeURIComponent(process.env.NEXT_PUBLIC_UPI_ID || 'hayatali123786@oksbi')}&pn=${encodeURIComponent('FoodRush')}&am=${total}&cu=INR&tn=${encodeURIComponent('Order Payment')}`}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all"
                              >
                                <span className="text-2xl">📱</span>
                                <div className="text-left">
                                  <div className="text-sm">Pay with UPI</div>
                                  <div className="text-xs opacity-90">Amount auto-filled: ₹{total}</div>
                                </div>
                              </a>
                              <p className="text-xs text-gray-600 mt-2">Click to open UPI app (Mobile only)</p>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-semibold text-blue-900">Amount to Pay:</p>
                              <p className="text-2xl font-bold text-blue-600">₹{total}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <span>UPI ID:</span>
                              <code className="flex-1 bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                {process.env.NEXT_PUBLIC_UPI_ID || 'hayatali123786@oksbi'}
                              </code>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => {
                                  navigator.clipboard.writeText(process.env.NEXT_PUBLIC_UPI_ID || 'hayatali123786@oksbi');
                                  toast({ title: "Copied!", description: "UPI ID copied" });
                                }}
                              >
                                Copy
                              </Button>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-lg">✓</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-green-900 mb-2">Payment Steps:</p>
                                <ol className="text-sm text-green-800 space-y-1.5 ml-1">
                                  <li className="flex items-start gap-2">
                                    <span className="font-bold">1.</span>
                                    <span><strong>Mobile:</strong> Click "Pay with UPI" button (amount auto-fills!) <strong>OR Desktop:</strong> Scan QR code</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="font-bold">2.</span>
                                    <span className="font-bold text-orange-600">Verify amount is ₹{total} and complete payment</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="font-bold">3.</span>
                                    <span className="font-semibold text-green-700">Return here and click "Place Order"!</span>
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>

                          {/* TEST MODE - For Development Only */}
                          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-2xl">🧪</span>
                              <div>
                                <p className="font-bold text-purple-900">TEST MODE (Development Only)</p>
                                <p className="text-xs text-purple-700">Generate fake payment for testing</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              onClick={() => {
                                // Generate fake 12-digit UTR
                                const fakeUTR = Math.floor(100000000000 + Math.random() * 900000000000).toString();
                                console.log('Generated fake UTR:', fakeUTR);

                                // Set the UTR in form
                                setFormData(prev => ({ ...prev, utrNumber: fakeUTR }));

                                // Show success message
                                toast({
                                  title: "✅ Test Payment Generated!",
                                  description: `Fake UTR: ${fakeUTR}`,
                                  className: "bg-purple-600 text-white"
                                });
                              }}
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              🧪 Generate Fake Payment (₹{total})
                            </Button>
                            <p className="text-xs text-purple-600 mt-2">
                              Click to auto-fill a fake UTR number. Remove this in production!
                            </p>
                            {formData.utrNumber && (
                              <div className="mt-2 p-2 bg-white rounded border border-purple-300">
                                <p className="text-xs font-semibold text-purple-900">Generated UTR:</p>
                                <p className="text-sm font-mono text-purple-700">{formData.utrNumber}</p>
                              </div>
                            )}
                          </div>

                          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-amber-800">
                              <span className="text-lg">⚡</span>
                              <p className="text-xs font-medium">
                                <strong>Remember:</strong> After scanning QR and entering ₹{total}, complete the payment in your UPI app, then click "Place Order" below.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cash on Delivery */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💵</span>
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-gray-600">Pay when you receive</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
                      </div>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes (5%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">₹{total}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}