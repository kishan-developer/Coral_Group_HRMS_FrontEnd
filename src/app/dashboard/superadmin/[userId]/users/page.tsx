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
  MoreVertical,
  UserCheck,
  Briefcase,
} from 'lucide-react';
import { getToken } from '@/lib/auth';
import { ActionButtons } from '@/components/ui/action-buttons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
  _id: string;
  email: string;
  employeeId?: string;
  role: 'superadmin' | 'hr_manager' | 'accounts' | 'employee' | 'support';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  employeeDetails?: {
    firstName?: string;
    lastName?: string;
    department?: string;
    company?: string;
  };
}

export default function UsersList() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data.users || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = (user: User) => {
    setUserToBlock(user);
    setBlockConfirmOpen(true);
  };

  const confirmBlock = async () => {
    if (!userToBlock) return;
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/users/${userToBlock._id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchUsers();
        setToast({ message: `User status updated successfully`, type: 'success' });
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      setToast({ message: 'Failed to update user status', type: 'error' });
    } finally {
      setBlockConfirmOpen(false);
      setUserToBlock(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/users/${userToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchUsers();
        setToast({ message: 'User deleted successfully', type: 'success' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setToast({ message: 'Failed to delete user', type: 'error' });
    } finally {
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleViewUser = (user: User) => {
    router.push(`/dashboard/superadmin/${userId}/users/${user._id}`);
  };

  const handleEditUser = (user: User) => {
    router.push(`/dashboard/superadmin/${userId}/users/${user._id}/edit`);
  };

  const handleRoleChange = async (user: User, newRole: string) => {
    if (newRole === 'superadmin') {
      setToast({ message: 'You cannot assign SuperAdmin role dynamically', type: 'error' });
      setRoleDropdownOpen(null);
      setDropdownPosition(null);
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();
      if (data.success) {
        fetchUsers();
        setToast({ message: 'User role updated successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to update user role', type: 'error' });
      }
    } catch (error) {
      console.error('Error updating role:', error);
      setToast({ message: 'Failed to update user role', type: 'error' });
    } finally {
      setRoleDropdownOpen(null);
      setDropdownPosition(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDropdownToggle = (event: React.MouseEvent, user: User) => {
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

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
        ? user.isActive
        : !user.isActive;

    const fullName = `${user.employeeDetails?.firstName || ''} ${user.employeeDetails?.lastName || ''}`.toLowerCase();
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
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Employee Directory Command Center
            </h1>
            <Badge variant="brand">{filteredUsers.length} Active Records</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Manage organization employees, role permissions, company assignments, and user status.
          </p>
        </div>

        <Link
          href={`/dashboard/superadmin/${userId}/users/create`}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#94cb3d] text-white rounded-lg font-medium hover:bg-[#82b632] transition-all shadow-sm text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </Link>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search employee name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="h-4 w-4 text-zinc-400" />
          {(['all', 'active', 'inactive'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase transition-colors ${
                filterStatus === st
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Command Data Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-xs font-medium text-zinc-500">
              Loading employee records...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No employee records match your filter criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Employee</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Employee ID</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Company</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">System Role</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Last Login</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center font-bold text-xs text-[#94cb3d] shrink-0">
                            {user.employeeDetails?.firstName ? user.employeeDetails.firstName[0] : user.email[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {user.employeeDetails?.firstName && user.employeeDetails?.lastName
                                ? `${user.employeeDetails.firstName} ${user.employeeDetails.lastName}`
                                : 'Employee Profile'}
                            </p>
                            <p className="text-[10px] text-zinc-500">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {user.employeeId || 'N/A'}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {user.employeeDetails?.company || 'Coral Group'}
                      </td>

                      <td className="px-4 py-3.5 relative">
                        <button
                          type="button"
                          onClick={(e) => handleDropdownToggle(e, user)}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 transition-colors flex items-center gap-1"
                        >
                          <span>{user.role.replace('_', ' ')}</span>
                        </button>

                        {roleDropdownOpen === user._id && dropdownPosition && (
                          <div
                            className="fixed z-[100] w-40 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl py-1 text-xs"
                            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
                          >
                            {['superadmin', 'hr_manager', 'accounts', 'employee', 'support'].map((roleOption) => (
                              <button
                                key={roleOption}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoleChange(user, roleOption);
                                }}
                                className={`block w-full text-left px-3 py-1.5 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                                  user.role === roleOption ? 'text-[#94cb3d] font-bold' : 'text-zinc-700 dark:text-zinc-300'
                                }`}
                              >
                                {roleOption.replace('_', ' ').toUpperCase()}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant={user.isActive ? 'success' : 'destructive'} className="text-[10px]">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {userToBlock.isActive ? 'Deactivate Employee' : 'Activate Employee'}
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6">
              Are you sure you want to {userToBlock.isActive ? 'deactivate' : 'activate'} user account ({userToBlock.email})?
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setBlockConfirmOpen(false);
                  setUserToBlock(null);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmBlock}
                className="bg-orange-600 text-white hover:bg-orange-700"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmOpen && userToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              Delete Employee Record
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6">
              Are you sure you want to delete employee record ({userToDelete.email})? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete Record
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
