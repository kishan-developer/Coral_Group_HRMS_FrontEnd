'use client';

import { ChevronDown, ChevronRight, Layers } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { NavItem } from './sidebar.config';
import SidebarItem from './SidebarItem';

interface SidebarGroupProps {
  item: NavItem;
  depth?: number;
  collapsed?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}

export default function SidebarGroup({
  item,
  depth = 0,
  collapsed = false,
  expanded = false,
  onToggle,
}: SidebarGroupProps) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;

  /* Leaf items (no children) render as direct links via SidebarItem */
  if (!hasChildren) {
    return <SidebarItem item={item} depth={depth} collapsed={collapsed} />;
  }

  const Icon = item.icon;
  const isAnyChildActive = hasChildren && item.children!.some((child) => pathname === child.href);

  /* Minimized Sidebar Popover for Menu with Subpages */
  if (collapsed) {
    return (
      <div className="relative group flex items-center justify-center">
        <button
          type="button"
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            isAnyChildActive
              ? 'bg-[#94cb3d] text-white shadow-md shadow-[#94cb3d]/25'
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
        </button>

        {/* Hover Flyout Menu for Subpages */}
        <div className="absolute left-full top-0 ml-3 z-50 hidden group-hover:block w-60 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl py-2.5 transition-all duration-200">
          {/* Arrow pointing left to parent icon */}
          <div className="absolute right-full top-4 border-6 border-transparent border-r-white dark:border-r-zinc-900" />
          
          <div className="px-3.5 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-[#94cb3d]" />
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 tracking-wide uppercase">
                {item.name}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#94cb3d] bg-[#94cb3d]/15 px-2 py-0.5 rounded-full">
              {item.children!.length} Subpages
            </span>
          </div>

          <div className="px-1.5 space-y-0.5 max-h-72 overflow-y-auto">
            {item.children!.map((child) => (
              <SidebarItem key={child.name} item={child} depth={depth + 1} collapsed={false} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* Uncollapsed / Expanded Group View */
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
          isAnyChildActive || expanded
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold'
            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 shrink-0 ${isAnyChildActive ? 'text-[#94cb3d]' : ''}`} />
          <span className="truncate">{item.name}</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 shrink-0 text-zinc-400" />
        ) : (
          <ChevronRight className="w-4 h-4 shrink-0 text-zinc-400" />
        )}
      </button>

      {expanded && (
        <div className="mt-1 ml-4 pl-2 border-l border-zinc-200 dark:border-zinc-800 space-y-1">
          {item.children!.map((child) => (
            <SidebarItem key={child.name} item={child} depth={depth + 1} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
}
