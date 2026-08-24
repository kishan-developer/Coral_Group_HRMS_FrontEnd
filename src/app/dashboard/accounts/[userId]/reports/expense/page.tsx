'use client';

import { useState } from 'react';
import { Search, Filter, Download, FileText, Calendar, TrendingUp, TrendingDown, DollarSign, Users, Printer, Mail, Clock, CheckCircle2, AlertCircle, BarChart3, PieChart, Receipt } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ExpenseReports() {
  const params = useParams();
  const userId = params.userId as string;

  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Expense summary data
  const expenseSummary = {
    totalExpenses: 1220000,
    pendingApprovals: 185000,
    approvedClaims: 950000,
    rejectedClaims: 85000,
    reimbursedAmount: 720000,
    pendingReimbursement: 230000,
  };

  // Category-wise expenses
  const categoryExpenses = [
    { category: 'Travel', amount: 350000, percentage: 29, claims: 25 },
    { category: 'Medical', amount: 180000, percentage: 15, claims: 18 },
    { category: 'Training', amount: 250000, percentage: 20, claims: 12 },
    { category: 'Office Supplies', amount: 120000, percentage: 10, claims: 35 },
    { category: 'Client Meeting', amount: 200000, percentage: 16, claims: 20 },
    { category: 'Miscellaneous', amount: 120000, percentage: 10, claims: 15 },
  ];

  // Department-wise expenses
  const departmentExpenses = [
    { department: 'Sales', totalExpenses: 450000, avgPerEmployee: 18000, employees: 25 },
    { department: 'Engineering', totalExpenses: 380000, avgPerEmployee: 10857, employees: 35 },
    { department: 'Marketing', totalExpenses: 220000, avgPerEmployee: 11000, employees: 20 },
    { department: 'HR', totalExpenses: 80000, avgPerEmployee: 5333, employees: 15 },
    { department: 'Finance', totalExpenses: 50000, avgPerEmployee: 4167, employees: 12 },
    { department: 'Operations', totalExpenses: 40000, avgPerEmployee: 2222, employees: 18 },
  ];

  // Monthly expense trend
  const monthlyExpenses = [
    { month: 'Jan', submitted: 900000, approved: 750000, reimbursed: 600000 },
    { month: 'Feb', submitted: 950000, approved: 800000, reimbursed: 650000 },
    { month: 'Mar', submitted: 1100000, approved: 920000, reimbursed: 750000 },
    { month: 'Apr', submitted: 1050000, approved: 880000, reimbursed: 700000 },
    { month: 'May', submitted: 1150000, approved: 950000, reimbursed: 720000 },
    { month: 'Jun', submitted: 1220000, approved: 950000, reimbursed: 720000 },
  ];

  // Approval status data
  const approvalStatus = [
    { status: 'Pending', count: 18, amount: 185000 },
    { status: 'Approved', count: 95, amount: 950000 },
    { status: 'Rejected', count: 12, amount: 85000 },
  ];

  // Reimbursement status data
  const reimbursementStatus = [
    { status: 'Pending Payment', count: 15, amount: 230000 },
    { status: 'Paid', count: 80, amount: 720000 },
    { status: 'Processing', count: 5, amount: 50000 },
  ];

  // Recent expenses
  const recentExpenses = [
    { id: 'EXP-001', employee: 'John Smith', department: 'Engineering', category: 'Travel', amount: 15000, status: 'Approved', date: '2026-06-15' },
    { id: 'EXP-002', employee: 'Sarah Johnson', department: 'HR', category: 'Medical', amount: 8500, status: 'Pending', date: '2026-06-14' },
    { id: 'EXP-003', employee: 'Mike Brown', department: 'Sales', category: 'Client Meeting', amount: 25000, status: 'Approved', date: '2026-06-13' },
    { id: 'EXP-004', employee: 'Emily Davis', department: 'Engineering', category: 'Training', amount: 35000, status: 'Paid', date: '2026-06-12' },
    { id: 'EXP-005', employee: 'David Wilson', department: 'Marketing', category: 'Office Supplies', amount: 5000, status: 'Rejected', date: '2026-06-11' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Paid': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Processing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Expense Reports</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Track employee expenses, reimbursements, approvals, and spending analytics</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Calendar className="h-4 w-4" />
            Schedule Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <FileText className="h-4 w-4" />
            Export Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg hover:bg-[#7ab52f] transition-colors">
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Expense Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Expenses</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(expenseSummary.totalExpenses)}</p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Receipt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Pending Approval</p>
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{formatCurrency(expenseSummary.pendingApprovals)}</p>
            </div>
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-full">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Approved Claims</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(expenseSummary.approvedClaims)}</p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Rejected Claims</p>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{formatCurrency(expenseSummary.rejectedClaims)}</p>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Reimbursed</p>
              <p className="text-lg font-bold text-teal-600 dark:text-teal-400">{formatCurrency(expenseSummary.reimbursedAmount)}</p>
            </div>
            <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-full">
              <DollarSign className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Pending Reimbursement</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{formatCurrency(expenseSummary.pendingReimbursement)}</p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
            <option value="Custom">Custom</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Categories</option>
            <option value="Travel">Travel</option>
            <option value="Medical">Medical</option>
            <option value="Training">Training</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Client Meeting">Client Meeting</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
      </div>

      {/* Expense Dashboard Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Trend */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Monthly Expense Trend</h3>
          <div className="space-y-3">
            {monthlyExpenses.map((data) => (
              <div key={data.month} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">{data.month}</span>
                  <span className="text-zinc-900 dark:text-zinc-50">Submitted: {formatCurrency(data.submitted)} | Reimbursed: {formatCurrency(data.reimbursed)}</span>
                </div>
                <div className="flex gap-1 h-4">
                  <div className="bg-blue-500 rounded" style={{ width: `${(data.submitted / 1300000) * 100}%` }}></div>
                  <div className="bg-green-500 rounded" style={{ width: `${(data.reimbursed / 1300000) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-zinc-600 dark:text-zinc-400">Submitted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-zinc-600 dark:text-zinc-400">Reimbursed</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categoryExpenses.map((category) => (
              <div key={category.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">{category.category}</span>
                  <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(category.amount)} ({category.percentage}%)</span>
                </div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#94cb3d] rounded-full" style={{ width: `${category.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-700">
        <nav className="flex gap-4 overflow-x-auto">
          {['Overview', 'Category Summary', 'Department Analysis', 'Approval Status', 'Reimbursement Status', 'Trends'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-[#94cb3d] text-[#94cb3d]'
                  : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Expense Overview</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Expense ID</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Employee</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Department</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Category</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Amount</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Status</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {recentExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="py-3 px-3 text-sm text-zinc-900 dark:text-zinc-50">{expense.id}</td>
                      <td className="py-3 px-3 text-sm text-zinc-900 dark:text-zinc-50">{expense.employee}</td>
                      <td className="py-3 px-3 text-sm text-zinc-600 dark:text-zinc-400">{expense.department}</td>
                      <td className="py-3 px-3 text-sm text-zinc-600 dark:text-zinc-400">{expense.category}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(expense.amount)}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                          {expense.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-sm text-zinc-600 dark:text-zinc-400">{new Date(expense.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Category Summary' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Category Summary</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Category</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Total Amount</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Percentage</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">No. of Claims</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Avg per Claim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {categoryExpenses.map((category) => (
                    <tr key={category.category}>
                      <td className="py-3 px-3 text-sm text-zinc-900 dark:text-zinc-50">{category.category}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(category.amount)}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-600 dark:text-zinc-400">{category.percentage}%</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-600 dark:text-zinc-400">{category.claims}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-600 dark:text-zinc-400">{formatCurrency(category.amount / category.claims)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Department Analysis' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Department Analysis</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Department</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Total Expenses</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Employees</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Avg per Employee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {departmentExpenses.map((dept) => (
                    <tr key={dept.department}>
                      <td className="py-3 px-3 text-sm text-zinc-900 dark:text-zinc-50">{dept.department}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(dept.totalExpenses)}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-600 dark:text-zinc-400">{dept.employees}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-600 dark:text-zinc-400">{formatCurrency(dept.avgPerEmployee)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Approval Status' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Approval Status</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {approvalStatus.map((status) => (
                <div key={status.status} className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{status.status}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(status.amount)}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{status.count} claims</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Reimbursement Status' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Reimbursement Status</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reimbursementStatus.map((status) => (
                <div key={status.status} className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{status.status}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(status.amount)}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{status.count} claims</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Trends' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Expense Trends</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-3">Monthly Growth</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">+15.2%</span>
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">vs last month</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-3">Avg Claim Amount</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(12200)}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">per claim</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audit Trail */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">Claim Approved</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Accounts Manager - 2 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">Reimbursement Processed</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Finance Team - 5 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">New Claim Submitted</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Employee - 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
