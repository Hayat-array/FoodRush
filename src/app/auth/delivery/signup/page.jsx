// // // // // // // // 'use client';

// // // // // // // // import { useState } from 'react';
// // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // import { User, Mail, Lock, LogIn } from 'lucide-react';
// // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // import { Label } from '@/components/ui/label';

// // // // // // // // export default function DeliverySignupPage() {
// // // // // // // //   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const router = useRouter();

// // // // // // // //   const handleChange = (e) => {
// // // // // // // //     setFormData({ ...formData, [e.target.id]: e.target.value });
// // // // // // // //   };

// // // // // // // //   const handleSignup = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     setLoading(true);

// // // // // // // //     try {
// // // // // // // //       const res = await fetch('/api/auth/delivery/signup', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // //         body: JSON.stringify(formData),
// // // // // // // //       });

// // // // // // // //       const data = await res.json();

// // // // // // // //       if (data.success) {
// // // // // // // //         alert("Registration Successful! Please log in.");
// // // // // // // //         router.push('/auth/delivery/login');
// // // // // // // //       } else {
// // // // // // // //         throw new Error(data.error || "Signup failed.");
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       alert(`Error: ${error.message}`);
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // // //       <Card className="w-full max-w-md shadow-lg">
// // // // // // // //         <CardHeader className="space-y-1">
// // // // // // // //           <CardTitle className="text-2xl text-center text-indigo-600">Partner Registration</CardTitle>
// // // // // // // //           <CardDescription className="text-center">Register to gain exclusive access.</CardDescription>
// // // // // // // //         </CardHeader>
// // // // // // // //         <CardContent>
// // // // // // // //           <form onSubmit={handleSignup} className="space-y-4">
// // // // // // // //             {['name', 'email', 'password'].map((field, index) => (
// // // // // // // //               <div className="space-y-2" key={field}>
// // // // // // // //                 <Label htmlFor={field} className="capitalize">{field}</Label>
// // // // // // // //                 <div className="relative">
// // // // // // // //                   {field === 'name' && <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
// // // // // // // //                   {field === 'email' && <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
// // // // // // // //                   {field === 'password' && <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
// // // // // // // //                   <Input
// // // // // // // //                     id={field}
// // // // // // // //                     type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
// // // // // // // //                     placeholder={field === 'email' ? 'partner@domain.com' : field === 'password' ? '********' : 'Full Name'}
// // // // // // // //                     value={formData[field]}
// // // // // // // //                     onChange={handleChange}
// // // // // // // //                     className="pl-10"
// // // // // // // //                     required
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             ))}
// // // // // // // //             <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
// // // // // // // //               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
// // // // // // // //             </Button>
// // // // // // // //           </form>
// // // // // // // //           <div className="mt-4 text-center text-sm">
// // // // // // // //             Already registered?{" "}
// // // // // // // //             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // // //               Log in
// // // // // // // //             </a>
// // // // // // // //           </div>
// // // // // // // //         </CardContent>
// // // // // // // //       </Card>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState } from 'react';
// // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // import { User, Mail, Lock, LogIn } from 'lucide-react';
// // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // import { Label } from '@/components/ui/label';

// // // // // // // export default function DeliverySignupPage() {
// // // // // // //   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const router = useRouter();

// // // // // // //   const handleChange = (e) => {
// // // // // // //     setFormData({ ...formData, [e.target.id]: e.target.value });
// // // // // // //   };

// // // // // // //   const handleSignup = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const res = await fetch('/api/auth/delivery/signup', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify(formData),
// // // // // // //       });

// // // // // // //       const data = await res.json();

