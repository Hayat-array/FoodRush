// // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // import { useState } from 'react';
// // // // // // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // // // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';
// // // // // // // // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // // // // // // import { Label } from '@/components/ui/label';

// // // // // // // // // // // // // // export default function DeliveryLoginPage() {
// // // // // // // // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // // // // // // // //     const [password, setPassword] = useState('');
// // // // // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // // // // //     const router = useRouter();
// // // // // // // // // // // // // //     const { status } = useSession();

// // // // // // // // // // // // // //     if (status === 'authenticated') {
// // // // // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // // // // //         return null; 
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const handleLogin = async (e) => {
// // // // // // // // // // // // // //         e.preventDefault();
// // // // // // // // // // // // // //         setLoading(true);

// // // // // // // // // // // // // //         // Call NextAuth signIn function
// // // // // // // // // // // // // //         const result = await signIn('credentials', {
// // // // // // // // // // // // // //             redirect: false, 
// // // // // // // // // // // // // //             email: email,
// // // // // // // // // // // // // //             password: password,
// // // // // // // // // // // // // //         });

// // // // // // // // // // // // // //         setLoading(false);

// // // // // // // // // // // // // //         if (result.error) {
// // // // // // // // // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // // // // // // // // //             return;
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         // If successful, the layout.js will enforce the 'delivery' role check
// // // // // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // // // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // // // // // // // // //                 <CardHeader className="space-y-1">
// // // // // // // // // // // // // //                     <CardTitle className="text-2xl text-center text-indigo-600">Partner Login</CardTitle>
// // // // // // // // // // // // // //                     <CardDescription className="text-center">Sign in to access your assigned delivery queue.</CardDescription>
// // // // // // // // // // // // // //                 </CardHeader>
// // // // // // // // // // // // // //                 <CardContent>
// // // // // // // // // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // // // // //                                 <Input
// // // // // // // // // // // // // //                                     id="email"
// // // // // // // // // // // // // //                                     type="email"
// // // // // // // // // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // // // // // // // // //                                     value={email}
// // // // // // // // // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // // // // // //                                     className="pl-10"
// // // // // // // // // // // // // //                                     required
// // // // // // // // // // // // // //                                 />
// // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // // // // //                                 <Input
// // // // // // // // // // // // // //                                     id="password"
// // // // // // // // // // // // // //                                     type="password"
// // // // // // // // // // // // // //                                     placeholder="********"
// // // // // // // // // // // // // //                                     value={password}
// // // // // // // // // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // // // // // // // // //                                     className="pl-10"
// // // // // // // // // // // // // //                                     required
// // // // // // // // // // // // // //                                 />
// // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                         <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
// // // // // // // // // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // // //                     </form>
// // // // // // // // // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // // // // // // // // //                         New partner?{" "}
// // // // // // // // // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // // // // // // // //                             Register here
// // // // // // // // // // // // // //                         </a>
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // // // //             </Card>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // }
// // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // import { useState } from 'react';
// // // // // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';
// // // // // // // // // // // // // // ⚠️ Using basic HTML structure with placeholders for your UI components to avoid dependency errors.
// // // // // // // // // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-md" {...props} />;
// // // // // // // // // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // // // // // // // // const CardTitle = (props) => <h2 className="text-xl font-bold" {...props} />;
// // // // // // // // // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // // // // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // // // // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // // // // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // // // // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // // // // // // // // export default function DeliveryLoginPage() {
// // // // // // // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // // // // // // //     const [password, setPassword] = useState('');
// // // // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // // // //     const router = useRouter();
// // // // // // // // // // // // //     const { status } = useSession();

// // // // // // // // // // // // //     if (status === 'authenticated') {
// // // // // // // // // // // // //         // Redirection handled by the dashboard layout check
// // // // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // // // //         return null; 
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const handleLogin = async (e) => {
// // // // // // // // // // // // //         e.preventDefault();
// // // // // // // // // // // // //         setLoading(true);

// // // // // // // // // // // // //         const result = await signIn('credentials', {
// // // // // // // // // // // // //             redirect: false, 
// // // // // // // // // // // // //             email: email,
// // // // // // // // // // // // //             password: password,
// // // // // // // // // // // // //         });

// // // // // // // // // // // // //         setLoading(false);

// // // // // // // // // // // // //         if (result.error) {
// // // // // // // // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // // // // // // // //             return;
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         // If successful, redirect to the protected area
// // // // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // // // // // // // //                 <CardHeader>
// // // // // // // // // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // // // // // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // // // // // // // // //                 </CardHeader>
// // // // // // // // // // // // //                 <CardContent>
// // // // // // // // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // // // //                                 <Input
// // // // // // // // // // // // //                                     id="email"
// // // // // // // // // // // // //                                     type="email"
// // // // // // // // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // // // // // // // //                                     value={email}
// // // // // // // // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // // // // //                                     required
// // // // // // // // // // // // //                                 />
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // // // //                                 <Input
// // // // // // // // // // // // //                                     id="password"
// // // // // // // // // // // // //                                     type="password"
// // // // // // // // // // // // //                                     placeholder="********"
// // // // // // // // // // // // //                                     value={password}
// // // // // // // // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // // // // // // // //                                     required
// // // // // // // // // // // // //                                 />
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                         <Button type="submit" disabled={loading}>
// // // // // // // // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // //                     </form>
// // // // // // // // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // // // // // // // //                         New partner?{" "}
// // // // // // // // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // // // // // // //                             Register here
// // // // // // // // // // // // //                         </a>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // // //             </Card>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // }
// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useState } from 'react';
// // // // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // // // // // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
// // // // // // // // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // // // // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // // // // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // // // // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // // // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // // // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // // // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // // // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // // // // // // // export default function DeliveryLoginPage() {
// // // // // // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // // // // // //     const [password, setPassword] = useState('');
// // // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // // //     const router = useRouter();
// // // // // // // // // // // //     const { status } = useSession();

// // // // // // // // // // // //     if (status === 'authenticated') {
// // // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // // //         return null; 
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const handleLogin = async (e) => {
// // // // // // // // // // // //         e.preventDefault();
// // // // // // // // // // // //         setLoading(true);

// // // // // // // // // // // //         const result = await signIn('credentials', {
// // // // // // // // // // // //             redirect: false, 
// // // // // // // // // // // //             email: email,
// // // // // // // // // // // //             password: password,
// // // // // // // // // // // //         });

// // // // // // // // // // // //         setLoading(false);

// // // // // // // // // // // //         if (result.error) {
// // // // // // // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // // // // // // //             return;
// // // // // // // // // // // //         }

// // // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // // //     };

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // // // // // // //                 <CardHeader>
// // // // // // // // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // // // // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // // // // // // // //                 </CardHeader>
// // // // // // // // // // // //                 <CardContent>
// // // // // // // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // // //                                 <Input
// // // // // // // // // // // //                                     id="email"
// // // // // // // // // // // //                                     type="email"
// // // // // // // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // // // // // // //                                     value={email}
// // // // // // // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // // // //                                     required
// // // // // // // // // // // //                                 />
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // // //                                 <Input
// // // // // // // // // // // //                                     id="password"
// // // // // // // // // // // //                                     type="password"
// // // // // // // // // // // //                                     placeholder="********"
// // // // // // // // // // // //                                     value={password}
// // // // // // // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // // // // // // //                                     required
// // // // // // // // // // // //                                 />
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                         <Button type="submit" disabled={loading}>
// // // // // // // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // // // // // // //                         </Button>
// // // // // // // // // // // //                     </form>
// // // // // // // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // // // // // // //                         New partner?{" "}
// // // // // // // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // // // // // //                             Register here
// // // // // // // // // // // //                         </a>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // //             </Card>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }
// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState } from 'react';
// // // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // // // // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports (e.g., import { Card } from '@/components/ui/card';)
// // // // // // // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // // // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // // // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // // // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // // // // // // export default function DeliveryLoginPage() {
// // // // // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // // // // //     const [password, setPassword] = useState('');
// // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // //     const router = useRouter();
// // // // // // // // // // //     const { status } = useSession();

// // // // // // // // // // //     // 💡 FIX 1: Explicitly handle the 'authenticated' state to ensure a quick redirect 
// // // // // // // // // // //     // and prevent unnecessary rendering conflicts that violate hook rules.
// // // // // // // // // // //     if (status === 'authenticated') {
// // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // //         return null; // Stop rendering the login form immediately
// // // // // // // // // // //     }

// // // // // // // // // // //     const handleLogin = async (e) => {
// // // // // // // // // // //         e.preventDefault();
// // // // // // // // // // //         setLoading(true);

// // // // // // // // // // //         const result = await signIn('credentials', {
// // // // // // // // // // //             redirect: false, 
// // // // // // // // // // //             email: email,
// // // // // // // // // // //             password: password,
// // // // // // // // // // //         });

// // // // // // // // // // //         setLoading(false);

// // // // // // // // // // //         if (result.error) {
// // // // // // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // // // // // //             return;
// // // // // // // // // // //         }

// // // // // // // // // // //         // Redirect is handled here if successful
// // // // // // // // // // //         router.push('/delivery/dashboard');
// // // // // // // // // // //     };

// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // // // // // //                 <CardHeader>
// // // // // // // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // // // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // // // // // // //                 </CardHeader>
// // // // // // // // // // //                 <CardContent>
// // // // // // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // //                                 <Input
// // // // // // // // // // //                                     id="email"
// // // // // // // // // // //                                     type="email"
// // // // // // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // // // // // //                                     value={email}
// // // // // // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // // //                                     required
// // // // // // // // // // //                                 />
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // // // // // //                             <div className="relative">
// // // // // // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // // //                                 <Input
// // // // // // // // // // //                                     id="password"
// // // // // // // // // // //                                     type="password"
// // // // // // // // // // //                                     placeholder="********"
// // // // // // // // // // //                                     value={password}
// // // // // // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // // // // // //                                     required
// // // // // // // // // // //                                 />
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                         <Button type="submit" disabled={loading}>
// // // // // // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // // // // // //                         </Button>
// // // // // // // // // // //                     </form>
// // // // // // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // // // // // //                         New partner?{" "}
// // // // // // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // // // // //                             Register here
// // // // // // // // // // //                         </a>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </CardContent>
// // // // // // // // // // //             </Card>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // }
// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState, useEffect } from 'react'; // 💡 useEffect added here
// // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // // // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports (e.g., import { Card } from '@/components/ui/card';)
// // // // // // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // // // // // export default function DeliveryLoginPage() {
// // // // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // // // //     const [password, setPassword] = useState('');
// // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // //     const router = useRouter();
// // // // // // // // // //     const { status } = useSession();

// // // // // // // // // //     // 💡 FIX: Use useEffect to handle redirection based on session status.
// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         // Only run if the status is authenticated (login succeeded)
// // // // // // // // // //         if (status === 'authenticated') {
// // // // // // // // // //             router.push('/delivery/dashboard'); 
// // // // // // // // // //         }
// // // // // // // // // //     }, [status, router]); // Dependency array ensures this runs when 'status' changes

// // // // // // // // // //     // Show loading or redirection state while waiting for session update/redirect
// // // // // // // // // //     if (status === 'authenticated' || status === 'loading') {
// // // // // // // // // //         // Return a simple div to prevent further rendering conflicts
// // // // // // // // // //         return <div className="flex items-center justify-center min-h-screen">Authenticating and Redirecting...</div>; 
// // // // // // // // // //     }

// // // // // // // // // //     const handleLogin = async (e) => {
// // // // // // // // // //         e.preventDefault();
// // // // // // // // // //         setLoading(true);

// // // // // // // // // //         const result = await signIn('credentials', {
// // // // // // // // // //             redirect: false, 
// // // // // // // // // //             email: email,
// // // // // // // // // //             password: password,
// // // // // // // // // //         });

// // // // // // // // // //         setLoading(false);

// // // // // // // // // //         if (result.error) {
// // // // // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // // // // //             return;
// // // // // // // // // //         }

// // // // // // // // // //         // 💡 FIX: Do NOT call router.push() here. 
// // // // // // // // // //         // A successful sign-in updates the session status, which then triggers the useEffect hook above.
// // // // // // // // // //     };

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // // // // //                 <CardHeader>
// // // // // // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // // // // // //                 </CardHeader>
// // // // // // // // // //                 <CardContent>
// // // // // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // // // // //                             <div className="relative">
// // // // // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // //                                 <Input
// // // // // // // // // //                                     id="email"
// // // // // // // // // //                                     type="email"
// // // // // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // // // // //                                     value={email}
// // // // // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // //                                     required
// // // // // // // // // //                                 />
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // // // // //                             <div className="relative">
// // // // // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // // //                                 <Input
// // // // // // // // // //                                     id="password"
// // // // // // // // // //                                     type="password"
// // // // // // // // // //                                     placeholder="********"
// // // // // // // // // //                                     value={password}
// // // // // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // // // // //                                     required
// // // // // // // // // //                                 />
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <Button type="submit" disabled={loading}>
// // // // // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // // // // //                         </Button>
// // // // // // // // // //                     </form>
// // // // // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // // // // //                         New partner?{" "}
// // // // // // // // // //                         // This link is correct (points to the frontend page):
// // // // // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // // // //                             Register here
// // // // // // // // // //                         </a>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </CardContent>
// // // // // // // // // //             </Card>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react'; // 💡 useEffect MUST be imported
// // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports 
// // // // // // // // // // (e.g., import { Card } from '@/components/ui/card';)
// // // // // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // // // // export default function DeliveryLoginPage() {
// // // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // // //     const [password, setPassword] = useState('');
// // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // //     const router = useRouter();
// // // // // // // // //     const { status } = useSession();

// // // // // // // // //     // 💡 FIX: Use useEffect to handle redirection as a side effect.
// // // // // // // // //     // This runs AFTER the component renders, preventing the hook violation.
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (status === 'authenticated') {
// // // // // // // // //             router.push('/delivery/dashboard'); 
// // // // // // // // //         }
// // // // // // // // //     }, [status, router]); // Runs only when status changes

// // // // // // // // //     // CRITICAL: Return a loading state if the session is authenticated or updating.
// // // // // // // // //     // This stops the component from rendering the form while the redirect is processing.
// // // // // // // // //     if (status === 'authenticated' || status === 'loading') {
// // // // // // // // //         return (
// // // // // // // // //             <div className="flex items-center justify-center min-h-screen">
// // // // // // // // //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// // // // // // // // //             </div>
// // // // // // // // //         ); 
// // // // // // // // //     }

// // // // // // // // //     const handleLogin = async (e) => {
// // // // // // // // //         e.preventDefault();
// // // // // // // // //         setLoading(true);

// // // // // // // // //         const result = await signIn('credentials', {
// // // // // // // // //             redirect: false, 
// // // // // // // // //             email: email,
// // // // // // // // //             password: password,
// // // // // // // // //         });

// // // // // // // // //         setLoading(false);

// // // // // // // // //         if (result.error) {
// // // // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // // // //             return;
// // // // // // // // //         }

// // // // // // // // //         // ⚠️ DO NOT call router.push() here.
// // // // // // // // //         // A successful signIn updates the session, which triggers the useEffect hook above 
// // // // // // // // //         // to handle the actual redirection cleanly.
// // // // // // // // //     };

// // // // // // // // //     return (
// // // // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // // // //                 <CardHeader>
// // // // // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // // // // //                 </CardHeader>
// // // // // // // // //                 <CardContent>
// // // // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // // // //                         <div className="space-y-2">
// // // // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // // // //                             <div className="relative">
// // // // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // //                                 <Input
// // // // // // // // //                                     id="email"
// // // // // // // // //                                     type="email"
// // // // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // // // //                                     value={email}
// // // // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // // // //                                     required
// // // // // // // // //                                 />
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="space-y-2">
// // // // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // // // //                             <div className="relative">
// // // // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // // //                                 <Input
// // // // // // // // //                                     id="password"
// // // // // // // // //                                     type="password"
// // // // // // // // //                                     placeholder="********"
// // // // // // // // //                                     value={password}
// // // // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // // // //                                     required
// // // // // // // // //                                 />
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                         <Button type="submit" disabled={loading}>
// // // // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // // // //                         </Button>
// // // // // // // // //                     </form>
// // // // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // // // //                         New partner?{" "}
// // // // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // // //                             Register here
// // // // // // // // //                         </a>
// // // // // // // // //                     </div>
// // // // // // // // //                 </CardContent>
// // // // // // // // //             </Card>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
// // // // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // // // export default function DeliveryLoginPage() {
// // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // //     const [password, setPassword] = useState('');
// // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // //     const router = useRouter();
// // // // // // // //     const { status } = useSession();

// // // // // // // //     // 💡 FIX: Use useEffect to handle redirection as a side effect (fixes hook violation)
// // // // // // // //     useEffect(() => {
// // // // // // // //         if (status === 'authenticated') {
// // // // // // // //             router.push('/delivery/dashboard'); 
// // // // // // // //         }
// // // // // // // //     }, [status, router]);

// // // // // // // //     if (status === 'authenticated' || status === 'loading') {
// // // // // // // //         return (
// // // // // // // //             <div className="flex items-center justify-center min-h-screen">
// // // // // // // //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// // // // // // // //             </div>
// // // // // // // //         ); 
// // // // // // // //     }

// // // // // // // //     const handleLogin = async (e) => {
// // // // // // // //         e.preventDefault();
// // // // // // // //         setLoading(true);

// // // // // // // //         const result = await signIn('credentials', {
// // // // // // // //             redirect: false, 
// // // // // // // //             email: email,
// // // // // // // //             password: password,
// // // // // // // //         });

// // // // // // // //         setLoading(false);

// // // // // // // //         if (result.error) {
// // // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //         // Success triggers the useEffect above
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // // //                 <CardHeader>
// // // // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // // // //                 </CardHeader>
// // // // // // // //                 <CardContent>
// // // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // // //                             <div className="relative">
// // // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // //                                 <Input
// // // // // // // //                                     id="email"
// // // // // // // //                                     type="email"
// // // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // // //                                     value={email}
// // // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // // //                                     required
// // // // // // // //                                 />
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // // //                             <div className="relative">
// // // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // // //                                 <Input
// // // // // // // //                                     id="password"
// // // // // // // //                                     type="password"
// // // // // // // //                                     placeholder="********"
// // // // // // // //                                     value={password}
// // // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // // //                                     required
// // // // // // // //                                 />
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                         <Button type="submit" disabled={loading}>
// // // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // // //                         </Button>
// // // // // // // //                     </form>
// // // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // // //                         New partner?{" "}
// // // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // //                             Register here
// // // // // // // //                         </a>
// // // // // // // //                     </div>
// // // // // // // //                 </CardContent>
// // // // // // // //             </Card>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react'; // 💡 useEffect MUST be imported
// // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports 
// // // // // // // // (e.g., import { Card } from '@/components/ui/card';)
// // // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // // export default function DeliveryLoginPage() {
// // // // // // //     const [email, setEmail] = useState('');
// // // // // // //     const [password, setPassword] = useState('');
// // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // //     const router = useRouter();
// // // // // // //     const { status } = useSession();

// // // // // // //     // 💡 FIX: Use useEffect to handle redirection as a side effect.
// // // // // // //     // This runs AFTER the component renders, preventing the hook violation.
// // // // // // //     useEffect(() => {
// // // // // // //         if (status === 'authenticated') {
// // // // // // //             router.push('/delivery/dashboard'); 
// // // // // // //         }
// // // // // // //     }, [status, router]); // Runs only when status changes

// // // // // // //     // CRITICAL: Return a loading state if the session is authenticated or updating.
// // // // // // //     // This stops the component from rendering the form while the redirect is processing.
// // // // // // //     if (status === 'authenticated' || status === 'loading') {
// // // // // // //         return (
// // // // // // //             <div className="flex items-center justify-center min-h-screen">
// // // // // // //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// // // // // // //             </div>
// // // // // // //         ); 
// // // // // // //     }

// // // // // // //     const handleLogin = async (e) => {
// // // // // // //         e.preventDefault();
// // // // // // //         setLoading(true);

// // // // // // //         const result = await signIn('credentials', {
// // // // // // //             redirect: false, 
// // // // // // //             email: email,
// // // // // // //             password: password,
// // // // // // //         });

// // // // // // //         setLoading(false);

// // // // // // //         if (result.error) {
// // // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // // //             return;
// // // // // // //         }

// // // // // // //         // ⚠️ DO NOT call router.push() here.
// // // // // // //         // A successful signIn updates the session, which triggers the useEffect hook above 
// // // // // // //         // to handle the actual redirection cleanly.
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // // //                 <CardHeader>
// // // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // // //                 </CardHeader>
// // // // // // //                 <CardContent>
// // // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // // //                         <div className="space-y-2">
// // // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // // //                             <div className="relative">
// // // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // //                                 <Input
// // // // // // //                                     id="email"
// // // // // // //                                     type="email"
// // // // // // //                                     placeholder="delivery@partner.com"
// // // // // // //                                     value={email}
// // // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // // //                                     required
// // // // // // //                                 />
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                         <div className="space-y-2">
// // // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // // //                             <div className="relative">
// // // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // // //                                 <Input
// // // // // // //                                     id="password"
// // // // // // //                                     type="password"
// // // // // // //                                     placeholder="********"
// // // // // // //                                     value={password}
// // // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // // //                                     required
// // // // // // //                                 />
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                         <Button type="submit" disabled={loading}>
// // // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // // //                         </Button>
// // // // // // //                     </form>
// // // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // // //                         New partner?{" "}
// // // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // //                             Register here
// // // // // // //                         </a>
// // // // // // //                     </div>
// // // // // // //                 </CardContent>
// // // // // // //             </Card>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // // ⚠️ PLACEHOLDERS (Replace with your actual imports)
// // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // // export default function DeliveryLoginPage() {
// // // // // //     const [email, setEmail] = useState('');
// // // // // //     const [password, setPassword] = useState('');
// // // // // //     const [loading, setLoading] = useState(false);
// // // // // //     const router = useRouter();
// // // // // //     const { status } = useSession();

// // // // // //     // 💡 FIX: Handles redirection as a side effect after successful session update
// // // // // //     useEffect(() => {
// // // // // //         if (status === 'authenticated') {
// // // // // //             router.push('/delivery/dashboard'); 
// // // // // //         }
// // // // // //     }, [status, router]);

// // // // // //     // Blocks rendering the form if session is loading or already authenticated
// // // // // //     if (status === 'authenticated' || status === 'loading') {
// // // // // //         return (
// // // // // //             <div className="flex items-center justify-center min-h-screen">
// // // // // //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// // // // // //             </div>
// // // // // //         ); 
// // // // // //     }

// // // // // //     const handleLogin = async (e) => {
// // // // // //         e.preventDefault();
// // // // // //         setLoading(true);

// // // // // //         const result = await signIn('credentials', {
// // // // // //             redirect: false, 
// // // // // //             email: email,
// // // // // //             password: password,
// // // // // //         });

// // // // // //         setLoading(false);

// // // // // //         if (result.error) {
// // // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // // //             return;
// // // // // //         }
// // // // // //         // The successful sign-in updates the global session status, triggering the useEffect hook.
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // // //                 <CardHeader>
// // // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent>
// // // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // // //                         <div className="space-y-2">
// // // // // //                             <Label htmlFor="email">Email</Label>
// // // // // //                             <div className="relative">
// // // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // //                                 <Input
// // // // // //                                     id="email"
// // // // // //                                     type="email"
// // // // // //                                     placeholder="delivery@partner.com"
// // // // // //                                     value={email}
// // // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // // //                                     required
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                         <div className="space-y-2">
// // // // // //                             <Label htmlFor="password">Password</Label>
// // // // // //                             <div className="relative">
// // // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // //                                 <Input
// // // // // //                                     id="password"
// // // // // //                                     type="password"
// // // // // //                                     placeholder="********"
// // // // // //                                     value={password}
// // // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // // //                                     required
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                         <Button type="submit" disabled={loading}>
// // // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // // //                         </Button>
// // // // // //                     </form>
// // // // // //                     <div className="mt-4 text-center text-sm">
// // // // // //                         New partner?{" "}
// // // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // //                             Register here
// // // // // //                         </a>
// // // // // //                     </div>
// // // // // //                 </CardContent>
// // // // // //             </Card>
// // // // // //         </div>
// // // // // //     );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { signIn, useSession } from 'next-auth/react';
// // // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // // ⚠️ PLACEHOLDERS (Must be replaced with your actual component imports)
// // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // const CardContent = (props) => <div {...props} />;
// // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // export default function DeliveryLoginPage() {
// // // // //     const [email, setEmail] = useState('');
// // // // //     const [password, setPassword] = useState('');
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const router = useRouter();
// // // // //     const { status } = useSession();

// // // // //     // 💡 FIX: Redirection logic inside useEffect.
// // // // //     useEffect(() => {
// // // // //         if (status === 'authenticated') {
// // // // //             // After successful sign-in, redirect to the root which will then 
// // // // //             // be checked by src/app/page.jsx for role-based redirection.
// // // // //             router.push('/'); 
// // // // //         }
// // // // //     }, [status, router]);

// // // // //     if (status === 'authenticated' || status === 'loading') {
// // // // //         return (
// // // // //             <div className="flex items-center justify-center min-h-screen">
// // // // //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// // // // //             </div>
// // // // //         ); 
// // // // //     }

// // // // //     const handleLogin = async (e) => {
// // // // //         e.preventDefault();
// // // // //         setLoading(true);

// // // // //         const result = await signIn('credentials', {
// // // // //             redirect: false, 
// // // // //             email: email,
// // // // //             password: password,
// // // // //         });

// // // // //         setLoading(false);

// // // // //         if (result.error) {
// // // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // // //             return;
// // // // //         }

// // // // //         // Success updates session, which triggers the useEffect redirect to '/'
// // // // //     };

// // // // //     return (
// // // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // //             <Card className="w-full max-w-md shadow-lg">
// // // // //                 <CardHeader>
// // // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // // //                 </CardHeader>
// // // // //                 <CardContent>
// // // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // // //                         <div className="space-y-2">
// // // // //                             <Label htmlFor="email">Email</Label>
// // // // //                             <div className="relative">
// // // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // //                                 <Input
// // // // //                                     id="email"
// // // // //                                     type="email"
// // // // //                                     placeholder="delivery@partner.com"
// // // // //                                     value={email}
// // // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // // //                                     required
// // // // //                                 />
// // // // //                             </div>
// // // // //                         </div>
// // // // //                         <div className="space-y-2">
// // // // //                             <Label htmlFor="password">Password</Label>
// // // // //                             <div className="relative">
// // // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // //                                 <Input
// // // // //                                     id="password"
// // // // //                                     type="password"
// // // // //                                     placeholder="********"
// // // // //                                     value={password}
// // // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // // //                                     required
// // // // //                                 />
// // // // //                             </div>
// // // // //                         </div>
// // // // //                         <Button type="submit" disabled={loading}>
// // // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // // //                         </Button>
// // // // //                     </form>
// // // // //                     <div className="mt-4 text-center text-sm">
// // // // //                         New partner?{" "}
// // // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // // //                             Register here
// // // // //                         </a>
// // // // //                     </div>
// // // // //                 </CardContent>
// // // // //             </Card>
// // // // //         </div>
// // // // //     );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { signIn, useSession } from 'next-auth/react';
// // // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // // ⚠️ PLACEHOLDERS (Must be replaced with your actual component imports)
// // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // const CardContent = (props) => <div {...props} />;
// // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // export default function DeliveryLoginPage() {
// // // //     const [email, setEmail] = useState('');
// // // //     const [password, setPassword] = useState('');
// // // //     const [loading, setLoading] = useState(false);
// // // //     const router = useRouter();
// // // //     const { status } = useSession();

// // // //     // 💡 FIX: Redirection logic inside useEffect.
// // // //     useEffect(() => {
// // // //         if (status === 'authenticated') {
// // // //             // Redirect to the root, letting the server component handle the role check.
// // // //             router.push('/'); 
// // // //         }
// // // //     }, [status, router]);

// // // //     if (status === 'authenticated' || status === 'loading') {
// // // //         return (
// // // //             <div className="flex items-center justify-center min-h-screen">
// // // //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// // // //             </div>
// // // //         ); 
// // // //     }

// // // //     const handleLogin = async (e) => {
// // // //         e.preventDefault();
// // // //         setLoading(true);

// // // //         const result = await signIn('credentials', {
// // // //             redirect: false, 
// // // //             email: email,
// // // //             password: password,
// // // //         });

// // // //         setLoading(false);

// // // //         if (result.error) {
// // // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // // //             return;
// // // //         }
// // // //         // Success triggers the useEffect redirect to '/'
// // // //     };

// // // //     return (
// // // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // //             <Card className="w-full max-w-md shadow-lg">
// // // //                 <CardHeader>
// // // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent>
// // // //                     <form onSubmit={handleLogin} className="space-y-4">
// // // //                         <div className="space-y-2">
// // // //                             <Label htmlFor="email">Email</Label>
// // // //                             <div className="relative">
// // // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // //                                 <Input
// // // //                                     id="email"
// // // //                                     type="email"
// // // //                                     placeholder="delivery@partner.com"
// // // //                                     value={email}
// // // //                                     onChange={(e) => setEmail(e.target.value)}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                             <Label htmlFor="password">Password</Label>
// // // //                             <div className="relative">
// // // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // //                                 <Input
// // // //                                     id="password"
// // // //                                     type="password"
// // // //                                     placeholder="********"
// // // //                                     value={password}
// // // //                                     onChange={(e) => setPassword(e.target.value)}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                         </div>
// // // //                         <Button type="submit" disabled={loading}>
// // // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // // //                         </Button>
// // // //                     </form>
// // // //                     <div className="mt-4 text-center text-sm">
// // // //                         New partner?{" "}
// // // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // // //                             Register here
// // // //                         </a>
// // // //                     </div>
// // // //                 </CardContent>
// // // //             </Card>
// // // //         </div>
// // // //     );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { signIn, useSession } from 'next-auth/react';
// // // import { Mail, Lock, LogIn } from 'lucide-react';

// // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
// // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // const CardContent = (props) => <div {...props} />;
// // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // export default function DeliveryLoginPage() {
// // //     const [email, setEmail] = useState('');
// // //     const [password, setPassword] = useState('');
// // //     const [loading, setLoading] = useState(false);
// // //     const router = useRouter();
// // //     const { status } = useSession();

// // //     // Redirection logic inside useEffect (fires after successful session update)
// // //     useEffect(() => {
// // //         if (status === 'authenticated') {
// // //             // Redirect to the root, letting the server component handle the role check.
// // //             router.push('/'); 
// // //         }
// // //     }, [status, router]);

// // //     if (status === 'authenticated' || status === 'loading') {
// // //         return (
// // //             <div className="flex items-center justify-center min-h-screen">
// // //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// // //             </div>
// // //         ); 
// // //     }

// // //     const handleLogin = async (e) => {
// // //         e.preventDefault();
// // //         setLoading(true);

// // //         const result = await signIn('credentials', {
// // //             redirect: false, 
// // //             email: email,
// // //             password: password,
// // //         });

// // //         setLoading(false);

// // //         if (result.error) {
// // //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// // //             return;
// // //         }
// // //         // Success triggers the useEffect redirect to '/'
// // //     };

// // //     return (
// // //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // //             <Card className="w-full max-w-md shadow-lg">
// // //                 <CardHeader>
// // //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// // //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                     <form onSubmit={handleLogin} className="space-y-4">
// // //                         <div className="space-y-2">
// // //                             <Label htmlFor="email">Email</Label>
// // //                             <div className="relative">
// // //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // //                                 <Input
// // //                                     id="email"
// // //                                     type="email"
// // //                                     placeholder="delivery@partner.com"
// // //                                     value={email}
// // //                                     onChange={(e) => setEmail(e.target.value)}
// // //                                     required
// // //                                 />
// // //                             </div>
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                             <Label htmlFor="password">Password</Label>
// // //                             <div className="relative">
// // //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // //                                 <Input
// // //                                     id="password"
// // //                                     type="password"
// // //                                     placeholder="********"
// // //                                     value={password}
// // //                                     onChange={(e) => setPassword(e.target.value)}
// // //                                     required
// // //                                 />
// // //                             </div>
// // //                         </div>
// // //                         <Button type="submit" disabled={loading}>
// // //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// // //                         </Button>
// // //                     </form>
// // //                     <div className="mt-4 text-center text-sm">
// // //                         New partner?{" "}
// // //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// // //                             Register here
// // //                         </a>
// // //                     </div>
// // //                 </CardContent>
// // //             </Card>
// // //         </div>
// // //     );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { signIn, useSession } from 'next-auth/react';
// // import { Mail, Lock, LogIn } from 'lucide-react';

// // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
// // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // const CardContent = (props) => <div {...props} />;
// // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // export default function DeliveryLoginPage() {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const router = useRouter();
// //     const { status } = useSession();

// //     // Redirection logic inside useEffect (fires after successful session update)
// //     useEffect(() => {
// //         if (status === 'authenticated') {
// //             router.push('/'); 
// //         }
// //     }, [status, router]);

// //     if (status === 'authenticated' || status === 'loading') {
// //         return (
// //             <div className="flex items-center justify-center min-h-screen">
// //                 <p className="text-lg text-indigo-600">Authenticating and Redirecting...</p>
// //             </div>
// //         ); 
// //     }

// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);

// //         const result = await signIn('credentials', {
// //             redirect: false, 
// //             email: email,
// //             password: password,
// //             role: 'delivery',  // Ensures only delivery partners can log in
// //         });

// //         setLoading(false);

// //         if (result.error) {
// //             alert("Login Failed: Invalid credentials or not authorized as a delivery partner."); 
// //             return;
// //         }
// //     };

// //     return (
// //         <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// //             <Card className="w-full max-w-md shadow-lg">
// //                 <CardHeader>
// //                     <CardTitle className="text-indigo-600">Partner Login</CardTitle>
// //                     <CardDescription>Sign in to access your delivery queue.</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                     <form onSubmit={handleLogin} className="space-y-4">
// //                         <div className="space-y-2">
// //                             <Label htmlFor="email">Email</Label>
// //                             <div className="relative">
// //                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //                                 <Input
// //                                     id="email"
// //                                     type="email"
// //                                     placeholder="delivery@partner.com"
// //                                     value={email}
// //                                     onChange={(e) => setEmail(e.target.value)}
// //                                     required
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div className="space-y-2">
// //                             <Label htmlFor="password">Password</Label>
// //                             <div className="relative">
// //                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //                                 <Input
// //                                     id="password"
// //                                     type="password"
// //                                     placeholder="********"
// //                                     value={password}
// //                                     onChange={(e) => setPassword(e.target.value)}
// //                                     required
// //                                 />
// //                             </div>
// //                         </div>
// //                         <Button type="submit" disabled={loading}>
// //                             {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
// //                         </Button>
// //                     </form>
// //                     <div className="mt-4 text-center text-sm">
// //                         New partner?{" "}
// //                         <a href='/auth/delivery/signup' className="text-indigo-600 hover:underline cursor-pointer">
// //                             Register here
// //                         </a>
// //                     </div>
// //                 </CardContent>
// //             </Card>
// //         </div>
// //     );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn, useSession } from 'next-auth/react';
// import { Mail, Lock, LogIn } from 'lucide-react';

// // Simple placeholder UI components (keep or replace with your design system)
// const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// const CardContent = (props) => <div {...props} />;
// const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;

// export default function DeliveryLoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   // Redirect depending on role once session is available
//   useEffect(() => {
//     if (status === 'authenticated' && session?.user) {
//       const role = session.user.role;
//       if (role === 'delivery') {
//         router.push('/delivery/dashboard');
//       } else {
//         // If authenticated but not delivery, send to the main homepage or appropriate dashboard
//         router.push('/');
//       }
//     }
//   }, [status, session, router]);

//   if (status === 'loading') {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-lg text-indigo-600">Checking session...</p>
//       </div>
//     );
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Only pass email/password — server authorize will look up role from DB
//     const result = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//     });

//     setLoading(false);

//     if (result?.error) {
//       // show a friendly message — backend should return helpful error messages
//       alert(result.error || "Login failed. Check credentials.");
//       return;
//     }

//     // If signIn succeeded, useEffect will detect session and redirect appropriately.
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-indigo-600">Partner Login</CardTitle>
//           <CardDescription>Sign in to access your delivery queue.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="delivery@partner.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="********"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Authenticating..." : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             New partner?{" "}
//             <a href="/auth/delivery/signup" className="text-indigo-600 hover:underline cursor-pointer">
//               Register here
//             </a>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Mail, Lock, LogIn } from 'lucide-react';

// Simple UI placeholders (replace with your components if needed)
const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
const CardContent = (props) => <div {...props} />;
const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;

export default function DeliveryLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // Wait for session status to settle, then redirect based on role
  useEffect(() => {
    // Helpful debug — remove in production
    console.debug('[Client] useSession status:', status, 'session:', session);

    if (status === 'loading') return; // wait

    if (status === 'authenticated' && session?.user) {
      const role = session.user.role;
      if (role === 'delivery') {
        router.replace('/delivery/dashboard');
      } else if (role === 'admin') {
        router.replace('/admin/dashboard');
      } else if (role === 'restaurant_owner') {
        router.replace('/restaurant/dashboard');
      } else {
        router.replace('/'); // fallback for normal users
      }
    }

    // If status === 'unauthenticated', stay on the login page
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setBusy(true);
    try {
      // sign in with credentials provider, do not redirect automatically
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      // The result object may be: { error, status, ok, url }
      if (result?.error) {
        setError(result.error || 'Login failed. Check credentials.');
        setBusy(false);
        return;
      }

      // signIn succeeded. Now fetch session to confirm role and redirect client-side.
      const sessRes = await fetch('/api/auth/session', { credentials: 'include' });
      const sessJson = await sessRes.json();
      const role = sessJson?.user?.role;

      if (role === 'delivery') {
        router.replace('/delivery/dashboard');
      } else if (role) {
        // other role — route appropriately (or go to home)
        router.replace('/');
      } else {
        // fallback to home
        router.replace('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unexpected error. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-indigo-600">Partner Login</CardTitle>
          <CardDescription>Sign in to access your delivery queue.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" placeholder="delivery@partner.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            {error && <div role="alert" className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded">{error}</div>}

            <Button type="submit" disabled={busy}>
              {busy ? 'Authenticating...' : (<><LogIn className="mr-2 h-4 w-4" /> Log In</>)}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            New partner? <a href="/auth/delivery/signup" className="text-indigo-600 hover:underline">Register here</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
