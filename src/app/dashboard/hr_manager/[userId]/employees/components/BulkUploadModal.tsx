'use client';

import { useState } from 'react';
import { X, Upload, Download, FileSpreadsheet, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getToken } from '@/lib/auth';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: () => void;
}

interface ValidationError {
  row: any;
  error: string;
  message?: string;
}

export default function BulkUploadModal({ isOpen, onClose, onUploadComplete }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [uploadResults, setUploadResults] = useState<{ success: any[]; failed: ValidationError[] } | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValidationErrors([]);
      setUploadResults(null);
    }
  };

  const handleDownloadTemplate = () => {
    // Create a CSV template matching the backend expected format
    const template = `email,employeeId,role,firstName,lastName,department,designation,mobile,password
john.doe@example.com,EMP001,employee,John,Doe,IT,Software Engineer,1234567890,Password@123
jane.smith@example.com,EMP002,hr_manager,Jane,Smith,HR,HR Manager,0987654321,Password@123`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_bulk_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    setValidationErrors([]);
    setUploadResults(null);

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BACKEND_URL}/api/v1/users/bulk-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadResults(data.data);
        if (onUploadComplete) {
          onUploadComplete();
        }
      } else {
        setValidationErrors([{ row: {}, error: data.error?.message || 'Upload failed' }]);
      }
    } catch (error: any) {
      setValidationErrors([{ row: {}, error: error.message || 'Upload failed' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setValidationErrors([]);
    setUploadResults(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Bulk Upload Employees</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Download Template */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Download Template</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Download the CSV/Excel template to fill employee data
                </p>
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">Upload File</h3>
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-zinc-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    CSV or Excel files only
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Upload Results */}
          {uploadResults && (
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Upload Complete</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {uploadResults.success.length} users created successfully
                  </span>
                </div>
                {uploadResults.failed.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {uploadResults.failed.length} failed
                    </span>
                  </div>
                )}
              </div>
              {uploadResults.failed.length > 0 && (
                <details className="mt-3">
                  <summary className="text-sm text-red-600 dark:text-red-400 cursor-pointer hover:underline">
                    View failed uploads
                  </summary>
                  <div className="mt-2 space-y-1">
                    {uploadResults.failed.map((error, index) => (
                      <div key={index} className="text-xs text-red-600 dark:text-red-300">
                        {error.error}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-medium text-red-700 dark:text-red-400">Upload Errors</h3>
              </div>
              <div className="space-y-2">
                {validationErrors.map((error, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-red-600 dark:text-red-300">{error.error}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File Selected */}
          {file && !uploadResults && validationErrors.length === 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-medium text-green-700 dark:text-green-400">File Ready</h3>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Ready to upload {file.name}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || isProcessing}
            className="px-4 py-2 rounded-lg bg-[#94cb3d] text-white text-sm font-medium hover:bg-[#7ab32e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
