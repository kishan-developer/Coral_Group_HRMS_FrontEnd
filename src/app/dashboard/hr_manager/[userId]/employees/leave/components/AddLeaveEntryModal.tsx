'use client';

import { useState } from 'react';
import { X, Upload, Calendar } from 'lucide-react';

interface AddLeaveEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  employees: Array<{ id: string; name: string; employeeId: string }>;
}

export default function AddLeaveEntryModal({ isOpen, onClose, onSubmit, employees }: AddLeaveEntryModalProps) {
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: 'CL',
    startDate: '',
    endDate: '',
    isHalfDay: false,
    halfDayType: 'first',
    reason: '',
    attachment: null as File | null,
    approver: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return formData.isHalfDay ? 0.5 : diffDays;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';
    if (!formData.approver) newErrors.approver = 'Approver is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      duration: calculateDuration(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg max-h-[90vh] bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Add Leave Entry</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Employee *
              </label>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.employeeId})
                  </option>
                ))}
              </select>
              {errors.employeeId && <p className="text-xs text-red-500 mt-1">{errors.employeeId}</p>}
            </div>

            {/* Leave Type */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Leave Type *
              </label>
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="CL">CL (Casual Leave)</option>
                <option value="PL">PL (Privilege Leave)</option>
                <option value="SL">SL (Sick Leave)</option>
                <option value="LWP">LWP (Leave Without Pay)</option>
                <option value="Maternity">Maternity</option>
                <option value="Paternity">Paternity</option>
                <option value="Compensatory">Compensatory</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
                {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
                {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
              </div>
            </div>

            {/* Duration Display */}
            {formData.startDate && formData.endDate && (
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Duration: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{calculateDuration()} day(s)</span>
                </p>
              </div>
            )}

            {/* Half Day */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isHalfDay}
                  onChange={(e) => setFormData({ ...formData, isHalfDay: e.target.checked })}
                  className="text-[#94cb3d] focus:ring-[#94cb3d] rounded"
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Half Day</span>
              </label>
              {formData.isHalfDay && (
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="first"
                      checked={formData.halfDayType === 'first'}
                      onChange={(e) => setFormData({ ...formData, halfDayType: e.target.value })}
                      className="text-[#94cb3d] focus:ring-[#94cb3d]"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">First Half</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="second"
                      checked={formData.halfDayType === 'second'}
                      onChange={(e) => setFormData({ ...formData, halfDayType: e.target.value })}
                      className="text-[#94cb3d] focus:ring-[#94cb3d]"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Second Half</span>
                  </label>
                </div>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Reason *
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={3}
                placeholder="Enter leave reason..."
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
              {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Attachment (Optional)
              </label>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-4">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({ ...formData, attachment: file });
                  }}
                  className="hidden"
                  id="attachment-upload"
                />
                <label htmlFor="attachment-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="h-5 w-5 text-zinc-400" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {formData.attachment ? formData.attachment.name : 'Click to upload document'}
                  </span>
                </label>
              </div>
            </div>

            {/* Approver */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Approver *
              </label>
              <select
                value={formData.approver}
                onChange={(e) => setFormData({ ...formData, approver: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="">Select Approver</option>
                {employees.filter(e => e.id !== formData.employeeId).map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
              {errors.approver && <p className="text-xs text-red-500 mt-1">{errors.approver}</p>}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#94cb3d] text-white text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
