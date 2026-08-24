'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

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

interface AttendanceData {
  month: string;
  present: number;
  absent: number;
  cl: number;
  pl: number;
  totalDays: number;
}

interface EmployeeLeave {
  clBalance: number;
  plBalance: number;
}

export default function EmployeePayrollView() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const employeeId = params.employeeId as string;

  const [payrollData, setPayrollData] = useState<PayrollEntry | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('June 2026');
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [employeeLeave, setEmployeeLeave] = useState<EmployeeLeave>({ clBalance: 12, plBalance: 15 });
  const [calculatedSalary, setCalculatedSalary] = useState<number | null>(null);

  useEffect(() => {
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

    const mockAttendance: AttendanceData[] = [
      { month: 'April 2026', present: 22, absent: 4, cl: 2, pl: 2, totalDays: 26 },
      { month: 'May 2026', present: 23, absent: 3, cl: 1, pl: 2, totalDays: 26 },
      { month: 'June 2026', present: 21, absent: 5, cl: 3, pl: 2, totalDays: 26 },
    ];
    setAttendanceData(mockAttendance);
  }, [employeeId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSalary = () => {
    if (!payrollData) return;

    const selectedAttendance = attendanceData.find(a => a.month === selectedMonth);
    if (!selectedAttendance) return;

    let clConsumed = Math.min(selectedAttendance.cl, employeeLeave.clBalance);
    let remainingCL = employeeLeave.clBalance - clConsumed;
    
    let plConsumed = Math.min(selectedAttendance.pl, remainingCL > 0 ? 0 : employeeLeave.plBalance);
    let remainingPL = employeeLeave.plBalance - plConsumed;

    const perDaySalary = payrollData.basicSalary / selectedAttendance.totalDays;
    
    const totalPaidLeaves = clConsumed + plConsumed;
    const unpaidDays = selectedAttendance.absent - totalPaidLeaves;
    const unpaidDeduction = unpaidDays > 0 ? unpaidDays * perDaySalary : 0;

    const calculatedNet = payrollData.basicSalary - payrollData.deductions - unpaidDeduction;
    setCalculatedSalary(calculatedNet);
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

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">Employee Payroll Details</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee Name</p>
            <p className="font-medium text-zinc-900 dark:text-zinc-50 text-lg">{payrollData.name}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee ID</p>
            <p className="font-medium text-zinc-900 dark:text-zinc-50 text-lg">{payrollData.employeeId}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Department</p>
            <p className="font-medium text-zinc-900 dark:text-zinc-50 text-lg">{payrollData.department}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
              payrollData.status === 'approved'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : payrollData.status === 'processed'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
            }`}>
              {payrollData.status.charAt(0).toUpperCase() + payrollData.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 mb-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Leave Balance & Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">CL Balance</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{employeeLeave.clBalance}</p>
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
                <p>• Used for personal work, emergencies, short leave</p>
                <p>• 6–12 days per year</p>
                <p>• Cannot be carried forward</p>
                <p>• Cannot be encashed</p>
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">PL Balance</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{employeeLeave.plBalance}</p>
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
                <p>• Earned based on working days</p>
                <p>• Can be carried forward to next year</p>
                <p>• Can be encashed per company policy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Attendance Data (Last 3 Months)</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              {attendanceData.map((att) => (
                <option key={att.month} value={att.month}>{att.month}</option>
              ))}
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Present</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Absent</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">CL</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">PL</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {attendanceData.map((att) => (
                  <tr key={att.month} className={att.month === selectedMonth ? 'bg-[#94cb3d]/10' : ''}>
                    <td className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">{att.month}</td>
                    <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">{att.present}</td>
                    <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400">{att.absent}</td>
                    <td className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400">{att.cl}</td>
                    <td className="px-4 py-3 text-sm text-purple-600 dark:text-purple-400">{att.pl}</td>
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-50">{att.totalDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Salary Calculation</h2>
            <button
              onClick={calculateSalary}
              className="px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
            >
              Calculate Salary
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Basic Salary</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50 text-lg">{formatCurrency(payrollData.basicSalary)}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Deductions</p>
              <p className="font-medium text-red-600 dark:text-red-400 text-lg">{formatCurrency(payrollData.deductions)}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Original Net Salary</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50 text-lg">{formatCurrency(payrollData.netSalary)}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Calculated Net Salary (Attendance-wise)</p>
              <p className="font-medium text-[#94cb3d] text-2xl">
                {calculatedSalary !== null ? formatCurrency(calculatedSalary) : 'Click Calculate'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
