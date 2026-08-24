import { STORAGE_KEYS } from './constants';
import type { Permission } from '@/components/layout/Sidebar/sidebar.config';

export type { Permission };

export interface ManagerProfile {
  id: string;
  name: string;
  email: string;
}

export interface ManagerPermissionConfig {
  managerId: string;
  permissions: Permission[];
}

const ALL_PERMISSIONS: Permission[] = [
  'overview',
  'team',
  'attendance',
  'leave',
  'performance',
  'payroll',
  'recruitment',
  'training',
  'assets',
  'reports',
];

export function getDefaultPermissions(): Permission[] {
  return [...ALL_PERMISSIONS];
}

export function getAllPermissions(): Permission[] {
  return [...ALL_PERMISSIONS];
}

export function getPermissionLabel(permission: Permission): string {
  const labels: Record<Permission, string> = {
    overview: 'Overview',
    team: 'Team Management',
    attendance: 'Attendance',
    leave: 'Leave',
    performance: 'Performance',
    payroll: 'Payroll',
    recruitment: 'Recruitment',
    training: 'Training',
    assets: 'Assets',
    reports: 'Reports',
  };
  return labels[permission];
}

/* localStorage helpers */

const PERMISSIONS_KEY = 'hrms.permissions';

export function loadManagerPermissions(managerId: string): Permission[] {
  if (typeof window === 'undefined') return getDefaultPermissions();
  try {
    const raw = localStorage.getItem(PERMISSIONS_KEY);
    if (!raw) return getDefaultPermissions();
    const configs: ManagerPermissionConfig[] = JSON.parse(raw);
    const found = configs.find((c) => c.managerId === managerId);
    return found ? found.permissions : getDefaultPermissions();
  } catch {
    return getDefaultPermissions();
  }
}

export function saveManagerPermissions(managerId: string, permissions: Permission[]): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(PERMISSIONS_KEY);
    const configs: ManagerPermissionConfig[] = raw ? JSON.parse(raw) : [];
    const idx = configs.findIndex((c) => c.managerId === managerId);
    if (idx >= 0) {
      configs[idx] = { managerId, permissions };
    } else {
      configs.push({ managerId, permissions });
    }
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(configs));
  } catch {
    // ignore
  }
}

export function loadAllPermissionConfigs(): ManagerPermissionConfig[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PERMISSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function hasPermission(
  allowed: Permission[],
  permission?: Permission
): boolean {
  if (!permission) return true; // items without explicit permission are always visible
  return allowed.includes(permission);
}

export function getCurrentManagerId(): string {
  if (typeof window === 'undefined') return 'default';
  try {
    const userRaw = localStorage.getItem(STORAGE_KEYS.USER);
    if (userRaw) {
      const user = JSON.parse(userRaw);
      if (user?.id) return String(user.id);
    }
  } catch {
    // ignore
  }
  return 'default';
}
