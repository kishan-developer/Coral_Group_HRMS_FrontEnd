'use client';

import { useState } from 'react';
import { MoreVertical, ChevronUp, ChevronDown, Eye, Edit, CheckCircle, Download, FileText } from 'lucide-react';

interface PayrollRecord {
  id: string;
  employeePhoto?: string;
  employeeName: string;
  employeeId: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  payrollStatus: 'draft' | 'processed' | 'paid' | 'on-hold';
  paymentStatus: 'pending' | 'completed' | 'failed';
}

interface PayrollTableProps {
  payrollRecords: PayrollRecord[];
  onViewBreakdown: (id: string) => void;
  onEditSalary: (id: string) => void;
  onApprovePayroll: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
  onDownloadPayslip: (id: string) => void;
}

type SortField = 'employeeName' | 'netPay' | 'department' | 'payrollStatus';
type SortOrder = 'asc' | 'desc';

export default function PayrollTable({
  payrollRecords,
  onViewBreakdown,
  onEditSalary,
  onApprovePayroll,
  onMarkAsPaid,
  onDownloadPayslip,
}: PayrollTableProps) {
  const [sortField, setSortField] = useState<SortField>('netPay');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedRecords = [...payrollRecords].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, endIndex);

  const getPayrollStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
      processed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'on-hold': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('employeeName')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Employee
                  {sortField === 'employeeName' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Employee ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Department
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Basic Salary
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Allowances
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Deductions
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('netPay')}
                  className="flex items-center justify-end gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Net Pay
                  {sortField === 'netPay' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Payroll Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Payment Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {paginatedRecords.map((record) => (
              <tr key={record.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {record.employeePhoto ? (
                      <img
                        src={record.employeePhoto}
                        alt={record.employeeName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        {record.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{record.employeeName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{record.employeeId}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{record.department}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 text-right">{formatCurrency(record.basicSalary)}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 text-right">{formatCurrency(record.allowances)}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 text-right">{formatCurrency(record.deductions)}</td>
                <td className="px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 text-right">{formatCurrency(record.netPay)}</td>
                <td className="px-4 py-3">{getPayrollStatusBadge(record.payrollStatus)}</td>
                <td className="px-4 py-3">{getPaymentStatusBadge(record.paymentStatus)}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setActionMenuId(actionMenuId === record.id ? null : record.id)}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </button>
                    {actionMenuId === record.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => { onViewBreakdown(record.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Eye className="h-3 w-3" />
                            View Breakdown
                          </button>
                          <button
                            onClick={() => { onEditSalary(record.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Edit className="h-3 w-3" />
                            Edit Salary
                          </button>
                          {record.payrollStatus === 'draft' && (
                            <button
                              onClick={() => { onApprovePayroll(record.id); setActionMenuId(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-xs text-green-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Approve Payroll
                            </button>
                          )}
                          {record.payrollStatus === 'processed' && record.paymentStatus === 'pending' && (
                            <button
                              onClick={() => { onMarkAsPaid(record.id); setActionMenuId(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-xs text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Mark as Paid
                            </button>
                          )}
                          <button
                            onClick={() => { onDownloadPayslip(record.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <FileText className="h-3 w-3" />
                            Download Payslip
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">
            {startIndex + 1}-{Math.min(endIndex, sortedRecords.length)} of {sortedRecords.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded border text-xs ${
                  currentPage === pageNum
                    ? 'bg-[#94cb3d] text-white border-[#94cb3d]'
                    : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