// // // // // // //       if (data.success) {
// // // // // // //         alert("Registration Successful! Please log in.");
// // // // // // //         router.push('/auth/delivery/login');
// // // // // // //       } else {
// // // // // // //         throw new Error(data.error || "Signup failed.");
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       alert(`Error: ${error.message}`);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // // //       <Card className="w-full max-w-md shadow-lg">
// // // // // // //         <CardHeader className="space-y-1">
// // // // // // //           <CardTitle className="text-2xl text-center text-indigo-600">Partner Registration</CardTitle>
// // // // // // //           <CardDescription className="text-center">Register to gain exclusive access.</CardDescription>
// // // // // // //         </CardHeader>
// // // // // // //         <CardContent>
// // // // // // //           <form onSubmit={handleSignup} className="space-y-4">
// // // // // // //             {['name', 'email', 'password'].map((field, index) => (
// // // // // // //               <div className="space-y-2" key={field}>
// // // // // // //                 <Label htmlFor={field} className="capitalize">{field}</Label>
// // // // // // //                 <div className="relative">
// // // // // // //                   {field === 'name' && <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
// // // // // // //                   {field === 'email' && <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
// // // // // // //                   {field === 'password' && <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
// // // // // // //                   <Input
// // // // // // //                     id={field}
// // // // // // //                     type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
// // // // // // //                     placeholder={field === 'email' ? 'partner@domain.com' : field === 'password' ? '********' : 'Full Name'}
// // // // // // //                     value={formData[field]}
// // // // // // //                     onChange={handleChange}
// // // // // // //                     className="pl-10"
// // // // // // //                     required
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //             <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
// // // // // // //               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
// // // // // // //             </Button>
// // // // // // //           </form>
// // // // // // //           <div className="mt-4 text-center text-sm">
// // // // // // //             Already registered?{" "}
// // // // // // //             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // // //               Log in
// // // // // // //             </a>
// // // // // // //           </div>
// // // // // // //         </CardContent>
// // // // // // //       </Card>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState } from 'react';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react';
// // // // // // // ⚠️ Using basic HTML structure with placeholders for your UI components to avoid dependency errors.
// // // // // // // REPLACE THESE WITH YOUR ACTUAL COMPONENT IMPORTS (@/components/ui/card, etc.)
// // // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-md" {...props} />;
// // // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // // const CardTitle = (props) => <h2 className="text-xl font-bold" {...props} />;
// // // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // // const CardContent = (props) => <div {...props} />;
// // // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;

// // // // // // export default function DeliverySignupPage() {
// // // // // //   const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const router = useRouter();

// // // // // //   const handleChange = (e) => {
// // // // // //     setFormData({ ...formData, [e.target.id]: e.target.value });
// // // // // //   };

// // // // // //   const handleSignup = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       const res = await fetch('/api/auth/delivery/signup', {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify(formData),
// // // // // //       });

// // // // // //       const data = await res.json();

