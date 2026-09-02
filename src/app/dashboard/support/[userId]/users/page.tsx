'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Users,
  Search,
  CheckCircle2,
  Mail,
  Building2,
  ShieldCheck,
  Eye,
  UserCheck,
  UserX,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface UserRecord {
  _id?: string;
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role: string;
  department?: string;
  designation?: string;
  isActive: boolean;
  createdAt?: string;
}

export default function SupportEmployeeDirectoryPage() {
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/users`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        // Fallback mock users
        setUsers([
          { id: 'usr-1', email: 'adminit@coral-group.in', firstName: 'Super', lastName: 'Admin', role: 'superadmin', department: 'IT Infrastructure', designation: 'IT Super Admin', isActive: true },
          { id: 'usr-2', email: 'bhardwajk852@gmail.com', firstName: 'Bhardwaj', lastName: 'Kishan', role: 'support', department: 'Support', designation: 'Support Lead', isActive: true },
          { id: 'usr-3', email: 'hr.manager@coral-group.in', firstName: 'Priya', lastName: 'Verma', role: 'hr_manager', department: 'Human Resources', designation: 'HR Director', isActive: true },
          { id: 'usr-4', email: 'accounts@coral-group.in', firstName: 'Amit', lastName: 'Patel', role: 'accounts', department: 'Finance & Accounts', designation: 'Payroll Manager', isActive: true },
          { id: 'usr-5', email: 'rahul.s@coral-group.in', firstName: 'Rahul', lastName: 'Sharma', role: 'employee', department: 'Operations', designation: 'Senior Executive', isActive: true },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch users for support directory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name || '';
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && u.isActive) ||
      (statusFilter === 'inactive' && !u.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Support Employee Directory & Accounts
            </h1>
            <Badge variant="brand">{filteredUsers.length} Registered System Users</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            System helpdesk user lookup directory for resolving employee access, roles, and profile tickets.
          </p>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Roles' },
          { id: 'superadmin', label: 'Super Admin' },
          { id: 'hr_manager', label: 'HR Manager' },
          { id: 'accounts', label: 'Accounts' },
          { id: 'employee', label: 'Employee' },
          { id: 'support', label: 'Support' },
        ].map((r) => {
          const isActive = roleFilter === r.id;
          const count = r.id === 'all' ? users.length : users.filter((u) => u.role === r.id).length;
          return (
            <button
              key={r.id}
              onClick={() => setRoleFilter(r.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <span>{r.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search employee name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'active', 'inactive'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border capitalize ${
                statusFilter === st
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 hover:bg-zinc-50'
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
              Loading support user directory from backend...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No users found matching your search</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">User Name</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Email Address</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Department / Role</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Account Designation</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredUsers.map((u) => {
                    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name || 'User';
                    return (
                      <tr key={u.id || u._id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 font-bold text-xs text-[#94cb3d] flex items-center justify-center shrink-0">
                              {fullName[0]?.toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                                {fullName}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-xs text-zinc-900 dark:text-zinc-100 font-medium">
                          {u.email}
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                              {u.department || 'General'}
                            </span>
                            <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                              {u.role}
                            </Badge>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-xs text-zinc-500">
                          {u.designation || 'Staff Member'}
                        </td>

                        <td className="px-4 py-3.5">
                          <Badge
                            variant={u.isActive ? 'success' : 'destructive'}
                            className="text-[10px] uppercase font-bold"
                          >
                            {u.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
