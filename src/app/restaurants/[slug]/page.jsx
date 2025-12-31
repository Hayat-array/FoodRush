// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // import { useParams } from 'next/navigation';
// // // // // // // // // // // // import { Star, Clock, MapPin, Plus, Minus, ShoppingCart, ArrowLeft, Search, Filter, Heart, Share2 } from 'lucide-react';
// // // // // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // // // // // import { Card, CardContent } from '@/components/ui/card';
// // // // // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // // // // // // // // // import { Separator } from '@/components/ui/separator';
// // // // // // // // // // // // import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// // // // // // // // // // // // import { useCartStore } from '@/stores/cartStore';
// // // // // // // // // // // // import ImageSlider from '@/components/ImageSlider';
// // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // export default function RestaurantPage() {
// // // // // // // // // // // //   const params = useParams();
// // // // // // // // // // // //   const { slug } = params;
  
// // // // // // // // // // // //   const [restaurant, setRestaurant] = useState(null);
// // // // // // // // // // // //   const [dishes, setDishes] = useState([]);
// // // // // // // // // // // //   const [categories, setCategories] = useState([]);
// // // // // // // // // // // //   const [selectedCategory, setSelectedCategory] = useState('all');
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // // // // // // //   const [showFilters, setShowFilters] = useState(false);
  
// // // // // // // // // // // //   // Zustand cart store
// // // // // // // // // // // //   const {
// // // // // // // // // // // //     cart,
// // // // // // // // // // // //     addToCart,
// // // // // // // // // // // //     removeFromCart,
// // // // // // // // // // // //     getCartItemCount,
// // // // // // // // // // // //     getCartTotal,
// // // // // // // // // // // //     getCartItems,
// // // // // // // // // // // //     isInCart,
// // // // // // // // // // // //     getItemQuantity
// // // // // // // // // // // //   } = useCartStore();

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (slug) {
// // // // // // // // // // // //       fetchRestaurantData();
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [slug]);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     filterDishes();
// // // // // // // // // // // //   }, [dishes, selectedCategory, searchTerm]);

// // // // // // // // // // // //   const fetchRestaurantData = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       setLoading(true);
// // // // // // // // // // // //       const [restaurantRes, dishesRes] = await Promise.all([
// // // // // // // // // // // //         fetch(`/api/restaurant/${slug}`),
// // // // // // // // // // // //         fetch(`/api/restaurant/${slug}/dishes`)
// // // // // // // // // // // //       ]);
      
// // // // // // // // // // // //       const restaurantData = await restaurantRes.json();
// // // // // // // // // // // //       const dishesData = await dishesRes.json();
      
// // // // // // // // // // // //       if (restaurantData.success) {
// // // // // // // // // // // //         setRestaurant(restaurantData.data);
// // // // // // // // // // // //       }
      
// // // // // // // // // // // //       if (dishesData.success) {
// // // // // // // // // // // //         setDishes(dishesData.data);
        
// // // // // // // // // // // //         // Extract unique categories
// // // // // // // // // // // //         const uniqueCategories = [...new Set(dishesData.data.map(dish => dish.category))];
// // // // // // // // // // // //         setCategories(uniqueCategories);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Error fetching restaurant data:', error);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const filterDishes = () => {
// // // // // // // // // // // //     let filtered = dishes;
    
