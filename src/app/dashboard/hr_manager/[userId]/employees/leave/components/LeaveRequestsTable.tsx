'use client';

import { useState } from 'react';
import { MoreVertical, ChevronUp, ChevronDown, Eye, Edit, Check, X, FileText, Download } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeePhoto?: string;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: 'CL' | 'PL' | 'SL' | 'LWP' | 'Maternity' | 'Paternity' | 'Compensatory';
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  hasDocument: boolean;
  documentUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  rejectedBy?: string;
  actionDate?: string;
}

interface LeaveRequestsTableProps {
  leaveRequests: LeaveRequest[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onDelete: (id: string) => void;
}

type SortField = 'startDate' | 'employeeName' | 'leaveType' | 'status';
type SortOrder = 'asc' | 'desc';

export default function LeaveRequestsTable({
  leaveRequests,
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
}: LeaveRequestsTableProps) {
  const [sortField, setSortField] = useState<SortField>('startDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedRequests = [...leaveRequests].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = sortedRequests.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getLeaveTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      CL: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      PL: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      SL: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      LWP: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      Maternity: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      Paternity: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
      Compensatory: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[type] || 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    );
  };

  const handleRejectSubmit = () => {
    if (rejectModalId && rejectReason) {
      onReject(rejectModalId, rejectReason);
      setRejectModalId(null);
      setRejectReason('');
    }
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
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('leaveType')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Leave Type
                  {sortField === 'leaveType' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('startDate')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Date Range
                  {sortField === 'startDate' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Reason
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Document
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Status
                  {sortField === 'status' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Action By
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {paginatedRequests.map((request) => (
              <tr key={request.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {request.employeePhoto ? (
                      <img
                        src={request.employeePhoto}
                        alt={request.employeeName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        {request.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request.employeeName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{request.employeeId}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{request.department}</td>
                <td className="px-4 py-3">{getLeaveTypeBadge(request.leaveType)}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {request.startDate} - {request.endDate}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{request.duration} day(s)</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">{request.reason}</td>
                <td className="px-4 py-3">
                  {request.hasDocument ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => request.documentUrl && window.open(request.documentUrl, '_blank')}
                        className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        title="View Document"
                      >
                        <FileText className="h-4 w-4 text-zinc-500" />
                      </button>
                      <button
                        onClick={() => request.documentUrl && window.open(request.documentUrl, '_blank')}
                        className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4 text-zinc-500" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {request.approvedBy || request.rejectedBy || '-'}
                </td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setActionMenuId(actionMenuId === request.id ? null : request.id)}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </button>
                    {actionMenuId === request.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => { onView(request.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Eye className="h-3 w-3" />
                            View Details
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => { onApprove(request.id); setActionMenuId(null); }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-xs text-green-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              >
                                <Check className="h-3 w-3" />
                                Approve
                              </button>
                              <button
                                onClick={() => { setRejectModalId(request.id); setActionMenuId(null); }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              >
                                <X className="h-3 w-3" />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => { onEdit(request.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => { onDelete(request.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <X className="h-3 w-3" />
                            Delete
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
            {startIndex + 1}-{Math.min(endIndex, sortedRequests.length)} of {sortedRequests.length}
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

      {/* Reject Modal */}
      {rejectModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Reject Leave Request</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setRejectModalId(null); setRejectReason(''); }}
                className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={!rejectReason}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
