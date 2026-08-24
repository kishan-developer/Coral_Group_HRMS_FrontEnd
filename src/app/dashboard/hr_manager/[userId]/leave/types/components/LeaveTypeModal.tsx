'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';

interface LeaveTypeModalProps {
  leaveType: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaveTypeModal({ leaveType, isOpen, onClose }: LeaveTypeModalProps) {
  const [formData, setFormData] = useState({
    name: leaveType?.name || '',
    code: leaveType?.code || '',
    description: leaveType?.description || '',
    annualAllocation: leaveType?.annualAllocation || '',
    monthlyAllocation: leaveType?.monthlyAllocation || '',
    maxConsecutiveDays: leaveType?.maxConsecutiveDays || '',
    minDaysRequired: leaveType?.minDaysRequired || '',
    paidLeave: leaveType?.paidLeave ?? true,
    carryForward: leaveType?.carryForward ?? false,
    encashment: leaveType?.encashment ?? false,
    requiresApproval: leaveType?.requiresApproval ?? true,
    attachmentRequired: leaveType?.attachmentRequired ?? false,
    maxCarryForward: leaveType?.maxCarryForward || '',
    expiryPeriod: leaveType?.expiryPeriod || '',
    autoApproval: leaveType?.autoApproval ?? false,
  });

  const handleSave = () => {
    alert('Saving leave type...');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-xl shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {leaveType ? 'Edit Leave Type' : 'Add Leave Type'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Leave Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="Casual Leave"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Leave Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="CL"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  rows={3}
                  placeholder="Personal leave for urgent or casual purposes."
                />
              </div>
            </div>
          </div>

          {/* Leave Rules */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Leave Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Annual Allocation</label>
                <input
                  type="text"
                  value={formData.annualAllocation}
                  onChange={(e) => setFormData({ ...formData, annualAllocation: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="12 Days"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Monthly Allocation</label>
                <input
                  type="text"
                  value={formData.monthlyAllocation}
                  onChange={(e) => setFormData({ ...formData, monthlyAllocation: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="1 Day Per Month"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Maximum Consecutive Days</label>
                <input
                  type="text"
                  value={formData.maxConsecutiveDays}
                  onChange={(e) => setFormData({ ...formData, maxConsecutiveDays: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="5 Days"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Minimum Days Required</label>
                <input
                  type="text"
                  value={formData.minDaysRequired}
                  onChange={(e) => setFormData({ ...formData, minDaysRequired: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="0.5 Day"
                />
              </div>
            </div>
          </div>

          {/* Leave Settings */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Leave Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Paid Leave</span>
                <button
                  onClick={() => setFormData({ ...formData, paidLeave: !formData.paidLeave })}
                  className={`w-12 h-6 rounded-full transition-colors ${formData.paidLeave ? 'bg-[#94cb3d]' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.paidLeave ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Carry Forward Allowed</span>
                <button
                  onClick={() => setFormData({ ...formData, carryForward: !formData.carryForward })}
                  className={`w-12 h-6 rounded-full transition-colors ${formData.carryForward ? 'bg-[#94cb3d]' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.carryForward ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Encashment Allowed</span>
                <button
                  onClick={() => setFormData({ ...formData, encashment: !formData.encashment })}
                  className={`w-12 h-6 rounded-full transition-colors ${formData.encashment ? 'bg-[#94cb3d]' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.encashment ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Requires Approval</span>
                <button
                  onClick={() => setFormData({ ...formData, requiresApproval: !formData.requiresApproval })}
                  className={`w-12 h-6 rounded-full transition-colors ${formData.requiresApproval ? 'bg-[#94cb3d]' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.requiresApproval ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Attachment Required</span>
                <button
                  onClick={() => setFormData({ ...formData, attachmentRequired: !formData.attachmentRequired })}
                  className={`w-12 h-6 rounded-full transition-colors ${formData.attachmentRequired ? 'bg-[#94cb3d]' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.attachmentRequired ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Carry Forward Rules */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Carry Forward Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Maximum Carry Forward</label>
                <input
                  type="text"
                  value={formData.maxCarryForward}
                  onChange={(e) => setFormData({ ...formData, maxCarryForward: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="10 Days"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Expiry Period</label>
                <input
                  type="text"
                  value={formData.expiryPeriod}
                  onChange={(e) => setFormData({ ...formData, expiryPeriod: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  placeholder="31 March Every Year"
                />
              </div>
            </div>
          </div>

          {/* Approval Workflow */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Approval Workflow</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Auto Approval</span>
                <button
                  onClick={() => setFormData({ ...formData, autoApproval: !formData.autoApproval })}
                  className={`w-12 h-6 rounded-full transition-colors ${formData.autoApproval ? 'bg-[#94cb3d]' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.autoApproval ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Leave Type
          </button>
        </div>
      </div>
    </div>
  );
}
