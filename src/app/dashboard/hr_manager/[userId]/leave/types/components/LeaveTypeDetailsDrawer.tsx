'use client';

import { X, Info, Settings, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';

interface LeaveTypeDetailsDrawerProps {
  leaveType: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaveTypeDetailsDrawer({ leaveType, isOpen, onClose }: LeaveTypeDetailsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Leave Type Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Overview
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Leave Name</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{leaveType?.name || 'Casual Leave'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Code</p>
                <p className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{leaveType?.code || 'CL'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Description</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{leaveType?.description || 'Personal leave for urgent or casual purposes.'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Status</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  leaveType?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {leaveType?.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-500" />
              Rules
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Annual Limit</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{leaveType?.annualLimit || '12 Days'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Carry Forward</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{leaveType?.carryForward ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Encashment</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{leaveType?.encashment ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Approval Flow</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Manager → HR → Admin</p>
              </div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Usage Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Requests</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">650</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Approved</p>
                </div>
                <p className="text-sm font-semibold text-green-600">580</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Rejected</p>
                </div>
                <p className="text-sm font-semibold text-red-600">45</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Pending</p>
                </div>
                <p className="text-sm font-semibold text-amber-600">25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
