'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileSpreadsheet, FileText } from 'lucide-react';
import Button from '@/components/ui/Button/Button';

interface MonthlyHeaderProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  onExportCSV: () => void;
  onExportXLS: () => void;
  onExportPDF: () => void;
}

export default function MonthlyHeader({
  selectedMonth,
  onMonthChange,
  onExportCSV,
  onExportXLS,
  onExportPDF,
}: MonthlyHeaderProps) {
  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const goToCurrentMonth = () => {
    onMonthChange(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Monthly Attendance</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Comprehensive month-wide attendance overview with trends and insights
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Month Navigation */}
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1">
          <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToCurrentMonth}>
            Current
          </Button>
          <Button variant="ghost" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Month Selector */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
          </span>
        </div>

        {/* Export Options */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onExportCSV}>
            <FileSpreadsheet className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="secondary" size="sm" onClick={onExportXLS}>
            <FileSpreadsheet className="h-4 w-4" />
            XLS
          </Button>
          <Button variant="primary" size="sm" onClick={onExportPDF}>
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
