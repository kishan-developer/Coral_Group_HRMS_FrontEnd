'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hrManagerNavigation, type Permission } from './Sidebar/sidebar.config';
import { getCurrentManagerId, loadManagerPermissions } from '@/lib/permissions';

const FALLBACK_PATH = '/dashboard/hr_manager';

function collectPermissionsFromPath(path: string): Permission[] {
  const perms: Permission[] = [];
  for (const item of hrManagerNavigation) {
    if (!item.permission) continue;
    if (path === item.href || path.startsWith(item.href + '/')) {
      perms.push(item.permission);
    }
    if (item.children) {
      for (const child of item.children) {
        if (path === child.href || path.startsWith(child.href + '/')) {
          if (item.permission && !perms.includes(item.permission)) {
            perms.push(item.permission);
          }
        }
      }
    }
  }
  return perms;
}

export default function PermissionGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!pathname?.startsWith('/dashboard/hr_manager')) return;

    const managerId = getCurrentManagerId();
    const allowed = loadManagerPermissions(managerId);
    const required = collectPermissionsFromPath(pathname);

    const hasAccess = required.length === 0 || required.some((p) => allowed.includes(p));
    if (!hasAccess) {
      if (pathname === FALLBACK_PATH) {
        /* Already at fallback – show access denied instead of looping */
        setAccessDenied(true);
      } else {
        router.replace(FALLBACK_PATH);
      }
    } else {
      setAccessDenied(false);
    }
  }, [pathname, router]);

  if (accessDenied) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
          <span className="text-2xl">🚫</span>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Access Denied</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">
          You do not have permission to access this module. Contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
