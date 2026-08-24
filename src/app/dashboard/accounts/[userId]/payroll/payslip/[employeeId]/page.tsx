'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Printer } from 'lucide-react';

interface PayrollEntry {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  basicSalary: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'approved';
}

export default function EmployeePayslip() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const employeeId = params.employeeId as string;

  const [payrollData, setPayrollData] = useState<PayrollEntry | null>(null);

  useEffect(() => {
    // Simulate fetching employee data
    const mockData: PayrollEntry = {
      id: employeeId,
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      basicSalary: 80000,
      deductions: 12000,
      netSalary: 68000,
      status: 'processed',
    };
    setPayrollData(mockData);
  }, [employeeId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Payslip downloaded successfully');
  };

  if (!payrollData) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#94cb3d] hover:text-[#7ab52f] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Payroll
      </button>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Payslip</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">June 2026</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee Name</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">{payrollData.name}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee ID</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">{payrollData.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Department</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">{payrollData.department}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Status</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50 capitalize">{payrollData.status}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Salary Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Basic Salary</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(payrollData.basicSalary)}</span>
            </div>
            <div className="flex justify-between text-red-600 dark:text-red-400">
              <span>Deductions</span>
              <span className="font-medium">-{formatCurrency(payrollData.deductions)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>HRA</span>
              <span className="font-medium">{formatCurrency(payrollData.basicSalary * 0.4)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Medical Allowance</span>
              <span className="font-medium">{formatCurrency(payrollData.basicSalary * 0.1)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Special Allowance</span>
              <span className="font-medium">{formatCurrency(payrollData.basicSalary * 0.05)}</span>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-zinc-900 dark:text-zinc-50">Net Salary</span>
                <span className="text-[#94cb3d]">{formatCurrency(payrollData.netSalary)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 mt-6">
          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>This is a computer-generated payslip.</p>
            <p>Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
