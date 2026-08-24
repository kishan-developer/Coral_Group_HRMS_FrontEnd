'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface LeaveApprovalActionsProps {
  selectedIds: string[];
  onBulkApprove: (ids: string[]) => void;
  onBulkReject: (ids: string[], reason: string) => void;
  hasPendingLeaves: boolean;
}

export default function LeaveApprovalActions({
  selectedIds,
  onBulkApprove,
  onBulkReject,
  hasPendingLeaves,
}: LeaveApprovalActionsProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleBulkApprove = () => {
    if (selectedIds.length > 0) {
      onBulkApprove(selectedIds);
    }
  };

  const handleBulkReject = () => {
    if (selectedIds.length > 0) {
      setShowRejectModal(true);
    }
  };

  const handleRejectSubmit = () => {
    if (rejectReason && selectedIds.length > 0) {
      onBulkReject(selectedIds, rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
    }
  };

  if (!hasPendingLeaves) return null;

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Bulk Actions:'}
        </span>
        <button
          onClick={handleBulkApprove}
          disabled={selectedIds.length === 0}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Check className="h-3 w-3" />
          Approve Selected
        </button>
        <button
          onClick={handleBulkReject}
          disabled={selectedIds.length === 0}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <X className="h-3 w-3" />
          Reject Selected
        </button>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Reject {selectedIds.length} Leave Request(s)
            </h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowRejectModal(false); setRejectReason(''); }}
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
    </>
  );
}
