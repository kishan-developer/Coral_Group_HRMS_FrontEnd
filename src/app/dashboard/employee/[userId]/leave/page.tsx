'use client';

import { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, Hourglass, X, ShieldCheck } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { getToken } from '@/lib/auth';

interface LeaveBalanceState {
  availableCL: number;
  availablePL: number;
  availableSL: number;
  totalCL: number;
  totalPL: number;
  totalSL: number;
  usedCL: number;
  usedPL: number;
  usedSL: number;
}

interface LeaveRequest {
  _id: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: string;
  createdAt: string;
}

export default function EmployeeLeave() {
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalanceState>({
    availableCL: 6,
    availablePL: 6,
    availableSL: 4,
    totalCL: 6,
    totalPL: 6,
    totalSL: 4,
    usedCL: 0,
    usedPL: 0,
    usedSL: 0,
  });
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'Casual Leave',
    fromDate: '',
    toDate: '',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLeaves();
    fetchLeaveBalance();
  }, [userId]);

  const fetchLeaves = async () => {
    try {
      const token = getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}/api/v1/leaves?employeeId=${userId}`, {
        headers,
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

  const fetchLeaveBalance = async () => {
    try {
      const token = getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/balance/${userId}`, {
        headers,
      });
      const data = await response.json();
      if (data.success && data.data) {
        const annual = data.data.annual || { CL: 12, PL: 15, SL: 8 };
        const available = data.data.available || { CL: 12, PL: 15, SL: 8 };
        const used = data.data.used || { CL: 0, PL: 0, SL: 0 };
        setLeaveBalance({
          availableCL: available.CL ?? 12,
          availablePL: available.PL ?? 15,
          availableSL: available.SL ?? 8,
          totalCL: annual.CL ?? 12,
          totalPL: annual.PL ?? 15,
          totalSL: annual.SL ?? 8,
          usedCL: used.CL ?? 0,
          usedPL: used.PL ?? 0,
          usedSL: used.SL ?? 0,
        });
      }
    } catch (error) {
      console.error('Error fetching leave balance from database:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}/api/v1/leaves`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          employeeId: userId,
          leaveType: formData.leaveType,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          reason: formData.reason,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowApplyForm(false);
        setFormData({ leaveType: 'Casual Leave', fromDate: '', toDate: '', reason: '' });
        fetchLeaves();
        fetchLeaveBalance();
      } else {
        alert(data.message || 'Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error applying leave:', error);
      alert('Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelLeave = async (leaveId: string) => {
    if (!confirm('Are you sure you want to cancel this leave request?')) return;

    try {
      const token = getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/${leaveId}/cancel`, {
        method: 'POST',
        headers,
      });

      const data = await response.json();
      if (data.success) {
        fetchLeaves();
        fetchLeaveBalance();
      }
    } catch (error) {
      console.error('Error cancelling leave:', error);
    }
  };

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
    <div className="p-8 space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Leave & Quota Management
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-[#94cb3d]/15 text-[#94cb3d]">
              SuperAdmin Policy Live
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            CL and PL balances are dynamically configured from SuperAdmin database policies.
          </p>
        </div>
        <button
          onClick={() => setShowApplyForm(!showApplyForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white text-xs font-semibold rounded-lg hover:bg-[#7ab52f] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Apply Leave
        </button>
      </div>

      {/* Dynamic Superadmin CL & PL Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CL Card */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">CL — Casual Leave</p>
              <p className="text-xs text-zinc-400 mt-0.5">Short personal or emergency leave</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-mono">{leaveBalance.availableCL}</p>
              <p className="text-[11px] font-semibold text-zinc-400">Available Days</p>
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span>Total Allocated: <strong className="text-zinc-900 dark:text-zinc-100 font-mono">{leaveBalance.totalCL} Days</strong></span>
            <span>Used: <strong className="text-amber-600 dark:text-amber-400 font-mono">{leaveBalance.usedCL} Days</strong></span>
          </div>
        </div>

        {/* PL Card */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">PL — Privilege / Earned Leave</p>
              <p className="text-xs text-zinc-400 mt-0.5">Earned annual vacation leave</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#94cb3d] font-mono">{leaveBalance.availablePL}</p>
              <p className="text-[11px] font-semibold text-zinc-400">Available Days</p>
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span>Total Allocated: <strong className="text-zinc-900 dark:text-zinc-100 font-mono">{leaveBalance.totalPL} Days</strong></span>
            <span>Used: <strong className="text-amber-600 dark:text-amber-400 font-mono">{leaveBalance.usedPL} Days</strong></span>
          </div>
        </div>

        {/* SL Card */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">SL — Sick Leave</p>
              <p className="text-xs text-zinc-400 mt-0.5">Medical or health leave</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-rose-500 font-mono">{leaveBalance.availableSL}</p>
              <p className="text-[11px] font-semibold text-zinc-400">Available Days</p>
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span>Total Allocated: <strong className="text-zinc-900 dark:text-zinc-100 font-mono">{leaveBalance.totalSL} Days</strong></span>
            <span>Used: <strong className="text-amber-600 dark:text-amber-400 font-mono">{leaveBalance.usedSL} Days</strong></span>
          </div>
        </div>
      </div>

      {showApplyForm && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Apply for Leave</h2>
            <button
              onClick={() => setShowApplyForm(false)}
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Leave Type
              </label>
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="Casual Leave">Casual Leave (CL)</option>
                <option value="Earned Leave">Privilege / Earned Leave (PL)</option>
                <option value="Sick Leave">Sick Leave (SL)</option>
                <option value="Unpaid Leave">Unpaid Leave (LWP)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  From Date
                </label>
                <input
                  type="date"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  To Date
                </label>
                <input
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Reason
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                required
                rows={3}
                className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowApplyForm(false)}
                className="flex-1 px-4 py-2 text-xs font-medium border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2 text-xs font-semibold bg-[#94cb3d] text-white rounded-lg hover:bg-[#7ab52f] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave Request History Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">My Leave History</h2>
        <div className="space-y-4">
          {leaves.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-center py-8 text-xs font-medium">No leave requests found</p>
          ) : (
            leaves.map((leave) => (
              <div key={leave._id} className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${leave.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/30' :
                    leave.status === 'Rejected' ? 'bg-red-100 dark:bg-red-900/30' :
                      leave.status === 'Cancel Requested' ? 'bg-orange-100 dark:bg-orange-900/30' :
                        'bg-yellow-100 dark:bg-yellow-900/30'
                    }`}>
                    {leave.status === 'Approved' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : leave.status === 'Rejected' ? (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    ) : leave.status === 'Cancel Requested' ? (
                      <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    ) : (
                      <Hourglass className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-50">{leave.leaveType} — {leave.totalDays} day(s)</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
                      {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{leave.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${leave.status === 'Approved'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : leave.status === 'Rejected'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : leave.status === 'Cancel Requested'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                    {leave.status}
                  </span>
                  {(leave.status === 'Pending' || leave.status === 'Approved') && (
                    <button
                      onClick={() => handleCancelLeave(leave._id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
