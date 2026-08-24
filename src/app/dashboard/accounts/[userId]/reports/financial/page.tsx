'use client';

import { useState } from 'react';
import { Search, Filter, Download, FileText, Calendar, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, BarChart3, PieChart, LineChart, Printer, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function FinancialReports() {
  const params = useParams();
  const userId = params.userId as string;

  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [financialYear, setFinancialYear] = useState('2024-2025');

  // Financial summary data
  const financialSummary = {
    totalRevenue: 2540000,
    totalExpense: 1220000,
    netProfit: 1320000,
    taxLiability: 210000,
    cashBalance: 450000,
    bankBalance: 1850000,
    accountsReceivable: 320000,
    accountsPayable: 180000,
    gstPayable: 45000,
    outstandingInvoices: 85000,
  };

  // Monthly revenue data
  const monthlyData = [
    { month: 'Jan', revenue: 180000, expense: 120000, profit: 60000 },
    { month: 'Feb', revenue: 220000, expense: 140000, profit: 80000 },
    { month: 'Mar', revenue: 260000, expense: 160000, profit: 100000 },
    { month: 'Apr', revenue: 240000, expense: 150000, profit: 90000 },
    { month: 'May', revenue: 280000, expense: 170000, profit: 110000 },
    { month: 'Jun', revenue: 320000, expense: 180000, profit: 140000 },
  ];

  // Expense breakdown data
  const expenseBreakdown = [
    { category: 'Salary', amount: 500000, percentage: 41 },
    { category: 'Rent', amount: 200000, percentage: 16 },
    { category: 'Utilities', amount: 100000, percentage: 8 },
    { category: 'Marketing', amount: 150000, percentage: 12 },
    { category: 'Travel', amount: 120000, percentage: 10 },
    { category: 'Operations', amount: 150000, percentage: 13 },
  ];

  // Profit & Loss data
  const profitLoss = {
    revenue: 2000000,
    costOfGoodsSold: 500000,
    grossProfit: 1500000,
    operatingExpenses: 400000,
    netProfit: 1100000,
  };

  // Balance sheet data
  const balanceSheet = {
    assets: {
      cash: 450000,
      bank: 1850000,
      inventory: 320000,
      accountsReceivable: 320000,
      fixedAssets: 2800000,
      total: 5740000,
    },
    liabilities: {
      loans: 1200000,
      accountsPayable: 180000,
      gstLiability: 45000,
      employeeDues: 85000,
      total: 1510000,
    },
    equity: {
      ownerCapital: 4000000,
      retainedEarnings: 230000,
      total: 4230000,
    },
  };

  // Cash flow data
  const cashFlow = {
    openingBalance: 1200000,
    cashInflow: 1800000,
    cashOutflow: 1500000,
    closingBalance: 1500000,
  };

  // GST data
  const gstData = {
    gstCollected: 320000,
    gstPaid: 180000,
    netGstLiability: 140000,
  };

  // Accounts receivable data
  const receivables = [
    { customer: 'ABC Corp', invoiceNo: 'INV-001', dueDate: '2026-06-15', amount: 85000, status: 'Current' },
    { customer: 'XYZ Ltd', invoiceNo: 'INV-002', dueDate: '2026-06-20', amount: 120000, status: 'Due Soon' },
    { customer: 'PQR Inc', invoiceNo: 'INV-003', dueDate: '2026-06-05', amount: 65000, status: 'Overdue' },
    { customer: 'LMN Tech', invoiceNo: 'INV-004', dueDate: '2026-06-25', amount: 50000, status: 'Current' },
  ];

  // Accounts payable data
  const payables = [
    { vendor: 'Supplier A', billNo: 'BILL-001', dueDate: '2026-06-10', amount: 45000, status: 'Overdue' },
    { vendor: 'Supplier B', billNo: 'BILL-002', dueDate: '2026-06-20', amount: 80000, status: 'Pending' },
    { vendor: 'Supplier C', billNo: 'BILL-003', dueDate: '2026-06-15', amount: 35000, status: 'Partially Paid' },
    { vendor: 'Supplier D', billNo: 'BILL-004', dueDate: '2026-06-30', amount: 20000, status: 'Pending' },
  ];

  // Budget vs Actual data
  const budgetAnalysis = [
    { category: 'Marketing', budget: 50000, actual: 42000, variance: 8000 },
    { category: 'Sales', budget: 200000, actual: 240000, variance: 40000 },
    { category: 'Operations', budget: 150000, actual: 165000, variance: -15000 },
    { category: 'HR', budget: 100000, actual: 95000, variance: 5000 },
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
      case 'Current': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Due Soon': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Partially Paid': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Financial Reports & Analytics</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Track company financial performance, income, expenses, profits, taxes, and cash flow</p>
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

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Revenue</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.totalRevenue)}</p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Expense</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.totalExpense)}</p>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Net Profit</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.netProfit)}</p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Tax Liability</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.taxLiability)}</p>
            </div>
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-full">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Cash Balance</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.cashBalance)}</p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Bank Balance</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.bankBalance)}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Accounts Receivable</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.accountsReceivable)}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Accounts Payable</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.accountsPayable)}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">GST Payable</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(financialSummary.gstPayable)}</p>
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
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Branches</option>
            <option value="Head Office">Head Office</option>
            <option value="Branch A">Branch A</option>
            <option value="Branch B">Branch B</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
          </select>
        </div>
      </div>

      {/* Financial Dashboard Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Revenue vs Expenses</h3>
          <div className="space-y-3">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">{data.month}</span>
                  <span className="text-zinc-900 dark:text-zinc-50">Revenue: {formatCurrency(data.revenue)} | Expense: {formatCurrency(data.expense)}</span>
                </div>
                <div className="flex gap-1 h-4">
                  <div className="bg-green-500 rounded" style={{ width: `${(data.revenue / 400000) * 100}%` }}></div>
                  <div className="bg-red-500 rounded" style={{ width: `${(data.expense / 400000) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-zinc-600 dark:text-zinc-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-zinc-600 dark:text-zinc-400">Expense</span>
            </div>
          </div>
        </div>

        {/* Expense Breakdown Chart */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            {expenseBreakdown.map((expense) => (
              <div key={expense.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">{expense.category}</span>
                  <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(expense.amount)} ({expense.percentage}%)</span>
                </div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#94cb3d] rounded-full" style={{ width: `${expense.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-700">
        <nav className="flex gap-4 overflow-x-auto">
          {['Overview', 'Profit & Loss', 'Balance Sheet', 'Cash Flow', 'GST Reports', 'Receivables', 'Payables', 'Budget Analysis'].map((tab) => (
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
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Financial Overview</h3>
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
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Revenue Growth</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">+12.5%</span>
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Expense Growth</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">+8.3%</span>
                  <ArrowUpRight className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Profit Trend</p>
              <div className="flex items-end gap-2 h-32">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-[#94cb3d] rounded-t" style={{ height: `${(data.profit / 150000) * 100}%` }}></div>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Profit & Loss' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Profit & Loss Statement</h3>
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
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Particulars</th>
                  <th className="text-right py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="py-3 text-sm text-zinc-900 dark:text-zinc-50">Revenue</td>
                  <td className="py-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(profitLoss.revenue)}</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-zinc-900 dark:text-zinc-50">Cost of Goods Sold</td>
                  <td className="py-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(profitLoss.costOfGoodsSold)}</td>
                </tr>
                <tr className="bg-zinc-50 dark:bg-zinc-900">
                  <td className="py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Gross Profit</td>
                  <td className="py-3 text-sm font-medium text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(profitLoss.grossProfit)}</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-zinc-900 dark:text-zinc-50">Operating Expenses</td>
                  <td className="py-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(profitLoss.operatingExpenses)}</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="py-3 text-sm font-bold text-zinc-900 dark:text-zinc-50">Net Profit</td>
                  <td className="py-3 text-sm font-bold text-right text-green-600 dark:text-green-400">{formatCurrency(profitLoss.netProfit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Balance Sheet' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Balance Sheet</h3>
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
              <div className="space-y-2">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50">Assets</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Cash</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.assets.cash)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Bank</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.assets.bank)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Inventory</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.assets.inventory)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Accounts Receivable</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.assets.accountsReceivable)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Fixed Assets</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.assets.fixedAssets)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-zinc-200 dark:border-zinc-700 pt-2">
                    <span className="text-zinc-900 dark:text-zinc-50">Total</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.assets.total)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50">Liabilities</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Loans</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.liabilities.loans)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Accounts Payable</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.liabilities.accountsPayable)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">GST Liability</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.liabilities.gstLiability)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Employee Dues</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.liabilities.employeeDues)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-zinc-200 dark:border-zinc-700 pt-2">
                    <span className="text-zinc-900 dark:text-zinc-50">Total</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.liabilities.total)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50">Equity</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Owner Capital</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.equity.ownerCapital)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Retained Earnings</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.equity.retainedEarnings)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-zinc-200 dark:border-zinc-700 pt-2">
                    <span className="text-zinc-900 dark:text-zinc-50">Total</span>
                    <span className="text-zinc-900 dark:text-zinc-50">{formatCurrency(balanceSheet.equity.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Cash Flow' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Cash Flow Statement</h3>
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
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">Cash Inflow</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Sales Income</span>
                    <span className="text-green-600 dark:text-green-400">+{formatCurrency(1200000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Customer Payments</span>
                    <span className="text-green-600 dark:text-green-400">+{formatCurrency(500000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Investments</span>
                    <span className="text-green-600 dark:text-green-400">+{formatCurrency(100000)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">Cash Outflow</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Salary Payments</span>
                    <span className="text-red-600 dark:text-red-400">-{formatCurrency(800000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Rent</span>
                    <span className="text-red-600 dark:text-red-400">-{formatCurrency(200000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Utilities</span>
                    <span className="text-red-600 dark:text-red-400">-{formatCurrency(100000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Vendor Payments</span>
                    <span className="text-red-600 dark:text-red-400">-{formatCurrency(300000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Taxes</span>
                    <span className="text-red-600 dark:text-red-400">-{formatCurrency(100000)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Opening Balance</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(cashFlow.openingBalance)}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">+ Cash Inflow</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(cashFlow.cashInflow)}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">- Cash Outflow</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">{formatCurrency(cashFlow.cashOutflow)}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">= Closing Balance</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(cashFlow.closingBalance)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'GST Reports' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">GST Reports</h3>
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
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">GST Collected</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(gstData.gstCollected)}</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">GST Paid</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(gstData.gstPaid)}</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Net GST Liability</p>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(gstData.netGstLiability)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">GSTR-1 Summary</h4>
                <button className="text-sm text-[#94cb3d] hover:text-[#7ab52f]">View Details</button>
              </div>
              <div className="border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">GSTR-3B Summary</h4>
                <button className="text-sm text-[#94cb3d] hover:text-[#7ab52f]">View Details</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Receivables' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Accounts Receivable</h3>
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
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Customer</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Invoice No</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Due Date</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Amount</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {receivables.map((receivable) => (
                    <tr key={receivable.invoiceNo}>
                      <td className="py-3 px-3 text-sm text-zinc-900 dark:text-zinc-50">{receivable.customer}</td>
                      <td className="py-3 px-3 text-sm text-zinc-600 dark:text-zinc-400">{receivable.invoiceNo}</td>
                      <td className="py-3 px-3 text-sm text-zinc-600 dark:text-zinc-400">{new Date(receivable.dueDate).toLocaleDateString()}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(receivable.amount)}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(receivable.status)}`}>
                          {receivable.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Payables' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Accounts Payable</h3>
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
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Vendor</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Bill No</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Due Date</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Amount</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {payables.map((payable) => (
                    <tr key={payable.billNo}>
                      <td className="py-3 px-3 text-sm text-zinc-900 dark:text-zinc-50">{payable.vendor}</td>
                      <td className="py-3 px-3 text-sm text-zinc-600 dark:text-zinc-400">{payable.billNo}</td>
                      <td className="py-3 px-3 text-sm text-zinc-600 dark:text-zinc-400">{new Date(payable.dueDate).toLocaleDateString()}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-900 dark:text-zinc-50">{formatCurrency(payable.amount)}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payable.status)}`}>
                          {payable.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Budget Analysis' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Budget vs Actual Analysis</h3>
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
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Budget</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Actual</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {budgetAnalysis.map((item) => (
                    <tr key={item.category}>
                      <td className="py-3 px-3 text-sm text-zinc-900 dark:text-zinc-50">{item.category}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-600 dark:text-zinc-400">{formatCurrency(item.budget)}</td>
                      <td className="py-3 px-3 text-sm text-right text-zinc-600 dark:text-zinc-400">{formatCurrency(item.actual)}</td>
                      <td className="py-3 px-3 text-sm text-right">
                        <span className={item.variance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {item.variance >= 0 ? '+' : ''}{formatCurrency(item.variance)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <p className="text-sm text-zinc-900 dark:text-zinc-50">Report Generated</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Accounts Manager - 2 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Download className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">Report Downloaded</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Finance Head - 5 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">Filters Applied</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Accounts Executive - 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
