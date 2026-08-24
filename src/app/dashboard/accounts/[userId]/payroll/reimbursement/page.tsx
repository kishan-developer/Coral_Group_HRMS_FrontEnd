'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  CreditCard,
  Building2,
  X,
  FileCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/auth';

interface Expense {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  type: 'Travel' | 'Medical' | 'Training' | 'Office Supplies' | 'Other';
  description: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processed';
  receiptUrl?: string;
  approvedBy?: string;
  approvedDate?: string;
  remarks?: string;
}

export default function PayrollReimbursementPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', employeeId: 'EMP001', employeeName: 'John Smith', employeeEmail: 'john.smith@coralgroup.com', department: 'Engineering', type: 'Travel', description: 'Client meeting travel expenses - Mumbai to Delhi', amount: 15000, date: '2026-06-15', status: 'Pending' },
    { id: '2', employeeId: 'EMP002', employeeName: 'Sarah Johnson', employeeEmail: 'sarah.johnson@coralgroup.com', department: 'HR & Operations', type: 'Medical', description: 'Medical reimbursement for doctor consultation', amount: 3500, date: '2026-06-10', status: 'Approved', approvedBy: 'HR Manager', approvedDate: '2026-06-12' },
    { id: '3', employeeId: 'EMP003', employeeName: 'Mike Brown', employeeEmail: 'mike.brown@coralgroup.com', department: 'Sales & Growth', type: 'Travel', description: 'Business trip accommodation - Bangalore', amount: 8000, date: '2026-06-08', status: 'Processed', approvedBy: 'Finance Manager', approvedDate: '2026-06-11' },
    { id: '4', employeeId: 'EMP004', employeeName: 'Emily Davis', employeeEmail: 'emily.davis@coralgroup.com', department: 'Engineering', type: 'Training', description: 'AWS Certification training fee', amount: 25000, date: '2026-06-05', status: 'Rejected', approvedBy: 'HR Manager', approvedDate: '2026-06-07', remarks: 'Budget exceeded for this quarter' },
    { id: '5', employeeId: 'EMP005', employeeName: 'David Wilson', employeeEmail: 'david.wilson@coralgroup.com', department: 'Finance & Accounts', type: 'Office Supplies', description: 'Office supplies and equipment', amount: 4500, date: '2026-06-03', status: 'Approved', approvedBy: 'Accounts Manager', approvedDate: '2026-06-06' },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeEmail: '',
    department: '',
    type: 'Travel' as Expense['type'],
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchReimbursements();
  }, [userId]);

  const fetchReimbursements = async () => {
    try {
      const token = getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/v1/payroll/reimbursement`, { headers });
      const data = await response.json();

      if (data.success && data.data && Array.isArray(data.data.items) && data.data.items.length > 0) {
        const live: Expense[] = data.data.items.map((item: any, idx: number) => ({
          id: item._id || `reimb-${idx}`,
          employeeId: item.employeeId?.employeeId || `EMP00${idx + 1}`,
          employeeName: `${item.employeeId?.firstName || 'Staff'} ${item.employeeId?.lastName || ''}`.trim(),
          employeeEmail: item.employeeId?.email || '',
          department: item.employeeId?.departmentId || 'General',
          type: item.expenseType || 'Travel',
          description: item.purpose || 'Expense Claim',
          amount: item.amountClaimed || 5000,
          date: item.submittedOn ? item.submittedOn.split('T')[0] : '2026-06-15',
          status: item.status === 'Paid' ? 'Processed' : 'Pending',
        }));
        setExpenses(live);
      }
    } catch (error) {
      console.error('Error fetching reimbursements from backend API:', error);
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
    showToast('Reimbursement claim submitted!', 'success');
  };

  const handleApprove = (id: string, name: string) => {
    setExpenses(
      expenses.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Approved' as const,
              approvedBy: 'Accounts Manager',
              approvedDate: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );
    showToast(`Approved reimbursement for ${name}`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setExpenses(
      expenses.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Rejected' as const,
              approvedBy: 'Accounts Manager',
              approvedDate: new Date().toISOString().split('T')[0],
              remarks: 'Rejected by Accounts',
            }
          : r
      )
    );
    showToast(`Rejected claim for ${name}`, 'info');
  };

  const handleProcess = (id: string, name: string) => {
    setExpenses(expenses.map((r) => (r.id === id ? { ...r, status: 'Processed' as const } : r)));
    showToast(`Processed payout for ${name}!`, 'success');
  };

  const filteredExpenses = expenses.filter((r) => {
    const matchesDepartment = selectedDepartment === 'All' || r.department.includes(selectedDepartment);
    const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const matchesSearch =
      searchTerm === '' ||
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesStatus && matchesType && matchesSearch;
  });

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
              <CreditCard className="h-5 w-5 text-[#94cb3d]" />
              Employee Reimbursements & Expense Claims
            </h1>
            <Badge variant="brand">{expenses.length} Total Claims</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Audit employee travel, medical, training, and operational expense reimbursement claims.
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" /> Submit Claim Request
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search claim, employee, or description..."
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
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Processed">Processed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Reimbursement Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Employee</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Category</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Description</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Claim Amount</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Filing Date</th>
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
                    <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300">{expense.type}</td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500 max-w-xs truncate">{expense.description}</td>
                    <td className="px-4 py-3.5 text-xs font-bold text-[#94cb3d] font-mono">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500 font-mono">{expense.date}</td>
                    <td className="px-4 py-3.5">
                      <Badge
                        variant={
                          expense.status === 'Approved' || expense.status === 'Processed'
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
                            View Claim Details
                          </span>
                        </div>

                        {expense.status === 'Pending' && (
                          <>
                            <div className="relative group">
                              <button
                                onClick={() => handleApprove(expense.id, expense.employeeName)}
                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#94cb3d] transition-colors"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                                Approve Claim
                              </span>
                            </div>

                            <div className="relative group">
                              <button
                                onClick={() => handleReject(expense.id, expense.employeeName)}
                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-500 transition-colors"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                                Reject Claim
                              </span>
                            </div>
                          </>
                        )}

                        {expense.status === 'Approved' && (
                          <div className="relative group">
                            <button
                              onClick={() => handleProcess(expense.id, expense.employeeName)}
                              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-purple-600 transition-colors"
                            >
                              <Clock className="h-4 w-4" />
                            </button>
                            <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                              Mark Payout Processed
                            </span>
                          </div>
                        )}
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
