'use client';

import { Eye, Download } from 'lucide-react';

interface PayrollTableProps {
  selectedMonth: string;
  searchQuery: string;
  onPayrollClick: (payroll: any) => void;
}

const payrollData = [
  { id: 1, employeeId: 'EMP001', employee: 'Rahul Sharma', department: 'Sales', basicSalary: 50000, allowances: 15000, deductions: 5000, netPay: 60000, status: 'processed' },
  { id: 2, employeeId: 'EMP002', employee: 'Amit Kumar', department: 'HR', basicSalary: 45000, allowances: 12000, deductions: 4500, netPay: 52500, status: 'processed' },
  { id: 3, employeeId: 'EMP003', employee: 'Priya Singh', department: 'Marketing', basicSalary: 55000, allowances: 18000, deductions: 5500, netPay: 67500, status: 'pending' },
  { id: 4, employeeId: 'EMP004', employee: 'John Doe', department: 'IT', basicSalary: 60000, allowances: 20000, deductions: 6000, netPay: 74000, status: 'processed' },
  { id: 5, employeeId: 'EMP005', employee: 'Sarah Williams', department: 'Finance', basicSalary: 52000, allowances: 16000, deductions: 5200, netPay: 62800, status: 'processed' },
];

export default function PayrollTable({ selectedMonth, searchQuery, onPayrollClick }: PayrollTableProps) {
  const filteredData = payrollData.filter(payroll =>
    payroll.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payroll.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadPayslip = (id: number) => {
    alert(`Downloading payslip for ${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Employee ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Employee</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Department</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Basic Salary</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Allowances</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Deductions</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Net Pay</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((payroll) => (
              <tr key={payroll.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{payroll.employeeId}</td>
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{payroll.employee}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{payroll.department}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">₹{payroll.basicSalary.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">₹{payroll.allowances.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">₹{payroll.deductions.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">₹{payroll.netPay.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(payroll.status)}`}>
                    {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onPayrollClick(payroll)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadPayslip(payroll.id)}
                      className="p-2 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      title="Download Payslip"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
