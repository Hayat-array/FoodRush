// // // 'use client';

// // // import { useState } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { Eye, EyeOff, Mail, Lock, User, ArrowRight, UserPlus } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Alert, AlertDescription } from '@/components/ui/alert';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // import Link from 'next/link';

// // // export default function SignUpPage() {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //     confirmPassword: '',
// // //     phone: '',
// // //     role: 'user'
// // //   });
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [success, setSuccess] = useState(false);
// // //   const router = useRouter();

// // //   const handleChange = (e) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [e.target.name]: e.target.value
// // //     }));
// // //   };

// // //   const handleRoleChange = (value) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       role: value
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError('');

// // //     if (formData.password !== formData.confirmPassword) {
// // //       setError('Passwords do not match');
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('/api/auth/signup', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           name: formData.name,
// // //           email: formData.email,
// // //           password: formData.password,
// // //           phone: formData.phone,
// // //           role: formData.role
// // //         }),
// // //       });

// // //       const result = await response.json();

// // //       if (result.success) {
// // //         setSuccess(true);
// // //         setTimeout(() => {
// // //           router.push('/auth/signin');
// // //         }, 2000);
// // //       } else {
// // //         setError(result.error || 'Failed to create account');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error signing up:', error);
// // //       setError('Something went wrong. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (success) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
// // //         <Card className="w-full max-w-md">
// // //           <CardContent className="p-8 text-center">
// // //             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <UserPlus className="w-8 h-8 text-green-600" />
// // //             </div>
// // //             <h2 className="text-2xl font-bold mb-2">Account Created Successfully!</h2>
// // //             <p className="text-gray-600 mb-4">
// // //               Your account has been created. Redirecting to sign in...
// // //             </p>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
// // //       <Card className="w-full max-w-md">
// // //         <CardHeader className="text-center">
// // //           <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //             <span className="text-2xl font-bold text-orange-600">FR</span>
// // //           </div>
// // //           <CardTitle className="text-2xl">Create Account</CardTitle>
// // //           <p className="text-gray-600">Join FoodRush today</p>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <form onSubmit={handleSubmit} className="space-y-4">
// // //             {error && (
// // //               <Alert variant="destructive">
// // //                 <AlertDescription>{error}</AlertDescription>
// // //               </Alert>
// // //             )}
            
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Full Name</label>
// // //               <div className="relative">
// // //                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //                 <Input
// // //                   type="text"
// // //                   name="name"
// // //                   value={formData.name}
// // //                   onChange={handleChange}
// // //                   placeholder="Enter your full name"
// // //                   className="pl-10"
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Email</label>
// // //               <div className="relative">
// // //                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //                 <Input
// // //                   type="email"
// // //                   name="email"
// // //                   value={formData.email}
// // //                   onChange={handleChange}
// // //                   placeholder="Enter your email"
// // //                   className="pl-10"
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Phone Number</label>
// // //               <div className="relative">
// // //                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //                 <Input
// // //                   type="tel"
// // //                   name="phone"
// // //                   value={formData.phone}
// // //                   onChange={handleChange}
// // //                   placeholder="Enter your phone number"
// // //                   className="pl-10"
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Account Type</label>
// // //               <Select value={formData.role} onValueChange={handleRoleChange}>
// // //                 <SelectTrigger>
// // //                   <SelectValue placeholder="Select account type" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="user">Customer</SelectItem>
// // //                   <SelectItem value="restaurant_owner">Restaurant Owner</SelectItem>
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Password</label>
// // //               <div className="relative">
// // //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //                 <Input
// // //                   type={showPassword ? 'text' : 'password'}
// // //                   name="password"
// // //                   value={formData.password}
// // //                   onChange={handleChange}
// // //                   placeholder="Enter your password"
// // //                   className="pl-10 pr-10"
// // //                   required
// // //                   minLength="6"
// // //                 />
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setShowPassword(!showPassword)}
// // //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // //                 >
// // //                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // //                 </button>
// // //               </div>
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Confirm Password</label>
// // //               <div className="relative">
// // //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //                 <Input
// // //                   type={showConfirmPassword ? 'text' : 'password'}
// // //                   name="confirmPassword"
// // //                   value={formData.confirmPassword}
// // //                   onChange={handleChange}
// // //                   placeholder="Confirm your password"
// // //                   className="pl-10 pr-10"
// // //                   required
// // //                   minLength="6"
// // //                 />
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // //                 >
// // //                   {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // //                 </button>
// // //               </div>
// // //             </div>
            
// // //             <div className="flex items-center">
// // //               <input type="checkbox" className="mr-2" required />
// // //               <span className="text-sm">
// // //                 I agree to{' '}
// // //                 <Link href="/terms" className="text-orange-600 hover:underline">
// // //                   Terms of Service
// // //                 </Link>
// // //                 {' '}
// // //                 and{' '}
// // //                 <Link href="/privacy" className="text-orange-600 hover:underline">
// // //                   Privacy Policy
// // //                 </Link>
// // //               </span>
// // //             </div>
            
