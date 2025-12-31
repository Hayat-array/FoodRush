// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Star, Clock, Heart } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// export default function FavoritesPage() {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/api/favorites')
//       .then(res => res.json())
//       .then(data => {
//         if(data.success) setFavorites(data.data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="p-8 text-center">Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 min-h-screen">
//       <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
//       {favorites.length === 0 ? (
//         <div className="text-center text-gray-500">No favorites added yet.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {favorites.map((restaurant) => (
//             <Link key={restaurant._id} href={`/restaurant/${restaurant.slug}`}>
//               <Card className="hover:shadow-lg transition-all cursor-pointer overflow-hidden">
//                 <img src={restaurant.coverImage} alt={restaurant.name} className="h-48 w-full object-cover" />
//                 <CardContent className="p-4">
//                   <div className="flex justify-between">
//                     <h3 className="font-bold text-lg">{restaurant.name}</h3>
//                     <div className="flex items-center gap-1 bg-green-100 px-2 rounded text-green-800 text-sm">
//                       {restaurant.rating} <Star className="w-3 h-3 fill-current" />
//                     </div>
//                   </div>
//                   <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
//                     <Clock className="w-4 h-4" /> {restaurant.deliveryTime} mins
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then(data => {
        if(data.success) setFavorites(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">No favorites added yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((restaurant) => (
            // Link to the correct restaurant detail page
            <Link key={restaurant._id} href={`/restaurants/${restaurant.slug}`}>
              <Card className="hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                <img src={restaurant.coverImage} alt={restaurant.name} className="h-48 w-full object-cover" />
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <div className="flex items-center gap-1 bg-green-100 px-2 rounded text-green-800 text-sm">
                      {restaurant.rating} <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" /> {restaurant.deliveryTime} mins
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}