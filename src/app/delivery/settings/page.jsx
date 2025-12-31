'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Bell, Shield, User, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import DeliveryNavbar from '@/components/DeliveryNavbar';

export default function DeliverySettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        name: '',
        phone: '',
        isAvailable: true,
        notifications: {
            newOrders: true,
            orderUpdates: true,
            earnings: false
        }
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/delivery/login');
            return;
        }

        if (status === 'authenticated') {
            const role = session?.user?.role;
            if (role !== 'delivery') {
                router.push('/');
                return;
            }

            setSettings(prev => ({
                ...prev,
                name: session.user.name || '',
                phone: session.user.phone || ''
            }));
        }
    }, [status, session, router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            // TODO: Implement API to save delivery partner settings
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            toast({
                title: "Settings Saved",
                description: "Your preferences have been updated successfully.",
                className: "bg-green-600 text-white border-none"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save settings. Please try again.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (status === 'loading') {
        return (
            <>
                <DeliveryNavbar />
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            </>
        );
    }

    return (
        <>
            <DeliveryNavbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-500">Manage your delivery partner preferences</p>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Profile Information
                                </CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={settings.name}
                                        onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={settings.phone}
                                        onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Availability */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    Availability
                                </CardTitle>
                                <CardDescription>Control when you receive delivery requests</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <Label className="text-base font-medium">Available for Deliveries</Label>
                                        <p className="text-sm text-gray-500">
                                            {settings.isAvailable ? "You are currently accepting orders" : "You are offline"}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.isAvailable}
                                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, isAvailable: checked }))}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-blue-600" />
                                    Notifications
                                </CardTitle>
                                <CardDescription>Choose what notifications you want to receive</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <Label className="font-medium">New Order Alerts</Label>
                                        <p className="text-sm text-gray-500">Get notified when new orders are available</p>
                                    </div>
                                    <Switch
                                        checked={settings.notifications.newOrders}
                                        onCheckedChange={(checked) =>
                                            setSettings(prev => ({
                                                ...prev,
                                                notifications: { ...prev.notifications, newOrders: checked }
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <Label className="font-medium">Order Updates</Label>
                                        <p className="text-sm text-gray-500">Updates about your active deliveries</p>
                                    </div>
                                    <Switch
                                        checked={settings.notifications.orderUpdates}
                                        onCheckedChange={(checked) =>
                                            setSettings(prev => ({
                                                ...prev,
                                                notifications: { ...prev.notifications, orderUpdates: checked }
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <Label className="font-medium">Earnings Summary</Label>
                                        <p className="text-sm text-gray-500">Daily and weekly earnings reports</p>
                                    </div>
                                    <Switch
                                        checked={settings.notifications.earnings}
                                        onCheckedChange={(checked) =>
                                            setSettings(prev => ({
                                                ...prev,
                                                notifications: { ...prev.notifications, earnings: checked }
                                            }))
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
