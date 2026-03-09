'use client';

import { useSession } from 'next-auth/react';
import { Truck, Package, DollarSign, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleBasedNav from '@/components/RoleBasedNav';

export default function DeliveryDashboard() {
  return (
    <ProtectedRoute allowedRoles={['delivery']}>
      <DeliveryDashboardContent />
    </ProtectedRoute>
  );
}

function DeliveryDashboardContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <RoleBasedNav />

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Delivery Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome, {session?.user?.name}! Manage your deliveries here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-2 border-green-100 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Deliveries
              </CardTitle>
              <Truck className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">0</div>
              <p className="text-xs text-gray-500 mt-1">Currently assigned</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-100 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed Today
              </CardTitle>
              <Package className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600">0</div>
              <p className="text-xs text-gray-500 mt-1">Deliveries completed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Today's Earnings
              </CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">₹0</div>
              <p className="text-xs text-gray-500 mt-1">Total earned</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg. Delivery Time
              </CardTitle>
              <Clock className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">--</div>
              <p className="text-xs text-gray-500 mt-1">Minutes</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-orange-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/delivery/available-orders'}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Package className="h-6 w-6" />
                Find New Orders
              </CardTitle>
              <CardDescription>
                Browse nearby orders ready for pickup
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-green-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/delivery/active-delivery'}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Truck className="h-6 w-6" />
                Current Delivery
              </CardTitle>
              <CardDescription>
                Manage your active delivery and verify OTP
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Active Deliveries */}
        <Card className="shadow-lg border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="text-green-700">Active Deliveries</CardTitle>
            <CardDescription className="text-gray-600">
              Your current delivery assignments
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No active deliveries</p>
              <p className="text-sm text-gray-400 mt-2">Check "Find New Orders" to start working</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
