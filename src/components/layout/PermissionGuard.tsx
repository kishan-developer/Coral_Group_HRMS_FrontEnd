'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
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

export function PermissionGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!pathname?.includes('/dashboard/hr_manager')) {
      setAccessDenied(false);
      return;
    }

    const managerId = getCurrentManagerId();
    if (!managerId) {
      setAccessDenied(false);
      return;
    }

    const requiredPerms = collectPermissionsFromPath(pathname);
    if (requiredPerms.length === 0) {
      setAccessDenied(false);
      return;
    }

    const userPerms = loadManagerPermissions(managerId);
    const hasAccess = requiredPerms.every((p) => userPerms.includes(p));

    if (!hasAccess) {
      if (pathname === FALLBACK_PATH) {
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
          <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-400" />
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
