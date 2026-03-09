'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Store, ShoppingBag, Users, Settings,
    Truck, History, DollarSign, Heart, User, LogOut,
    Shield, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const roleConfig = {
    super_admin: {
        label: 'Super Admin',
        badge: 'bg-gradient-to-r from-purple-600 to-red-600',
        theme: 'from-purple-50 to-red-50',
        links: [
            { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/admin/restaurants', label: 'All Restaurants', icon: Store },
            { href: '/admin/orders', label: 'All Orders', icon: ShoppingBag },
            { href: '/admin/users', label: 'Users', icon: Users },
            { href: '/admin/settings', label: 'Settings', icon: Settings },
        ]
    },
    restaurant_owner: {
        label: 'Restaurant Owner',
        badge: 'bg-gradient-to-r from-orange-600 to-red-600',
        theme: 'from-orange-50 to-red-50',
        links: [
            { href: '/restaurant/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/restaurant/settings', label: 'My Restaurant', icon: Store },
            { href: '/restaurant/menu', label: 'Menu', icon: Package },
            { href: '/restaurant/orders', label: 'Orders', icon: ShoppingBag },
            { href: '/restaurant/profile', label: 'Profile', icon: User },
        ]
    },
    delivery: {
        label: 'Delivery Partner',
        badge: 'bg-gradient-to-r from-green-600 to-teal-600',
        theme: 'from-green-50 to-teal-50',
        links: [
            { href: '/delivery/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/delivery/active', label: 'Active Deliveries', icon: Truck },
            { href: '/delivery/history', label: 'History', icon: History },
            { href: '/delivery/earnings', label: 'Earnings', icon: DollarSign },
            { href: '/delivery/profile', label: 'Profile', icon: User },
        ]
    },
    user: {
        label: 'Customer',
        badge: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        theme: 'from-blue-50 to-indigo-50',
        links: [
            { href: '/', label: 'Home', icon: LayoutDashboard },
            { href: '/user/orders', label: 'My Orders', icon: ShoppingBag },
            { href: '/user/favorites', label: 'Favorites', icon: Heart },
            { href: '/user/profile', label: 'Profile', icon: User },
        ]
    }
};

export default function RoleBasedNav() {
    const { data: session } = useSession();
    const pathname = usePathname();

    if (!session?.user?.role) return null;

    const role = session.user.role;
    const config = roleConfig[role] || roleConfig.user;

    return (
        <nav className={`bg-gradient-to-r ${config.theme} border-b-4 border-opacity-50 shadow-md`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo & Role Badge */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold text-gray-800">
                            FoodResto
                        </Link>
                        <Badge className={`${config.badge} text-white px-3 py-1`}>
                            <Shield className="w-3 h-3 mr-1" />
                            {config.label}
                        </Badge>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-2">
                        {config.links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;

                            return (
                                <Link key={link.href} href={link.href}>
                                    <Button
                                        variant={isActive ? 'default' : 'ghost'}
                                        className={isActive ? config.badge + ' text-white' : 'hover:bg-white/50'}
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {link.label}
                                    </Button>
                                </Link>
                            );
                        })}

                        {/* Logout Button */}
                        <Button
                            variant="outline"
                            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                            className="border-red-400 text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>

                    {/* Mobile Menu - Simple for now */}
                    <div className="md:hidden">
                        <Button
                            variant="outline"
                            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                            size="sm"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* User Info */}
                <div className="mt-2 text-sm text-gray-600">
                    Welcome, <span className="font-semibold">{session.user.name}</span>
                </div>
            </div>
        </nav>
    );
}
