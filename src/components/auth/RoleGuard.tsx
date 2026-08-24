'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('intendedUrl', pathname);
      }
      router.push('/auth/login');
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to their respective correct role dashboard
      const role = user.role;
      const userId = user.id;

      if (role === 'superadmin') {
        router.push(`/dashboard/superadmin/${userId}/overview`);
      } else if (role === 'hr_manager') {
        router.push(`/dashboard/hr_manager/${userId}/overview`);
      } else if (role === 'accounts') {
        router.push(`/dashboard/accounts/${userId}/overview`);
      } else if (role === 'support') {
        router.push(`/dashboard/support/${userId}/overview`);
      } else if (role === 'employee') {
        router.push(`/dashboard/employee/${userId}/overview`);
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isAuthenticated, isLoading, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

export default RoleGuard;