// // // // // //       if (data.success) {
// // // // // //         alert("Registration Successful! Please log in.");
// // // // // //         router.push('/auth/delivery/login');
// // // // // //       } else {
// // // // // //         throw new Error(data.error || "Signup failed.");
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       alert(`Error: ${error.message}`);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const fields = [
// // // // // //       { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
// // // // // //       { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
// // // // // //       { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon },
// // // // // //       { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // // //       <Card className="w-full max-w-md">
// // // // // //         <CardHeader>
// // // // // //           <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
// // // // // //           <CardDescription>Register to gain exclusive access.</CardDescription>
// // // // // //         </CardHeader>
// // // // // //         <CardContent>
// // // // // //           <form onSubmit={handleSignup} className="space-y-4">
// // // // // //             {fields.map(({ id, type, placeholder, Icon }) => (
// // // // // //               <div className="space-y-2" key={id}>
// // // // // //                 <Label htmlFor={id} className="capitalize">{id.replace('password', 'Password').replace('phone', 'Phone Number')}</Label>
// // // // // //                 <div className="relative">
// // // // // //                   <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // // //                   <Input
// // // // // //                     id={id}
// // // // // //                     type={type}
// // // // // //                     placeholder={placeholder}
// // // // // //                     value={formData[id]}
// // // // // //                     onChange={handleChange}
// // // // // //                     required
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //             <Button type="submit" disabled={loading}>
// // // // // //               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
// // // // // //             </Button>
// // // // // //           </form>
// // // // // //           <div className="mt-4 text-center text-sm">
// // // // // //             Already registered?{" "}
// // // // // //             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
// // // // // //               Log in
// // // // // //             </a>
// // // // // //           </div>
// // // // // //         </CardContent>
// // // // // //       </Card>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState } from 'react';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react';

// // // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports (e.g., import { Card } from '@/components/ui/card';)
// // // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // // const CardContent = (props) => <div {...props} />;
// // // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // // export default function DeliverySignupPage() {
// // // // //   const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const router = useRouter();

// // // // //   const handleChange = (e) => {
// // // // //     setFormData({ ...formData, [e.target.id]: e.target.value });
// // // // //   };

// // // // //   const handleSignup = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       const res = await fetch('/api/auth/delivery/signup', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify(formData),
// // // // //       });

// // // // //       const data = await res.json();

// // // // //       if (data.success) {
// // // // //         alert("Registration Successful! Please log in.");
// // // // //         router.push('/auth/delivery/login');
// // // // //       } else {
// // // // //         throw new Error(data.error || "Signup failed.");
// // // // //       }
// // // // //     } catch (error) {
// // // // //       alert(`Error: ${error.message}`);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fields = [
// // // // //       { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
// // // // //       { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
// // // // //       { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon }, // 📞 Added Phone Input
// // // // //       { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
// // // // //   ];

// // // // //   return (
// // // // //     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // // //       <Card className="w-full max-w-md">
// // // // //         <CardHeader>
// // // // //           <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
// // // // //           <CardDescription>Register to gain exclusive access.</CardDescription>
// // // // //         </CardHeader>
// // // // //         <CardContent>
// // // // //           <form onSubmit={handleSignup} className="space-y-4">
// // // // //             {fields.map(({ id, type, placeholder, Icon }) => (
// // // // //               <div className="space-y-2" key={id}>
// // // // //                 <Label htmlFor={id} className="capitalize">{id.replace('password', 'Password').replace('phone', 'Phone Number')}</Label>
// // // // //                 <div className="relative">
// // // // //                   <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // //                   <Input
// // // // //                     id={id}
// // // // //                     type={type}
// // // // //                     placeholder={placeholder}
// // // // //                     value={formData[id]}
// // // // //                     onChange={handleChange}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //             <Button type="submit" disabled={loading}>
// // // // //               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
// // // // //             </Button>
// // // // //           </form>
// // // // //           <div className="mt-4 text-center text-sm">
// // // // //             Already registered?{" "}
// // // // //             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
// // // // //               Log in
// // // // //             </a>
// // // // //           </div>
// // // // //         </CardContent>
// // // // //       </Card>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react';

// // // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
// // // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // // const CardContent = (props) => <div {...props} />;
// // // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // // export default function DeliverySignupPage() {
// // // //   const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
// // // //   const [loading, setLoading] = useState(false);
// // // //   const router = useRouter();

// // // //   const handleChange = (e) => {
// // // //     setFormData({ ...formData, [e.target.id]: e.target.value });
// // // //   };

// // // //   const handleSignup = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     try {
// // // //       const res = await fetch('/api/auth/delivery/signup', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify(formData),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (data.success) {
// // // //         alert("Registration Successful! Please log in.");
// // // //         router.push('/auth/delivery/login');
// // // //       } else {
// // // //         throw new Error(data.error || "Signup failed.");
// // // //       }
// // // //     } catch (error) {
// // // //       alert(`Error: ${error.message}`);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fields = [
// // // //       { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
// // // //       { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
// // // //       { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon },
// // // //       { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
// // // //       {id:'role', type:'hidden', value:'delivery'},
// // // //   ];

// // // //   return (
// // // //     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // // //       <Card className="w-full max-w-md">
// // // //         <CardHeader>
// // // //           <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
// // // //           <CardDescription>Register to gain exclusive access.</CardDescription>
// // // //         </CardHeader>
// // // //         <CardContent>
// // // //           <form onSubmit={handleSignup} className="space-y-4">
// // // //             {fields.map(({ id, type, placeholder, Icon }) => (
// // // //               <div className="space-y-2" key={id}>
// // // //                 <Label htmlFor={id} className="capitalize">{id.replace('password', 'Password').replace('phone', 'Phone Number')}</Label>
// // // //                 <div className="relative">
// // // //                   <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // //                   <Input
// // // //                     id={id}
// // // //                     type={type}
// // // //                     placeholder={placeholder}
// // // //                     value={formData[id]}
// // // //                     onChange={handleChange}
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //             <Button type="submit" disabled={loading}>
// // // //               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
// // // //             </Button>
// // // //           </form>
// // // //           <div className="mt-4 text-center text-sm">
// // // //             Already registered?{" "}
// // // //             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
// // // //               Log in
// // // //             </a>
// // // //           </div>
// // // //         </CardContent>
// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // // Importing icons as React components
// // // import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react';

// // // // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
// // // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // // const CardContent = (props) => <div {...props} />;
// // // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// // // export default function DeliverySignupPage() {
// // //   const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
// // //   const [loading, setLoading] = useState(false);
// // //   const router = useRouter();

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.id]: e.target.value });
// // //   };

