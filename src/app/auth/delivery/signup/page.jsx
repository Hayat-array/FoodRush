'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, User, Mail, Lock, Phone, Camera, Bike, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function DeliverySignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        photo: '',
        bikeNumber: '',
        licenseNumber: '',
        address: '',
        emergencyContact: '',
        emergencyContactName: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match',
                variant: 'destructive',
            });
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast({
                title: 'Error',
                description: 'Password must be at least 6 characters',
                variant: 'destructive',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/delivery/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    avatar: formData.photo,
                    bikeNumber: formData.bikeNumber,
                    licenseNumber: formData.licenseNumber,
                    address: formData.address,
                    emergencyContact: formData.emergencyContact,
                    emergencyContactName: formData.emergencyContactName,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Success!',
                    description: 'Your delivery account has been created. Please sign in.',
                });
                router.push('/auth/delivery/login');
            } else {
                throw new Error(data.error || 'Signup failed');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to create account',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 px-4 py-8">
            <Card className="w-full max-w-2xl shadow-xl border-2 border-green-100">
                <CardHeader className="text-center bg-gradient-to-r from-green-50 to-teal-50">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bike className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                        Join as Delivery Partner
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Fill in your details to start delivering with us
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-700 border-b-2 border-green-200 pb-2">
                                Personal Information
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700 font-medium">
                                        Full Name *
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                                        Phone Number *
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+91 1234567890"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-medium">
                                    Email Address *
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-9 border-2 border-green-200 focus:border-green-500"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photo" className="text-gray-700 font-medium">
                                    Photo URL
                                </Label>
                                <div className="relative">
                                    <Camera className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                    <Input
                                        id="photo"
                                        name="photo"
                                        type="url"
                                        placeholder="https://example.com/photo.jpg"
                                        className="pl-9 border-2 border-green-200 focus:border-green-500"
                                        value={formData.photo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Upload your photo and paste the URL here</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-gray-700 font-medium">
                                    Address *
                                </Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                    <Textarea
                                        id="address"
                                        name="address"
                                        placeholder="Enter your full address"
                                        className="pl-9 border-2 border-green-200 focus:border-green-500 min-h-[80px]"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-700 border-b-2 border-green-200 pb-2">
                                Vehicle Information
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bikeNumber" className="text-gray-700 font-medium">
                                        Bike/Vehicle Number *
                                    </Label>
                                    <div className="relative">
                                        <Bike className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="bikeNumber"
                                            name="bikeNumber"
                                            type="text"
                                            placeholder="MH-01-AB-1234"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500 uppercase"
                                            value={formData.bikeNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="licenseNumber" className="text-gray-700 font-medium">
                                        Driving License Number *
                                    </Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="licenseNumber"
                                            name="licenseNumber"
                                            type="text"
                                            placeholder="DL-1234567890"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500 uppercase"
                                            value={formData.licenseNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-700 border-b-2 border-green-200 pb-2">
                                Emergency Contact
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="emergencyContactName" className="text-gray-700 font-medium">
                                        Contact Name *
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="emergencyContactName"
                                            name="emergencyContactName"
                                            type="text"
                                            placeholder="Emergency contact name"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500"
                                            value={formData.emergencyContactName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="emergencyContact" className="text-gray-700 font-medium">
                                        Contact Number *
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="emergencyContact"
                                            name="emergencyContact"
                                            type="tel"
                                            placeholder="+91 9876543210"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Security */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-700 border-b-2 border-green-200 pb-2">
                                Account Security
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 font-medium">
                                        Password *
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Minimum 6 characters"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                                        Confirm Password *
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Re-enter password"
                                            className="pl-9 border-2 border-green-200 focus:border-green-500"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-6 text-lg font-semibold shadow-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                'Sign Up as Delivery Partner'
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-2 text-center border-t pt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/signin" className="text-green-600 hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                    <p className="text-xs text-gray-500">
                        By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}