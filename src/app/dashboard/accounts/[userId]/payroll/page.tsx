'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Wallet,
  CheckCircle2,
  Eye,
  Pencil,
  Calculator,
  FileText,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Download,
  Users,
  Clock,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/auth';

interface PayrollEntry {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  designation?: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'approved';
  paymentDate?: string;
}

export default function PayrollManagementPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  const [selectedMonth, setSelectedMonth] = useState('June 2026');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([
    {
      id: '6a8b0deaa89b1a8f63d51290',
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      designation: 'Senior Full Stack Lead',
      basicSalary: 80000,
      allowances: 15000,
      deductions: 12000,
      netSalary: 83000,
      status: 'processed',
      paymentDate: '2026-06-30',
    },
    {
      id: '6a8b0deaa89b1a8f63d51291',
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      department: 'HR & Operations',
      designation: 'HR Executive Manager',
      basicSalary: 65000,
      allowances: 10000,
      deductions: 9750,
      netSalary: 65250,
      status: 'processed',
      paymentDate: '2026-06-30',
    },
    {
      id: '6a8b0deaa89b1a8f63d51292',
      employeeId: 'EMP003',
      name: 'Mike Brown',
      department: 'Sales & Growth',
      designation: 'Sales Lead',
      basicSalary: 75000,
      allowances: 12000,
      deductions: 11250,
      netSalary: 75750,
      status: 'pending',
    },
    {
      id: '6a8b0deaa89b1a8f63d51293',
      employeeId: 'EMP004',
      name: 'Emily Davis',
      department: 'Engineering',
      designation: 'Backend Specialist',
      basicSalary: 90000,
      allowances: 18000,
      deductions: 13500,
      netSalary: 94500,
      status: 'approved',
      paymentDate: '2026-06-28',
    },
    {
      id: '6a8b0deaa89b1a8f63d51294',
      employeeId: 'EMP005',
      name: 'David Wilson',
      department: 'Finance & Accounts',
      designation: 'Accounts Auditor',
      basicSalary: 70000,
      allowances: 11000,
      deductions: 10500,
      netSalary: 70500,
      status: 'pending',
    },
  ]);

  useEffect(() => {
    fetchLivePayrollReport();
  }, [userId]);

  const fetchLivePayrollReport = async () => {
    try {
      const token = getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/v1/payroll/report`, { headers });
      const data = await response.json();

      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const liveEntries: PayrollEntry[] = data.data.map((item: any, idx: number) => ({
          id: item.employeeId || `emp-${idx}`,
          employeeId: item.empId || `EMP00${idx + 1}`,
          name: `${item.firstName || 'Employee'} ${item.lastName || ''}`.trim(),
          department: item.department || 'General',
          basicSalary: item.totalHoursWorked ? item.totalHoursWorked * 400 : 75000,
          allowances: 10000,
          deductions: item.daysAbsent ? item.daysAbsent * 2000 + 5000 : 6000,
          netSalary:
            (item.totalHoursWorked ? item.totalHoursWorked * 400 : 75000) +
            10000 -
            (item.daysAbsent ? item.daysAbsent * 2000 + 5000 : 6000),
          status: idx % 2 === 0 ? 'processed' : 'approved',
          paymentDate: '2026-06-30',
        }));
        setPayrollData(liveEntries);
      }
    } catch (error) {
      console.error('Error fetching live payroll report:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleProcessAllPayroll = () => {
    setProcessing(true);
    setTimeout(() => {
      setPayrollData((prev) =>
        prev.map((entry) => (entry.status === 'pending' ? { ...entry, status: 'processed' } : entry))
      );
      setProcessing(false);
      showToast('All pending employee payrolls processed successfully!');
    }, 1200);
  };

  const handleCalculateSalary = (id: string, name: string) => {
    setPayrollData((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const recalculatedNet = e.basicSalary + e.allowances - e.deductions;
          return { ...e, netSalary: recalculatedNet };
        }
        return e;
      })
    );
    showToast(`Recalculated salary & deductions for ${name}`, 'info');
  };

  const handleApprovePayroll = (id: string, name: string) => {
    setPayrollData((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, status: 'approved' } : entry))
    );
    showToast(`Approved salary disbursal for ${name}!`, 'success');
  };

  const filteredPayroll = payrollData.filter((entry) => {
    const matchesDept = selectedDepartment === 'All' || entry.department.includes(selectedDepartment);
    const matchesStatus = selectedStatus === 'All' || entry.status === selectedStatus;
    const matchesSearch =
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  const totalGrossPayroll = filteredPayroll.reduce((acc, item) => acc + item.basicSalary + item.allowances, 0);
  const totalDeductions = filteredPayroll.reduce((acc, item) => acc + item.deductions, 0);
  const totalNetDisbursal = filteredPayroll.reduce((acc, item) => acc + item.netSalary, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-blue-600'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <Wallet className="h-5 w-5 text-[#94cb3d]" />
              Employee Payroll Command Center
            </h1>
            <Badge variant="brand">{payrollData.length} Employees Loaded</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Calculate earnings, deductions, approve bank salary disbursals, and generate employee PDF payslips.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleProcessAllPayroll}
            disabled={processing}
            className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
          >
            {processing ? (
              <RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
            )}
            Process All Pending
          </Button>

          <Button
            onClick={() => router.push(`/dashboard/accounts/${userId}/payroll/monthly`)}
            variant="outline"
            className="text-xs font-medium border-zinc-200 dark:border-zinc-700"
          >
            Monthly Execution <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href={`/dashboard/accounts/${userId}/payroll/monthly`}
          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-[#94cb3d] transition-all group"
        >
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-[#94cb3d]">
            Monthly Payroll
          </span>
          <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#94cb3d]" />
        </Link>

        <Link
          href={`/dashboard/accounts/${userId}/payroll/structure`}
          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-blue-500 transition-all group"
        >
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-500">
            Salary Structure
          </span>
          <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-blue-500" />
        </Link>

        <Link
          href={`/dashboard/accounts/${userId}/payroll/reimbursement`}
          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-amber-500 transition-all group"
        >
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-amber-500">
            Reimbursements
          </span>
          <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-amber-500" />
        </Link>

        <Link
          href={`/dashboard/accounts/${userId}/payroll/payslips`}
          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-purple-500 transition-all group"
        >
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-purple-500">
            Payslips Directory
          </span>
          <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-purple-500" />
        </Link>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase">Gross Salary Expenditure</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{formatCurrency(totalGrossPayroll)}</p>
            <span className="text-[10px] text-zinc-400">Basic + Allowances</span>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase">Statutory & Tax Deductions</p>
            <p className="text-2xl font-bold text-red-500 mt-1">{formatCurrency(totalDeductions)}</p>
            <span className="text-[10px] text-red-600 font-bold">PF + ESI + TDS</span>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase">Net Disbursal Amount</p>
            <p className="text-2xl font-bold text-[#94cb3d] mt-1">{formatCurrency(totalNetDisbursal)}</p>
            <span className="text-[10px] text-emerald-600 font-bold">Total Net Transfer</span>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search employee, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-[#94cb3d]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="June 2026">June 2026</option>
            <option value="May 2026">May 2026</option>
            <option value="April 2026">April 2026</option>
          </select>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR & Operations</option>
            <option value="Sales">Sales & Growth</option>
            <option value="Finance">Finance & Accounts</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="All">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="processed">Processed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Enhanced Payroll Master Table with On-Hover Icon Tooltip Names */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Employee</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Department</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Basic Salary</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Deductions</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Net Salary</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredPayroll.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-xs text-zinc-500">
                      No payroll records match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPayroll.map((entry) => (
                    <tr key={entry.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#94cb3d]/20 text-[#94cb3d] flex items-center justify-center font-bold text-xs">
                            {entry.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{entry.name}</p>
                            <span className="text-[10px] font-mono text-zinc-500">{entry.employeeId}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{entry.department}</p>
                        <p className="text-[10px] text-zinc-400">{entry.designation || 'Staff'}</p>
                      </td>

                      <td className="px-4 py-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-50 font-mono">
                        {formatCurrency(entry.basicSalary)}
                      </td>

                      <td className="px-4 py-3.5 text-xs font-semibold text-red-500 font-mono">
                        -{formatCurrency(entry.deductions)}
                      </td>

                      <td className="px-4 py-3.5 text-xs font-bold text-[#94cb3d] font-mono">
                        {formatCurrency(entry.netSalary)}
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            entry.status === 'approved'
                              ? 'success'
                              : entry.status === 'processed'
                              ? 'secondary'
                              : 'brand'
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {entry.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 1. View Action Link (Eye Icon + Hover Tooltip Name) */}
                          <div className="relative group">
                            <Link
                              href={`/dashboard/accounts/${userId}/payroll/view/${entry.id}`}
                              className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-all flex items-center justify-center"
                              title="View Payroll Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none transition-all">
                              View Details
                            </span>
                          </div>

                          {/* 2. Edit Action Link (Pencil Icon + Hover Tooltip Name) */}
                          <div className="relative group">
                            <Link
                              href={`/dashboard/accounts/${userId}/payroll/edit/${entry.id}`}
                              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all flex items-center justify-center"
                              title="Edit Salary Structure"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none transition-all">
                              Edit Structure
                            </span>
                          </div>

                          {/* 3. Recalculate Action Trigger (Calculator Icon + Hover Tooltip Name) */}
                          <div className="relative group">
                            <button
                              onClick={() => handleCalculateSalary(entry.id, entry.name)}
                              className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-all flex items-center justify-center"
                              title="Recalculate Net Salary"
                            >
                              <Calculator className="h-4 w-4" />
                            </button>
                            <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none transition-all">
                              Recalculate Pay
                            </span>
                          </div>

                          {/* 4. Approve Action Trigger (ShieldCheck Icon + Hover Tooltip Name) */}
                          {entry.status !== 'approved' && (
                            <div className="relative group">
                              <button
                                onClick={() => handleApprovePayroll(entry.id, entry.name)}
                                className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-all flex items-center justify-center"
                                title="Approve Disbursal"
                              >
                                <ShieldCheck className="h-4 w-4" />
                              </button>
                              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none transition-all">
                                Approve Disbursal
                              </span>
                            </div>
                          )}

                          {/* 5. View Payslip PDF Link (FileText Icon + Hover Tooltip Name) */}
                          <div className="relative group">
                            <Link
                              href={`/dashboard/accounts/${userId}/payroll/payslip/${entry.id}`}
                              className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition-all flex items-center justify-center"
                              title="View & Print Payslip"
                            >
                              <FileText className="h-4 w-4" />
                            </Link>
                            <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none transition-all">
                              View Payslip
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
