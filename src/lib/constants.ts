export const APP_NAME = 'Coral Group HRMS';

export const ROLES = {
  SUPERADMIN: 'superadmin',
  HR_MANAGER: 'hr_manager',
  ACCOUNTS: 'accounts',
  SUPPORT: 'support',
  EMPLOYEE: 'employee',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'accessToken',
  USER: 'user',
  INTENDED_URL: 'intendedUrl',
  ROLE: 'hrms.sidebar.role',
  COLLAPSED: 'hrms.sidebar.collapsed',
  EXPANDED: 'hrms.sidebar.expanded',
  SIDEBAR_COLLAPSED: 'hrms.sidebar.collapsed',
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    COMPLETE_REGISTRATION: '/auth/complete-registration',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
} as const;

export const DASHBOARD_ROUTES = {
  SUPERADMIN: (userId: string) => `/dashboard/superadmin/${userId}/overview`,
  HR_MANAGER: (userId: string) => `/dashboard/hr_manager/${userId}/overview`,
  ACCOUNTS: (userId: string) => `/dashboard/accounts/${userId}/overview`,
  SUPPORT: (userId: string) => `/dashboard/support/${userId}/overview`,
  EMPLOYEE: (userId: string) => `/dashboard/employee/${userId}/overview`,
} as const;
