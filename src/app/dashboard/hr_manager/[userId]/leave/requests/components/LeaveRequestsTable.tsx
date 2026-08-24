'use client';

import { useState } from 'react';
import { Check, X, Eye, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface LeaveRequestsTableProps {
  selectedStatus: string;
  selectedRequests: number[];
  onSelectionChange: (ids: number[]) => void;
  onRequestClick: (request: any) => void;
}

const leaveRequests = [
  { id: 1001, requestId: 'LR-1001', employee: 'Rahul Sharma', department: 'Sales', leaveType: 'Casual Leave', startDate: '01 Jun', endDate: '03 Jun', days: 3, appliedOn: '28 May', status: 'pending' },
  { id: 1002, requestId: 'LR-1002', employee: 'Amit Kumar', department: 'HR', leaveType: 'Sick Leave', startDate: '04 Jun', endDate: '05 Jun', days: 2, appliedOn: '29 May', status: 'approved' },
  { id: 1003, requestId: 'LR-1003', employee: 'Priya Singh', department: 'Marketing', leaveType: 'Earned Leave', startDate: '10 Jun', endDate: '15 Jun', days: 5, appliedOn: '01 Jun', status: 'pending' },
  { id: 1004, requestId: 'LR-1004', employee: 'John Doe', department: 'IT', leaveType: 'Casual Leave', startDate: '08 Jun', endDate: '08 Jun', days: 1, appliedOn: '02 Jun', status: 'rejected' },
  { id: 1005, requestId: 'LR-1005', employee: 'Sarah Williams', department: 'Finance', leaveType: 'Sick Leave', startDate: '12 Jun', endDate: '13 Jun', days: 2, appliedOn: '03 Jun', status: 'approved' },
];

export default function LeaveRequestsTable({ selectedStatus, selectedRequests, onSelectionChange, onRequestClick }: LeaveRequestsTableProps) {
  const [sortField, setSortField] = useState('appliedOn');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState(10);

  const handleSelectAll = () => {
    if (selectedRequests.length === leaveRequests.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(leaveRequests.map(r => r.id));
    }
  };

  const handleSelectRequest = (id: number) => {
    if (selectedRequests.includes(id)) {
      onSelectionChange(selectedRequests.filter((r: number) => r !== id));
    } else {
      onSelectionChange([...selectedRequests, id]);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleApprove = (id: number) => {
    alert(`Approving request ${id}`);
  };

  const handleReject = (id: number) => {
    alert(`Rejecting request ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this request?')) {
      alert(`Deleting request ${id}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing {leaveRequests.length} of {leaveRequests.length} requests
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100"
          >
            <option value="10">10 rows</option>
            <option value="25">25 rows</option>
            <option value="50">50 rows</option>
            <option value="100">100 rows</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedRequests.length === leaveRequests.length}
                  onChange={handleSelectAll}
                  className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => handleSort('requestId')}>
                Request ID {sortField === 'requestId' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => handleSort('employee')}>
                Employee {sortField === 'employee' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => handleSort('department')}>
                Department {sortField === 'department' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => handleSort('leaveType')}>
                Leave Type {sortField === 'leaveType' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Start Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">End Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => handleSort('days')}>
                Days {sortField === 'days' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => handleSort('appliedOn')}>
                Applied On {sortField === 'appliedOn' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(request.id)}
                    onChange={() => handleSelectRequest(request.id)}
                    className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
                  />
                </td>
                <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-medium">{request.requestId}</td>
                <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-medium">{request.employee}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.department}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.leaveType}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.startDate}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.endDate}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.days}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.appliedOn}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onRequestClick(request)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
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
