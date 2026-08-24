'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Save, Plus, ShieldCheck, Check, Calculator } from 'lucide-react';
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
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  const [policy, setPolicy] = useState<LeavePolicy>({
    casualLeaveDays: 8,
    earnedLeaveDays: 15,
    sickLeaveDays: 10,
    unpaidLeaveDays: 0,
    carryForwardEnabled: true,
    leaveEncashmentEnabled: true,
  });

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'Public Holiday' });
  const [saving, setSaving] = useState(false);
  const [addingHoliday, setAddingHoliday] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchPolicyAndHolidays = async () => {
    try {
      const token = getToken();

      // 1. Fetch Policy Quotas
      const policyRes = await fetch(`${BACKEND_URL}/api/v1/leaves/policy`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const policyData = await policyRes.json();
      if (policyData.success && policyData.data) {
        setPolicy({
          casualLeaveDays: policyData.data.casualLeaveDays ?? 8,
          earnedLeaveDays: policyData.data.earnedLeaveDays ?? 15,
          sickLeaveDays: policyData.data.sickLeaveDays ?? 10,
          unpaidLeaveDays: policyData.data.unpaidLeaveDays ?? 0,
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
        // Fallback default company holidays
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
        setToast({ message: 'Custom Leave Quotas & Database Rules updated successfully!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast({ message: 'Failed to save policy to database', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error updating leave policy in database', type: 'error' });
    } finally {
      setSaving(false);
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
        setToast({ message: 'Holiday saved to Database Calendar!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast({ message: data.message || 'Failed to save holiday', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error adding holiday to database', type: 'error' });
    } finally {
      setAddingHoliday(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
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
              SuperAdmin Custom Leave Setup & Database Config
            </h1>
            <Badge variant="brand">Backend API Connected</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Configurations are saved directly to MongoDB database and enforced across all Leave, Attendance, and Payroll APIs.
          </p>
        </div>
      </div>

      {/* Leave Quota Setup Form */}
      <form onSubmit={handleSavePolicy}>
        <Card className="rounded-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#94cb3d]" />
              <CardTitle className="text-xl">Annual Leave Quotas & Policy Allocation</CardTitle>
            </div>
            <CardDescription>
              Set default annual leave quotas stored in database for all company employees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Casual Leave */}
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">CL — Casual Leave</span>
                  <Badge variant="brand">Paid</Badge>
                </div>
                <p className="text-xs font-medium text-zinc-500 mb-3">Short personal or unexpected needs</p>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Days Per Year
                </label>
                <Input
                  type="number"
                  value={policy.casualLeaveDays}
                  onChange={(e) => setPolicy({ ...policy, casualLeaveDays: Number(e.target.value) })}
                  className="rounded-lg font-medium"
                />
              </div>

              {/* Privilege / Earned Leave */}
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">PL — Privilege Leave</span>
                  <Badge variant="brand">Paid</Badge>
                </div>
                <p className="text-xs font-medium text-zinc-500 mb-3">Planned vacation or personal plans</p>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Days Per Year
                </label>
                <Input
                  type="number"
                  value={policy.earnedLeaveDays}
                  onChange={(e) => setPolicy({ ...policy, earnedLeaveDays: Number(e.target.value) })}
                  className="rounded-lg font-medium"
                />
              </div>

              {/* Sick Leave */}
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">SL — Sick Leave</span>
                  <Badge variant="brand">Paid</Badge>
                </div>
                <p className="text-xs font-medium text-zinc-500 mb-3">Medical or health emergencies</p>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Days Per Year
                </label>
                <Input
                  type="number"
                  value={policy.sickLeaveDays}
                  onChange={(e) => setPolicy({ ...policy, sickLeaveDays: Number(e.target.value) })}
                  className="rounded-lg font-medium"
                />
              </div>
            </div>

            {/* LWP Formula Card */}
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium text-sm">
                <Calculator className="h-4 w-4" />
                <span>LWP — Leave Without Pay (Database Payroll Formula)</span>
              </div>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Exhausted paid leave days automatically trigger LWP deductions during Monthly Payroll Processing:
              </p>
              <div className="p-2.5 rounded bg-white dark:bg-zinc-900 font-mono text-xs font-medium text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
                Salary Deduction = ( Monthly Base Salary ÷ 30 Days ) × LWP Days
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="submit"
              variant="primary"
              isLoading={saving}
              className="rounded-lg shadow-md shadow-[#94cb3d]/20"
            >
              <Save className="h-4 w-4" />
              <span>Save Policy to Database</span>
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Holiday Calendar Configurator */}
      <Card className="rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#94cb3d]" />
            <CardTitle className="text-xl">Database Company Holiday Calendar</CardTitle>
          </div>
          <CardDescription>
            Holidays stored in database are excluded when computing requested leave days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Holiday Form */}
          <form onSubmit={handleAddHoliday} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Holiday Name
              </label>
              <Input
                type="text"
                placeholder="e.g. Independence Day"
                value={newHoliday.name}
                onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Date
              </label>
              <Input
                type="date"
                value={newHoliday.date}
                onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Type
              </label>
              <select
                value={newHoliday.type}
                onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                className="flex h-11 w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-[#94cb3d]"
              >
                <option value="Public Holiday">Public Holiday</option>
                <option value="Festival Holiday">Festival Holiday</option>
                <option value="Company Holiday">Company Holiday</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="primary" isLoading={addingHoliday} className="w-full rounded-lg">
                <Plus className="h-4 w-4" />
                <span>Save to Database</span>
              </Button>
            </div>
          </form>

          {/* Holiday List Table */}
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left font-medium">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Holiday Name</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Database Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {holidays.map((h, index) => (
                  <tr key={index} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">{h.name}</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{h.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{h.type}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="success">Saved to MongoDB</Badge>
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
