'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Filter, Clock, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/stores/cartStore';
import StarRating from '@/components/StarRating';

export default function MenuPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewsDialog, setReviewsDialog] = useState({ open: false, dish: null });

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/menu');
      const data = await res.json();
      if (data.success) {
        setDishes(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load menu:', error);
      toast({ title: "Error", description: "Failed to load menu", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (dish) => {
    if (!session) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive"
      });
      router.push('/auth/signin');
      return;
    }

    addToCart({
      id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      restaurantId: dish.restaurant,
      restaurantName: dish.restaurantName || 'Restaurant'
    });

    toast({
      title: "Added to Cart",
      description: `${dish.name} added successfully`,
      className: "bg-green-600 text-white"
    });
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-16 z-40 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
              <p className="text-gray-500 text-sm">Discover delicious dishes</p>
            </div>

            {session && cartCount > 0 && (
              <Button
                onClick={() => router.push('/cartU')}
                className="bg-orange-600 hover:bg-orange-700 relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart ({cartCount})
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for dishes..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-orange-600">{filteredDishes.length}</span> dishes
          </p>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No dishes found</h3>
            <p className="text-gray-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <Card key={dish._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-56 bg-gray-100">
                  <img
                    src={dish.image || '/placeholder-dish.jpg'}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  {dish.isPopular && (
                    <Badge className="absolute top-3 left-3 bg-orange-600 text-white">
                      Popular
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg line-clamp-1 flex-1">{dish.name}</h3>
                    {dish.dietary && dish.dietary.length > 0 && (
                      <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${dish.dietary[0] === 'vegetarian'
                        ? 'border-green-600'
                        : 'border-red-600'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${dish.dietary[0] === 'vegetarian'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                          }`}></div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3 min-h-[40px]">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-2xl font-bold text-orange-600">₹{dish.price}</span>
                    {dish.rating && dish.rating > 0 && (
                      <button
                        onClick={() => setReviewsDialog({ open: true, dish })}
                        className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded transition-colors cursor-pointer"
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{dish.rating.toFixed(1)}</span>
                        {dish.totalRatings > 0 && (
                          <span className="text-gray-500">({dish.totalRatings})</span>
                        )}
                      </button>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleAddToCart(dish)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {session && cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 shadow-2xl rounded-full px-6"
            onClick={() => router.push('/cartU')}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart ({cartCount})
          </Button>
        </div>
      )}

      {/* Reviews Dialog */}
      <Dialog open={reviewsDialog.open} onOpenChange={() => setReviewsDialog({ open: false, dish: null })}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Reviews for {reviewsDialog.dish?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Overall Rating */}
            <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">
                  {reviewsDialog.dish?.rating?.toFixed(1) || '0.0'}
                </div>
                <StarRating rating={reviewsDialog.dish?.rating || 0} readonly size="md" />
                <p className="text-sm text-gray-600 mt-1">
                  {reviewsDialog.dish?.totalRatings || 0} reviews
                </p>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviewsDialog.dish?.ratings && reviewsDialog.dish.ratings.length > 0 ? (
                reviewsDialog.dish.ratings.map((review, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <StarRating rating={review.rating} readonly size="sm" />
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 rounded">
                        "{review.comment}"
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No reviews yet</p>
                  <p className="text-xs mt-1">Be the first to review this dish!</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}