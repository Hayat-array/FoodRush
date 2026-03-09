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

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/admin/signin");
        } else if (status === "authenticated" && session?.user?.role === 'super_admin') {
            router.push("/admin/dashboard");
        }
    }, [status, session, router]);

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

    const adminCards = [
        {
            title: "Restaurant Management",
            description: "Manage your restaurant details, hours, and information",
            icon: Building2,
            href: "/admin/restaurant",
            color: "bg-blue-500",
            hoverColor: "hover:bg-blue-600"
        },
        {
            title: "Menu Management",
            description: "Add, edit, or remove menu items and categories",
            icon: UtensilsCrossed,
            href: "/admin/menu",
            color: "bg-green-500",
            hoverColor: "hover:bg-green-600"
        },
        {
            title: "Orders",
            description: "View and manage incoming orders in real-time",
            icon: ShoppingBag,
            href: "/admin/orders",
            color: "bg-orange-500",
            hoverColor: "hover:bg-orange-600"
        },
        {
            title: "Profile",
            description: "Manage your admin profile and account settings",
            icon: Users,
            href: "/admin/profile",
            color: "bg-purple-500",
            hoverColor: "hover:bg-purple-600"
        },
        {
            title: "Settings",
            description: "Configure restaurant settings and preferences",
            icon: Settings,
            href: "/admin/settings",
            color: "bg-gray-500",
            hoverColor: "hover:bg-gray-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                                <p className="text-sm text-gray-600">
                                    Welcome back, {session?.user?.name || "Admin"}
                                </p>
                            </div>
                        </div>
                        <Link href="/">
                            <Button variant="outline" className="gap-2">
                                <ArrowRight className="w-4 h-4 rotate-180" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Quick Access</h2>
                    <p className="text-gray-600">Select a section to manage your restaurant</p>
                </div>

                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminCards.map((card, index) => {
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

                {/* Quick Stats Section (Optional) */}
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
