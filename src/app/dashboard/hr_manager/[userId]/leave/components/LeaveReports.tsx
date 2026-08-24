'use client';

import { useState } from 'react';
import { FileText, Download } from 'lucide-react';

export default function LeaveReports() {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [dateRange, setDateRange] = useState('');

  const handleGenerateReport = () => {
    alert('Generating report...');
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Generate Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          >
            <option value="">All Employees</option>
            <option value="1">Rahul Sharma</option>
            <option value="2">Amit Kumar</option>
            <option value="3">Priya Singh</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          >
            <option value="">All Departments</option>
            <option value="sales">Sales</option>
            <option value="hr">HR</option>
            <option value="it">IT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Branch</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          >
            <option value="">All Branches</option>
            <option value="headquarters">Headquarters</option>
            <option value="north">North Branch</option>
            <option value="south">South Branch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          >
            <option value="">Select Range</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleGenerateReport}
          className="flex items-center gap-2 px-6 py-3 bg-[#94cb3d] text-white rounded-lg font-medium hover:bg-[#7ab32e] transition-colors"
        >
          <FileText className="h-5 w-5" />
          Generate Report
        </button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 hover:border-[#94cb3d] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Excel Report</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Detailed data in spreadsheet</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
            <Download className="h-4 w-4" />
            Download Excel
          </button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 hover:border-[#94cb3d] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">PDF Report</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Printable document format</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 hover:border-[#94cb3d] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">CSV Report</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Comma-separated values</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
            <Download className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}
