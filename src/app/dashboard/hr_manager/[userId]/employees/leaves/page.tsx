'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Search, Filter, Calendar, User, Check, X, Clock, MoreVertical } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import Badge from '@/components/ui/Badge/Badge';
import { getToken } from '@/lib/auth';

interface Leave {
  _id: string;
  employeeId: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancel Requested';
  createdAt: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId?: string;
  department?: string;
  designation?: string;
}

export default function EmployeeLeavesPage() {
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('All');

  useEffect(() => {
    fetchLeaves();
    fetchUsers();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/leaves`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setLeaves(data.data.items || data.data || []);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

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
        const userMap: Record<string, User> = {};
        const usersList = data.data.items || data.data || [];
        usersList.forEach((user: User) => {
          userMap[user._id] = user;
        });
        setUsers(userMap);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleApprove = async (leaveId: string) => {
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/${leaveId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          approvedBy: userId,
          managerNotes: 'Approved by HR Manager',
        }),
      });
      if (response.ok) {
        fetchLeaves();
      }
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (leaveId: string) => {
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/${leaveId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          approvedBy: userId,
          rejectionReason: 'Rejected by HR Manager',
        }),
      });
      if (response.ok) {
        fetchLeaves();
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    const user = users[leave.employeeId];
    const userName = user ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
    const matchesSearch = userName.includes(search.toLowerCase()) ||
                          leave.reason.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || leave.status === statusFilter;
    const matchesType = leaveTypeFilter === 'All' || leave.leaveType === leaveTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusColors = {
    'Pending': 'warning',
    'Approved': 'success',
    'Rejected': 'error',
    'Cancel Requested': 'warning',
  } as const;

  const leaveTypes = ['All', ...Array.from(new Set(leaves.map(l => l.leaveType)))];
  const statuses = ['All', 'Pending', 'Approved', 'Rejected', 'Cancel Requested'];

  const pendingCount = leaves.filter(l => l.status === 'Pending').length;
  const approvedCount = leaves.filter(l => l.status === 'Approved').length;
  const rejectedCount = leaves.filter(l => l.status === 'Rejected').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">
          Loading leaves...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Employee Leaves</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage and approve employee leave requests</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Pending</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{pendingCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Approved</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{approvedCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <X className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Rejected</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{rejectedCount}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or reason..."
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-9 pr-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={leaveTypeFilter}
              onChange={(e) => setLeaveTypeFilter(e.target.value)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
            >
              {leaveTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800 text-xs uppercase text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Employee</th>
                <th className="px-4 py-3 font-semibold">Leave Type</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">Days</th>
                <th className="px-4 py-3 font-semibold">Reason</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredLeaves.map((leave) => {
                const user = users[leave.employeeId];
                return (
                  <tr key={leave._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#94cb3d] flex items-center justify-center text-white font-medium text-sm">
                          {user ? `${user.firstName[0]}${user.lastName[0]}` : 'NA'}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-zinc-50">
                            {user ? `${user.firstName} ${user.lastName}` : 'Unknown'}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {user?.employeeId || user?.email || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{leave.leaveType}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{leave.totalDays}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 max-w-xs truncate">{leave.reason}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={statusColors[leave.status] as any}
                        size="sm"
                      >
                        {leave.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {leave.status === 'Pending' && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleApprove(leave._id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleReject(leave._id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {leave.status !== 'Pending' && (
                        <span className="text-xs text-zinc-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredLeaves.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
