'use client';

import { LogOut, ShieldCheck } from 'lucide-react';
import { logout } from '@/lib/auth';
import { type Role } from '../Sidebar/sidebar.config';

interface SidebarFooterProps {
  role: Role;
  collapsed?: boolean;
  onRoleToggle?: () => void;
}

export default function SidebarFooter({ role, collapsed = false, onRoleToggle }: SidebarFooterProps) {
  const getSwitchToRole = () => {
    switch (role) {
      case 'superadmin': return 'HR Manager';
      case 'hr_manager': return 'Super Admin';
      default: return 'Super Admin';
    }
  };

  if (collapsed) {
    return (
      <div className="px-2 py-3 space-y-2 border-t border-zinc-200 dark:border-zinc-800">
        {onRoleToggle && (
          <button
            type="button"
            onClick={onRoleToggle}
            className="relative flex w-full items-center justify-center px-3 py-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
            title={`Switch to ${getSwitchToRole()}`}
          >
            <ShieldCheck className="w-4 h-4 text-[#94cb3d]" />
            <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md bg-zinc-900 dark:bg-zinc-700 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
              Switch to {getSwitchToRole()}
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={() => logout()}
          className="relative flex w-full items-center justify-center px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md bg-zinc-900 dark:bg-zinc-700 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
            Sign out
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
      {onRoleToggle && (
        <button
          type="button"
          onClick={onRoleToggle}
          className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-[#94cb3d]" />
          <span className="text-xs font-medium">
            Switch to {getSwitchToRole()}
          </span>
        </button>
      )}
      <button
        type="button"
        onClick={() => logout()}
        className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-xs font-medium">Sign out</span>
      </button>
    </div>
  );
}
