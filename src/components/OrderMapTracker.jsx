// 'use client';

// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Button } from './ui/button'; // Assuming Button is available here
// import { Truck } from 'lucide-react';

// // ⚠️ FIX: Import Card components from your UI library path
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 


// const containerStyle = {
//   width: '100%',
//   height: '350px'
// };

// // Default center coordinates (e.g., your city)
// const defaultCenter = { lat: 26.9124, lng: 75.7873 }; 

// export default function OrderMapTracker({ order, onClose }) {
//   // CRITICAL: Fetch the public environment variable
//   const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
//   const libraries = ['places']; // Include any necessary libraries

//   // --- MOCK COORDINATES (Must use real data in production) ---
//   const restaurantCoords = { lat: 26.9200, lng: 75.8000 }; 
//   const userCoords = { lat: 26.9100, lng: 75.7900 };

//   const isDeliveryActive = ['preparing', 'ready', 'out_for_delivery'].includes(order.status);
  
//   if (!GOOGLE_MAPS_KEY) {
//       return (
//           <p className="text-red-600 p-4 border rounded">
//               Error: Google Maps API Key is missing. Check your .env.local file.
//           </p>
//       );
//   }

//   return (
//     <LoadScript
//       googleMapsApiKey={GOOGLE_MAPS_KEY}
//       libraries={libraries}
//     >
//       <Card className="mt-4 border-2 border-indigo-400">
//         <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
//           <CardTitle className="text-lg text-indigo-700">Live Tracking: {order.orderNumber}</CardTitle>
//           <Button variant="ghost" size="sm" onClick={onClose}>Close Map</Button>
//         </CardHeader>
//         <CardContent className="p-4 pt-0">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={userCoords} 
//             zoom={14}
//           >
//             {/* Restaurant Marker */}
//             <Marker 
//                 position={restaurantCoords} 
//                 label={{text: 'R', color: 'white'}} 
//                 title={order.restaurant?.name || 'Restaurant'}
//             />
            
//             {/* User Address Marker */}
//             <Marker 
//                 position={userCoords} 
//                 label={{text: 'H', color: 'white'}} 
//                 title="Delivery Address"
//             />
            
//             {/* Driver Marker (Conceptual - requires live data) */}
//             {isDeliveryActive && (
//               <Marker 
//                 position={userCoords} 
//                 icon={{
//                     // Using a placeholder icon path, since vector rendering is complex
//                     path: 'M23.8 19.3L15 10.5V.5h-2v10l-8.8 8.8C3.2 20 2 21.2 2 23h20c1.8 0 3-.7 3.8-1.7.8-1 1-2.2.8-3z',
//                     fillColor: '#4f46e5',
//                     fillOpacity: 1,
//                     strokeWeight: 0,
//                     scale: 0.8
//                 }}
//               />
//             )}
//           </GoogleMap>
//         </CardContent>
//       </Card>
//     </LoadScript>
//   );
// }
'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button'; // Fixed import path
import { Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 

const containerStyle = {
  width: '100%',
  height: '350px'
};

// Default center coordinates (e.g., Jaipur, India - adjust as needed)
const defaultCenter = { lat: 26.9124, lng: 75.7873 }; 

export default function OrderMapTracker({ order, onClose }) {
  // CRITICAL: Fetch the public environment variable
  const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const libraries = ['places']; // Include any necessary libraries

  // --- MOCK COORDINATES (Must use real data in production, e.g., from order props or API) ---
  const restaurantCoords = { lat: 26.9200, lng: 75.8000 }; // Example: Restaurant location
  const userCoords = { lat: 26.9100, lng: 75.7900 }; // Example: Delivery address

  const isDeliveryActive = ['preparing', 'ready', 'out_for_delivery'].includes(order.status?.toLowerCase() || '');
  
  if (!GOOGLE_MAPS_KEY) {
      return (
          <Card className="mt-4 border-2 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600">Map Loading Error</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p>Google Maps API Key is missing. Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to your .env.local file.</p>
              <Button variant="outline" size="sm" onClick={onClose} className="mt-2">
                Close
              </Button>
            </CardContent>
          </Card>
      );
  }

  // Custom truck icon path for driver marker (simple SVG path for truck)
  const truckIcon = {
    path: 'M0,0 L10,0 L10,5 L3,5 L3,10 L7,10 L7,8 L12,8 L12,10 L16,10 L16,5 L20,5 L20,0 Z M5,3 L8,3 L8,5 L5,5 Z', // Basic truck shape
    fillColor: '#3b82f6', // Blue fill
    fillOpacity: 1,
    strokeColor: '#1d4ed8',
    strokeWeight: 1,
    scale: 0.6
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_KEY}
      libraries={libraries}
    >
      <Card className="mt-4 border-2 border-indigo-400 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 bg-indigo-50">
          <CardTitle className="text-lg text-indigo-700 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Live Tracking: #{order.orderNumber}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <span className="sr-only">Close</span> ✕
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <p><strong>Status:</strong> {order.status?.toUpperCase() || 'Unknown'}</p>
            <p><strong>Restaurant:</strong> {order.restaurant?.name || 'N/A'}</p>
            <p><strong>Delivery Address:</strong> {order.deliveryAddress?.street || 'N/A'}</p>
            {order.estimatedDeliveryTime && (
              <p><strong>ETA:</strong> {new Date(order.estimatedDeliveryTime).toLocaleString()}</p>
            )}
          </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter} // Center on default or average of points
            zoom={13}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true
            }}
          >
            {/* Restaurant Marker */}
            <Marker 
              position={restaurantCoords} 
              label={{ text: 'R', color: 'white', fontSize: '12px', fontWeight: 'bold' }} 
              title={order.restaurant?.name || 'Restaurant'}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red icon for restaurant
                scaledSize: new window.google.maps.Size(32, 32)
              }}
            />
            
            {/* User Address Marker */}
            <Marker 
              position={userCoords} 
              label={{ text: 'H', color: 'white', fontSize: '12px', fontWeight: 'bold' }} 
              title="Your Delivery Address"
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // Green icon for home
                scaledSize: new window.google.maps.Size(32, 32)
              }}
            />
            
            {/* Driver Marker (only if delivery is active; mock position - in prod, use real GPS) */}
            {isDeliveryActive && (
              <Marker 
                position={restaurantCoords} // Mock: Start at restaurant, animate to user in prod
                icon={truckIcon}
                title="Driver Location"
                label={{ text: '🚚', color: 'transparent' }}
              />
            )}
          </GoogleMap>
        </CardContent>
      </Card>
    </LoadScript>
  );
}