'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

/**
 * RoleBasedRedirect Component
 * Redirects users to appropriate dashboard based on their role
 */
export default function RoleBasedRedirect() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'authenticated' && session?.user?.role) {
            const role = session.user.role;

            // Redirect based on role
            switch (role) {
                case 'super_admin':
                    router.push('/admin/dashboard');
                    break;
                case 'restaurant_owner':
                    router.push('/restaurant/dashboard');
                    break;
                case 'delivery':
                    router.push('/delivery/dashboard');
                    break;
                case 'user':
                default:
                    router.push('/');
                    break;
            }
        }
    }, [session, status, router]);

    return null;
}
