'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User as UserIcon, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/slices/authSlice';
import RoleGuard from '@/components/auth/RoleGuard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Notifications from '@/components/layout/Navbar/Notifications';
import UserMenu from '@/components/layout/Navbar/UserMenu';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';
import FullscreenToggle from '@/components/common/FullscreenToggle';
import SecondHeader from '@/components/layout/Navbar/SecondHeader';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser(user?.id));
    router.push('/auth/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    const role = user.role;
    if (role === 'superadmin') return `/dashboard/superadmin/${user.id}/overview`;
    if (role === 'hr_manager') return `/dashboard/hr_manager/${user.id}/overview`;
    if (role === 'accounts') return `/dashboard/accounts/${user.id}/overview`;
    if (role === 'support') return `/dashboard/support/${user.id}/overview`;
    if (role === 'employee') return `/dashboard/employee/${user.id}/overview`;
    return '/dashboard';
  };

  const formatRoleLabel = (role?: string) => {
    if (!role) return 'USER';
    if (role === 'hr_manager') return 'HR MANAGER';
    return role.toUpperCase();
  };

  return (
    <RoleGuard>
      <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] font-sans antialiased">
        {/* Header */}
        <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-50 transition-all">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo & Brand Accent */}
              <div className="flex items-center space-x-3">
                <Link href={getDashboardLink()} className="flex items-center space-x-3 group">
                  <div className="h-10 w-auto flex items-center">
                    <img
                      src="/logo.png"
                      alt="Coral Group"
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                  {/* <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                      Coral Group
                    </span>
                    <span className="text-[10px] font-semibold text-[#94cb3d] uppercase tracking-wider mt-0.5">
                      HRMS Portal
                    </span>
                  </div> */}
                </Link>
              </div>

              {/* Desktop User Profile & Nav Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href={getDashboardLink()}
                  className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-[#94cb3d] dark:hover:text-[#94cb3d] transition-colors flex items-center gap-1"
                >
                  Dashboard
                  <ChevronRight className="h-3 w-3 text-zinc-400" />
                </Link>

                <div className="flex items-center space-x-3 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                  <div className="hidden lg:flex items-center space-x-2.5 bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 px-3 py-1.5 rounded-xl">
                    <div className="h-7 w-7 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center text-[#94cb3d]">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {user?.email?.split('@')[0] || 'Employee'}
                      </span>
                      <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                        {user?.email}
                      </span>
                    </div>
                    <Badge variant="brand" className="ml-1 text-[10px] py-0 px-2 uppercase font-bold">
                      {formatRoleLabel(user?.role)}
                    </Badge>
                  </div>

                  <FullscreenToggle />
                  <ThemeSwitcher />
                  <Notifications />
                  <UserMenu />

                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    {/* <span>Logout</span> */}
                  </Button>
                </div>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="md:hidden">
                <Button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  variant="ghost"
                  size="icon"
                  className="rounded-xl"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">

            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3">
              <Link
                href={getDashboardLink()}
                className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover:text-[#94cb3d]"
              >
                Dashboard Overview
              </Link>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center text-[#94cb3d]">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {user?.email}
                    </span>
                    <Badge variant="brand" className="w-fit text-[10px]">
                      {formatRoleLabel(user?.role)}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="sm"
                  className="w-full justify-center rounded-xl"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout Account
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Second Header Bar for Active Page & Subpage Navigation */}
        <SecondHeader />

        {/* Main Content */}
        <main className="transition-all duration-200">{children}</main>
      </div>
    </RoleGuard>
  );
}