// // //   const handleSignup = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       const res = await fetch('/api/auth/delivery/signup', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(formData), 
// // //       });

// // //       const data = await res.json();

// // //       if (data.success) {
// // //         alert("Registration Successful! Please log in.");
// // //         router.push('/auth/delivery/login');
// // //       } else {
// // //         throw new Error(data.error || "Signup failed.");
// // //       }
// // //     } catch (error) {
// // //       alert(`Error: ${error.message}`);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fields = [
// // //       { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
// // //       { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
// // //       { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon },
// // //       { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
// // //   ];

// // //   return (
// // //     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// // //       <Card className="w-full max-w-md">
// // //         <CardHeader>
// // //           <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
// // //           <CardDescription>Register to gain exclusive access.</CardDescription>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <form onSubmit={handleSignup} className="space-y-4">
// // //             {fields.map((field) => ( // Use 'field' instead of destructuring 
// // //               <div className="space-y-2" key={field.id}>
// // //                 <Label htmlFor={field.id} className="capitalize">{field.id.replace('password', 'Password').replace('phone', 'Phone Number')}</Label>
// // //                 <div className="relative">
                  
// // //                   {/* 🔑 CRITICAL FIX: Use field.Icon as the component tag */}
// // //                   <field.Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  
// // //                   <Input
// // //                     id={field.id}
// // //                     type={field.type}
// // //                     placeholder={field.placeholder}
// // //                     value={formData[field.id]}
// // //                     onChange={handleChange}
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             <Button type="submit" disabled={loading}>
// // //               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
// // //             </Button>
// // //           </form>
// // //           <div className="mt-4 text-center text-sm">
// // //             Already registered?{" "}
// // //             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
// // //               Log in
// // //             </a>
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react';

// // // Placeholder UI components — keep or replace with your design system
// // const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// // const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// // const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// // const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// // const CardContent = (props) => <div {...props} />;
// // const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// // const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// // const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;

// // export default function DeliverySignupPage() {
// //   const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState(null); // { type: 'error'|'success', text: string }
// //   const router = useRouter();

// //   const handleChange = (e) => {
// //     setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
// //     setMessage(null);
// //   };

// //   // light client-side validation
// //   const validate = ({ name, email, phone, password }) => {
// //     if (!name.trim() || !email.trim() || !phone.trim() || !password) return "All fields are required.";
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(email)) return "Please enter a valid email address.";
// //     const phoneDigits = phone.replace(/\D/g, '');
// //     if (phoneDigits.length < 7) return "Please enter a valid phone number.";
// //     if (password.length < 6) return "Password must be at least 6 characters.";
// //     return null;
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     if (loading) return;
// //     const clientErr = validate(formData);
// //     if (clientErr) {
// //       setMessage({ type: 'error', text: clientErr });
// //       return;
// //     }

// //     setLoading(true);
// //     setMessage(null);

// //     try {
// //       const res = await fetch('/api/auth/delivery/signup', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();

// //       if (!res.ok || !data.success) {
// //         const errText = data?.error || 'Signup failed. Please try again.';
// //         setMessage({ type: 'error', text: errText });
// //       } else {
// //         setMessage({ type: 'success', text: data.message || 'Registered successfully!' });
// //         // small delay so user sees success message, then redirect to login
// //         setTimeout(() => router.push('/auth/delivery/login'), 900);
// //       }
// //     } catch (err) {
// //       setMessage({ type: 'error', text: err?.message || 'Network error. Try again.' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fields = [
// //     { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
// //     { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
// //     { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon },
// //     { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
// //   ];

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
// //       <Card className="w-full max-w-md">
// //         <CardHeader>
// //           <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
// //           <CardDescription>Register to gain exclusive access.</CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form onSubmit={handleSignup} className="space-y-4" noValidate>
// //             {fields.map((field) => (
// //               <div className="space-y-2" key={field.id}>
// //                 <Label htmlFor={field.id} className="capitalize">
// //                   {field.id === 'password' ? 'Password' : field.id === 'phone' ? 'Phone Number' : field.id.charAt(0).toUpperCase() + field.id.slice(1)}
// //                 </Label>
// //                 <div className="relative">
// //                   <field.Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //                   <Input
// //                     id={field.id}
// //                     type={field.type}
// //                     placeholder={field.placeholder}
// //                     value={formData[field.id]}
// //                     onChange={handleChange}
// //                     required
// //                     aria-label={field.id}
// //                   />
// //                 </div>
// //               </div>
// //             ))}

