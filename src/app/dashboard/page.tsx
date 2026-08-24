'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('intendedUrl', '/dashboard');
      }
      router.replace('/auth/login');
      return;
    }

    const role = user.role;
    const userId = user.id;

    const intendedUrl = localStorage.getItem('intendedUrl');
    if (intendedUrl) {
      localStorage.removeItem('intendedUrl');
      router.replace(intendedUrl);
      return;
    }

    if (role === 'superadmin') {
      router.replace(`/dashboard/superadmin/${userId}/overview`);
    } else if (role === 'hr_manager') {
      router.replace(`/dashboard/hr_manager/${userId}/overview`);
    } else if (role === 'accounts') {
      router.replace(`/dashboard/accounts/${userId}/overview`);
    } else if (role === 'support') {
      router.replace(`/dashboard/support/${userId}/overview`);
    } else if (role === 'employee') {
      router.replace(`/dashboard/employee/${userId}/overview`);
    } else {
      router.replace(`/dashboard/employee/${userId}/overview`);
    }
  }, [user, isAuthenticated, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-zinc-500 dark:text-zinc-400">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
        <p className="text-sm font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
