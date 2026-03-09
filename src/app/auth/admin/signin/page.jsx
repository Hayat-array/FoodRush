"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";



function AdminSignInContent() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const isSuperAdmin = searchParams.get('type') === 'super_admin';

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            toast({
                title: "Welcome back!",
                description: "Redirecting to dashboard...",
                className: "bg-green-600 text-white",
            });

            // Redirect happens automatically in middleware or we can force it here
            // But let's check the role from profile API if we want to be sure, 
            // or just let them go to the default landing which redirects.
            // For now, push to generic admin which redirects.
            router.push("/admin");
            router.refresh();
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.message || "Invalid email or password",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className={`text-center text-white rounded-t-lg ${isSuperAdmin ? 'bg-purple-900' : 'bg-orange-600'}`}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <Building2 className={`w-8 h-8 ${isSuperAdmin ? 'text-purple-900' : 'text-orange-600'}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {isSuperAdmin ? "Super Admin Portal" : "Restaurant Admin"}
                    </CardTitle>
                    <CardDescription className="text-orange-100 opacity-90">
                        {isSuperAdmin ? "Platform Master Control" : "Manage your restaurant"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="pl-9"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="pl-9"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <Link href="/auth/forgot-password" className="text-orange-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an admin account?{" "}
                        <Link href="/auth/admin/signup" className="text-orange-600 hover:underline font-medium">
                            Register here
                        </Link>
                    </p>
                    <p className="text-xs text-gray-500">
                        {isSuperAdmin ? (
                            <Link href="/auth/admin/signin" className="text-blue-600 hover:underline">
                                Not Super Admin? Login as Restaurant
                            </Link>
                        ) : (
                            <Link href="/auth/admin/signin?type=super_admin" className="text-purple-600 hover:underline">
                                Access Super Admin Portal
                            </Link>
                        )}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function AdminSignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50" />}>
            <AdminSignInContent />
        </Suspense>
    );
}
