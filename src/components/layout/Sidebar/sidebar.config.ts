import {
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  LayoutDashboard,
  MapPin,
  Megaphone,
  MessageSquare,
  Monitor,
  Package,
  Settings,
  ShieldCheck,
  Target,
  Users,
  UserPlus,
  Wallet,
  Wrench,
} from 'lucide-react';

export type Permission =
  | 'overview'
  | 'team'
  | 'attendance'
  | 'leave'
  | 'performance'
  | 'payroll'
  | 'recruitment'
  | 'training'
  | 'assets'
  | 'reports';

export type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  permission?: Permission;
  pageId?: string;
  children?: NavItem[];
};

export type Role = 'superadmin' | 'hr_manager' | 'accounts' | 'support' | 'employee';

export const superadminNavigation: NavItem[] = [
  {
    name: 'Overview',
    href: '/dashboard/superadmin/:userId/overview',
    icon: LayoutDashboard,
    pageId: 'dashboard',
  },
  {
    name: 'Notifications',
    href: '/dashboard/superadmin/:userId/notifications',
    icon: Bell,
    pageId: 'notifications',
  },
  {
    name: 'Approvals Center',
    href: '/dashboard/superadmin/:userId/approvals',
    icon: ClipboardCheck,
    pageId: 'approvals',
  },
  {
    name: 'User Guide & Mind Map',
    href: '/dashboard/superadmin/:userId/user-guide',
    icon: BookOpen,
    pageId: 'user-guide',
  },
  {
    name: 'Employee Management',
    href: '/dashboard/superadmin/:userId/users',
    icon: Users,
    children: [
      { name: 'Dashboard', href: '/dashboard/superadmin/:userId/overview', icon: LayoutDashboard, pageId: 'dashboard' },
      { name: 'All Employees', href: '/dashboard/superadmin/:userId/users', icon: Users, pageId: 'users' },


      { name: 'Onboarding & Lifecycle', href: '/dashboard/hr_manager/:userId/onboarding', icon: Briefcase, pageId: 'onboarding' },


    ],
  },
  {
    name: 'Roles & Permissions',
    href: '/dashboard/superadmin/:userId/roles',
    icon: ShieldCheck,
    children: [
      { name: 'Role Management', href: '/dashboard/superadmin/:userId/roles', icon: ShieldCheck, pageId: 'roles' },
      { name: 'Access Control Matrix', href: '/dashboard/superadmin/:userId/access-control', icon: ShieldCheck, pageId: 'access-control' },
    ],
  },
  {
    name: 'Companies',
    href: '/dashboard/superadmin/:userId/companies',
    icon: Building2,
    children: [
      { name: 'Companies', href: '/dashboard/superadmin/:userId/companies', icon: Building2, pageId: 'companies' },
    ],
  },
  {
    name: 'Assets',
    href: '/dashboard/superadmin/:userId/assets',
    icon: Package,
    children: [
      { name: 'Assets', href: '/dashboard/superadmin/:userId/assets', icon: Package, pageId: 'assets' },
    ],
  },
  {
    name: 'Reports',
    href: '/dashboard/superadmin/:userId/reports',
    icon: BarChart3,
    children: [
      { name: 'Reports', href: '/dashboard/superadmin/:userId/reports', icon: BarChart3, pageId: 'reports' },
      { name: 'Master', href: '/dashboard/superadmin/:userId/master', icon: BarChart3, pageId: 'master' },
    ],
  },
  {
    name: 'Audit Logs',
    href: '/dashboard/superadmin/:userId/audit-logs',
    icon: FileText,
    children: [
      { name: 'Audit Logs', href: '/dashboard/superadmin/:userId/audit-logs', icon: FileText, pageId: 'audit-logs' },
    ],
  },
  {
    name: 'Settings',
    href: '/dashboard/superadmin/:userId/settings',
    icon: Settings,
    children: [
      { name: 'General Settings', href: '/dashboard/superadmin/:userId/settings', icon: Settings, pageId: 'settings' },
      { name: 'Security Center', href: '/dashboard/superadmin/:userId/security', icon: ShieldCheck, pageId: 'security' },
      { name: 'Leave Setup', href: '/dashboard/superadmin/:userId/leave-setup', icon: ClipboardList, pageId: 'leave-setup' },
      // { name: 'Subscriptions', href: '/dashboard/superadmin/:userId/subscriptions', icon: Monitor, pageId: 'subscriptions' },
    ],
  },
];

