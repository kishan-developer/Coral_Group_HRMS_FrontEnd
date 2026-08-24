'use client';

import { Eye } from 'lucide-react';

interface PayslipsTableProps {
  onPayslipClick: (payslip: any) => void;
}

const payslips = [
  { id: 1, payslipNo: 'PSL-2026-001', employee: 'Rahul Sharma', department: 'Sales', month: 'May 2026', netSalary: 35000, status: 'generated', sent: true },
  { id: 2, payslipNo: 'PSL-2026-002', employee: 'Amit Kumar', department: 'HR', month: 'May 2026', netSalary: 42000, status: 'generated', sent: true },
  { id: 3, payslipNo: 'PSL-2026-003', employee: 'Priya Singh', department: 'Marketing', month: 'May 2026', netSalary: 38000, status: 'draft', sent: false },
  { id: 4, payslipNo: 'PSL-2026-004', employee: 'John Doe', department: 'IT', month: 'May 2026', netSalary: 55000, status: 'sent', sent: true },
  { id: 5, payslipNo: 'PSL-2026-005', employee: 'Sarah Williams', department: 'Finance', month: 'May 2026', netSalary: 48000, status: 'downloaded', sent: true },
];

export default function PayslipsTable({ onPayslipClick }: PayslipsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-zinc-100 text-zinc-700';
      case 'sent':
        return 'bg-blue-100 text-blue-700';
      case 'downloaded':
        return 'bg-purple-100 text-purple-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Payslip No</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Employee</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Department</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Month</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Net Salary</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Sent</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payslips.map((payslip) => (
            <tr key={payslip.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <td className="py-3 px-4 text-sm font-mono text-zinc-900 dark:text-zinc-100">{payslip.payslipNo}</td>
              <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{payslip.employee}</td>
              <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{payslip.department}</td>
              <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{payslip.month}</td>
              <td className="py-3 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">₹{payslip.netSalary.toLocaleString()}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(payslip.status)}`}>
                  {payslip.status.charAt(0).toUpperCase() + payslip.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4">
                {payslip.sent ? (
                  <span className="text-green-600 text-sm font-medium">Yes</span>
                ) : (
                  <span className="text-zinc-400 text-sm">No</span>
                )}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => onPayslipClick(payslip)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
