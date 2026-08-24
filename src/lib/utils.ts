import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DASHBOARD_ROUTES, ROLES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRoleDashboardUrl(role?: string, userId?: string): string {
  if (!role || !userId) return '/dashboard';
  if (role === ROLES.SUPERADMIN) return DASHBOARD_ROUTES.SUPERADMIN(userId);
  if (role === ROLES.HR_MANAGER) return DASHBOARD_ROUTES.HR_MANAGER(userId);
  if (role === ROLES.ACCOUNTS) return DASHBOARD_ROUTES.ACCOUNTS(userId);
  if (role === ROLES.SUPPORT) return DASHBOARD_ROUTES.SUPPORT(userId);
  if (role === ROLES.EMPLOYEE) return DASHBOARD_ROUTES.EMPLOYEE(userId);
  return '/dashboard';
}
