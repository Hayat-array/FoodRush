'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * ProtectedRoute Component
 * Protects routes based on required roles
 * 
 * @param {Array} allowedRoles - Array of roles that can access this route
 * @param {ReactNode} children - Child components to render if authorized
 */
export default function ProtectedRoute({ allowedRoles = [], children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        // Not authenticated
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        // Authenticated but wrong role
        if (status === 'authenticated' && allowedRoles.length > 0) {
            const userRole = session?.user?.role;

            if (!allowedRoles.includes(userRole)) {
                // Redirect to appropriate dashboard
                switch (userRole) {
                    case 'super_admin':
                        router.push('/admin/dashboard');
                        break;
                    case 'restaurant_owner':
                        router.push('/restaurant/dashboard');
                        break;
                    case 'delivery':
                        router.push('/delivery/dashboard');
                        break;
                    default:
                        router.push('/');
                }
            }
        }
    }, [session, status, router, allowedRoles]);

    // Loading state
    if (status === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (status === 'unauthenticated') {
        return null;
    }

    // Wrong role
    if (allowedRoles.length > 0 && !allowedRoles.includes(session?.user?.role)) {
        return null;
    }

    // Authorized
    return <>{children}</>;
}