// // // // // // // // // // // //     if (selectedCategory !== 'all') {
// // // // // // // // // // // //       filtered = filtered.filter(dish => dish.category === selectedCategory);
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     if (searchTerm) {
// // // // // // // // // // // //       filtered = filtered.filter(dish =>
// // // // // // // // // // // //         dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // // // // // // //         dish.description.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // // // // // // // //       );
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     return filtered;
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const formatCategoryName = (category) => {
// // // // // // // // // // // //     return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   if (loading) {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //       <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // //         <div className="animate-pulse">
// // // // // // // // // // // //           <div className="relative h-64 bg-gray-200">
// // // // // // // // // // // //             <Skeleton className="w-full h-full" />
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className="container mx-auto px-4 py-6">
// // // // // // // // // // // //             <Skeleton className="h-8 w-64 mb-4" />
// // // // // // // // // // // //             <div className="h-32 bg-gray-200 rounded mb-6" />
// // // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // // // // // // // //               {[...Array(6)].map((_, index) => (
// // // // // // // // // // // //                 <div key={index} className="h-64 bg-gray-200 rounded"></div>
// // // // // // // // // // // //               ))}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // //   }

// // // // // // // // // // // //   if (!restaurant) {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// // // // // // // // // // // //         <div className="text-center">
// // // // // // // // // // // //           <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Not Found</h1>
// // // // // // // // // // // //           <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
// // // // // // // // // // // //           <Button onClick={() => window.history.back()}>
// // // // // // // // // // // //             <ArrowLeft className="w-4 h-4 mr-2" />
// // // // // // // // // // // //             Go Back
// // // // // // // // // // // //           </Button>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // //   }

// // // // // // // // // // // //   const filteredDishes = filterDishes();

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // // // //       {/* Restaurant Header with Image Slider */}
// // // // // // // // // // // //       <div className="relative">
// // // // // // // // // // // //         <ImageSlider 
// // // // // // // // // // // //           images={[
// // // // // // // // // // // //             restaurant.coverImage,
// // // // // // // // // // // //             restaurant.image,
// // // // // // // // // // // //             'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
// // // // // // // // // // // //             'https://images.unsplash.com/photo-1555396273-367ea4eb4db2?w=800&h=400&fit=crop',
// // // // // // // // // // // //             'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=400&fit=crop'
// // // // // // // // // // // //           ]}
// // // // // // // // // // // //           autoPlay={true}
// // // // // // // // // // // //           interval={4000}
// // // // // // // // // // // //         />
// // // // // // // // // // // //         <div className="absolute bottom-0 left-0 right-0 text-white p-6 bg-gradient-to-t from-black/80 to-transparent">
// // // // // // // // // // // //           <Button
// // // // // // // // // // // //             variant="ghost"
// // // // // // // // // // // //             className="mb-4 text-white hover:bg-white/20"
// // // // // // // // // // // //             onClick={() => window.history.back()}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <ArrowLeft className="w-4 h-4 mr-2" />
// // // // // // // // // // // //             Back
// // // // // // // // // // // //           </Button>
// // // // // // // // // // // //           <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
// // // // // // // // // // // //           <p className="text-lg opacity-90">{restaurant.description}</p>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Restaurant Info */}
// // // // // // // // // // // //       <div className="bg-white shadow-sm">
// // // // // // // // // // // //         <div className="container mx-auto px-4 py-4">
// // // // // // // // // // // //           <div className="flex flex-wrap gap-4 items-center justify-between">
// // // // // // // // // // // //             <div className="flex flex-wrap gap-6 text-sm">
// // // // // // // // // // // //               <div className="flex items-center gap-1">
// // // // // // // // // // // //                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // // // // // // //                 <span className="font-medium">{restaurant.rating}</span>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //               <div className="flex items-center gap-1">
// // // // // // // // // // // //                 <Clock className="w-4 h-4" />
// // // // // // // // // // // //                 <span>{restaurant.deliveryTime}</span>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //               <div className="flex items-center gap-1">
// // // // // // // // // // // //                 <MapPin className="w-4 h-4" />
// // // // // // // // // // // //                 <span>{restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee} Delivery`}</span>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>
            
// // // // // // // // // // // //             <div className="flex gap-2">
// // // // // // // // // // // //               <Button variant="outline" size="sm">
// // // // // // // // // // // //                 <Heart className="w-4 h-4 mr-1" />
// // // // // // // // // // // //                 Save
// // // // // // // // // // // //               </Button>
// // // // // // // // // // // //               <Button variant="outline" size="sm">
// // // // // // // // // // // //                 <Share2 className="w-4 h-4 mr-1" />
// // // // // // // // // // // //                 Share
// // // // // // // // // // // //               </Button>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
          
// // // // // // // // // // // //           {restaurant.minOrder > 0 && (
// // // // // // // // // // // //             <div className="text-sm text-gray-600">
// // // // // // // // // // // //               Min. order: ₹{restaurant.minOrder}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           )}
// // // // // // // // // // // //         </div>
        
// // // // // // // // // // // //         <div className="flex flex-wrap gap-2 mt-3">
// // // // // // // // // // // //           {restaurant.cuisine.map((c) => (
// // // // // // // // // // // //             <Badge key={c} variant="secondary">
// // // // // // // // // // // //               {c}
// // // // // // // // // // // //             </Badge>
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Menu Section */}
// // // // // // // // // // // //       <div className="container mx-auto px-4 py-6">
// // // // // // // // // // // //         <div className="flex flex-col lg:flex-row gap-6">
// // // // // // // // // // // //           {/* Categories Sidebar */}
// // // // // // // // // // // //           <div className="lg:w-64">
// // // // // // // // // // // //             <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
// // // // // // // // // // // //               <h3 className="font-semibold mb-4">Categories</h3>
// // // // // // // // // // // //               <div className="space-y-2">
// // // // // // // // // // // //                 <Button
// // // // // // // // // // // //                   variant={selectedCategory === 'all' ? 'default' : 'ghost'}
// // // // // // // // // // // //                   className="w-full justify-start"
// // // // // // // // // // // //                   onClick={() => setSelectedCategory('all')}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   All Items ({dishes.length})
// // // // // // // // // // // //                 </Button>
// // // // // // // // // // // //                 {categories.map((category) => (
// // // // // // // // // // // //                   <Button
// // // // // // // // // // // //                     key={category}
// // // // // // // // // // // //                     variant={selectedCategory === category ? 'default' : 'ghost'}
// // // // // // // // // // // //                     className="w-full justify-start"
// // // // // // // // // // // //                     onClick={() => setSelectedCategory(category)}
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     {formatCategoryName(category)} ({dishes.filter(d => d.category === category).length})
// // // // // // // // // // // //                   </Button>
// // // // // // // // // // // //                 ))}
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {/* Dishes Grid */}
// // // // // // // // // // // //           <div className="flex-1">
// // // // // // // // // // // //             {/* Search Bar */}
// // // // // // // // // // // //             <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// // // // // // // // // // // //               <div className="relative">
// // // // // // // // // // // //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // // // // // // // // //                 <Input
// // // // // // // // // // // //                   type="text"
// // // // // // // // // // // //                   placeholder="Search for dishes..."
// // // // // // // // // // // //                   value={searchTerm}
// // // // // // // // // // // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // // // // //                   className="pl-10"
// // // // // // // // // // // //                 />
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* Dishes */}
// // // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // // // // // //               {filteredDishes.map((dish) => (
// // // // // // // // // // // //                 <Card key={dish._id} className="overflow-hidden hover:shadow-lg transition-shadow group">
// // // // // // // // // // // //                   <div className="relative">
// // // // // // // // // // // //                     <img
// // // // // // // // // // // //                       src={dish.image}
// // // // // // // // // // // //                       alt={dish.name}
// // // // // // // // // // // //                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
// // // // // // // // // // // //                     />
// // // // // // // // // // // //                     {dish.isPopular && (
// // // // // // // // // // // //                       <Badge className="absolute top-2 left-2 bg-orange-500">
// // // // // // // // // // // //                         Popular
// // // // // // // // // // // //                       </Badge>
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                     {dish.isRecommended && (
// // // // // // // // // // // //                       <Badge className="absolute top-2 right-2 bg-green-500">
// // // // // // // // // // // //                         Recommended
// // // // // // // // // // // //                       </Badge>
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                     {dish.originalPrice && dish.originalPrice > dish.price && (
// // // // // // // // // // // //                       <Badge className="absolute bottom-2 left-2 bg-red-500">
// // // // // // // // // // // //                         {Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100)}% OFF
// // // // // // // // // // // //                       </Badge>
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                   </div>
                  
// // // // // // // // // // // //                   <CardContent className="p-4">
// // // // // // // // // // // //                     <div className="flex justify-between items-start mb-2">
// // // // // // // // // // // //                       <h3 className="text-lg font-semibold text-gray-900 flex-1">
// // // // // // // // // // // //                         {dish.name}
// // // // // // // // // // // //                       </h3>
// // // // // // // // // // // //                       <div className="flex items-center gap-1 ml-2">
// // // // // // // // // // // //                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // // // // // // //                         <span className="text-sm font-medium">{dish.rating}</span>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     </div>
                    
// // // // // // // // // // // //                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
// // // // // // // // // // // //                       {dish.description}
// // // // // // // // // // // //                     </p>
                    
// // // // // // // // // // // //                     <div className="flex flex-wrap gap-1 mb-3">
// // // // // // // // // // // //                       {dish.dietary.map((d) => (
// // // // // // // // // // // //                         <Badge key={d} variant="outline" className="text-xs">
// // // // // // // // // // // //                           {d === 'vegetarian' ? '🟢 Veg' : d === 'non-vegetarian' ? '🔴 Non-Veg' : d}
// // // // // // // // // // // //                         </Badge>
// // // // // // // // // // // //                       ))}
// // // // // // // // // // // //                       {dish.spiceLevel && (
// // // // // // // // // // // //                         <Badge variant="outline" className="text-xs">
// // // // // // // // // // // //                           {dish.spiceLevel === 'mild' ? '🌶️ Mild' : 
// // // // // // // // // // // //                            dish.spiceLevel === 'medium' ? '🌶️🌶️ Medium' : 
// // // // // // // // // // // //                            dish.spiceLevel === 'hot' ? '🌶️🌶️🌶️ Hot' : '🌶️🌶️🌶️🌶️ Extra Hot'}
// // // // // // // // // // // //                         </Badge>
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     </div>

// // // // // // // // // // // //                     {dish.preparationTime && (
// // // // // // // // // // // //                       <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
// // // // // // // // // // // //                         <Clock className="w-3 h-3" />
// // // // // // // // // // // //                         <span>{dish.preparationTime}</span>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     )}
                    
// // // // // // // // // // // //                     <div className="flex justify-between items-center">
// // // // // // // // // // // //                       <div>
// // // // // // // // // // // //                         <p className="text-lg font-bold text-orange-600">
// // // // // // // // // // // //                           ₹{dish.price}
// // // // // // // // // // // //                         </p>
// // // // // // // // // // // //                         {dish.originalPrice && dish.originalPrice > dish.price && (
// // // // // // // // // // // //                           <p className="text-sm text-gray-500 line-through">
// // // // // // // // // // // //                             ₹{dish.originalPrice}
// // // // // // // // // // // //                           </p>
// // // // // // // // // // // //                         )}
// // // // // // // // // // // //                       </div>
                      
// // // // // // // // // // // //                       <div className="flex items-center gap-2">
// // // // // // // // // // // //                         {cart[dish._id] ? (
// // // // // // // // // // // //                           <div className="flex items-center gap-2">
// // // // // // // // // // // //                             <Button
// // // // // // // // // // // //                               size="sm"
// // // // // // // // // // // //                               variant="outline"
// // // // // // // // // // // //                               onClick={() => removeFromCart(dish._id)}
// // // // // // // // // // // //                             >
// // // // // // // // // // // //                               <Minus className="w-4 h-4" />
// // // // // // // // // // // //                             </Button>
// // // // // // // // // // // //                             <span className="font-medium">{cart[dish._id].quantity}</span>
// // // // // // // // // // // //                             <Button
// // // // // // // // // // // //                               size="sm"
// // // // // // // // // // // //                               onClick={() => addToCart(dish)}
// // // // // // // // // // // //                             >
// // // // // // // // // // // //                               <Plus className="w-4 h-4" />
// // // // // // // // // // // //                             </Button>
// // // // // // // // // // // //                           </div>
// // // // // // // // // // // //                         ) : (
// // // // // // // // // // // //                           <Button
// // // // // // // // // // // //                             onClick={() => addToCart(dish)}
// // // // // // // // // // // //                             className="bg-orange-500 hover:bg-orange-600"
// // // // // // // // // // // //                           >
// // // // // // // // // // // //                             <Plus className="w-4 h-4 mr-1" />
// // // // // // // // // // // //                             Add
// // // // // // // // // // // //                           </Button>
// // // // // // // // // // // //                         )}
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </CardContent>
// // // // // // // // // // // //                 </Card>
// // // // // // // // // // // //               ))}
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {filteredDishes.length === 0 && (
// // // // // // // // // // // //               <div className="text-center py-12">
// // // // // // // // // // // //                 <div className="text-gray-400 mb-4">
// // // // // // // // // // // //                   <Search className="w-16 h-16 mx-auto" />
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
// // // // // // // // // // // //                   No dishes found
// // // // // // // // // // // //                 </h3>
// // // // // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // // // // //                   Try adjusting your search or filters
// // // // // // // // // // // //                 </p>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Cart Summary */}
// // // // // // // // // // // //       {getCartItemCount() > 0 && (
// // // // // // // // // // // //         <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
// // // // // // // // // // // //           <div className="container mx-auto flex justify-between items-center">
// // // // // // // // // // // //             <div>
// // // // // // // // // // // //               <p className="text-sm text-gray-600">
// // // // // // // // // // // //                 {getCartItemCount()} items
// // // // // // // // // // // //               </p>
// // // // // // // // // // // //               <p className="text-xl font-bold text-orange-600">
// // // // // // // // // // // //                 ₹{getCartTotal()}
// // // // // // // // // // // //               </p>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <Sheet>
// // // // // // // // // // // //               <SheetTrigger asChild>
// // // // // // // // // // // //                 <Button className="bg-orange-500 hover:bg-orange-600">
// // // // // // // // // // // //                   <ShoppingCart className="w-4 h-4 mr-2" />
// // // // // // // // // // // //                   View Cart
// // // // // // // // // // // //                 </Button>
// // // // // // // // // // // //               </SheetTrigger>
// // // // // // // // // // // //               <SheetContent>
// // // // // // // // // // // //                 <SheetHeader>
// // // // // // // // // // // //                   <SheetTitle>Your Cart</SheetTitle>
// // // // // // // // // // // //                 </SheetHeader>
// // // // // // // // // // // //                 <div className="mt-6 space-y-4">
// // // // // // // // // // // //                   {getCartItems().map((item) => (
// // // // // // // // // // // //                     <div key={item._id} className="flex justify-between items-center">
// // // // // // // // // // // //                       <div className="flex-1">
// // // // // // // // // // // //                         <h4 className="font-medium">{item.name}</h4>
// // // // // // // // // // // //                         <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                       <div className="flex items-center gap-2">
// // // // // // // // // // // //                         <Button
// // // // // // // // // // // //                           size="sm"
// // // // // // // // // // // //                           variant="outline"
// // // // // // // // // // // //                           onClick={() => removeFromCart(item._id)}
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                           <Minus className="w-4 h-4" />
// // // // // // // // // // // //                         </Button>
// // // // // // // // // // // //                         <span className="font-medium">{item.quantity}</span>
// // // // // // // // // // // //                         <Button
// // // // // // // // // // // //                           size="sm"
// // // // // // // // // // // //                           onClick={() => addToCart(item)}
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                           <Plus className="w-4 h-4" />
// // // // // // // // // // // //                         </Button>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   ))}
// // // // // // // // // // // //                   <Separator />
// // // // // // // // // // // //                   <div className="flex justify-between items-center">
// // // // // // // // // // // //                     <span className="font-semibold">Total:</span>
// // // // // // // // // // // //                     <span className="text-xl font-bold text-orange-600">₹{getCartTotal()}</span>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <Button className="w-full bg-orange-500 hover:bg-orange-600">
// // // // // // // // // // // //                     Proceed to Checkout
// // // // // // // // // // // //                   </Button>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </SheetContent>
// // // // // // // // // // // //             </Sheet>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }
// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // import { useParams } from 'next/navigation';
// // // // // // // // // // // import { Star, Clock, MapPin, Plus, ShoppingBag } from 'lucide-react';
// // // // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // // // // // // // // import { useCartStore } from '@/stores/cartStore';
// // // // // // // // // // // import { useToast } from '@/hooks/use-toast';

// // // // // // // // // // // export default function RestaurantPage() {
// // // // // // // // // // //   const params = useParams(); // Get the slug from URL (e.g., /restaurant/pizza-palace)
// // // // // // // // // // //   const [restaurant, setRestaurant] = useState(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const { addToCart } = useCartStore();
// // // // // // // // // // //   const { toast } = useToast();

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (params.slug) {
// // // // // // // // // // //       fetchRestaurantData(params.slug);
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [params.slug]);

// // // // // // // // // // //   const fetchRestaurantData = async (slug) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await fetch(`/api/restaurants/${slug}`); // You created this earlier
// // // // // // // // // // //       const data = await res.json();
      
// // // // // // // // // // //       if (data.success) {
// // // // // // // // // // //         setRestaurant(data.data);
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Failed to load restaurant", error);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleAddToCart = (item) => {
// // // // // // // // // // //     addToCart({
// // // // // // // // // // //         ...item,
// // // // // // // // // // //         restaurantId: restaurant._id,
// // // // // // // // // // //         restaurantName: restaurant.name
// // // // // // // // // // //     });
// // // // // // // // // // //     toast({
// // // // // // // // // // //       title: "Added to Cart",
// // // // // // // // // // //       description: `${item.name} added successfully!`,
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   if (loading) return <div className="p-8"><Skeleton className="h-64 w-full rounded-xl" /></div>;
// // // // // // // // // // //   if (!restaurant) return <div className="p-8 text-center">Restaurant not found</div>;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // // // //       {/* Cover Image Header */}
// // // // // // // // // // //       <div className="relative h-64 md:h-80 w-full">
// // // // // // // // // // //         <img 
// // // // // // // // // // //           src={restaurant.coverImage} 
// // // // // // // // // // //           alt={restaurant.name} 
// // // // // // // // // // //           className="w-full h-full object-cover"
// // // // // // // // // // //         />
// // // // // // // // // // //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
// // // // // // // // // // //           <div className="container mx-auto px-4 pb-6 text-white">
// // // // // // // // // // //             <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
// // // // // // // // // // //             <div className="flex flex-wrap gap-4 text-sm md:text-base opacity-90">
// // // // // // // // // // //               <span className="flex items-center gap-1 bg-green-600 px-2 py-0.5 rounded">
// // // // // // // // // // //                 <Star className="w-4 h-4 fill-white" /> {restaurant.rating}
// // // // // // // // // // //               </span>
// // // // // // // // // // //               <span className="flex items-center gap-1">
// // // // // // // // // // //                 <Clock className="w-4 h-4" /> {restaurant.deliveryTime}
// // // // // // // // // // //               </span>
// // // // // // // // // // //               <span className="flex items-center gap-1">
// // // // // // // // // // //                 <MapPin className="w-4 h-4" /> {restaurant.address.city}
// // // // // // // // // // //               </span>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Menu Section */}
// // // // // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // // // // //         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
// // // // // // // // // // //           <Utensils className="w-6 h-6 text-orange-500" /> Menu
// // // // // // // // // // //         </h2>
        
// // // // // // // // // // //         <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // // // //           {restaurant.menu?.map((item) => (
// // // // // // // // // // //             <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between gap-4 group hover:border-orange-200 transition-colors">
// // // // // // // // // // //               <div className="flex-1">
// // // // // // // // // // //                 <div className="flex items-center gap-2 mb-1">
// // // // // // // // // // //                   {/* Veg/Non-Veg Icon */}
// // // // // // // // // // //                   <div className={`w-4 h-4 border flex items-center justify-center p-[2px] ${item.dietary?.includes('vegetarian') ? 'border-green-600' : 'border-red-600'}`}>
// // // // // // // // // // //                     <div className={`w-full h-full rounded-full ${item.dietary?.includes('vegetarian') ? 'bg-green-600' : 'bg-red-600'}`}></div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                   <h3 className="font-bold text-lg">{item.name}</h3>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
// // // // // // // // // // //                 <div className="flex items-center gap-2">
// // // // // // // // // // //                     <p className="font-bold text-lg">₹{item.price}</p>
// // // // // // // // // // //                     {item.originalPrice && <p className="text-sm text-gray-400 line-through">₹{item.originalPrice}</p>}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div className="flex flex-col items-center gap-2 relative">
// // // // // // // // // // //                 <div className="w-32 h-24 rounded-lg overflow-hidden">
// // // // // // // // // // //                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <Button 
// // // // // // // // // // //                   size="sm" 
// // // // // // // // // // //                   className="absolute -bottom-3 bg-white text-green-600 hover:bg-gray-50 border shadow-md font-bold h-8 px-6"
// // // // // // // // // // //                   onClick={() => handleAddToCart(item)}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   ADD
// // // // // // // // // // //                 </Button>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // // Simple Utensils icon component if needed locally or import from lucide-react
// // // // // // // // // // // function Utensils(props) {
// // // // // // // // // // //   return (
// // // // // // // // // // //     <svg
// // // // // // // // // // //       {...props}
// // // // // // // // // // //       xmlns="http://www.w3.org/2000/svg"
// // // // // // // // // // //       width="24"
// // // // // // // // // // //       height="24"
// // // // // // // // // // //       viewBox="0 0 24 24"
// // // // // // // // // // //       fill="none"
// // // // // // // // // // //       stroke="currentColor"
// // // // // // // // // // //       strokeWidth="2"
// // // // // // // // // // //       strokeLinecap="round"
// // // // // // // // // // //       strokeLinejoin="round"
// // // // // // // // // // //     >
// // // // // // // // // // //       <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
// // // // // // // // // // //       <path d="M7 2v20" />
// // // // // // // // // // //       <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
// // // // // // // // // // //     </svg>
// // // // // // // // // // //   )
// // // // // // // // // // // }
// // // // // // // // // // import { NextResponse } from 'next/server';
// // // // // // // // // // import connectDB from '@/lib/db';
// // // // // // // // // // import { Restaurant, Dish } from '@/lib/models';

// // // // // // // // // // export async function GET(req, { params }) {
// // // // // // // // // //   try {
// // // // // // // // // //     await connectDB();
    
// // // // // // // // // //     // 1. Await params (Next.js 15 requirement)
// // // // // // // // // //     // In newer Next.js versions, params must be awaited before access
// // // // // // // // // //     const { slug } = await params;

// // // // // // // // // //     if (!slug) {
// // // // // // // // // //       return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
// // // // // // // // // //     }

// // // // // // // // // //     // 2. Find the restaurant
// // // // // // // // // //     const restaurant = await Restaurant.findOne({ slug, isActive: true });
    
// // // // // // // // // //     if (!restaurant) {
// // // // // // // // // //       return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
// // // // // // // // // //     }

// // // // // // // // // //     // 3. Find all dishes associated with this restaurant
// // // // // // // // // //     const dishes = await Dish.find({ restaurant: restaurant._id, isAvailable: true });

// // // // // // // // // //     // 4. Combine them
// // // // // // // // // //     const restaurantData = {
// // // // // // // // // //       ...restaurant.toObject(),
// // // // // // // // // //       menu: dishes
// // // // // // // // // //     };

// // // // // // // // // //     return NextResponse.json({ success: true, data: restaurantData });

// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error("API Error:", error);
// // // // // // // // // //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // import { useParams } from 'next/navigation';
// // // // // // // // // import { Star, Clock, MapPin, Plus, ShoppingBag, Utensils } from 'lucide-react';
// // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // // // // // // import { useCartStore } from '@/stores/cartStore';
// // // // // // // // // import { useToast } from '@/hooks/use-toast';

// // // // // // // // // export default function RestaurantPage() {
// // // // // // // // //   const params = useParams(); 
// // // // // // // // //   // In Next.js 15, useParams returns a promise in some contexts, 
// // // // // // // // //   // but the hook handles unwrapping in client components.
// // // // // // // // //   // We use the slug directly.
// // // // // // // // //   const slug = params?.slug;

// // // // // // // // //   const [restaurant, setRestaurant] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const { addToCart } = useCartStore();
// // // // // // // // //   const { toast } = useToast();

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (slug) {
// // // // // // // // //       fetchRestaurantData(slug);
// // // // // // // // //     }
// // // // // // // // //   }, [slug]);

// // // // // // // // //   const fetchRestaurantData = async (slugToFetch) => {
// // // // // // // // //     try {
// // // // // // // // //       // Calls the API route you created earlier
// // // // // // // // //       const res = await fetch(`/api/restaurants/${slugToFetch}`);
// // // // // // // // //       const data = await res.json();
      
// // // // // // // // //       if (data.success) {
// // // // // // // // //         setRestaurant(data.data);
// // // // // // // // //       } else {
// // // // // // // // //         console.error("API returned error:", data.error);
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Failed to load restaurant", error);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleAddToCart = (item) => {
// // // // // // // // //     if (!restaurant) return;
    
// // // // // // // // //     addToCart({
// // // // // // // // //         ...item,
// // // // // // // // //         restaurantId: restaurant._id,
// // // // // // // // //         restaurantName: restaurant.name
// // // // // // // // //     });
    
// // // // // // // // //     toast({
// // // // // // // // //       title: "Added to Cart",
// // // // // // // // //       description: `${item.name} added successfully!`,
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   if (loading) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="container mx-auto p-8">
// // // // // // // // //         <Skeleton className="h-80 w-full rounded-xl mb-8" />
// // // // // // // // //         <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // //           <Skeleton className="h-40 rounded-xl" />
// // // // // // // // //           <Skeleton className="h-40 rounded-xl" />
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   if (!restaurant) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="min-h-screen flex flex-col items-center justify-center">
// // // // // // // // //         <Utensils className="h-16 w-16 text-gray-300 mb-4" />
// // // // // // // // //         <h2 className="text-xl font-semibold text-gray-700">Restaurant not found</h2>
// // // // // // // // //         <p className="text-gray-500">The restaurant you are looking for does not exist.</p>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // //       {/* Cover Image Header */}
// // // // // // // // //       <div className="relative h-64 md:h-80 w-full">
// // // // // // // // //         <img 
// // // // // // // // //           src={restaurant.coverImage || "/placeholder.jpg"} 
// // // // // // // // //           alt={restaurant.name} 
// // // // // // // // //           className="w-full h-full object-cover"
// // // // // // // // //         />
// // // // // // // // //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
// // // // // // // // //           <div className="container mx-auto px-4 pb-6 text-white">
// // // // // // // // //             <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
// // // // // // // // //             <div className="flex flex-wrap gap-4 text-sm md:text-base opacity-90">
// // // // // // // // //               <span className="flex items-center gap-1 bg-green-600 px-2 py-0.5 rounded text-white font-bold">
// // // // // // // // //                 {restaurant.rating} <Star className="w-4 h-4 fill-white" />
// // // // // // // // //               </span>
// // // // // // // // //               <span className="flex items-center gap-1">
// // // // // // // // //                 <Clock className="w-4 h-4" /> {restaurant.deliveryTime}
// // // // // // // // //               </span>
// // // // // // // // //               <span className="flex items-center gap-1">
// // // // // // // // //                 <MapPin className="w-4 h-4" /> {restaurant.address?.city || "Location"}
// // // // // // // // //               </span>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Menu Section */}
// // // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // // //         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
// // // // // // // // //           <Utensils className="w-6 h-6 text-orange-500" /> Menu
// // // // // // // // //         </h2>
        
// // // // // // // // //         <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // //           {restaurant.menu?.map((item) => (
// // // // // // // // //             <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between gap-4 group hover:border-orange-200 transition-colors">
// // // // // // // // //               <div className="flex-1">
// // // // // // // // //                 <div className="flex items-center gap-2 mb-1">
// // // // // // // // //                   {/* Veg/Non-Veg Icon */}
// // // // // // // // //                   <div className={`w-4 h-4 border flex items-center justify-center p-[1px] ${item.dietary?.includes('vegetarian') ? 'border-green-600' : 'border-red-600'}`}>
// // // // // // // // //                     <div className={`w-full h-full rounded-full ${item.dietary?.includes('vegetarian') ? 'bg-green-600' : 'bg-red-600'}`}></div>
// // // // // // // // //                   </div>
// // // // // // // // //                   <h3 className="font-bold text-lg">{item.name}</h3>
// // // // // // // // //                 </div>
// // // // // // // // //                 <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
// // // // // // // // //                 <div className="flex items-center gap-2">
// // // // // // // // //                     <p className="font-bold text-lg">₹{item.price}</p>
// // // // // // // // //                     {item.originalPrice && <p className="text-sm text-gray-400 line-through">₹{item.originalPrice}</p>}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div className="flex flex-col items-center gap-2 relative">
// // // // // // // // //                 <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
// // // // // // // // //                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
// // // // // // // // //                 </div>
// // // // // // // // //                 <Button 
// // // // // // // // //                   size="sm" 
// // // // // // // // //                   className="absolute -bottom-3 bg-white text-green-600 hover:bg-gray-50 border shadow-md font-bold h-8 px-6"
// // // // // // // // //                   onClick={() => handleAddToCart(item)}
// // // // // // // // //                 >
// // // // // // // // //                   ADD
// // // // // // // // //                 </Button>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import { useParams } from 'next/navigation';
// // // // // // // // import { Star, Clock, MapPin, Plus, ShoppingBag, Utensils, Shield, Check, ChevronLeft } from 'lucide-react';
// // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // // // // // import { Card } from '@/components/ui/card';
// // // // // // // // import { useCartStore } from '@/stores/cartStore';
// // // // // // // // import { useToast } from '@/hooks/use-toast';
// // // // // // // // import Link from 'next/link';

// // // // // // // // export default function RestaurantPage() {
// // // // // // // //   const params = useParams();
// // // // // // // //   const slug = params?.slug;
  
// // // // // // // //   const [restaurant, setRestaurant] = useState(null);
// // // // // // // //   const [dishes, setDishes] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // // //   const { addToCart } = useCartStore();
// // // // // // // //   const { toast } = useToast();

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (slug) {
// // // // // // // //       fetchRestaurantData();
// // // // // // // //     }
// // // // // // // //   }, [slug]);

// // // // // // // //   const fetchRestaurantData = async () => {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);
// // // // // // // //       console.log("Fetching restaurant data for slug:", slug);
      
// // // // // // // //       // FIXED: Use singular 'restaurant' instead of 'restaurants'
// // // // // // // //       const restaurantRes = await fetch(`/api/restaurant/${slug}`);
      
// // // // // // // //       if (!restaurantRes.ok) {
// // // // // // // //         throw new Error(`HTTP error! status: ${restaurantRes.status}`);
// // // // // // // //       }
      
// // // // // // // //       const restaurantData = await restaurantRes.json();
// // // // // // // //       console.log("Restaurant API response:", restaurantData);
      
// // // // // // // //       if (restaurantData.success) {
// // // // // // // //         setRestaurant(restaurantData.data);
        
// // // // // // // //         // Fetch dishes separately
// // // // // // // //         const dishesRes = await fetch(`/api/restaurant/${slug}/dishes`);
        
// // // // // // // //         if (!dishesRes.ok) {
// // // // // // // //           throw new Error(`HTTP error! status: ${dishesRes.status}`);
// // // // // // // //         }
        
// // // // // // // //         const dishesData = await dishesRes.json();
// // // // // // // //         console.log("Dishes API response:", dishesData);
        
// // // // // // // //         if (dishesData.success) {
// // // // // // // //           setDishes(dishesData.data || []);
// // // // // // // //         } else {
// // // // // // // //           console.error("Failed to fetch dishes:", dishesData.error);
// // // // // // // //           setDishes([]);
// // // // // // // //         }
// // // // // // // //       } else {
// // // // // // // //         console.error("Failed to fetch restaurant:", restaurantData.error);
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Failed to load restaurant", error);
// // // // // // // //       toast({
// // // // // // // //         title: "Error",
// // // // // // // //         description: "Failed to load restaurant data. Please try again.",
// // // // // // // //         variant: "destructive"
// // // // // // // //       });
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Get unique categories from dishes
// // // // // // // //   const categories = ['all', ...new Set(dishes.map(dish => dish.category).filter(Boolean))];
  
// // // // // // // //   // Filter dishes by active category
// // // // // // // //   const filteredDishes = activeCategory === 'all' 
// // // // // // // //     ? dishes 
// // // // // // // //     : dishes.filter(dish => dish.category === activeCategory);

// // // // // // // //   const handleAddToCart = (item) => {
// // // // // // // //     if (!restaurant) return;
    
// // // // // // // //     addToCart({
// // // // // // // //       id: item._id,
// // // // // // // //       name: item.name,
// // // // // // // //       price: item.price,
// // // // // // // //       image: item.image,
// // // // // // // //       description: item.description,
// // // // // // // //       restaurantId: restaurant._id,
// // // // // // // //       restaurantName: restaurant.name,
// // // // // // // //       restaurantSlug: restaurant.slug
// // // // // // // //     });
    
// // // // // // // //     toast({
// // // // // // // //       title: "Added to Cart",
// // // // // // // //       description: `${item.name} added successfully!`,
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   if (loading) {
// // // // // // // //     return (
// // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // //         {/* Header skeleton */}
// // // // // // // //         <Skeleton className="h-64 w-full rounded-xl mb-8" />
        
// // // // // // // //         {/* Info skeleton */}
// // // // // // // //         <div className="flex flex-col md:flex-row gap-6 mb-8">
// // // // // // // //           <Skeleton className="h-32 w-full md:w-2/3 rounded-xl" />
// // // // // // // //           <Skeleton className="h-32 w-full md:w-1/3 rounded-xl" />
// // // // // // // //         </div>
        
// // // // // // // //         {/* Menu skeleton */}
// // // // // // // //         <Skeleton className="h-12 w-48 mb-6" />
// // // // // // // //         <div className="grid md:grid-cols-2 gap-6">
// // // // // // // //           {[...Array(6)].map((_, i) => (
// // // // // // // //             <Skeleton key={i} className="h-40 rounded-xl" />
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (!restaurant) {
// // // // // // // //     return (
// // // // // // // //       <div className="min-h-screen flex flex-col items-center justify-center p-8">
// // // // // // // //         <Utensils className="h-20 w-20 text-gray-300 mb-4" />
// // // // // // // //         <h2 className="text-2xl font-bold text-gray-700 mb-2">Restaurant not found</h2>
// // // // // // // //         <p className="text-gray-500 text-center mb-6">
// // // // // // // //           The restaurant you're looking for doesn't exist or is no longer available.
// // // // // // // //         </p>
// // // // // // // //         <Button asChild>
// // // // // // // //           <Link href="/restaurant">
// // // // // // // //             <ChevronLeft className="w-4 h-4 mr-2" />
// // // // // // // //             Browse Restaurants
// // // // // // // //           </Link>
// // // // // // // //         </Button>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // //       {/* Back Button */}
// // // // // // // //       <div className="container mx-auto px-4 pt-4">
// // // // // // // //         <Button variant="ghost" size="sm" asChild className="mb-4">
// // // // // // // //           <Link href="/restaurant">
// // // // // // // //             <ChevronLeft className="w-4 h-4 mr-2" />
// // // // // // // //             Back to Restaurants
// // // // // // // //           </Link>
// // // // // // // //         </Button>
// // // // // // // //       </div>

// // // // // // // //       {/* Cover Image Header */}
// // // // // // // //       <div className="relative h-64 md:h-80 w-full">
// // // // // // // //         <img 
// // // // // // // //           src={restaurant.coverImage || "/placeholder-restaurant.jpg"} 
// // // // // // // //           alt={restaurant.name} 
// // // // // // // //           className="w-full h-full object-cover"
// // // // // // // //         />
// // // // // // // //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
// // // // // // // //           <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
// // // // // // // //             <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{restaurant.name}</h1>
            
// // // // // // // //             <div className="flex flex-wrap items-center gap-3 mb-3">
// // // // // // // //               <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
// // // // // // // //                 <Star className="w-4 h-4 fill-white" />
// // // // // // // //                 {restaurant.rating || 4.2} • {restaurant.reviews || 120} reviews
// // // // // // // //               </div>
              
// // // // // // // //               <div className="flex items-center gap-1 text-white bg-blue-600 px-3 py-1 rounded-full text-sm">
// // // // // // // //                 <Clock className="w-4 h-4" />
// // // // // // // //                 {restaurant.deliveryTime || 30} mins
// // // // // // // //               </div>
              
// // // // // // // //               {restaurant.minOrder && (
// // // // // // // //                 <div className="text-white bg-gray-700 px-3 py-1 rounded-full text-sm">
// // // // // // // //                   Min. ₹{restaurant.minOrder}
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </div>
            
// // // // // // // //             <p className="text-white/90 text-sm md:text-base max-w-3xl">
// // // // // // // //               {restaurant.description || restaurant.cuisine?.join(', ') || "Delicious food delivered fresh to your doorstep"}
// // // // // // // //             </p>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Restaurant Info & Menu */}
// // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // //         <div className="grid md:grid-cols-3 gap-8">
// // // // // // // //           {/* Left Column - Info */}
// // // // // // // //           <div className="md:col-span-1">
// // // // // // // //             <Card className="p-6 mb-6">
// // // // // // // //               <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
// // // // // // // //                 <MapPin className="w-5 h-5 text-gray-500" />
// // // // // // // //                 Location & Info
// // // // // // // //               </h3>
              
// // // // // // // //               <div className="space-y-4">
// // // // // // // //                 <div>
// // // // // // // //                   <p className="text-gray-500 text-sm">Address</p>
// // // // // // // //                   <p className="font-medium">{restaurant.address?.street || "N/A"}</p>
// // // // // // // //                   <p className="text-sm text-gray-600">{restaurant.address?.city || ""}</p>
// // // // // // // //                 </div>
                
// // // // // // // //                 {restaurant.cuisine && restaurant.cuisine.length > 0 && (
// // // // // // // //                   <div>
// // // // // // // //                     <p className="text-gray-500 text-sm">Cuisines</p>
// // // // // // // //                     <div className="flex flex-wrap gap-2 mt-1">
// // // // // // // //                       {restaurant.cuisine.map((cuisine, index) => (
// // // // // // // //                         <Badge key={index} variant="outline" className="text-xs">
// // // // // // // //                           {cuisine}
// // // // // // // //                         </Badge>
// // // // // // // //                       ))}
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 )}
                
// // // // // // // //                 <div className="pt-4 border-t">
// // // // // // // //                   <div className="flex items-center gap-2 text-green-600 mb-2">
// // // // // // // //                     <Shield className="w-5 h-5" />
// // // // // // // //                     <span className="font-medium">Safety Measures</span>
// // // // // // // //                   </div>
// // // // // // // //                   <ul className="space-y-2 text-sm">
// // // // // // // //                     <li className="flex items-center gap-2">
// // // // // // // //                       <Check className="w-4 h-4 text-green-500" />
// // // // // // // //                       Contactless Delivery Available
// // // // // // // //                     </li>
// // // // // // // //                     <li className="flex items-center gap-2">
// // // // // // // //                       <Check className="w-4 h-4 text-green-500" />
// // // // // // // //                       Daily Temperature Checks
// // // // // // // //                     </li>
// // // // // // // //                   </ul>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </Card>
// // // // // // // //           </div>
          
// // // // // // // //           {/* Right Column - Menu */}
// // // // // // // //           <div className="md:col-span-2">
// // // // // // // //             {/* Category Tabs */}
// // // // // // // //             {categories.length > 1 && (
// // // // // // // //               <div className="mb-8">
// // // // // // // //                 <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
// // // // // // // //                   {categories.map((category) => (
// // // // // // // //                     <Button
// // // // // // // //                       key={category}
// // // // // // // //                       variant={activeCategory === category ? "default" : "outline"}
// // // // // // // //                       className={`whitespace-nowrap rounded-full ${activeCategory === category ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
// // // // // // // //                       onClick={() => setActiveCategory(category)}
// // // // // // // //                     >
// // // // // // // //                       {category === 'all' ? 'All Items' : category}
// // // // // // // //                     </Button>
// // // // // // // //                   ))}
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             )}
            
// // // // // // // //             {/* Dishes Grid */}
// // // // // // // //             {dishes.length === 0 ? (
// // // // // // // //               <div className="text-center py-12 bg-white rounded-xl border border-dashed">
// // // // // // // //                 <Utensils className="h-12 w-12 text-gray-300 mx-auto mb-4" />
// // // // // // // //                 <h3 className="text-lg font-bold text-gray-700 mb-2">No menu items available</h3>
// // // // // // // //                 <p className="text-gray-500">This restaurant hasn't added any dishes yet.</p>
// // // // // // // //               </div>
// // // // // // // //             ) : filteredDishes.length === 0 ? (
// // // // // // // //               <div className="text-center py-12 bg-white rounded-xl">
// // // // // // // //                 <p className="text-gray-500">No dishes found in this category.</p>
// // // // // // // //                 <Button 
// // // // // // // //                   variant="link" 
// // // // // // // //                   onClick={() => setActiveCategory('all')}
// // // // // // // //                   className="mt-2"
// // // // // // // //                 >
// // // // // // // //                   View all dishes
// // // // // // // //                 </Button>
// // // // // // // //               </div>
// // // // // // // //             ) : (
// // // // // // // //               <div className="grid gap-6">
// // // // // // // //                 {filteredDishes.map((dish) => (
// // // // // // // //                   <div 
// // // // // // // //                     key={dish._id} 
// // // // // // // //                     className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300"
// // // // // // // //                   >
// // // // // // // //                     <div className="flex gap-6">
// // // // // // // //                       {/* Dish Image */}
// // // // // // // //                       <div className="flex-shrink-0">
// // // // // // // //                         <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
// // // // // // // //                           <img 
// // // // // // // //                             src={dish.image || "/placeholder-dish.jpg"} 
// // // // // // // //                             alt={dish.name}
// // // // // // // //                             className="w-full h-full object-cover"
// // // // // // // //                           />
// // // // // // // //                         </div>
// // // // // // // //                       </div>
                      
// // // // // // // //                       {/* Dish Info */}
// // // // // // // //                       <div className="flex-1">
// // // // // // // //                         <div className="flex justify-between items-start mb-2">
// // // // // // // //                           <div>
// // // // // // // //                             <div className="flex items-center gap-3 mb-1">
// // // // // // // //                               <h3 className="text-xl font-bold text-gray-900">{dish.name}</h3>
// // // // // // // //                               {/* Veg/Non-Veg Indicator */}
// // // // // // // //                               <div className={`border rounded-full p-px ${dish.isVeg ? 'border-green-600' : 'border-red-600'}`}>
// // // // // // // //                                 <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
// // // // // // // //                               </div>
// // // // // // // //                             </div>
// // // // // // // //                             {dish.rating > 0 && (
// // // // // // // //                               <div className="flex items-center gap-1 text-sm mb-2">
// // // // // // // //                                 <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
// // // // // // // //                                 <span className="font-medium">{dish.rating}</span>
// // // // // // // //                                 <span className="text-gray-500">({dish.reviewCount || 0} reviews)</span>
// // // // // // // //                               </div>
// // // // // // // //                             )}
// // // // // // // //                           </div>
                          
// // // // // // // //                           <div className="text-right">
// // // // // // // //                             <p className="text-2xl font-bold text-gray-900">₹{dish.price}</p>
// // // // // // // //                             {dish.originalPrice && (
// // // // // // // //                               <p className="text-sm text-gray-400 line-through">₹{dish.originalPrice}</p>
// // // // // // // //                             )}
// // // // // // // //                           </div>
// // // // // // // //                         </div>
                        
// // // // // // // //                         <p className="text-gray-600 mb-4 line-clamp-2">{dish.description}</p>
                        
// // // // // // // //                         <div className="flex justify-between items-center">
// // // // // // // //                           {dish.category && (
// // // // // // // //                             <Badge variant="secondary" className="text-xs">
// // // // // // // //                               {dish.category}
// // // // // // // //                             </Badge>
// // // // // // // //                           )}
                          
// // // // // // // //                           <Button 
// // // // // // // //                             onClick={() => handleAddToCart(dish)}
// // // // // // // //                             className="bg-orange-600 hover:bg-orange-700"
// // // // // // // //                           >
// // // // // // // //                             <Plus className="w-4 h-4 mr-2" />
// // // // // // // //                             Add to Cart
// // // // // // // //                           </Button>
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 ))}
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { useParams } from 'next/navigation';
// // // // // // // import { Star, Clock, MapPin, Plus, ShoppingBag, Utensils, Shield, Check, ChevronLeft } from 'lucide-react';
// // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // // // // import { Card } from '@/components/ui/card';
// // // // // // // import { useCartStore } from '@/stores/cartStore';
// // // // // // // import { useToast } from '@/hooks/use-toast';
// // // // // // // import Link from 'next/link';

// // // // // // // export default function RestaurantPage() {
// // // // // // //   const params = useParams();
// // // // // // //   const slug = params?.slug;
  
// // // // // // //   const [restaurant, setRestaurant] = useState(null);
// // // // // // //   const [dishes, setDishes] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // //   const { addToCart } = useCartStore();
// // // // // // //   const { toast } = useToast();

// // // // // // //   useEffect(() => {
// // // // // // //     if (slug) {
// // // // // // //       fetchRestaurantData();
// // // // // // //     }
// // // // // // //   }, [slug]);

// // // // // // //   const fetchRestaurantData = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
      
// // // // // // //       // 1. FIXED: API path is singular '/api/restaurant/'
// // // // // // //       const restaurantRes = await fetch(`/api/restaurant/${slug}`);
      
// // // // // // //       if (!restaurantRes.ok) {
// // // // // // //         throw new Error(`HTTP error! status: ${restaurantRes.status}`);
// // // // // // //       }
      
// // // // // // //       const responseJson = await restaurantRes.json();
      
// // // // // // //       if (responseJson.success) {
// // // // // // //         const data = responseJson.data;
// // // // // // //         setRestaurant(data);
        
// // // // // // //         // 2. FIXED: Dishes are usually inside the same response
// // // // // // //         setDishes(data.dishes || []); 
// // // // // // //       } else {
// // // // // // //         console.error("Failed to fetch restaurant:", responseJson.error);
// // // // // // //         setRestaurant(null);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Failed to load restaurant", error);
// // // // // // //       toast({
// // // // // // //         title: "Error",
// // // // // // //         description: "Failed to load restaurant data.",
// // // // // // //         variant: "destructive"
// // // // // // //       });
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const categories = ['all', ...new Set(dishes.map(dish => dish.category).filter(Boolean))];
  
// // // // // // //   const filteredDishes = activeCategory === 'all' 
// // // // // // //     ? dishes 
// // // // // // //     : dishes.filter(dish => dish.category === activeCategory);

// // // // // // //   const handleAddToCart = (item) => {
// // // // // // //     if (!restaurant) return;
    
// // // // // // //     addToCart({
// // // // // // //       id: item._id,
// // // // // // //       name: item.name,
// // // // // // //       price: item.price,
// // // // // // //       image: item.image,
// // // // // // //       description: item.description,
// // // // // // //       restaurantId: restaurant._id,
// // // // // // //       restaurantName: restaurant.name,
// // // // // // //       restaurantSlug: restaurant.slug
// // // // // // //     });
    
// // // // // // //     toast({
// // // // // // //       title: "Added to Cart",
// // // // // // //       description: `${item.name} added successfully!`,
// // // // // // //     });
// // // // // // //   };

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // //         <Skeleton className="h-64 w-full rounded-xl mb-8" />
// // // // // // //         <div className="flex flex-col md:flex-row gap-6 mb-8">
// // // // // // //           <Skeleton className="h-32 w-full md:w-2/3 rounded-xl" />
// // // // // // //           <Skeleton className="h-32 w-full md:w-1/3 rounded-xl" />
// // // // // // //         </div>
// // // // // // //         <Skeleton className="h-12 w-48 mb-6" />
// // // // // // //         <div className="grid md:grid-cols-2 gap-6">
// // // // // // //           {[...Array(6)].map((_, i) => (
// // // // // // //             <Skeleton key={i} className="h-40 rounded-xl" />
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (!restaurant) {
// // // // // // //     return (
// // // // // // //       <div className="min-h-screen flex flex-col items-center justify-center p-8">
// // // // // // //         <Utensils className="h-20 w-20 text-gray-300 mb-4" />
// // // // // // //         <h2 className="text-2xl font-bold text-gray-700 mb-2">Restaurant not found</h2>
// // // // // // //         <p className="text-gray-500 text-center mb-6">
// // // // // // //           The restaurant you're looking for doesn't exist or is no longer available.
// // // // // // //         </p>
// // // // // // //         <Button asChild>
// // // // // // //           {/* 👇 FIXED: Point to Home "/" instead of "/restaurant" */}
// // // // // // //           <Link href="/">
// // // // // // //             <ChevronLeft className="w-4 h-4 mr-2" />
// // // // // // //             Browse Restaurants
// // // // // // //           </Link>
// // // // // // //         </Button>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // //       {/* Back Button */}
// // // // // // //       <div className="container mx-auto px-4 pt-4">
// // // // // // //         <Button variant="ghost" size="sm" asChild className="mb-4">
// // // // // // //           {/* 👇 FIXED: Point to Home "/" instead of "/restaurant" */}
// // // // // // //           <Link href="/">
// // // // // // //             <ChevronLeft className="w-4 h-4 mr-2" />
// // // // // // //             Back to Restaurants
// // // // // // //           </Link>
// // // // // // //         </Button>
// // // // // // //       </div>

// // // // // // //       {/* Cover Image Header */}
// // // // // // //       <div className="relative h-64 md:h-80 w-full">
// // // // // // //         <img 
// // // // // // //           src={restaurant.coverImage || "/placeholder-restaurant.jpg"} 
// // // // // // //           alt={restaurant.name} 
// // // // // // //           className="w-full h-full object-cover"
// // // // // // //         />
// // // // // // //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
// // // // // // //           <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
// // // // // // //             <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{restaurant.name}</h1>
            
// // // // // // //             <div className="flex flex-wrap items-center gap-3 mb-3">
// // // // // // //               <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
// // // // // // //                 <Star className="w-4 h-4 fill-white" />
// // // // // // //                 {restaurant.rating || "New"}
// // // // // // //               </div>
              
// // // // // // //               <div className="flex items-center gap-1 text-white bg-blue-600 px-3 py-1 rounded-full text-sm">
// // // // // // //                 <Clock className="w-4 h-4" />
// // // // // // //                 {restaurant.deliveryTime || 30} mins
// // // // // // //               </div>
              
// // // // // // //               {restaurant.minOrder > 0 && (
// // // // // // //                 <div className="text-white bg-gray-700 px-3 py-1 rounded-full text-sm">
// // // // // // //                   Min. ₹{restaurant.minOrder}
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
            
// // // // // // //             <p className="text-white/90 text-sm md:text-base max-w-3xl">
// // // // // // //               {restaurant.description}
// // // // // // //             </p>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Restaurant Info & Menu */}
// // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // //         <div className="grid md:grid-cols-3 gap-8">
// // // // // // //           {/* Left Column - Info */}
// // // // // // //           <div className="md:col-span-1">
// // // // // // //             <Card className="p-6 mb-6">
// // // // // // //               <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
// // // // // // //                 <MapPin className="w-5 h-5 text-gray-500" />
// // // // // // //                 Location & Info
// // // // // // //               </h3>
              
// // // // // // //               <div className="space-y-4">
// // // // // // //                 <div>
// // // // // // //                   <p className="text-gray-500 text-sm">Address</p>
// // // // // // //                   <p className="font-medium">{restaurant.address?.street || "N/A"}</p>
// // // // // // //                   <p className="text-sm text-gray-600">{restaurant.address?.city || ""}</p>
// // // // // // //                 </div>
                
// // // // // // //                 {restaurant.cuisine && restaurant.cuisine.length > 0 && (
// // // // // // //                   <div>
// // // // // // //                     <p className="text-gray-500 text-sm">Cuisines</p>
// // // // // // //                     <div className="flex flex-wrap gap-2 mt-1">
// // // // // // //                       {restaurant.cuisine.map((cuisine, index) => (
// // // // // // //                         <Badge key={index} variant="outline" className="text-xs">
// // // // // // //                           {cuisine}
// // // // // // //                         </Badge>
// // // // // // //                       ))}
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 )}
                
// // // // // // //                 <div className="pt-4 border-t">
// // // // // // //                   <div className="flex items-center gap-2 text-green-600 mb-2">
// // // // // // //                     <Shield className="w-5 h-5" />
// // // // // // //                     <span className="font-medium">Safety Measures</span>
// // // // // // //                   </div>
// // // // // // //                   <ul className="space-y-2 text-sm">
// // // // // // //                     <li className="flex items-center gap-2">
// // // // // // //                       <Check className="w-4 h-4 text-green-500" />
// // // // // // //                       Contactless Delivery Available
// // // // // // //                     </li>
// // // // // // //                     <li className="flex items-center gap-2">
// // // // // // //                       <Check className="w-4 h-4 text-green-500" />
// // // // // // //                       Daily Temperature Checks
// // // // // // //                     </li>
// // // // // // //                   </ul>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </Card>
// // // // // // //           </div>
          
// // // // // // //           {/* Right Column - Menu */}
// // // // // // //           <div className="md:col-span-2">
// // // // // // //             {categories.length > 1 && (
// // // // // // //               <div className="mb-8">
// // // // // // //                 <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
// // // // // // //                   {categories.map((category) => (
// // // // // // //                     <Button
// // // // // // //                       key={category}
// // // // // // //                       variant={activeCategory === category ? "default" : "outline"}
// // // // // // //                       className={`whitespace-nowrap rounded-full ${activeCategory === category ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
// // // // // // //                       onClick={() => setActiveCategory(category)}
// // // // // // //                     >
// // // // // // //                       {category === 'all' ? 'All Items' : category}
// // // // // // //                     </Button>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
            
// // // // // // //             {dishes.length === 0 ? (
// // // // // // //               <div className="text-center py-12 bg-white rounded-xl border border-dashed">
// // // // // // //                 <Utensils className="h-12 w-12 text-gray-300 mx-auto mb-4" />
// // // // // // //                 <h3 className="text-lg font-bold text-gray-700 mb-2">No menu items available</h3>
// // // // // // //                 <p className="text-gray-500">This restaurant hasn't added any dishes yet.</p>
// // // // // // //               </div>
// // // // // // //             ) : filteredDishes.length === 0 ? (
// // // // // // //               <div className="text-center py-12 bg-white rounded-xl">
// // // // // // //                 <p className="text-gray-500">No dishes found in this category.</p>
// // // // // // //                 <Button 
// // // // // // //                   variant="link" 
// // // // // // //                   onClick={() => setActiveCategory('all')}
// // // // // // //                   className="mt-2"
// // // // // // //                 >
// // // // // // //                   View all dishes
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <div className="grid gap-6">
// // // // // // //                 {filteredDishes.map((dish) => (
// // // // // // //                   <div 
// // // // // // //                     key={dish._id} 
// // // // // // //                     className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300"
// // // // // // //                   >
// // // // // // //                     <div className="flex gap-6">
// // // // // // //                       <div className="flex-shrink-0">
// // // // // // //                         <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
// // // // // // //                           <img 
// // // // // // //                             src={dish.image || "/placeholder-dish.jpg"} 
// // // // // // //                             alt={dish.name}
// // // // // // //                             className="w-full h-full object-cover"
// // // // // // //                           />
// // // // // // //                         </div>
// // // // // // //                       </div>
                      
// // // // // // //                       <div className="flex-1">
// // // // // // //                         <div className="flex justify-between items-start mb-2">
// // // // // // //                           <div>
// // // // // // //                             <div className="flex items-center gap-3 mb-1">
// // // // // // //                               <h3 className="text-xl font-bold text-gray-900">{dish.name}</h3>
// // // // // // //                               <div className={`border rounded-full p-px ${dish.isVeg ? 'border-green-600' : 'border-red-600'}`}>
// // // // // // //                                 <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
// // // // // // //                               </div>
// // // // // // //                             </div>
// // // // // // //                             {dish.rating > 0 && (
// // // // // // //                               <div className="flex items-center gap-1 text-sm mb-2">
// // // // // // //                                 <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
// // // // // // //                                 <span className="font-medium">{dish.rating}</span>
// // // // // // //                               </div>
// // // // // // //                             )}
// // // // // // //                           </div>
                          
// // // // // // //                           <div className="text-right">
// // // // // // //                             <p className="text-2xl font-bold text-gray-900">₹{dish.price}</p>
// // // // // // //                             {dish.originalPrice && (
// // // // // // //                               <p className="text-sm text-gray-400 line-through">₹{dish.originalPrice}</p>
// // // // // // //                             )}
// // // // // // //                           </div>
// // // // // // //                         </div>
                        
// // // // // // //                         <p className="text-gray-600 mb-4 line-clamp-2">{dish.description}</p>
                        
// // // // // // //                         <div className="flex justify-between items-center">
// // // // // // //                           {dish.category && (
// // // // // // //                             <Badge variant="secondary" className="text-xs">
// // // // // // //                               {dish.category}
// // // // // // //                             </Badge>
// // // // // // //                           )}
                          
// // // // // // //                           <Button 
// // // // // // //                             onClick={() => handleAddToCart(dish)}
// // // // // // //                             className="bg-orange-600 hover:bg-orange-700"
// // // // // // //                           >
// // // // // // //                             <Plus className="w-4 h-4 mr-2" />
// // // // // // //                             Add to Cart
// // // // // // //                           </Button>
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { useParams } from 'next/navigation';
// // // // // // import { Star, Clock, MapPin, Plus, Shield, Check, ChevronLeft, Utensils } from 'lucide-react';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // // // import { Card } from '@/components/ui/card';
// // // // // // import { useCartStore } from '@/stores/cartStore';
// // // // // // import { useToast } from '@/hooks/use-toast';
// // // // // // import Link from 'next/link';

// // // // // // export default function RestaurantPage() {
// // // // // //   const params = useParams();
// // // // // //   const slug = params?.slug;
  
// // // // // //   const [restaurant, setRestaurant] = useState(null);
// // // // // //   const [dishes, setDishes] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // //   const { addToCart } = useCartStore();
// // // // // //   const { toast } = useToast();

// // // // // //   useEffect(() => {
// // // // // //     if (slug) {
// // // // // //       fetchRestaurantData();
// // // // // //     }
// // // // // //   }, [slug]);

// // // // // //   const fetchRestaurantData = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
      
// // // // // //       // ✅ Fetch from Singular API
// // // // // //       const restaurantRes = await fetch(`/api/restaurant/${slug}`);
      
// // // // // //       if (!restaurantRes.ok) {
// // // // // //         throw new Error(`HTTP error! status: ${restaurantRes.status}`);
// // // // // //       }
      
// // // // // //       const responseJson = await restaurantRes.json();
      
// // // // // //       if (responseJson.success) {
// // // // // //         setRestaurant(responseJson.data);
// // // // // //         // Dishes are inside the same response
// // // // // //         setDishes(responseJson.data.dishes || []); 
// // // // // //       } else {
// // // // // //         setRestaurant(null);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Failed to load restaurant", error);
// // // // // //       toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const categories = ['all', ...new Set(dishes.map(dish => dish.category).filter(Boolean))];
// // // // // //   const filteredDishes = activeCategory === 'all' ? dishes : dishes.filter(dish => dish.category === activeCategory);

// // // // // //   const handleAddToCart = (item) => {
// // // // // //     if (!restaurant) return;
// // // // // //     addToCart({
// // // // // //       id: item._id,
// // // // // //       name: item.name,
// // // // // //       price: item.price,
// // // // // //       image: item.image,
// // // // // //       description: item.description,
// // // // // //       restaurantId: restaurant._id,
// // // // // //       restaurantName: restaurant.name,
// // // // // //       restaurantSlug: restaurant.slug
// // // // // //     });
// // // // // //     toast({ title: "Added to Cart", description: `${item.name} added!` });
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // //         <Skeleton className="h-64 w-full rounded-xl mb-8" />
// // // // // //         <div className="grid md:grid-cols-3 gap-8">
// // // // // //           <Skeleton className="h-64 w-full rounded-xl" />
// // // // // //           <div className="md:col-span-2 space-y-4">
// // // // // //              {[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!restaurant) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex flex-col items-center justify-center p-8">
// // // // // //         <Utensils className="h-20 w-20 text-gray-300 mb-4" />
// // // // // //         <h2 className="text-2xl font-bold mb-2">Restaurant not found</h2>
// // // // // //         <Button asChild>
// // // // // //           <Link href="/"><ChevronLeft className="w-4 h-4 mr-2" /> Browse Restaurants</Link>
// // // // // //         </Button>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50 pb-12">
// // // // // //       {/* Back Button */}
// // // // // //       <div className="container mx-auto px-4 pt-4">
// // // // // //         <Button variant="ghost" size="sm" asChild className="mb-4">
// // // // // //           <Link href="/"><ChevronLeft className="w-4 h-4 mr-2" /> Back to Home</Link>
// // // // // //         </Button>
// // // // // //       </div>

// // // // // //       {/* Header */}
// // // // // //       <div className="relative h-64 md:h-80 w-full mb-8">
// // // // // //         <img src={restaurant.coverImage || "/placeholder.jpg"} alt={restaurant.name} className="w-full h-full object-cover" />
// // // // // //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end pb-8">
// // // // // //           <div className="container mx-auto px-4 text-white">
// // // // // //             <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
// // // // // //             <div className="flex gap-3 text-sm">
// // // // // //               <Badge className="bg-green-600 hover:bg-green-700">{restaurant.rating} ★</Badge>
// // // // // //               <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur">{restaurant.deliveryTime} mins</span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
// // // // // //         {/* Sidebar Info */}
// // // // // //         <div className="md:col-span-1 space-y-6">
// // // // // //           <Card className="p-6">
// // // // // //             <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" /> Info</h3>
// // // // // //             <p className="text-gray-600 text-sm mb-2">{restaurant.address?.street}, {restaurant.address?.city}</p>
// // // // // //             <div className="flex flex-wrap gap-2">
// // // // // //               {restaurant.cuisine?.map(c => <Badge key={c} variant="outline">{c}</Badge>)}
// // // // // //             </div>
// // // // // //             <div className="mt-4 pt-4 border-t text-sm space-y-2">
// // // // // //               <div className="flex items-center gap-2 text-green-600"><Shield className="w-4 h-4" /> Safety Measures</div>
// // // // // //               <div className="flex items-center gap-2 text-gray-500"><Check className="w-4 h-4" /> Contactless Delivery</div>
// // // // // //             </div>
// // // // // //           </Card>
// // // // // //         </div>

// // // // // //         {/* Menu */}
// // // // // //         <div className="md:col-span-2">
// // // // // //           {/* Categories */}
// // // // // //           {categories.length > 1 && (
// // // // // //             <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
// // // // // //               {categories.map(cat => (
// // // // // //                 <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} onClick={() => setActiveCategory(cat)} className="rounded-full">
// // // // // //                   {cat === 'all' ? 'All' : cat}
// // // // // //                 </Button>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* Dishes */}
// // // // // //           <div className="space-y-4">
// // // // // //             {filteredDishes.map(dish => (
// // // // // //               <Card key={dish._id} className="p-4 flex gap-4 hover:shadow-md transition-shadow">
// // // // // //                 <img src={dish.image || "/placeholder-dish.jpg"} alt={dish.name} className="w-24 h-24 rounded-lg object-cover bg-gray-100" />
// // // // // //                 <div className="flex-1">
// // // // // //                   <div className="flex justify-between items-start">
// // // // // //                     <div>
// // // // // //                       <h3 className="font-bold text-lg flex items-center gap-2">
// // // // // //                         {dish.name}
// // // // // //                         <span className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
// // // // // //                       </h3>
// // // // // //                       <p className="text-sm text-gray-500 line-clamp-2">{dish.description}</p>
// // // // // //                     </div>
// // // // // //                     <div className="text-right">
// // // // // //                       <div className="font-bold text-lg">₹{dish.price}</div>
// // // // // //                       <Button size="sm" onClick={() => handleAddToCart(dish)} className="mt-2 bg-orange-600 hover:bg-orange-700">Add</Button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </Card>
// // // // // //             ))}
// // // // // //             {filteredDishes.length === 0 && <div className="text-center py-10 text-gray-500">No items found.</div>}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { useParams } from 'next/navigation';
// // // // // import { useSession } from 'next-auth/react';
// // // // // import { Star, Clock, MapPin, Plus, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Badge } from '@/components/ui/badge';
// // // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // // import { Card } from '@/components/ui/card';
// // // // // import { useCartStore } from '@/stores/cartStore';
// // // // // import { useToast } from '@/hooks/use-toast';
// // // // // import Link from 'next/link';

// // // // // export default function RestaurantPage() {
// // // // //   const params = useParams();
// // // // //   const { data: session } = useSession();
// // // // //   const slug = params?.slug;
  
// // // // //   const [restaurant, setRestaurant] = useState(null);
// // // // //   const [dishes, setDishes] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isFavorite, setIsFavorite] = useState(false);
// // // // //   const [favLoading, setFavLoading] = useState(false);
  
// // // // //   const addToCart = useCartStore((state) => state.addToCart); // Correctly hook up store
// // // // //   const { toast } = useToast();

// // // // //   useEffect(() => {
// // // // //     if (slug) {
// // // // //       fetchRestaurantData();
// // // // //       if(session) checkFavoriteStatus();
// // // // //     }
// // // // //   }, [slug, session]);

// // // // //   const fetchRestaurantData = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await fetch(`/api/restaurant/${slug}`);
// // // // //       const data = await res.json();
      
// // // // //       if (data.success) {
// // // // //         setRestaurant(data.data);
// // // // //         setDishes(data.data.dishes || []);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Failed to load", error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Check if current user already liked this restaurant
// // // // //   const checkFavoriteStatus = async () => {
// // // // //     try {
// // // // //       const res = await fetch('/api/favorites');
// // // // //       const data = await res.json();
// // // // //       if(data.success && restaurant) {
// // // // //         // Check if current restaurant ID is in the list
// // // // //         const found = data.data.some(fav => fav._id === restaurant._id);
// // // // //         setIsFavorite(found);
// // // // //       }
// // // // //     } catch (e) { console.error(e); }
// // // // //   };

// // // // //   const handleToggleFavorite = async () => {
// // // // //     if(!session) {
// // // // //       toast({ title: "Login Required", description: "Please login to save favorites." });
// // // // //       return;
// // // // //     }
// // // // //     setFavLoading(true);
// // // // //     try {
// // // // //       const res = await fetch('/api/favorites', {
// // // // //         method: 'POST',
// // // // //         body: JSON.stringify({ restaurantId: restaurant._id })
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       if(data.success) {
// // // // //         setIsFavorite(data.isFavorite);
// // // // //         toast({ title: data.isFavorite ? "Added to Favorites" : "Removed from Favorites" });
// // // // //       }
// // // // //     } catch(e) {
// // // // //       toast({ title: "Error", variant: "destructive" });
// // // // //     } finally {
// // // // //       setFavLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleAddToCart = (dish) => {
// // // // //     if (!restaurant) return;
    
// // // // //     addToCart({
// // // // //       id: dish._id,
// // // // //       name: dish.name,
// // // // //       price: dish.price,
// // // // //       image: dish.image,
// // // // //       restaurantId: restaurant._id,
// // // // //       restaurantName: restaurant.name,
// // // // //       restaurantSlug: restaurant.slug,
// // // // //       quantity: 1
// // // // //     });
    
// // // // //     toast({
// // // // //       title: "Added to Cart",
// // // // //       description: `${dish.name} added successfully!`,
// // // // //       action: <Link href="/cartU" className="text-sm font-bold underline">View Cart</Link>
// // // // //     });
// // // // //   };

// // // // //   if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;

// // // // //   if (!restaurant) {
// // // // //     return (
// // // // //       <div className="p-10 text-center">
// // // // //         <h2 className="text-xl font-bold">Restaurant not found</h2>
// // // // //         <Button asChild className="mt-4"><Link href="/">Back Home</Link></Button>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 pb-20">
// // // // //       {/* Header Image */}
// // // // //       <div className="relative h-72 md:h-96 w-full">
// // // // //         <img 
// // // // //           src={restaurant.coverImage || "/placeholder.jpg"} 
// // // // //           alt={restaurant.name} 
// // // // //           className="w-full h-full object-cover"
// // // // //         />
// // // // //         <div className="absolute inset-0 bg-black/50" />
        
// // // // //         <div className="absolute bottom-0 left-0 w-full p-6 text-white container mx-auto">
// // // // //           <Link href="/restaurants" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80">
// // // // //             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Restaurants
// // // // //           </Link>
          
// // // // //           <div className="flex justify-between items-end">
// // // // //             <div>
// // // // //               <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
// // // // //               <div className="flex items-center gap-4 text-sm md:text-base">
// // // // //                 <span className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
// // // // //                   {restaurant.rating || "New"} <Star className="w-3 h-3 fill-white" />
// // // // //                 </span>
// // // // //                 <span>{restaurant.cuisine?.join(', ')}</span>
// // // // //                 <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address?.city}</span>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             {/* Favorite Button */}
// // // // //             <Button 
// // // // //               size="icon" 
// // // // //               variant="secondary" 
// // // // //               className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/40 border-0 backdrop-blur-sm"
// // // // //               onClick={handleToggleFavorite}
// // // // //               disabled={favLoading}
// // // // //             >
// // // // //               <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
// // // // //         {/* Menu List */}
// // // // //         <div className="md:col-span-2 space-y-6">
// // // // //           <h2 className="text-2xl font-bold">Menu</h2>
          
// // // // //           {dishes.length === 0 ? (
// // // // //             <div className="p-8 border-2 border-dashed rounded-lg text-center text-gray-500">
// // // // //               No dishes available at the moment.
// // // // //             </div>
// // // // //           ) : (
// // // // //             dishes.map((dish) => (
// // // // //               <Card key={dish._id} className="p-4 flex gap-4 hover:shadow-md transition-shadow">
// // // // //                 <div className="h-32 w-32 shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
// // // // //                   {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
// // // // //                   {!dish.isAvailable && (
// // // // //                     <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-bold text-red-500">
// // // // //                       Sold Out
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>
                
// // // // //                 <div className="flex-1 flex flex-col justify-between">
// // // // //                   <div>
// // // // //                     <div className="flex justify-between items-start">
// // // // //                       <h3 className="font-bold text-lg">{dish.name}</h3>
// // // // //                       <div className={`border px-1.5 py-0.5 text-[10px] rounded ${dish.dietary?.[0]?.includes('non') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
// // // // //                         ●
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
// // // // //                     <div className="font-bold mt-2">₹{dish.price}</div>
// // // // //                   </div>
                  
// // // // //                   <Button 
// // // // //                     className="self-end bg-white text-green-600 border border-green-600 hover:bg-green-50 w-24"
// // // // //                     disabled={!dish.isAvailable}
// // // // //                     onClick={() => handleAddToCart(dish)}
// // // // //                   >
// // // // //                     ADD <Plus className="w-4 h-4 ml-1" />
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               </Card>
// // // // //             ))
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Sidebar Info */}
// // // // //         <div className="space-y-6">
// // // // //           <Card className="p-6">
// // // // //             <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
// // // // //             <div className="space-y-3 text-sm text-gray-600">
// // // // //               <div className="flex items-center gap-3">
// // // // //                 <Clock className="w-5 h-5 text-gray-400" />
// // // // //                 <span>{restaurant.deliveryTime} mins</span>
// // // // //               </div>
// // // // //               <div className="flex items-center gap-3">
// // // // //                 <ShoppingBag className="w-5 h-5 text-gray-400" />
// // // // //                 <span>Min Order: ₹{restaurant.minOrder}</span>
// // // // //               </div>
// // // // //             </div>
// // // // //           </Card>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useParams } from 'next/navigation';
// // // // import { useSession } from 'next-auth/react';
// // // // import { Star, Clock, MapPin, Plus, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // import { Card } from '@/components/ui/card';
// // // // import { useCartStore } from '@/stores/cartStore';
// // // // import { useToast } from '@/hooks/use-toast';
// // // // import Link from 'next/link';

// // // // export default function RestaurantPage() {
// // // //   const params = useParams();
// // // //   const { data: session } = useSession();
// // // //   const slug = params?.slug;
  
// // // //   const [restaurant, setRestaurant] = useState(null);
// // // //   const [dishes, setDishes] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isFavorite, setIsFavorite] = useState(false);
// // // //   const [favLoading, setFavLoading] = useState(false);
  
// // // //   // Use Zustand Hook
// // // //   const addToCart = useCartStore((state) => state.addToCart);
// // // //   const { toast } = useToast();

// // // //   useEffect(() => {
// // // //     if (slug) {
// // // //       fetchRestaurantData();
// // // //     }
// // // //   }, [slug]);

// // // //   // Separate effect for favorites to ensure we have restaurant data first
// // // //   useEffect(() => {
// // // //     if (session && restaurant) {
// // // //       checkFavoriteStatus();
// // // //     }
// // // //   }, [session, restaurant]);

// // // //   const fetchRestaurantData = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await fetch(`/api/restaurant/${slug}`);
// // // //       const data = await res.json();
      
// // // //       if (data.success) {
// // // //         setRestaurant(data.data);
// // // //         setDishes(data.data.dishes || []);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Failed to load", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const checkFavoriteStatus = async () => {
// // // //     try {
// // // //       const res = await fetch('/api/favorites'); // GET
// // // //       const data = await res.json();
// // // //       if(data.success && restaurant) {
// // // //         // Check if ID exists in the returned array
// // // //         const found = data.data.some(fav => fav._id === restaurant._id);
// // // //         setIsFavorite(found);
// // // //       }
// // // //     } catch (e) { console.error(e); }
// // // //   };

// // // //   const handleToggleFavorite = async () => {
// // // //     if(!session) {
// // // //       toast({ title: "Login Required", description: "Please login to save favorites." });
// // // //       return;
// // // //     }
// // // //     setFavLoading(true);
// // // //     try {
// // // //       const res = await fetch('/api/favorites', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ restaurantId: restaurant._id })
// // // //       });
      
// // // //       const data = await res.json();
      
// // // //       if(data.success) {
// // // //         setIsFavorite(data.isFavorite);
// // // //         toast({ 
// // // //           title: data.isFavorite ? "Added to Favorites" : "Removed from Favorites",
// // // //           className: "bg-green-50 border-green-200"
// // // //         });
// // // //       } else {
// // // //         throw new Error(data.error);
// // // //       }
// // // //     } catch(e) {
// // // //       console.error(e);
// // // //       toast({ title: "Error", description: "Failed to update favorites", variant: "destructive" });
// // // //     } finally {
// // // //       setFavLoading(false);
// // // //     }
// // // //   };

// // // //   const handleAddToCart = (dish) => {
// // // //     if (!restaurant) return;
    
// // // //     addToCart({
// // // //       id: dish._id,
// // // //       name: dish.name,
// // // //       price: dish.price,
// // // //       image: dish.image,
// // // //       restaurantId: restaurant._id,
// // // //       restaurantName: restaurant.name,
// // // //       restaurantSlug: restaurant.slug,
// // // //       quantity: 1
// // // //     });
    
// // // //     toast({
// // // //       title: "Added to Cart",
// // // //       description: `${dish.name}`,
// // // //       action: <Link href="/cartU" className="bg-orange-600 text-white px-3 py-1 rounded text-xs">View Cart</Link>
// // // //     });
// // // //   };

// // // //   if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;

// // // //   if (!restaurant) {
// // // //     return (
// // // //       <div className="p-10 text-center">
// // // //         <h2 className="text-xl font-bold">Restaurant not found</h2>
// // // //         <Button asChild className="mt-4"><Link href="/">Back Home</Link></Button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 pb-20">
// // // //       <div className="relative h-72 md:h-96 w-full">
// // // //         <img 
// // // //           src={restaurant.coverImage || "/placeholder.jpg"} 
// // // //           alt={restaurant.name} 
// // // //           className="w-full h-full object-cover"
// // // //         />
// // // //         <div className="absolute inset-0 bg-black/50" />
        
// // // //         <div className="absolute bottom-0 left-0 w-full p-6 text-white container mx-auto">
// // // //           <Link href="/restaurants" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80">
// // // //             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Restaurants
// // // //           </Link>
          
// // // //           <div className="flex justify-between items-end">
// // // //             <div>
// // // //               <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
// // // //               <div className="flex items-center gap-4 text-sm md:text-base">
// // // //                 <span className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
// // // //                   {restaurant.rating || "New"} <Star className="w-3 h-3 fill-white" />
// // // //                 </span>
// // // //                 <span>{restaurant.cuisine?.join(', ')}</span>
// // // //                 <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address?.city}</span>
// // // //               </div>
// // // //             </div>
            
// // // //             <Button 
// // // //               size="icon" 
// // // //               variant="secondary" 
// // // //               className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/40 border-0 backdrop-blur-sm transition-all"
// // // //               onClick={handleToggleFavorite}
// // // //               disabled={favLoading}
// // // //             >
// // // //               <Heart className={`w-6 h-6 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
// // // //             </Button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
// // // //         {/* Menu List */}
// // // //         <div className="md:col-span-2 space-y-6">
// // // //           <h2 className="text-2xl font-bold">Menu</h2>
// // // //           {dishes.length === 0 ? (
// // // //             <div className="p-8 border-2 border-dashed rounded-lg text-center text-gray-500">
// // // //               No dishes available at the moment.
// // // //             </div>
// // // //           ) : (
// // // //             dishes.map((dish) => (
// // // //               <Link href="/cartU" className=" hover:underline cursor:pointer">
// // // //               <Card key={dish._id} className="p-4 flex gap-4 hover:shadow-md transition-shadow">
// // // //                 <div className="h-32 w-32 shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
// // // //                   {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
// // // //                   {!dish.isAvailable && (
// // // //                     <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-bold text-red-500">
// // // //                       Sold Out
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
                
// // // //                 <div className="flex-1 flex flex-col justify-between" >
// // // //                   <div>
// // // //                     <div className="flex justify-between items-start">
// // // //                       <h3 className="font-bold text-lg">{dish.name}</h3>
// // // //                       {/* Veg/Non-Veg Dot */}
// // // //                       <div className={`border px-1.5 py-0.5 text-[10px] rounded ${dish.dietary?.[0]?.includes('non') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
// // // //                         ●
// // // //                       </div>
// // // //                     </div>
// // // //                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
// // // //                     <div className="font-bold mt-2">₹{dish.price}</div>
// // // //                   </div>
                  
// // // //                   <Button 
// // // //                     className="self-end bg-white text-green-600 border border-green-600 hover:bg-green-50 w-24 shadow-none"
// // // //                     disabled={!dish.isAvailable}
// // // //                     onClick={() => handleAddToCart(dish)}
// // // //                   >
// // // //                     ADD <Plus className="w-4 h-4 ml-1" />
// // // //                   </Button>
// // // //                 </div>
// // // //               </Card>
// // // //               </Link>
// // // //             ))
// // // //           )}
// // // //         </div>

// // // //         {/* Sidebar Info */}
// // // //         <div className="space-y-6">
// // // //           <Card className="p-6">
// // // //             <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
// // // //             <div className="space-y-3 text-sm text-gray-600">
// // // //               <div className="flex items-center gap-3">
// // // //                 <Clock className="w-5 h-5 text-gray-400" />
// // // //                 <span>{restaurant.deliveryTime} mins</span>
// // // //               </div>
// // // //               <div className="flex items-center gap-3">
// // // //                 <ShoppingBag className="w-5 h-5 text-gray-400" />
// // // //                 <span>Min Order: ₹{restaurant.minOrder}</span>
// // // //               </div>
// // // //             </div>
// // // //           </Card>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useParams } from 'next/navigation';
// // // // import { useSession } from 'next-auth/react';
// // // // import { Star, Clock, MapPin, Plus, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // import { Card } from '@/components/ui/card';
// // // // import { useCartStore } from '@/stores/cartStore';
// // // // import { useToast } from '@/hooks/use-toast';
// // // // import Link from 'next/link';

// // // // export default function RestaurantPage() {
// // // //   const params = useParams();
// // // //   const { data: session } = useSession();
// // // //   const slug = params?.slug;
  
// // // //   const [restaurant, setRestaurant] = useState(null);
// // // //   const [dishes, setDishes] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isFavorite, setIsFavorite] = useState(false);
// // // //   const [favLoading, setFavLoading] = useState(false);
  
// // // //   const addToCart = useCartStore((state) => state.addToCart);
// // // //   const { toast } = useToast();

// // // //   useEffect(() => {
// // // //     if (slug) {
// // // //       fetchRestaurantData();
// // // //     }
// // // //   }, [slug]);

// // // //   useEffect(() => {
// // // //     if (session && restaurant) {
// // // //       checkFavoriteStatus();
// // // //     }
// // // //   }, [session, restaurant]);

// // // //   const fetchRestaurantData = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await fetch(`/api/restaurant/${slug}`);
// // // //       const data = await res.json();
      
// // // //       if (data.success) {
// // // //         setRestaurant(data.data);
// // // //         setDishes(data.data.dishes || []);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Failed to load", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const checkFavoriteStatus = async () => {
// // // //     try {
// // // //       const res = await fetch('/api/favorites');
// // // //       const data = await res.json();
// // // //       if(data.success && restaurant) {
// // // //         const found = data.data.some(fav => fav._id === restaurant._id);
// // // //         setIsFavorite(found);
// // // //       }
// // // //     } catch (e) { console.error(e); }
// // // //   };

// // // //   const handleToggleFavorite = async () => {
// // // //     if(!session) {
// // // //       toast({ title: "Login Required", description: "Please login to save favorites." });
// // // //       return;
// // // //     }
// // // //     setFavLoading(true);
// // // //     try {
// // // //       const res = await fetch('/api/favorites', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ restaurantId: restaurant._id })
// // // //       });
      
// // // //       const data = await res.json();
      
// // // //       if(data.success) {
// // // //         setIsFavorite(data.isFavorite);
// // // //         toast({ 
// // // //           title: data.isFavorite ? "Added to Favorites" : "Removed from Favorites",
// // // //           className: "bg-green-50 border-green-200"
// // // //         });
// // // //       } else {
// // // //         throw new Error(data.error);
// // // //       }
// // // //     } catch(e) {
// // // //       console.error(e);
// // // //       toast({ title: "Error", description: "Failed to update favorites", variant: "destructive" });
// // // //     } finally {
// // // //       setFavLoading(false);
// // // //     }
// // // //   };

// // // //   const handleAddToCart = (dish) => {
// // // //     if (!restaurant) return;
    
// // // //     addToCart({
// // // //       id: dish._id,
// // // //       name: dish.name,
// // // //       price: dish.price,
// // // //       image: dish.image,
// // // //       restaurantId: restaurant._id,
// // // //       restaurantName: restaurant.name,
// // // //       restaurantSlug: restaurant.slug,
// // // //       quantity: 1
// // // //     });
    
// // // //     toast({
// // // //       title: "Added to Cart",
// // // //       description: `${dish.name}`,
// // // //       action: <Link href="/cartU" className="bg-orange-600 text-white px-3 py-1 rounded text-xs">View Cart</Link>
// // // //     });
// // // //   };

// // // //   if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;

// // // //   if (!restaurant) {
// // // //     return (
// // // //       <div className="p-10 text-center">
// // // //         <h2 className="text-xl font-bold">Restaurant not found</h2>
// // // //         <Button asChild className="mt-4"><Link href="/">Back Home</Link></Button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 pb-20">
// // // //       {/* Header Image */}
// // // //       <div className="relative h-72 md:h-96 w-full">
// // // //         <img 
// // // //           src={restaurant.coverImage || "/placeholder.jpg"} 
// // // //           alt={restaurant.name} 
// // // //           className="w-full h-full object-cover"
// // // //         />
// // // //         <div className="absolute inset-0 bg-black/50" />
        
// // // //         <div className="absolute bottom-0 left-0 w-full p-6 text-white container mx-auto">
// // // //           <Link href="/restaurants" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80">
// // // //             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Restaurants
// // // //           </Link>
          
// // // //           <div className="flex justify-between items-end">
// // // //             <div>
// // // //               <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
// // // //               <div className="flex items-center gap-4 text-sm md:text-base">
// // // //                 <span className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
// // // //                   {restaurant.rating || "New"} <Star className="w-3 h-3 fill-white" />
// // // //                 </span>
// // // //                 <span>{restaurant.cuisine?.join(', ')}</span>
// // // //                 <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address?.city}</span>
// // // //               </div>
// // // //             </div>
            
// // // //             <Button 
// // // //               size="icon" 
// // // //               variant="secondary" 
// // // //               className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/40 border-0 backdrop-blur-sm transition-all"
// // // //               onClick={handleToggleFavorite}
// // // //               disabled={favLoading}
// // // //             >
// // // //               <Heart className={`w-6 h-6 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
// // // //             </Button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
// // // //         {/* Menu List */}
// // // //         <div className="md:col-span-2 space-y-6">
// // // //           <h2 className="text-2xl font-bold">Menu</h2>
// // // //           {dishes.length === 0 ? (
// // // //             <div className="p-8 border-2 border-dashed rounded-lg text-center text-gray-500">
// // // //               No dishes available at the moment.
// // // //             </div>
// // // //           ) : (
// // // //             dishes.map((dish) => (
// // // //               // 👇 FIXED: Removed the <Link> wrapper here. The key is now on Card.
// // // //               <Card key={dish._id} className="p-4 flex gap-4 hover:shadow-md transition-shadow">
// // // //                 <div className="h-32 w-32 shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
// // // //                   {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
// // // //                   {!dish.isAvailable && (
// // // //                     <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-bold text-red-500">
// // // //                       Sold Out
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
                
// // // //                 <div className="flex-1 flex flex-col justify-between">
// // // //                   <div>
// // // //                     <div className="flex justify-between items-start">
// // // //                       <h3 className="font-bold text-lg">{dish.name}</h3>
// // // //                       {/* Veg/Non-Veg Dot */}
// // // //                       <div className={`border px-1.5 py-0.5 text-[10px] rounded ${dish.dietary?.[0]?.includes('non') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
// // // //                         ●
// // // //                       </div>
// // // //                     </div>
// // // //                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
// // // //                     <div className="font-bold mt-2">₹{dish.price}</div>
// // // //                   </div>
                  
// // // //                   <Button 
// // // //                     className="self-end bg-white text-green-600 border border-green-600 hover:bg-green-50 w-24 shadow-none"
// // // //                     disabled={!dish.isAvailable}
// // // //                     onClick={() => handleAddToCart(dish)}
// // // //                   >
// // // //                     ADD <Plus className="w-4 h-4 ml-1" />
// // // //                   </Button>
// // // //                 </div>
// // // //               </Card>
// // // //             ))
// // // //           )}
// // // //         </div>

// // // //         {/* Sidebar Info */}
// // // //         <div className="space-y-6">
// // // //           <Card className="p-6">
// // // //             <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
// // // //             <div className="space-y-3 text-sm text-gray-600">
// // // //               <div className="flex items-center gap-3">
// // // //                 <Clock className="w-5 h-5 text-gray-400" />
// // // //                 <span>{restaurant.deliveryTime} mins</span>
// // // //               </div>
// // // //               <div className="flex items-center gap-3">
// // // //                 <ShoppingBag className="w-5 h-5 text-gray-400" />
// // // //                 <span>Min Order: ₹{restaurant.minOrder}</span>
// // // //               </div>
// // // //             </div>
// // // //           </Card>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useParams } from 'next/navigation';
// // // import { useSession } from 'next-auth/react';
// // // import { Star, Clock, MapPin, Plus, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Badge } from '@/components/ui/badge';
// // // import { Skeleton } from '@/components/ui/skeleton';
// // // import { Card } from '@/components/ui/card';
// // // import { useCartStore } from '@/stores/cartStore';
// // // import { useToast } from '@/hooks/use-toast';
// // // import Link from 'next/link';

// // // export default function RestaurantPage() {
// // //   const params = useParams();
// // //   const { data: session } = useSession();
// // //   const slug = params?.slug;
  
// // //   const [restaurant, setRestaurant] = useState(null);
// // //   const [dishes, setDishes] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isFavorite, setIsFavorite] = useState(false);
// // //   const [favLoading, setFavLoading] = useState(false);
  
// // //   const addToCart = useCartStore((state) => state.addToCart);
// // //   const { toast } = useToast();

// // //   useEffect(() => {
// // //     if (slug) {
// // //       fetchRestaurantData();
// // //     }
// // //   }, [slug]);

// // //   useEffect(() => {
// // //     if (session && restaurant) {
// // //       checkFavoriteStatus();
// // //     }
// // //   }, [session, restaurant]);

// // //   const fetchRestaurantData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await fetch(`/api/restaurant/${slug}`);
// // //       const data = await res.json();
      
// // //       if (data.success) {
// // //         setRestaurant(data.data);
// // //         setDishes(data.data.dishes || []);
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to load", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const checkFavoriteStatus = async () => {
// // //     try {
// // //       const res = await fetch('/api/favorites');
// // //       const data = await res.json();
// // //       if(data.success && restaurant) {
// // //         // Check if ID exists in the returned array
// // //         const found = data.data.some(fav => fav._id === restaurant._id);
// // //         setIsFavorite(found);
// // //       }
// // //     } catch (e) { console.error(e); }
// // //   };

// // //   const handleToggleFavorite = async () => {
// // //     if(!session) {
// // //       toast({ title: "Login Required", description: "Please login to save favorites." });
// // //       return;
// // //     }
// // //     setFavLoading(true);
// // //     try {
// // //       const res = await fetch('/api/favorites', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ restaurantId: restaurant._id })
// // //       });
      
// // //       const data = await res.json();
      
// // //       if(data.success) {
// // //         setIsFavorite(data.isFavorite);
// // //         toast({ 
// // //           title: data.isFavorite ? "Added to Favorites" : "Removed from Favorites",
// // //           className: "bg-green-50 border-green-200"
// // //         });
// // //       } else {
// // //         throw new Error(data.error);
// // //       }
// // //     } catch(e) {
// // //       console.error(e);
// // //       toast({ title: "Error", description: "Failed to update favorites", variant: "destructive" });
// // //     } finally {
// // //       setFavLoading(false);
// // //     }
// // //   };

// // //   const handleAddToCart = (dish) => {
// // //     if (!restaurant) return;
    
// // //     // Debug Log (Optional)
// // //     console.log("Adding to cart for Restaurant ID:", restaurant._id); 

// // //     addToCart({
// // //       id: dish._id,
// // //       name: dish.name,
// // //       price: dish.price,
// // //       image: dish.image,
// // //       restaurantId: restaurant._id,
// // //       restaurantName: restaurant.name,
// // //       restaurantSlug: restaurant.slug,
// // //       quantity: 1
// // //     });
    
// // //     toast({
// // //       title: "Added to Cart",
// // //       description: `${dish.name}`,
// // //       action: <Link href="/cartU" className="bg-orange-600 text-white px-3 py-1 rounded text-xs">View Cart</Link>
// // //     });
// // //   };

// // //   if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;

// // //   if (!restaurant) {
// // //     return (
// // //       <div className="p-10 text-center">
// // //         <h2 className="text-xl font-bold">Restaurant not found</h2>
// // //         <Button asChild className="mt-4"><Link href="/">Back Home</Link></Button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 pb-20">
// // //       {/* Header Image */}
// // //       <div className="relative h-72 md:h-96 w-full">
// // //         <img 
// // //           src={restaurant.coverImage || "/placeholder.jpg"} 
// // //           alt={restaurant.name} 
// // //           className="w-full h-full object-cover"
// // //         />
// // //         <div className="absolute inset-0 bg-black/50" />
        
// // //         <div className="absolute bottom-0 left-0 w-full p-6 text-white container mx-auto">
// // //           <Link href="/restaurants" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80">
// // //             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Restaurants
// // //           </Link>
          
// // //           <div className="flex justify-between items-end">
// // //             <div>
// // //               <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
// // //               <div className="flex items-center gap-4 text-sm md:text-base">
// // //                 <span className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
// // //                   {restaurant.rating || "New"} <Star className="w-3 h-3 fill-white" />
// // //                 </span>
// // //                 <span>{restaurant.cuisine?.join(', ')}</span>
// // //                 <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address?.city}</span>
// // //               </div>
// // //             </div>
            
// // //             <Button 
// // //               size="icon" 
// // //               variant="secondary" 
// // //               className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/40 border-0 backdrop-blur-sm transition-all"
// // //               onClick={handleToggleFavorite}
// // //               disabled={favLoading}
// // //             >
// // //               <Heart className={`w-6 h-6 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
// // //         {/* Menu List */}
// // //         <div className="md:col-span-2 space-y-6">
// // //           <h2 className="text-2xl font-bold">Menu</h2>
// // //           {dishes.length === 0 ? (
// // //             <div className="p-8 border-2 border-dashed rounded-lg text-center text-gray-500">
// // //               No dishes available at the moment.
// // //             </div>
// // //           ) : (
// // //             dishes.map((dish) => (
// // //               // 👇 FIXED: Removed <Link> wrapper. 'key' is directly on Card.
// // //               <Card key={dish._id} className="p-4 flex gap-4 hover:shadow-md transition-shadow">
// // //                 <div className="h-32 w-32 shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
// // //                   {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
// // //                   {!dish.isAvailable && (
// // //                     <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-bold text-red-500">
// // //                       Sold Out
// // //                     </div>
// // //                   )}
// // //                 </div>
                
// // //                 <div className="flex-1 flex flex-col justify-between">
// // //                   <div>
// // //                     <div className="flex justify-between items-start">
// // //                       <h3 className="font-bold text-lg">{dish.name}</h3>
// // //                       <div className={`border px-1.5 py-0.5 text-[10px] rounded ${dish.dietary?.[0]?.includes('non') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
// // //                         ●
// // //                       </div>
// // //                     </div>
// // //                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
// // //                     <div className="font-bold mt-2">₹{dish.price}</div>
// // //                   </div>
                  
// // //                   <Button 
// // //                     className="self-end bg-white text-green-600 border border-green-600 hover:bg-green-50 w-24 shadow-none"
// // //                     disabled={!dish.isAvailable}
// // //                     onClick={() => handleAddToCart(dish)}
// // //                   >
// // //                     ADD <Plus className="w-4 h-4 ml-1" />
// // //                   </Button>
// // //                 </div>
// // //               </Card>
// // //             ))
// // //           )}
// // //         </div>

// // //         {/* Sidebar Info */}
// // //         <div className="space-y-6">
// // //           <Card className="p-6">
// // //             <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
// // //             <div className="space-y-3 text-sm text-gray-600">
// // //               <div className="flex items-center gap-3">
// // //                 <Clock className="w-5 h-5 text-gray-400" />
// // //                 <span>{restaurant.deliveryTime} mins</span>
// // //               </div>
// // //               <div className="flex items-center gap-3">
// // //                 <ShoppingBag className="w-5 h-5 text-gray-400" />
// // //                 <span>Min Order: ₹{restaurant.minOrder}</span>
// // //               </div>
// // //             </div>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useParams, useRouter } from 'next/navigation'; // Added useRouter
// // import { useSession } from 'next-auth/react';
// // import { Star, Clock, MapPin, Plus, Heart, ShoppingBag, ArrowLeft, Zap } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Badge } from '@/components/ui/badge';
// // import { Skeleton } from '@/components/ui/skeleton';
// // import { Card } from '@/components/ui/card';
// // import { useCartStore } from '@/stores/cartStore';
// // import { useToast } from '@/hooks/use-toast';
// // import Link from 'next/link';

// // export default function RestaurantPage() {
// //   const params = useParams();
// //   const router = useRouter(); // Hook for redirection
// //   const { data: session } = useSession();
// //   const slug = params?.slug;
  
// //   const [restaurant, setRestaurant] = useState(null);
// //   const [dishes, setDishes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [favLoading, setFavLoading] = useState(false);
  
// //   // Zustand Store
// //   const addToCart = useCartStore((state) => state.addToCart);
// //   const clearCart = useCartStore((state) => state.clearCart); // Needed for Buy Now
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     if (slug) fetchRestaurantData();
// //   }, [slug]);

// //   useEffect(() => {
// //     if (session && restaurant) checkFavoriteStatus();
// //   }, [session, restaurant]);

// //   const fetchRestaurantData = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch(`/api/restaurant/${slug}`);
// //       const data = await res.json();
// //       if (data.success) {
// //         setRestaurant(data.data);
// //         setDishes(data.data.dishes || []);
// //       }
// //     } catch (error) {
// //       console.error("Failed to load", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const checkFavoriteStatus = async () => {
// //     try {
// //       const res = await fetch('/api/favorites');
// //       const data = await res.json();
// //       if(data.success && restaurant) {
// //         const found = data.data.some(fav => fav._id === restaurant._id);
// //         setIsFavorite(found);
// //       }
// //     } catch (e) { console.error(e); }
// //   };

// //   const handleToggleFavorite = async () => {
// //     if(!session) {
// //       toast({ title: "Login Required", description: "Please login to save favorites." });
// //       return;
// //     }
// //     setFavLoading(true);
// //     try {
// //       const res = await fetch('/api/favorites', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ restaurantId: restaurant._id })
// //       });
// //       const data = await res.json();
// //       if(data.success) {
// //         setIsFavorite(data.isFavorite);
// //         toast({ title: data.isFavorite ? "Added to Favorites" : "Removed from Favorites" });
// //       }
// //     } catch(e) {
// //       toast({ title: "Error", variant: "destructive" });
// //     } finally {
// //       setFavLoading(false);
// //     }
// //   };

// //   // --- 1. Standard Add to Cart (Keeps user on page) ---
// //   const handleAddToCart = (dish) => {
// //     if (!restaurant) return;
// //     addToCart({
// //       id: dish._id,
// //       name: dish.name,
// //       price: dish.price,
// //       image: dish.image,
// //       restaurantId: restaurant._id,
// //       restaurantName: restaurant.name,
// //       restaurantSlug: restaurant.slug,
// //       quantity: 1
// //     });
// //     toast({
// //       title: "Added to Cart",
// //       description: `${dish.name}`,
// //       action: <Link href="/cartU" className="bg-orange-600 text-white px-3 py-1 rounded text-xs">View Cart</Link>
// //     });
// //   };

// //   // --- 2. NEW: Buy Now Logic (Direct to Checkout) ---
// //   const handleBuyNow = (dish) => {
// //     if (!restaurant) return;

// //     if (!session) {
// //       toast({ title: "Login Required", description: "Please login to purchase.", variant: "destructive" });
// //       router.push('/auth/signin');
// //       return;
// //     }

// //     // 1. Clear existing items to isolate this purchase
// //     clearCart();

// //     // 2. Add this specific item
// //     addToCart({
// //       id: dish._id,
// //       name: dish.name,
// //       price: dish.price,
// //       image: dish.image,
// //       restaurantId: restaurant._id,
// //       restaurantName: restaurant.name,
// //       restaurantSlug: restaurant.slug,
// //       quantity: 1
// //     });

// //     // 3. Redirect immediately
// //     router.push('/checkout');
// //   };

// //   if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;

// //   if (!restaurant) {
// //     return (
// //       <div className="p-10 text-center">
// //         <h2 className="text-xl font-bold">Restaurant not found</h2>
// //         <Button asChild className="mt-4"><Link href="/">Back Home</Link></Button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 pb-20">
// //       {/* Header */}
// //       <div className="relative h-72 md:h-96 w-full">
// //         <img 
// //           src={restaurant.coverImage || "/placeholder.jpg"} 
// //           alt={restaurant.name} 
// //           className="w-full h-full object-cover"
// //         />
// //         <div className="absolute inset-0 bg-black/50" />
// //         <div className="absolute bottom-0 left-0 w-full p-6 text-white container mx-auto">
// //           <Link href="/restaurants" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80">
// //             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Restaurants
// //           </Link>
// //           <div className="flex justify-between items-end">
// //             <div>
// //               <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
// //               <div className="flex items-center gap-4 text-sm md:text-base">
// //                 <span className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
// //                   {restaurant.rating || "New"} <Star className="w-3 h-3 fill-white" />
// //                 </span>
// //                 <span>{restaurant.cuisine?.join(', ')}</span>
// //                 <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address?.city}</span>
// //               </div>
// //             </div>
// //             <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/40 border-0 backdrop-blur-sm" onClick={handleToggleFavorite}>
// //               <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
// //         <div className="md:col-span-2 space-y-6">
// //           <h2 className="text-2xl font-bold">Menu</h2>
// //           {dishes.length === 0 ? (
// //             <div className="p-8 border-2 border-dashed rounded-lg text-center text-gray-500">No dishes available.</div>
// //           ) : (
// //             dishes.map((dish) => (
// //               <Card key={dish._id} className="p-4 flex gap-4 hover:shadow-md transition-shadow">
// //                 <div className="h-32 w-32 shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
// //                   {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
// //                   {!dish.isAvailable && (
// //                     <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-bold text-red-500">Sold Out</div>
// //                   )}
// //                 </div>
                
// //                 <div className="flex-1 flex flex-col justify-between">
// //                   <div>
// //                     <div className="flex justify-between items-start">
// //                       <h3 className="font-bold text-lg">{dish.name}</h3>
// //                       <div className={`border px-1.5 py-0.5 text-[10px] rounded ${dish.dietary?.[0]?.includes('non') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>●</div>
// //                     </div>
// //                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
// //                     <div className="font-bold mt-2">₹{dish.price}</div>
// //                   </div>
                  
// //                   {/* Action Buttons */}
// //                   <div className="flex justify-end gap-2 mt-2">
// //                     {/* Add to Cart Button */}
// //                     <Button 
// //                       variant="outline"
// //                       className="border-green-600 text-green-600 hover:bg-green-50 h-9"
// //                       disabled={!dish.isAvailable}
// //                       onClick={() => handleAddToCart(dish)}
// //                     >
// //                       ADD <Plus className="w-4 h-4 ml-1" />
// //                     </Button>

// //                     {/* Buy Now Button */}
// //                     <Button 
// //                       className="bg-orange-600 hover:bg-orange-700 h-9"
// //                       disabled={!dish.isAvailable}
// //                       onClick={() => handleBuyNow(dish)}
// //                     >
// //                       Buy Now <Zap className="w-4 h-4 ml-1 fill-current" />
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </Card>
// //             ))
// //           )}
// //         </div>

// //         <div className="space-y-6">
// //           <Card className="p-6">
// //             <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
// //             <div className="space-y-3 text-sm text-gray-600">
// //               <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-gray-400" /><span>{restaurant.deliveryTime} mins</span></div>
// //               <div className="flex items-center gap-3"><ShoppingBag className="w-5 h-5 text-gray-400" /><span>Min Order: ₹{restaurant.minOrder}</span></div>
// //             </div>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { Star, Clock, MapPin, Plus, Heart, ShoppingBag, ArrowLeft, Zap, Edit, PlusCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Card } from '@/components/ui/card';
// import { Switch } from '@/components/ui/switch'; // Import Switch
// import { Label } from '@/components/ui/label';
// import { useCartStore } from '@/stores/cartStore';
// import { useToast } from '@/hooks/use-toast';
// import Link from 'next/link';

// export default function RestaurantPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const slug = params?.slug;
  
//   const [restaurant, setRestaurant] = useState(null);
//   const [dishes, setDishes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [favLoading, setFavLoading] = useState(false);
  
//   const addToCart = useCartStore((state) => state.addToCart);
//   const clearCart = useCartStore((state) => state.clearCart);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (slug) fetchRestaurantData();
//   }, [slug]);

//   useEffect(() => {
//     if (session && restaurant) checkFavoriteStatus();
//   }, [session, restaurant]);

//   const fetchRestaurantData = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/restaurant/${slug}`);
//       const data = await res.json();
      
//       if (data.success) {
//         setRestaurant(data.data);
//         setDishes(data.data.dishes || []);
//       }
//     } catch (error) {
//       console.error("Failed to load", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkFavoriteStatus = async () => {
//     try {
//       const res = await fetch('/api/favorites');
//       const data = await res.json();
//       if(data.success && restaurant) {
//         const found = data.data.some(fav => fav._id === restaurant._id);
//         setIsFavorite(found);
//       }
//     } catch (e) { console.error(e); }
//   };

//   const handleToggleFavorite = async () => {
//     if(!session) {
//       toast({ title: "Login Required", description: "Please login to save favorites." });
//       return;
//     }
//     setFavLoading(true);
//     try {
//       const res = await fetch('/api/favorites', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ restaurantId: restaurant._id })
//       });
//       const data = await res.json();
//       if(data.success) {
//         setIsFavorite(data.isFavorite);
//         toast({ title: data.isFavorite ? "Added to Favorites" : "Removed from Favorites" });
//       }
//     } catch(e) {
//       toast({ title: "Error", variant: "destructive" });
//     } finally {
//       setFavLoading(false);
//     }
//   };

//   // --- ADMIN FUNCTION: Toggle Availability ---
//   const handleAvailabilityToggle = async (dishId, currentStatus) => {
//     // 1. Optimistic Update (Update UI immediately)
//     setDishes(prev => prev.map(d => d._id === dishId ? { ...d, isAvailable: !currentStatus } : d));

//     try {
//       // 2. Call API to save change
//       const res = await fetch(`/api/admin/menu/${dishId}`, { // Ensure you have a PUT route for dishes
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isAvailable: !currentStatus })
//       });
      
