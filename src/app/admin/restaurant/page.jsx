'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    Store, Clock, MapPin, DollarSign, Save, Loader2, Trash2, Plus,
    QrCode as QrCodeIcon, Download, Printer, Link as LinkIcon, ArrowLeft, Building2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import QRCode from 'qrcode';
import Link from 'next/link';

// QR Code Component
const QrCodeSection = ({ restaurantSlug, restaurantName }) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
    const menuUrl = restaurantSlug ? `${baseUrl}/restaurants/${restaurantSlug}` : baseUrl;

    const [qrDataUrl, setQrDataUrl] = useState('');
    const [qrLoading, setQrLoading] = useState(true);

    const generateQRCode = async (url) => {
        setQrLoading(true);
        try {
            const dataUrl = await QRCode.toDataURL(url, {
                width: 400,
                margin: 2,
                color: { dark: '#000000', light: '#ffffff' },
            });
            setQrDataUrl(dataUrl);
        } catch (err) {
            console.error("QR Code generation failed:", err);
        } finally {
            setQrLoading(false);
        }
    };

    useEffect(() => {
        generateQRCode(menuUrl);
    }, [menuUrl]);

    const handleDownload = () => {
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `${restaurantName}-menu-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${restaurantName} QR Code</title>
                    <style>
                        body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; padding: 20px;}
                        img { max-width: 300px; height: auto; border: 5px solid #000; padding: 10px;}
                        h1 { margin-bottom: 10px; color: #f97316; }
                        p { color: #666; }
                    </style>
                </head>
                <body>
                    <h1>Scan to View Menu</h1>
                    <img src="${qrDataUrl}" />
                    <p style="font-size: 14px; margin-top: 20px;">${menuUrl}</p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Card className="shadow-lg border-2 border-orange-100">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                    <QrCodeIcon className="w-6 h-6" /> Menu QR Code
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Share this QR code with customers for direct menu access.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-orange-200 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-orange-50">
                    {qrLoading ? (
                        <Loader2 className="h-12 w-12 animate-spin text-orange-500 my-8" />
                    ) : qrDataUrl ? (
                        <div className="border-4 border-orange-600 p-3 rounded-xl bg-white shadow-2xl hover:scale-105 transition-transform duration-300">
                            <img
                                src={qrDataUrl}
                                alt="Generated QR Code"
                                className="w-52 h-52 object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-52 h-52 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-sm">No URL (Save settings first)</span>
                        </div>
                    )}
                    <p className="text-xs text-gray-600 mt-4 flex items-center gap-1 bg-white px-3 py-2 rounded-full border">
                        <LinkIcon className="w-3 h-3" />
                        {menuUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </p>
                </div>
                {qrDataUrl && (
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 border-orange-300 hover:bg-orange-50" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" /> Download PNG
                        </Button>
                        <Button variant="outline" className="flex-1 border-orange-300 hover:bg-orange-50" onClick={handlePrint}>
                            <Printer className="w-4 h-4 mr-2" /> Print Sheet
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default function AdminRestaurantPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [restaurantId, setRestaurantId] = useState(null);

    const defaultFormData = {
        name: '',
        description: '',
        phone: '',
        slug: '',
        address: { street: '', city: '', zipCode: '' },
        deliveryTime: '30-40 min',
        deliveryFee: 40,
        minOrder: 0,
        isActive: true,
        cuisine: [],
        image: '',
        coverImage: '',
        upiId: '',
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

    const [formData, setFormData] = useState(defaultFormData);

    const cuisineOptions = [
        'North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food',
        'Biryani', 'Desserts', 'Pizza', 'Burger', 'American', 'Mexican',
        'Thai', 'Japanese', 'Korean', 'Mediterranean'
    ];

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

                setFormData(prev => ({
                    ...prev,
                    name: restaurant.name || '',
                    description: restaurant.description || '',
                    phone: restaurant.contact?.phone || '',
                    slug: restaurant.slug || '',
                    address: {
                        street: restaurant.address?.street || '',
                        city: restaurant.address?.city || '',
                        zipCode: restaurant.address?.zipCode || ''
                    },
                    deliveryTime: restaurant.deliveryTime || '30-40 min',
                    deliveryFee: restaurant.deliveryFee || 40,
                    minOrder: restaurant.minOrder || 0,
                    isActive: restaurant.isActive !== undefined ? restaurant.isActive : true,
                    cuisine: restaurant.cuisine || [],
                    image: restaurant.image || '',
                    coverImage: restaurant.coverImage || '',
                    upiId: restaurant.upiId || '',
                    tags: restaurant.tags || [],
                    workingHours: restaurant.workingHours || defaultFormData.workingHours,
                }));
            } else {
                setRestaurantId(null);
                setFormData(defaultFormData);
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

    const handleNewRestaurant = () => {
        if (restaurantId && !confirm("Are you sure you want to clear the form to create a new restaurant?")) {
            return;
        }
        setRestaurantId(null);
        setFormData(defaultFormData);
        toast({ title: "Creation Mode", description: "Form cleared. Ready to create new restaurant." });
    };

    const handleDeleteRestaurant = async () => {
        if (!restaurantId || !confirm("WARNING: Are you absolutely sure you want to permanently delete this restaurant?")) {
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(`/api/admin/restaurant/${restaurantId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await res.json();

            if (result.success) {
                toast({
                    title: "Deleted!",
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
        if (!formData.name || !formData.address.street || !formData.phone || formData.cuisine.length === 0) {
            toast({
                title: "Validation Error",
                description: "Please fill in Name, Phone, Address, and select at least one Cuisine.",
                variant: "destructive",
            });
            return;
        }

        setSaving(true);
        try {
            const currentId = restaurantId;

            const url = currentId
                ? `/api/admin/restaurant/${currentId}`
                : '/api/admin/restaurant';

            const method = currentId ? 'PUT' : 'POST';

            const payload = {
                ...formData,
                deliveryFee: Number(formData.deliveryFee),
                minOrder: Number(formData.minOrder),
                contact: {
                    phone: formData.phone
                },
                phone: undefined,
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
                toast({
                    title: "Success",
                    description: currentId
                        ? "Restaurant settings updated successfully!"
                        : "New restaurant created successfully!",
                });

                if (method === 'POST' && result.data?._id) {
                    setRestaurantId(result.data._id);
                }

                fetchSettings();
            } else {
                throw new Error(result.error || 'Failed to save');
            }
        } catch (error) {
            console.error("Save Error:", error);
            toast({
                title: "Error",
                description: `Failed to save: ${error.message}.`,
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading restaurant settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            {/* Header with gradient */}
            <div className="bg-white shadow-md border-b-4 border-orange-500">
                <div className="container mx-auto py-6 px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/admin">
                                <Button variant="outline" size="icon" className="border-orange-300 hover:bg-orange-50">
                                    <ArrowLeft className="h-5 w-5 text-orange-600" />
                                </Button>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Building2 className="w-7 h-7 text-orange-600" />
                                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                        Restaurant Settings
                                    </h1>
                                </div>
                                <p className="text-gray-600 font-medium">
                                    {restaurantId ? `Managing: ${formData.name}` : 'Create your restaurant profile'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {restaurantId && (
                                <Button
                                    variant="outline"
                                    onClick={handleDeleteRestaurant}
                                    disabled={saving}
                                    className="border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            )}
                            {restaurantId && (
                                <Button
                                    variant="outline"
                                    onClick={handleNewRestaurant}
                                    className="border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500"
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add New
                                </Button>
                            )}
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg"
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
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto py-8 px-4 max-w-6xl">
                <Tabs defaultValue="general" className="space-y-6">
                    <TabsList className="bg-white shadow-md border-2 border-orange-100 p-1">
                        <TabsTrigger value="general" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">General</TabsTrigger>
                        <TabsTrigger value="delivery" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Delivery</TabsTrigger>
                        <TabsTrigger value="cuisine" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Cuisine & Tags</TabsTrigger>
                        <TabsTrigger value="hours" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Working Hours</TabsTrigger>
                        <TabsTrigger value="payment" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Payment</TabsTrigger>
                        {restaurantId && <TabsTrigger value="qr" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">QR Code</TabsTrigger>}
                    </TabsList>

                    {/* GENERAL TAB */}
                    <TabsContent value="general">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4 shadow-lg border-2 border-orange-100">
                                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                                    <CardTitle className="text-orange-700">Restaurant Profile</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Basic information visible to your customers.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-700 font-semibold">Restaurant Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleChange('root', 'name', e.target.value)}
                                            placeholder="Enter restaurant name"
                                            className="border-2 border-orange-200 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug" className="text-gray-700 font-semibold">Public URL Slug</Label>
                                        <Input
                                            id="slug"
                                            value={formData.slug}
                                            onChange={(e) => handleChange('root', 'slug', e.target.value)}
                                            placeholder="e.g., pizza-house-central"
                                            className="border-2 border-orange-200 focus:border-orange-500"
                                            disabled={!!restaurantId}
                                        />
                                        <p className="text-xs text-gray-500">The unique identifier for your menu URL. Cannot be changed after creation.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-gray-700 font-semibold">Description</Label>
                                        <Textarea
                                            id="description"
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => handleChange('root', 'description', e.target.value)}
                                            placeholder="Tell customers about your restaurant"
                                            className="border-2 border-orange-200 focus:border-orange-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-700 font-semibold">Contact Phone *</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('root', 'phone', e.target.value)}
                                            placeholder="+91 1234567890"
                                            className="border-2 border-orange-200 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="image" className="text-gray-700 font-semibold">Logo Image URL</Label>
                                            <Input
                                                id="image"
                                                value={formData.image}
                                                onChange={(e) => handleChange('root', 'image', e.target.value)}
                                                placeholder="https://example.com/logo.jpg"
                                                className="border-2 border-orange-200 focus:border-orange-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="coverImage" className="text-gray-700 font-semibold">Cover Image URL</Label>
                                            <Input
                                                id="coverImage"
                                                value={formData.coverImage}
                                                onChange={(e) => handleChange('root', 'coverImage', e.target.value)}
                                                placeholder="https://example.com/cover.jpg"
                                                className="border-2 border-orange-200 focus:border-orange-500"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-3 shadow-lg border-2 border-orange-100">
                                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                                    <CardTitle className="text-orange-700">Status & Location</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="flex items-center justify-between rounded-lg border-2 border-orange-200 p-4 bg-gradient-to-r from-orange-50 to-white">
                                        <div className="space-y-0.5">
                                            <Label className="text-base font-semibold text-gray-700">Online Status</Label>
                                            <div className="text-sm font-medium">
                                                {formData.isActive ? (
                                                    <span className="text-green-600 flex items-center gap-1">
                                                        <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                                                        Restaurant is Open
                                                    </span>
                                                ) : (
                                                    <span className="text-red-600 flex items-center gap-1">
                                                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                                        Restaurant is Closed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Switch
                                            checked={formData.isActive}
                                            onCheckedChange={(checked) => handleChange('root', 'isActive', checked)}
                                            className="data-[state=checked]:bg-orange-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-gray-700 font-semibold">Address *</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                                            <Input
                                                className="pl-9 mb-2 border-2 border-orange-200 focus:border-orange-500"
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
                                                className="border-2 border-orange-200 focus:border-orange-500"
                                                required
                                            />
                                            <Input
                                                placeholder="Zip Code"
                                                value={formData.address.zipCode}
                                                onChange={(e) => handleChange('address', 'zipCode', e.target.value)}
                                                className="border-2 border-orange-200 focus:border-orange-500"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* DELIVERY TAB */}
                    <TabsContent value="delivery">
                        <Card className="shadow-lg border-2 border-orange-100">
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                                <CardTitle className="text-orange-700">Delivery Configuration</CardTitle>
                                <CardDescription className="text-gray-600">Set your delivery fees and minimum order requirements.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-3 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="deliveryTime" className="text-gray-700 font-semibold">Estimated Delivery Time *</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                                        <Select
                                            value={formData.deliveryTime}
                                            onValueChange={(value) => handleChange('root', 'deliveryTime', value)}
                                        >
                                            <SelectTrigger className="pl-9 border-2 border-orange-200">
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="15-25 min">15-25 minutes</SelectItem>
                                                <SelectItem value="20-30 min">20-30 minutes</SelectItem>
                                                <SelectItem value="25-35 min">25-35 minutes</SelectItem>
                                                <SelectItem value="30-40 min">30-40 minutes</SelectItem>
                                                <SelectItem value="35-45 min">35-45 minutes</SelectItem>
                                                <SelectItem value="40-50 min">40-50 minutes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deliveryFee" className="text-gray-700 font-semibold">Delivery Fee (₹) *</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                                        <Input
                                            id="deliveryFee"
                                            type="number"
                                            className="pl-9 border-2 border-orange-200 focus:border-orange-500"
                                            value={formData.deliveryFee}
                                            onChange={(e) => handleChange('root', 'deliveryFee', Number(e.target.value))}
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="minOrder" className="text-gray-700 font-semibold">Minimum Order (₹) *</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                                        <Input
                                            id="minOrder"
                                            type="number"
                                            className="pl-9 border-2 border-orange-200 focus:border-orange-500"
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

                    {/* CUISINE & TAGS TAB */}
                    <TabsContent value="cuisine">
                        <Card className="shadow-lg border-2 border-orange-100">
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                                <CardTitle className="text-orange-700">Cuisine & Tags</CardTitle>
                                <CardDescription className="text-gray-600">Select the cuisines you serve and add relevant tags.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <div>
                                    <Label className="mb-4 block text-gray-700 font-semibold">Select Cuisines *</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {cuisineOptions.map((cuisine) => (
                                            <Button
                                                key={cuisine}
                                                type="button"
                                                variant={formData.cuisine.includes(cuisine) ? "default" : "outline"}
                                                className={`${formData.cuisine.includes(cuisine)
                                                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-md'
                                                        : 'border-2 border-orange-200 hover:bg-orange-50'
                                                    }`}
                                                onClick={() => handleCuisineToggle(cuisine)}
                                            >
                                                {cuisine}
                                            </Button>
                                        ))}
                                    </div>
                                    {formData.cuisine.length === 0 && (
                                        <p className="text-sm text-red-500 mt-2 font-medium">Please select at least one cuisine</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="tags" className="text-gray-700 font-semibold">Tags</Label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {formData.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="px-3 py-1 bg-orange-100 text-orange-700 border border-orange-300">
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
                                        className="border-2 border-orange-200 focus:border-orange-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Add tags like "Family Friendly", "Late Night", "Healthy Options", etc.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* HOURS TAB */}
                    <TabsContent value="hours">
                        <Card className="shadow-lg border-2 border-orange-100">
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                                <CardTitle className="text-orange-700">Operating Hours</CardTitle>
                                <CardDescription className="text-gray-600">Set the opening and closing times for each day of the week.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                                    <div key={day} className="grid grid-cols-3 items-center gap-4 border-b-2 border-orange-100 pb-4 last:border-0 last:pb-0">
                                        <Label className="capitalize font-semibold text-gray-700">{day}</Label>
                                        <div className="col-span-2 flex gap-4">
                                            <div className="grid w-full items-center gap-1.5">
                                                <Label htmlFor={`${day}-open`} className="text-xs text-gray-600 font-medium">Open</Label>
                                                <Input
                                                    id={`${day}-open`}
                                                    type="time"
                                                    value={formData.workingHours[day]?.open || ''}
                                                    onChange={(e) => handleChange('workingHours', day, { open: e.target.value })}
                                                    className="border-2 border-orange-200 focus:border-orange-500"
                                                />
                                            </div>
                                            <div className="grid w-full items-center gap-1.5">
                                                <Label htmlFor={`${day}-close`} className="text-xs text-gray-600 font-medium">Close</Label>
                                                <Input
                                                    id={`${day}-close`}
                                                    type="time"
                                                    value={formData.workingHours[day]?.close || ''}
                                                    onChange={(e) => handleChange('workingHours', day, { close: e.target.value })}
                                                    className="border-2 border-orange-200 focus:border-orange-500"
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
                        <Card className="shadow-lg border-2 border-orange-100">
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                                <CardTitle className="text-orange-700">Payment Settings</CardTitle>
                                <CardDescription className="text-gray-600">Configure your UPI ID for payments.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="upiId" className="text-gray-700 font-semibold">UPI ID</Label>
                                    <Input
                                        id="upiId"
                                        value={formData.upiId}
                                        onChange={(e) => handleChange('root', 'upiId', e.target.value)}
                                        placeholder="yourname@upi"
                                        className="border-2 border-orange-200 focus:border-orange-500"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Customers will pay to this UPI ID when ordering from your restaurant.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* QR CODE TAB */}
                    {restaurantId && (
                        <TabsContent value="qr">
                            <QrCodeSection
                                restaurantSlug={formData.slug}
                                restaurantName={formData.name}
                            />
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </div>
    );
}