// // //             <Button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="w-full bg-orange-500 hover:bg-orange-600"
// // //             >
// // //               {loading ? 'Creating Account...' : 'Create Account'}
// // //               <ArrowRight className="w-4 h-4 ml-2" />
// // //             </Button>
// // //           </form>
          
// // //           <div className="mt-6 text-center">
// // //             <p className="text-sm text-gray-600">
// // //               Already have an account?{' '}
// // //               <Link href="/auth/signin" className="text-orange-600 hover:underline font-medium">
// // //                 Sign in
// // //               </Link>
// // //             </p>
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // import { Loader2, User, Mail, Phone, Lock } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// // import { useToast } from "@/hooks/use-toast";

// // export default function SignUpPage() {
// //   const router = useRouter();
// //   const { toast } = useToast();
// //   const [loading, setLoading] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //   });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const res = await fetch("/api/auth/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();

// //       if (!data.success) {
// //         throw new Error(data.message);
// //       }

// //       toast({
// //         title: "Account created!",
// //         description: "You can now sign in with your credentials.",
// //       });

// //       router.push("/auth/signin");
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: error.message || "Something went wrong",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
// //       <Card className="w-full max-w-md">
// //         <CardHeader className="text-center">
// //           <CardTitle className="text-2xl font-bold text-orange-600">FoodRush</CardTitle>
// //           <CardDescription>Create an account to order food</CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="relative">
// //               <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 placeholder="Full Name"
// //                 className="pl-9"
// //                 value={formData.name}
// //                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                 required
// //               />
// //             </div>
// //             <div className="relative">
// //               <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 type="email"
// //                 placeholder="Email Address"
// //                 className="pl-9"
// //                 value={formData.email}
// //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                 required
// //               />
// //             </div>
// //             <div className="relative">
// //               <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 type="tel"
// //                 placeholder="Phone Number"
// //                 className="pl-9"
// //                 value={formData.phone}
// //                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                 required
// //               />
// //             </div>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 type="password"
// //                 placeholder="Password"
// //                 className="pl-9"
// //                 value={formData.password}
// //                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //                 required
// //                 minLength={6}
// //               />
// //             </div>
// //             <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
// //               {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
// //             </Button>
// //           </form>
// //         </CardContent>
// //         <CardFooter className="flex justify-center">
// //           <p className="text-sm text-gray-600">
// //             Already have an account?{" "}
// //             <Link href="/auth/signin" className="text-orange-600 hover:underline font-medium">
// //               Sign in
// //             </Link>
// //           </p>
// //         </CardFooter>
// //       </Card>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, Mail, Lock, LogIn, Phone as PhoneIcon } from 'lucide-react';

// // ⚠️ PLACEHOLDERS: Replace these with your actual UI component imports
// const Card = (props) => <div className="border rounded-lg p-6 shadow-lg bg-white" {...props} />;
// const CardHeader = (props) => <div className="mb-4 text-center" {...props} />;
// const CardTitle = (props) => <h2 className="text-2xl font-bold" {...props} />;
// const CardDescription = (props) => <p className="text-gray-500 text-sm" {...props} />;
// const CardContent = (props) => <div {...props} />;
// const Label = (props) => <label className="block text-sm font-medium text-gray-700" {...props} />;
// const Input = (props) => <input className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" {...props} />;
// const Button = (props) => <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300" {...props} />;


// export default function DeliverySignupPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/auth/delivery/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Registration Successful! Please log in.");
//         router.push('/auth/delivery/login');
//       } else {
//         throw new Error(data.error || "Signup failed.");
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fields = [
//       { id: 'name', type: 'text', placeholder: 'Full Name', Icon: User },
//       { id: 'email', type: 'email', placeholder: 'partner@domain.com', Icon: Mail },
//       { id: 'phone', type: 'tel', placeholder: '9876543210', Icon: PhoneIcon },
//       { id: 'password', type: 'password', placeholder: '********', Icon: Lock },
//   ];

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-indigo-600">Partner Registration</CardTitle>
//           <CardDescription>Register to gain exclusive access.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSignup} className="space-y-4">
//             {fields.map(({ id, type, placeholder, Icon }) => (
//               <div className="space-y-2" key={id}>
//                 <Label htmlFor={id} className="capitalize">{id.replace('password', 'Password').replace('phone', 'Phone Number')}</Label>
//                 <div className="relative">
//                   <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     id={id}
//                     type={type}
//                     placeholder={placeholder}
//                     value={formData[id]}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             ))}
//             <Button type="submit" disabled={loading}>
//               {loading ? "Registering..." : (<><LogIn className="mr-2 h-4 w-4" /> Sign Up</>)}
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             Already registered?{" "}
//             <a href='/auth/delivery/login' className="text-indigo-600 hover:underline cursor-pointer">
//               Log in
//             </a>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }