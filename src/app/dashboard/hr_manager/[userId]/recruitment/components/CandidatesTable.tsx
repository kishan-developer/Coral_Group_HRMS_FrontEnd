'use client';

import { useState } from 'react';
import { MoreVertical, ChevronUp, ChevronDown, Eye, ArrowRight, Calendar, FileText, MessageSquare, X } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  appliedFor: string;
  experience: string;
  source: string;
  currentStage: 'applied' | 'screening' | 'interview' | 'selected' | 'rejected' | 'offer';
  hasResume: boolean;
  resumeUrl?: string;
  appliedDate: string;
}

interface CandidatesTableProps {
  candidates: Candidate[];
  onViewProfile: (id: string) => void;
  onMoveStage: (id: string) => void;
  onAssignInterview: (id: string) => void;
  onAddNotes: (id: string) => void;
  onReject: (id: string) => void;
}

type SortField = 'name' | 'appliedDate' | 'experience';
type SortOrder = 'asc' | 'desc';

export default function CandidatesTable({
  candidates,
  onViewProfile,
  onMoveStage,
  onAssignInterview,
  onAddNotes,
  onReject,
}: CandidatesTableProps) {
  const [sortField, setSortField] = useState<SortField>('appliedDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
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

  const sortedCandidates = [...candidates].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCandidates = sortedCandidates.slice(startIndex, endIndex);

  const getStageBadge = (stage: string) => {
    const styles = {
      applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      screening: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      interview: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      selected: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      offer: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[stage as keyof typeof styles]}`}>
        {stage.charAt(0).toUpperCase() + stage.slice(1)}
      </span>
    );
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
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Candidate Name
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Applied For
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Experience
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Source
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Current Stage
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Resume
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('appliedDate')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Applied Date
                  {sortField === 'appliedDate' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {paginatedCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{candidate.name}</span>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{candidate.appliedFor}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{candidate.experience}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 capitalize">{candidate.source}</td>
                <td className="px-4 py-3">{getStageBadge(candidate.currentStage)}</td>
                <td className="px-4 py-3">
                  {candidate.hasResume ? (
                    <button
                      onClick={() => candidate.resumeUrl && window.open(candidate.resumeUrl, '_blank')}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                      title="View Resume"
                    >
                      <FileText className="h-4 w-4 text-zinc-500" />
                    </button>
                  ) : (
                    <span className="text-xs text-zinc-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{candidate.appliedDate}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setActionMenuId(actionMenuId === candidate.id ? null : candidate.id)}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </button>
                    {actionMenuId === candidate.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => { onViewProfile(candidate.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Eye className="h-3 w-3" />
                            View Profile
                          </button>
                          <button
                            onClick={() => { onMoveStage(candidate.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <ArrowRight className="h-3 w-3" />
                            Move Stage
                          </button>
                          <button
                            onClick={() => { onAssignInterview(candidate.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Calendar className="h-3 w-3" />
                            Assign Interview
                          </button>
                          <button
                            onClick={() => { onAddNotes(candidate.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <MessageSquare className="h-3 w-3" />
                            Add Notes
                          </button>
                          <button
                            onClick={() => { onReject(candidate.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <X className="h-3 w-3" />
                            Reject
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
            {startIndex + 1}-{Math.min(endIndex, sortedCandidates.length)} of {sortedCandidates.length}
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
