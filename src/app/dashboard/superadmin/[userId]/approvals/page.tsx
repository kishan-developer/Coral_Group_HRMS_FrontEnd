'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  Package,
  Check,
  X,
  Filter,
  ShieldCheck,
  Search,
  UserCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getToken } from '@/lib/auth';

export type ApprovalCategory = 'all' | 'leave' | 'attendance' | 'overtime' | 'expense' | 'loan' | 'asset' | 'document';

export interface ApprovalItem {
  id: string;
  category: ApprovalCategory;
  categoryLabel: string;
  employeeName: string;
  employeeId: string;
  department: string;
  requestTitle: string;
  details: string;
  amountOrDays?: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  avatarEmoji?: string;
}

export default function UnifiedApprovalsPage() {
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  const [activeCategory, setActiveCategory] = useState<ApprovalCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: 'app-101',
      category: 'leave',
      categoryLabel: 'Casual Leave (CL)',
      employeeName: 'Rahul Sharma',
      employeeId: 'EMP-1002',
      department: 'Engineering',
      requestTitle: 'Casual Leave Request',
      details: '2 Days (25 Aug - 26 Aug) for personal work',
      amountOrDays: '2 Days CL',
      requestDate: '2026-08-22',
      status: 'Pending',
      avatarEmoji: '👨‍💼',
    },
    {
      id: 'app-102',
      category: 'expense',
      categoryLabel: 'Travel Expense Claim',
      employeeName: 'Priya Patel',
      employeeId: 'EMP-1005',
      department: 'Sales & Marketing',
      requestTitle: 'Client Visit Fuel & Hotel Reimbursement',
      details: 'Mumbai Sales Pitch travel receipts uploaded',
      amountOrDays: '₹8,500',
      requestDate: '2026-08-21',
      status: 'Pending',
      avatarEmoji: '👩‍💼',
    },
    {
      id: 'app-103',
      category: 'attendance',
      categoryLabel: 'Attendance Regularization',
      employeeName: 'Amit Verma',
      employeeId: 'EMP-1009',
      department: 'Operations',
      requestTitle: 'Missed Check-In Correction',
      details: 'Biometric server timeout on 20 Aug at 09:15 AM',
      amountOrDays: '09:15 AM Punch',
      requestDate: '2026-08-20',
      status: 'Pending',
      avatarEmoji: '🧑‍💻',
    },
    {
      id: 'app-104',
      category: 'loan',
      categoryLabel: 'Salary Advance',
      employeeName: 'Sneha Reddy',
      employeeId: 'EMP-1012',
      department: 'Human Resources',
      requestTitle: 'Emergency Medical Advance',
      details: 'Medical emergency advance with 2-month payroll EMI deduction',
      amountOrDays: '₹25,000',
      requestDate: '2026-08-19',
      status: 'Pending',
      avatarEmoji: '👩‍🔬',
    },
    {
      id: 'app-105',
      category: 'asset',
      categoryLabel: 'Hardware Allocation',
      employeeName: 'Vikram Malhotra',
      employeeId: 'EMP-1018',
      department: 'IT Infrastructure',
      requestTitle: 'MacBook Pro M3 Hardware Request',
      details: 'Development machine upgrade for Senior Lead',
      amountOrDays: 'MacBook Pro M3',
      requestDate: '2026-08-18',
      status: 'Pending',
      avatarEmoji: '👨‍💻',
    },
    {
      id: 'app-106',
      category: 'overtime',
      categoryLabel: 'Weekend Overtime',
      employeeName: 'Kavita Singh',
      employeeId: 'EMP-1022',
      department: 'Support & Success',
      requestTitle: 'Weekend Migration Deployment OT',
      details: '6 Hours Overtime on Sunday server deployment',
      amountOrDays: '6 Hrs OT',
      requestDate: '2026-08-17',
      status: 'Approved',
      avatarEmoji: '👩‍🎨',
    },
  ]);

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setToast({
      message: `Request ${newStatus === 'Approved' ? 'Approved' : 'Rejected'} successfully!`,
      type: newStatus === 'Approved' ? 'success' : 'error',
    });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredApprovals = approvals.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch =
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const categoryCounts = {
    all: approvals.length,
    leave: approvals.filter((a) => a.category === 'leave').length,
    attendance: approvals.filter((a) => a.category === 'attendance').length,
    overtime: approvals.filter((a) => a.category === 'overtime').length,
    expense: approvals.filter((a) => a.category === 'expense').length,
    loan: approvals.filter((a) => a.category === 'loan').length,
    asset: approvals.filter((a) => a.category === 'asset').length,
    document: approvals.filter((a) => a.category === 'document').length,
  };

  const pendingCount = approvals.filter((a) => a.status === 'Pending').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
            }`}
        >
          <Check className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Unified HR Approvals Command Center
            </h1>
            <Badge variant="brand">{pendingCount} Action Required</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Single centralized inbox for Leaves, Attendance Regularization, Overtime, Expenses, Loans, Assets, and Documents.
          </p>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Approvals', count: categoryCounts.all, icon: ClipboardCheck },
          { id: 'leave', label: 'Leaves', count: categoryCounts.leave, icon: Calendar },
          { id: 'attendance', label: 'Regularization', count: categoryCounts.attendance, icon: Clock },
          { id: 'overtime', label: 'Overtime', count: categoryCounts.overtime, icon: UserCheck },
          { id: 'expense', label: 'Expenses', count: categoryCounts.expense, icon: DollarSign },
          { id: 'loan', label: 'Loans & Advances', count: categoryCounts.loan, icon: FileText },
          { id: 'asset', label: 'Assets', count: categoryCounts.asset, icon: Package },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as ApprovalCategory)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${isActive
                ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search employee, request, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="h-4 w-4 text-zinc-400" />
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === st
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Approvals Table / Grid */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {filteredApprovals.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardCheck className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No approval requests found in this category</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Employee</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Category</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Request Details</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Value / Duration</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Request Date</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredApprovals.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 font-bold text-xs text-[#94cb3d] flex items-center justify-center shrink-0">
                            {item.employeeName[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {item.employeeName}
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              {item.employeeId} • {item.department}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {item.categoryLabel}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.requestTitle}
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                          {item.details}
                        </p>
                      </td>

                      <td className="px-4 py-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.amountOrDays || '—'}
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-500">
                        {item.requestDate}
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            item.status === 'Approved'
                              ? 'success'
                              : item.status === 'Rejected'
                                ? 'destructive'
                                : 'brand'
                          }
                          className="text-[10px]"
                        >
                          {item.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        {item.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleAction(item.id, 'Approved')}
                              className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 flex items-center justify-center transition-all"
                              title="Approve Request"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleAction(item.id, 'Rejected')}
                              className="h-8 w-8 rounded-full bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-500/20 flex items-center justify-center transition-all"
                              title="Reject Request"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400 font-medium">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
