'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface RunPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function RunPayrollModal({ isOpen, onClose, onSubmit }: RunPayrollModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { id: 1, title: 'Select Month' },
    { id: 2, title: 'Review Calculations' },
    { id: 3, title: 'Confirm & Process' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onSubmit({ month: selectedMonth });
      setIsProcessing(false);
      setCurrentStep(1);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Run Payroll</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-[#94cb3d] text-white'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <div className="ml-2 flex-1">
                  <p className={`text-xs font-medium ${
                    currentStep >= step.id
                      ? 'text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-500'
                  }`}>
                    {step.title}
                  </p>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-full mt-2 ${
                      currentStep > step.id ? 'bg-[#94cb3d]' : 'bg-zinc-200 dark:bg-zinc-700'
                    }`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Month for Payroll *
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Payroll Processing</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    This will fetch attendance data, calculate salaries based on salary structures, apply deductions, and generate payslips for all active employees.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Fetched data for 250 employees
                </span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500">Total Employees</p>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">250</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Total Gross Salary</p>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">₹2,500,000</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Total Deductions</p>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">₹400,000</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Total Net Salary</p>
                    <p className="font-semibold text-green-600">₹2,100,000</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Ready to Process</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Payroll will be processed for {selectedMonth}. Once processed, payslips will be generated and can be downloaded.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Attendance data fetched</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Salary calculations verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Deductions applied</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            {currentStep === 3 ? (
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isProcessing ? 'Processing...' : 'Process Payroll'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedMonth}
                className="px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
