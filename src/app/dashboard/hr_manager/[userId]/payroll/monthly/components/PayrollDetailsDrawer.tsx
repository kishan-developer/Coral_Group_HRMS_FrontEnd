'use client';

import { X, User, Building2, DollarSign, FileText, Download } from 'lucide-react';

interface PayrollDetailsDrawerProps {
  payroll: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function PayrollDetailsDrawer({ payroll, isOpen, onClose }: PayrollDetailsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Payroll Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Employee Information */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Employee Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Employee ID</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{payroll?.employeeId || 'EMP001'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Name</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{payroll?.employee || 'Rahul Sharma'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Department</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{payroll?.department || 'Sales'}</p>
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Salary Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Basic Salary</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">₹{payroll?.basicSalary?.toLocaleString() || '50,000'}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Allowances</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">₹{payroll?.allowances?.toLocaleString() || '15,000'}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Deductions</p>
                <p className="text-sm font-semibold text-red-600">₹{payroll?.deductions?.toLocaleString() || '5,000'}</p>
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 mt-3">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Net Pay</p>
                  <p className="text-lg font-bold text-[#94cb3d]">₹{payroll?.netPay?.toLocaleString() || '60,000'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payslip Actions */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              Payslip
            </h3>
            <button
              onClick={() => alert('Downloading payslip...')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
