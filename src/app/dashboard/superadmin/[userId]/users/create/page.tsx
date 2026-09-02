'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  UserPlus,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  Building2,
  Briefcase,
  Wand2,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Shield,
  CreditCard,
  Headphones,
  RefreshCw,
  X,
  KeyRound,
  FileCheck,
} from 'lucide-react';
import { getToken } from '@/lib/auth';

type UserRole = 'superadmin' | 'hr_manager' | 'accounts' | 'employee' | 'support';

interface RoleOption {
  id: UserRole;
  title: string;
  badge: string;
  description: string;
  icon: any;
  colorClass: string;
  borderClass: string;
  bgClass: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'employee',
    title: 'Employee',
    badge: 'Standard Access',
    description: 'Access to personal profile, attendance, leave requests, and payslips.',
    icon: User,
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500/50',
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    id: 'hr_manager',
    title: 'HR Manager',
    badge: 'Human Resources',
    description: 'Manage employees, attendance, recruitment, leave approvals, and HR reports.',
    icon: ShieldCheck,
    colorClass: 'text-blue-600 dark:text-blue-400',
    borderClass: 'border-blue-500/50',
    bgClass: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    id: 'accounts',
    title: 'Accounts Manager',
    badge: 'Finance & Payroll',
    description: 'Manage payroll operations, expense approvals, loans, and financial reports.',
    icon: CreditCard,
    colorClass: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-500/50',
    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    id: 'support',
    title: 'Support Staff',
    badge: 'Helpdesk',
    description: 'Handle user tickets, support requests, and knowledge base updates.',
    icon: Headphones,
    colorClass: 'text-purple-600 dark:text-purple-400',
    borderClass: 'border-purple-500/50',
    bgClass: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    id: 'superadmin',
    title: 'Super Admin',
    badge: 'Full System Control',
    description: 'Complete administrative access to all system configurations, users, and audit logs.',
    icon: Shield,
    colorClass: 'text-rose-600 dark:text-rose-400',
    borderClass: 'border-rose-500/50',
    bgClass: 'bg-rose-50 dark:bg-rose-950/30',
  },
];

