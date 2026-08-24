'use client';

import Notifications from './Notifications';
import UserMenu from './UserMenu';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';
import FullscreenToggle from '@/components/common/FullscreenToggle';
import { type Role } from '../Sidebar/sidebar.config';

export default function Navbar({ role: _role = 'superadmin' }: { role?: Role }) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3.5 shadow-sm">
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-3">
          <FullscreenToggle />
          <ThemeSwitcher />
          <Notifications />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