// //             {message && (
// //               <div
// //                 role="alert"
// //                 className={`px-3 py-2 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
// //               >
// //                 {message.text}
// //               </div>
// //             )}

// //             <Button type="submit" disabled={loading}>
// //               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
// //             </Button>
// //           </form>

// //           <div className="mt-4 text-center text-sm">
// //             Already registered?{' '}
// //             <a href="/auth/delivery/login" className="text-indigo-600 hover:underline cursor-pointer">
// //               Log in
// //             </a>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react';

// // ⚠️ PLACEHOLDERS: Assuming these UI components are imported/defined elsewhere
// const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// const CardContent = (props) => <div {...props} />;
// const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// export default function DeliverySignupPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/auth/delivery/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // formData only sends name, email, password, phone. Role is assigned on server.
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Registration Successful! Please log in.");
//         router.push('/auth/delivery/login');
//       } else {
//         throw new Error(data.error || "Signup failed.");
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fields = [
//       { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
//       { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
//       { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon },
//       { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
//   ];

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
//           <CardDescription>Register to gain exclusive access.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSignup} className="space-y-4">
//             {fields.map((field) => (
//               <div className="space-y-2" key={field.id}>
//                 <Label htmlFor={field.id} className="capitalize">{field.id.replace('password', 'Password').replace('phone', 'Phone Number')}</Label>
//                 <div className="relative">
//                     {/* Renders the Lucide icon component */}
//                   <field.Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     id={field.id}
//                     type={field.type}
//                     placeholder={field.placeholder}
//                     value={formData[field.id]}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             ))}
//             <Button type="submit" disabled={loading}>
//               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             Already registered?{" "}
//             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
//               Log in
//             </a>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Importing icons needed for the form fields
import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react'; 

// ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
const CardContent = (props) => <div {...props} />;
const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


export default function DeliverySignupPage() {
  // Set initial form state. Note: Order is changed to match the fields array order for convenience.
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  // Message state to display success or error feedback to the user
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text: string }
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setMessage(null);
  };

  // Light client-side validation function
  const validate = ({ name, email, phone, password }) => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password) return "All fields are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) return "Please enter a valid phone number.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    // Run client-side validation
    const clientErr = validate(formData);
    if (clientErr) {
      setMessage({ type: 'error', text: clientErr });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // API call to server-side signup handler (role is assigned securely on the server)
      const res = await fetch('/api/auth/delivery/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Handle non-2xx status codes or success: false response from server
        const errText = data?.error || 'Signup failed. Please try again.';
        setMessage({ type: 'error', text: errText });
      } else {
        // Success: Show message and redirect
        setMessage({ type: 'success', text: data.message || 'Registered successfully! Redirecting to login.' });
        // Small delay before redirecting to allow user to see the success message
        setTimeout(() => router.push('/auth/delivery/login'), 900);
      }
    } catch (err) {
      // Catch network failures (e.g., server unreachable)
      setMessage({ type: 'error', text: err?.message || 'Network error. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Configuration array for form fields
  const fields = [
    { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
    { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
    { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon },
    { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
          <CardDescription>Register to gain exclusive access.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4" noValidate>
            {fields.map((field) => (
              <div className="space-y-2" key={field.id}>
                <Label htmlFor={field.id} className="capitalize">
                  {/* Dynamic label generation: Password/Phone Number or Capitalized Field Name */}
                  {field.id === 'password' ? 'Password' : field.id === 'phone' ? 'Phone Number' : field.id.charAt(0).toUpperCase() + field.id.slice(1)}
                </Label>
                <div className="relative">
                  {/* Render Lucide icon component */}
                  <field.Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required
                    aria-label={field.id}
                  />
                </div>
              </div>
            ))}

            {message && (
              <div
                role="alert"
                className={`px-3 py-2 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              >
                {message.text}
              </div>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already registered?{' '}
            <a href="/auth/delivery/login" className="text-indigo-600 hover:underline cursor-pointer">
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}