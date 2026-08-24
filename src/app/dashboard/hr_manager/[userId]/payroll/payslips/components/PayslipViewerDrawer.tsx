'use client';

import { X, User, Building2, Calendar, DollarSign, FileText, Download, Mail, Lock, RotateCw } from 'lucide-react';

interface PayslipViewerDrawerProps {
  payslip: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function PayslipViewerDrawer({ payslip, isOpen, onClose }: PayslipViewerDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 shadow-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Payslip Details</h2>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Employee ID</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">EMP001</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Name</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{payslip?.employee || 'Rahul Sharma'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Department</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{payslip?.department || 'Sales'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Designation</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Senior Executive</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Joining Date</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">15 Jan 2022</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">PAN Number</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">ABCDE1234F</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Bank Account</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">XXXX XXXX 1234</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">UAN Number</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">123456789012</p>
              </div>
            </div>
          </div>

          {/* Salary Summary */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Salary Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Component</th>
                    <th className="text-right py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">Basic Salary</td>
                    <td className="py-2 px-4 text-sm text-right text-zinc-900 dark:text-zinc-100">₹25,000</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">HRA</td>
                    <td className="py-2 px-4 text-sm text-right text-zinc-900 dark:text-zinc-100">₹10,000</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">Conveyance</td>
                    <td className="py-2 px-4 text-sm text-right text-zinc-900 dark:text-zinc-100">₹2,000</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">Special Allowance</td>
                    <td className="py-2 px-4 text-sm text-right text-zinc-900 dark:text-zinc-100">₹5,000</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">Bonus</td>
                    <td className="py-2 px-4 text-sm text-right text-zinc-900 dark:text-zinc-100">₹3,000</td>
                  </tr>
                  <tr className="border-b-2 border-zinc-300 dark:border-zinc-600">
                    <td className="py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Gross Salary</td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-zinc-900 dark:text-zinc-100">₹45,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-500" />
              Deductions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Deduction</th>
                    <th className="text-right py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">PF</td>
                    <td className="py-2 px-4 text-sm text-right text-red-600">₹1,800</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">ESI</td>
                    <td className="py-2 px-4 text-sm text-right text-red-600">₹500</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">Professional Tax</td>
                    <td className="py-2 px-4 text-sm text-right text-red-600">₹200</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">TDS</td>
                    <td className="py-2 px-4 text-sm text-right text-red-600">₹1,000</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400">Leave Deduction</td>
                    <td className="py-2 px-4 text-sm text-right text-red-600">₹500</td>
                  </tr>
                  <tr className="border-b-2 border-zinc-300 dark:border-zinc-600">
                    <td className="py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total Deductions</td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-red-600">₹4,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Salary */}
          <div className="bg-gradient-to-br from-[#94cb3d] to-[#7ab32e] rounded-xl p-5 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Net Salary</h3>
              <p className="text-3xl font-bold">₹41,000</p>
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Attendance Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Working Days</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">26</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Present Days</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">24</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Leave Days</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Paid Leave</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Absent Days</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">0</p>
              </div>
            </div>
          </div>

          {/* Payslip Actions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Payslip Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => alert('Downloading PDF...')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button
                onClick={() => alert('Sending email...')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </button>
              <button
                onClick={() => alert('Regenerating payslip...')}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <RotateCw className="h-4 w-4" />
                Regenerate
              </button>
              <button
                onClick={() => alert('Locking payslip...')}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Lock className="h-4 w-4" />
                Lock Payslip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
