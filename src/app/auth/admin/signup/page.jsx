"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, User, Mail, Phone, Lock, Building2, Key, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

function AdminSignUpContent() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();

    // Toggle state base on URL or manual switch
    const [isSuperAdmin, setIsSuperAdmin] = useState(searchParams.get('type') === 'super_admin');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        restaurantName: "",
        password: "",
        // Super Admin Specific Fields
        adminKey: "",
        adminSecretName: "",
        dob: ""
    });

    const toggleMode = () => {
        setIsSuperAdmin(!isSuperAdmin);
        // Clear specialized fields when switching
        setFormData(prev => ({
            ...prev,
            adminKey: "",
            adminSecretName: "",
            dob: "",
            restaurantName: ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Basic Frontend Validation for Age
            if (isSuperAdmin && formData.dob) {
                const birthDate = new Date(formData.dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    throw new Error("You must be at least 18 years old to be a Super Admin.");
                }
            }

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    role: isSuperAdmin ? "super_admin" : "restaurant_owner",
                }),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            toast({
                title: isSuperAdmin ? "Super Admin Account Created!" : "Restaurant Admin Created!",
                description: "You can now sign in with your credentials.",
                className: "bg-green-600 text-white",
            });

            // Redirect to the correct login view
            router.push(isSuperAdmin ? "/auth/admin/signin?type=super_admin" : "/auth/admin/signin");

        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${isSuperAdmin ? 'bg-gradient-to-br from-purple-50 to-indigo-50' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-transparent">
                <CardHeader className={`text-center text-white rounded-t-lg ${isSuperAdmin ? 'bg-purple-900' : 'bg-orange-600'}`}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                        {isSuperAdmin ? (
                            <ShieldCheck className="w-8 h-8 text-purple-900" />
                        ) : (
                            <Building2 className="w-8 h-8 text-orange-600" />
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {isSuperAdmin ? "Super Admin Registration" : "Partner Registration"}
                    </CardTitle>
                    <CardDescription className="text-orange-100 opacity-90">
                        {isSuperAdmin ? "Secure Platform Access" : "Create your restaurant admin account"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Full Name"
                                className="pl-9"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
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
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                className="pl-9"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>

                        {/* CONDITIONAL FIELDS */}
                        {isSuperAdmin ? (
                            <>
                                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 space-y-4">
                                    <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">Security Verification</p>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                                        <Input
                                            type="password"
                                            placeholder="Admin Security Key"
                                            className="pl-9 border-purple-200 focus:border-purple-500"
                                            value={formData.adminKey}
                                            onChange={(e) => setFormData({ ...formData, adminKey: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                                        <Input
                                            placeholder="Secret Authority Name"
                                            className="pl-9 border-purple-200 focus:border-purple-500"
                                            value={formData.adminSecretName}
                                            onChange={(e) => setFormData({ ...formData, adminSecretName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                                        <Input
                                            type="date"
                                            placeholder="Date of Birth"
                                            className="pl-9 border-purple-200 focus:border-purple-500"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                            required
                                        />
                                        <p className="text-[10px] text-purple-600 mt-1 ml-1">*Must be 18+ years old</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Restaurant Name (Optional)"
                                    className="pl-9"
                                    value={formData.restaurantName}
                                    onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                type="password"
                                placeholder="Create Password (min 6 chars)"
                                className="pl-9"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>

                        <Button
                            type="submit"
                            className={`w-full text-white font-semibold transition-colors ${isSuperAdmin ? 'bg-purple-800 hover:bg-purple-900' : 'bg-orange-600 hover:bg-orange-700'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                isSuperAdmin ? "Register as Super Admin" : "Create Restaurant Admin"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an admin account?{" "}
                        <Link href="/auth/admin/signin" className="text-orange-600 hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>

                    <button
                        type="button"
                        onClick={toggleMode}
                        className={`text-xs hover:underline font-medium mt-2 ${isSuperAdmin ? 'text-orange-600' : 'text-purple-600'}`}
                    >
                        {isSuperAdmin ? "Not a Super Admin? Register as Restaurant Owner" : "Super Admin? Switch to Secure Registration"}
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function AdminSignUpPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50" />}>
            <AdminSignUpContent />
        </Suspense>
    );
}
