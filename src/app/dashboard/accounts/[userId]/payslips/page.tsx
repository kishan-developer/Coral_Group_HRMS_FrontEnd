'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Payslip {
  id: string;
  employeeId: string;
  name: string;
  month: string;
  year: string;
  basicSalary: number;
  netSalary: number;
  status: 'generated' | 'emailed' | 'downloaded';
}

export default function Payslips() {
  const [selectedMonth, setSelectedMonth] = useState('June');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [payslipsData, setPayslipsData] = useState<Payslip[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'John Smith',
      month: 'June',
      year: '2026',
      basicSalary: 80000,
      netSalary: 68000,
      status: 'generated',
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      month: 'June',
      year: '2026',
      basicSalary: 65000,
      netSalary: 55250,
      status: 'emailed',
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Mike Brown',
      month: 'May',
      year: '2026',
      basicSalary: 75000,
      netSalary: 63750,
      status: 'downloaded',
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'Emily Davis',
      month: 'June',
      year: '2026',
      basicSalary: 90000,
      netSalary: 76500,
      status: 'generated',
    },
    {
      id: '5',
      employeeId: 'EMP005',
      name: 'David Wilson',
      month: 'May',
      year: '2026',
      basicSalary: 70000,
      netSalary: 59500,
      status: 'downloaded',
    },
  ]);
  const [generating, setGenerating] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleGeneratePayslips = () => {
    setGenerating(true);
    setTimeout(() => {
      setPayslipsData(payslipsData.map(payslip => 
        payslip.status === 'generated' ? { ...payslip, status: 'emailed' as const } : payslip
      ));
      setGenerating(false);
    }, 1500);
  };

  const handleDownloadPayslip = (id: string) => {
    const payslip = payslipsData.find((p: Payslip) => p.id === id);
    if (payslip) {
      setPayslipsData(payslipsData.map(p => 
        p.id === id ? { ...p, status: 'downloaded' as const } : p
      ));
      alert(`Downloading payslip for ${payslip.name} - Net Salary: ${formatCurrency(payslip.netSalary)}`);
    }
  };

  const handleEmailPayslip = (id: string) => {
    const payslip = payslipsData.find((p: Payslip) => p.id === id);
    if (payslip) {
      setPayslipsData(payslipsData.map(p => 
        p.id === id ? { ...p, status: 'emailed' as const } : p
      ));
      alert(`Payslip emailed to ${payslip.name}`);
    }
  };

  const handleViewPayslip = (id: string) => {
    const payslip = payslipsData.find((p: Payslip) => p.id === id);
    if (payslip) {
      setSelectedPayslip(payslip);
      setShowViewModal(true);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Payslips
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Generate, view, and manage employee payslips
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleGeneratePayslips}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Bulk Generate
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Status</option>
            <option value="generated">Generated</option>
            <option value="emailed">Emailed</option>
            <option value="downloaded">Downloaded</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {payslipsData.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{payslip.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">{payslip.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {payslip.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {payslip.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(payslip.basicSalary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(payslip.netSalary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payslip.status === 'emailed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : payslip.status === 'downloaded'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {payslip.status.charAt(0).toUpperCase() + payslip.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewPayslip(payslip.id)}
                        className="text-[#94cb3d] hover:text-[#7ab52f]"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleDownloadPayslip(payslip.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Download PDF
                      </button>
                      <button 
                        onClick={() => handleEmailPayslip(payslip.id)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showViewModal && selectedPayslip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Payslip Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.name}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee ID</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Period</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.month} {selectedPayslip.year}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Basic Salary</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedPayslip.basicSalary)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Net Salary</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedPayslip.netSalary)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Status</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.status}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowViewModal(false);
                setSelectedPayslip(null);
              }}
              className="mt-6 w-full px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
