'use client';

import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Select from '../ui/Forms/Select';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  className?: string;
}

export default function FilterBar({ filters, values, onChange, className }: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Filter className="h-4 w-4 text-zinc-400 shrink-0" />
      {filters.map((f) => (
        <Select
          key={f.key}
          label={f.label}
          options={[{ value: '', label: `All ${f.label}` }, ...f.options]}
          value={values[f.key] || ''}
          onChange={(e) => onChange(f.key, e.target.value)}
          className="w-40"
        />
      ))}
    </div>
  );
}
