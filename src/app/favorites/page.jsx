'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Heart, Star, Clock, MapPin, ArrowRight, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Check Auth & Fetch Data
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchFavorites();
    }
  }, [status, router]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      
      if (data.success) {
        setFavorites(data.data);
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Remove Favorite Handler
  const removeFavorite = async (restaurantId, e) => {
    e.preventDefault(); // Prevent clicking the card link
    e.stopPropagation();

    // Optimistic UI update (remove immediately)
    setFavorites(prev => prev.filter(r => r._id !== restaurantId));

    try {
      const res = await fetch('/api/user/toggle-favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId })
      });

      if (!res.ok) throw new Error("Failed to update");
      
      toast({
        title: "Removed from Favorites",
        description: "Restaurant has been removed from your list.",
      });
    } catch (error) {
      // Revert if failed
      toast({ variant: "destructive", title: "Error", description: "Could not remove favorite." });
      fetchFavorites(); 
    }
  };

  // 3. Loading State
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden h-72">
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 4. Empty State
  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-orange-100 p-6 rounded-full mb-6">
          <Heart className="w-12 h-12 text-orange-500 fill-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
        <p className="text-gray-500 max-w-md mb-8">
          You haven't added any restaurants to your favorites yet. Explore our best restaurants and mark them as favorite!
        </p>
        <Button onClick={() => router.push('/')} className="bg-orange-500 hover:bg-orange-600 gap-2">
          Explore Restaurants <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // 5. Main Content
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="w-6 h-6 text-orange-500 fill-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">Your Favorites</h1>
          <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded-full ml-2">
            {favorites.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((restaurant) => (
            <Link key={restaurant._id} href={`/restaurant/${restaurant.slug}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-none ring-1 ring-gray-200 hover:ring-orange-200">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={restaurant.coverImage || restaurant.image || "/placeholder.jpg"} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    {restaurant.rating}
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={(e) => removeFavorite(restaurant._id, e)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* Content Section */}
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {restaurant.name}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {restaurant.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.cuisine?.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="font-normal text-xs bg-gray-100 text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {restaurant.deliveryTime} mins
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {restaurant.address?.city || 'Jaipur'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}