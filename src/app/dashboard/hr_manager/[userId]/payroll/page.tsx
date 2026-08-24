'use client';

import { useState } from 'react';
import { Play, Plus, Settings, Download, FileText } from 'lucide-react';
import PayrollOverviewWidgets from './components/PayrollOverviewWidgets';
import PayrollFilters from './components/PayrollFilters';
import PayrollTable from './components/PayrollTable';
import SalaryBreakdownModal from './components/SalaryBreakdownModal';
import RunPayrollModal from './components/RunPayrollModal';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [salaryStatus, setSalaryStatus] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [isRunPayrollOpen, setIsRunPayrollOpen] = useState(false);
  const [selectedPayrollRecord, setSelectedPayrollRecord] = useState<any>(null);
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);

  // Mock payroll records
  const mockPayrollRecords = [
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      basicSalary: 35000,
      allowances: 19000,
      deductions: 6500,
      netPay: 47500,
      payrollStatus: 'paid' as const,
      paymentStatus: 'completed' as const,
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      basicSalary: 45000,
      allowances: 23000,
      deductions: 8500,
      netPay: 59500,
      payrollStatus: 'paid' as const,
      paymentStatus: 'completed' as const,
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Real Estate',
      basicSalary: 30000,
      allowances: 16000,
      deductions: 5500,
      netPay: 40500,
      payrollStatus: 'processed' as const,
      paymentStatus: 'pending' as const,
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      employeeId: 'EMP004',
      department: 'Finance',
      basicSalary: 40000,
      allowances: 21000,
      deductions: 7500,
      netPay: 53500,
      payrollStatus: 'draft' as const,
      paymentStatus: 'pending' as const,
    },
    {
      id: '5',
      employeeName: 'Tom Brown',
      employeeId: 'EMP005',
      department: 'Hotels',
      basicSalary: 28000,
      allowances: 15000,
      deductions: 5200,
      netPay: 37800,
      payrollStatus: 'on-hold' as const,
      paymentStatus: 'pending' as const,
    },
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setMonthYear('');
    setDepartment('');
    setDesignation('');
    setSalaryStatus('');
    setPaymentMode('');
  };

  const handleViewBreakdown = (id: string) => {
    const record = mockPayrollRecords.find(r => r.id === id);
    if (record) {
      setSelectedPayrollRecord(record);
      setIsBreakdownModalOpen(true);
    }
  };

  const handleEditSalary = (id: string) => {
    alert(`Edit salary for employee ${id}`);
  };

  const handleApprovePayroll = (id: string) => {
    alert(`Approve payroll for employee ${id}`);
  };

  const handleMarkAsPaid = (id: string) => {
    alert(`Mark payroll as paid for employee ${id}`);
  };

  const handleDownloadPayslip = (id: string) => {
    alert(`Download payslip for employee ${id}`);
  };

  const handleRunPayroll = (data: any) => {
    console.log('Run payroll:', data);
    alert('Payroll processed successfully');
    setIsRunPayrollOpen(false);
  };

  const handleAddSalaryStructure = () => {
    alert('Opening salary structure form...');
  };

  const handleBulkImportExport = () => {
    alert('Opening bulk import/export dialog...');
  };

  const handlePayrollSettings = () => {
    alert('Opening payroll settings...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Payroll Management</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage employee salaries and payroll processing</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBulkImportExport}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Import/Export
          </button>
          <button
            onClick={handlePayrollSettings}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button
            onClick={handleAddSalaryStructure}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Structure
          </button>
          <button
            onClick={() => setIsRunPayrollOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Play className="h-4 w-4" />
            Run Payroll
          </button>
        </div>
      </div>

      {/* Payroll Overview Widgets */}
      <PayrollOverviewWidgets />

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <PayrollFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          monthYear={monthYear}
          onMonthYearChange={setMonthYear}
          department={department}
          onDepartmentChange={setDepartment}
          designation={designation}
          onDesignationChange={setDesignation}
          salaryStatus={salaryStatus}
          onSalaryStatusChange={setSalaryStatus}
          paymentMode={paymentMode}
          onPaymentModeChange={setPaymentMode}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Payroll Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <PayrollTable
          payrollRecords={mockPayrollRecords}
          onViewBreakdown={handleViewBreakdown}
          onEditSalary={handleEditSalary}
          onApprovePayroll={handleApprovePayroll}
          onMarkAsPaid={handleMarkAsPaid}
          onDownloadPayslip={handleDownloadPayslip}
        />
      </div>

      {/* Run Payroll Modal */}
      <RunPayrollModal
        isOpen={isRunPayrollOpen}
        onClose={() => setIsRunPayrollOpen(false)}
        onSubmit={handleRunPayroll}
      />

      {/* Salary Breakdown Modal */}
      <SalaryBreakdownModal
        payrollRecord={selectedPayrollRecord}
        isOpen={isBreakdownModalOpen}
        onClose={() => { setIsBreakdownModalOpen(false); setSelectedPayrollRecord(null); }}
      />
    </div>
  );
}
