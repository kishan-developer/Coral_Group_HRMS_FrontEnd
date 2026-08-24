'use client';

import { useState } from 'react';
import { Search, Check, X, Eye, Download } from 'lucide-react';

interface LeaveRequestsTableProps {
  onLeaveRequestClick: (request: any) => void;
}

const leaveRequests = [
  { id: 1, employee: 'Rahul Sharma', leaveType: 'Casual Leave', from: '01 Jun', to: '03 Jun', days: 3, reason: 'Personal Work', status: 'pending' },
  { id: 2, employee: 'Amit Kumar', leaveType: 'Sick Leave', from: '05 Jun', to: '06 Jun', days: 2, reason: 'Fever', status: 'approved' },
  { id: 3, employee: 'Priya Singh', leaveType: 'Earned Leave', from: '10 Jun', to: '15 Jun', days: 5, reason: 'Family Vacation', status: 'pending' },
  { id: 4, employee: 'John Doe', leaveType: 'Casual Leave', from: '08 Jun', to: '08 Jun', days: 1, reason: 'Personal Work', status: 'rejected' },
  { id: 5, employee: 'Sarah Williams', leaveType: 'Sick Leave', from: '12 Jun', to: '13 Jun', days: 2, reason: 'Medical Checkup', status: 'approved' },
];

export default function LeaveRequestsTable({ onLeaveRequestClick }: LeaveRequestsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedRequests.length === leaveRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(leaveRequests.map(r => r.id));
    }
  };

  const handleSelectRequest = (id: number) => {
    setSelectedRequests(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleApprove = (id: number) => {
    alert(`Approved leave request ${id}`);
  };

  const handleReject = (id: number) => {
    alert(`Rejected leave request ${id}`);
  };

  const handleBulkApprove = () => {
    alert(`Bulk approving ${selectedRequests.length} requests`);
  };

  const handleBulkReject = () => {
    alert(`Bulk rejecting ${selectedRequests.length} requests`);
  };

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const filteredRequests = leaveRequests.filter(request =>
    request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Leave Requests</h2>
        <div className="flex gap-2 mt-2 sm:mt-0">
          {selectedRequests.length > 0 && (
            <>
              <button
                onClick={handleBulkApprove}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Check className="h-4 w-4" />
                Bulk Approve
              </button>
              <button
                onClick={handleBulkReject}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
                Bulk Reject
              </button>
            </>
          )}
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search employees or leave types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          />
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
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Employee</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Leave Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">From</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">To</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Days</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Reason</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(request.id)}
                    onChange={() => handleSelectRequest(request.id)}
                    className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
                  />
                </td>
                <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-medium">{request.employee}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.leaveType}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.from}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.to}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.days}</td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{request.reason}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
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
                    <button
                      onClick={() => onLeaveRequestClick(request)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
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
