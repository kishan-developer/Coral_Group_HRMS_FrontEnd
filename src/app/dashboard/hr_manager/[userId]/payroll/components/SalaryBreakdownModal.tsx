'use client';

import { X, IndianRupee, TrendingUp, TrendingDown, FileText } from 'lucide-react';

interface SalaryBreakdownModalProps {
  payrollRecord: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function SalaryBreakdownModal({ payrollRecord, isOpen, onClose }: SalaryBreakdownModalProps) {
  if (!isOpen || !payrollRecord) return null;

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Salary Breakdown</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Employee Info */}
          <div className="flex items-center gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            {payrollRecord.employeePhoto ? (
              <img
                src={payrollRecord.employeePhoto}
                alt={payrollRecord.employeeName}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {payrollRecord.employeeName.split(' ').map((n: string) => n[0]).join('')}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{payrollRecord.employeeName}</h3>
              <p className="text-sm text-zinc-500">{payrollRecord.employeeId} • {payrollRecord.department}</p>
            </div>
          </div>

          {/* Earnings */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Earnings
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Basic Salary</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(payrollRecord.basicSalary)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">HRA</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(payrollRecord.basicSalary * 0.4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Conveyance</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(1600)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Medical Allowance</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(1250)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Special Allowance</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(payrollRecord.allowances - payrollRecord.basicSalary * 0.4 - 2850)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-700 dark:text-zinc-300">Total Earnings</span>
                <span className="text-green-600">{formatCurrency(payrollRecord.basicSalary + payrollRecord.allowances)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              Deductions
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Provident Fund (PF)</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(payrollRecord.basicSalary * 0.12)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">ESI</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(payrollRecord.basicSalary * 0.0075)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Professional Tax</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(200)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">TDS</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(payrollRecord.deductions - payrollRecord.basicSalary * 0.12 - payrollRecord.basicSalary * 0.0075 - 200)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-700 dark:text-zinc-300">Total Deductions</span>
                <span className="text-red-600">{formatCurrency(payrollRecord.deductions)}</span>
              </div>
            </div>
          </div>

          {/* Attendance Impact */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Attendance Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Loss of Pay (LWP)</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Overtime</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(0)}</span>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-[#94cb3d]" />
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Net Salary</span>
              </div>
              <span className="text-2xl font-bold text-[#94cb3d]">{formatCurrency(payrollRecord.netPay)}</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Notes / Adjustments</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">No adjustments applied for this payroll cycle.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <FileText className="h-4 w-4" />
            Download Payslip
          </button>
        </div>
      </div>
    </div>
  );
}
