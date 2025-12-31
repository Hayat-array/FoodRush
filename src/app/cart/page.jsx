'use client';

import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');

  const total = getTotalPrice();
  const deliveryFee = total > 500 ? 0 : 40;
  const grandTotal = total + deliveryFee;

  const handleCheckout = async () => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/cart');
      return;
    }
    if (!address) {
      toast({ title: "Error", description: "Please enter a delivery address", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      // Get the restaurant ID from the first item (assuming single restaurant ordering for now)
      const restaurantId = items[0]?.restaurantId;

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total: grandTotal,
          deliveryAddress: { street: address },
          restaurantId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        toast({ title: "Order Placed!", description: "Your food is on the way." });
        router.push('/orders'); // Redirect to order history
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({ title: "Checkout Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Button asChild className="bg-orange-600 hover:bg-orange-700">
          <Link href="/">Browse Restaurants</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="flex p-4 gap-4 items-center">
              <div className="h-24 w-24 relative shrink-0">
                <Image 
                  src={item.image || "/placeholder-dish.jpg"} 
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.restaurantName}</p>
                <div className="font-bold text-orange-600 mt-1">₹{item.price}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Checkout Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-xl">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Total</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-green-600">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery Address</label>
                <Input 
                  placeholder="Enter your full address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : (
                  <>
                    Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}