//       const data = await res.json();
//       if (!data.success) throw new Error(data.error);
      
//       toast({ title: "Updated", description: `Dish is now ${!currentStatus ? 'Available' : 'Unavailable'}` });
//     } catch (error) {
//       // Revert if failed
//       setDishes(prev => prev.map(d => d._id === dishId ? { ...d, isAvailable: currentStatus } : d));
//       toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
//     }
//   };

//   const handleAddToCart = (dish) => {
//     if (!restaurant) return;
//     addToCart({
//       id: dish._id,
//       name: dish.name,
//       price: dish.price,
//       image: dish.image,
//       restaurantId: restaurant._id,
//       restaurantName: restaurant.name,
//       restaurantSlug: restaurant.slug,
//       quantity: 1
//     });
//     toast({
//       title: "Added to Cart",
//       description: `${dish.name}`,
//       action: <Link href="/cartU" className="bg-orange-600 text-white px-3 py-1 rounded text-xs">View Cart</Link>
//     });
//   };

//   const handleBuyNow = (dish) => {
//     if (!restaurant) return;
//     if (!session) {
//       router.push('/auth/signin');
//       return;
//     }
//     clearCart();
//     addToCart({
//       id: dish._id,
//       name: dish.name,
//       price: dish.price,
//       image: dish.image,
//       restaurantId: restaurant._id,
//       restaurantName: restaurant.name,
//       restaurantSlug: restaurant.slug,
//       quantity: 1
//     });
//     router.push('/checkout');
//   };

