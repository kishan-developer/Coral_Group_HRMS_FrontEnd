'use client';

import { X, TrendingUp } from 'lucide-react';

interface EmployeeLeaveBalancePanelProps {
  isOpen: boolean;
  onClose: () => void;
  employeeBalances: Array<{
    id: string;
    name: string;
    employeeId: string;
    department: string;
    cl: { allowed: number; used: number; remaining: number; carryForward?: number };
    pl: { allowed: number; used: number; remaining: number; monthlyAccrual?: number };
    sl: { allowed: number; used: number; remaining: number };
  }>;
}

export default function EmployeeLeaveBalancePanel({
  isOpen,
  onClose,
  employeeBalances,
}: EmployeeLeaveBalancePanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50">
      <div className="h-full w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Employee Leave Balances</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {employeeBalances.map((balance) => (
            <div key={balance.id} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{balance.name}</p>
                  <p className="text-xs text-zinc-500">{balance.employeeId} • {balance.department}</p>
                </div>
              </div>

              {/* CL Balance */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">CL (Casual Leave)</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {balance.cl.used} / {balance.cl.allowed} used
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${(balance.cl.used / balance.cl.allowed) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-zinc-500">Remaining: {balance.cl.remaining}</p>
                  {balance.cl.carryForward && (
                    <p className="text-xs text-zinc-500">Carry Forward: {balance.cl.carryForward}</p>
                  )}
                </div>
              </div>

              {/* PL Balance */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">PL (Privilege Leave)</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {balance.pl.used} / {balance.pl.allowed} used
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-500 transition-all"
                    style={{ width: `${(balance.pl.used / balance.pl.allowed) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-zinc-500">Remaining: {balance.pl.remaining}</p>
                  {balance.pl.monthlyAccrual && (
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Accrual: {balance.pl.monthlyAccrual}/mo
                    </p>
                  )}
                </div>
              </div>

              {/* SL Balance */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">SL (Sick Leave)</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {balance.sl.used} / {balance.sl.allowed} used
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{ width: `${(balance.sl.used / balance.sl.allowed) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-1">Remaining: {balance.sl.remaining}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
