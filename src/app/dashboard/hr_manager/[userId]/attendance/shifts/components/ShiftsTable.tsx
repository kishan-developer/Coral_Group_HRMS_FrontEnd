'use client';

import { useMemo, useState } from 'react';
import { Search, Pencil, Copy, Trash2, Users, ArrowUpDown, ArrowUp, ArrowDown, Power } from 'lucide-react';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import Pagination from '@/components/ui/Pagination/Pagination';
import { Shift } from './shiftsData';

interface Props {
  shifts: Shift[];
  onEdit: (s: Shift) => void;
  onDuplicate: (s: Shift) => void;
  onDelete: (ids: string[]) => void;
  onToggleStatus: (ids: string[]) => void;
  onViewAssigned: (s: Shift) => void;
}

const PAGE_SIZE = 8;
type SortKey = 'name' | 'startTime' | 'type' | 'assignedCount';

const typeBadge: Record<Shift['type'], 'default' | 'info' | 'warning' | 'success'> = {
  General: 'success',
  Night: 'info',
  Rotational: 'warning',
  Split: 'default',
};

export default function ShiftsTable({ shifts, onEdit, onDuplicate, onDelete, onToggleStatus, onViewAssigned }: Props) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('startTime');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    const list = shifts.filter((s) =>
      [s.name, s.code, s.type].some((v) => v.toLowerCase().includes(search.toLowerCase()))
    );
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [shifts, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const allChecked = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const toggleAll = () => {
    const next = new Set(selected);
    if (allChecked) pageRows.forEach((r) => next.delete(r.id));
    else pageRows.forEach((r) => next.add(r.id));
    setSelected(next);
  };
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
    return sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  const selectedIds = Array.from(selected);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search shift name, code, type..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
            />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">{sorted.length} shifts</p>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">{selectedIds.length} selected</span>
            <Button variant="secondary" size="sm" onClick={() => { onToggleStatus(selectedIds); setSelected(new Set()); }}>
              <Power className="h-4 w-4" />
              Toggle Status
            </Button>
            <Button variant="danger" size="sm" onClick={() => { onDelete(selectedIds); setSelected(new Set()); }}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800/60">
            <tr>
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} className="h-4 w-4 rounded" />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                <button type="button" onClick={() => toggleSort('name')} className="flex items-center gap-1">Shift Name <SortIcon k="name" /></button>
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Code</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                <button type="button" onClick={() => toggleSort('startTime')} className="flex items-center gap-1">Timing <SortIcon k="startTime" /></button>
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Break</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Hours</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                <button type="button" onClick={() => toggleSort('type')} className="flex items-center gap-1">Type <SortIcon k="type" /></button>
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                <button type="button" onClick={() => toggleSort('assignedCount')} className="flex items-center gap-1">Assigned <SortIcon k="assignedCount" /></button>
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {pageRows.map((s) => (
              <tr key={s.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleOne(s.id)} className="h-4 w-4 rounded" />
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{s.name}</p>
                  {s.notes && <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[200px]">{s.notes}</p>}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">{s.code}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-zinc-50">{s.startTime} – {s.endTime}</td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{s.breakMinutes}m</td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{s.workingHours}</td>
                <td className="px-4 py-3">
                  <Badge variant={typeBadge[s.type]} size="sm">{s.type}</Badge>
                </td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => onViewAssigned(s)} className="inline-flex items-center gap-1 text-[#94cb3d] hover:underline text-sm font-medium">
                    <Users className="h-3.5 w-3.5" />
                    {s.assignedCount}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={s.status === 'Active' ? 'success' : 'default'} size="sm">{s.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button type="button" title="Edit" onClick={() => onEdit(s)} className="p-1.5 rounded-md text-zinc-500 hover:text-[#94cb3d] hover:bg-[#94cb3d]/10 transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" title="Duplicate" onClick={() => onDuplicate(s)} className="p-1.5 rounded-md text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button type="button" title="Delete" onClick={() => onDelete([s.id])} className="p-1.5 rounded-md text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={10} className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">No shifts match your search</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
