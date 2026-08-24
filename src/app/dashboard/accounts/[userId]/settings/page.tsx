'use client';

import { useState } from 'react';
import {
  Settings,
  Wallet,
  Building2,
  ShieldCheck,
  FileText,
  Save,
  CheckCircle2,
  ClipboardList,
  Palette,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<'payroll' | 'bank' | 'pf' | 'esi' | 'tax' | 'template'>('payroll');
  const [toast, setToast] = useState<{ message: string } | null>(null);

  const [payrollSettings, setPayrollSettings] = useState({
    cycle: 'Monthly',
    paymentDay: '25',
    cutoffDay: '20',
    calculationMethod: 'Actual Days',
  });

  const [bankSettings, setBankSettings] = useState({
    accountNumber: '91823901239102',
    ifscCode: 'CORL0001092',
    bankName: 'HDFC Bank Ltd',
  });

  const [pfSettings, setPfSettings] = useState({
    employerContribution: '12',
    employeeContribution: '12',
    pfNumber: 'MH/BAN/0019283/000/0129381',
  });

  const [esiSettings, setEsiSettings] = useState({
    employerContribution: '3.25',
    employeeContribution: '0.75',
    esiNumber: '31000918239102931',
  });

  const [taxSettings, setTaxSettings] = useState({
    tdsRate: '10',
    professionalTax: '200',
  });

  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast('Accounts & Finance settings saved successfully!');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 bg-[#94cb3d]">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#94cb3d]" />
              Accounts & Finance Settings
            </h1>
            <Badge variant="brand">Statutory Configurations</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Configure payroll cycles, company bank details, PF & ESI rates, TDS tax slabs, and PDF payslip templates.
          </p>
        </div>

        <Button onClick={handleSave} className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium">
          <Save className="h-4 w-4 mr-1.5" /> Save Configurations
        </Button>
      </div>

      {/* Tab Navigation */}
      <Card className="rounded-xl">
        <div className="border-b border-zinc-200/80 dark:border-zinc-800 px-6">
          <nav className="flex space-x-4 overflow-x-auto scrollbar-none">
            {[
              { id: 'payroll', label: 'Payroll Cycle', icon: Wallet },
              { id: 'bank', label: 'Bank Account', icon: Building2 },
              { id: 'pf', label: 'PF Settings', icon: ShieldCheck },
              { id: 'esi', label: 'ESI Settings', icon: ShieldCheck },
              { id: 'tax', label: 'Tax Rules', icon: FileText },
              { id: 'template', label: 'Payslip Template', icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-[#94cb3d] text-[#94cb3d]'
                      : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <CardContent className="p-6">
          {activeTab === 'payroll' && (
            <div className="max-w-xl space-y-4 text-xs">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Payroll Cycle Settings</h3>
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Payroll Cycle Frequency</label>
                <select
                  value={payrollSettings.cycle}
                  onChange={(e) => setPayrollSettings({ ...payrollSettings, cycle: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Salary Payment Day</label>
                <input
                  type="number"
                  value={payrollSettings.paymentDay}
                  onChange={(e) => setPayrollSettings({ ...payrollSettings, paymentDay: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Attendance Cutoff Day</label>
                <input
                  type="number"
                  value={payrollSettings.cutoffDay}
                  onChange={(e) => setPayrollSettings({ ...payrollSettings, cutoffDay: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                />
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="max-w-xl space-y-4 text-xs">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Disbursal Bank Account Details</h3>
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Corporate Account Number</label>
                <input
                  type="text"
                  value={bankSettings.accountNumber}
                  onChange={(e) => setBankSettings({ ...bankSettings, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Bank IFSC Code</label>
                <input
                  type="text"
                  value={bankSettings.ifscCode}
                  onChange={(e) => setBankSettings({ ...bankSettings, ifscCode: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Bank Name & Branch</label>
                <input
                  type="text"
                  value={bankSettings.bankName}
                  onChange={(e) => setBankSettings({ ...bankSettings, bankName: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                />
              </div>
            </div>
          )}

          {activeTab === 'pf' && (
            <div className="max-w-xl space-y-4 text-xs">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Provident Fund (PF) Contribution Rates</h3>
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Employer Contribution (%)</label>
                <input
                  type="number"
                  value={pfSettings.employerContribution}
                  onChange={(e) => setPfSettings({ ...pfSettings, employerContribution: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                />
              </div>
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Employee Contribution (%)</label>
                <input
                  type="number"
                  value={pfSettings.employeeContribution}
                  onChange={(e) => setPfSettings({ ...pfSettings, employeeContribution: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                />
              </div>
            </div>
          )}

          {activeTab === 'template' && (
            <div className="max-w-xl space-y-4 text-xs">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">PDF Payslip Template Design</h3>
              <p className="text-zinc-500">Select standard format for generated employee salary slips:</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="border-2 border-[#94cb3d] rounded-xl p-4 cursor-pointer bg-[#94cb3d]/10 text-center">
                  <FileText className="h-6 w-6 text-[#94cb3d] mx-auto mb-2" />
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">Standard</p>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 cursor-pointer text-center hover:border-zinc-400">
                  <ClipboardList className="h-6 w-6 text-zinc-500 mx-auto mb-2" />
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">Detailed</p>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 cursor-pointer text-center hover:border-zinc-400">
                  <Palette className="h-6 w-6 text-zinc-500 mx-auto mb-2" />
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">Custom</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} className="bg-[#94cb3d] text-white hover:bg-[#82b632] text-xs font-medium">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
