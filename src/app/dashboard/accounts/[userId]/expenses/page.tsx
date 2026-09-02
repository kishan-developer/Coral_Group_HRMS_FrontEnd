'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Wallet,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  X,
  CreditCard,
  Building2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/auth';

interface Expense {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  category: 'Salary' | 'Travel' | 'Training' | 'Office' | 'Equipment' | 'Other';
  description: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  paymentMethod: 'Bank Transfer' | 'Cash' | 'Credit Card' | 'Cheque';
  approvedBy?: string;
  receiptUrl?: string;
}

export default function ExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', employeeId: 'EMP001', employeeName: 'John Smith', department: 'Engineering', category: 'Salary', description: 'June 2026 Salary Disbursal', amount: 107960, date: '2026-06-30', status: 'Approved', paymentMethod: 'Bank Transfer', approvedBy: 'Accounts Manager' },
    { id: '2', employeeId: 'EMP002', employeeName: 'Sarah Johnson', department: 'HR & Operations', category: 'Salary', description: 'June 2026 Salary Disbursal', amount: 87742, date: '2026-06-30', status: 'Approved', paymentMethod: 'Bank Transfer', approvedBy: 'Accounts Manager' },
    { id: '3', employeeId: 'EMP003', employeeName: 'Mike Brown', department: 'Sales & Growth', category: 'Travel', description: 'Client Meeting Travel - Mumbai', amount: 15000, date: '2026-06-25', status: 'Pending', paymentMethod: 'Credit Card' },
    { id: '4', employeeId: 'EMP004', employeeName: 'Emily Davis', department: 'Engineering', category: 'Training', description: 'AWS Certification Training', amount: 25000, date: '2026-06-20', status: 'Approved', paymentMethod: 'Bank Transfer', approvedBy: 'HR Manager' },
    { id: '5', employeeId: 'EMP005', employeeName: 'David Wilson', department: 'Finance & Accounts', category: 'Equipment', description: 'Office Hardware Purchase', amount: 45000, date: '2026-06-15', status: 'Rejected', paymentMethod: 'Cheque', approvedBy: 'Finance Manager' },
    { id: '6', employeeId: 'EMP001', employeeName: 'John Smith', department: 'Engineering', category: 'Office', description: 'Stationery & Consumables', amount: 5000, date: '2026-06-10', status: 'Approved', paymentMethod: 'Cash', approvedBy: 'Office Manager' },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    category: 'Salary' as Expense['category'],
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Bank Transfer' as Expense['paymentMethod'],
  });

  useEffect(() => {
    fetchExpensesFromBackend();
  }, [userId]);

  const fetchExpensesFromBackend = async () => {
    try {
      const token = getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/v1/payroll/reimbursement`, { headers });
      const data = await response.json();

      if (data.success && data.data && Array.isArray(data.data.items) && data.data.items.length > 0) {
        const liveItems: Expense[] = data.data.items.map((item: any, idx: number) => ({
          id: item._id || `exp-${idx}`,
          employeeId: item.employeeId?.employeeId || `EMP00${idx + 1}`,
          employeeName: `${item.employeeId?.firstName || 'Staff'} ${item.employeeId?.lastName || ''}`.trim(),
          department: item.employeeId?.departmentId || 'General',
          category: (item.expenseType as any) || 'Other',
          description: item.purpose || 'Expense Disbursal',
          amount: item.amountClaimed || 12000,
          date: item.submittedOn ? item.submittedOn.split('T')[0] : '2026-06-25',
          status: item.status === 'Paid' ? 'Approved' : 'Pending',
          paymentMethod: 'Bank Transfer',
          approvedBy: 'Accounts Manager',
        }));
        setExpenses((prev) => [...liveItems, ...prev.slice(0, 2)]);
      }
    } catch (error) {
      console.error('Error fetching expenses from backend API:', error);
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

  const handleAdd = () => {
    if (!formData.employeeName || !formData.description || formData.amount === 0) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      ...formData,
      status: 'Pending',
    };

    setExpenses([newExpense, ...expenses]);
    setShowAddForm(false);
    showToast('New expense entry recorded!', 'success');
  };

  const handleDelete = (id: string, name: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    showToast(`Deleted expense entry for ${name}`, 'info');
  };

  const handleApprove = (id: string, name: string) => {
    setExpenses(
      expenses.map((e) => (e.id === id ? { ...e, status: 'Approved', approvedBy: 'Accounts Manager' } : e))
    );
    showToast(`Approved expense payout for ${name}!`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, status: 'Rejected' } : e)));
    showToast(`Rejected expense for ${name}`, 'info');
  };

  const filteredExpenses = expenses.filter((e) => {
    const matchesDepartment = selectedDepartment === 'All' || e.department.includes(selectedDepartment);
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    const matchesSearch =
      searchTerm === '' ||
      e.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesCategory && matchesStatus && matchesSearch;
  });

  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const approvedExpenses = filteredExpenses.filter((e) => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = filteredExpenses.filter((e) => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0);

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
              Corporate Expenses & Payout Audit
            </h1>
            <Badge variant="brand">{expenses.length} Total Records</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Track company expenditure, approve office hardware, salary disbursements, and travel claims.
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" /> Record New Expense
        </Button>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase">Total Expenses</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="p-3 bg-red-500/15 text-red-500 rounded-full">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase">Approved & Paid</p>
              <p className="text-2xl font-bold text-[#94cb3d] mt-1">{formatCurrency(approvedExpenses)}</p>
            </div>
            <div className="p-3 bg-[#94cb3d]/15 text-[#94cb3d] rounded-full">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase">Pending Review</p>
              <p className="text-2xl font-bold text-amber-500 mt-1">{formatCurrency(pendingExpenses)}</p>
            </div>
            <div className="p-3 bg-amber-500/15 text-amber-500 rounded-full">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search expense description or employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-[#94cb3d]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="All">All Categories</option>
            <option value="Salary">Salary</option>
            <option value="Travel">Travel</option>
            <option value="Training">Training</option>
            <option value="Office">Office</option>
            <option value="Equipment">Equipment</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Enhanced Expense Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Employee</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Department</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Category</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Description</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Amount</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Date</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{expense.employeeName}</p>
                      <span className="text-[10px] font-mono text-zinc-500">{expense.employeeId}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300">{expense.department}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant="secondary" className="text-[10px] font-bold uppercase">
                        {expense.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500 max-w-xs truncate">{expense.description}</td>
                    <td className="px-4 py-3.5 text-xs font-bold text-[#94cb3d] font-mono">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500 font-mono">{expense.date}</td>
                    <td className="px-4 py-3.5">
                      <Badge
                        variant={
                          expense.status === 'Approved'
                            ? 'success'
                            : expense.status === 'Rejected'
                            ? 'destructive'
                            : 'brand'
                        }
                        className="text-[10px] uppercase font-bold"
                      >
                        {expense.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Action with Hover Tooltip */}
                        <div className="relative group">
                          <button
                            onClick={() => {
                              setSelectedExpense(expense);
                              setShowViewModal(true);
                            }}
                            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-emerald-600 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                            View Expense Details
                          </span>
                        </div>

                        {expense.status === 'Pending' && (
                          <>
                            {/* Approve Action */}
                            <div className="relative group">
                              <button
                                onClick={() => handleApprove(expense.id, expense.employeeName)}
                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#94cb3d] transition-colors"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                                Approve Payout
                              </span>
                            </div>

                            {/* Reject Action */}
                            <div className="relative group">
                              <button
                                onClick={() => handleReject(expense.id, expense.employeeName)}
                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-500 transition-colors"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                                Reject Expense
                              </span>
                            </div>
                          </>
                        )}

                        {/* Delete Action */}
                        <div className="relative group">
                          <button
                            onClick={() => handleDelete(expense.id, expense.employeeName)}
                            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                            Delete Record
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
