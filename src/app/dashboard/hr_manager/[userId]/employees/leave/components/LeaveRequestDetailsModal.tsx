'use client';

import { useState } from 'react';
import { X, FileText, Download, User, Calendar, Briefcase, CheckCircle, XCircle, Clock } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeePhoto?: string;
  employeeName: string;
  employeeId: string;
  department: string;
  designation: string;
  leaveType: string;
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
  leaveBalance?: {
    cl: { allowed: number; used: number; remaining: number };
    pl: { allowed: number; used: number; remaining: number };
    sl: { allowed: number; used: number; remaining: number };
  };
  approvalHistory?: Array<{
    action: string;
    by: string;
    date: string;
    comment?: string;
  }>;
}

interface LeaveRequestDetailsModalProps {
  leaveRequest: LeaveRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function LeaveRequestDetailsModal({
  leaveRequest,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onEdit,
  onDelete,
}: LeaveRequestDetailsModalProps) {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!isOpen || !leaveRequest) return null;

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleRejectSubmit = () => {
    if (rejectReason) {
      onReject(leaveRequest.id, rejectReason);
      setShowRejectForm(false);
      setRejectReason('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50">
      <div className="h-full w-full max-w-lg bg-white dark:bg-zinc-900 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Leave Request Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Employee Information */}
          <div className="flex items-start gap-4">
            {leaveRequest.employeePhoto ? (
              <img
                src={leaveRequest.employeePhoto}
                alt={leaveRequest.employeeName}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xl font-medium text-zinc-600 dark:text-zinc-400">
                {leaveRequest.employeeName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{leaveRequest.employeeName}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{leaveRequest.designation}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{leaveRequest.employeeId} • {leaveRequest.department}</p>
              <div className="mt-2">{getStatusBadge(leaveRequest.status)}</div>
            </div>
          </div>

          {/* Leave Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Leave Details
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Leave Type</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{leaveRequest.leaveType}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Duration</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{leaveRequest.duration} day(s)</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Start Date</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{leaveRequest.startDate}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">End Date</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{leaveRequest.endDate}</p>
              </div>
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Reason</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-1">{leaveRequest.reason}</p>
            </div>
          </div>

          {/* Leave Balance */}
          {leaveRequest.leaveBalance && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Leave Balance
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                  <p className="text-xs text-zinc-500 mb-1">CL</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {leaveRequest.leaveBalance.cl.remaining} / {leaveRequest.leaveBalance.cl.allowed}
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                  <p className="text-xs text-zinc-500 mb-1">PL</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {leaveRequest.leaveBalance.pl.remaining} / {leaveRequest.leaveBalance.pl.allowed}
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                  <p className="text-xs text-zinc-500 mb-1">SL</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {leaveRequest.leaveBalance.sl.remaining} / {leaveRequest.leaveBalance.sl.allowed}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {leaveRequest.hasDocument && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Attached Documents
              </h4>
              <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <FileText className="h-5 w-5 text-zinc-500" />
                <span className="text-sm text-zinc-700 dark:text-zinc-300 flex-1">Leave Document</span>
                {leaveRequest.documentUrl && (
                  <button
                    onClick={() => window.open(leaveRequest.documentUrl, '_blank')}
                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Download className="h-4 w-4 text-zinc-500" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Approval History */}
          {leaveRequest.approvalHistory && leaveRequest.approvalHistory.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Approval History
              </h4>
              <div className="space-y-2">
                {leaveRequest.approvalHistory.map((history, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    {history.action === 'approved' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : history.action === 'rejected' ? (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {history.action.charAt(0).toUpperCase() + history.action.slice(1)} by {history.by}
                      </p>
                      <p className="text-xs text-zinc-500">{history.date}</p>
                      {history.comment && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{history.comment}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            {leaveRequest.status === 'pending' && (
              <>
                <button
                  onClick={() => onApprove(leaveRequest.id)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Approve Request
                </button>
                {!showRejectForm ? (
                  <button
                    onClick={() => setShowRejectForm(true)}
                    className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Reject Request
                  </button>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Enter rejection reason..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setShowRejectForm(false); setRejectReason(''); }}
                        className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRejectSubmit}
                        disabled={!rejectReason}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            <button
              onClick={() => onEdit(leaveRequest.id)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Edit Request
            </button>
            <button
              onClick={() => onDelete(leaveRequest.id)}
              className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Delete Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
