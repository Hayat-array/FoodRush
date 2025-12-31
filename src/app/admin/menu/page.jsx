'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Plus, Edit2, Trash2, Search, Loader2, QrCode, ArrowLeft, Store
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminMenuPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [view, setView] = useState('list');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [myRestaurants, setMyRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [saving, setSaving] = useState(false);

  const initialFormState = {
    name: '', description: '', price: '', category: 'main-course',
    image: '', isAvailable: true, isPopular: false, dietary: 'non-vegetarian', preparationTime: '20 min'
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
    if (session) fetchRestaurants();
  }, [session, status, router]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/restaurant');
      const data = await res.json();
      if (data.success) setMyRestaurants(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenu = async (restaurantId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/menu?restaurantId=${restaurantId}`);
      const data = await res.json();
      if (data.success) setDishes(data.data.dishes || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load menu", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('menu');
    fetchMenu(restaurant._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingDish ? `/api/admin/menu/${editingDish._id}` : '/api/admin/menu';
      const method = editingDish ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        dietary: [formData.dietary],
        restaurantId: selectedRestaurant._id,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast({ title: "Success", description: "Saved successfully." });
      setIsDialogOpen(false);
      setFormData(initialFormState);
      fetchMenu(selectedRestaurant._id);
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this dish?")) return;
    try {
      const res = await fetch(`/api/admin/menu/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Deleted", description: "Dish removed." });
        setDishes(prev => prev.filter(d => d._id !== id));
      }
    } catch (error) { console.error(error); }
  };

  const openEditDialog = (dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name, description: dish.description, price: dish.price, category: dish.category,
      image: dish.image, isAvailable: dish.isAvailable, isPopular: dish.isPopular,
      dietary: dish.dietary?.[0] || 'non-vegetarian', preparationTime: dish.preparationTime || '20 min'
    });
    setIsDialogOpen(true);
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const qrCodeUrl = selectedRestaurant ? `${baseUrl}/restaurant/${selectedRestaurant.slug}` : '';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrCodeUrl)}`;

  if (loading && view === 'list') return <div className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;

  if (view === 'list') {
    return (
      <div className="container mx-auto p-8 min-h-screen bg-gray-50/50">
        <h1 className="text-3xl font-bold mb-2">Select Restaurant</h1>
        <p className="text-gray-500 mb-8">Choose a restaurant to manage its menu.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myRestaurants.map((rest) => (
            <Card key={rest._id} className="cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-orange-500" onClick={() => handleRestaurantSelect(rest)}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Store className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{rest.name}</h3>
                  <p className="text-sm text-gray-500">{rest.address?.city || "No Location"}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Link href="/admin/settings">
            <Card className="cursor-pointer hover:shadow-lg transition-all border-dashed border-2 flex items-center justify-center h-full min-h-[100px]">
              <div className="text-center text-gray-500">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p>Add New Restaurant</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    );
  }

  const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Button variant="ghost" onClick={() => setView('list')} className="mb-2 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Restaurants
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Menu: {selectedRestaurant?.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsQRDialogOpen(true)} className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <QrCode className="mr-2 h-4 w-4" /> QR Code
          </Button>
          <Button onClick={() => { setEditingDish(null); setFormData(initialFormState); setIsDialogOpen(true); }} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" /> Add Dish
          </Button>
        </div>
      </div>

      <div className="relative w-full md:w-96 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search dishes..." className="pl-9 bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDishes.map((dish) => (
          <Card key={dish._id} className="overflow-hidden group hover:shadow-md transition-all">
            <div className="relative h-48 bg-gray-100">
              <img src={dish.image || '/placeholder-dish.jpg'} alt={dish.name} className="w-full h-full object-cover" />
              {!dish.isAvailable && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Badge variant="destructive">Unavailable</Badge></div>}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => openEditDialog(dish)}><Edit2 className="h-4 w-4" /></Button>
                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(dish._id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg line-clamp-1">{dish.name}</h3>
                <span className="font-bold text-green-600">₹{dish.price}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{dish.description}</p>
              <div className="flex gap-2 items-center">
                <Badge variant="outline">{dish.category}</Badge>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const newDietary = dish.dietary?.[0] === 'vegetarian' ? 'non-vegetarian' : 'vegetarian';
                    try {
                      const res = await fetch(`/api/admin/menu/${dish._id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...dish, dietary: [newDietary] })
                      });
                      if (res.ok) {
                        fetchMenu(selectedRestaurant._id);
                        toast({ title: "Updated", description: `Changed to ${newDietary === 'vegetarian' ? 'Veg' : 'Non-Veg'}` });
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className={`px-2 py-1 rounded text-xs font-medium border-2 transition-colors ${dish.dietary?.[0]?.includes('non')
                      ? "text-red-600 border-red-200 hover:bg-red-50"
                      : "text-green-600 border-green-200 hover:bg-green-50"
                    }`}
                >
                  {dish.dietary?.[0] === 'vegetarian' ? '🌱 Veg' : '🍗 Non-Veg'} (Click to change)
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <DialogHeader><DialogTitle>Scan for Menu</DialogTitle></DialogHeader>
          <div className="flex justify-center py-6"><img src={qrImageUrl} alt="QR" className="w-48 h-48 border-2 border-black p-2 rounded" /></div>
          <p className="text-xs text-gray-500 break-all">{qrCodeUrl}</p>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader><DialogTitle>{editingDish ? 'Edit Dish' : 'Add New Dish'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Image URL</Label><Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starters">Starters</SelectItem>
                    <SelectItem value="main-course">Main Course</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-base font-semibold">Dietary Type *</Label>
                <Select value={formData.dietary} onValueChange={(val) => setFormData({ ...formData, dietary: val })}>
                  <SelectTrigger className="border-2">
                    <SelectValue placeholder="Select Veg/Non-Veg" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        <span>Vegetarian</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="non-vegetarian">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        <span>Non-Vegetarian</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-8 pt-2">
              <div className="flex items-center space-x-2"><Switch checked={formData.isAvailable} onCheckedChange={(c) => setFormData({ ...formData, isAvailable: c })} /><Label>Available</Label></div>
              <div className="flex items-center space-x-2"><Switch checked={formData.isPopular} onCheckedChange={(c) => setFormData({ ...formData, isPopular: c })} /><Label>Popular</Label></div>
            </div>
            <DialogFooter><Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-700">{saving ? "Saving..." : "Save Dish"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}