//   const isOwner = session?.user && (
//     session.user.role === 'admin' || 
//     (restaurant?.owner && session.user.id === restaurant.owner.toString())
//   );

//   if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;

//   if (!restaurant) {
//     return (
//       <div className="p-10 text-center">
//         <h2 className="text-xl font-bold">Restaurant not found</h2>
//         <Button asChild className="mt-4"><Link href="/">Back Home</Link></Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       {/* Header */}
//       <div className="relative h-72 md:h-96 w-full">
//         <img 
//           src={restaurant.coverImage || "/placeholder.jpg"} 
//           alt={restaurant.name} 
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/50" />
        
//         <div className="absolute bottom-0 left-0 w-full p-6 text-white container mx-auto">
//           <Link href="/restaurants" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80">
//             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Restaurants
//           </Link>
          
//           <div className="flex justify-between items-end">
//             <div>
//               <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
//               <div className="flex items-center gap-4 text-sm md:text-base">
//                 <span className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
//                   {restaurant.rating || "New"} <Star className="w-3 h-3 fill-white" />
//                 </span>
//                 <span>{restaurant.cuisine?.join(', ')}</span>
//                 <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address?.city}</span>
//               </div>
//             </div>
            
//             {isOwner ? (
//               <div className="flex gap-2">
//                 <Button asChild className="bg-white text-black hover:bg-gray-200">
//                   <Link href="/admin/menu"><PlusCircle className="w-4 h-4 mr-2" /> Add Dish</Link>
//                 </Button>
//                 <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
//                   <Link href="/admin/restaurant"><Edit className="w-4 h-4 mr-2" /> Dashboard</Link>
//                 </Button>
//               </div>
//             ) : (
//               <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/40 border-0 backdrop-blur-sm" onClick={handleToggleFavorite}>
//                 <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
//         <div className="md:col-span-2 space-y-6">
//           <h2 className="text-2xl font-bold flex items-center justify-between">
//             Menu
//             {isOwner && <Badge variant="outline" className="text-xs font-normal border-orange-500 text-orange-600 bg-orange-50">Admin View</Badge>}
//           </h2>

