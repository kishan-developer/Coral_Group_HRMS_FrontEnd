'use client';

import { Check, X, MessageSquare, FileText } from 'lucide-react';

interface ApprovalActionsProps {
  request: any;
  onClose: () => void;
}

export default function ApprovalActions({ request, onClose }: ApprovalActionsProps) {
  const handleApprove = () => {
    alert('Leave request approved!');
    onClose();
  };

  const handleReject = () => {
    alert('Leave request rejected!');
    onClose();
  };

  const handleRequestModification = () => {
    alert('Requesting modification from employee');
  };

  return (
    <div className="space-y-4">
      {/* Approve Button */}
      <button
        onClick={handleApprove}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
      >
        <Check className="h-5 w-5" />
        Approve Leave
      </button>

      <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Options: Add Remark • Notify Employee • Send Email
      </div>

      {/* Reject Button */}
      <button
        onClick={handleReject}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
      >
        <X className="h-5 w-5" />
        Reject Leave
      </button>

      <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Options: Rejection Reason • Notify Employee
      </div>

      {/* Request Modification */}
      <button
        onClick={handleRequestModification}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <MessageSquare className="h-5 w-5" />
        Need More Information
      </button>

      <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Request New Documents • Request Date Change
      </div>
    </div>
  );
}
