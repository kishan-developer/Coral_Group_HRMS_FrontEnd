'use client';

import { Plus, FileSpreadsheet, FileText, Download, UserPlus } from 'lucide-react';
import Button from '@/components/ui/Button/Button';

interface Props {
  onAdd: () => void;
  onAssign: () => void;
  onExportCSV: () => void;
  onExportXLS: () => void;
  onExportPDF: () => void;
}

export default function ShiftsHeader({ onAdd, onAssign, onExportCSV, onExportXLS, onExportPDF }: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Shift Management</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Create, assign and monitor employee work shifts</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={onExportCSV}>
          <FileSpreadsheet className="h-4 w-4" />
          CSV
        </Button>
        <Button variant="secondary" size="sm" onClick={onExportXLS}>
          <Download className="h-4 w-4" />
          XLS
        </Button>
        <Button variant="secondary" size="sm" onClick={onExportPDF}>
          <FileText className="h-4 w-4" />
          PDF
        </Button>
        <Button variant="secondary" size="sm" onClick={onAssign}>
          <UserPlus className="h-4 w-4" />
          Assign Shift
        </Button>
        <Button variant="primary" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4" />
          Add New Shift
        </Button>
      </div>
    </div>
  );
}
