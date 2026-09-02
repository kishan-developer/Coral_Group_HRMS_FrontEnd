'use client';

import { useState } from 'react';
import { Download, Plus, Bell, Building2, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const verticals = [
  { value: 'all', label: 'All Business Verticals' },
  { value: 'corporate', label: 'Corporate Head Office' },
  { value: 'real-estate', label: 'Real Estate & Infra' },
  { value: 'hotels', label: 'Hotels & Hospitality' },
  { value: 'manufacturing', label: 'Saree & Textile Manufacturing' },
];

const dateFilters = ['Today', 'This Week', 'This Month', 'Year to Date'];

interface OverviewHeaderProps {
  selectedPeriod?: string;
  selectedVertical?: string;
  onFilterChange?: (period: string, vertical: string) => void;
}

export default function OverviewHeader({
  selectedPeriod = 'Today',
  selectedVertical = 'all',
  onFilterChange,
}: OverviewHeaderProps) {
  const [period, setPeriod] = useState(selectedPeriod);
  const [vertical, setVertical] = useState(selectedVertical);
  const [downloading, setDownloading] = useState(false);

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    if (onFilterChange) {
      onFilterChange(newPeriod, vertical);
    }
  };

  const handleVerticalChange = (newVertical: string) => {
    setVertical(newVertical);
    if (onFilterChange) {
      onFilterChange(period, newVertical);
    }
  };

  const handleDownloadReport = () => {
    setDownloading(true);
    const content = `Coral HRMS Executive Workforce Summary\nGenerated: ${new Date().toLocaleString()}\nVertical: ${vertical}\nFilter Period: ${period}\nStatus: Operational\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HRMS_Executive_Overview_${period.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 500);
  };

  const handleScrollToAlerts = () => {
    const alertsElement = document.getElementById('compliance-alerts-section');
    if (alertsElement) {
      alertsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>HR Manager Command Suite</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Workforce Health: 98% Optimal
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Workforce Intelligence & HR Overview
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Real-time multi-tenant analytics across attendance, field GPS check-ins, leave balances (CL/PL), monthly payroll disbursals, and compliance alerts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => {
                const uniqueId = Math.random().toString(36).substring(2, 15);
                window.open(`/newjoining/form/${uniqueId}`, '_blank');
              }}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Employee Joining
            </Button>
            <Button
              onClick={handleDownloadReport}
              disabled={downloading}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs px-4 py-2.5 border border-zinc-700 transition-all flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {downloading ? 'Exporting...' : 'Export Executive Report'}
            </Button>
            <Button
              onClick={handleScrollToAlerts}
              className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold rounded-xl text-xs px-3.5 py-2.5 border border-zinc-700 transition-all flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-[#94cb3d] ml-2" />
          <select
            value={vertical}
            onChange={(e) => handleVerticalChange(e.target.value)}
            className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            {verticals.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
          {dateFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handlePeriodChange(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                period === f
                  ? 'bg-[#94cb3d] text-zinc-950 shadow-md shadow-[#94cb3d]/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