//           {dishes.length === 0 ? (
//             <div className="p-8 border-2 border-dashed rounded-lg text-center text-gray-500">No dishes available.</div>
//           ) : (
//             dishes.map((dish) => (
//               <Card key={dish._id} className={`p-4 flex gap-4 hover:shadow-md transition-shadow ${!dish.isAvailable && !isOwner ? 'opacity-60' : ''}`}>
//                 <div className="h-32 w-32 shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
//                   {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
//                   {!dish.isAvailable && !isOwner && (
//                     <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-bold text-red-500">Sold Out</div>
//                   )}
//                 </div>
                
//                 <div className="flex-1 flex flex-col justify-between">
//                   <div>
//                     <div className="flex justify-between items-start">
//                       <h3 className="font-bold text-lg">{dish.name}</h3>
//                       <div className={`border px-1.5 py-0.5 text-[10px] rounded ${dish.dietary?.[0]?.includes('non') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>●</div>
//                     </div>
//                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
//                     <div className="font-bold mt-2">₹{dish.price}</div>
//                   </div>
                  
//                   <div className="flex justify-end gap-2 mt-2 items-center">
//                     {isOwner ? (
//                       // --- ADMIN CONTROLS ---
//                       <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2">
//                           <Label htmlFor={`avail-${dish._id}`} className="text-xs text-gray-500">Available</Label>
//                           <Switch 
//                             id={`avail-${dish._id}`}
//                             checked={dish.isAvailable} 
//                             onCheckedChange={() => handleAvailabilityToggle(dish._id, dish.isAvailable)} 
//                           />
//                         </div>
//                         <Button variant="outline" size="sm" asChild>
//                           <Link href="/admin/menu">Edit</Link>
//                         </Button>
//                       </div>
//                     ) : (
//                       // --- USER CONTROLS ---
//                       <>
//                         <Button 
//                           variant="outline"
//                           className="border-green-600 text-green-600 hover:bg-green-50 h-9"
//                           disabled={!dish.isAvailable}
//                           onClick={() => handleAddToCart(dish)}
//                         >
//                           ADD <Plus className="w-4 h-4 ml-1" />
//                         </Button>
//                         <Button 
//                           className="bg-orange-600 hover:bg-orange-700 h-9"
//                           disabled={!dish.isAvailable}
//                           onClick={() => handleBuyNow(dish)}
//                         >
//                           Buy Now <Zap className="w-4 h-4 ml-1 fill-current" />
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             ))
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card className="p-6">
//             <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
//             <div className="space-y-3 text-sm text-gray-600">
//               <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-gray-400" /><span>{restaurant.deliveryTime} mins</span></div>
//               <div className="flex items-center gap-3"><ShoppingBag className="w-5 h-5 text-gray-400" /><span>Min Order: ₹{restaurant.minOrder}</span></div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Star, Clock, MapPin, Plus, Heart, ShoppingBag, ArrowLeft, Zap, Edit, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch'; // Import Switch
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const slug = params?.slug;
  
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { toast } = useToast();
const handleBuyNow = (dish) => {
    if (!restaurant) return;
    
    // 👇 CHECK THIS LOG IN YOUR BROWSER CONSOLE
    console.log("Buying from Restaurant ID:", restaurant._id); 

    if (!session) {
      router.push('/auth/signin');
      return;
    }
    clearCart();
    addToCart({
      id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      restaurantId: restaurant._id, // This MUST match the admin's restaurant
      restaurantName: restaurant.name,
      restaurantSlug: restaurant.slug,
      quantity: 1
    });
    router.push('/checkout');
  };
  useEffect(() => {
    if (slug) fetchRestaurantData();
  }, [slug]);

  useEffect(() => {
    if (session && restaurant) checkFavoriteStatus();
  }, [session, restaurant]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/restaurant/${slug}`);
      const data = await res.json();
      
      if (data.success) {
        setRestaurant(data.data);
        setDishes(data.data.dishes || []);
      }
    } catch (error) {
      console.error("Failed to load", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      if(data.success && restaurant) {
        const found = data.data.some(fav => fav._id === restaurant._id);
        setIsFavorite(found);
      }
    } catch (e) { console.error(e); }
  };

  const handleToggleFavorite = async () => {
    if(!session) {
      toast({ title: "Login Required", description: "Please login to save favorites." });
      return;
    }
    setFavLoading(true);
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId: restaurant._id })
      });
      const data = await res.json();
      if(data.success) {
        setIsFavorite(data.isFavorite);
        toast({ title: data.isFavorite ? "Added to Favorites" : "Removed from Favorites" });
      }
    } catch(e) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setFavLoading(false);
    }
  };

  // --- ADMIN FUNCTION: Toggle Availability ---
  const handleAvailabilityToggle = async (dishId, currentStatus) => {
    // 1. Optimistic Update (Update UI immediately)
    setDishes(prev => prev.map(d => d._id === dishId ? { ...d, isAvailable: !currentStatus } : d));

    try {
      // 2. Call API to save change
      const res = await fetch(`/api/admin/menu/${dishId}`, { // Ensure you have a PUT route for dishes
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      
      toast({ title: "Updated", description: `Dish is now ${!currentStatus ? 'Available' : 'Unavailable'}` });
    } catch (error) {
      // Revert if failed
      setDishes(prev => prev.map(d => d._id === dishId ? { ...d, isAvailable: currentStatus } : d));
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleAddToCart = (dish) => {
    if (!restaurant) return;
    addToCart({
      id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
      restaurantSlug: restaurant.slug,
      quantity: 1
    });
    toast({
      title: "Added to Cart",
      description: `${dish.name}`,
      action: <Link href="/cartU" className="bg-orange-600 text-white px-3 py-1 rounded text-xs">View Cart</Link>
    });
  };

  // const handleBuyNow = (dish) => {
  //   if (!restaurant) return;
  //   if (!session) {
  //     router.push('/auth/signin');
  //     return;
  //   }
  //   clearCart();
  //   addToCart({
  //     id: dish._id,
  //     name: dish.name,
  //     price: dish.price,
  //     image: dish.image,
  //     restaurantId: restaurant._id,
  //     restaurantName: restaurant.name,
  //     restaurantSlug: restaurant.slug,
  //     quantity: 1
  //   });
  //   router.push('/checkout');
  // };

  const isOwner = session?.user && (
    session.user.role === 'admin' || 
    (restaurant?.owner && session.user.id === restaurant.owner.toString())
  );

  if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;

  if (!restaurant) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Restaurant not found</h2>
        <Button asChild className="mt-4"><Link href="/">Back Home</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="relative h-72 md:h-96 w-full">
        <img 
          src={restaurant.coverImage || "/placeholder.jpg"} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 text-white container mx-auto">
          <Link href="/restaurants" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Restaurants
          </Link>
          
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <span className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
                  {restaurant.rating || "New"} <Star className="w-3 h-3 fill-white" />
                </span>
                <span>{restaurant.cuisine?.join(', ')}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address?.city}</span>
              </div>
            </div>
            
            {isOwner ? (
              <div className="flex gap-2">
                <Button asChild className="bg-white text-black hover:bg-gray-200">
                  <Link href="/admin/menu"><PlusCircle className="w-4 h-4 mr-2" /> Add Dish</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link href="/admin/restaurant"><Edit className="w-4 h-4 mr-2" /> Dashboard</Link>
                </Button>
              </div>
            ) : (
              <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/40 border-0 backdrop-blur-sm" onClick={handleToggleFavorite}>
                <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center justify-between">
            Menu
            {isOwner && <Badge variant="outline" className="text-xs font-normal border-orange-500 text-orange-600 bg-orange-50">Admin View</Badge>}
          </h2>

          {dishes.length === 0 ? (
            <div className="p-8 border-2 border-dashed rounded-lg text-center text-gray-500">No dishes available.</div>
          ) : (
            dishes.map((dish) => (
              <Card key={dish._id} className={`p-4 flex gap-4 hover:shadow-md transition-shadow ${!dish.isAvailable && !isOwner ? 'opacity-60' : ''}`}>
                <div className="h-32 w-32 shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
                  {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
                  {!dish.isAvailable && !isOwner && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-bold text-red-500">Sold Out</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{dish.name}</h3>
                      <div className={`border px-1.5 py-0.5 text-[10px] rounded ${dish.dietary?.[0]?.includes('non') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>●</div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
                    <div className="font-bold mt-2">₹{dish.price}</div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-2 items-center">
                    {isOwner ? (
                      // --- ADMIN CONTROLS ---
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`avail-${dish._id}`} className="text-xs text-gray-500">Available</Label>
                          <Switch 
                            id={`avail-${dish._id}`}
                            checked={dish.isAvailable} 
                            onCheckedChange={() => handleAvailabilityToggle(dish._id, dish.isAvailable)} 
                          />
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/admin/menu">Edit</Link>
                        </Button>
                      </div>
                    ) : (
                      // --- USER CONTROLS ---
                      <>
                        <Button 
                          variant="outline"
                          className="border-green-600 text-green-600 hover:bg-green-50 h-9"
                          disabled={!dish.isAvailable}
                          onClick={() => handleAddToCart(dish)}
                        >
                          ADD <Plus className="w-4 h-4 ml-1" />
                        </Button>
                        <Button 
                          className="bg-orange-600 hover:bg-orange-700 h-9"
                          disabled={!dish.isAvailable}
                          onClick={() => handleBuyNow(dish)}
                        >
                          Buy Now <Zap className="w-4 h-4 ml-1 fill-current" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-gray-400" /><span>{restaurant.deliveryTime} mins</span></div>
              <div className="flex items-center gap-3"><ShoppingBag className="w-5 h-5 text-gray-400" /><span>Min Order: ₹{restaurant.minOrder}</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}