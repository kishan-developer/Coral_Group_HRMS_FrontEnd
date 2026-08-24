'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import {
  superadminNavigation,
  hrManagerNavigation,
  accountsNavigation,
  supportNavigation,
  employeeNavigation,
  NavItem,
  Role,
} from '../Sidebar/sidebar.config';

export default function SecondHeader() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const getNavigationForRole = (role?: Role): NavItem[] => {
    switch (role) {
      case 'superadmin':
        return superadminNavigation;
      case 'hr_manager':
        return hrManagerNavigation;
      case 'accounts':
        return accountsNavigation;
      case 'support':
        return supportNavigation;
      case 'employee':
        return employeeNavigation;
      default:
        return superadminNavigation;
    }
  };

  const navItems = getNavigationForRole(user.role as Role);

  // Replace :userId token in hrefs
  const replaceUserId = (href: string) => {
    return href.replace(':userId', user.id || 'me');
  };

  // Determine active main parent item and active sub-item
  let activeParent: NavItem | null = null;
  let activeSubItem: { name: string; href: string; icon?: any } | null = null;

  for (const item of navItems) {
    const parentHrefResolved = replaceUserId(item.href);

    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        const childHrefResolved = replaceUserId(child.href);
        if (pathname === childHrefResolved || pathname.startsWith(childHrefResolved + '/')) {
          activeParent = item;
          activeSubItem = child;
          break;
        }
      }
    }

    if (!activeParent && (pathname === parentHrefResolved || (parentHrefResolved !== '/' && pathname.startsWith(parentHrefResolved)))) {
      activeParent = item;
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 shadow-xs transition-all sticky top-16 z-40">
      {/* Row 1: Top-Level Main Categories Bar */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 border-b border-zinc-100 dark:border-zinc-800/60 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {navItems.map((item) => {
            const itemHrefResolved = replaceUserId(item.href);
            const Icon = item.icon;

            // Check if this item or any of its children is active
            let isParentActive = pathname === itemHrefResolved || (itemHrefResolved !== '/' && pathname.startsWith(itemHrefResolved));

            if (!isParentActive && item.children) {
              isParentActive = item.children.some((child) => {
                const childHref = replaceUserId(child.href);
                return pathname === childHref || pathname.startsWith(childHref + '/');
              });
            }

            return (
              <Link
                key={item.name + item.href}
                href={itemHrefResolved}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 border ${
                  isParentActive
                    ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Row 2: Subpage Tabs Bar for Active Category */}
      {activeParent && activeParent.children && activeParent.children.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 py-2 bg-zinc-50/60 dark:bg-zinc-950/40 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mr-1">
              Subpages:
            </span>
            {activeParent.children.map((child) => {
              const childHrefResolved = replaceUserId(child.href);
              const ChildIcon = child.icon;
              const isSubActive =
                pathname === childHrefResolved ||
                (childHrefResolved !== '/' && pathname.startsWith(childHrefResolved + '/'));

              return (
                <Link
                  key={child.name + child.href}
                  href={childHrefResolved}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all duration-150 border ${
                    isSubActive
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs font-bold'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {ChildIcon && <ChildIcon className="h-3 w-3" />}
                  <span>{child.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
