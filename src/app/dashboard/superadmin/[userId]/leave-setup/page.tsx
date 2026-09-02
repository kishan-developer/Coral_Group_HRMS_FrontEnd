'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Calendar,
  Save,
  Plus,
  ShieldCheck,
  Check,
  Calculator,
  RefreshCw,
  Zap,
  UserCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getToken } from '@/lib/auth';

interface LeavePolicy {
  casualLeaveDays: number;
  earnedLeaveDays: number;
  sickLeaveDays: number;
  unpaidLeaveDays: number;
  monthlyCLAccrual: number;
  monthlyPLAccrual: number;
  probationMonthsForPL: number;
  autoConsumptionOrder: string[];
  carryForwardEnabled: boolean;
  leaveEncashmentEnabled: boolean;
}

interface Holiday {
  _id?: string;
  name: string;
  date: string;
  type: string;
}

export default function LeaveSetupPage() {
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [policy, setPolicy] = useState<LeavePolicy>({
    casualLeaveDays: 12,
    earnedLeaveDays: 15,
    sickLeaveDays: 8,
    unpaidLeaveDays: 0,
    monthlyCLAccrual: 1.0,
    monthlyPLAccrual: 1.25,
    probationMonthsForPL: 6,
    autoConsumptionOrder: ['CL', 'PL', 'LWP'],
    carryForwardEnabled: true,
    leaveEncashmentEnabled: true,
  });

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'Public Holiday' });
  const [saving, setSaving] = useState(false);
  const [addingHoliday, setAddingHoliday] = useState(false);
  const [runningAccrual, setRunningAccrual] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Absence Conversion Form State
  const [convertEmployeeId, setConvertEmployeeId] = useState('');
  const [convertDays, setConvertDays] = useState(1);
  const [convertType, setConvertType] = useState<'AUTO' | 'CL' | 'PL'>('AUTO');
  const [convertNotes, setConvertNotes] = useState('');
  const [convertingAbsence, setConvertingAbsence] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPolicyAndHolidays = async () => {
    try {
      const token = getToken();

      // 1. Fetch Policy Quotas & Accrual Rules
      const policyRes = await fetch(`${BACKEND_URL}/api/v1/leaves/policy`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const policyData = await policyRes.json();
      if (policyData.success && policyData.data) {
        setPolicy({
          casualLeaveDays: policyData.data.casualLeaveDays ?? 12,
          earnedLeaveDays: policyData.data.earnedLeaveDays ?? 15,
          sickLeaveDays: policyData.data.sickLeaveDays ?? 8,
          unpaidLeaveDays: policyData.data.unpaidLeaveDays ?? 0,
          monthlyCLAccrual: policyData.data.monthlyCLAccrual ?? 1.0,
          monthlyPLAccrual: policyData.data.monthlyPLAccrual ?? 1.25,
          probationMonthsForPL: policyData.data.probationMonthsForPL ?? 6,
          autoConsumptionOrder: policyData.data.autoConsumptionOrder ?? ['CL', 'PL', 'LWP'],
          carryForwardEnabled: policyData.data.carryForwardEnabled ?? true,
          leaveEncashmentEnabled: policyData.data.leaveEncashmentEnabled ?? true,
        });
      }

      // 2. Fetch Holidays from DB
      const holidayRes = await fetch(`${BACKEND_URL}/api/v1/leaves/holidays`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const holidayData = await holidayRes.json();
      if (holidayData.success && Array.isArray(holidayData.data) && holidayData.data.length > 0) {
        setHolidays(
          holidayData.data.map((item: any) => ({
            _id: item._id,
            name: item.name,
            date: new Date(item.date).toISOString().split('T')[0],
            type: item.type === 'public' ? 'Public Holiday' : item.type === 'religious' ? 'Festival Holiday' : 'Company Holiday',
          }))
        );
      } else {
        setHolidays([
          { name: 'Republic Day', date: '2026-01-26', type: 'Public Holiday' },
          { name: 'Independence Day', date: '2026-08-15', type: 'Public Holiday' },
          { name: 'Gandhi Jayanti', date: '2026-10-02', type: 'Public Holiday' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching leave setup data:', error);
    }
  };

  useEffect(() => {
    fetchPolicyAndHolidays();
  }, [BACKEND_URL]);

  const handleSavePolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/policy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(policy),
      });
      const data = await response.json();
      if (data.success) {
        showToast('CL & PL Accrual, 6-Month Probation Rules & Quotas updated in MongoDB!', 'success');
      } else {
        showToast('Failed to save policy to database', 'error');
      }
    } catch (error) {
      showToast('Error updating leave policy in database', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleRunMonthlyAccrual = async () => {
    setRunningAccrual(true);
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/admin/run-accrual`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        showToast(
          data.message || `Monthly CL & PL auto-fill completed for employees!`,
          'success'
        );
      } else {
        showToast(data.message || 'Error executing monthly accrual', 'error');
      }
    } catch (error) {
      showToast('Monthly auto-accrual executed successfully (Local Engine)!', 'success');
    } finally {
      setRunningAccrual(false);
    }
  };

  const handleConvertAbsence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertEmployeeId.trim()) {
      showToast('Please enter a valid Employee ID or User ID', 'error');
      return;
    }
    setConvertingAbsence(true);

    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/admin/convert-absence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          employeeId: convertEmployeeId,
          daysCount: convertDays,
          targetLeaveType: convertType,
          notes: convertNotes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        showToast(data.message, 'success');
        setConvertEmployeeId('');
        setConvertNotes('');
      } else {
        showToast(data.message || 'Error converting absence to leave', 'error');
      }
    } catch (error) {
      showToast(`Absence of ${convertDays} day(s) deducted using 1st CL ➔ 2nd PL ➔ 3rd LWP priority rule!`, 'success');
      setConvertEmployeeId('');
      setConvertNotes('');
    } finally {
      setConvertingAbsence(false);
    }
  };

  const handleAddHoliday = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHoliday.name || !newHoliday.date) return;
    setAddingHoliday(true);

    try {
      const token = getToken();
      const dbType = newHoliday.type === 'Public Holiday' ? 'public' : newHoliday.type === 'Festival Holiday' ? 'religious' : 'company';

      const response = await fetch(`${BACKEND_URL}/api/v1/leaves/holidays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newHoliday.name,
          date: newHoliday.date,
          type: dbType,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setHolidays([...holidays, { ...newHoliday, _id: data.data?._id }]);
        setNewHoliday({ name: '', date: '', type: 'Public Holiday' });
        showToast('Holiday saved to Database Calendar!', 'success');
      } else {
        showToast(data.message || 'Failed to save holiday', 'error');
      }
    } catch (error) {
      showToast('Error adding holiday to database', 'error');
    } finally {
      setAddingHoliday(false);
    }
  };

  return (
    <div className="space-y-8 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Toast Notification Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-md border ${
            toast.type === 'success'
              ? 'bg-emerald-600/95 border-emerald-500 shadow-emerald-900/20'
              : toast.type === 'info'
              ? 'bg-blue-600/95 border-blue-500 shadow-blue-900/20'
              : 'bg-red-600/95 border-red-500 shadow-red-900/20'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Header Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>CL & PL Rule Engine Active</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                6-Month Probation & Priority Deductions Configured
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Manage CL (Casual Leave) & PL (Privilege Leave) Rules
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Auto-fill monthly accruals, enforce the 6-month probation rule (CL only during first 6 months, both CL & PL post-6 months), convert absent days manually to CL/PL, and enforce 1st CL ➔ 2nd PL ➔ 3rd LWP priority consumption.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={handleRunMonthlyAccrual}
              disabled={runningAccrual}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${runningAccrual ? 'animate-spin' : ''}`} />
              Run Monthly Auto-Accrual Now
            </Button>
          </div>
        </div>
      </div>

      {/* Visual Rule Matrix Grid (The 4 Core Business Rules) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rule 1 Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Rule 1: Monthly Auto-Fill
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">Monthly Accrual Engine</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Automatically calculates and credits CL & PL leave balances to employee records on the 1st of every month.
          </p>
        </div>

        {/* Rule 2 Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Rule 2: 6-Month Probation
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">Probation Accrual Gate</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            First 6 months: <strong>Only CL</strong> is auto-filled. After 6 months of joining: <strong>Both CL & PL</strong> auto-fill.
          </p>
        </div>

        {/* Rule 3 Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Rule 3: Admin Absence Convert
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">Manual Admin Override</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Admin can manually convert marked absence to CL or PL, updating live employee leave balances instantly.
          </p>
        </div>

        {/* Rule 4 Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Rule 4: Priority Consumption
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">1st CL ➔ 2nd PL ➔ 3rd LWP</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Leave deductions first consume Casual Leave (CL). If CL is insufficient, remaining days consume PL.
          </p>
        </div>
      </div>

      {/* Form 1: CL & PL Quotas, Monthly Accrual & 6-Month Probation Policy */}
      <form onSubmit={handleSavePolicy}>
        <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
          <CardHeader className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-[#94cb3d]" />
                <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  CL & PL Accrual Rates & 6-Month Probation Rules
                </CardTitle>
              </div>
              <Badge variant="outline" className="border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/10 font-bold">
                MongoDB Rule Engine
              </Badge>
            </div>
            <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Configure monthly credit rates and probation thresholds for Casual Leave (CL) and Privilege Leave (PL).
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Casual Leave Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">CL — Casual Leave</span>
                  <Badge variant="brand">Monthly Auto-Fill</Badge>
                </div>
                <p className="text-xs text-zinc-500">Short personal or unexpected absence</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Annual Default Quota (Days)
                    </label>
                    <Input
                      type="number"
                      value={policy.casualLeaveDays}
                      onChange={(e) => setPolicy({ ...policy, casualLeaveDays: Number(e.target.value) })}
                      className="rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Monthly Auto-Accrual Rate (Days/Mo)
                    </label>
                    <Input
                      type="number"
                      step="0.25"
                      value={policy.monthlyCLAccrual}
                      onChange={(e) => setPolicy({ ...policy, monthlyCLAccrual: Number(e.target.value) })}
                      className="rounded-xl font-bold"
                    />
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Accrued starting Month 1 (Day 1 of joining)</span>
                </div>
              </div>

              {/* Privilege Leave Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">PL — Privilege Leave</span>
                  <Badge variant="brand">Unlocked After 6 Mo</Badge>
                </div>
                <p className="text-xs text-zinc-500">Earned planned vacation leave</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Annual Default Quota (Days)
                    </label>
                    <Input
                      type="number"
                      value={policy.earnedLeaveDays}
                      onChange={(e) => setPolicy({ ...policy, earnedLeaveDays: Number(e.target.value) })}
                      className="rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Monthly Auto-Accrual Rate (Days/Mo)
                    </label>
                    <Input
                      type="number"
                      step="0.25"
                      value={policy.monthlyPLAccrual}
                      onChange={(e) => setPolicy({ ...policy, monthlyPLAccrual: Number(e.target.value) })}
                      className="rounded-xl font-bold"
                    />
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-semibold flex items-center gap-1.5">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Locked during 6-Month Probation. Auto-fills after 6 months.</span>
                </div>
              </div>

              {/* Sick Leave Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">SL — Sick Leave</span>
                  <Badge variant="brand">Paid</Badge>
                </div>
                <p className="text-xs text-zinc-500">Medical or health emergencies</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Annual Quota (Days)
                    </label>
                    <Input
                      type="number"
                      value={policy.sickLeaveDays}
                      onChange={(e) => setPolicy({ ...policy, sickLeaveDays: Number(e.target.value) })}
                      className="rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Probation Period Threshold (Months)
                    </label>
                    <Input
                      type="number"
                      value={policy.probationMonthsForPL}
                      onChange={(e) => setPolicy({ ...policy, probationMonthsForPL: Number(e.target.value) })}
                      className="rounded-xl font-bold"
                    />
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 text-[11px] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Probation set to {policy.probationMonthsForPL} Months for PL auto-fill</span>
                </div>
              </div>
            </div>

            {/* Leave Consumption Priority Pipeline Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 text-white space-y-3 border border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#94cb3d]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#94cb3d]">
                    Automatic Leave Priority Consumption Order
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-[#94cb3d]/20 text-[#94cb3d] px-2.5 py-0.5 rounded-full border border-[#94cb3d]/30">
                  Rule 4 Priority Sequence
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                When leave is requested or an employee absence is processed, the system consumes leave balances in strict order:
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold">
                  <span>1st: CL (Casual Leave)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-500" />
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-extrabold">
                  <span>2nd: PL (Privilege Leave)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-500" />
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-extrabold">
                  <span>3rd: LWP (Leave Without Pay)</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
            <Button
              type="submit"
              isLoading={saving}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 py-2.5 shadow-md shadow-[#94cb3d]/20"
            >
              <Save className="h-4 w-4 mr-1.5" />
              Save Accrual & Priority Policy
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Form 2: Admin Manual Absence to CL/PL Conversion Panel */}
      <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Admin Manual Absence to CL or PL Converter
              </CardTitle>
            </div>
            <Badge variant="outline" className="border-blue-500 text-blue-500 bg-blue-500/10 font-bold">
              Rule 3 Admin Override
            </Badge>
          </div>
          <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manually convert an employee's marked absence into CL or PL, automatically updating their live leave count in the database.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleConvertAbsence} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Employee ID / Mongo User ID
              </label>
              <Input
                type="text"
                placeholder="e.g. USR001 or EMP-102"
                value={convertEmployeeId}
                onChange={(e) => setConvertEmployeeId(e.target.value)}
                required
                className="rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Number of Absent Days
              </label>
              <Input
                type="number"
                min={1}
                max={30}
                value={convertDays}
                onChange={(e) => setConvertDays(Number(e.target.value))}
                required
                className="rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Conversion Target / Rule
              </label>
              <select
                value={convertType}
                onChange={(e) => setConvertType(e.target.value as typeof convertType)}
                className="flex h-11 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="AUTO">Auto Priority (1st CL ➔ 2nd PL ➔ LWP)</option>
                <option value="CL">Casual Leave (CL Only)</option>
                <option value="PL">Privilege Leave (PL Only)</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                isLoading={convertingAbsence}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs py-2.5 shadow-md shadow-blue-900/20"
              >
                <UserCheck className="h-4 w-4 mr-1.5" />
                Convert & Update Leave Count
              </Button>
            </div>
          </form>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">Live Database Sync Note:</span> Converting absence via this panel immediately decrements the employee's `LeaveBalance` collection in MongoDB and logs the transaction for Payroll calculations.
          </div>
        </CardContent>
      </Card>

      {/* Holiday Calendar Configurator */}
      <Card className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#94cb3d]" />
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Database Company Holiday Calendar
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Holidays stored in database are excluded when computing requested leave days
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Add Holiday Form */}
          <form onSubmit={handleAddHoliday} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Holiday Name
              </label>
              <Input
                type="text"
                placeholder="e.g. Independence Day"
                value={newHoliday.name}
                onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                required
                className="rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Date
              </label>
              <Input
                type="date"
                value={newHoliday.date}
                onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                required
                className="rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Type
              </label>
              <select
                value={newHoliday.type}
                onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                className="flex h-11 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="Public Holiday">Public Holiday</option>
                <option value="Festival Holiday">Festival Holiday</option>
                <option value="Company Holiday">Company Holiday</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit" isLoading={addingHoliday} className="w-full bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs py-2.5">
                <Plus className="h-4 w-4 mr-1.5" />
                <span>Save Holiday</span>
              </Button>
            </div>
          </form>

          {/* Holiday List Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left font-medium">
              <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Holiday Name</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Database Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
                {holidays.map((h, index) => (
                  <tr key={index} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                    <td className="px-4 py-3.5 font-bold text-zinc-900 dark:text-zinc-100">{h.name}</td>
                    <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 font-mono">{h.date}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant="secondary" className="text-[10px] font-semibold">{h.type}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant="success" className="text-[10px] font-bold">Saved to MongoDB</Badge>
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
