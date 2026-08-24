'use client';

import { useState } from 'react';
import { Download, Plus, Bell } from 'lucide-react';
import Button from '@/components/ui/Button/Button';

const verticals = [
  { value: 'all', label: 'All Verticals' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'hotels', label: 'Hotels' },
  { value: 'saree', label: 'Saree Manufacturing' },
  { value: 'ho', label: 'Corporate Office' },
];

const dateFilters = ['Today', 'Week', 'Month', 'Custom'];

export default function OverviewHeader() {
  const [selectedVertical, setSelectedVertical] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Today');
  const [downloading, setDownloading] = useState(false);

  const handleDownloadReport = () => {
    setDownloading(true);
    const content = `HRMS Admin Overview Report\nGenerated At: ${new Date().toLocaleString()}\nVertical: ${selectedVertical}\nFilter: ${selectedDateFilter}\nStatus: Active\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HRMS_Overview_Report_${selectedDateFilter}.txt`;
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
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            HRMS Dashboard – Admin Overview
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time workforce analytics across all verticals
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => {
              const uniqueId = Math.random().toString(36).substring(2, 15);
              window.open(`/newjoining/form/${uniqueId}`, '_blank');
            }}
          >
            <Plus className="h-4 w-4" />
            New Employee Joining
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={handleDownloadReport}
            disabled={downloading}
          >
            <Download className="h-4 w-4" />
            {downloading ? 'Exporting...' : 'Download Report'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleScrollToAlerts}
          >
            <Bell className="h-4 w-4" />
            Alerts
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select 
          value={selectedVertical}
          onChange={(e) => setSelectedVertical(e.target.value)}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
        >
          {verticals.map((v) => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>

        <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden">
          {dateFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedDateFilter(f)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                selectedDateFilter === f
                  ? 'bg-[#94cb3d] text-white'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
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
