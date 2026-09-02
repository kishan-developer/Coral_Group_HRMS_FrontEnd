'use client';

import { Users, FileText, Clock, CheckCircle, XCircle, UserCheck, ShieldCheck } from 'lucide-react';

export default function LeaveSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 font-sans">
      {/* Total Workforce */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Total Staff</span>
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <Users className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">18</h3>
          <p className="text-xs text-blue-600 font-semibold mt-0.5">Active Workforce</p>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Leave Requests</span>
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">5</h3>
          <p className="text-xs text-purple-600 font-semibold mt-0.5">August Applications</p>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Pending</span>
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">2</h3>
          <p className="text-xs text-amber-600 font-semibold mt-0.5">Action Required</p>
        </div>
      </div>

      {/* Approved Leaves */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Approved</span>
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">2</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5">CL / PL Granted</p>
        </div>
      </div>

      {/* Rejected Leaves */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Rejected</span>
          <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
            <XCircle className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">1</h3>
          <p className="text-xs text-red-600 font-semibold mt-0.5">Reason Logged</p>
        </div>
      </div>

      {/* Employees On Leave Today */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">On Leave Today</span>
          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
            <UserCheck className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">1</h3>
          <p className="text-xs text-teal-600 font-semibold mt-0.5">Coverage Active</p>
        </div>
      </div>
    </div>
  );
}