export const hrManagerNavigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard/hr_manager/:userId/overview',
    icon: LayoutDashboard,
    permission: 'overview',
  },
  {
    name: 'Notifications',
    href: '/dashboard/hr_manager/:userId/notifications',
    icon: Bell,
  },
  {
    name: 'Approvals Center',
    href: '/dashboard/hr_manager/:userId/approvals',
    icon: ClipboardCheck,
  },
  {
    name: 'User Guide & Mind Map',
    href: '/dashboard/hr_manager/:userId/user-guide',
    icon: BookOpen,
  },
  {
    name: 'Employee',
    href: '/dashboard/hr_manager/:userId/employees',
    icon: Users,
    permission: 'team',
    children: [
      { name: 'All Employees', href: '/dashboard/hr_manager/:userId/employees', icon: Users },
      { name: 'Onboarding & Lifecycle', href: '/dashboard/hr_manager/:userId/onboarding', icon: Briefcase },
      { name: 'Employee Requests', href: '/dashboard/hr_manager/:userId/approvals', icon: ClipboardCheck },

    ],
  },
  {
    name: 'Attendance',
    href: '/dashboard/hr_manager/:userId/attendance',
    icon: Clock,
    permission: 'attendance',
    children: [
      { name: 'Attendance', href: '/dashboard/hr_manager/:userId/attendance', icon: Clock },

    ],
  },
  {
    name: 'Leave',
    href: '/dashboard/hr_manager/:userId/leave',
    icon: ClipboardList,
    permission: 'leave',
    children: [
      { name: 'Leave', href: '/dashboard/hr_manager/:userId/leave', icon: ClipboardList },
      { name: 'Approvals', href: '/dashboard/hr_manager/:userId/leave/approvals', icon: ClipboardList },
    ],
  },
  {
    name: 'Performance',
    href: '/dashboard/hr_manager/:userId/performance',
    icon: Target,
    permission: 'performance',
    children: [
      { name: 'Performance', href: '/dashboard/hr_manager/:userId/performance', icon: Target },
      { name: 'KPI', href: '/dashboard/hr_manager/:userId/performance/kpi', icon: Target },
      { name: 'Appraisal', href: '/dashboard/hr_manager/:userId/performance/appraisal', icon: ClipboardList },
    ],
  },
  {
    name: 'Payroll',
    href: '/dashboard/hr_manager/:userId/payroll/reimbursement',
    icon: Wallet,
    permission: 'payroll',
    children: [
      { name: 'Reimbursement', href: '/dashboard/hr_manager/:userId/payroll/reimbursement', icon: Wallet },
      { name: 'Bonus', href: '/dashboard/hr_manager/:userId/payroll/bonus', icon: Wallet },
    ],
  },
  {
    name: 'Recruitment',
    href: '/dashboard/hr_manager/:userId/recruitment',
    icon: Briefcase,
    permission: 'recruitment',
    children: [
      { name: 'Recruitment', href: '/dashboard/hr_manager/:userId/recruitment', icon: Briefcase },
      { name: 'Jobs', href: '/dashboard/hr_manager/:userId/recruitment/jobs', icon: Briefcase },
      { name: 'Interview', href: '/dashboard/hr_manager/:userId/recruitment/interview', icon: ClipboardList },
    ],
  },
  // {
  //   name: 'Training',
  //   href: '/dashboard/hr_manager/:userId/training',
  //   icon: GraduationCap,
  //   permission: 'training',
  //   children: [
  //     { name: 'Training', href: '/dashboard/hr_manager/:userId/training', icon: GraduationCap },
  //     { name: 'Assign', href: '/dashboard/hr_manager/:userId/training/assign', icon: Users },
  //   ],
  // },
  {
    name: 'Assets',
    href: '/dashboard/hr_manager/:userId/assets',
    icon: Package,
    permission: 'assets',
    children: [
      { name: 'Assets', href: '/dashboard/hr_manager/:userId/assets', icon: Package },
      { name: 'Approvals', href: '/dashboard/hr_manager/:userId/assets/approvals', icon: ClipboardList },
    ],
  },
  // {
  //   name: 'Reports',
  //   href: '/dashboard/hr_manager/:userId/reports/attendance',
  //   icon: BarChart3,
  //   permission: 'reports',
  //   children: [
  //     { name: 'Attendance', href: '/dashboard/hr_manager/:userId/reports/attendance', icon: Clock },
  //     { name: 'Leave', href: '/dashboard/hr_manager/:userId/reports/leave', icon: ClipboardList },
  //     { name: 'Performance', href: '/dashboard/hr_manager/:userId/reports/performance', icon: Target },
  //   ],
  // },
];

