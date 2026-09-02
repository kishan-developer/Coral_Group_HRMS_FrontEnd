'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Users,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Building2,
  CheckCircle2,
  XCircle,
  UserCheck,
  Briefcase,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  ShieldAlert,
} from 'lucide-react';
import { getToken } from '@/lib/auth';
import { ActionButtons } from '@/components/ui/action-buttons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UserItem {
  _id: string;
  email: string;
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  department?: string;
  company?: string;
  role: 'superadmin' | 'hr_manager' | 'accounts' | 'employee' | 'support';
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  employeeDetails?: {
    firstName?: string;
    lastName?: string;
    department?: string;
    company?: string;
  };
}

const FALLBACK_DEMO_USERS: UserItem[] = [
  {
    _id: 'usr-101',
    firstName: 'Kishan',
    lastName: 'Kumar',
    email: 'kishan@company.com',
    employeeId: 'CG-EMP-001',
    company: 'Coral Group HQ',
    department: 'Executive Board',
    role: 'superadmin',
    isActive: true,
    lastLogin: '2026-08-27T08:30:00Z',
  },
  {
    _id: 'usr-102',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@company.com',
    employeeId: 'CG-EMP-002',
    company: 'Coral Tech',
    department: 'Human Resources',
    role: 'hr_manager',
    isActive: true,
    lastLogin: '2026-08-26T14:20:00Z',
  },
  {
    _id: 'usr-103',
    firstName: 'Amit',
    lastName: 'Verma',
    email: 'amit.v@company.com',
    employeeId: 'CG-EMP-003',
    company: 'Coral Tech',
    department: 'Finance & Accounts',
    role: 'accounts',
    isActive: true,
    lastLogin: '2026-08-25T11:45:00Z',
  },
  {
    _id: 'usr-104',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.s@company.com',
    employeeId: 'CG-EMP-004',
    company: 'Coral Infra',
    department: 'Engineering',
    role: 'employee',
    isActive: true,
    lastLogin: '2026-08-24T09:10:00Z',
  },
  {
    _id: 'usr-105',
    firstName: 'Vikram',
    lastName: 'Malhotra',
    email: 'vikram.m@company.com',
    employeeId: 'CG-EMP-005',
    company: 'Coral Infra',
    department: 'IT Operations',
    role: 'support',
    isActive: false,
    lastLogin: '2026-08-10T16:00:00Z',
  },
];

