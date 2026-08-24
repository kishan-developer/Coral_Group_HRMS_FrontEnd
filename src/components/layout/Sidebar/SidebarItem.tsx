'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from './sidebar.config';

interface SidebarItemProps {
  item: NavItem;
  depth?: number;
  collapsed?: boolean;
}

export default function SidebarItem({ item, depth = 0, collapsed = false }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  const paddingClass = depth === 0 ? 'px-4' : 'px-3';
  const textSize = depth === 0 ? 'text-sm' : 'text-xs';

  if (collapsed) {
    return (
      <div className="relative group flex items-center justify-center">
        <Link
          href={item.href}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-[#94cb3d] text-white shadow-md shadow-[#94cb3d]/25'
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
        </Link>

        {/* Floating Tooltip for Minimized Single Page */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 hidden group-hover:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none transition-all duration-150 border border-zinc-700/60">
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900 dark:border-r-zinc-800" />
          <span>{item.name}</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 ${paddingClass} py-2.5 rounded-lg transition-colors ${
        isActive
          ? 'bg-[#94cb3d] text-white font-medium shadow-sm'
          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium'
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className={`${textSize} truncate`}>{item.name}</span>
    </Link>
  );
}
