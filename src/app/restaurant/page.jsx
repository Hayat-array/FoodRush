'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Clock, Filter, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const cuisines = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'North Indian', label: 'North Indian' },
    { value: 'South Indian', label: 'South Indian' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Fast Food', label: 'Fast Food' },
    { value: 'Biryani', label: 'Biryani' },
    { value: 'Desserts', label: 'Desserts' },
  ];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCuisine, sortBy, restaurants]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/restaurants');
      const data = await response.json();
      if (data.success) {
        setRestaurants(data.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...restaurants];

    // 1. Search Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(lowerTerm) || 
        r.cuisine.some(c => c.toLowerCase().includes(lowerTerm))
      );
    }

    // 2. Cuisine Filter
    if (selectedCuisine !== 'all') {
      result = result.filter(r => 
        r.cuisine.some(c => c.toLowerCase() === selectedCuisine.toLowerCase())
      );
    }

    // 3. Sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating); // Highest rating first
        break;
      case 'deliveryTime':
        result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)); // Shortest time first
        break;
      case 'costLowHigh':
        result.sort((a, b) => a.minOrder - b.minOrder);
        break;
      case 'costHighLow':
        result.sort((a, b) => b.minOrder - a.minOrder);
        break;
    }

    setFilteredRestaurants(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Page Header */}
      <div className="bg-white border-b shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Restaurants</h1>
              <p className="text-gray-500 text-sm mt-1">
                {filteredRestaurants.length} restaurants open now
              </p>
            </div>
            
            <div className="w-full md:w-auto flex gap-2">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search restaurants or cuisines..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
              <Filter className="w-4 h-4" />
              <span>Filters:</span>
            </div>

            <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                {cuisines.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
                <SelectItem value="costLowHigh">Cost: Low to High</SelectItem>
                <SelectItem value="costHighLow">Cost: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {(searchTerm || selectedCuisine !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-9"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCuisine('all');
                  setSortBy('rating');
                }}
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden h-full">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link href={`/restaurants/${restaurant.slug}`} key={restaurant._id} className="block group">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border-gray-200 group-hover:border-orange-200">
                  <div className="relative">
                    <img
                      src={restaurant.coverImage || "/placeholder-restaurant.jpg"}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {restaurant.featured && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      {restaurant.deliveryTime} min
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold">
                        {restaurant.rating}
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm line-clamp-1 mb-3">
                      {restaurant.cuisine.join(', ')}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-dashed">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Jaipur
                      </div>
                      <div>
                        Min: ₹{restaurant.minOrder}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              We couldn't find any restaurants matching your search. Try changing your filters or search term.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCuisine('all');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}