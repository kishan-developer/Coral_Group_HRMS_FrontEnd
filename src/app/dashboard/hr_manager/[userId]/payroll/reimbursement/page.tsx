'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Wallet,
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
  Receipt,
  ArrowUpRight,
  TrendingUp,
  FileText,
  DollarSign,
  AlertCircle,
  Paperclip,
  Check,
  Send,
  UserCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface ReimbursementClaim {
  id: string;
  claimId: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  avatar: string;
  category: 'Travel' | 'Medical' | 'Client Meeting' | 'Training' | 'Office Supplies' | 'Other';
  title: string;
  description: string;
  amount: number; // in INR ₹
  dateSubmitted: string;
  status: 'Pending' | 'Approved' | 'Processed' | 'Rejected';
  receiptUrl?: string;
  receiptName?: string;
  approvedBy?: string;
  approvalDate?: string;
  rejectionReason?: string;
}

export default function HRReimbursementPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Modals
  const [submitClaimModal, setSubmitClaimModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<ReimbursementClaim | null>(null);
  const [rejectModalClaim, setRejectModalClaim] = useState<ReimbursementClaim | null>(null);
  const [rejectionInput, setRejectionInput] = useState('');

  // Submit Claim Form State
  const [newEmpName, setNewEmpName] = useState('Kishan Kumar');
  const [newEmpId, setNewEmpId] = useState('CG-EMP-001');
  const [newDepartment, setNewDepartment] = useState('Engineering');
  const [newCategory, setNewCategory] = useState<ReimbursementClaim['category']>('Travel');
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Sample Claims Dataset
  const [claims, setClaims] = useState<ReimbursementClaim[]>([
    {
      id: 'claim-101',
      claimId: 'EXP-2026-089',
      employeeId: 'CG-EMP-001',
      employeeName: 'Kishan Kumar',
      employeeEmail: 'kishan@coral-group.in',
      department: 'Executive Board',
      avatar: 'KK',
      category: 'Travel',
      title: 'Flight & Hotel for Annual Tech Summit Delhi',
      description: 'Flight tickets (Indigo) + 2 nights stay at Taj Palace Delhi for Keynote presentation.',
      amount: 18500,
      dateSubmitted: '2026-08-25',
      status: 'Pending',
      receiptName: 'air_ticket_hotel_receipt.pdf',
    },
    {
      id: 'claim-102',
      claimId: 'EXP-2026-085',
      employeeId: 'CG-EMP-002',
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah.j@coral-group.in',
      department: 'Human Resources',
      avatar: 'SJ',
      category: 'Medical',
      title: 'Annual Executive Health Checkup Reimbursement',
      description: 'Comprehensive blood panel & executive health screening at Apollo Hospital.',
      amount: 4500,
      dateSubmitted: '2026-08-20',
      status: 'Approved',
      receiptName: 'apollo_medical_bill.pdf',
      approvedBy: 'HR Lead',
      approvalDate: '2026-08-22',
    },
    {
      id: 'claim-103',
      claimId: 'EXP-2026-082',
      employeeId: 'CG-EMP-003',
      employeeName: 'Amit Verma',
      employeeEmail: 'amit.v@coral-group.in',
      department: 'Finance',
      avatar: 'AV',
      category: 'Client Meeting',
      title: 'Auditor Dinner & Transport Expenses',
      description: 'Dinner with external tax auditors at Leela Palace + cab fare.',
      amount: 8200,
      dateSubmitted: '2026-08-18',
      status: 'Processed',
      receiptName: 'restaurant_cab_receipt.pdf',
      approvedBy: 'Accounts Lead',
      approvalDate: '2026-08-19',
    },
    {
      id: 'claim-104',
      claimId: 'EXP-2026-078',
      employeeId: 'CG-EMP-004',
      employeeName: 'Priya Sharma',
      employeeEmail: 'priya.s@coral-group.in',
      department: 'Engineering',
      avatar: 'PS',
      category: 'Training',
      title: 'AWS Certified Solutions Architect Exam Fee',
      description: 'Exam registration fee for AWS Solutions Architect Professional certification.',
      amount: 24000,
      dateSubmitted: '2026-08-15',
      status: 'Approved',
      receiptName: 'aws_exam_invoice.pdf',
      approvedBy: 'Engineering Manager',
      approvalDate: '2026-08-16',
    },
    {
      id: 'claim-105',
      claimId: 'EXP-2026-072',
      employeeId: 'CG-EMP-005',
      employeeName: 'Vikram Malhotra',
      employeeEmail: 'vikram.m@coral-group.in',
      department: 'IT Operations',
      avatar: 'VM',
      category: 'Office Supplies',
      title: 'Mechanical Keyboard & Ergonomic Mouse',
      description: 'Hardware peripheral purchase for workstation setup.',
      amount: 12500,
      dateSubmitted: '2026-08-10',
      status: 'Rejected',
      receiptName: 'amazon_hardware_bill.pdf',
      rejectionReason: 'Exceeds maximum allowable peripheral expense threshold of ₹5,000.',
    },
  ]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleApprove = (claim: ReimbursementClaim) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claim.id
          ? {
              ...c,
              status: 'Approved',
              approvedBy: 'HR Manager',
              approvalDate: new Date().toISOString().split('T')[0],
            }
          : c
      )
    );
    if (selectedClaim?.id === claim.id) {
      setSelectedClaim({
        ...selectedClaim,
        status: 'Approved',
        approvedBy: 'HR Manager',
        approvalDate: new Date().toISOString().split('T')[0],
      });
    }
    showNotification(`Claim ${claim.claimId} approved for ${claim.employeeName}!`, 'success');
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalClaim) return;

    setClaims((prev) =>
      prev.map((c) =>
        c.id === rejectModalClaim.id
          ? {
              ...c,
              status: 'Rejected',
              rejectionReason: rejectionInput || 'Does not meet company policy guidelines.',
            }
          : c
      )
    );
    setRejectModalClaim(null);
    setRejectionInput('');
    showNotification(`Claim ${rejectModalClaim.claimId} has been rejected.`, 'error');
  };

  const handleMarkProcessed = (claim: ReimbursementClaim) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claim.id ? { ...c, status: 'Processed' } : c))
    );
    showNotification(`Claim ${claim.claimId} included in current payroll run!`, 'info');
  };

  const handleSubmitNewClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;

    const newClaim: ReimbursementClaim = {
      id: `claim-${Date.now()}`,
      claimId: `EXP-2026-${Math.floor(100 + Math.random() * 900)}`,
      employeeId: newEmpId,
      employeeName: newEmpName,
      employeeEmail: `${newEmpName.toLowerCase().replace(' ', '.')}@coral-group.in`,
      department: newDepartment,
      avatar: newEmpName
        .split(' ')
        .map((n) => n[0])
        .join(''),
      category: newCategory,
      title: newTitle,
      description: newDescription || newTitle,
      amount: Number(newAmount),
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Pending',
      receiptName: 'attached_expense_receipt.pdf',
    };

    setClaims([newClaim, ...claims]);
    setSubmitClaimModal(false);
    setNewTitle('');
    setNewAmount('');
    setNewDescription('');
    showNotification(`New reimbursement claim ${newClaim.claimId} submitted!`, 'success');
  };

  const filteredClaims = useMemo(() => {
    return claims.filter((c) => {
      const matchesSearch =
        c.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
      const matchesDept = departmentFilter === 'All' || c.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesDept;
    });
  }, [claims, searchTerm, statusFilter, categoryFilter, departmentFilter]);

  // Statistics
  const pendingAmount = claims
    .filter((c) => c.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const approvedAmount = claims
    .filter((c) => c.status === 'Approved' || c.status === 'Processed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingCount = claims.filter((c) => c.status === 'Pending').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl text-white font-medium flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 ${
            toast.type === 'success'
              ? 'bg-[#94cb3d]'
              : toast.type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-600'
          }`}
        >
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm">{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Payroll Reimbursements & Expense Claims
            </h1>
            <Badge variant="brand" className="text-[11px] px-2.5 py-0.5">
              HR Approval Desk
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Review, approve, and disburse employee travel, medical, training, and operational expense reimbursements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => showNotification('Exporting claims report to Excel...', 'info')}
            variant="outline"
            className="rounded-xl text-xs font-semibold"
          >
            <Download className="h-4 w-4 mr-1.5" /> Export Claims
          </Button>

          <Button
            onClick={() => setSubmitClaimModal(true)}
            className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-xl text-xs font-semibold shadow-md shadow-[#94cb3d]/20"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Submit Claim
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Pending Approval</span>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              ₹{pendingAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-amber-500">{pendingCount} Claims</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-zinc-400">Awaiting HR manager signoff</p>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Approved This Month</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              ₹{approvedAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> Ready for payroll inclusion
          </p>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Avg Turnaround Time</span>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">1.8 Days</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-blue-500">Fast approval SLA target met</p>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Quarterly Budget Used</span>
            <div className="p-2 bg-purple-500/10 text-purple-600 rounded-xl">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">68%</span>
            <span className="text-xs text-zinc-400">₹3.4L / ₹5.0L</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#94cb3d] h-full w-[68%]" />
          </div>
        </Card>
      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search claim ID, employee, title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl text-xs font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Processed">Processed in Payroll</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Categories</option>
            <option value="Travel">Travel & Lodging</option>
            <option value="Medical">Medical Checkup</option>
            <option value="Client Meeting">Client Entertainment</option>
            <option value="Training">Training & Certs</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Departments</option>
            <option value="Executive Board">Executive Board</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="IT Operations">IT Operations</option>
          </select>
        </div>
      </div>

      {/* Claims Directory Table */}
      <Card className="rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Reimbursement Claims Directory</h3>
          <span className="text-xs text-zinc-400 font-semibold">Showing {filteredClaims.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Claim ID</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Employee</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Category & Title</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Amount</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Date Submitted</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="px-4 py-3.5 text-xs font-bold font-mono text-zinc-800 dark:text-zinc-200">
                    {claim.claimId}
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#94cb3d] to-[#7ab52f] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {claim.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{claim.employeeName}</p>
                        <p className="text-[10px] text-zinc-400">{claim.department}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 max-w-xs">
                    <Badge variant="secondary" className="text-[9px] mb-1">
                      {claim.category}
                    </Badge>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{claim.title}</p>
                  </td>

                  <td className="px-4 py-3.5 text-xs font-extrabold text-zinc-900 dark:text-zinc-50">
                    ₹{claim.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="px-4 py-3.5 text-xs font-mono text-zinc-500">
                    {claim.dateSubmitted}
                  </td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        claim.status === 'Approved'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : claim.status === 'Processed'
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          : claim.status === 'Pending'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => setSelectedClaim(claim)}
                      className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" /> Details
                    </button>

                    {claim.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(claim)}
                          className="px-2.5 py-1.5 bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="h-3.5 w-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => setRejectModalClaim(claim)}
                          className="px-2.5 py-1.5 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" /> Reject
                        </button>
                      </>
                    )}

                    {claim.status === 'Approved' && (
                      <button
                        onClick={() => handleMarkProcessed(claim)}
                        className="px-2.5 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <CreditCard className="h-3.5 w-3.5" /> Pay in Payroll
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Claim Details Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{selectedClaim.claimId}</h3>
                <p className="text-xs text-zinc-500">Submitted on {selectedClaim.dateSubmitted}</p>
              </div>
              <button onClick={() => setSelectedClaim(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500">Claimant Employee:</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {selectedClaim.employeeName} ({selectedClaim.employeeId})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500">Expense Category:</span>
                <Badge variant="brand" className="text-[10px]">
                  {selectedClaim.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500">Claim Amount:</span>
                <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
                  ₹{selectedClaim.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">Claim Description:</span>
              <p className="text-zinc-600 dark:text-zinc-400 p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl">
                {selectedClaim.description}
              </p>
            </div>

            {selectedClaim.receiptName && (
              <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800/20 text-xs">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-[#94cb3d]" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedClaim.receiptName}</span>
                </div>
                <button
                  onClick={() => showNotification(`Downloading ${selectedClaim.receiptName}...`, 'info')}
                  className="text-[#94cb3d] hover:underline font-bold"
                >
                  Download Receipt
                </button>
              </div>
            )}

            {selectedClaim.rejectionReason && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-600 dark:text-red-400">
                <span className="font-bold block mb-1">Rejection Reason:</span>
                {selectedClaim.rejectionReason}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button size="sm" variant="outline" onClick={() => setSelectedClaim(null)}>
                Close
              </Button>

              {selectedClaim.status === 'Pending' && (
                <Button size="sm" className="bg-[#94cb3d] text-white" onClick={() => handleApprove(selectedClaim)}>
                  Approve Claim
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalClaim && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-red-600">Reject Reimbursement Claim</h3>
              <button onClick={() => setRejectModalClaim(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
              <p className="text-zinc-600 dark:text-zinc-400">
                Are you sure you want to reject claim <strong className="font-mono">{rejectModalClaim.claimId}</strong> for{' '}
                <strong>{rejectModalClaim.employeeName}</strong>?
              </p>

              <div>
                <label className="block font-semibold mb-1">Reason for Rejection *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide reason (e.g. Receipt unreadable, policy limit exceeded...)"
                  value={rejectionInput}
                  onChange={(e) => setRejectionInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setRejectModalClaim(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-red-600 text-white">
                  Reject Claim
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Claim Modal */}
      {submitClaimModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Submit Reimbursement Claim</h3>
              <button onClick={() => setSubmitClaimModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewClaim} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Employee Name</label>
                <Input
                  required
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Expense Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value="Travel">Travel & Lodging</option>
                  <option value="Medical">Medical Reimbursement</option>
                  <option value="Client Meeting">Client Entertainment</option>
                  <option value="Training">Training & Certification</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Other">Other Expenses</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Claim Title *</label>
                <Input
                  required
                  placeholder="e.g. Travel tickets to Mumbai client office"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Amount (₹ INR) *</label>
                <Input
                  required
                  type="number"
                  placeholder="e.g. 5000"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  placeholder="Add itemized breakdown or details..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setSubmitClaimModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Submit Claim
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
