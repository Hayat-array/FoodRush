'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    Settings, Users, Store, Clock, ShoppingBag, Truck, CreditCard,
    Tag, UserCheck, Star, Bell, BarChart3, Wrench, Shield, Zap,
    Save, Loader2, ChevronRight, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsOverviewPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
            return;
        }

        if (status === 'authenticated') {
            if (!['admin', 'super_admin', 'manager'].includes(session?.user?.role)) {
                router.push('/');
                return;
            }
            fetchSettings();
        }
    }, [status, session, router]);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            toast({
                title: "Error",
                description: "Failed to load settings",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const settingsSections = [
        {
            id: 'staff',
            name: 'Staff Management',
            icon: Users,
            description: 'Manage team members, roles & permissions',
            color: 'bg-blue-500',
            stats: `${settings?.staff?.length || 0} members`
        },
        {
            id: 'profile',
            name: 'Restaurant Profile',
            icon: Store,
            description: 'Update restaurant info, logo & contact',
            color: 'bg-purple-500',
            stats: settings?.profile?.name || 'Not configured'
        },
        {
            id: 'availability',
            name: 'Opening Hours',
            icon: Clock,
            description: 'Set schedule, holidays & temporary close',
            color: 'bg-green-500',
            stats: settings?.availability?.temporaryClosed?.isActive ? 'Closed' : 'Open'
        },
        {
            id: 'menu',
            name: 'Menu Settings',
            icon: ShoppingBag,
            description: 'Configure menu display & availability',
            color: 'bg-orange-500',
            stats: 'Active'
        },
        {
            id: 'delivery',
            name: 'Delivery Settings',
            icon: Truck,
            description: 'Delivery zones, charges & timing',
            color: 'bg-indigo-500',
            stats: `${settings?.delivery?.radius || 5}km radius`
        },
        {
            id: 'payment',
            name: 'Payment Settings',
            icon: CreditCard,
            description: 'Payment methods & gateway config',
            color: 'bg-pink-500',
            stats: settings?.payment?.cod?.enabled ? 'COD Enabled' : 'Online Only'
        },
        {
            id: 'coupons',
            name: 'Offers & Coupons',
            icon: Tag,
            description: 'Manage promotional offers & discounts',
            color: 'bg-yellow-500',
            stats: `${settings?.coupons?.length || 0} active`
        },
        {
            id: 'customers',
            name: 'Customer Management',
            icon: UserCheck,
            description: 'Customer settings & loyalty program',
            color: 'bg-teal-500',
            stats: settings?.customerSettings?.loyaltyProgram?.enabled ? 'Loyalty ON' : 'Loyalty OFF'
        },
        {
            id: 'reviews',
            name: 'Reviews & Ratings',
            icon: Star,
            description: 'Review moderation & admin replies',
            color: 'bg-amber-500',
            stats: settings?.reviewSettings?.requireModeration ? 'Moderated' : 'Auto-publish'
        },
        {
            id: 'notifications',
            name: 'Notifications',
            icon: Bell,
            description: 'Alert settings & notification channels',
            color: 'bg-red-500',
            stats: settings?.notifications?.newOrder?.sound ? 'Sound ON' : 'Sound OFF'
        },
        {
            id: 'reports',
            name: 'Reports & Analytics',
            icon: BarChart3,
            description: 'Analytics config & report scheduling',
            color: 'bg-cyan-500',
            stats: settings?.analytics?.trackingEnabled ? 'Tracking ON' : 'Tracking OFF'
        },
        {
            id: 'system',
            name: 'System Settings',
            icon: Wrench,
            description: 'Tax, currency & maintenance mode',
            color: 'bg-gray-500',
            stats: `${settings?.system?.tax?.gst || 5}% GST`
        },
        {
            id: 'security',
            name: 'Security Settings',
            icon: Shield,
            description: 'Security & access control',
            color: 'bg-rose-500',
            stats: settings?.security?.twoFactorAuth ? '2FA Enabled' : '2FA Disabled'
        },
        {
            id: 'advanced',
            name: 'Advanced Features',
            icon: Zap,
            description: 'Smart features & integrations',
            color: 'bg-violet-500',
            stats: settings?.advanced?.qrMenu?.enabled ? 'QR Menu ON' : 'Basic'
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Settings className="w-8 h-8 text-orange-600" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Restaurant Settings</h1>
                                    <p className="text-gray-600">Complete control over your restaurant</p>
                                </div>
                            </div>
                            {settings?.profile?.name && (
                                <Badge variant="outline" className="mt-2">
                                    <Store className="w-3 h-3 mr-1" />
                                    {settings.profile.name}
                                </Badge>
                            )}
                        </div>
                        <Button
                            onClick={() => router.push('/admin/dashboard')}
                            variant="outline"
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm">Staff Members</p>
                                    <p className="text-3xl font-bold">{settings?.staff?.length || 0}</p>
                                </div>
                                <Users className="w-12 h-12 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm">Restaurant Status</p>
                                    <p className="text-xl font-bold">
                                        {settings?.availability?.temporaryClosed?.isActive ? 'Closed' : 'Open'}
                                    </p>
                                </div>
                                <Clock className="w-12 h-12 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm">Active Coupons</p>
                                    <p className="text-3xl font-bold">{settings?.coupons?.length || 0}</p>
                                </div>
                                <Tag className="w-12 h-12 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-sm">Delivery Radius</p>
                                    <p className="text-3xl font-bold">{settings?.delivery?.radius || 5} km</p>
                                </div>
                                <Truck className="w-12 h-12 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Card
                                key={section.id}
                                className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-orange-300"
                                onClick={() => router.push(`/admin/settings/${section.id}`)}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 ${section.color} rounded-xl text-white group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                                                    {section.name}
                                                </CardTitle>
                                                <Badge variant="secondary" className="mt-1 text-xs">
                                                    {section.stats}
                                                </Badge>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm">
                                        {section.description}
                                    </CardDescription>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Configured</span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <Card className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-orange-600" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button
                                variant="outline"
                                className="h-auto py-4 flex-col gap-2"
                                onClick={() => router.push('/admin/settings/staff')}
                            >
                                <Users className="w-6 h-6" />
                                <span>Add Staff</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto py-4 flex-col gap-2"
                                onClick={() => router.push('/admin/settings/coupons')}
                            >
                                <Tag className="w-6 h-6" />
                                <span>Create Coupon</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto py-4 flex-col gap-2"
                                onClick={() => router.push('/admin/settings/availability')}
                            >
                                <Clock className="w-6 h-6" />
                                <span>Set Hours</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto py-4 flex-col gap-2"
                                onClick={() => router.push('/admin/settings/reports')}
                            >
                                <BarChart3 className="w-6 h-6" />
                                <span>View Reports</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
