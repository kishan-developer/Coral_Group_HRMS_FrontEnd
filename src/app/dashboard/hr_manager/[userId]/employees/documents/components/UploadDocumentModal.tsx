'use client';

import { useState } from 'react';
import { X, Upload, FileText, Calendar } from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  employees: Array<{ id: string; name: string; employeeId: string }>;
}

export default function UploadDocumentModal({ isOpen, onClose, onSubmit, employees }: UploadDocumentModalProps) {
  const [formData, setFormData] = useState({
    employeeId: '',
    documentType: 'id-proof',
    documentTitle: '',
    file: null as File | null,
    expiryDate: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    if (!formData.documentTitle) newErrors.documentTitle = 'Document title is required';
    if (!formData.file) newErrors.file = 'File is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg max-h-[90vh] bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Upload Document</h2>
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

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Document Type *
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="id-proof">ID Proof</option>
                <option value="address-proof">Address Proof</option>
                <option value="offer-letter">Offer Letter</option>
                <option value="resume">Resume</option>
                <option value="contract">Contract</option>
                <option value="certificates">Certificates</option>
                <option value="bank-docs">Bank Documents</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Document Title *
              </label>
              <input
                type="text"
                value={formData.documentTitle}
                onChange={(e) => setFormData({ ...formData, documentTitle: e.target.value })}
                placeholder="e.g., PAN Card, Aadhaar Card"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
              {errors.documentTitle && <p className="text-xs text-red-500 mt-1">{errors.documentTitle}</p>}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Upload File * (PDF, JPG, PNG - Max 5MB)
              </label>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        setErrors({ ...errors, file: 'File size must be less than 5MB' });
                        return;
                      }
                      setFormData({ ...formData, file });
                      setErrors({ ...errors, file: '' });
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <Upload className="h-8 w-8 text-zinc-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      PDF, JPG, PNG up to 5MB
                    </p>
                  </div>
                </label>
              </div>
              {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
              <p className="text-xs text-zinc-500 mt-1">Required for documents with validity period</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Add any additional notes..."
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
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
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
}
