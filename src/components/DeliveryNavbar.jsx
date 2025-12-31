'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Home, User, Settings, LogOut, ChevronDown, Menu, Package, Truck
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription
} from '@/components/ui/sheet';

export default function DeliveryNavbar() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/auth/delivery/login');
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { icon: Package, label: 'Dashboard', href: '/delivery/dashboard' },
        { icon: User, label: 'Profile', href: '/delivery/profile' },
    ];

    const dropdownItems = [
        { icon: User, label: 'My Profile', href: '/delivery/profile' },
        { icon: Settings, label: 'Settings', href: '/delivery/settings' },
    ];

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">

                    {/* LOGO */}
                    <Link href="/delivery/dashboard" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Truck className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Delivery
                            </span>
                            <span className="text-gray-700"> Portal</span>
                        </span>
                    </Link>

                    {/* DESKTOP NAV LINKS */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </Link>
                        ))}

                        {/* USER MENU */}
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center space-x-2 px-2 hover:bg-blue-50">
                                        <AvatarImageWrapper src={session.user.image} name={session.user.name} />
                                        <span className="hidden lg:block text-sm font-medium">{session.user.name}</span>
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="px-2 py-1.5 text-sm font-medium border-b bg-gray-50">
                                        <p className="truncate">{session.user.name}</p>
                                        <p className="text-xs text-gray-500 truncate font-normal">{session.user.email}</p>
                                        <Badge variant="outline" className="mt-1 text-blue-600 border-blue-200 bg-blue-50 text-[10px]">
                                            Delivery Partner
                                        </Badge>
                                    </div>

                                    <div className="p-1">
                                        {dropdownItems.map((item) => (
                                            <DropdownMenuItem key={item.href} asChild>
                                                <Link href={item.href} className="cursor-pointer w-full flex items-center">
                                                    <item.icon className="w-4 h-4 mr-2" />
                                                    {item.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleSignOut}
                                            className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/auth/delivery/login">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* MOBILE MENU TRIGGER */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
                            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                            <SheetDescription className="sr-only">Delivery partner navigation menu</SheetDescription>

                            <div className="flex items-center justify-between p-4 border-b">
                                <span className="font-bold text-lg">Menu</span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                {/* Main Links Mobile */}
                                <div className="space-y-1">
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <item.icon className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>

                                {/* User Section Mobile */}
                                <div className="mt-6 pt-6 border-t">
                                    {session ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center px-3 space-x-3">
                                                <AvatarImageWrapper src={session.user.image} name={session.user.name} size={40} />
                                                <div className="overflow-hidden">
                                                    <p className="font-medium truncate">{session.user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                {dropdownItems.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <item.icon className="w-4 h-4 text-gray-500" />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                ))}

                                                <button
                                                    onClick={handleSignOut}
                                                    className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 text-sm mt-2 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link href="/auth/delivery/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}

// Helper component for Avatar
function AvatarImageWrapper({ src, name, size = 32 }) {
    if (src) {
        return (
            <Image
                src={src}
                alt={name || 'User'}
                width={size}
                height={size}
                className="rounded-full border border-gray-200"
            />
        );
    }
    return (
        <div
            className="bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold"
            style={{ width: size, height: size }}
        >
            {name?.charAt(0) || <User className="w-4 h-4" />}
        </div>
    );
}
