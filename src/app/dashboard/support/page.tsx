'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function SupportPageRedirect() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let userId = user?.id;
    if (!userId && typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          userId = parsed.id;
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (userId) {
      router.replace(`/dashboard/support/${userId}/overview`);
    } else {
      router.replace('/auth/login');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-zinc-500 font-sans">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
        <p className="text-xs font-medium">Redirecting to Support Portal Command Center...</p>
      </div>
    </div>
  );
}
