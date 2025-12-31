// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { useSession } from 'next-auth/react'; 
// // // import { Search, Star, Clock, MapPin, Filter, Utensils, X } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Card, CardContent } from '@/components/ui/card';
// // // import { Badge } from '@/components/ui/badge';
// // // import { Skeleton } from '@/components/ui/skeleton';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// // // export default function HomePageClient() { // Component renamed to Client
// // //   const router = useRouter();
// // //   const { data: session, status } = useSession(); 
  
// // //   const [restaurants, setRestaurants] = useState([]);
// // //   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [selectedCuisine, setSelectedCuisine] = useState('all');
// // //   const [selectedSort, setSelectedSort] = useState('rating');
// // //   const [showFilters, setShowFilters] = useState(false);

// // //   // --- CRITICAL: REDIRECTION HOOK REMOVED ---
// // //   // The server component (src/app/page.jsx) handles all redirects now. 
// // //   // This client component only loads if the role is 'user'.

// // //   // --- EXISTING FETCH LOGIC ---
// // //   const cuisines = [
// // //     { value: 'all', label: 'All Cuisines' },
// // //     { value: 'indian', label: 'Indian' },
// // //     { value: 'chinese', label: 'Chinese' },
// // //     { value: 'italian', label: 'Italian' },
// // //     { value: 'japanese', label: 'Japanese' },
// // //     { value: 'american', label: 'American' },
// // //     { value: 'mexican', label: 'Mexican' },
// // //     { value: 'thai', label: 'Thai' }
// // //   ];

// // //   const sortOptions = [
// // //     { value: 'rating', label: 'Top Rated' },
// // //     { value: 'delivery', label: 'Fastest Delivery' },
// // //     { value: 'price-low', label: 'Price: Low to High' },
// // //     { value: 'price-high', label: 'Price: High to Low' }
// // //   ];

// // //   useEffect(() => {
// // //     fetchRestaurants();
// // //   }, []);

// // //   useEffect(() => {
// // //     filterAndSortRestaurants();
// // //   }, [restaurants, searchTerm, selectedCuisine, selectedSort]);

// // //   const fetchRestaurants = async () => {
// // //     try {
// // //       setLoading(true);
// // //       // NOTE: Only fetch data if the user is a standard user (the server ensured this)
// // //       if (session?.user?.role !== 'user' && status === 'authenticated') {
// // //           // Skip fetch if role is somehow loaded incorrectly, though server should prevent this.
// // //           setLoading(false);
// // //           return;
// // //       }
      
// // //       const response = await fetch('/api/restaurants');
// // //       const data = await response.json();
// // //       setRestaurants(data.success && Array.isArray(data.data) ? data.data : []);
// // //     } catch (error) {
// // //       console.error('Error fetching restaurants:', error);
// // //       setRestaurants([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const filterAndSortRestaurants = () => {
// // //     if (!restaurants) return;
// // //     let filtered = [...restaurants];

// // //     if (searchTerm) {
// // //       const lowerTerm = searchTerm.toLowerCase();
// // //       filtered = filtered.filter(restaurant =>
// // //         (restaurant.name?.toLowerCase() || '').includes(lowerTerm) ||
// // //         (restaurant.cuisine || []).some(c => c.toLowerCase().includes(lowerTerm)) ||
// // //         (restaurant.description?.toLowerCase() || '').includes(lowerTerm)
// // //       );
// // //     }

// // //     if (selectedCuisine !== 'all') {
// // //       filtered = filtered.filter(restaurant =>
// // //         (restaurant.cuisine || []).map(c => c.toLowerCase()).includes(selectedCuisine.toLowerCase())
// // //       );
// // //     }

// // //     switch (selectedSort) {
// // //       case 'rating': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
// // //       case 'delivery': filtered.sort((a, b) => (parseInt(a.deliveryTime) || 0) - (parseInt(b.deliveryTime) || 0)); break;
// // //       case 'price-low': filtered.sort((a, b) => (a.minOrder || 0) - (b.minOrder || 0)); break;
// // //       case 'price-high': filtered.sort((a, b) => (b.minOrder || 0) - (a.minOrder || 0)); break;
// // //     }

// // //     setFilteredRestaurants(filtered);
// // //   };

// // //   const handleRestaurantClick = (slug) => {
// // //     router.push(`/restaurants/${slug}`); 
// // //   };

