'use client';

import { useState } from 'react';
import { MoreVertical, ChevronUp, ChevronDown, Eye, Edit, Users, Copy, Trash2 } from 'lucide-react';

interface SalaryStructure {
  id: string;
  structureName: string;
  structureCode: string;
  salaryCycle: 'monthly' | 'weekly';
  earningsComponents: number;
  deductionComponents: number;
  totalCTC: number;
  assignedEmployees: number;
  status: 'active' | 'inactive';
  effectiveFrom: string;
}

interface StructureTableProps {
  structures: SalaryStructure[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onAssign: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

type SortField = 'structureName' | 'totalCTC' | 'earningsComponents';
type SortOrder = 'asc' | 'desc';

export default function StructureTable({
  structures,
  onView,
  onEdit,
  onAssign,
  onDuplicate,
  onDelete,
}: StructureTableProps) {
  const [sortField, setSortField] = useState<SortField>('structureName');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedStructures = [...structures].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedStructures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStructures = sortedStructures.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('structureName')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Structure Name
                  {sortField === 'structureName' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Structure Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Salary Cycle
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Earnings
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Deductions
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('totalCTC')}
                  className="flex items-center justify-end gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Total CTC
                  {sortField === 'totalCTC' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Assigned
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {paginatedStructures.map((structure) => (
              <tr key={structure.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{structure.structureName}</span>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{structure.structureCode}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 capitalize">{structure.salaryCycle}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{structure.earningsComponents}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{structure.deductionComponents}</td>
                <td className="px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 text-right">{formatCurrency(structure.totalCTC)}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{structure.assignedEmployees}</td>
                <td className="px-4 py-3">{getStatusBadge(structure.status)}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setActionMenuId(actionMenuId === structure.id ? null : structure.id)}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </button>
                    {actionMenuId === structure.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => { onView(structure.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Eye className="h-3 w-3" />
                            View Structure
                          </button>
                          <button
                            onClick={() => { onEdit(structure.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => { onAssign(structure.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Users className="h-3 w-3" />
                            Assign to Employees
                          </button>
                          <button
                            onClick={() => { onDuplicate(structure.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Copy className="h-3 w-3" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => { onDelete(structure.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">
            {startIndex + 1}-{Math.min(endIndex, sortedStructures.length)} of {sortedStructures.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded border text-xs ${
                  currentPage === pageNum
                    ? 'bg-[#94cb3d] text-white border-[#94cb3d]'
                    : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
