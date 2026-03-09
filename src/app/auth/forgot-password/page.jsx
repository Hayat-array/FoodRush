'use client';

import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            toast({
                title: "Reset link sent",
                description: "If an account exists with this email, you will receive a password reset link.",
            });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Forgot password?</CardTitle>
                    <CardDescription>
                        No worries, we'll send you reset instructions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                {loading ? 'Sending...' : 'Reset password'}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm">
                                Check your email for the password reset link.
                            </div>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setSubmitted(false)}
                            >
                                Resend email
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/auth/signin" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to log in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