export const accountsNavigation: NavItem[] = [
  {
    name: 'Overview',
    href: '/dashboard/accounts/:userId/overview',
    icon: LayoutDashboard,
  },
  {
    name: 'Notifications',
    href: '/dashboard/accounts/:userId/notifications',
    icon: Bell,
  },
  {
    name: 'Payroll',
    href: '/dashboard/accounts/:userId/payroll',
    icon: Wallet,
    children: [
      { name: 'Payroll', href: '/dashboard/accounts/:userId/payroll', icon: Wallet },
      { name: 'Structure', href: '/dashboard/accounts/:userId/payroll/structure', icon: Wallet },
      { name: 'Monthly', href: '/dashboard/accounts/:userId/payroll/monthly', icon: Wallet },
      { name: 'Payslips', href: '/dashboard/accounts/:userId/payroll/payslips', icon: FileText },
      { name: 'Reimbursement', href: '/dashboard/accounts/:userId/payroll/reimbursement', icon: Wallet },
    ],
  },
  {
    name: 'Expenses',
    href: '/dashboard/accounts/:userId/expenses',
    icon: Wallet,
    children: [
      { name: 'Expenses', href: '/dashboard/accounts/:userId/expenses', icon: Wallet },
      { name: 'Claims', href: '/dashboard/accounts/:userId/expenses/claims', icon: ClipboardList },
      { name: 'Policies', href: '/dashboard/accounts/:userId/expenses/policies', icon: ShieldCheck },
    ],
  },
  {
    name: 'Reports',
    href: '/dashboard/accounts/:userId/reports',
    icon: BarChart3,
    children: [
      { name: 'Financial Reports', href: '/dashboard/accounts/:userId/reports/financial', icon: BarChart3 },
      { name: 'Payroll Reports', href: '/dashboard/accounts/:userId/reports/payroll', icon: BarChart3 },
      { name: 'Expense Reports', href: '/dashboard/accounts/:userId/reports/expense', icon: BarChart3 },
    ],
  },
];

export const supportNavigation: NavItem[] = [
  {
    name: 'Overview',
    href: '/dashboard/support/:userId/overview',
    icon: LayoutDashboard,
  },
  {
    name: 'Notifications',
    href: '/dashboard/support/:userId/notifications',
    icon: Bell,
  },
  {
    name: 'Tickets',
    href: '/dashboard/support/:userId/tickets',
    icon: FileText,
    children: [
      { name: 'All Tickets', href: '/dashboard/support/:userId/tickets', icon: FileText },
      { name: 'Employee Requests', href: '/dashboard/support/:userId/requests', icon: FileText },
    ],
  },
  {
    name: 'Live Chat',
    href: '/dashboard/support/:userId/live-chat',
    icon: MessageSquare,
  },
  // {
  //   name: 'Knowledge Base',
  //   href: '/dashboard/support/:userId/knowledge-base',
  //   icon: BookOpen,
  // },
  // {
  //   name: 'Technical Requests',
  //   href: '/dashboard/support/:userId/technical',
  //   icon: Wrench,
  // },
  // {
  //   name: 'Announcements',
  //   href: '/dashboard/support/:userId/announcements',
  //   icon: Megaphone,
  // },
  {
    name: 'Reports',
    href: '/dashboard/support/:userId/reports',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/dashboard/support/:userId/settings',
    icon: Settings,
  },
  {
    name: 'Employees',
    href: '/dashboard/support/:userId/users',
    icon: Users,
    children: [
      { name: 'Employee List', href: '/dashboard/support/:userId/users', icon: Users },

    ],
  },
];

export const employeeNavigation: NavItem[] = [
  {
    name: 'Overview',
    href: '/dashboard/employee/:userId/overview',
    icon: LayoutDashboard,
  },
  {
    name: 'Notifications',
    href: '/dashboard/employee/:userId/notifications',
    icon: Bell,
  },
  {
    name: 'Attendance',
    href: '/dashboard/employee/:userId/attendance',
    icon: Clock,
  },
  {
    name: 'Leave',
    href: '/dashboard/employee/:userId/leave',
    icon: ClipboardList,
  },
  {
    name: 'Payslips',
    href: '/dashboard/employee/:userId/payslips',
    icon: FileText,
  },
  {
    name: 'Profile',
    href: '/dashboard/employee/:userId/profile',
    icon: Users,
  },
];
