'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Wallet,
  FileText,
  CreditCard,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/auth';

export default function AccountsManagerOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 150,
    totalMonthlyPayroll: 24500000,
    pendingSalaryProcessing: 12,
    pendingReimbursements: 8,
    generatedPayslips: 138,
    payrollCostThisMonth: 24500000,
    pfContributions: 2450000,
    esiContributions: 735000,
  });

  useEffect(() => {
    fetchAccountsOverviewData();
  }, [userId]);

  const fetchAccountsOverviewData = async () => {
    try {
      const token = getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/v1/payroll/report`, { headers });
      const data = await response.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setStats((prev) => ({
          ...prev,
          totalEmployees: data.data.length,
          generatedPayslips: data.data.filter((item: any) => item.daysPresent > 0).length,
        }));
      }
    } catch (error) {
      console.error('Error fetching accounts overview stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <Wallet className="h-5 w-5 text-[#94cb3d]" />
              Accounts & Payroll Command Center
            </h1>
            <Badge variant="brand">Finance Operations</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Manage company payroll, salary disbursements, expense claims, tax compliance, and financial reports.
          </p>
        </div>

        <Button
          onClick={() => router.push(`/dashboard/accounts/${userId}/payroll/monthly`)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Wallet className="h-4 w-4 mr-1.5" />
          Process Monthly Payroll
        </Button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500 uppercase">Active Workforce</p>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{stats.totalEmployees}</p>
            <span className="text-[10px] text-zinc-400">Total Enrolled Employees</span>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500 uppercase">Total Monthly Payroll</p>
              <Wallet className="h-4 w-4 text-[#94cb3d]" />
            </div>
            <p className="text-2xl font-bold text-[#94cb3d] mt-1">{formatCurrency(stats.totalMonthlyPayroll)}</p>
            <span className="text-[10px] text-emerald-600 font-bold">Gross Salary Disbursal</span>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500 uppercase">Pending Processing</p>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-500 mt-1">{stats.pendingSalaryProcessing} Shifts</p>
            <span className="text-[10px] text-amber-600 font-bold">Awaiting Accounts Sign-Off</span>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500 uppercase">Reimbursement Claims</p>
              <CreditCard className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-500 mt-1">{stats.pendingReimbursements} Claims</p>
            <span className="text-[10px] text-zinc-400">Pending Finance Review</span>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase">Generated Payslips</p>
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{stats.generatedPayslips}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase">Payroll Cost This Month</p>
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{formatCurrency(stats.payrollCostThisMonth)}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase">PF Statutory Deposit</p>
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{formatCurrency(stats.pfContributions)}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase">ESI Statutory Deposit</p>
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{formatCurrency(stats.esiContributions)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Action Shortcuts using Pure Lucide Icons */}
        <Card className="rounded-xl">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
              Quick Accounts Actions
            </h3>
            <div className="space-y-3">
              <Link
                href={`/dashboard/accounts/${userId}/payroll/monthly`}
                className="flex items-center justify-between p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-[#94cb3d]/10 hover:border-[#94cb3d]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#94cb3d]/15 text-[#94cb3d] flex items-center justify-center">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-[#94cb3d]">
                      Process Payroll
                    </p>
                    <p className="text-[11px] font-medium text-zinc-500">Generate monthly payroll</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#94cb3d] transition-colors" />
              </Link>

              <Link
                href={`/dashboard/accounts/${userId}/payroll/payslips`}
                className="flex items-center justify-between p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/15 text-blue-500 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-500">
                      Bulk Payslips Generator
                    </p>
                    <p className="text-[11px] font-medium text-zinc-500">Create employee payslips</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              </Link>

              <Link
                href={`/dashboard/accounts/${userId}/payroll/reimbursement`}
                className="flex items-center justify-between p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-amber-500/10 hover:border-amber-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-amber-500">
                      Reimbursements Claims
                    </p>
                    <p className="text-[11px] font-medium text-zinc-500">Process claims & payouts</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-amber-500 transition-colors" />
              </Link>

              <Link
                href={`/dashboard/accounts/${userId}/loans`}
                className="flex items-center justify-between p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-500/15 text-purple-500 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-purple-500">
                      Loans & Salary Advances
                    </p>
                    <p className="text-[11px] font-medium text-zinc-500">Manage employee loans</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-purple-500 transition-colors" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Salary Date Card */}
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-4">
              Next Salary Disbursal Date
            </h3>
            <div className="text-center py-6 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
              <Calendar className="h-8 w-8 text-[#94cb3d] mx-auto mb-2" />
              <p className="text-4xl font-extrabold text-[#94cb3d]">31st</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mt-2">August 2026</p>
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold rounded-full">
                Scheduled Automatic Transfer
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Finance Activities */}
        <Card className="rounded-xl">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
              Recent Finance Activity
            </h3>
            <div className="space-y-4 text-xs font-medium">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-50 font-bold">Monthly Payroll calculated</p>
                  <p className="text-[11px] text-zinc-500">Synced with attendance database</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-50 font-bold">138 Payslips Generated</p>
                  <p className="text-[11px] text-zinc-500">Available in employee portals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-50 font-bold">8 Reimbursement Claims Pending</p>
                  <p className="text-[11px] text-zinc-500">Submitted by HR Lead & Managers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-50 font-bold">PF & ESI Statutory Return</p>
                  <p className="text-[11px] text-zinc-500">Compliant with Indian Tax Code</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
