"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home, Store, Package, Heart, User, Settings, Clock,
  ShoppingCart, Search, Menu, LogOut, ChevronDown, LayoutDashboard
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";

import { useCartStore } from "@/stores/cartStore";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Safe Zustand selector
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe calculation for cart count
  const cartCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  // --- ROLE BASED LOGIC ---
  const role = session?.user?.role;
  const isAdminOrOwner = role === 'admin' || role === 'restaurant_owner';

  // 1. Common Links (Everyone sees these)
  const commonLinks = [
    { icon: Home, label: "Home", href: "/" },
  ];

  // 2. User-Only Links
  const userLinks = [
    { icon: Store, label: "Restaurants", href: "/restaurant" },
    { icon: Store, label: "Menu", href: "/menu" },
    { icon: Heart, label: "Favorites", href: "/favoritesU" },
    { icon: Package, label: "My Orders", href: "/ordersU" },
  ];

  // 3. Admin-Only Links
  const adminLinks = [
    { icon: Store, label: "Restaurants", href: "/restaurant" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/restaurant" },
    { icon: Store, label: "Menu", href: "/admin/menu" },
    { icon: Package, label: "Manage Orders", href: "/admin/orders" },
  ];

  // Determine which menu to show
  const activeMenuItems = isAdminOrOwner
    ? [...commonLinks, ...adminLinks]
    : [...commonLinks, ...userLinks];

  // Dropdown Items based on Role
  const dropdownItems = isAdminOrOwner
    ? [
      { icon: User, label: "Admin Profile", href: "/admin/profile" },
      { icon: Settings, label: "Restaurant Settings", href: "/admin/settings" },
    ]
    : [
      { icon: User, label: "Profile", href: "/profileU" },
      { icon: Settings, label: "Settings", href: "/settingsU" },
      { icon: Clock, label: "Order History", href: "/ordersU" },
    ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FR</span>
            </div>
            <span className="text-xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodRush
            </span>
          </Link>

          {/* SEARCH BAR (Hide for Admin) */}
          {!isAdminOrOwner && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for restaurants, dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full bg-gray-50 focus:bg-white transition-colors"
                />
              </form>
            </div>
          )}

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-6">
            {activeMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* CART (Hide for Admin) */}
            {!isAdminOrOwner && (
              <Link href="/cartU" className="relative group">
                <div className="p-2 rounded-full hover:bg-orange-50 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                  {mounted && cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] h-5 min-w-[1.25rem] flex items-center justify-center px-1 border-2 border-white">
                      {cartCount}
                    </Badge>
                  )}
                </div>
              </Link>
            )}

            {/* USER MENU */}
            {status === "loading" ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2 hover:bg-orange-50">
                    <AvatarImageWrapper src={session.user.image} name={session.user.name} />
                    <span className="hidden lg:block text-sm font-medium">{session.user.name}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium border-b bg-gray-50">
                    <p className="truncate">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate font-normal">{session.user.email}</p>
                    {/* Show Role Badge */}
                    {isAdminOrOwner && (
                      <Badge variant="outline" className="mt-1 text-orange-600 border-orange-200 bg-orange-50 text-[10px]">
                        {role === 'admin' ? 'Admin' : 'Restaurant Owner'}
                      </Badge>
                    )}
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
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
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
              <SheetDescription className="sr-only">Main menu for mobile users</SheetDescription>

              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg">Menu</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {/* Mobile Search (Hide for Admin) */}
                {!isAdminOrOwner && (
                  <form onSubmit={handleSearch} className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </form>
                )}

                {/* Main Links Mobile */}
                <div className="space-y-1">
                  {activeMenuItems.map((item) => (
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

                  {/* Cart Mobile (Hide for Admin) */}
                  {!isAdminOrOwner && (
                    <Link
                      href="/cartU"
                      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <ShoppingCart className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">Cart</span>
                      </div>
                      {mounted && cartCount > 0 && (
                        <Badge className="bg-orange-600 text-white hover:bg-orange-700">
                          {cartCount}
                        </Badge>
                      )}
                    </Link>
                  )}
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
                    <div className="grid grid-cols-2 gap-3 px-1">
                      <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">Sign Up</Button>
                      </Link>
                    </div>
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
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full border border-gray-200"
      />
    );
  }
  return (
    <div
      className="bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold"
      style={{ width: size, height: size }}
    >
      {name?.charAt(0) || <User className="w-4 h-4" />}
    </div>
  );
}