export default function CreateUser() {
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    department: '',
    designation: '',
    password: '',
    confirmPassword: '',
    role: 'employee' as UserRole,
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const getApiUrl = (path: string) => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || '';
    let base = envUrl.trim().replace(/\/+$/, '');

    // Normalize base URL so it always points to the /api/v1 root
    if (!base.endsWith('/api/v1')) {
      if (base.endsWith('/api')) {
        base = `${base}/v1`;
      } else {
        base = `${base}/api/v1`;
      }
    }

    const cleanPath = path.replace(/^\/+/, '');
    return `${base}/${cleanPath}`;
  };

  const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return (
      getToken() ||
      localStorage.getItem('token') ||
      localStorage.getItem('hrms_token') ||
      sessionStorage.getItem('token')
    );
  };

  const handleGenerateEmployeeId = () => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newId = `EMP-${randomDigits}`;
    setFormData((prev) => ({ ...prev, employeeId: newId }));
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Password evaluation logic
  const passwordCriteria = {
    minLength: formData.password.length >= 8,
    hasNumberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    passwordsMatch: formData.password.length > 0 && formData.password === formData.confirmPassword,
  };

  const calculateStrength = () => {
    let score = 0;
    if (formData.password.length >= 8) score++;
    if (/[A-Z]/.test(formData.password)) score++;
    if (/[0-9]/.test(formData.password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) score++;
    return score;
  };

  const strengthScore = calculateStrength();

  const getStrengthLabel = () => {
    if (!formData.password) return { label: 'Not Entered', color: 'bg-zinc-200 dark:bg-zinc-700', text: 'text-zinc-400' };
    if (strengthScore <= 1) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
    if (strengthScore === 2) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
    if (strengthScore === 3) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      showNotification('Please provide a valid email address.', 'error');
      return;
    }

    if (formData.password.length < 8) {
      showNotification('Password must be at least 8 characters long.', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);

    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const payload = {
        employeeId: formData.employeeId || undefined,
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        firstName: formData.firstName.trim() || undefined,
        lastName: formData.lastName.trim() || undefined,
        department: formData.department.trim() || undefined,
        designation: formData.designation.trim() || undefined,
      };

      // Try primary authenticated dashboard endpoint first
      const primaryUrl = getApiUrl('users/dashboard/create');
      let response = await fetch(primaryUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      // Fallback to standard users endpoint if 404
      if (!response.ok && response.status === 404) {
        const fallbackUrl = getApiUrl('users');
        response = await fetch(fallbackUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();

      if (response.ok && (data.success || data.data)) {
        showNotification('User account created successfully!', 'success');
        setTimeout(() => {
          router.push(`/dashboard/superadmin/${userId}/users`);
        }, 1200);
      } else {
        const errorMsg =
          data.message ||
          data.error?.message ||
          (Array.isArray(data.errors) && data.errors[0]?.msg) ||
          'Failed to create user.';
        showNotification(errorMsg, 'error');
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      showNotification(error.message || 'An error occurred while connecting to the backend server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (formData.firstName || formData.lastName) {
      return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();
    }
    if (formData.email) {
      return formData.email.charAt(0).toUpperCase();
    }
    return 'NU';
  };

  const selectedRoleObj = ROLES.find((r) => r.id === formData.role) || ROLES[0];

  return (
    <div className="min-h-screen p-6 md:p-8 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl backdrop-blur-md border animate-in slide-in-from-top-4 duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700/50'
              : 'bg-rose-900/90 text-rose-100 border-rose-700/50'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/superadmin/${userId}/users`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Users List
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span className="text-xs font-medium text-[#94cb3d] bg-[#94cb3d]/10 px-2 py-0.5 rounded-md">
                User Creation Portal
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-[#94cb3d]/20 to-[#7ab52f]/10 dark:from-[#94cb3d]/30 dark:to-[#7ab52f]/20 rounded-xl text-[#94cb3d]">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Create New User
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Provision system access, assign operational roles, and set up user credentials.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/superadmin/${userId}/users`}
              className="px-4 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all shadow-sm"
            >
              Cancel
            </Link>
            <button
              onClick={(e) => {
                const formElem = document.getElementById('create-user-form') as HTMLFormElement;
                if (formElem) formElem.requestSubmit();
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#94cb3d] to-[#7ab52f] hover:from-[#86ba33] hover:to-[#6c9f28] active:scale-[0.99] rounded-xl shadow-md shadow-[#94cb3d]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create User
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Grid: Form (Left) & Preview Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-6">
            <form id="create-user-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Personal & Work Profile */}
              <div className="p-6 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                  <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      Personal & Work Profile
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Basic identification details for employee directory and records.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                        Employee ID
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateEmployeeId}
                        className="inline-flex items-center gap-1 text-xs text-[#94cb3d] hover:text-[#7ab52f] font-medium transition-colors"
                      >
                        <Wand2 className="w-3 h-3" />
                        {copiedId ? 'Generated!' : 'Auto-Generate ID'}
                      </button>
                    </div>
                    <div className="relative">
                      <FileCheck className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all font-mono"
                        placeholder="e.g. EMP-98214"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Department
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all"
                        placeholder="Engineering, Sales, HR..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Designation / Position
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all"
                        placeholder="Senior Developer, Specialist..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Role & Access Permissions */}
              <div className="p-6 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
                  <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      System Role & Permissions *
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Determines feature access, portal privileges, and operational security boundaries.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {ROLES.map((roleOpt) => {
                    const RoleIcon = roleOpt.icon;
                    const isSelected = formData.role === roleOpt.id;
                    return (
                      <div
                        key={roleOpt.id}
                        onClick={() => setFormData({ ...formData, role: roleOpt.id })}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? `${roleOpt.bgClass} ${roleOpt.borderClass} ring-2 ring-[#94cb3d]/40 shadow-sm`
                            : 'bg-zinc-50/30 dark:bg-zinc-800/30 border-zinc-200/70 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2.5 rounded-lg shrink-0 ${
                                isSelected
                                  ? 'bg-white dark:bg-zinc-900 shadow-sm ' + roleOpt.colorClass
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                              }`}
                            >
                              <RoleIcon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                                  {roleOpt.title}
                                </span>
                                <span
                                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                    isSelected
                                      ? 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 shadow-xs'
                                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                  }`}
                                >
                                  {roleOpt.badge}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {roleOpt.description}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                              isSelected
                                ? 'border-[#94cb3d] bg-[#94cb3d] text-white'
                                : 'border-zinc-300 dark:border-zinc-700'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Account Credentials */}
              <div className="p-6 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      Login Credentials *
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Primary email address and secure password for portal authentication.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all"
                        placeholder="user@organization.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          minLength={8}
                          className="w-full pl-10 pr-10 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all"
                          placeholder="••••••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5 rounded"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          required
                          minLength={8}
                          className="w-full pl-10 pr-10 py-2.5 text-sm bg-zinc-50/50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] transition-all"
                          placeholder="••••••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5 rounded"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Indicator Bar */}
                  {formData.password && (
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">Password Strength:</span>
                        <span className={`font-semibold ${getStrengthLabel().text}`}>
                          {getStrengthLabel().label}
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden flex gap-1">
                        <div
                          className={`h-full transition-all duration-300 ${
                            strengthScore >= 1 ? getStrengthLabel().color : 'bg-transparent'
                          } w-1/4`}
                        />
                        <div
                          className={`h-full transition-all duration-300 ${
                            strengthScore >= 2 ? getStrengthLabel().color : 'bg-transparent'
                          } w-1/4`}
                        />
                        <div
                          className={`h-full transition-all duration-300 ${
                            strengthScore >= 3 ? getStrengthLabel().color : 'bg-transparent'
                          } w-1/4`}
                        />
                        <div
                          className={`h-full transition-all duration-300 ${
                            strengthScore >= 4 ? getStrengthLabel().color : 'bg-transparent'
                          } w-1/4`}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          {passwordCriteria.minLength ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                          )}
                          <span className={passwordCriteria.minLength ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400'}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {passwordCriteria.hasNumberOrSymbol ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                          )}
                          <span className={passwordCriteria.hasNumberOrSymbol ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400'}>
                            Numbers or symbols
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {passwordCriteria.passwordsMatch ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                          )}
                          <span className={passwordCriteria.passwordsMatch ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400'}>
                            Passwords match
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      employeeId: '',
                      department: '',
                      designation: '',
                      password: '',
                      confirmPassword: '',
                      role: 'employee',
                    })
                  }
                  className="px-4 py-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  Reset Form
                </button>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/dashboard/superadmin/${userId}/users`}
                    className="px-5 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#94cb3d] to-[#7ab52f] hover:from-[#86ba33] hover:to-[#6c9f28] active:scale-[0.99] rounded-xl shadow-md shadow-[#94cb3d]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Live User Preview Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-6 space-y-6">
              {/* User Card Preview */}
              <div className="p-6 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden space-y-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#94cb3d]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <Sparkles className="w-3.5 h-3.5 text-[#94cb3d]" />
                    Live Account Card
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="flex flex-col items-center text-center space-y-3 pt-2">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#94cb3d] to-[#7ab52f] text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-[#94cb3d]/20 ring-4 ring-white dark:ring-zinc-800 transition-all">
                    {getInitials()}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                      {formData.firstName || formData.lastName
                        ? `${formData.firstName} ${formData.lastName}`.trim()
                        : 'New User Account'}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {formData.email || 'email@organization.com'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-center pt-1">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedRoleObj.bgClass} ${selectedRoleObj.colorClass} border ${selectedRoleObj.borderClass}`}
                    >
                      {selectedRoleObj.title}
                    </span>

                    {formData.employeeId && (
                      <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
                        {formData.employeeId}
                      </span>
                    )}
                  </div>
                </div>

                {(formData.department || formData.designation) && (
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60 grid grid-cols-2 gap-2 text-center text-xs">
                    {formData.department && (
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/40">
                        <span className="block text-[10px] text-zinc-400 uppercase font-medium">
                          Department
                        </span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {formData.department}
                        </span>
                      </div>
                    )}
                    {formData.designation && (
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/40">
                        <span className="block text-[10px] text-zinc-400 uppercase font-medium">
                          Position
                        </span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {formData.designation}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Account Readiness Checklist Card */}
              <div className="p-5 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-3.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Provisioning Readiness
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
                    <span className="text-zinc-600 dark:text-zinc-400">Email Address</span>
                    {formData.email ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                      </span>
                    ) : (
                      <span className="text-zinc-400">Required</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
                    <span className="text-zinc-600 dark:text-zinc-400">Password Security</span>
                    {passwordCriteria.minLength && passwordCriteria.passwordsMatch ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                      </span>
                    ) : (
                      <span className="text-zinc-400">Pending</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
                    <span className="text-zinc-600 dark:text-zinc-400">System Role</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {selectedRoleObj.title}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
                    <span className="text-zinc-600 dark:text-zinc-400">Employee ID</span>
                    {formData.employeeId ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Assigned
                      </span>
                    ) : (
                      <span className="text-amber-500">Auto-Generated</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Advisory */}
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900/80 dark:text-blue-200/80 space-y-1">
                  <p className="font-semibold text-blue-900 dark:text-blue-200">Security Note</p>
                  <p>
                    New user accounts are active immediately upon creation. Credentials can be updated by the user on first login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
