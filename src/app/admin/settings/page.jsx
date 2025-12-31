'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Store, Clock, MapPin, DollarSign, Save, Loader2, Trash2, Plus
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// UPI ID from environment variable
const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || '';

const defaultFormData = {
  name: '',
  description: '',
  phone: '',
  address: { street: '', city: '', zipCode: '' },
  deliveryTime: '30-40 min',
  deliveryFee: 0,
  minOrder: 0,
  isActive: true,
  cuisine: [],
  image: '',
  coverImage: '',
  upiId: UPI_ID,
  tags: [],
  workingHours: {
    monday: { open: '09:00', close: '22:00' },
    tuesday: { open: '09:00', close: '22:00' },
    wednesday: { open: '09:00', close: '22:00' },
    thursday: { open: '09:00', close: '22:00' },
    friday: { open: '09:00', close: '23:00' },
    saturday: { open: '10:00', close: '23:00' },
    sunday: { open: '10:00', close: '23:00' },
  }
};

const cuisineOptions = [
  'North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food',
  'Biryani', 'Desserts', 'Pizza', 'Burger', 'American', 'Mexican',
  'Thai', 'Japanese', 'Korean', 'Mediterranean'
];

export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchSettings();
    }
  }, [status, router]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/restaurant');
      const data = await res.json();

      if (data.success && data.data && data.data.length > 0) {
        const restaurant = data.data[0];
        setRestaurantId(restaurant._id);
        setFormData({
          name: restaurant.name || '',
          description: restaurant.description || '',
          phone: restaurant.phone || '',
          address: restaurant.address || defaultFormData.address,
          deliveryTime: restaurant.deliveryTime || '30-40 min',
          deliveryFee: restaurant.deliveryFee || 0,
          minOrder: restaurant.minOrder || 0,
          isActive: restaurant.isActive !== undefined ? restaurant.isActive : true,
          cuisine: restaurant.cuisine || [],
          image: restaurant.image || '',
          coverImage: restaurant.coverImage || '',
          upiId: restaurant.upiId || '',
          tags: restaurant.tags || [],
          workingHours: restaurant.workingHours || defaultFormData.workingHours,
        });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      toast({
        title: "Error",
        description: "Could not load restaurant settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => {
      if (section === 'root') {
        return { ...prev, [field]: value };
      }
      if (section === 'address') {
        return { ...prev, address: { ...prev.address, [field]: value } };
      }
      if (section === 'workingHours') {
        return {
          ...prev,
          workingHours: {
            ...prev.workingHours,
            [field]: { ...prev.workingHours[field], ...value }
          }
        };
      }
      return prev;
    });
  };

  const handleCuisineToggle = (cuisine) => {
    setFormData(prev => {
      const currentCuisine = [...prev.cuisine];
      if (currentCuisine.includes(cuisine)) {
        return { ...prev, cuisine: currentCuisine.filter(c => c !== cuisine) };
      } else {
        return { ...prev, cuisine: [...currentCuisine, cuisine] };
      }
    });
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = restaurantId
        ? `/api/admin/restaurant/${restaurantId}`
        : '/api/admin/restaurant';

      const method = restaurantId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast({
          title: "Success",
          description: restaurantId
            ? "Restaurant settings updated successfully!"
            : "New restaurant created successfully!",
        });

        if (!restaurantId && result.data?._id) {
          setRestaurantId(result.data._id);
        }

        fetchSettings();
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleNewRestaurant = () => {
    setRestaurantId(null);
    setFormData(defaultFormData);
    toast({ title: "Ready", description: "Fill in the details to create a new restaurant." });
  };

  const handleDeleteRestaurant = async () => {
    if (!restaurantId) return;
    if (!confirm("Are you sure you want to permanently delete this restaurant? This action cannot be undone.")) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/restaurant/${restaurantId}`, { method: 'DELETE' });
      const result = await res.json();

      if (result.success) {
        toast({
          title: "Deleted",
          description: "The restaurant has been permanently removed.",
          variant: "destructive"
        });
        setRestaurantId(null);
        setFormData(defaultFormData);
      } else {
        throw new Error(result.error || 'Failed to delete');
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
          <p className="text-muted-foreground">
            {restaurantId ? `Managing: ${formData.name}` : 'Create your restaurant profile'}
          </p>
        </div>
        <div className="flex gap-3">
          {restaurantId && (
            <Button
              variant="outline"
              onClick={handleDeleteRestaurant}
              disabled={saving}
              className="border-red-400 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Restaurant
            </Button>
          )}
          {restaurantId && (
            <Button
              variant="outline"
              onClick={handleNewRestaurant}
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {restaurantId ? 'Save Changes' : 'Create Restaurant'}
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="cuisine">Cuisine & Tags</TabsTrigger>
          <TabsTrigger value="hours">Working Hours</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        {/* GENERAL TAB */}
        <TabsContent value="general">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Restaurant Profile</CardTitle>
                <CardDescription>
                  Basic information visible to your customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('root', 'name', e.target.value)}
                    placeholder="Enter restaurant name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('root', 'description', e.target.value)}
                    placeholder="Tell customers about your restaurant"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('root', 'phone', e.target.value)}
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Logo Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleChange('root', 'image', e.target.value)}
                      placeholder="https://example.com/logo.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      value={formData.coverImage}
                      onChange={(e) => handleChange('root', 'coverImage', e.target.value)}
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Status & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Online Status</Label>
                    <div className="text-sm text-muted-foreground">
                      {formData.isActive ? "✅ Restaurant is Open" : "🔴 Restaurant is Closed"}
                    </div>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleChange('root', 'isActive', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-9 mb-2"
                      placeholder="Street Address"
                      value={formData.address.street}
                      onChange={(e) => handleChange('address', 'street', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="City"
                      value={formData.address.city}
                      onChange={(e) => handleChange('address', 'city', e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Zip Code"
                      value={formData.address.zipCode}
                      onChange={(e) => handleChange('address', 'zipCode', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DELIVERY TAB */}
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Configuration</CardTitle>
              <CardDescription>Set your delivery fees and minimum order requirements.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Estimated Delivery Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deliveryTime"
                    className="pl-9"
                    placeholder="e.g. 30-40 min"
                    value={formData.deliveryTime}
                    onChange={(e) => handleChange('root', 'deliveryTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryFee">Delivery Fee (₹) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deliveryFee"
                    type="number"
                    className="pl-9"
                    value={formData.deliveryFee}
                    onChange={(e) => handleChange('root', 'deliveryFee', Number(e.target.value))}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order (₹) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="minOrder"
                    type="number"
                    className="pl-9"
                    value={formData.minOrder}
                    onChange={(e) => handleChange('root', 'minOrder', Number(e.target.value))}
                    min="0"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CUISINE TAB */}
        <TabsContent value="cuisine">
          <Card>
            <CardHeader>
              <CardTitle>Cuisine Types</CardTitle>
              <CardDescription>Select all cuisines that your restaurant serves.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Cuisines *</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cuisineOptions.map((cuisine) => (
                    <Button
                      key={cuisine}
                      type="button"
                      variant={formData.cuisine.includes(cuisine) ? "default" : "outline"}
                      className={`${formData.cuisine.includes(cuisine)
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : ''
                        }`}
                      onClick={() => handleCuisineToggle(cuisine)}
                    >
                      {cuisine}
                    </Button>
                  ))}
                </div>
                {formData.cuisine.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">Please select at least one cuisine</p>
                )}
              </div>

              <div className="mt-6">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-xs hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Type a tag and press Enter"
                  onKeyDown={handleTagAdd}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Add tags like "Family Friendly", "Late Night", "Healthy Options", etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HOURS TAB */}
        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <CardDescription>Set the opening and closing times for each day of the week.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <div key={day} className="grid grid-cols-3 items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <Label className="capitalize font-medium">{day}</Label>
                  <div className="col-span-2 flex gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor={`${day}-open`} className="text-xs text-muted-foreground">Open</Label>
                      <Input
                        id={`${day}-open`}
                        type="time"
                        value={formData.workingHours[day]?.open || ''}
                        onChange={(e) => handleChange('workingHours', day, { open: e.target.value })}
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor={`${day}-close`} className="text-xs text-muted-foreground">Close</Label>
                      <Input
                        id={`${day}-close`}
                        type="time"
                        value={formData.workingHours[day]?.close || ''}
                        onChange={(e) => handleChange('workingHours', day, { close: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYMENT TAB */}
        <TabsContent value="payment">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>UPI Payment Settings</CardTitle>
                <CardDescription>Configure your UPI ID for accepting payments from customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID *</Label>
                  <Input
                    id="upiId"
                    value={UPI_ID || 'Not configured'}
                    readOnly
                    className="bg-gray-50"
                    placeholder="Configure in .env.local"
                  />
                  <p className="text-sm text-muted-foreground">
                    UPI ID is configured via environment variable <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_UPI_ID</code> in .env.local
                  </p>
                </div>

                {UPI_ID && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900 mb-1">UPI Payment Active</h4>
                        <p className="text-sm text-green-700 mb-2">
                          Customers will pay to: <span className="font-mono font-bold">{UPI_ID}</span>
                        </p>
                        <div className="text-xs text-green-600 space-y-1">
                          <p>✓ Supports Google Pay, PhonePe, Paytm, BHIM</p>
                          <p>✓ Instant payment confirmation</p>
                          <p>✓ No transaction fees</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Payment Methods Accepted</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        💳
                      </div>
                      <div>
                        <p className="font-medium text-sm">UPI Apps</p>
                        <p className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        💵
                      </div>
                      <div>
                        <p className="font-medium text-sm">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when delivered</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
                    <span>💡</span> How it works
                  </h4>
                  <ul className="text-sm text-amber-800 space-y-1 ml-6 list-disc">
                    <li>Customer places order and selects UPI payment</li>
                    <li>They pay to your UPI ID using any UPI app</li>
                    <li>Customer shares payment screenshot/transaction ID</li>
                    <li>You verify payment and confirm the order</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Instructions for Customers</CardTitle>
                <CardDescription>This message will be shown to customers at checkout</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={4}
                  placeholder="Example: Please pay to our UPI ID and share the transaction screenshot on WhatsApp..."
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  Provide clear instructions on how customers should complete the payment
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}