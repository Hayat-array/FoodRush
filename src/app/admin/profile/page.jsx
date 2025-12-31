'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Mail, Save, Zap, LogOut, Loader2, RefreshCcw, Briefcase, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Assuming you have a reusable QR Code component available in your components folder
// If you want the full QR generation code here, let me know.
// For now, we will link to the dedicated QR page.
import { QrCodeSection } from '@/components/QrCodeSection'; // Placeholder import

export default function AdminProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();

    // Initial state derived from session (read-only for display)
    const [name, setName] = useState(session?.user?.name || '');
    const [email] = useState(session?.user?.email || '');
    
    // State for loading (fetching/saving data)
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // State for a specific item (e.g., the associated restaurant's public slug/ID)
    const [restaurantSlug, setRestaurantSlug] = useState(null); 
    const [restaurantId, setRestaurantId] = useState(null); 

    // --- Authentication and Initial Data Fetch (for linked restaurant data) ---
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        if (status === 'authenticated') {
            // Role-based access control
            const role = session?.user?.role;
            if (role !== 'admin' && role !== 'restaurant_owner') {
                console.warn('Unauthorized access attempt to admin profile');
                router.push('/'); // Redirect non-admins to home
                return;
            }
            
            setName(session.user.name || '');
            // Fetch the linked restaurant data (slug is needed for the QR code)
            fetchLinkedRestaurant();
        }
    }, [status, session, router]);

    const fetchLinkedRestaurant = async () => {
        setLoading(true);
        try {
            // Reuses the Admin GET API, which is designed to fetch the owner's restaurant
            const res = await fetch('/api/admin/restaurant'); 
            const data = await res.json();
            
            if (data.success && data.data && data.data.length > 0) {
                const restaurant = data.data[0];
                setRestaurantSlug(restaurant.slug);
                setRestaurantId(restaurant._id);
            }
        } catch (error) {
            console.error("Failed to load linked restaurant data:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Handler to Update User Name (Example PUT Request to a hypothetical user API) ---
    const handleUpdateProfile = async () => {
        if (!name) {
            toast({ title: "Error", description: "Name cannot be empty.", variant: "destructive" });
            return;
        }
        
        setSaving(true);
        try {
            // In a real app, this would hit a PUT /api/user/profile route
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (!res.ok) throw new Error("Failed to update user profile.");

            toast({ title: "Success", description: "Profile updated successfully.", className: "bg-green-50" });
            // Note: In NextAuth, you usually need to refresh the session manually after a local update
        } catch (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/auth/signin');
    };
    
    if (status === 'loading' || loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <User className="h-6 w-6 text-orange-500" /> Admin Profile
                </h1>
                <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* --- 1. User Account Details Card --- */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                        <CardDescription>Update your personal information and view your role.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="role" className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> Role
                            </Label>
                            <Badge className="text-lg bg-indigo-600 hover:bg-indigo-700 capitalize">
                                {session.user.role.replace('_', ' ')}
                            </Badge>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4" /> Full Name
                            </Label>
                            <Input 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Email (Login ID)
                            </Label>
                            <Input id="email" value={email} disabled />
                        </div>
                        
                        <Button 
                            onClick={handleUpdateProfile} 
                            disabled={saving || name === session.user.name}
                            className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                            {saving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Save Name
                        </Button>
                    </CardContent>
                </Card>

                {/* --- 2. Quick Actions & Settings Links Card --- */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Access</CardTitle>
                        <CardDescription>Essential settings and links for your restaurant operations.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button 
                            variant="outline" 
                            className="w-full justify-start text-left h-12 text-lg"
                            onClick={() => router.push('/admin/orders')}
                        >
                            <RefreshCcw className="mr-3 h-5 w-5" /> Manage Orders
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full justify-start text-left h-12 text-lg"
                            onClick={() => router.push('/admin/restaurant')}
                        >
                            <Settings className="mr-3 h-5 w-5" /> Restaurant Settings
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full justify-start text-left h-12 text-lg"
                            onClick={() => router.push('/admin/dishes')}
                        >
                            <Zap className="mr-3 h-5 w-5" /> Menu & Dishes
                        </Button>
                    </CardContent>
                </Card>

                {/* --- 3. QR Code Generator Card (Conditional) --- */}
                {restaurantSlug && (
                    <div className="md:col-span-2">
                        <QrCodeSection 
                            restaurantSlug={restaurantSlug}
                            restaurantName={name} // Use the admin's name or restaurant name if available
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// NOTE: You must create the following placeholder component file 
// (or ensure you use the same structure as the component defined 
// in the previous AdminSettingsPage response).
// ------------------------------------------------------------------

// File: src/components/QrCodeSection.jsx

// import { useState, useEffect } from 'react';
// import QRCode from 'qrcode';
// import { Download, Link as LinkIcon, QrCode as QrCodeIcon, Printer, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// export const QrCodeSection = ({ restaurantSlug, restaurantName }) => {
//     const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
//     const menuUrl = restaurantSlug ? `${baseUrl}/restaurants/${restaurantSlug}` : baseUrl;
//     
//     const [qrDataUrl, setQrDataUrl] = useState('');
//     const [qrLoading, setQrLoading] = useState(true);

//     const generateQRCode = async (url) => {
//         setQrLoading(true);
//         try {
//             const dataUrl = await QRCode.toDataURL(url, {
//                 width: 400,
//                 margin: 2,
//                 color: { dark: '#000000', light: '#ffffff' },
//             });
//             setQrDataUrl(dataUrl);
//         } catch (err) {
//             console.error("QR Code generation failed:", err);
//         } finally {
//             setQrLoading(false);
//         }
//     };

//     useEffect(() => {
//         generateQRCode(menuUrl);
//     }, [menuUrl]);

//     const handleDownload = () => {
//         if (!qrDataUrl) return;
//         const link = document.createElement('a');
//         link.href = qrDataUrl;
//         link.download = `${restaurantName}-menu-qr.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };
    
//     const handlePrint = () => { /* ... print logic ... */ };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle className="flex items-center gap-2"><QrCodeIcon className="w-5 h-5 text-orange-500" /> Menu QR Code</CardTitle>
//                 <CardDescription>Scan this to go directly to your public menu page.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 {/* ... preview and download buttons ... */}
//             </CardContent>
//         </Card>
//     );
// };