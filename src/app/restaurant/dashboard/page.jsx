"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Building2,
    ShoppingBag,
    Users,
    Settings,
    UtensilsCrossed,
    LayoutDashboard,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleBasedNav from "@/components/RoleBasedNav";

export default function RestaurantDashboard() {
    return (
        <ProtectedRoute allowedRoles={['restaurant_owner']}>
            <RestaurantDashboardContent />
        </ProtectedRoute>
    );
}

function RestaurantDashboardContent() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const restaurantCards = [
        {
            title: "Restaurant Management",
            description: "Manage your restaurant details, hours, and information",
            icon: Building2,
            href: "/restaurant/settings",
            color: "bg-blue-500",
            hoverColor: "hover:bg-blue-600"
        },
        {
            title: "Menu Management",
            description: "Add, edit, or remove menu items and categories",
            icon: UtensilsCrossed,
            href: "/restaurant/menu",
            color: "bg-green-500",
            hoverColor: "hover:bg-green-600"
        },
        {
            title: "Orders",
            description: "View and manage incoming orders in real-time",
            icon: ShoppingBag,
            href: "/restaurant/orders",
            color: "bg-orange-500",
            hoverColor: "hover:bg-orange-600"
        },
        {
            title: "Profile",
            description: "Manage your profile and account settings",
            icon: Users,
            href: "/restaurant/profile",
            color: "bg-purple-500",
            hoverColor: "hover:bg-purple-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <RoleBasedNav />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                        Restaurant Owner Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Welcome back, {session?.user?.name || "Restaurant Owner"}
                    </p>
                </div>

                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurantCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <Link key={index} href={card.href}>
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300 cursor-pointer group">
                                    <CardHeader>
                                        <div className={`w-14 h-14 ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <CardTitle className="text-xl font-bold group-hover:text-orange-600 transition-colors">
                                            {card.title}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">
                                            {card.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            className={`w-full ${card.color} ${card.hoverColor} text-white gap-2`}
                                        >
                                            Open
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Stats Section */}
                <div className="mt-12">
                    <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">Need Help?</CardTitle>
                            <CardDescription className="text-orange-100">
                                Check out our documentation or contact support for assistance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Button variant="secondary" className="gap-2">
                                    View Documentation
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-orange-600">
                                    Contact Support
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
