// // // // // // // import { getServerSession } from 'next-auth';
// // // // // // // import { redirect } from 'next/navigation';

// // // // // // // export default async function DeliveryLayout({ children }) {
// // // // // // //   const session = await getServerSession();

// // // // // // //   // 1. Check if the user is logged in
// // // // // // //   if (!session) {
// // // // // // //     redirect('/auth/delivery/login');
// // // // // // //   }

// // // // // // //   // 2. CRITICAL: Check the user's role
// // // // // // //   if (session.user?.role !== 'delivery') {
// // // // // // //     // Redirect unauthorized users (standard users, admins) away
// // // // // // //     redirect('/auth/signin'); 
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="bg-gray-50 min-h-screen">
// // // // // // //       <header className="bg-white shadow-sm p-4 text-center">
// // // // // // //         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
// // // // // // //       </header>
// // // // // // //       <main className="max-w-7xl mx-auto">
// // // // // // //         {children}
// // // // // // //       </main>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import { getServerSession } from 'next-auth';
// // // // // // import { redirect } from 'next/navigation';

// // // // // // export default async function DeliveryLayout({ children }) {
// // // // // //   const session = await getServerSession();

// // // // // //   if (!session) {
// // // // // //     redirect('/auth/delivery/login');
// // // // // //   }

// // // // // //   // CRITICAL: Check the user's role
// // // // // //   if (session.user?.role !== 'delivery') {
// // // // // //     redirect('/auth/signin'); 
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="bg-gray-50 min-h-screen">
// // // // // //       <header className="bg-white shadow-sm p-4 text-center">
// // // // // //         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
// // // // // //       </header>
// // // // // //       <main className="max-w-7xl mx-auto">
// // // // // //         {children}
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import { getServerSession } from 'next-auth';
// // // // // import { redirect } from 'next/navigation';

// // // // // export default async function DeliveryLayout({ children }) {
// // // // //   const session = await getServerSession();

// // // // //   // 1. Check if the user is logged in
// // // // //   if (!session) {
// // // // //     redirect('/auth/delivery/login');
// // // // //   }

// // // // //   // 2. CRITICAL: Check the user's role
// // // // //   // This check relies on the NextAuth config (see Step 3) to pass the role.
// // // // //   if (session.user?.role !== 'delivery') {
// // // // //     // Redirect unauthorized users (standard users, admins) away
// // // // //     redirect('/auth/signin'); 
// // // // //   }

// // // // //   return (
// // // // //     <div className="bg-gray-50 min-h-screen">
// // // // //       <header className="bg-white shadow-sm p-4 text-center">
// // // // //         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
// // // // //       </header>
// // // // //       <main className="max-w-7xl mx-auto">
// // // // //         {children}
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import { getServerSession } from 'next-auth';
// // // // import { redirect } from 'next/navigation';

// // // // export default async function DeliveryLayout({ children }) {
// // // //   const session = await getServerSession();

// // // //   if (!session) {
// // // //     redirect('/auth/delivery/login');
// // // //   }

// // // //   // CRITICAL: Check the user's role, relies on NextAuth callbacks
// // // //   if (session.user?.role !== 'delivery') {
// // // //     redirect('/auth/signin'); 
// // // //   }

// // // //   return (
// // // //     <div className="bg-gray-50 min-h-screen">
// // // //       <header className="bg-white shadow-sm p-4 text-center">
// // // //         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
// // // //       </header>
// // // //       <main className="max-w-7xl mx-auto">
// // // //         {children}
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }
// // // import { getServerSession } from 'next-auth';
// // // import { redirect } from 'next/navigation';

// // // export default async function DeliveryLayout({ children }) {
// // //   const session = await getServerSession();

// // //   if (!session) {
// // //     redirect('/auth/delivery/login');
// // //   }

// // //   // CRITICAL: Check the user's role, relies on NextAuth callbacks
// // //   if (session.user?.role !== 'delivery') {
// // //     redirect('/auth/signin'); 
// // //   }

// // //   return (
// // //     <div className="bg-gray-50 min-h-screen">
// // //       <header className="bg-white shadow-sm p-4 text-center">
// // //         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
// // //       </header>
// // //       <main className="max-w-7xl mx-auto">
// // //         {children}
// // //       </main>
// // //     </div>
// // //   );
// // // }
// // import { getServerSession } from 'next-auth';
// // import { redirect } from 'next/navigation';

// // export default async function DeliveryLayout({ children }) {
// //   const session = await getServerSession();

// //   if (!session) {
// //     // User is not logged in at all -> send to delivery login page
// //     redirect('/auth/delivery/login');
// //   }

// //   // CRITICAL: Check the user's role
// //   // If the role is NOT 'delivery', send them to the generic sign-in page 
// //   // or an access denied page.
// //   if (session.user?.role !== 'delivery') {
// //     redirect('/auth/signin'); 
// //   }

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       <header className="bg-white shadow-sm p-4 text-center">
// //         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
// //       </header>
// //       <main className="max-w-7xl mx-auto">
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// export default async function DeliveryLayout({ children }) {
//   const session = await getServerSession();

//   console.log("[DeliveryLayout] session:", session);

//   if (!session) {
//     console.log("[DeliveryLayout] No session, redirecting to login");
//     redirect('/auth/delivery/login');
//   }

//   // CRITICAL: Check the user's role
//   const userRole = session.user?.role;
//   console.log("[DeliveryLayout] userRole:", userRole);

//   if (userRole !== 'delivery') {
//     console.log("[DeliveryLayout] Invalid role, redirecting to signin");
//     // If they are a standard user or admin, send them to their generic sign-in page
//     redirect('/auth/signin'); 
//   }

//   console.log("[DeliveryLayout] Access granted, rendering dashboard");
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <header className="bg-white shadow-sm p-4 text-center">
//         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
//       </header>
//       <main className="max-w-7xl mx-auto">
//         {children}
//       </main>
//     </div>
//   );
// }
// // export default async function DeliveryLayout({ children }) {
// //   const session = await getServerSession();

// //   if (!session) {
// //     redirect('/auth/delivery/login');
// //   }

// //   // CRITICAL: Check the user's role
// //   if (session.user?.role !== 'delivery') {
// //     // If they are a standard user or admin, send them to their generic sign-in page
// //     redirect('/auth/signin'); 
// //   }

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       <header className="bg-white shadow-sm p-4 text-center">
// //         <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
// //       </header>
// //       <main className="max-w-7xl mx-auto">
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // 🔄 ENSURE: Correct path/alias

export default async function DeliveryLayout({ children }) {
  const session = await getServerSession(authOptions); // 🔄 CRITICAL: Pass authOptions for callbacks
  console.log("[DeliveryLayout] raw session:", JSON.stringify(session, null, 2)); // 🔄 LOG: Full session
  const userRole = session?.user?.role;
  console.log("[DeliveryLayout] userRole:", userRole); // 🔄 LOG: Role check
  if (!session) {
    console.log("[DeliveryLayout] No session, redirecting to delivery login");
    redirect('/auth/delivery/login');
  }
  if (userRole !== 'delivery') {
    console.log("[DeliveryLayout] Invalid role:", userRole, ", redirecting to signin");
    redirect('/auth/signin');
  }
  console.log("[DeliveryLayout] Valid delivery role, rendering");
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm p-4 text-center">
        <h2 className="text-xl font-semibold text-indigo-700">Delivery Partner Portal</h2>
      </header>
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}