// // //   // --- LOADING BLOCKER ---
// // //   if (loading) {
// // //     return (
// // //         <div className="container mx-auto px-4 py-8">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                 {[...Array(6)].map((_, index) => (
// // //                     <Card key={index} className="overflow-hidden"><Skeleton className="h-48 w-full" /><CardContent className="p-4"><Skeleton className="h-6 w-3/4 mb-2" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-2/3 mb-4" /></CardContent></Card>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 relative">
// // //       {/* Mobile Filter Sidebar */}
// // //       {showFilters && (
// // //         <div className="fixed inset-0 z-50 flex">
// // //           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)}></div>
// // //           <div className="relative w-3/4 max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h2 className="text-xl font-bold text-black">Filters</h2>
// // //               <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-black" /></button>
// // //             </div>
// // //             <div className="space-y-6">
// // //               <div>
// // //                 <label className="text-sm font-medium mb-2 block text-black">Cuisine</label>
// // //                 <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
// // //                   <SelectTrigger className="w-full"><SelectValue placeholder="Select Cuisine" /></SelectTrigger>
// // //                   <SelectContent>{cuisines.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
// // //                 </Select>
// // //               </div>
// // //               <div>
// // //                 <label className="text-sm font-medium mb-2 block text-black">Sort By</label>
// // //                 <Select value={selectedSort} onValueChange={setSelectedSort}>
// // //                   <SelectTrigger className="w-full"><SelectValue placeholder="Sort By" /></SelectTrigger>
// // //                   <SelectContent>{sortOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
// // //                 </Select>
// // //               </div>
// // //               <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-8" onClick={() => setShowFilters(false)}>Apply Filters</Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Hero Section */}
// // //       <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
// // //         <div className="container mx-auto px-4 py-8">
// // //           <div className="text-center mb-8">
// // //             <h1 className="text-4xl font-bold mb-4">FoodRush - Order Food Online</h1>
// // //             <p className="text-xl opacity-90">Discover the best restaurants near you</p>
// // //           </div>
// // //           <div className="max-w-2xl mx-auto">
// // //             <div className="relative flex gap-2">
// // //               <div className="relative flex-1">
// // //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //                 <Input type="text" placeholder="Search for restaurants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 text-lg border-0 rounded-full shadow-lg text-black bg-white" />
// // //               </div>
// // //               <Button variant="secondary" className="md:hidden h-auto rounded-full px-4" onClick={() => setShowFilters(true)}><Filter className="w-5 h-5" /></Button>
// // //             </div>
// // //           </div>
// // //           <div className="flex flex-wrap justify-center gap-2 mt-6">
// // //             {['Pizza', 'Burger', 'Biryani', 'Chinese', 'Desserts', 'Healthy'].map((filter) => (
// // //               <Button key={filter} variant="secondary" size="sm" onClick={() => setSearchTerm(filter)} className="bg-white/20 hover:bg-white/30 text-white border-white/30">{filter}</Button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Desktop Filters */}
// // //       <div className="container mx-auto px-4 py-6 hidden md:block">
// // //         <div className="flex flex-wrap gap-4 items-center justify-between">
// // //           <div className="flex flex-wrap gap-4 items-center">
// // //             <div className="flex items-center gap-2"><Filter className="w-4 h-4" /><span className="font-medium">Filters:</span></div>
// // //             <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
// // //               <SelectTrigger className="w-48"><SelectValue placeholder="Select Cuisine" /></SelectTrigger>
// // //               <SelectContent>{cuisines.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
// // //             </Select>
// // //             <Select value={selectedSort} onValueChange={setSelectedSort}>
// // //               <SelectTrigger className="w-48"><SelectValue placeholder="Sort By" /></SelectTrigger>
// // //               <SelectContent>{sortOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
// // //             </Select>
// // //           </div>
// // //           <div className="text-sm text-gray-600">{filteredRestaurants.length} restaurants found</div>
// // //         </div>
// // //       </div>

// // //       {/* Restaurants Grid */}
// // //       <div className="container mx-auto px-4 pb-8">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {filteredRestaurants.map((restaurant) => (
// // //               <Card key={restaurant._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRestaurantClick(restaurant.slug)}>
// // //                 <div className="relative">
// // //                   <img src={restaurant.coverImage || "/placeholder-restaurant.jpg"} alt={restaurant.name} className="w-full h-48 object-cover" />
// // //                   {restaurant.featured && <Badge className="absolute top-2 left-2 bg-orange-500">Featured</Badge>}
// // //                 </div>
// // //                 <CardContent className="p-4">
// // //                   <div className="flex justify-between items-start mb-2">
// // //                     <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
// // //                     <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium">{restaurant.rating || "New"}</span></div>
// // //                   </div>
// // //                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.description}</p>
// // //                   <div className="flex flex-wrap gap-1 mb-3">{(Array.isArray(restaurant.cuisine) ? restaurant.cuisine : []).map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}</div>
// // //                   <div className="flex justify-between items-center text-sm text-gray-600">
// // //                     <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{restaurant.deliveryTime}</span></div>
// // //                     <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{restaurant.deliveryFee === 0 ? 'Free' : `₹${restaurant.deliveryFee}`}</span></div>
// // //                   </div>
// // //                   {restaurant.minOrder > 0 && <div className="text-sm text-gray-600 mt-2">Min. order: ₹{restaurant.minOrder}</div>}
// // //                 </CardContent>
// // //               </Card>
// // //             ))}
// // //           </div>
// // //         {!loading && filteredRestaurants.length === 0 && (
// // //           <div className="text-center py-12"><Utensils className="w-16 h-16 mx-auto text-gray-400 mb-4" /><h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3><p className="text-gray-600">Try adjusting your filters or search terms</p></div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useSession } from 'next-auth/react'; 
// // import { Search, Star, Clock, MapPin, Filter, Utensils, X } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { Skeleton } from '@/components/ui/skeleton';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// // export default function HomePageClient() {
// //   const router = useRouter();
// //   const { data: session, status } = useSession(); 
  
// //   const [restaurants, setRestaurants] = useState([]);
// //   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedCuisine, setSelectedCuisine] = useState('all');
// //   const [selectedSort, setSelectedSort] = useState('rating');
// //   const [showFilters, setShowFilters] = useState(false);

// //   // --- FETCH AND FILTER LOGIC ---
// //   const cuisines = [
// //     { value: 'all', label: 'All Cuisines' }, { value: 'indian', label: 'Indian' }, 
// //     { value: 'chinese', label: 'Chinese' }, { value: 'italian', label: 'Italian' },
// //   ];

// //   const sortOptions = [
// //     { value: 'rating', label: 'Top Rated' }, { value: 'delivery', label: 'Fastest Delivery' }, 
// //   ];

// //   useEffect(() => {
// //     fetchRestaurants();
// //   }, []);

// //   useEffect(() => {
// //     filterAndSortRestaurants();
// //   }, [restaurants, searchTerm, selectedCuisine, selectedSort]);

// //   const fetchRestaurants = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('/api/restaurants');
// //       const data = await response.json();
// //       setRestaurants(data.success && Array.isArray(data.data) ? data.data : []);
// //     } catch (error) {
// //       console.error('Error fetching restaurants:', error);
// //       setRestaurants([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filterAndSortRestaurants = () => {
// //     if (!restaurants) return;
// //     let filtered = [...restaurants];

// //     // ... (filtering and sorting implementation) ...
// //     setFilteredRestaurants(filtered);
// //   };

// //   const handleRestaurantClick = (slug) => {
// //     router.push(`/restaurants/${slug}`); 
// //   };

// //   // --- LOADING BLOCKER ---
// //   if (loading) {
// //     return (
// //         <div className="container mx-auto px-4 py-8">
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {[...Array(6)].map((_, index) => (
// //                     <Card key={index} className="overflow-hidden"><Skeleton className="h-48 w-full" /><CardContent className="p-4"><Skeleton className="h-6 w-3/4 mb-2" /><Skeleton className="h-4 w-full mb-2" /></CardContent></Card>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 relative">
// //       {/* Mobile Filter Sidebar and Hero Section JSX */}
// //       <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
// //         <div className="container mx-auto px-4 py-8">
// //           <h1 className="text-4xl font-bold mb-4">FoodRush - Order Food Online</h1>
// //           <div className="max-w-2xl mx-auto">
// //             <div className="relative flex gap-2">
// //               <div className="relative flex-1">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <Input type="text" placeholder="Search for restaurants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 text-lg border-0 rounded-full shadow-lg text-black bg-white" />
// //               </div>
// //               <Button variant="secondary" className="md:hidden h-auto rounded-full px-4" onClick={() => setShowFilters(true)}><Filter className="w-5 h-5" /></Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Restaurants Grid JSX */}
// //       <div className="container mx-auto px-4 pb-8">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredRestaurants.map((restaurant) => (
// //               <Card key={restaurant._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRestaurantClick(restaurant.slug)}>
// //                 <CardContent className="p-4">
// //                   <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
// //                   <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium">{restaurant.rating || "New"}</span></div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         {!loading && filteredRestaurants.length === 0 && (
// //           <div className="text-center py-12"><Utensils className="w-16 h-16 mx-auto text-gray-400 mb-4" /><h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3></div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react'; 
// import { Search, Star, Clock, MapPin, Filter, Utensils, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// export default function HomePageClient() {
//   const router = useRouter();
//   const { data: session, status } = useSession(); 
  
//   const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCuisine, setSelectedCuisine] = useState('all');
//   const [selectedSort, setSelectedSort] = useState('rating');
//   const [showFilters, setShowFilters] = useState(false);

//   // --- FETCH AND FILTER LOGIC ---
//   const cuisines = [
//     { value: 'all', label: 'All Cuisines' }, { value: 'indian', label: 'Indian' }, 
//     { value: 'chinese', label: 'Chinese' }, { value: 'italian', label: 'Italian' },
//   ];

//   const sortOptions = [
//     { value: 'rating', label: 'Top Rated' }, { value: 'delivery', label: 'Fastest Delivery' }, 
//   ];

//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   useEffect(() => {
//     filterAndSortRestaurants();
//   }, [restaurants, searchTerm, selectedCuisine, selectedSort]);

//   const fetchRestaurants = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/restaurants');
//       const data = await response.json();
//       setRestaurants(data.success && Array.isArray(data.data) ? data.data : []);
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//       setRestaurants([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterAndSortRestaurants = () => {
//     if (!restaurants) return;
//     let filtered = [...restaurants];
//     // ... (filtering and sorting implementation) ...
//     setFilteredRestaurants(filtered);
//   };

//   const handleRestaurantClick = (slug) => {
//     router.push(`/restaurants/${slug}`); 
//   };

//   // --- LOADING BLOCKER ---
//   if (loading) {
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                     <Card key={index} className="overflow-hidden"><Skeleton className="h-48 w-full" /><CardContent className="p-4"><Skeleton className="h-6 w-3/4 mb-2" /><Skeleton className="h-4 w-full mb-2" /></CardContent></Card>
//                 ))}
//             </div>
//         </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 relative">
//       {/* Hero Section JSX */}
//       <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold mb-4">FoodRush - Order Food Online</h1>
//           <div className="max-w-2xl mx-auto">
//             <div className="relative flex gap-2">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input type="text" placeholder="Search for restaurants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 text-lg border-0 rounded-full shadow-lg text-black bg-white" />
//               </div>
//               <Button variant="secondary" className="md:hidden h-auto rounded-full px-4" ><Filter className="w-5 h-5" /></Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Restaurants Grid JSX */}
//       <div className="container mx-auto px-4 pb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredRestaurants.map((restaurant) => (
//               <Card key={restaurant._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRestaurantClick(restaurant.slug)}>
//                 <CardContent className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
//                   <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium">{restaurant.rating || "New"}</span></div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         {!loading && filteredRestaurants.length === 0 && (
//           <div className="text-center py-12"><Utensils className="w-16 h-16 mx-auto text-gray-400 mb-4" /><h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3></div>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; 
import { Search, Star, Clock, MapPin, Filter, Utensils, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession(); 
  
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedSort, setSelectedSort] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // 🛑 REMOVED REDUNDANT CLIENT-SIDE REDIRECT LOGIC 🛑
  // The server component (src/app/page.jsx) handles redirection for admin/owner/delivery roles.
  /*
  useEffect(() => {
    if (status === 'authenticated') {
      const role = session?.user?.role;
      if (role === 'admin' || role === 'restaurant_owner') {
        router.push('/'); // This caused a loop or incorrect routing
      }
    }
  }, [session, status, router]);
  */

  // --- EXISTING FETCH LOGIC ---
  const cuisines = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'indian', label: 'Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'american', label: 'American' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'thai', label: 'Thai' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Top Rated' },
    { value: 'delivery', label: 'Fastest Delivery' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterAndSortRestaurants();
  }, [restaurants, searchTerm, selectedCuisine, selectedSort]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/restaurants');
      const data = await response.json();
      setRestaurants(data.success && Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRestaurants = () => {
    if (!restaurants) return;
    let filtered = [...restaurants];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(restaurant =>
        (restaurant.name?.toLowerCase() || '').includes(lowerTerm) ||
        (restaurant.cuisine || []).some(c => c.toLowerCase().includes(lowerTerm)) ||
        (restaurant.description?.toLowerCase() || '').includes(lowerTerm)
      );
    }

    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(restaurant =>
        (restaurant.cuisine || []).map(c => c.toLowerCase()).includes(selectedCuisine.toLowerCase())
      );
    }

    switch (selectedSort) {
      case 'rating': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'delivery': filtered.sort((a, b) => (parseInt(a.deliveryTime) || 0) - (parseInt(b.deliveryTime) || 0)); break;
      case 'price-low': filtered.sort((a, b) => (a.minOrder || 0) - (b.minOrder || 0)); break;
      case 'price-high': filtered.sort((a, b) => (b.minOrder || 0) - (a.minOrder || 0)); break;
    }

    setFilteredRestaurants(filtered);
  };

  const handleRestaurantClick = (slug) => {
    router.push(`/restaurants/${slug}`); 
  };

  // While checking session, show loader or nothing
  if (status === 'loading') return <div className="min-h-screen bg-gray-50" />;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Mobile Filter Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)}></div>
          <div className="relative w-3/4 max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-black" /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block text-black">Cuisine</label>
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select Cuisine" /></SelectTrigger>
                  <SelectContent>{cuisines.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-black">Sort By</label>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Sort By" /></SelectTrigger>
                  <SelectContent>{sortOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-8" onClick={() => setShowFilters(false)}>Apply Filters</Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">FoodRush - Order Food Online</h1>
            <p className="text-xl opacity-90">Discover the best restaurants near you</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input type="text" placeholder="Search for restaurants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 text-lg border-0 rounded-full shadow-lg text-black bg-white" />
              </div>
              <Button variant="secondary" className="md:hidden h-auto rounded-full px-4" onClick={() => setShowFilters(true)}><Filter className="w-5 h-5" /></Button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Pizza', 'Burger', 'Biryani', 'Chinese', 'Desserts', 'Healthy'].map((filter) => (
              <Button key={filter} variant="secondary" size="sm" onClick={() => setSearchTerm(filter)} className="bg-white/20 hover:bg-white/30 text-white border-white/30">{filter}</Button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="container mx-auto px-4 py-6 hidden md:block">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2"><Filter className="w-4 h-4" /><span className="font-medium">Filters:</span></div>
            <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Select Cuisine" /></SelectTrigger>
              <SelectContent>{cuisines.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Sort By" /></SelectTrigger>
              <SelectContent>{sortOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">{filteredRestaurants.length} restaurants found</div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="container mx-auto px-4 pb-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden"><Skeleton className="h-48 w-full" /><CardContent className="p-4"><Skeleton className="h-6 w-3/4 mb-2" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-2/3 mb-4" /></CardContent></Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRestaurantClick(restaurant.slug)}>
                <div className="relative">
                  <img src={restaurant.coverImage || "/placeholder-restaurant.jpg"} alt={restaurant.name} className="w-full h-48 object-cover" />
                  {restaurant.featured && <Badge className="absolute top-2 left-2 bg-orange-500">Featured</Badge>}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium">{restaurant.rating || "New"}</span></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">{(Array.isArray(restaurant.cuisine) ? restaurant.cuisine : []).map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}</div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{restaurant.deliveryTime}</span></div>
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{restaurant.deliveryFee === 0 ? 'Free' : `₹${restaurant.deliveryFee}`}</span></div>
                  </div>
                  {restaurant.minOrder > 0 && <div className="text-sm text-gray-600 mt-2">Min. order: ₹{restaurant.minOrder}</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {!loading && filteredRestaurants.length === 0 && (
          <div className="text-center py-12"><Utensils className="w-16 h-16 mx-auto text-gray-400 mb-4" /><h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3><p className="text-gray-600">Try adjusting your filters or search terms</p></div>
        )}
      </div>
    </div>
  );
}