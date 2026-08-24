'use client';

import { X, User, Building2, Briefcase, Calendar, Clock, FileText, Download } from 'lucide-react';
import LeaveBalanceDisplay from './LeaveBalanceDisplay';
import ApprovalTimeline from './ApprovalTimeline';
import CommentsSection from './CommentsSection';
import ApprovalActions from './ApprovalActions';
import ApprovalWorkflowPanel from './ApprovalWorkflowPanel';

interface LeaveRequestDetailDrawerProps {
  request: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaveRequestDetailDrawer({ request, isOpen, onClose }: LeaveRequestDetailDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 shadow-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Leave Request Details</h2>
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
              <User className="h-5 w-5 text-[#94cb3d]" />
              Employee Information
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#94cb3d] to-[#7ab32e] flex items-center justify-center text-white text-2xl font-bold">
                {request?.employee?.charAt(0) || 'R'}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Employee ID</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">EMP-{request?.id || '001'}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Name</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request?.employee || 'Rahul Sharma'}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Department</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request?.department || 'Sales'}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Designation</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Senior Executive</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Manager</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">John Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Information */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Leave Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Leave Type</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request?.leaveType || 'Casual Leave'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Start Date</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request?.startDate || '01 Jun'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">End Date</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request?.endDate || '03 Jun'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Days</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request?.days || 3} days</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Duration</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Full Day</p>
              </div>
              <div className="col-span-2 md:col-span-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Reason</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{request?.reason || 'Need leave for family function'}</p>
              </div>
            </div>
          </div>

          {/* Leave Balance */}
          <LeaveBalanceDisplay />

          {/* Attachments */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              Attachments
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-zinc-500" />
                  <span className="text-sm text-zinc-900 dark:text-zinc-100">Medical Certificate.pdf</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-[#94cb3d] hover:text-[#7ab32e]">Preview</button>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-zinc-500" />
                  <span className="text-sm text-zinc-900 dark:text-zinc-100">Doctor Prescription.jpg</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-[#94cb3d] hover:text-[#7ab32e]">Preview</button>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Timeline */}
          <ApprovalTimeline />

          {/* Comments Section */}
          <CommentsSection />

          {/* Approval Workflow Panel */}
          <ApprovalWorkflowPanel />

          {/* Approval Actions */}
          <ApprovalActions request={request} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