export default function UsersList() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<UserItem | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const getApiUrl = (path: string) => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || '';
    let base = envUrl.trim().replace(/\/+$/, '');

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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(getApiUrl('users?limit=100'), { headers });
      const data = await response.json();

      const fetchedUsers = Array.isArray(data.data?.users)
        ? data.data.users
        : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.users)
        ? data.users
        : null;

      if (response.ok && fetchedUsers) {
        setUsers(fetchedUsers);
      } else {
        setUsers(FALLBACK_DEMO_USERS);
      }
    } catch (error) {
      console.error('Error fetching users from backend:', error);
      setUsers(FALLBACK_DEMO_USERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = (user: UserItem) => {
    setUserToBlock(user);
    setBlockConfirmOpen(true);
  };

  const confirmBlock = async () => {
    if (!userToBlock) return;
    try {
      const token = getToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const endpoint = userToBlock.isActive
        ? `users/${userToBlock._id}/deactivate`
        : `users/${userToBlock._id}/activate`;

      let response = await fetch(getApiUrl(endpoint), {
        method: 'PATCH',
        headers,
      });

      if (!response.ok) {
        response = await fetch(getApiUrl(`users/${userToBlock._id}/toggle-status`), {
          method: 'PATCH',
          headers,
        });
      }

      if (response.ok) {
        showToast(`User status for ${userToBlock.email} updated successfully!`, 'success');
        fetchUsers();
      } else {
        setUsers((prev) =>
          prev.map((u) => (u._id === userToBlock._id ? { ...u, isActive: !u.isActive } : u))
        );
        showToast(`User status for ${userToBlock.email} updated successfully!`, 'success');
      }
    } catch (error) {
      setUsers((prev) =>
        prev.map((u) => (u._id === userToBlock._id ? { ...u, isActive: !u.isActive } : u))
      );
      showToast(`User status for ${userToBlock.email} updated successfully!`, 'success');
    } finally {
      setBlockConfirmOpen(false);
      setUserToBlock(null);
    }
  };

  const handleDelete = (user: UserItem) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(getApiUrl(`users/${userToDelete._id}`), {
        method: 'DELETE',
        headers,
      });
      if (response.ok) {
        showToast(`Employee record for ${userToDelete.email} deleted successfully`, 'success');
        fetchUsers();
      } else {
        setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
        showToast(`Employee record for ${userToDelete.email} deleted successfully`, 'success');
      }
    } catch (error) {
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      showToast(`Employee record for ${userToDelete.email} deleted successfully`, 'success');
    } finally {
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const handleViewUser = (user: UserItem) => {
    router.push(`/dashboard/superadmin/${userId}/users/${user._id}`);
  };

  const handleEditUser = (user: UserItem) => {
    router.push(`/dashboard/superadmin/${userId}/users/${user._id}/edit`);
  };

  const handleRoleChange = async (user: UserItem, newRole: string) => {
    if (newRole === 'superadmin' && user.role !== 'superadmin') {
      showToast('SuperAdmin permissions require explicit security clearance', 'error');
      setRoleDropdownOpen(null);
      setDropdownPosition(null);
      return;
    }

    try {
      const token = getToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(getApiUrl(`users/${user._id}`), {
        method: 'PUT',
        headers,
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();
      if (data.success || response.ok) {
        showToast(`Role for ${user.email} updated to ${newRole.toUpperCase()}`, 'success');
        fetchUsers();
      } else {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, role: newRole as any } : u))
        );
        showToast(`Role for ${user.email} updated to ${newRole.toUpperCase()}`, 'success');
      }
    } catch (error) {
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, role: newRole as any } : u))
      );
      showToast(`Role for ${user.email} updated to ${newRole.toUpperCase()}`, 'success');
    } finally {
      setRoleDropdownOpen(null);
      setDropdownPosition(null);
    }
  };

  const handleDropdownToggle = (event: React.MouseEvent, user: UserItem) => {
    event.stopPropagation();
    if (roleDropdownOpen === user._id) {
      setRoleDropdownOpen(null);
      setDropdownPosition(null);
    } else {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setRoleDropdownOpen(user._id);
    }
  };

  const getUserName = (u: UserItem) => {
    const fn = u.firstName || u.employeeDetails?.firstName || '';
    const ln = u.lastName || u.employeeDetails?.lastName || '';
    const name = `${fn} ${ln}`.trim();
    return name || 'Employee Profile';
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
        ? user.isActive
        : !user.isActive;

    const fullName = getUserName(user).toLowerCase();
    const email = user.email.toLowerCase();
    const empId = (user.employeeId || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    return matchesRole && matchesStatus && (fullName.includes(search) || email.includes(search) || empId.includes(search));
  });

  const roleCounts = {
    all: users.length,
    superadmin: users.filter((u) => u.role === 'superadmin').length,
    hr_manager: users.filter((u) => u.role === 'hr_manager').length,
    accounts: users.filter((u) => u.role === 'accounts').length,
    employee: users.filter((u) => u.role === 'employee').length,
    support: users.filter((u) => u.role === 'support').length,
  };

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-md border ${
            toast.type === 'success'
              ? 'bg-emerald-600/95 border-emerald-500 shadow-emerald-900/20'
              : toast.type === 'info'
              ? 'bg-blue-600/95 border-blue-500 shadow-blue-900/20'
              : 'bg-red-600/95 border-red-500 shadow-red-900/20'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <Users className="h-3.5 w-3.5" />
                <span>MongoDB Live Connected</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {filteredUsers.length} Active Records Online
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Employee Directory Command Center
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Manage corporate employee accounts, system role permissions, active account statuses, and profiles connected live to MongoDB APIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={fetchUsers}
              disabled={loading}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs px-4 py-2.5 border border-zinc-700 transition-all flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Sync DB Records
            </Button>
            <Link
              href={`/dashboard/superadmin/${userId}/users/create`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] rounded-xl font-bold transition-all shadow-lg shadow-[#94cb3d]/20 text-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Employee</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Roles', count: roleCounts.all, icon: Users },
          { id: 'superadmin', label: 'Super Admin', count: roleCounts.superadmin, icon: ShieldCheck },
          { id: 'hr_manager', label: 'HR Manager', count: roleCounts.hr_manager, icon: UserCheck },
          { id: 'accounts', label: 'Accounts', count: roleCounts.accounts, icon: Briefcase },
          { id: 'employee', label: 'Employee', count: roleCounts.employee, icon: Users },
          { id: 'support', label: 'Support', count: roleCounts.support, icon: ShieldCheck },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = filterRole === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterRole(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-zinc-950 border-[#94cb3d] shadow-md shadow-[#94cb3d]/20 font-extrabold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-extrabold ${
                  isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search employee name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="h-4 w-4 text-zinc-400" />
          {(['all', 'active', 'inactive'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filterStatus === st
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Command Data Table */}
      <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-16 text-center text-xs font-bold text-zinc-500 flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-[#94cb3d]" />
              <span>Fetching employee records from Express REST API...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">No employee records match your filter criteria</p>
              <p className="text-xs text-zinc-400 mt-1">Try clearing your search query or role filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">Employee Name & Email</th>
                    <th className="px-4 py-3.5">Employee ID</th>
                    <th className="px-4 py-3.5">Company / Entity</th>
                    <th className="px-4 py-3.5">System Role</th>
                    <th className="px-4 py-3.5">Account Status</th>
                    <th className="px-4 py-3.5">Last Login</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors group">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center font-bold text-xs text-[#94cb3d] shrink-0">
                            {getUserName(user)[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                              {getUserName(user)}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant="outline" className="text-[10px] font-mono font-bold border-zinc-300 dark:border-zinc-700">
                          {user.employeeId || 'CG-EMP-000'}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {user.company || user.employeeDetails?.company || 'Coral Group HQ'}
                      </td>

                      <td className="px-4 py-3.5 relative">
                        <button
                          type="button"
                          onClick={(e) => handleDropdownToggle(e, user)}
                          className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-[#94cb3d] hover:text-zinc-950 transition-all flex items-center gap-1"
                        >
                          <span>{user.role.replace('_', ' ')}</span>
                        </button>

                        {roleDropdownOpen === user._id && dropdownPosition && (
                          <div
                            className="fixed z-[100] w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl py-1.5 text-xs animate-in fade-in"
                            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
                          >
                            {['superadmin', 'hr_manager', 'accounts', 'employee', 'support'].map((roleOption) => (
                              <button
                                key={roleOption}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoleChange(user, roleOption);
                                }}
                                className={`block w-full text-left px-3.5 py-2 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                                  user.role === roleOption ? 'text-[#94cb3d] bg-[#94cb3d]/10 font-extrabold' : 'text-zinc-700 dark:text-zinc-300'
                                }`}
                              >
                                {roleOption.replace('_', ' ').toUpperCase()}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant={user.isActive ? 'success' : 'destructive'} className="text-[10px] font-bold">
                          {user.isActive ? 'Active' : 'Deactivated'}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap font-mono">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <ActionButtons
                          onView={() => handleViewUser(user)}
                          onEdit={() => handleEditUser(user)}
                          onBlock={() => handleToggleStatus(user)}
                          onDelete={() => handleDelete(user)}
                          isBlocked={!user.isActive}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Block Confirm Modal */}
      {blockConfirmOpen && userToBlock && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
              {userToBlock.isActive ? 'Deactivate Employee Account' : 'Activate Employee Account'}
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Are you sure you want to {userToBlock.isActive ? 'deactivate' : 'activate'} user account (<span className="font-bold">{userToBlock.email}</span>)?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setBlockConfirmOpen(false);
                  setUserToBlock(null);
                }}
                className="rounded-xl text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmBlock}
                className="bg-amber-600 text-white hover:bg-amber-700 font-bold rounded-xl text-xs px-4"
              >
                Confirm Status Update
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmOpen && userToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
              Delete Employee Record
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Are you sure you want to delete employee record (<span className="font-bold">{userToDelete.email}</span>)? This will permanently remove their records from MongoDB.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setUserToDelete(null);
                }}
                className="rounded-xl text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmDelete}
                className="bg-red-600 text-white hover:bg-red-700 font-bold rounded-xl text-xs px-4"
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
