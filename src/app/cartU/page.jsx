'use client';

import { useState, useEffect } from 'react';
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
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItems = mounted ? items : [];
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 40;
  const grandTotal = total + deliveryFee;

  if (!mounted) return <div className="min-h-screen bg-gray-50" />;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
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
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex p-4 gap-4 items-center">
              <div className="h-24 w-24 relative shrink-0 bg-gray-100 rounded-md overflow-hidden">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.restaurantName}</p>
                <div className="font-bold text-orange-600 mt-1">₹{item.price}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                </div>
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-xl">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Item Total</span><span>₹{total}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Delivery Fee</span><span>₹{deliveryFee}</span></div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg"><span>Grand Total</span><span>₹{grandTotal}</span></div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg" onClick={() => router.push('/checkout')} disabled={loading}>
                {loading ? "Processing..." : (<>Checkout <ArrowRight className="ml-2 w-5 h-5" /></>)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}