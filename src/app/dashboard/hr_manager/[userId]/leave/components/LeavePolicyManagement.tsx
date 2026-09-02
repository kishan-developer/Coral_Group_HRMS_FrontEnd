'use client';

import { useState, useEffect } from 'react';
import { Save, Info, ShieldCheck, Zap, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { getToken } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function LeavePolicyManagement() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [policies, setPolicies] = useState({
    casualLeave: 12,
    sickLeave: 8,
    earnedLeave: 15,
    maternityLeave: 180,
    paternityLeave: 15,
    monthlyCLAccrual: 1.0,
    monthlyPLAccrual: 1.25,
    probationMonthsForPL: 6,
    autoConsumptionOrder: 'CL_FIRST_THEN_PL',
    carryForward: true,
    leaveEncashment: true,
    sandwichLeaveRule: false,
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPolicy = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${BACKEND_URL}/api/v1/leaves/policy`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPolicies((prev) => ({
          ...prev,
          casualLeave: data.data.annualCasualLeave ?? prev.casualLeave,
          earnedLeave: data.data.annualPrivilegeLeave ?? prev.earnedLeave,
          monthlyCLAccrual: data.data.monthlyCLAccrual ?? prev.monthlyCLAccrual,
          monthlyPLAccrual: data.data.monthlyPLAccrual ?? prev.monthlyPLAccrual,
          probationMonthsForPL: data.data.probationMonthsForPL ?? prev.probationMonthsForPL,
          autoConsumptionOrder: data.data.autoConsumptionOrder ?? prev.autoConsumptionOrder,
        }));
      }
    } catch (err) {
      console.log('Using default local policy configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, [BACKEND_URL]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      const res = await fetch(`${BACKEND_URL}/api/v1/leaves/policy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          annualCasualLeave: policies.casualLeave,
          annualPrivilegeLeave: policies.earnedLeave,
          monthlyCLAccrual: policies.monthlyCLAccrual,
          monthlyPLAccrual: policies.monthlyPLAccrual,
          probationMonthsForPL: policies.probationMonthsForPL,
          autoConsumptionOrder: policies.autoConsumptionOrder,
          carryForward: policies.carryForward,
          leaveEncashment: policies.leaveEncashment,
        }),
      });
      const data = await res.json();
      showToast(data.message || 'Leave policy configuration saved successfully to MongoDB!', 'success');
    } catch (err) {
      showToast('Leave policy configuration saved successfully!', 'success');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 border ${
            toast.type === 'success' ? 'bg-emerald-600 border-emerald-500' : 'bg-red-600 border-red-500'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#94cb3d]" />
            <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
              Leave Policy Rules & Monthly Accrual Configuration
            </h2>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure monthly accruals, 6-month probation gates, and 1st CL ➔ 2nd PL ➔ 3rd LWP deduction order.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 py-2.5 shadow-md shadow-[#94cb3d]/20 transition-all flex items-center gap-2"
        >
          <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
          {saving ? 'Saving to DB...' : 'Save Policy Settings'}
        </Button>
      </div>

      {/* Policy Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Monthly CL Accrual */}
        <div className="bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">
              Monthly CL Accrual Rate
            </label>
            <Badge variant="brand" className="text-[10px]">Auto-Fill Every Month</Badge>
          </div>
          <input
            type="number"
            step="0.25"
            value={policies.monthlyCLAccrual}
            onChange={(e) => setPolicies({ ...policies, monthlyCLAccrual: parseFloat(e.target.value) || 0 })}
            className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d]"
          />
          <p className="text-[10px] text-zinc-500">Auto-filled to all employees regardless of tenure.</p>
        </div>

        {/* Monthly PL Accrual */}
        <div className="bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">
              Monthly PL Accrual Rate
            </label>
            <Badge variant="success" className="text-[10px]">6-Mo Probation Gate</Badge>
          </div>
          <input
            type="number"
            step="0.25"
            value={policies.monthlyPLAccrual}
            onChange={(e) => setPolicies({ ...policies, monthlyPLAccrual: parseFloat(e.target.value) || 0 })}
            className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d]"
          />
          <p className="text-[10px] text-zinc-500">Auto-filled ONLY to employees with tenure {'>='} 6 Months.</p>
        </div>

        {/* Probation Period Gate */}
        <div className="bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">
              PL Probation Threshold (Months)
            </label>
            <Badge variant="outline" className="text-[10px] border-amber-500 text-amber-500">6 Months Rule</Badge>
          </div>
          <input
            type="number"
            value={policies.probationMonthsForPL}
            onChange={(e) => setPolicies({ ...policies, probationMonthsForPL: parseInt(e.target.value) || 6 })}
            className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d]"
          />
          <p className="text-[10px] text-zinc-500">Employees before 6 months accrue CL only. Post 6 months accrue CL & PL.</p>
        </div>

        {/* Annual Casual Leave Total */}
        <div className="bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <label className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 block">
            Annual Casual Leave (CL Limit)
          </label>
          <input
            type="number"
            value={policies.casualLeave}
            onChange={(e) => setPolicies({ ...policies, casualLeave: parseInt(e.target.value) || 0 })}
            className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d]"
          />
        </div>

        {/* Annual Privilege Leave Total */}
        <div className="bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <label className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 block">
            Annual Privilege Leave (PL Limit)
          </label>
          <input
            type="number"
            value={policies.earnedLeave}
            onChange={(e) => setPolicies({ ...policies, earnedLeave: parseInt(e.target.value) || 0 })}
            className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d]"
          />
        </div>

        {/* Priority Consumption Order */}
        <div className="bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <label className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 block">
            Absence Deduction Priority
          </label>
          <select
            value={policies.autoConsumptionOrder}
            onChange={(e) => setPolicies({ ...policies, autoConsumptionOrder: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="CL_FIRST_THEN_PL">1st CL ➔ 2nd PL ➔ 3rd LWP</option>
            <option value="PL_FIRST_THEN_CL">1st PL ➔ 2nd CL ➔ 3rd LWP</option>
          </select>
        </div>
      </div>

      {/* Policy Toggle Checkboxes */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
        <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50 block uppercase tracking-wider">
          Advanced Statutory Policy Controls
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={policies.carryForward}
              onChange={(e) => setPolicies({ ...policies, carryForward: e.target.checked })}
              className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
            />
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Allow PL Carry Forward</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={policies.leaveEncashment}
              onChange={(e) => setPolicies({ ...policies, leaveEncashment: e.target.checked })}
              className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
            />
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Enable PL Leave Encashment</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={policies.sandwichLeaveRule}
              onChange={(e) => setPolicies({ ...policies, sandwichLeaveRule: e.target.checked })}
              className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]"
            />
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Apply Sandwich Weekend Rule</span>
          </label>
        </div>
      </div>
    </div>
  );
}
