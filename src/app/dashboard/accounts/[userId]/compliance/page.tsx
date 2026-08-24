'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  ClipboardList,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  FileCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ComplianceRecord {
  id: string;
  type: 'PF' | 'ESI' | 'PT' | 'Labour';
  month: string;
  year: string;
  amount: number;
  status: 'filed' | 'pending' | 'overdue';
  dueDate: string;
  filedDate?: string;
}

export default function ComplianceManagementPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const [records, setRecords] = useState<ComplianceRecord[]>([
    { id: '1', type: 'PF', month: 'May', year: '2026', amount: 2450000, status: 'filed', dueDate: '2026-06-15', filedDate: '2026-06-10' },
    { id: '2', type: 'ESI', month: 'May', year: '2026', amount: 735000, status: 'filed', dueDate: '2026-06-21', filedDate: '2026-06-18' },
    { id: '3', type: 'PT', month: 'May', year: '2026', amount: 15000, status: 'pending', dueDate: '2026-06-30' },
    { id: '4', type: 'PF', month: 'April', year: '2026', amount: 2450000, status: 'filed', dueDate: '2026-05-15', filedDate: '2026-05-12' },
    { id: '5', type: 'ESI', month: 'April', year: '2026', amount: 735000, status: 'filed', dueDate: '2026-05-21', filedDate: '2026-05-19' },
  ]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
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

  const handleFileCompliance = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setRecords(records.map(record =>
      record.id === id ? { ...record, status: 'filed' as const, filedDate: today } : record
    ));
    showToast('Compliance return filed successfully!', 'success');
  };

  const handleDownloadReport = (type: string) => {
    showToast(`Downloading official ${type} compliance return statement...`, 'info');
  };

  const handleView = (id: string) => {
    const record = records.find(r => r.id === id);
    if (record) {
      setSelectedRecord(record);
      setShowViewModal(true);
    }
  };

  const filteredRecords = records.filter((r) => {
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
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
              <ShieldCheck className="h-5 w-5 text-[#94cb3d]" />
              Statutory Tax & Labour Compliance Center
            </h1>
            <Badge variant="brand">Indian Tax Code Compliant</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            File, track, and audit Provident Fund (PF), ESI, Professional Tax (PT), and Labour welfare filings.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="All">All Statutory Types</option>
            <option value="PF">Provident Fund (PF)</option>
            <option value="ESI">ESI Insurance</option>
            <option value="PT">Professional Tax (PT)</option>
            <option value="Labour">Labour Welfare</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          >
            <option value="All">All Statuses</option>
            <option value="filed">Filed Returns</option>
            <option value="pending">Pending Returns</option>
            <option value="overdue">Overdue Returns</option>
          </select>
        </div>
      </div>

      {/* Command Data Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Compliance Type</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Filing Period</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Total Deposit</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Statutory Due Date</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Filed Date</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                  <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                    <td className="px-4 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-50">
                      {record.type} Return
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300">
                      {record.month} {record.year}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-bold text-[#94cb3d] font-mono">
                      {formatCurrency(record.amount)}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                      {record.dueDate}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500 font-mono">
                      {record.filedDate || '-'}
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge
                        variant={
                          record.status === 'filed'
                            ? 'success'
                            : record.status === 'overdue'
                            ? 'destructive'
                            : 'brand'
                        }
                        className="text-[10px] uppercase font-bold"
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {record.status !== 'filed' && (
                          <Button
                            onClick={() => handleFileCompliance(record.id)}
                            size="sm"
                            className="bg-[#94cb3d] text-white hover:bg-[#82b632] text-xs font-medium h-7 px-2.5"
                          >
                            <FileCheck className="h-3.5 w-3.5 mr-1" /> File Return
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDownloadReport(record.type)}
                          variant="outline"
                          size="sm"
                          className="text-xs font-medium h-7 px-2 border-zinc-200 dark:border-zinc-700"
                        >
                          <Download className="h-3.5 w-3.5 text-blue-500" />
                        </Button>
                        <Button
                          onClick={() => handleView(record.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs font-medium h-7 px-2 border-zinc-200 dark:border-zinc-700"
                        >
                          <Eye className="h-3.5 w-3.5 text-purple-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Statutory Register Quick Access using Pure Lucide Icons */}
      <Card className="rounded-xl">
        <CardContent className="p-6">
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-4">
            Available Statutory Registers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-blue-500/15 text-blue-500 flex items-center justify-center">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">PF ECR Register</p>
                <p className="text-[11px] text-zinc-500">Monthly Challan Statement</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">ESI Contribution Register</p>
                <p className="text-[11px] text-zinc-500">Insurance Return Statement</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-purple-500/15 text-purple-500 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Form-5 Master Salary Register</p>
                <p className="text-[11px] text-zinc-500">Complete Disbursal Audit</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
