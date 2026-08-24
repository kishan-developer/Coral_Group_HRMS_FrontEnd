'use client';

import { useState } from 'react';
import { Search, Filter, Download, Printer, Eye, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  designation: string;
  month: string;
  year: string;
  basicSalary: number;
  hra: number;
  medicalAllowance: number;
  specialAllowance: number;
  grossSalary: number;
  pf: number;
  esi: number;
  professionalTax: number;
  tds: number;
  totalDeductions: number;
  netSalary: number;
  paidDate: string;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  paidLeaves: number;
  unpaidLeaves: number;
  bankAccount: string;
  bankName: string;
  ifsc: string;
  pan: string;
  joiningDate: string;
  yearToDateGross: number;
  yearToDateTax: number;
  yearToDateNet: number;
}

export default function PayrollPayslips() {
  const params = useParams();
  const userId = params.userId as string;

  const [selectedMonth, setSelectedMonth] = useState('June 2026');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewMode, setViewMode] = useState<'detailed' | 'pdf'>('detailed');

  const [payslips, setPayslips] = useState<Payslip[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      employeeEmail: 'john.smith@coralgroup.com',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      month: 'June',
      year: '2026',
      basicSalary: 80000,
      hra: 32000,
      medicalAllowance: 8000,
      specialAllowance: 4000,
      grossSalary: 124000,
      pf: 9600,
      esi: 1240,
      professionalTax: 200,
      tds: 5000,
      totalDeductions: 16040,
      netSalary: 107960,
      paidDate: '2026-06-30',
      workingDays: 26,
      presentDays: 22,
      absentDays: 2,
      paidLeaves: 2,
      unpaidLeaves: 0,
      bankAccount: '123456789012',
      bankName: 'HDFC Bank',
      ifsc: 'HDFC0001234',
      pan: 'ABCDE1234F',
      joiningDate: '2020-03-15',
      yearToDateGross: 744000,
      yearToDateTax: 96240,
      yearToDateNet: 647760,
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@coralgroup.com',
      department: 'HR',
      designation: 'HR Manager',
      month: 'June',
      year: '2026',
      basicSalary: 65000,
      hra: 26000,
      medicalAllowance: 6500,
      specialAllowance: 3250,
      grossSalary: 100750,
      pf: 7800,
      esi: 1008,
      professionalTax: 200,
      tds: 4000,
      totalDeductions: 13008,
      netSalary: 87742,
      paidDate: '2026-06-30',
      workingDays: 26,
      presentDays: 24,
      absentDays: 1,
      paidLeaves: 1,
      unpaidLeaves: 0,
      bankAccount: '987654321098',
      bankName: 'ICICI Bank',
      ifsc: 'ICIC0009876',
      pan: 'FGHIJ5678K',
      joiningDate: '2019-08-01',
      yearToDateGross: 604500,
      yearToDateTax: 78048,
      yearToDateNet: 526452,
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Mike Brown',
      employeeEmail: 'mike.brown@coralgroup.com',
      department: 'Sales',
      designation: 'Sales Executive',
      month: 'June',
      year: '2026',
      basicSalary: 75000,
      hra: 30000,
      medicalAllowance: 7500,
      specialAllowance: 3750,
      grossSalary: 116250,
      pf: 9000,
      esi: 1162,
      professionalTax: 200,
      tds: 4500,
      totalDeductions: 14862,
      netSalary: 101388,
      paidDate: '2026-06-30',
      workingDays: 26,
      presentDays: 23,
      absentDays: 2,
      paidLeaves: 1,
      unpaidLeaves: 0,
      bankAccount: '112233445566',
      bankName: 'SBI',
      ifsc: 'SBIN0001122',
      pan: 'KLMNO9012P',
      joiningDate: '2021-01-10',
      yearToDateGross: 697500,
      yearToDateTax: 89172,
      yearToDateNet: 608328,
    },
    {
      id: '4',
      employeeId: 'EMP004',
      employeeName: 'Emily Davis',
      employeeEmail: 'emily.davis@coralgroup.com',
      department: 'Engineering',
      designation: 'Tech Lead',
      month: 'June',
      year: '2026',
      basicSalary: 90000,
      hra: 36000,
      medicalAllowance: 9000,
      specialAllowance: 4500,
      grossSalary: 139500,
      pf: 10800,
      esi: 1395,
      professionalTax: 200,
      tds: 6000,
      totalDeductions: 18395,
      netSalary: 121105,
      paidDate: '2026-06-30',
      workingDays: 26,
      presentDays: 25,
      absentDays: 0,
      paidLeaves: 1,
      unpaidLeaves: 0,
      bankAccount: '554433221100',
      bankName: 'Axis Bank',
      ifsc: 'UTIB0005544',
      pan: 'QRSTU3456V',
      joiningDate: '2018-06-20',
      yearToDateGross: 837000,
      yearToDateTax: 110370,
      yearToDateNet: 726630,
    },
    {
      id: '5',
      employeeId: 'EMP005',
      employeeName: 'David Wilson',
      employeeEmail: 'david.wilson@coralgroup.com',
      department: 'Finance',
      designation: 'Finance Analyst',
      month: 'June',
      year: '2026',
      basicSalary: 70000,
      hra: 28000,
      medicalAllowance: 7000,
      specialAllowance: 3500,
      grossSalary: 108500,
      pf: 8400,
      esi: 1085,
      professionalTax: 200,
      tds: 5000,
      totalDeductions: 14685,
      netSalary: 93815,
      paidDate: '2026-06-30',
      workingDays: 26,
      presentDays: 24,
      absentDays: 1,
      paidLeaves: 1,
      unpaidLeaves: 0,
      bankAccount: '667788990011',
      bankName: 'Kotak Bank',
      ifsc: 'KKBK0006677',
      pan: 'WXYZ7890A',
      joiningDate: '2019-11-05',
      yearToDateGross: 651000,
      yearToDateTax: 88110,
      yearToDateNet: 562890,
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setShowViewModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (payslip: Payslip) => {
    alert(`Downloading payslip for ${payslip.employeeName} - ${payslip.month} ${payslip.year}`);
  };

  const handleSendEmail = (payslip: Payslip) => {
    if (confirm(`Send salary slip to ${payslip.employeeEmail}?`)) {
      alert(`Salary slip sent successfully to ${payslip.employeeEmail}`);
    }
  };

  const filteredPayslips = payslips.filter(payslip => {
    const monthYear = `${payslip.month} ${payslip.year}`;
    const matchesMonth = selectedMonth === 'All' || monthYear.includes(selectedMonth);
    const matchesYear = selectedYear === 'All' || payslip.year === selectedYear;
    const matchesDepartment = selectedDepartment === 'All' || payslip.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Paid' && payslip.paidDate) ||
      (selectedStatus === 'Unpaid' && !payslip.paidDate);
    const matchesMinSalary = minSalary === '' || payslip.netSalary >= Number(minSalary);
    const matchesMaxSalary = maxSalary === '' || payslip.netSalary <= Number(maxSalary);
    const matchesSearch = searchTerm === '' || 
      payslip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payslip.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMonth && matchesYear && matchesDepartment && matchesStatus && matchesMinSalary && matchesMaxSalary && matchesSearch;
  });

  return (
    <div className="p-8 space-y-6">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Payslips</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">View and download employee payslips</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
          <Download className="h-4 w-4" />
          Export All
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 no-print">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
            </div>
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Months</option>
            <option value="June">June</option>
            <option value="May">May</option>
            <option value="April">April</option>
            <option value="March">March</option>
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
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <input
            type="number"
            placeholder="Min Salary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          />
          <input
            type="number"
            placeholder="Max Salary"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          />
        </div>

        <div className="overflow-x-auto no-print">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Gross Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Paid Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredPayslips.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{payslip.employeeName}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">{payslip.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {payslip.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50">
                    {payslip.month} {payslip.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    {formatCurrency(payslip.grossSalary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                    {formatCurrency(payslip.totalDeductions)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(payslip.netSalary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {new Date(payslip.paidDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleView(payslip)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handlePrint()}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(payslip)}
                        className="text-[#94cb3d] hover:text-[#7ab52f]"
                      >
                        <Download className="h-4 w-4" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 no-print">
          <div className="print-content bg-white dark:bg-zinc-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-6 no-print">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'detailed'
                      ? 'bg-[#94cb3d] text-white'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  Detailed View
                </button>
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'pdf'
                      ? 'bg-[#94cb3d] text-white'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  PDF View
                </button>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>

            {viewMode === 'detailed' ? (
              <>
                {/* Detailed View - Previous Content */}
                <div className="border-b-2 border-[#94cb3d] pb-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-[#94cb3d]">CORAL GROUP</h1>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Payslip for {selectedPayslip.month} {selectedPayslip.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">Pay Date: {new Date(selectedPayslip.paidDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-700 pb-2">Employee Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Name:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.employeeName}</span>
                      <span className="text-zinc-600 dark:text-zinc-400">Employee ID:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.employeeId}</span>
                      <span className="text-zinc-600 dark:text-zinc-400">Department:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.department}</span>
                      <span className="text-zinc-600 dark:text-zinc-400">Designation:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.designation}</span>
                      <span className="text-zinc-600 dark:text-zinc-400">Joining Date:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{new Date(selectedPayslip.joiningDate).toLocaleDateString()}</span>
                      <span className="text-zinc-600 dark:text-zinc-400">PAN:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.pan}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-700 pb-2">Bank Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Bank Name:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.bankName}</span>
                      <span className="text-zinc-600 dark:text-zinc-400">Account No:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.bankAccount}</span>
                      <span className="text-zinc-600 dark:text-zinc-400">IFSC Code:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPayslip.ifsc}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Attendance Summary</h3>
                  <div className="grid grid-cols-5 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-[#94cb3d]">{selectedPayslip.workingDays}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Working Days</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedPayslip.presentDays}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Present</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{selectedPayslip.absentDays}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Absent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedPayslip.paidLeaves}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Paid Leaves</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedPayslip.unpaidLeaves}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Unpaid Leaves</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3">
                      <h3 className="font-semibold text-green-700 dark:text-green-400">Earnings</h3>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Basic Salary</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedPayslip.basicSalary)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">HRA</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedPayslip.hra)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Medical Allowance</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedPayslip.medicalAllowance)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Special Allowance</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedPayslip.specialAllowance)}</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <span className="text-zinc-900 dark:text-zinc-50">Gross Salary</span>
                        <span className="text-green-600 dark:text-green-400">{formatCurrency(selectedPayslip.grossSalary)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                    <div className="bg-red-50 dark:bg-red-900/20 p-3">
                      <h3 className="font-semibold text-red-700 dark:text-red-400">Deductions</h3>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">PF (Provident Fund)</span>
                        <span className="font-medium text-red-600 dark:text-red-400">{formatCurrency(selectedPayslip.pf)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">ESI</span>
                        <span className="font-medium text-red-600 dark:text-red-400">{formatCurrency(selectedPayslip.esi)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Professional Tax</span>
                        <span className="font-medium text-red-600 dark:text-red-400">{formatCurrency(selectedPayslip.professionalTax)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">TDS (Tax Deducted at Source)</span>
                        <span className="font-medium text-red-600 dark:text-red-400">{formatCurrency(selectedPayslip.tds)}</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <span className="text-zinc-900 dark:text-zinc-50">Total Deductions</span>
                        <span className="text-red-600 dark:text-red-400">{formatCurrency(selectedPayslip.totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#94cb3d] bg-opacity-10 dark:bg-[#94cb3d] dark:bg-opacity-10 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Net Salary Payable</span>
                    <span className="text-3xl font-bold text-[#94cb3d]">{formatCurrency(selectedPayslip.netSalary)}</span>
                  </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 mb-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Year to Date (YTD) Summary</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg text-center">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">YTD Gross</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(selectedPayslip.yearToDateGross)}</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg text-center">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">YTD Tax</p>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">{formatCurrency(selectedPayslip.yearToDateTax)}</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg text-center">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">YTD Net</p>
                      <p className="text-lg font-bold text-[#94cb3d]">{formatCurrency(selectedPayslip.yearToDateNet)}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 mt-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="border-b border-zinc-400 dark:border-zinc-600 mb-2 pb-8">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee Signature</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-zinc-400 dark:border-zinc-600 mb-2 pb-8">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Authorized Signature</p>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Coral Group - HR & Accounts</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* PDF-Optimized View */}
                <div className="border-2 border-gray-400 p-6 text-sm bg-white text-black">
                  {/* PDF Header */}
                  <div className="flex justify-between items-start border-b-2 border-gray-600 pb-4 mb-4">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">CORAL GROUP</h1>
                      <p className="text-xs text-gray-700">Salary Slip - {selectedPayslip.month} {selectedPayslip.year}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="text-gray-900"><strong>Pay Date:</strong> {new Date(selectedPayslip.paidDate).toLocaleDateString()}</p>
                      <p className="text-gray-900"><strong>Employee ID:</strong> {selectedPayslip.employeeId}</p>
                    </div>
                  </div>

                  {/* Employee Info */}
                  <div className="mb-4">
                    <table className="w-full text-xs">
                      <tbody>
                        <tr>
                          <td className="py-1 text-gray-900"><strong>Name:</strong> {selectedPayslip.employeeName}</td>
                          <td className="py-1 text-gray-900"><strong>Designation:</strong> {selectedPayslip.designation}</td>
                          <td className="py-1 text-gray-900"><strong>Department:</strong> {selectedPayslip.department}</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-900"><strong>PAN:</strong> {selectedPayslip.pan}</td>
                          <td className="py-1 text-gray-900"><strong>Bank:</strong> {selectedPayslip.bankName}</td>
                          <td className="py-1 text-gray-900"><strong>Account:</strong> {selectedPayslip.bankAccount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Attendance */}
                  <div className="mb-4 bg-gray-100 p-2 border border-gray-300">
                    <p className="font-bold text-xs mb-1 text-gray-900">Attendance Summary</p>
                    <div className="flex justify-around text-xs text-gray-900">
                      <span>Working: {selectedPayslip.workingDays}</span>
                      <span>Present: {selectedPayslip.presentDays}</span>
                      <span>Absent: {selectedPayslip.absentDays}</span>
                      <span>Paid Leaves: {selectedPayslip.paidLeaves}</span>
                      <span>Unpaid: {selectedPayslip.unpaidLeaves}</span>
                    </div>
                  </div>

                  {/* Earnings & Deductions Table */}
                  <div className="mb-4">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-500 p-1 text-left text-gray-900">Description</th>
                          <th className="border border-gray-500 p-1 text-right text-gray-900">Earnings</th>
                          <th className="border border-gray-500 p-1 text-right text-gray-900">Deductions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">Basic Salary</td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.basicSalary)}</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">HRA</td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.hra)}</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">Medical Allowance</td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.medicalAllowance)}</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">Special Allowance</td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.specialAllowance)}</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">PF (Provident Fund)</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.pf)}</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">ESI</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.esi)}</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">Professional Tax</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.professionalTax)}</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 text-gray-900">TDS</td>
                          <td className="border border-gray-400 p-1 text-gray-900"></td>
                          <td className="border border-gray-400 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.tds)}</td>
                        </tr>
                        <tr className="font-bold bg-gray-100">
                          <td className="border border-gray-500 p-1 text-gray-900">TOTAL</td>
                          <td className="border border-gray-500 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.grossSalary)}</td>
                          <td className="border border-gray-500 p-1 text-right text-gray-900">{formatCurrency(selectedPayslip.totalDeductions)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Net Salary */}
                  <div className="border-2 border-gray-600 p-3 mb-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-gray-900">NET SALARY PAYABLE</span>
                      <span className="font-bold text-lg text-gray-900">{formatCurrency(selectedPayslip.netSalary)}</span>
                    </div>
                  </div>

                  {/* YTD Summary */}
                  <div className="mb-4 text-xs">
                    <p className="font-bold mb-1 text-gray-900">Year to Date Summary</p>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-1 text-gray-900">YTD Gross: {formatCurrency(selectedPayslip.yearToDateGross)}</td>
                          <td className="py-1 text-gray-900">YTD Tax: {formatCurrency(selectedPayslip.yearToDateTax)}</td>
                          <td className="py-1 text-gray-900">YTD Net: {formatCurrency(selectedPayslip.yearToDateNet)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-8 mt-6 pt-4 border-t border-gray-400">
                    <div className="text-center">
                      <div className="border-b border-gray-600 mb-2 pb-6"></div>
                      <p className="text-xs text-gray-900">Employee Signature</p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-gray-600 mb-2 pb-6"></div>
                      <p className="text-xs text-gray-900">Authorized Signature</p>
                      <p className="text-xs text-gray-700">Coral Group - HR & Accounts</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 mt-6 no-print">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button
                onClick={() => handleDownload(selectedPayslip)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={() => handleSendEmail(selectedPayslip)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
